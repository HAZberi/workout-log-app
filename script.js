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

let map, marker;
//getting current location from browser
navigator.geolocation.getCurrentPosition(
  function (pos) {
    const { latitude } = pos.coords;
    const { longitude } = pos.coords;
    const coords = [latitude, longitude];
    console.log(`https://www.google.ca/maps/@${latitude},${longitude}`);

    //adding Leaflet
    map = L.map('map').setView(coords, 13);
    //console.log(map);
    L.tileLayer('http://{s}.tile.thunderforest.com/outdoors/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    map.on('click', function (e) {
      const { lat: latitude, lng: longitude } = e.latlng;
      marker = L.marker([latitude, longitude]).addTo(map);
      form.classList.remove('hidden');

    });
  },
  function () {
    alert(`Location Not Enabled OR Found`);
  }
);
form.addEventListener('submit', function (e) {
  e.preventDefault();
  inputCadence.value = inputDistance.value = inputDuration.value = inputElevation.value =
    '';
  inputDistance.blur();
  inputCadence.blur();
  inputDuration.blur();
  inputElevation.blur();
  marker
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
});

inputType.addEventListener('change', function(e){
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
})