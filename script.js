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

class Workout {
  date = new Date();
  id = (Date.now() + '').slice(-7);
  constructor(coords, distance, duration) {
    this.coords = coords; // [lat, lng]
    this.distance = distance; //km
    this.duration = duration; //min
  }
  description() {
    return `${this.type[0].toUpperCase()}${this.type.slice(1)} on 
    ${months[this.date.getMonth()]
    } ${this.date.getDate()}, ${this.date.getFullYear()}`;
  }
}

class Running extends Workout {
  type = 'running';
  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this.calcPace();
    this.description = this.description();
  }
  calcPace() {
    this.pace = this.duration / this.distance; //min/km
    return this.pace;
  }
}

class Cycling extends Workout {
  type = 'cycling';
  constructor(coords, distance, duration, elevationGain) {
    super(coords, distance, duration);
    this.elevationGain = elevationGain;
    this.description = this.description();
    this.calcSpeed();
  }
  calcSpeed() {
    this.speed = this.distance / (this.duration / 60); //km/h
    return this.speed;
  }
}

// const run1 = new Running([55, -13], 4, 21);
// const cycl1 = new Cycling([57, -13], 50, 100);

// console.log(run1);
//console.log(`your average speed was ${Cycling.prototype.calcSpeed.call(run1)} km/h`);
// console.log(cycl1);

class App {
  #map;
  #marker;
  #workouts = [];
  #zoomLevel = 13;

  constructor() {
    this._getPosition();
    form.addEventListener('submit', this._newWorkout.bind(this));
    inputType.addEventListener('change', this._toggleElevationField);
    containerWorkouts.addEventListener('click', this._moveToPopUp.bind(this))
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
    this.#map = L.map('map').setView(coords, this.#zoomLevel);
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

    let workout;
    const { lat: latitude, lng: longitude } = this.#marker.getLatLng();
    const coords = [latitude, longitude];

    const inputValidations = function (...inputs) {
      //using rest parameters
      const validIntegers = inputs.every(input => Number.isFinite(input));
      const positiveIntegers = inputs.every(input => input > 0);
      return validIntegers && positiveIntegers;
    };

    //Get data from the form
    const type = inputType.value;
    const distance = Number(inputDistance.value);
    const duration = Number(inputDuration.value);
    //if workout is running, create a running object
    if (type === 'running') {
      const cadence = Number(inputCadence.value);
      //Check if the input is valid
      if (!inputValidations(distance, duration, cadence))
        return alert(`Please enter positive numbers only`); //guard clause

      //create a running object
      workout = new Running(coords, distance, duration, cadence);
    }
    //if workout is cycling, create a cycling object
    if (type === 'cycling') {
      const elevation = Number(inputElevation.value);
      //Check if the input is valid
      if (!inputValidations(distance, duration) && isNaN(elevation))
        return alert(`Please enter positive numbers only`); //guard clause

      //create a cycling object
      workout = new Cycling(coords, distance, duration, elevation);
    }

    //add the new object to workout array
    this.#workouts.push(workout);
   

    //Render workout on a map as a marker
    this._renderWorkoutOnMap(workout);


    //Render workout on the list
    this._renderWorkoutOnList(workout);

    //Hide form and clear input fields
    this._resetFields();
  }
  _renderWorkoutOnMap(workout){
    this.#marker
    .bindPopup(
      L.popup({
        maxWidth: 250,
        minWidth: 100,
        autoClose: false,
        closeOnClick: false,
        closeButton: false,
        className: `${workout.type}-popup`,
      }).setContent(`${workout.type === 'running' ? '🏃‍♂️' : '🚴‍'} ${workout.description}`)
    )
    .openPopup();
  }
  _renderWorkoutOnList(workout) {
    let html = `
    <li class="workout workout--${workout.type}" data-id="${workout.id}">
      <h2 class="workout__title">${workout.description}</h2>
      <div class="workout__details">
        <span class="workout__icon">${workout.type === 'running' ? '🏃‍♂️' : '🚴‍'}</span>
        <span class="workout__value">${workout.distance}</span>
        <span class="workout__unit">km</span>
      </div>
      <div class="workout__details">
        <span class="workout__icon">⏱</span>
        <span class="workout__value">${workout.duration}</span>
        <span class="workout__unit">min</span>
      </div>`;
    if (workout.type === 'running'){
        html = html + `
        <div class="workout__details">
        <span class="workout__icon">⚡️</span>
        <span class="workout__value">${workout.pace.toFixed(2)}</span>
        <span class="workout__unit">min/km</span>
      </div>
      <div class="workout__details">
        <span class="workout__icon">🦶🏼</span>
        <span class="workout__value">${workout.cadence}</span>
        <span class="workout__unit">spm</span>
      </div>
    </li>`;
    }
    if (workout.type === 'cycling'){
        html = html + `
        <div class="workout__details">
        <span class="workout__icon">⚡️</span>
        <span class="workout__value">${workout.speed.toFixed(2)}</span>
        <span class="workout__unit">km/h</span>
      </div>
      <div class="workout__details">
        <span class="workout__icon">⛰</span>
        <span class="workout__value">${workout.elevationGain}</span>
        <span class="workout__unit">m</span>
      </div>
    </li>`;
    }
    form.insertAdjacentHTML('afterend', html);
  }
  _moveToPopUp(e){
    if (!(e.target.closest('.workout'))) return 
    const workoutId = e.target.closest('.workout').dataset.id;
    const workout = this.#workouts.find(workout => workout.id === workoutId);
    this.#map.setView(workout.coords, this.#zoomLevel, {
        animate: true,
        duration: 1
    });
  }
  _resetFields() {
    inputCadence.value = inputDistance.value = inputDuration.value = inputElevation.value =
      '';
    inputDistance.blur();
    inputCadence.blur();
    inputDuration.blur();
    inputElevation.blur();
    form.style.display = 'none';
    form.classList.add('hidden');
    setTimeout(() => form.style.display = 'grid', 1000);
  }
}

const app = new App();
