'use strict';

//Select all Relevant HTML Elements
const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');
const deleteAll = document.querySelector('.workouts__deleteAll');
const sortBy = document.querySelector('.sort-by');
const instructions = document.querySelector('.instructions');

class Workout {
  id = (Date.now() + '').slice(-7);
  constructor(date, coords, distance, duration) {
    this.date = new Date(date); //date
    this.coords = coords; // [lat, lng]
    this.distance = distance; //km
    this.duration = duration; //min
  }
  description() {
    // prettier-ignore
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return `${this.type[0].toUpperCase()}${this.type.slice(1)} on 
    ${
      months[this.date.getMonth()]
    } ${this.date.getDate()}, ${this.date.getFullYear()}`;
  }
}

class Running extends Workout {
  type = 'running';
  constructor(date, coords, distance, duration, cadence) {
    super(date, coords, distance, duration);
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
  constructor(date, coords, distance, duration, elevationGain) {
    super(date, coords, distance, duration);
    this.elevationGain = elevationGain;
    this.description = this.description();
    this.calcSpeed();
  }
  calcSpeed() {
    this.speed = this.distance / (this.duration / 60); //km/h
    return this.speed;
  }
}

class App {
  #map;
  #marker;
  #workouts = [];
  #zoomLevel = 13;
  #workoutDate = '';

  constructor() {
    //object initialization through class App methods
    this._getPosition();
    this._getLocalStorage();
    this._checkExistingWorkouts();
    //All event listners
    form.addEventListener('submit', this._newWorkout.bind(this));
    inputType.addEventListener('change', this._toggleElevationField);
    containerWorkouts.addEventListener(
      'click',
      function (e) {
        this._moveToPopUp(e);
        this._deleteWorkout(e);
        this._editWorkout(e);
      }.bind(this)
    );
    deleteAll.addEventListener('click', this._deleteAllWorkouts.bind(this));
    sortBy.addEventListener('change', this._sortBy.bind(this));
    //Note: binding this keyword to callback is important when working with classes
  }

  _getPosition() {
    navigator.geolocation.getCurrentPosition(
      this._loadMap.bind(this),
      function () {
        alert(
          `Location Not Enabled OR Found. Please refresh the page and ALLOW location to start using the app. Thank You`
        );
      }
    );
  }
  _loadMap(pos) {
    //callback function
    const { latitude } = pos.coords;
    const { longitude } = pos.coords;
    const coords = [latitude, longitude];
    //adding Leaflet

    //map and marker object intialization
    this.#map = L.map('map').setView(coords, this.#zoomLevel);
    this.#marker = L.marker(coords);
    //adding tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);
    //display map markers from the storage
    this._displayLocalStorageMapMarkers();
    //setting the map view and zoom level based on current location
    this.#map.setView(coords, this.#zoomLevel, {
      animate: false,
    });
    //listen to any click event on the map and display the workout form
    this.#map.on('click', this._showForm.bind(this));
  }
  _showForm(e) {
    //callback function
    //getting lat lng of where user clicked
    const { lat: latitude, lng: longitude } = e.latlng;
    //if current marker is not attached to a workout, remove it -- else update current marker
    if (!this.#marker.isPopupOpen()) this.#marker.remove();
    this.#marker = L.marker([latitude, longitude]).addTo(this.#map);
    //hide the getting started instructions
    instructions.classList.add('hide__instructions');
    //show the form
    form.classList.remove('hidden');
    inputType.focus();
  }
  _toggleElevationField() {
    //callback function
    //to toggle between cadence and elevation fields
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
  }

  _newWorkout(e) {
    e.preventDefault();

    let workout;
    const { lat: latitude, lng: longitude } = this.#marker.getLatLng();
    const coords = [latitude, longitude];
    const date = this._checkExistingWorkoutDate();

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
        return alert(
          `Please enter a value. \n  Values MUST be a positive number.`
        ); //guard clause

      //create a running object
      workout = new Running(date, coords, distance, duration, cadence);
    }
    //if workout is cycling, create a cycling object
    if (type === 'cycling') {
      const elevation = Number(inputElevation.value);
      //Check if the input is valid
      if (!inputValidations(distance, duration) && isNaN(elevation))
        return alert(
          `Please enter a value. \n  Values MUST be a positive number.`
        ); //guard clause

      //create a cycling object
      workout = new Cycling(date, coords, distance, duration, elevation);
    }

    //add the new object to workout array
    this.#workouts.push(workout);

    //Render workout on a map as a marker
    this._renderWorkoutOnMap(workout);

    //Render workout on the list
    this._renderWorkoutOnList(workout);

    //Check if there is need to display DeleteAll or Sort buttons
    this._checkExistingWorkouts();

    //Hide form and clear input fields
    this._resetFields();

    //save wokouts to local storage
    this._setLocalStorage();
  }
  _renderWorkoutOnMap(workout) {
    this.#marker
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          closeButton: false,
          className: `${workout.type}-popup`,
        }).setContent(
          `${workout.type === 'running' ? '🏃‍♂️' : '🚴‍'} ${workout.description}`
        )
      )
      .openPopup();
  }
  _renderWorkoutOnList(workout) {
    let html = `
    <li class="workout workout--${workout.type}" data-id="${workout.id}">
      <h2 class="workout__title">${workout.description}</h2>
      <span class="workout__edit"><i class="fas fa-edit"></i></span>
      <span class="workout__delete"><i class="far fa-trash-alt"></i></span>
      <div class="workout__details">
        <span class="workout__icon">${
          workout.type === 'running' ? '🏃‍♂️' : '🚴‍'
        }</span>
        <span class="workout__value">${workout.distance}</span>
        <span class="workout__unit">km</span>
      </div>
      <div class="workout__details">
        <span class="workout__icon">⏱</span>
        <span class="workout__value">${workout.duration}</span>
        <span class="workout__unit">min</span>
      </div>`;
    if (workout.type === 'running') {
      html =
        html +
        `
        <div class="workout__details">
        <span class="workout__icon">⚡️</span>
        <span class="workout__value">${workout.pace?.toFixed(1)}</span>
        <span class="workout__unit">min/km</span>
      </div>
      <div class="workout__details">
        <span class="workout__icon">🦶🏼</span>
        <span class="workout__value">${workout.cadence}</span>
        <span class="workout__unit">spm</span>
      </div>
    </li>`;
    }
    if (workout.type === 'cycling') {
      html =
        html +
        `
        <div class="workout__details">
        <span class="workout__icon">⚡️</span>
        <span class="workout__value">${workout.speed?.toFixed(1)}</span>
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
  _moveToPopUp(e) {
    if (!e.target.closest('.workout')) return;
    const workoutId = e.target.closest('.workout').dataset.id;
    const workout = this.#workouts.find(workout => workout.id === workoutId);
    this.#map.setView(workout.coords, this.#zoomLevel, {
      animate: true,
      duration: 1,
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
    setTimeout(() => (form.style.display = 'grid'), 1000);
  }
  _setLocalStorage() {
    //stringify arrays and objects
    localStorage.setItem('workouts', JSON.stringify(this.#workouts));

    //this option for storage is not recommended
    //all the inherited properties and methods will be lost
    //Experiment by creating public methods eg: click()
  }
  _displayLocalStorageMapMarkers() {
    //display and set workouts markers on the map, if any when the map loads for the first time
    if (!this.#workouts.length >= 1){
      return console.log(`No workouts found in local storage`);
    }
    //hide the getting started instructions
    instructions.classList.add('hide__instructions');
    this.#workouts.forEach(workout => {
      this.#marker = L.marker(workout.coords).addTo(this.#map);
      this._renderWorkoutOnMap(workout);
    });
  }
  _populateForm(workout) {
    inputType.value = workout.type;
    inputDistance.value = workout.distance;
    inputDuration.value = workout.duration;
    this.#marker = L.marker(workout.coords).addTo(this.#map);
    if (workout.type === 'running') {
      inputCadence.value = workout.cadence;
      inputCadence.closest('.form__row').classList.remove('form__row--hidden');
      inputElevation.closest('.form__row').classList.add('form__row--hidden');
    }
    if (workout.type === 'cycling') {
      inputElevation.value = workout.elevationGain;
      inputElevation
        .closest('.form__row')
        .classList.remove('form__row--hidden');
      inputCadence.closest('.form__row').classList.add('form__row--hidden');
    }
    inputDistance.focus();
  }
  _checkExistingWorkoutDate = function () {
    let date = new Date();
    if (this.#workoutDate) {
      date = this.#workoutDate;
      this.#workoutDate = '';
    }
    return new Date(date);
  };
  _editWorkout(e) {
    if (!e.target.closest('.workout__edit')) return;
    const workout = e.target.closest('.workout');
    const workoutId = workout.dataset.id;
    const workoutToEdit = this.#workouts.find(
      workout => workout.id === workoutId
    );
    this.#workoutDate = workoutToEdit.date;
    workout.style.display = 'none';
    form.classList.remove('hidden');
    //hide the getting started instructions
    instructions.classList.add('hide__instructions');
    setTimeout(() => (form.style.display = 'grid'), 1000);
    this._populateForm(workoutToEdit);
    this.#workouts.splice(this.#workouts.indexOf(workoutToEdit), 1);
  }
  _getLocalStorage() {
    //parse data using JSON
    const data = JSON.parse(localStorage.getItem('workouts'));
    //display workouts on the list
    if (!data) return;
    this.#workouts = data;
    this.#workouts.forEach(workout => this._renderWorkoutOnList(workout));
  }
  _deleteWorkout(e) {
    if (!e.target.closest('.workout__delete')) return;
    const workout = e.target.closest('.workout');
    workout.style.display = 'none';
    const workoutId = workout.dataset.id;
    const workoutToDelete = this.#workouts.find(
      workout => workout.id === workoutId
    );
    this.#workouts.splice(this.#workouts.indexOf(workoutToDelete), 1);
    this.#map.eachLayer(function (layer) {
      if (layer.options.attribution) return;
      layer.remove();
    });
    this._displayLocalStorageMapMarkers();
    this._setLocalStorage();
    this._checkExistingWorkouts();
  }
  _deleteAllWorkouts(e) {
    this.reset();
  }
  _checkExistingWorkouts() {
    if (this.#workouts.length < 1) {
      deleteAll.style.display = 'none';
      sortBy.style.display = 'none';
    } else {
      deleteAll.style.display = 'flex';
      sortBy.style.display = 'flex';
    }
  }
  _sortByData(data) {
    const newOrder = this.#workouts.sort((wa, wb) => wa[data] - wb[data]);
    const currentWorkouts = document.querySelectorAll('.workout');
    currentWorkouts.forEach(el => (el.style.display = 'none'));
    newOrder.forEach(el => this._renderWorkoutOnList(el));
  }
  _sortByDate() {
    const newOrder = this.#workouts.sort(
      (wa, wb) => new Date(wb.date) - new Date(wa.date)
    );
    const currentWorkouts = document.querySelectorAll('.workout');
    currentWorkouts.forEach(el => (el.style.display = 'none'));
    newOrder.forEach(el => this._renderWorkoutOnList(el));
  }
  _sortBy() {
    if (sortBy.value === 'distance') this._sortByData('distance');
    if (sortBy.value === 'duration') this._sortByData('duration');
    if (sortBy.value === 'date') this._sortByDate();
  }
  reset() {
    //the only public method
    //direct access in console through app object
    localStorage.removeItem('workouts');
    location.reload();
  }
}
const app = new App();
