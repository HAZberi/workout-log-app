!function(){function t(t){return t&&t.__esModule?t.default:t}var e,n={};e=n=function(t,e){var n=e.get(t);if(!n)throw new TypeError("attempted to get private field on non-instance");return n.get?n.get.call(t):n.value},n.default=e,n.__esModule=true;var o,r=t(n),a={};o=a=function(t,e,n){var o=e.get(t);if(!o)throw new TypeError("attempted to set private field on non-instance");if(o.set)o.set.call(t,n);else{if(!o.writable)throw new TypeError("attempted to set read only private field");o.value=n}return n},a.default=o,a.__esModule=true;var i,s=t(a),u={};i=u=function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t},u.default=i,u.__esModule=true;var l,c,d,p=t(u),f={},_={};function h(t,e){return _=h=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t},c=_,_.default=c,d=!0,_.__esModule=d,h(t,e)}c=_=h,_.default=c,d=!0,_.__esModule=d;var v=_;l=f=function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&v(t,e)},f.default=l,f.__esModule=true;var y,k,w,m=t(f),g={},b={};function M(t){return"function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?(b=M=function(t){return typeof t},k=b,b.default=k,w=!0,b.__esModule=w):(b=M=function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},k=b,b.default=k,w=!0,b.__esModule=w),M(t)}k=b=M,b.default=k,w=!0,b.__esModule=w;var S=b.default,O=u;y=g=function(t,e){return!e||"object"!==S(e)&&"function"!=typeof e?O(t):e},g.default=y,g.__esModule=true;var W,E,P=t(g),T={};function x(t){return T=x=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},W=T,T.default=W,E=!0,T.__esModule=E,x(t)}W=T=x,T.default=W,E=!0,T.__esModule=E;var D,F=t(T),N={};D=N=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")},N.default=D,N.__esModule=true;var q,A=t(N),B={};function j(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}q=B=function(t,e,n){return e&&j(t.prototype,e),n&&j(t,n),t},B.default=q,B.__esModule=true;var R,C=t(B),J={};R=J=function(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t},J.default=R,J.__esModule=true;var U=t(J);function V(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,o=F(t);if(e){var r=F(this).constructor;n=Reflect.construct(o,arguments,r)}else n=o.apply(this,arguments);return P(this,n)}}var G=document.querySelector(".form"),I=document.querySelector(".workouts"),Y=document.querySelector(".form__input--type"),z=document.querySelector(".form__input--distance"),H=document.querySelector(".form__input--duration"),K=document.querySelector(".form__input--cadence"),Q=document.querySelector(".form__input--elevation"),X=document.querySelector(".workouts__deleteAll"),Z=document.querySelector(".sort-by"),$=document.querySelector(".instructions"),tt=function(){function t(e,n,o,r){A(this,t),U(this,"id",(Date.now()+"").slice(-7)),this.date=new Date(e),this.coords=n,this.distance=o,this.duration=r}return C(t,[{key:"description",value:function(){return"".concat(this.type[0].toUpperCase()).concat(this.type.slice(1)," on \n    ").concat(["January","February","March","April","May","June","July","August","September","October","November","December"][this.date.getMonth()]," ").concat(this.date.getDate(),", ").concat(this.date.getFullYear())}}]),t}(),et=function(t){m(n,t);var e=V(n);function n(t,o,r,a,i){var s;return A(this,n),s=e.call(this,t,o,r,a),U(p(s),"type","running"),s.cadence=i,s.calcPace(),s.description=s.description(),s}return C(n,[{key:"calcPace",value:function(){return this.pace=this.duration/this.distance,this.pace}}]),n}(tt),nt=function(t){m(n,t);var e=V(n);function n(t,o,r,a,i){var s;return A(this,n),s=e.call(this,t,o,r,a),U(p(s),"type","cycling"),s.elevationGain=i,s.description=s.description(),s.calcSpeed(),s}return C(n,[{key:"calcSpeed",value:function(){return this.speed=this.distance/(this.duration/60),this.speed}}]),n}(tt),ot=new WeakMap,rt=new WeakMap,at=new WeakMap,it=new WeakMap,st=new WeakMap;new(function(){function t(){A(this,t),ot.set(this,{writable:!0,value:void 0}),rt.set(this,{writable:!0,value:void 0}),at.set(this,{writable:!0,value:[]}),it.set(this,{writable:!0,value:13}),st.set(this,{writable:!0,value:""}),U(this,"_checkExistingWorkoutDate",(function(){var t=new Date;return r(this,st)&&(t=r(this,st),s(this,st,"")),new Date(t)})),this._getPosition(),this._getLocalStorage(),this._checkExistingWorkouts(),G.addEventListener("submit",this._newWorkout.bind(this)),Y.addEventListener("change",this._toggleElevationField),I.addEventListener("click",function(t){this._moveToPopUp(t),this._deleteWorkout(t),this._editWorkout(t)}.bind(this)),X.addEventListener("click",this._deleteAllWorkouts.bind(this)),Z.addEventListener("change",this._sortBy.bind(this))}return C(t,[{key:"_getPosition",value:function(){navigator.geolocation.getCurrentPosition(this._loadMap.bind(this),(function(){alert("Location Not Enabled OR Found. Please refresh the page and ALLOW location to start using the app. Thank You")}))}},{key:"_loadMap",value:function(t){var e=[t.coords.latitude,t.coords.longitude];s(this,ot,L.map("map").setView(e,r(this,it))),s(this,rt,L.marker(e)),L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(r(this,ot)),this._displayLocalStorageMapMarkers(),r(this,ot).setView(e,r(this,it),{animate:!1}),r(this,ot).on("click",this._showForm.bind(this))}},{key:"_showForm",value:function(t){var e=t.latlng,n=e.lat,o=e.lng;r(this,rt).isPopupOpen()||r(this,rt).remove(),s(this,rt,L.marker([n,o]).addTo(r(this,ot))),$.classList.add("hide__instructions"),G.classList.remove("hidden"),Y.focus()}},{key:"_toggleElevationField",value:function(){K.closest(".form__row").classList.toggle("form__row--hidden"),Q.closest(".form__row").classList.toggle("form__row--hidden")}},{key:"_newWorkout",value:function(t){var e;t.preventDefault();var n=r(this,rt).getLatLng(),o=[n.lat,n.lng],a=this._checkExistingWorkoutDate(),i=function(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];var o=e.every((function(t){return Number.isFinite(t)})),r=e.every((function(t){return t>0}));return o&&r},s=Y.value,u=Number(z.value),l=Number(H.value);if("running"===s){var c=Number(K.value);if(!i(u,l,c))return alert("Please enter a value. \n  Values MUST be a positive number.");e=new et(a,o,u,l,c)}if("cycling"===s){var d=Number(Q.value);if(!i(u,l)&&isNaN(d))return alert("Please enter a value. \n  Values MUST be a positive number.");e=new nt(a,o,u,l,d)}r(this,at).push(e),this._renderWorkoutOnMap(e),this._renderWorkoutOnList(e),this._checkExistingWorkouts(),this._resetFields(),this._setLocalStorage()}},{key:"_renderWorkoutOnMap",value:function(t){r(this,rt).bindPopup(L.popup({maxWidth:250,minWidth:100,autoClose:!1,closeOnClick:!1,closeButton:!1,className:"".concat(t.type,"-popup")}).setContent("".concat("running"===t.type?"🏃‍♂️":"🚴‍"," ").concat(t.description))).openPopup()}},{key:"_renderWorkoutOnList",value:function(t){var e,n,o='\n    <li class="workout workout--'.concat(t.type,'" data-id="').concat(t.id,'">\n      <h2 class="workout__title">').concat(t.description,'</h2>\n      <span class="workout__edit"><i class="fas fa-edit"></i></span>\n      <span class="workout__delete"><i class="far fa-trash-alt"></i></span>\n      <div class="workout__details">\n        <span class="workout__icon">').concat("running"===t.type?"🏃‍♂️":"🚴‍",'</span>\n        <span class="workout__value">').concat(t.distance,'</span>\n        <span class="workout__unit">km</span>\n      </div>\n      <div class="workout__details">\n        <span class="workout__icon">⏱</span>\n        <span class="workout__value">').concat(t.duration,'</span>\n        <span class="workout__unit">min</span>\n      </div>');"running"===t.type&&(o+='\n        <div class="workout__details">\n        <span class="workout__icon">⚡️</span>\n        <span class="workout__value">'.concat(null===(e=t.pace)||void 0===e?void 0:e.toFixed(1),'</span>\n        <span class="workout__unit">min/km</span>\n      </div>\n      <div class="workout__details">\n        <span class="workout__icon">🦶🏼</span>\n        <span class="workout__value">').concat(t.cadence,'</span>\n        <span class="workout__unit">spm</span>\n      </div>\n    </li>'));"cycling"===t.type&&(o+='\n        <div class="workout__details">\n        <span class="workout__icon">⚡️</span>\n        <span class="workout__value">'.concat(null===(n=t.speed)||void 0===n?void 0:n.toFixed(1),'</span>\n        <span class="workout__unit">km/h</span>\n      </div>\n      <div class="workout__details">\n        <span class="workout__icon">⛰</span>\n        <span class="workout__value">').concat(t.elevationGain,'</span>\n        <span class="workout__unit">m</span>\n      </div>\n    </li>'));G.insertAdjacentHTML("afterend",o)}},{key:"_moveToPopUp",value:function(t){if(t.target.closest(".workout")){var e=t.target.closest(".workout").dataset.id,n=r(this,at).find((function(t){return t.id===e}));r(this,ot).setView(n.coords,r(this,it),{animate:!0,duration:1})}}},{key:"_resetFields",value:function(){K.value=z.value=H.value=Q.value="",z.blur(),K.blur(),H.blur(),Q.blur(),G.style.display="none",G.classList.add("hidden"),setTimeout((function(){return G.style.display="grid"}),1e3)}},{key:"_setLocalStorage",value:function(){localStorage.setItem("workouts",JSON.stringify(r(this,at)))}},{key:"_displayLocalStorageMapMarkers",value:function(){var t=this;if(!r(this,at).length>1)return console.log("No workouts found in local storage");r(this,at).forEach((function(e){s(t,rt,L.marker(e.coords).addTo(r(t,ot))),t._renderWorkoutOnMap(e)}))}},{key:"_populateForm",value:function(t){Y.value=t.type,z.value=t.distance,H.value=t.duration,s(this,rt,L.marker(t.coords).addTo(r(this,ot))),"running"===t.type&&(K.value=t.cadence,K.closest(".form__row").classList.remove("form__row--hidden"),Q.closest(".form__row").classList.add("form__row--hidden")),"cycling"===t.type&&(Q.value=t.elevationGain,Q.closest(".form__row").classList.remove("form__row--hidden"),K.closest(".form__row").classList.add("form__row--hidden")),z.focus()}},{key:"_editWorkout",value:function(t){if(t.target.closest(".workout__edit")){var e=t.target.closest(".workout"),n=e.dataset.id,o=r(this,at).find((function(t){return t.id===n}));s(this,st,o.date),e.style.display="none",G.classList.remove("hidden"),$.classList.add("hide__instructions"),setTimeout((function(){return G.style.display="grid"}),1e3),this._populateForm(o),r(this,at).splice(r(this,at).indexOf(o),1)}}},{key:"_getLocalStorage",value:function(){var t=this,e=JSON.parse(localStorage.getItem("workouts"));e&&(s(this,at,e),r(this,at).forEach((function(e){return t._renderWorkoutOnList(e)})))}},{key:"_deleteWorkout",value:function(t){if(t.target.closest(".workout__delete")){var e=t.target.closest(".workout");e.style.display="none";var n=e.dataset.id,o=r(this,at).find((function(t){return t.id===n}));r(this,at).splice(r(this,at).indexOf(o),1),r(this,ot).eachLayer((function(t){t.options.attribution||t.remove()})),this._displayLocalStorageMapMarkers(),this._setLocalStorage(),this._checkExistingWorkouts()}}},{key:"_deleteAllWorkouts",value:function(t){this.reset()}},{key:"_checkExistingWorkouts",value:function(){r(this,at).length<1?(X.style.display="none",Z.style.display="none"):(X.style.display="flex",Z.style.display="flex")}},{key:"_sortByData",value:function(t){var e=this,n=r(this,at).sort((function(e,n){return e[t]-n[t]}));document.querySelectorAll(".workout").forEach((function(t){return t.style.display="none"})),n.forEach((function(t){return e._renderWorkoutOnList(t)}))}},{key:"_sortByDate",value:function(){var t=this,e=r(this,at).sort((function(t,e){return new Date(e.date)-new Date(t.date)}));document.querySelectorAll(".workout").forEach((function(t){return t.style.display="none"})),e.forEach((function(e){return t._renderWorkoutOnList(e)}))}},{key:"_sortBy",value:function(){"distance"===Z.value&&this._sortByData("distance"),"duration"===Z.value&&this._sortByData("duration"),"date"===Z.value&&this._sortByDate()}},{key:"reset",value:function(){localStorage.removeItem("workouts"),location.reload()}}]),t}())}();
//# sourceMappingURL=index.9e2a6c9b.js.map
