'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

//getting current location from browser

class App {
  #map;
  #marker;

  constructor() {
    this._getPosition();
    form.addEventListener('submit', this._newWorkout.bind(this));
    inputType.addEventListener('change', this._toggleElevationField);

  }

  _getPosition() {
    navigator.geolocation.getCurrentPosition(
      this._loadMap.bind(this),
      function () {
        alert(`Location Not Enabled OR Found`);
      }
    );
  }
  _loadMap(pos) {
    const { latitude } = pos.coords;
    const { longitude } = pos.coords;
    const coords = [latitude, longitude];
    console.log(`https://www.google.ca/maps/@${latitude},${longitude}`);

    //adding Leaflet
    this.#map = L.map('map').setView(coords, 13);
    L.tileLayer('http://{s}.tile.thunderforest.com/outdoors/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);
    this.#marker = L.marker([latitude, longitude]);
    this.#map.on('click', this._showForm.bind(this));
  }
  _showForm(e) {
    const { lat: latitude, lng: longitude } = e.latlng;
    if (!this.#marker.isPopupOpen()) this.#marker.remove();
    this.#marker = L.marker([latitude, longitude]).addTo(this.#map);
    form.classList.remove('hidden');
  }
  _toggleElevationField() {
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');  
  }

  _newWorkout(e) {
    e.preventDefault();
    this._resetFields();
    this.#marker
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          closeButton: false,
          className: 'running-popup',
        }).setContent('My Workout')
      )
      .openPopup();
  }
  _resetFields() {
    inputCadence.value = inputDistance.value = inputDuration.value = inputElevation.value =
      '';
    inputDistance.blur();
    inputCadence.blur();
    inputDuration.blur();
    inputElevation.blur();
  }
}

const app = new App();


