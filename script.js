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
navigator.geolocation.getCurrentPosition(
  function (pos) {
    const { latitude } = pos.coords;
    const { longitude } = pos.coords;
    const coords = [latitude, longitude];
    console.log(`https://www.google.ca/maps/@${latitude},${longitude}`);

    //adding Leaflet
    const map = L.map('map').setView(coords, 13);

    //http://tile.thunderforest.com/cycle/${z}/${x}/${y}.png
    //http://b.tile.openstreetmap.fr/hot/${z}/${x}/${y}.png

    L.tileLayer('https://{s}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    L.marker(coords)
      .addTo(map)
      .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
      .openPopup();
  },
  function () {
    alert(`Location Not Enabled OR Found`);
  }
);
