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
"use strict";
var _babelRuntimeHelpersClassPrivateFieldGet = require("@babel/runtime/helpers/classPrivateFieldGet");
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
var _babelRuntimeHelpersClassPrivateFieldGetDefault = _parcelHelpers.interopDefault(_babelRuntimeHelpersClassPrivateFieldGet);
var _babelRuntimeHelpersClassPrivateFieldSet = require("@babel/runtime/helpers/classPrivateFieldSet");
var _babelRuntimeHelpersClassPrivateFieldSetDefault = _parcelHelpers.interopDefault(_babelRuntimeHelpersClassPrivateFieldSet);
var _babelRuntimeHelpersAssertThisInitialized = require("@babel/runtime/helpers/assertThisInitialized");
var _babelRuntimeHelpersAssertThisInitializedDefault = _parcelHelpers.interopDefault(_babelRuntimeHelpersAssertThisInitialized);
var _babelRuntimeHelpersInherits = require("@babel/runtime/helpers/inherits");
var _babelRuntimeHelpersInheritsDefault = _parcelHelpers.interopDefault(_babelRuntimeHelpersInherits);
var _babelRuntimeHelpersPossibleConstructorReturn = require("@babel/runtime/helpers/possibleConstructorReturn");
var _babelRuntimeHelpersPossibleConstructorReturnDefault = _parcelHelpers.interopDefault(_babelRuntimeHelpersPossibleConstructorReturn);
var _babelRuntimeHelpersGetPrototypeOf = require("@babel/runtime/helpers/getPrototypeOf");
var _babelRuntimeHelpersGetPrototypeOfDefault = _parcelHelpers.interopDefault(_babelRuntimeHelpersGetPrototypeOf);
var _babelRuntimeHelpersClassCallCheck = require("@babel/runtime/helpers/classCallCheck");
var _babelRuntimeHelpersClassCallCheckDefault = _parcelHelpers.interopDefault(_babelRuntimeHelpersClassCallCheck);
var _babelRuntimeHelpersCreateClass = require("@babel/runtime/helpers/createClass");
var _babelRuntimeHelpersCreateClassDefault = _parcelHelpers.interopDefault(_babelRuntimeHelpersCreateClass);
var _babelRuntimeHelpersDefineProperty = require("@babel/runtime/helpers/defineProperty");
var _babelRuntimeHelpersDefinePropertyDefault = _parcelHelpers.interopDefault(_babelRuntimeHelpersDefineProperty);
function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = _babelRuntimeHelpersGetPrototypeOfDefault.default(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _babelRuntimeHelpersGetPrototypeOfDefault.default(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _babelRuntimeHelpersPossibleConstructorReturnDefault.default(this, result);
  };
}
function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}
// Select all Relevant HTML Elements
var form = document.querySelector('.form');
var containerWorkouts = document.querySelector('.workouts');
var inputType = document.querySelector('.form__input--type');
var inputDistance = document.querySelector('.form__input--distance');
var inputDuration = document.querySelector('.form__input--duration');
var inputCadence = document.querySelector('.form__input--cadence');
var inputElevation = document.querySelector('.form__input--elevation');
var deleteAll = document.querySelector('.workouts__deleteAll');
var sortBy = document.querySelector('.sort-by');
var instructions = document.querySelector('.instructions');
var Workout = /*#__PURE__*/(function () {
  function Workout(date, coords, distance, duration) {
    _babelRuntimeHelpersClassCallCheckDefault.default(this, Workout);
    _babelRuntimeHelpersDefinePropertyDefault.default(this, "id", (Date.now() + '').slice(-7));
    this.date = new Date(date);
    // date
    this.coords = coords;
    // [lat, lng]
    this.distance = distance;
    // km
    this.duration = duration;
  }
  _babelRuntimeHelpersCreateClassDefault.default(Workout, [{
    key: "description",
    value: function description() {
      // prettier-ignore
      var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      return ("").concat(this.type[0].toUpperCase()).concat(this.type.slice(1), " on \n    ").concat(months[this.date.getMonth()], " ").concat(this.date.getDate(), ", ").concat(this.date.getFullYear());
    }
  }]);
  return Workout;
})();
var Running = /*#__PURE__*/(function (_Workout) {
  _babelRuntimeHelpersInheritsDefault.default(Running, _Workout);
  var _super = _createSuper(Running);
  function Running(date, coords, distance, duration, cadence) {
    var _this;
    _babelRuntimeHelpersClassCallCheckDefault.default(this, Running);
    _this = _super.call(this, date, coords, distance, duration);
    _babelRuntimeHelpersDefinePropertyDefault.default(_babelRuntimeHelpersAssertThisInitializedDefault.default(_this), "type", 'running');
    _this.cadence = cadence;
    _this.calcPace();
    _this.description = _this.description();
    return _this;
  }
  _babelRuntimeHelpersCreateClassDefault.default(Running, [{
    key: "calcPace",
    value: function calcPace() {
      this.pace = this.duration / this.distance;
      // min/km
      return this.pace;
    }
  }]);
  return Running;
})(Workout);
var Cycling = /*#__PURE__*/(function (_Workout2) {
  _babelRuntimeHelpersInheritsDefault.default(Cycling, _Workout2);
  var _super2 = _createSuper(Cycling);
  function Cycling(date, coords, distance, duration, elevationGain) {
    var _this2;
    _babelRuntimeHelpersClassCallCheckDefault.default(this, Cycling);
    _this2 = _super2.call(this, date, coords, distance, duration);
    _babelRuntimeHelpersDefinePropertyDefault.default(_babelRuntimeHelpersAssertThisInitializedDefault.default(_this2), "type", 'cycling');
    _this2.elevationGain = elevationGain;
    _this2.description = _this2.description();
    _this2.calcSpeed();
    return _this2;
  }
  _babelRuntimeHelpersCreateClassDefault.default(Cycling, [{
    key: "calcSpeed",
    value: function calcSpeed() {
      this.speed = this.distance / (this.duration / 60);
      // km/h
      return this.speed;
    }
  }]);
  return Cycling;
})(Workout);
var _map = new WeakMap();
var _marker = new WeakMap();
var _workouts = new WeakMap();
var _zoomLevel = new WeakMap();
var _workoutDate = new WeakMap();
var App = /*#__PURE__*/(function () {
  function App() {
    _babelRuntimeHelpersClassCallCheckDefault.default(this, App);
    _map.set(this, {
      writable: true,
      value: void 0
    });
    _marker.set(this, {
      writable: true,
      value: void 0
    });
    _workouts.set(this, {
      writable: true,
      value: []
    });
    _zoomLevel.set(this, {
      writable: true,
      value: 13
    });
    _workoutDate.set(this, {
      writable: true,
      value: ''
    });
    _babelRuntimeHelpersDefinePropertyDefault.default(this, "_checkExistingWorkoutDate", function () {
      var date = new Date();
      if (_babelRuntimeHelpersClassPrivateFieldGetDefault.default(this, _workoutDate)) {
        date = _babelRuntimeHelpersClassPrivateFieldGetDefault.default(this, _workoutDate);
        _babelRuntimeHelpersClassPrivateFieldSetDefault.default(this, _workoutDate, '');
      }
      return new Date(date);
    });
    // object initialization through class App methods
    this._getPosition();
    this._getLocalStorage();
    this._checkExistingWorkouts();
    // All event listners
    form.addEventListener('submit', this._newWorkout.bind(this));
    inputType.addEventListener('change', this._toggleElevationField);
    containerWorkouts.addEventListener('click', (function (e) {
      this._moveToPopUp(e);
      this._deleteWorkout(e);
      this._editWorkout(e);
    }).bind(this));
    deleteAll.addEventListener('click', this._deleteAllWorkouts.bind(this));
    sortBy.addEventListener('change', this._sortBy.bind(this));
  }
  _babelRuntimeHelpersCreateClassDefault.default(App, [{
    key: "_getPosition",
    value: function _getPosition() {
      navigator.geolocation.getCurrentPosition(this._loadMap.bind(this), function () {
        alert("Location Not Enabled OR Found. Please refresh the page and ALLOW location to start using the app. Thank You");
      });
    }
  }, {
    key: "_loadMap",
    value: function _loadMap(pos) {
      // callback function
      var latitude = pos.coords.latitude;
      var longitude = pos.coords.longitude;
      var coords = [latitude, longitude];
      // adding Leaflet
      // map and marker object intialization
      _babelRuntimeHelpersClassPrivateFieldSetDefault.default(this, _map, L.map('map').setView(coords, _babelRuntimeHelpersClassPrivateFieldGetDefault.default(this, _zoomLevel)));
      _babelRuntimeHelpersClassPrivateFieldSetDefault.default(this, _marker, L.marker(coords));
      // adding tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(_babelRuntimeHelpersClassPrivateFieldGetDefault.default(this, _map));
      // display map markers from the storage
      this._displayLocalStorageMapMarkers();
      // setting the map view and zoom level based on current location
      _babelRuntimeHelpersClassPrivateFieldGetDefault.default(this, _map).setView(coords, _babelRuntimeHelpersClassPrivateFieldGetDefault.default(this, _zoomLevel), {
        animate: false
      });
      // listen to any click event on the map and display the workout form
      _babelRuntimeHelpersClassPrivateFieldGetDefault.default(this, _map).on('click', this._showForm.bind(this));
    }
  }, {
    key: "_showForm",
    value: function _showForm(e) {
      // callback function
      // getting lat lng of where user clicked
      var _e$latlng = e.latlng, latitude = _e$latlng.lat, longitude = _e$latlng.lng;
      // if current marker is not attached to a workout, remove it -- else update current marker
      if (!_babelRuntimeHelpersClassPrivateFieldGetDefault.default(this, _marker).isPopupOpen()) _babelRuntimeHelpersClassPrivateFieldGetDefault.default(this, _marker).remove();
      _babelRuntimeHelpersClassPrivateFieldSetDefault.default(this, _marker, L.marker([latitude, longitude]).addTo(_babelRuntimeHelpersClassPrivateFieldGetDefault.default(this, _map)));
      // hide the getting started instructions
      instructions.classList.add('hide__instructions');
      // show the form
      form.classList.remove('hidden');
      inputType.focus();
    }
  }, {
    key: "_toggleElevationField",
    value: function _toggleElevationField() {
      // callback function
      // to toggle between cadence and elevation fields
      inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
      inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    }
  }, {
    key: "_newWorkout",
    value: function _newWorkout(e) {
      e.preventDefault();
      var workout;
      var _classPrivateFieldGet2 = _babelRuntimeHelpersClassPrivateFieldGetDefault.default(this, _marker).getLatLng(), latitude = _classPrivateFieldGet2.lat, longitude = _classPrivateFieldGet2.lng;
      var coords = [latitude, longitude];
      var date = this._checkExistingWorkoutDate();
      var inputValidations = function inputValidations() {
        for (var _len = arguments.length, inputs = new Array(_len), _key = 0; _key < _len; _key++) {
          inputs[_key] = arguments[_key];
        }
        // using rest parameters
        var validIntegers = inputs.every(function (input) {
          return Number.isFinite(input);
        });
        var positiveIntegers = inputs.every(function (input) {
          return input > 0;
        });
        return validIntegers && positiveIntegers;
      };
      // Get data from the form
      var type = inputType.value;
      var distance = Number(inputDistance.value);
      var duration = Number(inputDuration.value);
      // if workout is running, create a running object
      if (type === 'running') {
        var cadence = Number(inputCadence.value);
        // Check if the input is valid
        if (!inputValidations(distance, duration, cadence)) return alert("Please enter a value. \n  Values MUST be a positive number.");
        // guard clause
        // create a running object
        workout = new Running(date, coords, distance, duration, cadence);
      }
      // if workout is cycling, create a cycling object
      if (type === 'cycling') {
        var elevation = Number(inputElevation.value);
        // Check if the input is valid
        if (!inputValidations(distance, duration) && isNaN(elevation)) return alert("Please enter a value. \n  Values MUST be a positive number.");
        // guard clause
        // create a cycling object
        workout = new Cycling(date, coords, distance, duration, elevation);
      }
      // add the new object to workout array
      _babelRuntimeHelpersClassPrivateFieldGetDefault.default(this, _workouts).push(workout);
      // Render workout on a map as a marker
      this._renderWorkoutOnMap(workout);
      // Render workout on the list
      this._renderWorkoutOnList(workout);
      // Check if there is need to display DeleteAll or Sort buttons
      this._checkExistingWorkouts();
      // Hide form and clear input fields
      this._resetFields();
      // save wokouts to local storage
      this._setLocalStorage();
    }
  }, {
    key: "_renderWorkoutOnMap",
    value: function _renderWorkoutOnMap(workout) {
      _babelRuntimeHelpersClassPrivateFieldGetDefault.default(this, _marker).bindPopup(L.popup({
        maxWidth: 250,
        minWidth: 100,
        autoClose: false,
        closeOnClick: false,
        closeButton: false,
        className: ("").concat(workout.type, "-popup")
      }).setContent(("").concat(workout.type === 'running' ? '🏃‍♂️' : '🚴‍', " ").concat(workout.description))).openPopup();
    }
  }, {
    key: "_renderWorkoutOnList",
    value: function _renderWorkoutOnList(workout) {
      var html = ("\n    <li class=\"workout workout--").concat(workout.type, "\" data-id=\"").concat(workout.id, "\">\n      <h2 class=\"workout__title\">").concat(workout.description, "</h2>\n      <span class=\"workout__edit\"><i class=\"fas fa-edit\"></i></span>\n      <span class=\"workout__delete\"><i class=\"far fa-trash-alt\"></i></span>\n      <div class=\"workout__details\">\n        <span class=\"workout__icon\">").concat(workout.type === 'running' ? '🏃‍♂️' : '🚴‍', "</span>\n        <span class=\"workout__value\">").concat(workout.distance, "</span>\n        <span class=\"workout__unit\">km</span>\n      </div>\n      <div class=\"workout__details\">\n        <span class=\"workout__icon\">⏱</span>\n        <span class=\"workout__value\">").concat(workout.duration, "</span>\n        <span class=\"workout__unit\">min</span>\n      </div>");
      if (workout.type === 'running') {
        var _workout$pace;
        html = html + ("\n        <div class=\"workout__details\">\n        <span class=\"workout__icon\">⚡️</span>\n        <span class=\"workout__value\">").concat((_workout$pace = workout.pace) === null || _workout$pace === void 0 ? void 0 : _workout$pace.toFixed(1), "</span>\n        <span class=\"workout__unit\">min/km</span>\n      </div>\n      <div class=\"workout__details\">\n        <span class=\"workout__icon\">🦶🏼</span>\n        <span class=\"workout__value\">").concat(workout.cadence, "</span>\n        <span class=\"workout__unit\">spm</span>\n      </div>\n    </li>");
      }
      if (workout.type === 'cycling') {
        var _workout$speed;
        html = html + ("\n        <div class=\"workout__details\">\n        <span class=\"workout__icon\">⚡️</span>\n        <span class=\"workout__value\">").concat((_workout$speed = workout.speed) === null || _workout$speed === void 0 ? void 0 : _workout$speed.toFixed(1), "</span>\n        <span class=\"workout__unit\">km/h</span>\n      </div>\n      <div class=\"workout__details\">\n        <span class=\"workout__icon\">⛰</span>\n        <span class=\"workout__value\">").concat(workout.elevationGain, "</span>\n        <span class=\"workout__unit\">m</span>\n      </div>\n    </li>");
      }
      form.insertAdjacentHTML('afterend', html);
    }
  }, {
    key: "_moveToPopUp",
    value: function _moveToPopUp(e) {
      if (!e.target.closest('.workout')) return;
      var workoutId = e.target.closest('.workout').dataset.id;
      var workout = _babelRuntimeHelpersClassPrivateFieldGetDefault.default(this, _workouts).find(function (workout) {
        return workout.id === workoutId;
      });
      _babelRuntimeHelpersClassPrivateFieldGetDefault.default(this, _map).setView(workout.coords, _babelRuntimeHelpersClassPrivateFieldGetDefault.default(this, _zoomLevel), {
        animate: true,
        duration: 1
      });
    }
  }, {
    key: "_resetFields",
    value: function _resetFields() {
      inputCadence.value = inputDistance.value = inputDuration.value = inputElevation.value = '';
      inputDistance.blur();
      inputCadence.blur();
      inputDuration.blur();
      inputElevation.blur();
      form.style.display = 'none';
      form.classList.add('hidden');
      setTimeout(function () {
        return form.style.display = 'grid';
      }, 1000);
    }
  }, {
    key: "_setLocalStorage",
    value: function _setLocalStorage() {
      // stringify arrays and objects
      localStorage.setItem('workouts', JSON.stringify(_babelRuntimeHelpersClassPrivateFieldGetDefault.default(this, _workouts)));
    }
  }, {
    key: "_displayLocalStorageMapMarkers",
    value: function _displayLocalStorageMapMarkers() {
      var _this3 = this;
      // display and set workouts markers on the map, if any when the map loads for the first time
      if (!_babelRuntimeHelpersClassPrivateFieldGetDefault.default(this, _workouts).length >= 1) {
        return console.log("No workouts found in local storage");
      }
      // hide the getting started instructions
      instructions.classList.add('hide__instructions');
      _babelRuntimeHelpersClassPrivateFieldGetDefault.default(this, _workouts).forEach(function (workout) {
        _babelRuntimeHelpersClassPrivateFieldSetDefault.default(_this3, _marker, L.marker(workout.coords).addTo(_babelRuntimeHelpersClassPrivateFieldGetDefault.default(_this3, _map)));
        _this3._renderWorkoutOnMap(workout);
      });
    }
  }, {
    key: "_populateForm",
    value: function _populateForm(workout) {
      inputType.value = workout.type;
      inputDistance.value = workout.distance;
      inputDuration.value = workout.duration;
      _babelRuntimeHelpersClassPrivateFieldSetDefault.default(this, _marker, L.marker(workout.coords).addTo(_babelRuntimeHelpersClassPrivateFieldGetDefault.default(this, _map)));
      if (workout.type === 'running') {
        inputCadence.value = workout.cadence;
        inputCadence.closest('.form__row').classList.remove('form__row--hidden');
        inputElevation.closest('.form__row').classList.add('form__row--hidden');
      }
      if (workout.type === 'cycling') {
        inputElevation.value = workout.elevationGain;
        inputElevation.closest('.form__row').classList.remove('form__row--hidden');
        inputCadence.closest('.form__row').classList.add('form__row--hidden');
      }
      inputDistance.focus();
    }
  }, {
    key: "_editWorkout",
    value: function _editWorkout(e) {
      if (!e.target.closest('.workout__edit')) return;
      var workout = e.target.closest('.workout');
      var workoutId = workout.dataset.id;
      var workoutToEdit = _babelRuntimeHelpersClassPrivateFieldGetDefault.default(this, _workouts).find(function (workout) {
        return workout.id === workoutId;
      });
      _babelRuntimeHelpersClassPrivateFieldSetDefault.default(this, _workoutDate, workoutToEdit.date);
      workout.style.display = 'none';
      form.classList.remove('hidden');
      // hide the getting started instructions
      instructions.classList.add('hide__instructions');
      setTimeout(function () {
        return form.style.display = 'grid';
      }, 1000);
      this._populateForm(workoutToEdit);
      _babelRuntimeHelpersClassPrivateFieldGetDefault.default(this, _workouts).splice(_babelRuntimeHelpersClassPrivateFieldGetDefault.default(this, _workouts).indexOf(workoutToEdit), 1);
    }
  }, {
    key: "_getLocalStorage",
    value: function _getLocalStorage() {
      var _this4 = this;
      // parse data using JSON
      var data = JSON.parse(localStorage.getItem('workouts'));
      // display workouts on the list
      if (!data) return;
      _babelRuntimeHelpersClassPrivateFieldSetDefault.default(this, _workouts, data);
      _babelRuntimeHelpersClassPrivateFieldGetDefault.default(this, _workouts).forEach(function (workout) {
        return _this4._renderWorkoutOnList(workout);
      });
    }
  }, {
    key: "_deleteWorkout",
    value: function _deleteWorkout(e) {
      if (!e.target.closest('.workout__delete')) return;
      var workout = e.target.closest('.workout');
      workout.style.display = 'none';
      var workoutId = workout.dataset.id;
      var workoutToDelete = _babelRuntimeHelpersClassPrivateFieldGetDefault.default(this, _workouts).find(function (workout) {
        return workout.id === workoutId;
      });
      _babelRuntimeHelpersClassPrivateFieldGetDefault.default(this, _workouts).splice(_babelRuntimeHelpersClassPrivateFieldGetDefault.default(this, _workouts).indexOf(workoutToDelete), 1);
      _babelRuntimeHelpersClassPrivateFieldGetDefault.default(this, _map).eachLayer(function (layer) {
        if (layer.options.attribution) return;
        layer.remove();
      });
      this._displayLocalStorageMapMarkers();
      this._setLocalStorage();
      this._checkExistingWorkouts();
    }
  }, {
    key: "_deleteAllWorkouts",
    value: function _deleteAllWorkouts(e) {
      this.reset();
    }
  }, {
    key: "_checkExistingWorkouts",
    value: function _checkExistingWorkouts() {
      if (_babelRuntimeHelpersClassPrivateFieldGetDefault.default(this, _workouts).length < 1) {
        deleteAll.style.display = 'none';
        sortBy.style.display = 'none';
      } else {
        deleteAll.style.display = 'flex';
        sortBy.style.display = 'flex';
      }
    }
  }, {
    key: "_sortByData",
    value: function _sortByData(data) {
      var _this5 = this;
      var newOrder = _babelRuntimeHelpersClassPrivateFieldGetDefault.default(this, _workouts).sort(function (wa, wb) {
        return wa[data] - wb[data];
      });
      var currentWorkouts = document.querySelectorAll('.workout');
      currentWorkouts.forEach(function (el) {
        return el.style.display = 'none';
      });
      newOrder.forEach(function (el) {
        return _this5._renderWorkoutOnList(el);
      });
    }
  }, {
    key: "_sortByDate",
    value: function _sortByDate() {
      var _this6 = this;
      var newOrder = _babelRuntimeHelpersClassPrivateFieldGetDefault.default(this, _workouts).sort(function (wa, wb) {
        return new Date(wb.date) - new Date(wa.date);
      });
      var currentWorkouts = document.querySelectorAll('.workout');
      currentWorkouts.forEach(function (el) {
        return el.style.display = 'none';
      });
      newOrder.forEach(function (el) {
        return _this6._renderWorkoutOnList(el);
      });
    }
  }, {
    key: "_sortBy",
    value: function _sortBy() {
      if (sortBy.value === 'distance') this._sortByData('distance');
      if (sortBy.value === 'duration') this._sortByData('duration');
      if (sortBy.value === 'date') this._sortByDate();
    }
  }, {
    key: "reset",
    value: function reset() {
      // the only public method
      // direct access in console through app object
      localStorage.removeItem('workouts');
      location.reload();
    }
  }]);
  return App;
})();
var app = new App();

},{"@babel/runtime/helpers/classPrivateFieldGet":"1AC5E","@babel/runtime/helpers/classPrivateFieldSet":"5gZMZ","@babel/runtime/helpers/assertThisInitialized":"1BXAs","@babel/runtime/helpers/inherits":"dNu3I","@babel/runtime/helpers/possibleConstructorReturn":"3vcut","@babel/runtime/helpers/getPrototypeOf":"7d4Cy","@babel/runtime/helpers/classCallCheck":"2bdFw","@babel/runtime/helpers/createClass":"2EITm","@babel/runtime/helpers/defineProperty":"5PI63","@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}],"1AC5E":[function(require,module,exports) {
function _classPrivateFieldGet(receiver, privateMap) {
  var descriptor = privateMap.get(receiver);

  if (!descriptor) {
    throw new TypeError("attempted to get private field on non-instance");
  }

  if (descriptor.get) {
    return descriptor.get.call(receiver);
  }

  return descriptor.value;
}

module.exports = _classPrivateFieldGet;
module.exports["default"] = module.exports, module.exports.__esModule = true;
},{}],"5gZMZ":[function(require,module,exports) {
function _classPrivateFieldSet(receiver, privateMap, value) {
  var descriptor = privateMap.get(receiver);

  if (!descriptor) {
    throw new TypeError("attempted to set private field on non-instance");
  }

  if (descriptor.set) {
    descriptor.set.call(receiver, value);
  } else {
    if (!descriptor.writable) {
      throw new TypeError("attempted to set read only private field");
    }

    descriptor.value = value;
  }

  return value;
}

module.exports = _classPrivateFieldSet;
module.exports["default"] = module.exports, module.exports.__esModule = true;
},{}],"1BXAs":[function(require,module,exports) {
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

module.exports = _assertThisInitialized;
module.exports["default"] = module.exports, module.exports.__esModule = true;
},{}],"dNu3I":[function(require,module,exports) {
var setPrototypeOf = require("./setPrototypeOf.js");

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) setPrototypeOf(subClass, superClass);
}

module.exports = _inherits;
module.exports["default"] = module.exports, module.exports.__esModule = true;
},{"./setPrototypeOf.js":"37Yld"}],"37Yld":[function(require,module,exports) {
function _setPrototypeOf(o, p) {
  module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  module.exports["default"] = module.exports, module.exports.__esModule = true;
  return _setPrototypeOf(o, p);
}

module.exports = _setPrototypeOf;
module.exports["default"] = module.exports, module.exports.__esModule = true;
},{}],"3vcut":[function(require,module,exports) {
var _typeof = require("@babel/runtime/helpers/typeof")["default"];

var assertThisInitialized = require("./assertThisInitialized.js");

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }

  return assertThisInitialized(self);
}

module.exports = _possibleConstructorReturn;
module.exports["default"] = module.exports, module.exports.__esModule = true;
},{"@babel/runtime/helpers/typeof":"3F8fn","./assertThisInitialized.js":"1BXAs"}],"3F8fn":[function(require,module,exports) {
function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    module.exports = _typeof = function _typeof(obj) {
      return typeof obj;
    };

    module.exports["default"] = module.exports, module.exports.__esModule = true;
  } else {
    module.exports = _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };

    module.exports["default"] = module.exports, module.exports.__esModule = true;
  }

  return _typeof(obj);
}

module.exports = _typeof;
module.exports["default"] = module.exports, module.exports.__esModule = true;
},{}],"7d4Cy":[function(require,module,exports) {
function _getPrototypeOf(o) {
  module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  module.exports["default"] = module.exports, module.exports.__esModule = true;
  return _getPrototypeOf(o);
}

module.exports = _getPrototypeOf;
module.exports["default"] = module.exports, module.exports.__esModule = true;
},{}],"2bdFw":[function(require,module,exports) {
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

module.exports = _classCallCheck;
module.exports["default"] = module.exports, module.exports.__esModule = true;
},{}],"2EITm":[function(require,module,exports) {
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

module.exports = _createClass;
module.exports["default"] = module.exports, module.exports.__esModule = true;
},{}],"5PI63":[function(require,module,exports) {
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

module.exports = _defineProperty;
module.exports["default"] = module.exports, module.exports.__esModule = true;
},{}],"5gA8y":[function(require,module,exports) {
"use strict";

exports.interopDefault = function (a) {
  return a && a.__esModule ? a : {
    default: a
  };
};

exports.defineInteropFlag = function (a) {
  Object.defineProperty(a, '__esModule', {
    value: true
  });
};

exports.exportAll = function (source, dest) {
  Object.keys(source).forEach(function (key) {
    if (key === 'default' || key === '__esModule') {
      return;
    } // Skip duplicate re-exports when they have the same value.


    if (key in dest && dest[key] === source[key]) {
      return;
    }

    Object.defineProperty(dest, key, {
      enumerable: true,
      get: function () {
        return source[key];
      }
    });
  });
  return dest;
};

exports.export = function (dest, destName, get) {
  Object.defineProperty(dest, destName, {
    enumerable: true,
    get: get
  });
};
},{}]},["90vTS","7qT7c"], "7qT7c", "parcelRequire2526")

//# sourceMappingURL=index.56f57d74.js.map
