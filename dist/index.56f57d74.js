// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function(modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x) {
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function(id, exports) {
    modules[id] = [
      function(require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function() {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function() {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"90vTS":[function(require,module,exports) {
var HMR_HOST = null;var HMR_PORT = 1234;var HMR_SECURE = false;var HMR_ENV_HASH = "d751713988987e9331980363e24189ce";module.bundle.HMR_BUNDLE_ID = "d3e299c25db6b55a2dc16a8456f57d74";/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE */

var OVERLAY_ID = '__parcel__error__overlay__';

var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function(fn) {
      this._acceptCallbacks.push(fn || function() {});
    },
    dispose: function(fn) {
      this._disposeCallbacks.push(fn);
    },
  };

  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept, acceptedAssets;

function getHostname() {
  return (
    HMR_HOST ||
    (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost')
  );
}

function getPort() {
  return HMR_PORT || location.port;
}

// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = getHostname();
  var port = getPort();
  var protocol =
    HMR_SECURE ||
    (location.protocol == 'https:' &&
      !/localhost|127.0.0.1|0.0.0.0/.test(hostname))
      ? 'wss'
      : 'ws';
  var ws = new WebSocket(
    protocol + '://' + hostname + (port ? ':' + port : '') + '/',
  );
  ws.onmessage = function(event) {
    checkedAssets = {};
    assetsToAccept = [];
    acceptedAssets = {};

    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      // Remove error overlay if there is one
      removeErrorOverlay();

      let assets = data.assets.filter(asset => asset.envHash === HMR_ENV_HASH);

      // Handle HMR Update
      var handled = false;
      assets.forEach(asset => {
        var didAccept =
          asset.type === 'css' ||
          (asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset));
        if (didAccept) {
          handled = true;
        }
      });

      if (handled) {
        console.clear();

        assets.forEach(function(asset) {
          hmrApply(module.bundle.root, asset);
        });

        for (var i = 0; i < assetsToAccept.length; i++) {
          var id = assetsToAccept[i][1];
          if (!acceptedAssets[id]) {
            hmrAcceptRun(assetsToAccept[i][0], id);
          }
        }
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'error') {
      // Log parcel errors to console
      for (let ansiDiagnostic of data.diagnostics.ansi) {
        let stack = ansiDiagnostic.codeframe
          ? ansiDiagnostic.codeframe
          : ansiDiagnostic.stack;

        console.error(
          '🚨 [parcel]: ' +
            ansiDiagnostic.message +
            '\n' +
            stack +
            '\n\n' +
            ansiDiagnostic.hints.join('\n'),
        );
      }

      // Render the fancy html overlay
      removeErrorOverlay();
      var overlay = createErrorOverlay(data.diagnostics.html);
      document.body.appendChild(overlay);
    }
  };
  ws.onerror = function(e) {
    console.error(e.message);
  };
  ws.onclose = function(e) {
    console.warn('[parcel] 🚨 Connection to the HMR server was lost');
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
    console.log('[parcel] ✨ Error resolved');
  }
}

function createErrorOverlay(diagnostics) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  let errorHTML =
    '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';

  for (let diagnostic of diagnostics) {
    let stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;

    errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>
          ${stack}
        </pre>
        <div>
          ${diagnostic.hints.map(hint => '<div>' + hint + '</div>').join('')}
        </div>
      </div>
    `;
  }

  errorHTML += '</div>';

  overlay.innerHTML = errorHTML;

  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || (Array.isArray(dep) && dep[dep.length - 1] === id)) {
        parents.push([bundle, k]);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function updateLink(link) {
  var newLink = link.cloneNode();
  newLink.onload = function() {
    if (link.parentNode !== null) {
      link.parentNode.removeChild(link);
    }
  };
  newLink.setAttribute(
    'href',
    link.getAttribute('href').split('?')[0] + '?' + Date.now(),
  );
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;
function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function() {
    var links = document.querySelectorAll('link[rel="stylesheet"]');
    for (var i = 0; i < links.length; i++) {
      var href = links[i].getAttribute('href');
      var hostname = getHostname();
      var servedFromHMRServer =
        hostname === 'localhost'
          ? new RegExp(
              '^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort(),
            ).test(href)
          : href.indexOf(hostname + ':' + getPort());
      var absolute =
        /^https?:\/\//i.test(href) &&
        href.indexOf(window.location.origin) !== 0 &&
        !servedFromHMRServer;
      if (!absolute) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (asset.type === 'css') {
    reloadCSS();
    return;
  }

  let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
  if (deps) {
    var fn = new Function('require', 'module', 'exports', asset.output);
    modules[asset.id] = [fn, deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!asset.depsByBundle[bundle.HMR_BUNDLE_ID]) {
    // If we reached the root bundle without finding where the asset should go,
    // there's nothing to do. Mark as "accepted" so we don't reload the page.
    if (!bundle.parent) {
      return true;
    }

    return hmrAcceptCheck(bundle.parent, asset);
  }

  let id = asset.id;
  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;

  var cached = bundle.cache[id];

  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(module.bundle.root, id).some(function(v) {
    return hmrAcceptCheck(v[0], v[1]);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached && cached.hot) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function(cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function(cb) {
      var assetsToAlsoAccept = cb(function() {
        return getParents(module.bundle.root, id);
      });
      if (assetsToAlsoAccept && assetsToAccept.length) {
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
      }
    });
  }
  acceptedAssets[id] = true;
}

},{}],"7qT7c":[function(require,module,exports) {
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
    L.tileLayer('http://{s}.tile.thunderforest.com/outdoors/{z}/{x}/{y}.png', {
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
    if (!this.#workouts.length > 1)
      return console.log(`No workouts found in local storage`);
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

},{}]},["90vTS","7qT7c"], "7qT7c", "parcelRequire2526")

//# sourceMappingURL=index.56f57d74.js.map
