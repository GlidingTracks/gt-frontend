(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./firebase-config.json":
/*!******************************!*\
  !*** ./firebase-config.json ***!
  \******************************/
/*! exports provided: apiKey, authDomain, databaseURL, projectId, storageBucket, messagingSenderId, default */
/***/ (function(module) {

module.exports = {"apiKey":"AIzaSyAppC_L-VHnTM1ezOvuiVCoKfFzFu6f5ZU","authDomain":"gt-backend-8b9c2.firebaseapp.com","databaseURL":"https://gt-backend-8b9c2.firebaseio.com","projectId":"gt-backend-8b9c2","storageBucket":"gt-backend-8b9c2.appspot.com","messagingSenderId":"1007838717530"};

/***/ }),

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\r\n"

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-header></app-header>\r\n<div class=\"container\">\r\n  <router-outlet></router-outlet>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var firebase_config_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! firebase-config.json */ "./firebase-config.json");
var firebase_config_json__WEBPACK_IMPORTED_MODULE_1___namespace = /*#__PURE__*/__webpack_require__.t(/*! firebase-config.json */ "./firebase-config.json", 1);
/* harmony import */ var firebase__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! firebase */ "./node_modules/firebase/dist/index.cjs.js");
/* harmony import */ var firebase__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(firebase__WEBPACK_IMPORTED_MODULE_2__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.title = 'Gliding Tracks';
        var config = {
            apiKey: firebase_config_json__WEBPACK_IMPORTED_MODULE_1__["apiKey"],
            authDomain: firebase_config_json__WEBPACK_IMPORTED_MODULE_1__["authDomain"],
            databaseURL: firebase_config_json__WEBPACK_IMPORTED_MODULE_1__["databaseURL"],
            projectId: firebase_config_json__WEBPACK_IMPORTED_MODULE_1__["projectId"],
            storageBucket: firebase_config_json__WEBPACK_IMPORTED_MODULE_1__["storageBucket"],
            messagingSenderId: firebase_config_json__WEBPACK_IMPORTED_MODULE_1__["messagingSenderId"]
        };
        if (!firebase__WEBPACK_IMPORTED_MODULE_2__["apps"].length) {
            firebase__WEBPACK_IMPORTED_MODULE_2__["initializeApp"](config);
        }
    }
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm5/ng-bootstrap.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _header_header_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./header/header.component */ "./src/app/header/header.component.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _auth_signup_signup_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./auth/signup/signup.component */ "./src/app/auth/signup/signup.component.ts");
/* harmony import */ var _auth_signin_signin_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./auth/signin/signin.component */ "./src/app/auth/signin/signin.component.ts");
/* harmony import */ var _map_view_map_view_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./map-view/map-view.component */ "./src/app/map-view/map-view.component.ts");
/* harmony import */ var _upload_upload_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./upload/upload.component */ "./src/app/upload/upload.component.ts");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./services/auth.service */ "./src/app/services/auth.service.ts");
/* harmony import */ var _services_auth_guard_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./services/auth-guard.service */ "./src/app/services/auth-guard.service.ts");
/* harmony import */ var _services_map_view_service__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./services/map-view.service */ "./src/app/services/map-view.service.ts");
/* harmony import */ var _pipes_latitude_pipe__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./pipes/latitude.pipe */ "./src/app/pipes/latitude.pipe.ts");
/* harmony import */ var _pipes_longitude_pipe__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./pipes/longitude.pipe */ "./src/app/pipes/longitude.pipe.ts");
/* harmony import */ var _tracks_tracks_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./tracks/tracks.component */ "./src/app/tracks/tracks.component.ts");
/* harmony import */ var _pipes_track_pipe__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./pipes/track.pipe */ "./src/app/pipes/track.pipe.ts");
/* harmony import */ var _single_track_single_track_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./single-track/single-track.component */ "./src/app/single-track/single-track.component.ts");
/* harmony import */ var _pipes_meter_pipe__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./pipes/meter.pipe */ "./src/app/pipes/meter.pipe.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





















var appRoutes = [
    { path: 'auth/signup', component: _auth_signup_signup_component__WEBPACK_IMPORTED_MODULE_8__["SignupComponent"] },
    { path: 'auth/signin', component: _auth_signin_signin_component__WEBPACK_IMPORTED_MODULE_9__["SigninComponent"] },
    { path: 'map-view', canActivate: [_services_auth_guard_service__WEBPACK_IMPORTED_MODULE_13__["AuthGuardService"]], component: _map_view_map_view_component__WEBPACK_IMPORTED_MODULE_10__["MapViewComponent"] },
    { path: 'upload', canActivate: [_services_auth_guard_service__WEBPACK_IMPORTED_MODULE_13__["AuthGuardService"]], component: _upload_upload_component__WEBPACK_IMPORTED_MODULE_11__["UploadComponent"] },
    { path: '', redirectTo: 'map-view', pathMatch: 'full' },
    { path: '**', redirectTo: 'map-view' }
];
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"],
                _header_header_component__WEBPACK_IMPORTED_MODULE_5__["HeaderComponent"],
                _auth_signup_signup_component__WEBPACK_IMPORTED_MODULE_8__["SignupComponent"],
                _auth_signin_signin_component__WEBPACK_IMPORTED_MODULE_9__["SigninComponent"],
                _map_view_map_view_component__WEBPACK_IMPORTED_MODULE_10__["MapViewComponent"],
                _upload_upload_component__WEBPACK_IMPORTED_MODULE_11__["UploadComponent"],
                _pipes_latitude_pipe__WEBPACK_IMPORTED_MODULE_15__["LatitudePipe"],
                _pipes_longitude_pipe__WEBPACK_IMPORTED_MODULE_16__["LongitudePipe"],
                _tracks_tracks_component__WEBPACK_IMPORTED_MODULE_17__["TracksComponent"],
                _pipes_track_pipe__WEBPACK_IMPORTED_MODULE_18__["TrackPipe"],
                _single_track_single_track_component__WEBPACK_IMPORTED_MODULE_19__["SingleTrackComponent"],
                _pipes_meter_pipe__WEBPACK_IMPORTED_MODULE_20__["MeterPipe"]
            ],
            imports: [
                _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_3__["NgbModule"],
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_6__["ReactiveFormsModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClientModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_7__["RouterModule"].forRoot(appRoutes)
            ],
            exports: [],
            providers: [
                _services_auth_service__WEBPACK_IMPORTED_MODULE_12__["AuthService"],
                _services_auth_guard_service__WEBPACK_IMPORTED_MODULE_13__["AuthGuardService"],
                _services_map_view_service__WEBPACK_IMPORTED_MODULE_14__["MapViewService"]
            ],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/auth/signin/signin.component.css":
/*!**************************************************!*\
  !*** ./src/app/auth/signin/signin.component.css ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "*{\r\n  text-align: center;\r\n  font-family: \"Comfortaa\", sans-serif;\r\n}\r\n\r\nh2{ font-size: 1.8vw;}\r\n\r\nlabel{ font-size: 0.8vw;}\r\n\r\ndiv.row{\r\n  height: 50vh;\r\n}\r\n\r\ninput, button{\r\n  background-color: white;\r\n  margin: 2vh auto;\r\n  text-align: left;\r\n  font-size: 0.8vw;\r\n}\r\n\r\nbutton {\r\n  font-size: 1.5vw;\r\n  text-decoration: none;\r\n  outline: none;\r\n  border: none;}\r\n\r\nbutton:hover{background-color: #EFEFEF;}\r\n"

/***/ }),

/***/ "./src/app/auth/signin/signin.component.html":
/*!***************************************************!*\
  !*** ./src/app/auth/signin/signin.component.html ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\r\n  <div class=\"col-sm-8 col-sm-offset-2\">\r\n    <h2>Authentication</h2>\r\n    <form [formGroup]=\"signinForm\" (ngSubmit)=\"onSignIn()\">\r\n      <div class=\"form-group\">\r\n        <label for=\"email\">Email address : </label>\r\n        <input type=\"text\"\r\n               id=\"email\"\r\n               class=\"form-control\"\r\n               formControlName=\"email\">\r\n      </div>\r\n      <div class=\"form-group\">\r\n        <label for=\"password\">Password : </label>\r\n        <input type=\"password\"\r\n               id=\"password\"\r\n               class=\"form-control\"\r\n               formControlName=\"password\">\r\n      </div>\r\n      <button class=\"btn btn-primary\"\r\n              type=\"submit\"\r\n              [disabled]=\"signinForm.invalid\">Sign in\r\n      </button>\r\n    </form>\r\n    <p class=\"text-danger\">{{ errorMessage }}</p>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/auth/signin/signin.component.ts":
/*!*************************************************!*\
  !*** ./src/app/auth/signin/signin.component.ts ***!
  \*************************************************/
/*! exports provided: SigninComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SigninComponent", function() { return SigninComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/auth.service */ "./src/app/services/auth.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var SigninComponent = /** @class */ (function () {
    function SigninComponent(authService, router, formBuilder) {
        this.authService = authService;
        this.router = router;
        this.formBuilder = formBuilder;
    }
    SigninComponent.prototype.ngOnInit = function () {
        this.initForm();
    };
    SigninComponent.prototype.initForm = function () {
        this.signinForm = this.formBuilder.group({
            email: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].email]],
            password: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].pattern(/[0-9a-zA-Z]{6,}/)]]
        });
    };
    SigninComponent.prototype.onSignIn = function () {
        var _this = this;
        var email = this.signinForm.get('email').value;
        var password = this.signinForm.get('password').value;
        this.authService.signInUser(email, password).then(function () {
            _this.router.navigate(['/map-view']);
        }, function (error) {
            _this.errorMessage = error;
        });
    };
    SigninComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-signin',
            template: __webpack_require__(/*! ./signin.component.html */ "./src/app/auth/signin/signin.component.html"),
            styles: [__webpack_require__(/*! ./signin.component.css */ "./src/app/auth/signin/signin.component.css")]
        }),
        __metadata("design:paramtypes", [_services_auth_service__WEBPACK_IMPORTED_MODULE_1__["AuthService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"]])
    ], SigninComponent);
    return SigninComponent;
}());



/***/ }),

/***/ "./src/app/auth/signup/signup.component.css":
/*!**************************************************!*\
  !*** ./src/app/auth/signup/signup.component.css ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "*{\r\n  text-align: center;\r\n  font-family: \"Comfortaa\", sans-serif;\r\n}\r\n\r\nh2{ font-size: 1.8vw;}\r\n\r\nlabel{ font-size: 0.8vw;}\r\n\r\ndiv.row{\r\n  height: 50vh;\r\n}\r\n\r\ninput, button{\r\n  background-color: white;\r\n  margin: 2vh auto;\r\n  text-align: left;\r\n  font-size: 0.8vw;\r\n}\r\n\r\nbutton {\r\n  font-size: 1.5vw;\r\n  text-decoration: none;\r\n  outline: none;\r\n  border: none;}\r\n\r\nbutton:hover{background-color: #EFEFEF;}\r\n"

/***/ }),

/***/ "./src/app/auth/signup/signup.component.html":
/*!***************************************************!*\
  !*** ./src/app/auth/signup/signup.component.html ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\r\n  <div class=\"col-sm-8 col-sm-offset-2\">\r\n    <h2>Create an account</h2>\r\n    <form [formGroup]=\"signupForm\" (ngSubmit)=\"onSignUp()\">\r\n      <div class=\"form-group\">\r\n        <label for=\"email\">Email address : </label>\r\n        <input type=\"text\"\r\n               id=\"email\"\r\n               class=\"form-control\"\r\n               formControlName=\"email\">\r\n      </div>\r\n      <div class=\"form-group\">\r\n        <label for=\"password\">Password : </label>\r\n        <input type=\"password\"\r\n               id=\"password\"\r\n               class=\"form-control\"\r\n               formControlName=\"password\">\r\n      </div>\r\n      <button class=\"btn btn-primary\"\r\n              type=\"submit\"\r\n              [disabled]=\"signupForm.invalid\">Sign up\r\n      </button>\r\n    </form>\r\n    <p class=\"text-danger\">{{ errorMessage }}</p>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/auth/signup/signup.component.ts":
/*!*************************************************!*\
  !*** ./src/app/auth/signup/signup.component.ts ***!
  \*************************************************/
/*! exports provided: SignupComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SignupComponent", function() { return SignupComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/auth.service */ "./src/app/services/auth.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var SignupComponent = /** @class */ (function () {
    function SignupComponent(formBuilder, authService, router) {
        this.formBuilder = formBuilder;
        this.authService = authService;
        this.router = router;
    }
    SignupComponent.prototype.ngOnInit = function () {
        this.initForm();
    };
    SignupComponent.prototype.initForm = function () {
        this.signupForm = this.formBuilder.group({
            email: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].email]],
            password: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].pattern(/[0-9a-zA-Z]{6,}/)]]
        });
    };
    SignupComponent.prototype.onSignUp = function () {
        var _this = this;
        var email = this.signupForm.get('email').value;
        var password = this.signupForm.get('password').value;
        this.authService.createNewUser(email, password).then(function () {
            _this.router.navigate(['/map-view']);
        }, function (error) {
            _this.errorMessage = error;
        });
    };
    SignupComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-signup',
            template: __webpack_require__(/*! ./signup.component.html */ "./src/app/auth/signup/signup.component.html"),
            styles: [__webpack_require__(/*! ./signup.component.css */ "./src/app/auth/signup/signup.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"],
            _services_auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"]])
    ], SignupComponent);
    return SignupComponent;
}());



/***/ }),

/***/ "./src/app/header/header.component.css":
/*!*********************************************!*\
  !*** ./src/app/header/header.component.css ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "*{\r\n  font-family: \"Comfortaa\", sans-serif;\r\n  color: rgb(255, 255, 255);\r\n}\r\n\r\nheader{\r\n  height: 15vh;\r\n  width: 100vw;\r\n}\r\n\r\ndiv.background {\r\n  -webkit-clip-path: polygon( /* this is used to create a slope on the top part of the image*/\r\n    0% 0%,\r\n    100vw 3vw,\r\n    100% 100%,\r\n    0% 100%\r\n  );\r\n          clip-path: polygon( /* this is used to create a slope on the top part of the image*/\r\n    0% 0%,\r\n    100vw 3vw,\r\n    100% 100%,\r\n    0% 100%\r\n  );\r\n  background-image: url(\"Glidings.jpg\");\r\n  background-size: cover;\r\n  height: 50vh;\r\n}\r\n\r\np.title{\r\n  font-size: 5vw;\r\n  text-align: center;\r\n  max-width: 50vw;\r\n  margin: 2vh auto;\r\n}\r\n\r\nbutton.func {\r\n  font-size: 1.5vw;\r\n  text-decoration: none;\r\n  outline: none;\r\n  border: none;}\r\n\r\nbutton.upload{\r\n  background-color: #4392F1;\r\n  padding: 1.5%;\r\n  width: 50%;\r\n}\r\n\r\nbutton.upload:hover{\r\n  background-color: #57A6FF;\r\n}\r\n\r\nbutton.map{\r\n  background-color: #7cc254;\r\n  padding: 1.5%;\r\n  width: 50%;\r\n}\r\n\r\nbutton.map:hover{\r\n  background-color: #91cc78;\r\n}\r\n\r\ndiv.connect {\r\n  position: relative;\r\n  top: -10.8vh;\r\n  right: 2vw;\r\n  background-color: rgb(67, 146, 241);\r\n  float: right;\r\n  width: 10vw;\r\n  height: 8vh;\r\n  border-radius: 1vw 1vw 1vw 1vw;\r\n}\r\n\r\na.connect{\r\n  font-size: 0.9vw;\r\n  position: relative;\r\n  left: 10%;\r\n}\r\n\r\na.connect:hover{color: rgb(230,230,255);}\r\n\r\na.signup{top: 1.5vh;}\r\n\r\na.signin{top: 3vh;}\r\n\r\na.signout{\r\n  top: 2.6vh;\r\n  font-size: 1.3vw;\r\n  cursor: pointer;\r\n}\r\n"

/***/ }),

/***/ "./src/app/header/header.component.html":
/*!**********************************************!*\
  !*** ./src/app/header/header.component.html ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<header>\r\n  <div class=\"title\">\r\n    <p class=\"title\">\r\n      Gliding Tracks\r\n    </p>\r\n  </div>\r\n  <div class=\"connect\">\r\n    <div routerLinkActive=\"active\" *ngIf=\"!isAuth\">\r\n      <a class=\"connect signup\" routerLink=\"auth/signup\">Create account</a>\r\n    </div>\r\n    <div routerLinkActive=\"active\" *ngIf=\"!isAuth\">\r\n      <a class=\"connect signin\" routerLink=\"auth/signin\">Sign in</a>\r\n    </div>\r\n    <div *ngIf=\"isAuth\">\r\n      <a class=\"connect signout\" (click)=\"onSignOut()\">Sign out</a>\r\n    </div>\r\n  </div>\r\n</header>\r\n\r\n<nav class=\"navbar navbar-default\" xmlns=\"\" xmlns=\"\">\r\n  <div class=\"background\"></div>\r\n\r\n  <div class=\"container-fluid\">\r\n      <div routerLinkActive=\"active\">\r\n        <button class=\"func map\" routerLink=\"map-view\">View Tracks</button>\r\n        <button class=\"func upload\" routerLink=\"upload\">Upload track</button>\r\n      </div>\r\n  </div>\r\n</nav>\r\n"

/***/ }),

/***/ "./src/app/header/header.component.ts":
/*!********************************************!*\
  !*** ./src/app/header/header.component.ts ***!
  \********************************************/
/*! exports provided: HeaderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HeaderComponent", function() { return HeaderComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/auth.service */ "./src/app/services/auth.service.ts");
/* harmony import */ var firebase__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! firebase */ "./node_modules/firebase/dist/index.cjs.js");
/* harmony import */ var firebase__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(firebase__WEBPACK_IMPORTED_MODULE_2__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var HeaderComponent = /** @class */ (function () {
    function HeaderComponent(authService) {
        this.authService = authService;
    }
    HeaderComponent.prototype.ngOnInit = function () {
        var _this = this;
        firebase__WEBPACK_IMPORTED_MODULE_2__["auth"]().onAuthStateChanged(function (user) {
            if (user) {
                _this.isAuth = true;
            }
            else {
                _this.isAuth = false;
            }
        });
    };
    HeaderComponent.prototype.onSignOut = function () {
        this.authService.signOutUser();
    };
    HeaderComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-header',
            template: __webpack_require__(/*! ./header.component.html */ "./src/app/header/header.component.html"),
            styles: [__webpack_require__(/*! ./header.component.css */ "./src/app/header/header.component.css")]
        }),
        __metadata("design:paramtypes", [_services_auth_service__WEBPACK_IMPORTED_MODULE_1__["AuthService"]])
    ], HeaderComponent);
    return HeaderComponent;
}());



/***/ }),

/***/ "./src/app/map-view/map-view.component.css":
/*!*************************************************!*\
  !*** ./src/app/map-view/map-view.component.css ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".row {\r\n  margin-top: 1vh;\r\n  display: flex;\r\n}\r\n\r\napp-tracks {\r\n  flex: 30%;\r\n  margin-right: 0.5vw;\r\n}\r\n\r\n.viewport{\r\n  background-color: #7cc254;\r\n  height: 100%;\r\n  flex: 70%;\r\n  margin: 0;\r\n  text-align: center;\r\n  font-size: 1.5vw;\r\n}\r\n\r\n.viewport.p {\r\n  padding: 0;\r\n}\r\n\r\n.track-header{\r\n  font-size: 1.2vw;\r\n  text-align: center;\r\n  padding: 1vh 1vw;\r\n}\r\n\r\n.track-info-container {\r\n  display: flex;\r\n}\r\n\r\n.track-info {\r\n  flex: 33%;\r\n  font-size: 1vw;\r\n  text-align: left;\r\n}\r\n\r\n.tooltip-container {\r\n  visibility: hidden;\r\n  position: relative;\r\n  background-color: transparent;\r\n  width: 1px;\r\n  height: 5px;\r\n  z-index: 100;\r\n}\r\n\r\n.tooltip-container .tooltip-text {\r\n  visibility: inherit;\r\n  width: 11.5vw;\r\n  background-color: rgba(0,60,136,.5);\r\n  color: #fff;\r\n  text-align: left;\r\n  font-size: 1vw;\r\n  border-radius: 5px;\r\n  padding: 3px;\r\n  position: absolute;\r\n  z-index: 101;\r\n  bottom: 175%;\r\n  left: 50%;\r\n  margin-left: -6vw;\r\n  pointer-events: none;\r\n}\r\n\r\n.tooltip-container .tooltip-text::after {\r\n  content: \" \";\r\n  position: absolute;\r\n  top: 100%;\r\n  left: 50%;\r\n  margin-left: -5px;\r\n  border: 5px solid transparent;\r\n  border-top-color: rgba(0,60,136,.5);\r\n}\r\n\r\n.label {\r\n  font-size: 0.8vw;\r\n  text-decoration: underline;\r\n}\r\n"

/***/ }),

/***/ "./src/app/map-view/map-view.component.html":
/*!**************************************************!*\
  !*** ./src/app/map-view/map-view.component.html ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\r\n  <app-tracks></app-tracks>\r\n\r\n  <div class=\"viewport\">\r\n    <p>Map View</p>\r\n    <div class=\"track-header\">\r\n      Pilot : {{ pilot }}\r\n      <div class=\"track-info-container\">\r\n        <div class=\"track-info\">\r\n          <span class=\"label\">Flight Day:</span> {{ trackDay | date }} <br>\r\n          <span class=\"label\">Flight Duration:</span> {{ flightDuration }} <br>\r\n          <span class=\"label\">Total Distance:</span> {{ totalDistance | meter:'km':0.001 }} <br>\r\n        </div>\r\n        <div class=\"track-info\">\r\n          <span class=\"label\">Start Altitude:</span> {{ startAltitude | meter }} <br>\r\n          <span class=\"label\">Stop Altitude:</span> {{ stopAltitude | meter }} <br>\r\n          <span class=\"label\">End to End Distance:</span> {{ e2eDistance | meter:'km':0.001 }} <br>\r\n        </div>\r\n        <div class=\"track-info\">\r\n          <span class=\"label\">Highest Point:</span> {{  highestPoint | meter }} <br>\r\n          <span class=\"label\">Max Ascending Speed:</span> {{ maxAscendSpeed | number:'1.1-1' }}m/s <br>\r\n          <span class=\"label\">Max Descending Speed:</span> {{ maxDescentSpeed | number:'1.1-1' }}m/s <br>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <div id=\"map\" class=\"map\">\r\n      <div class=\"tooltip-container\"\r\n           [ngStyle]=\"{\r\n             left: getScreenPos(0),\r\n             top: getScreenPos(1),\r\n             visibility: isShown()\r\n             }\">\r\n        <div class=\"tooltip-text\">\r\n          <span class=\"label\">Latitude:</span> {{ currentLatitude | latitude }} <br>\r\n          <span class=\"label\">Longitude:</span> {{ currentLongitude  | longitude }} <br>\r\n          <span class=\"label\">Altitude:</span> {{ currentAltitude }}m <br>\r\n          <span class=\"label\">Date:</span> {{ currentDate | date:'short' }} <br>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n\r\n"

/***/ }),

/***/ "./src/app/map-view/map-view.component.ts":
/*!************************************************!*\
  !*** ./src/app/map-view/map-view.component.ts ***!
  \************************************************/
/*! exports provided: MapViewComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MapViewComponent", function() { return MapViewComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_map_view_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/map-view.service */ "./src/app/services/map-view.service.ts");
/* harmony import */ var igc_filename_parser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! igc-filename-parser */ "./node_modules/igc-filename-parser/index.js");
/* harmony import */ var igc_filename_parser__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(igc_filename_parser__WEBPACK_IMPORTED_MODULE_2__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var MapViewComponent = /** @class */ (function () {
    function MapViewComponent(mvs) {
        this.mvs = mvs;
        // Test urls of IGC files
        this.igcUrls = [
            '2018-08-12-XCT-MNO-02.igc',
            'https://firebasestorage.googleapis.com/v0/b/gt-backend-8b9c2.appspot.com/o/' +
                'HAGOdywD9rQayoOOIHyd?alt=media&token=f0511567-2b36-4689-802d-b80e5b52b2af',
            'http://openlayers.org/en/latest/examples/data/igc/Damien-de-Baenst.igc',
        ];
        // IGC file Parsing
        this.IGCFilename = this.igcUrls[2]; // TODO Connect urls to firestore
        this.IGCFilenameData = igc_filename_parser__WEBPACK_IMPORTED_MODULE_2__(this.IGCFilename); // TODO Get pilot name
    }
    MapViewComponent.prototype.ngOnInit = function () {
        var _this = this;
        // Bind variables
        this.infosSubscription = this.mvs.infosSubject.subscribe(function (infos) {
            _this.currentScreenPos = infos.screenPos;
            _this.isDragging = infos.dragging;
            _this.currentLatitude = infos.latitude;
            _this.currentLongitude = infos.longitude;
            _this.currentAltitude = Math.floor(infos.altitude);
            _this.currentDate = infos.date;
        });
        this.mvs.emitInfos();
        // Setup map view
        this.mvs.initMap();
        this.mvs.setupEvents();
        this.trackDay = this.IGCFilenameData !== null ? this.IGCFilenameData.date : '1970-01-01';
        // TODO Format Track infos + Metadata from frontend
        this.mvs.parseIGCFile(this.IGCFilename, this.trackDay, function (trackData) {
            _this.mvs.loadTrack(trackData);
            _this.getTrackInfos(trackData);
        });
    };
    MapViewComponent.prototype.getTrackInfos = function (trackData) {
        this.flightDuration = this.mvs.getFlightDuration(trackData);
        this.totalDistance = this.mvs.getTotalDistance(trackData);
        this.startAltitude = this.mvs.getStartAltitude(trackData);
        this.stopAltitude = this.mvs.getStopAltitude(trackData);
        this.highestPoint = this.mvs.getHighestPoint(trackData);
        this.e2eDistance = this.mvs.getE2EDistance(trackData);
        this.maxAscendSpeed = this.mvs.getMaxAscendSpeed();
        this.maxDescentSpeed = this.mvs.getMaxDescentSpeed();
    };
    MapViewComponent.prototype.getScreenPos = function (index) {
        if (index === 0) {
            return this.currentScreenPos[0].toString() + 'px';
        }
        else if (index === 1) {
            return this.currentScreenPos[1].toString() + 'px';
        }
    };
    MapViewComponent.prototype.isShown = function () {
        if (this.isDragging || (this.currentScreenPos[0] === 0 && this.currentScreenPos[1] === 0)) {
            return 'hidden';
        }
        else {
            return 'visible';
        }
    };
    MapViewComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-map-view',
            template: __webpack_require__(/*! ./map-view.component.html */ "./src/app/map-view/map-view.component.html"),
            styles: [__webpack_require__(/*! ./map-view.component.css */ "./src/app/map-view/map-view.component.css")]
        }),
        __metadata("design:paramtypes", [_services_map_view_service__WEBPACK_IMPORTED_MODULE_1__["MapViewService"]])
    ], MapViewComponent);
    return MapViewComponent;
}());



/***/ }),

/***/ "./src/app/pipes/latitude.pipe.ts":
/*!****************************************!*\
  !*** ./src/app/pipes/latitude.pipe.ts ***!
  \****************************************/
/*! exports provided: LatitudePipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LatitudePipe", function() { return LatitudePipe; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

/*
 * Convert Decimal Degree (DD) latitude value
 * into the Degree/Minutes/Seconds (DMS)format
 * Usage:
 *  value | longitude
 * Example:
 *  {{ 5.23456 | longitude }}
 *  formats to: `5°14'4.41" N`
 */
var LatitudePipe = /** @class */ (function () {
    function LatitudePipe() {
    }
    LatitudePipe.prototype.transform = function (value, args) {
        var deg = Math.floor(value);
        var min = Math.floor((value - deg) * 60);
        var sec = Math.floor(((value - deg) * 60 - min) * 6000) / 100;
        var card = value >= 0 ? 'N' : 'S';
        return deg + "\u00B0" + min + "'" + sec + "\" " + card;
    };
    LatitudePipe = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Pipe"])({
            name: 'latitude'
        })
    ], LatitudePipe);
    return LatitudePipe;
}());



/***/ }),

/***/ "./src/app/pipes/longitude.pipe.ts":
/*!*****************************************!*\
  !*** ./src/app/pipes/longitude.pipe.ts ***!
  \*****************************************/
/*! exports provided: LongitudePipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LongitudePipe", function() { return LongitudePipe; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

/*
 * Convert Decimal Degree (DD) longitude value
 * into the Degree/Minutes/Seconds (DMS)format
 * Usage:
 *  value | longitude
 * Example:
 *  {{ 5.23456 | longitude }}
 *  formats to: `5°14'4.41" E`
 */
var LongitudePipe = /** @class */ (function () {
    function LongitudePipe() {
    }
    LongitudePipe.prototype.transform = function (value, args) {
        var deg = Math.floor(value);
        var min = Math.floor((value - deg) * 60);
        var sec = Math.floor(((value - deg) * 60 - min) * 6000) / 100;
        var card = value >= 0 ? 'E' : 'W';
        return deg + "\u00B0" + min + "'" + sec + "\" " + card;
    };
    LongitudePipe = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Pipe"])({
            name: 'longitude'
        })
    ], LongitudePipe);
    return LongitudePipe;
}());



/***/ }),

/***/ "./src/app/pipes/meter.pipe.ts":
/*!*************************************!*\
  !*** ./src/app/pipes/meter.pipe.ts ***!
  \*************************************/
/*! exports provided: MeterPipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MeterPipe", function() { return MeterPipe; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

/*
 * Transform a metric value (number) into a string with value and its unit
 * Usage:
 *  value | meter:'m':precision
 * Parameters:
 *  unit (string)  : the output unit 'm' or 'km', default is 'm'
 *  precision (float): the desired precision of the output value, default is 1
 * Example:
 *  {{ 1324.456 | meter:'m':1 }}
 *  formats to: '1324.5m'
 */
var MeterPipe = /** @class */ (function () {
    function MeterPipe() {
    }
    MeterPipe.prototype.transform = function (value, unit, precision) {
        if (unit === void 0) { unit = 'm'; }
        if (precision === void 0) { precision = 1; }
        var result = '';
        if (unit.toLowerCase() === 'km') {
            result = (Math.round(value / precision / 1000) * precision).toString();
        }
        else {
            result = (Math.round(value / precision) * precision).toString();
        }
        return result + unit;
    };
    MeterPipe = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Pipe"])({
            name: 'meter'
        })
    ], MeterPipe);
    return MeterPipe;
}());



/***/ }),

/***/ "./src/app/pipes/track.pipe.ts":
/*!*************************************!*\
  !*** ./src/app/pipes/track.pipe.ts ***!
  \*************************************/
/*! exports provided: TrackPipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TrackPipe", function() { return TrackPipe; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var TrackPipe = /** @class */ (function () {
    function TrackPipe() {
    }
    TrackPipe.prototype.transform = function (value, args) {
        return null;
    };
    TrackPipe = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Pipe"])({
            name: 'track'
        })
    ], TrackPipe);
    return TrackPipe;
}());



/***/ }),

/***/ "./src/app/services/auth-guard.service.ts":
/*!************************************************!*\
  !*** ./src/app/services/auth-guard.service.ts ***!
  \************************************************/
/*! exports provided: AuthGuardService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthGuardService", function() { return AuthGuardService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var firebase__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! firebase */ "./node_modules/firebase/dist/index.cjs.js");
/* harmony import */ var firebase__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(firebase__WEBPACK_IMPORTED_MODULE_2__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AuthGuardService = /** @class */ (function () {
    function AuthGuardService(router) {
        this.router = router;
    }
    AuthGuardService.prototype.canActivate = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            firebase__WEBPACK_IMPORTED_MODULE_2__["auth"]().onAuthStateChanged(function (user) {
                if (user) {
                    resolve(true);
                }
                else {
                    _this.router.navigate(['/auth', 'signin']);
                    resolve(false);
                }
            });
        });
    };
    AuthGuardService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]])
    ], AuthGuardService);
    return AuthGuardService;
}());



/***/ }),

/***/ "./src/app/services/auth.service.ts":
/*!******************************************!*\
  !*** ./src/app/services/auth.service.ts ***!
  \******************************************/
/*! exports provided: AuthService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthService", function() { return AuthService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var firebase__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! firebase */ "./node_modules/firebase/dist/index.cjs.js");
/* harmony import */ var firebase__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(firebase__WEBPACK_IMPORTED_MODULE_1__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AuthService = /** @class */ (function () {
    function AuthService() {
    }
    AuthService.prototype.createNewUser = function (email, password) {
        return new Promise(function (resolve, reject) {
            firebase__WEBPACK_IMPORTED_MODULE_1__["auth"]().createUserWithEmailAndPassword(email, password).then(function () {
                resolve();
            }, function (error) {
                reject(error);
            });
        });
    };
    AuthService.prototype.signInUser = function (email, password) {
        return new Promise(function (resolve, reject) {
            firebase__WEBPACK_IMPORTED_MODULE_1__["auth"]().signInWithEmailAndPassword(email, password).then(function () {
                resolve();
            }, function (error) {
                reject(error);
            });
        });
    };
    AuthService.prototype.signOutUser = function () {
        firebase__WEBPACK_IMPORTED_MODULE_1__["auth"]().signOut();
    };
    AuthService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [])
    ], AuthService);
    return AuthService;
}());



/***/ }),

/***/ "./src/app/services/map-view.service.ts":
/*!**********************************************!*\
  !*** ./src/app/services/map-view.service.ts ***!
  \**********************************************/
/*! exports provided: MapViewService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MapViewService", function() { return MapViewService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ol_Map__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ol/Map */ "./node_modules/ol/Map.js");
/* harmony import */ var ol_View__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ol/View */ "./node_modules/ol/View.js");
/* harmony import */ var ol_Feature__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ol/Feature */ "./node_modules/ol/Feature.js");
/* harmony import */ var ol_control__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ol/control */ "./node_modules/ol/control.js");
/* harmony import */ var ol_geom__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ol/geom */ "./node_modules/ol/geom.js");
/* harmony import */ var ol_layer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ol/layer */ "./node_modules/ol/layer.js");
/* harmony import */ var ol_source_OSM__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ol/source/OSM */ "./node_modules/ol/source/OSM.js");
/* harmony import */ var ol_source_Vector__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ol/source/Vector */ "./node_modules/ol/source/Vector.js");
/* harmony import */ var ol_proj__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ol/proj */ "./node_modules/ol/proj.js");
/* harmony import */ var ol_sphere__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ol/sphere */ "./node_modules/ol/sphere.js");
/* harmony import */ var ol_style__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ol/style */ "./node_modules/ol/style.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};













var MapViewService = /** @class */ (function () {
    function MapViewService() {
        // Define base colors
        this.COLORS = {
            red: [255, 0, 0, 1],
            green: [0, 255, 0, 1],
            blue: [0, 0, 255, 1]
        };
        // Gradient for upward/downward movement
        this.GRADIENT = [
            [255, 0, 0, 1],
            [255, 102, 0, 1],
            [255, 204, 0, 1],
            [204, 255, 0, 1],
            [101, 255, 0, 1],
            [0, 255, 0, 1],
            [0, 255, 101, 1],
            [0, 255, 203, 1],
            [0, 203, 255, 1],
            [0, 101, 255, 1],
            [0, 0, 255, 1]
        ];
        this.vectorSource = new ol_source_Vector__WEBPACK_IMPORTED_MODULE_8__["default"]();
        // Data for closest point
        this.infos = {
            screenPos: [0, 0],
            dragging: false,
            latitude: '',
            longitude: '',
            altitude: 0,
            date: Date()
        };
        this.infosSubject = new rxjs__WEBPACK_IMPORTED_MODULE_12__["Subject"]();
        this.overlayPoint = null;
        // Track data
        this.minDelta = Infinity;
        this.maxDelta = -Infinity;
    }
    MapViewService.prototype.initMap = function () {
        // Init View
        this.view = new ol_View__WEBPACK_IMPORTED_MODULE_2__["default"]({
            center: [0, 0],
            minZoom: 10
        });
        // Map creation
        this.map = new ol_Map__WEBPACK_IMPORTED_MODULE_1__["default"]({
            layers: [
                new ol_layer__WEBPACK_IMPORTED_MODULE_6__["Tile"]({
                    source: new ol_source_OSM__WEBPACK_IMPORTED_MODULE_7__["default"]({ wrapX: false }),
                }),
                new ol_layer__WEBPACK_IMPORTED_MODULE_6__["Vector"]({
                    source: this.vectorSource,
                    style: this.getStyleFunction()
                })
            ],
            target: 'map',
            controls: Object(ol_control__WEBPACK_IMPORTED_MODULE_4__["defaults"])({
                attributionOptions: {
                    collapsible: false
                },
                zoomOptions: {
                    duration: 250
                }
            }),
            view: this.view
        });
    };
    MapViewService.prototype.setupEvents = function () {
        var _this = this;
        // Event triggered each time the mouse moves over the map view
        this.map.on('pointermove', function (evt) {
            if (evt.dragging) {
                _this.infos.dragging = true;
            }
            else {
                _this.infos.dragging = false;
                var coordinate = _this.map.getEventCoordinate(evt.originalEvent);
                _this.displaySnap(coordinate);
            }
            _this.emitInfos();
        });
        // Draw geometry on the closest point
        this.map.on('postcompose', function (evt) {
            var vectorContext = evt.vectorContext;
            vectorContext.setStyle(new ol_style__WEBPACK_IMPORTED_MODULE_11__["Style"]({
                image: new ol_style__WEBPACK_IMPORTED_MODULE_11__["Circle"]({
                    radius: 5,
                    fill: new ol_style__WEBPACK_IMPORTED_MODULE_11__["Fill"]({ color: _this.COLORS.red })
                })
            }));
            if (_this.overlayPoint !== null) {
                vectorContext.drawGeometry(_this.overlayPoint);
            }
        });
    };
    // Detect the closest point from the given coordinates and setup the overlay for it
    MapViewService.prototype.displaySnap = function (coordinate) {
        // Fetch closest track from mouse coords
        var closestFeature = this.vectorSource.getClosestFeatureToCoordinate(coordinate);
        if (closestFeature === null) {
            this.overlayPoint = null;
        }
        else {
            // Fetch closest point from mouse coords
            var geometry = closestFeature.getGeometry();
            var closestPoint = geometry.getClosestPoint(coordinate);
            var pixel = this.map.getPixelFromCoordinate(closestPoint);
            if (this.overlayPoint === null) {
                this.overlayPoint = new ol_geom__WEBPACK_IMPORTED_MODULE_5__["Point"](closestPoint);
            }
            else {
                this.overlayPoint.setCoordinates(closestPoint);
            }
            // Update data of the closest point
            this.updateInfos(closestFeature, closestPoint, pixel);
        }
        this.map.render();
    };
    // Function responsible for IGC file parsing
    MapViewService.prototype.parseIGCFile = function (filename, trackDay, callback) {
        var _this = this;
        var trackData = [];
        var p;
        // Accessing the file form its url
        this.get(filename, function (data) {
            // Separate rows and iterate through them
            var rows = data.split('\n');
            rows.forEach(function (row) {
                switch (row[0]) {
                    case 'B': // B Record parsing
                        p = _this.parseBrecord(row);
                        // Add the record to the trackData array
                        trackData = trackData.concat([{
                                Time: new Date(trackDay + "T" + p[0] + ":" + p[1] + ":" + p[2]),
                                Latitude: p[3],
                                Longitude: p[4],
                                Valid: p[5] === 'A',
                                Pressure_alt: parseInt(p[6], 10),
                                GPS_alt: parseInt(p[7], 10),
                                Accuracy: parseInt(p[8], 10),
                                Engine_RPM: parseInt(p[9], 10),
                            }]);
                        break; // TODO Add test to check length of trackData
                }
            });
            callback(trackData);
        });
    };
    // Parse a single IGC B record string into a string array
    MapViewService.prototype.parseBrecord = function (s) {
        return [
            s.substring(1, 3), s.substring(3, 5), s.substring(5, 7),
            s.substring(7, 15), s.substring(15, 24),
            s.substring(24, 25),
            s.substring(25, 30), s.substring(30, 35),
            s.substring(35, 38), s.substring(38, 42) // accuracy; engine rpm
        ];
    };
    // Load a track as features into to tracks layer on the map
    MapViewService.prototype.loadTrack = function (trackData) {
        var features = this.fromTrackDataToFeatures(trackData);
        this.vectorSource.addFeatures(features);
        this.view.fit(this.vectorSource.getExtent());
    };
    // Create feature from track data
    MapViewService.prototype.fromTrackDataToFeatures = function (trackData, dataPerFeature) {
        if (dataPerFeature === void 0) { dataPerFeature = 20; }
        var features = [];
        var geometry, coords, point, alt1, alt2, t1, t2, delta;
        for (var i = 0; i < trackData.length; i += dataPerFeature - 1) {
            geometry = new ol_geom__WEBPACK_IMPORTED_MODULE_5__["LineString"]([], 'XYZM');
            for (var j = i; j < i + dataPerFeature && i < trackData.length - dataPerFeature; j++) {
                point = trackData[j];
                if (j === i) {
                    alt1 = point.GPS_alt;
                    t1 = point.Time;
                }
                else if (j === i + dataPerFeature - 1) {
                    alt2 = point.GPS_alt;
                    t2 = point.Time;
                }
                // Coordinates projection from Decimal Degrees to EPSG:3857
                coords = Object(ol_proj__WEBPACK_IMPORTED_MODULE_9__["fromLonLat"])(this.fromLonLatStr([point.Longitude, point.Latitude]));
                coords = coords.concat([point.GPS_alt, point.Time.getTime() / 1000]);
                geometry.appendCoordinate(coords);
            }
            // delta is the steepness of the upward/downward movement for the current geometry
            // delta > 0 means upward movement, else it's downward
            delta = (alt2 - alt1) / this.getElapsedTime(t1, t2);
            this.updateDeltaValues(delta);
            features.push(new ol_Feature__WEBPACK_IMPORTED_MODULE_3__["default"]({
                geometry: geometry,
                delta_altitude: delta
            }));
        }
        return features;
    };
    // Returns the total length of the track in meters
    MapViewService.prototype.getTotalDistance = function (trackData) {
        if (!this.totalDistance) {
            this.totalDistance = 0;
            var c1 = void 0, c2 = void 0;
            for (var i = 0; i < trackData.length - 1; i++) {
                c1 = this.fromLonLatStr([trackData[i].Longitude, trackData[i].Latitude]);
                c2 = this.fromLonLatStr([trackData[i + 1].Longitude, trackData[i + 1].Latitude]);
                this.totalDistance += Object(ol_sphere__WEBPACK_IMPORTED_MODULE_10__["getDistance"])(c1, c2);
            }
        }
        return this.totalDistance;
    };
    // Returns the altitude in meters at the beginning of the track
    MapViewService.prototype.getStartAltitude = function (trackData) {
        if (!this.startAltitude) {
            this.startAltitude = trackData[0].GPS_alt;
        }
        return this.startAltitude;
    };
    // Returns the altitude in meters at the end of the track
    MapViewService.prototype.getStopAltitude = function (trackData) {
        if (!this.stopAltitude) {
            this.stopAltitude = trackData[trackData.length - 1].GPS_alt;
        }
        return this.stopAltitude;
    };
    // Returns the greatest altitude reached during the flight in meters
    MapViewService.prototype.getHighestPoint = function (trackData) {
        var _this = this;
        if (!this.highestPoint) {
            this.highestPoint = 0;
            trackData.forEach(function (point) {
                return _this.highestPoint = point.GPS_alt > _this.highestPoint ? point.GPS_alt : _this.highestPoint;
            });
        }
        return this.highestPoint;
    };
    // Returns the maximum ascending speed reached during the flight
    MapViewService.prototype.getMaxAscendSpeed = function () {
        return this.maxDelta;
    };
    // Returns the maximum descending speed reached during the flight
    MapViewService.prototype.getMaxDescentSpeed = function () {
        return this.minDelta;
    };
    // Returns the time elapsed between t1 and t2 in seconds
    MapViewService.prototype.getElapsedTime = function (t1, t2) {
        return (t2 - t1) / 1000;
    };
    // Returns to total duration of the flight
    MapViewService.prototype.getFlightDuration = function (trackData) {
        if (!this.flightDuration) {
            var t1 = trackData[0].Time;
            var t2 = trackData[trackData.length - 1].Time;
            var deltaT = this.getElapsedTime(t1, t2);
            var hours = Math.floor(deltaT / 3600);
            var minutes = Math.floor((deltaT % 3600) / 60);
            var seconds = Math.floor(deltaT % 60);
            this.flightDuration = hours + "h" + minutes + "m" + seconds + "s";
        }
        return this.flightDuration;
    };
    // Returns the distance in meters between the start and the end points
    MapViewService.prototype.getE2EDistance = function (trackData) {
        if (!this.e2eDistance) {
            var c1 = this.fromLonLatStr([trackData[0].Longitude, trackData[0].Latitude]);
            var c2 = this.fromLonLatStr([trackData[trackData.length - 1].Longitude, trackData[trackData.length - 1].Latitude]);
            this.e2eDistance = Object(ol_sphere__WEBPACK_IMPORTED_MODULE_10__["getDistance"])(c1, c2);
        }
        return this.e2eDistance;
    };
    /*
     * Updates the min, max and range values of the upward/downward movement variation variable.
     * Used to color map the upward/downward movement along the track on the map.
     */
    MapViewService.prototype.updateDeltaValues = function (delta) {
        if (Math.abs(delta) === Infinity) { // Escape infinite values to prevent errors
            return;
        }
        if (delta < this.minDelta) {
            this.minDelta = delta;
        }
        else if (delta > this.maxDelta) {
            this.maxDelta = delta;
        }
        this.deltaRange = this.maxDelta - this.minDelta;
    };
    // Convert parsed IGC coords ['5142113N','01751264E'] to float values in Decimal Degrees
    MapViewService.prototype.fromLonLatStr = function (_a) {
        var lon = _a[0], lat = _a[1];
        var x = parseInt(lon.substr(0, 3), 10) + parseInt(lon.substr(3, 5), 10) / 60000;
        var y = parseInt(lat.substr(0, 2), 10) + parseInt(lat.substr(2, 5), 10) / 60000;
        var longitude = lon.substring(lon.length - 1) === 'E' ? x : -x;
        var latitude = lat.substring(lat.length - 1) === 'N' ? y : -y;
        return [longitude, latitude];
    };
    // Style function to color code upward/downward movement to each feature of the track
    MapViewService.prototype.getStyleFunction = function () {
        var _this = this;
        return function (feature, resolution) {
            var delta = feature.get('delta_altitude');
            // const i = Math.round((delta - this.minDelta) / this.deltaRange * (this.GRADIENT.length - 1));
            var i = Math.round(_this.sigmoid(delta, _this.deltaRange) * (_this.GRADIENT.length - 1));
            var color = _this.GRADIENT[_this.GRADIENT.length - 1 - i];
            return new ol_style__WEBPACK_IMPORTED_MODULE_11__["Style"]({
                stroke: new ol_style__WEBPACK_IMPORTED_MODULE_11__["Stroke"]({
                    color: color,
                    width: 2
                })
            });
        };
    };
    // Sigmoid function for better color range coding of the upward/downward movement
    MapViewService.prototype.sigmoid = function (x, range) {
        return 1 / (1 + Math.exp(-8 * x / range));
    };
    // GET html request
    MapViewService.prototype.get = function (url, callback) {
        var client = new XMLHttpRequest();
        client.open('GET', url);
        client.onload = function () {
            callback(client.responseText);
        };
        client.send();
    };
    // Update this.infos with the given data
    MapViewService.prototype.updateInfos = function (feature, point, screenPos) {
        var _a;
        this.infos.screenPos = screenPos.map(function (v) { return Math.round(v); });
        _a = Object(ol_proj__WEBPACK_IMPORTED_MODULE_9__["toLonLat"])([point[0], point[1]]), this.infos.longitude = _a[0], this.infos.latitude = _a[1];
        this.infos.altitude = point[2];
        this.infos.date = new Date(point[3] * 1000).toString();
        this.emitInfos();
    };
    // Notify a change has been made to 'this.infos'
    MapViewService.prototype.emitInfos = function () {
        this.infosSubject.next(this.infos);
    };
    MapViewService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [])
    ], MapViewService);
    return MapViewService;
}());



/***/ }),

/***/ "./src/app/services/track-manager.service.ts":
/*!***************************************************!*\
  !*** ./src/app/services/track-manager.service.ts ***!
  \***************************************************/
/*! exports provided: TrackManagerService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TrackManagerService", function() { return TrackManagerService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var TrackManagerService = /** @class */ (function () {
    function TrackManagerService(httpClient) {
        this.httpClient = httpClient;
    }
    TrackManagerService.prototype.getTracks = function (uid, privacy) {
        if (privacy === void 0) { privacy = 'Public'; }
        var options = uid ? { params: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpParams"]()
                .set('uid', uid)
                .set('queryType', privacy)
        } : {};
        return this.httpClient.get('http://localhost:8080/getTracks', options);
    };
    TrackManagerService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], TrackManagerService);
    return TrackManagerService;
}());



/***/ }),

/***/ "./src/app/single-track/single-track.component.css":
/*!*********************************************************!*\
  !*** ./src/app/single-track/single-track.component.css ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/single-track/single-track.component.html":
/*!**********************************************************!*\
  !*** ./src/app/single-track/single-track.component.html ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- TODO Create a \"more infos\" button to display a popup with the detailed info about the track -->\r\n<div *ngIf=\"track\">\r\n  Pilot: {{ track.Record.Header.Pilot }} <br>\r\n  Import date: {{ track.Time*1000 | date:'MM/dd/yyyy HH:mm:ss' }}\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/single-track/single-track.component.ts":
/*!********************************************************!*\
  !*** ./src/app/single-track/single-track.component.ts ***!
  \********************************************************/
/*! exports provided: SingleTrackComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SingleTrackComponent", function() { return SingleTrackComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var SingleTrackComponent = /** @class */ (function () {
    function SingleTrackComponent() {
    }
    SingleTrackComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], SingleTrackComponent.prototype, "track", void 0);
    SingleTrackComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-single-track',
            template: __webpack_require__(/*! ./single-track.component.html */ "./src/app/single-track/single-track.component.html"),
            styles: [__webpack_require__(/*! ./single-track.component.css */ "./src/app/single-track/single-track.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], SingleTrackComponent);
    return SingleTrackComponent;
}());



/***/ }),

/***/ "./src/app/tracks/tracks.component.css":
/*!*********************************************!*\
  !*** ./src/app/tracks/tracks.component.css ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "*{\r\n  background-color: #4392F1;\r\n  margin: 0;\r\n}\r\n\r\n.viewport {\r\n  height: 100%;\r\n  margin: 0;\r\n  padding-top: 1vh;\r\n  padding-bottom: 1vh;\r\n  text-align: center;\r\n  font-size: 1.5vw;\r\n}\r\n\r\nbutton{\r\n  display: block;\r\n  margin: 0.5vh auto;\r\n  background-color: white;\r\n  color: black;\r\n  font-family: \"Comfortaa\", sans-serif;\r\n  font-size: 1.5vw;\r\n  text-decoration: none;\r\n  outline: none;\r\n  border: none;\r\n}\r\n\r\nbutton:hover{\r\n  background-color: #EFEFEF;\r\n}\r\n\r\n.track-container {\r\n  text-align: left;\r\n  margin-top: 1vh;\r\n  font-size: 1vw;\r\n}\r\n\r\n.track {\r\n  padding: 1vh 0;\r\n  font-size: 0.8vw;\r\n}\r\n\r\n"

/***/ }),

/***/ "./src/app/tracks/tracks.component.html":
/*!**********************************************!*\
  !*** ./src/app/tracks/tracks.component.html ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"viewport\">\r\n  <p>Track List</p>\r\n  <div class=\"getTracks\">\r\n    <button (click)=\"showTracks()\">GetTracks</button>\r\n  </div>\r\n  <div class=\"track-container\" *ngIf=\"tracks\">\r\n    <h4>Number of tracks: {{ tracks.length }}</h4>\r\n\r\n    <div class=\"track\" *ngFor=\"let mytrack of tracks\">\r\n      <app-single-track [track]=\"mytrack\"></app-single-track>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n"

/***/ }),

/***/ "./src/app/tracks/tracks.component.ts":
/*!********************************************!*\
  !*** ./src/app/tracks/tracks.component.ts ***!
  \********************************************/
/*! exports provided: TracksComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TracksComponent", function() { return TracksComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_track_manager_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/track-manager.service */ "./src/app/services/track-manager.service.ts");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/auth.service */ "./src/app/services/auth.service.ts");
/* harmony import */ var firebase__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! firebase */ "./node_modules/firebase/dist/index.cjs.js");
/* harmony import */ var firebase__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(firebase__WEBPACK_IMPORTED_MODULE_3__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var TracksComponent = /** @class */ (function () {
    function TracksComponent(tracksManager, authService) {
        this.tracksManager = tracksManager;
        this.authService = authService;
    }
    TracksComponent.prototype.ngOnInit = function () {
        var _this = this;
        firebase__WEBPACK_IMPORTED_MODULE_3__["auth"]().onAuthStateChanged(function (user) {
            if (user) {
                _this.uid = user.uid;
                _this.showTracks();
            }
            else {
                _this.uid = '';
            }
        });
    };
    TracksComponent.prototype.showTracks = function () {
        var _this = this;
        if (this.uid) {
            console.log(this.uid);
            this.tracksManager.getTracks(this.uid, 'Public')
                .subscribe(function (data) {
                console.log(data);
                _this.tracks = data;
            });
        }
    };
    TracksComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-tracks',
            template: __webpack_require__(/*! ./tracks.component.html */ "./src/app/tracks/tracks.component.html"),
            styles: [__webpack_require__(/*! ./tracks.component.css */ "./src/app/tracks/tracks.component.css")]
        }),
        __metadata("design:paramtypes", [_services_track_manager_service__WEBPACK_IMPORTED_MODULE_1__["TrackManagerService"],
            _services_auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"]])
    ], TracksComponent);
    return TracksComponent;
}());



/***/ }),

/***/ "./src/app/upload/upload.component.css":
/*!*********************************************!*\
  !*** ./src/app/upload/upload.component.css ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "*{\r\n  background-color: #4392F1;\r\n  margin: 0 0;\r\n}\r\n\r\nh1{\r\n  text-align: center;\r\n  padding-top: 2vh;\r\n  font-size: 1.8vw;\r\n}\r\n\r\nh3{\r\n  font-size: 1.2vw;\r\n}\r\n\r\ndiv{\r\n  text-align: center;\r\n  padding: 2vh 0 8vh 0;\r\n}\r\n\r\ndiv.file{\r\n  float: right;\r\n  width: 50%;\r\n}\r\n\r\ndiv.url{\r\n  float: left;\r\n  width: 50%;\r\n  box-shadow: 3px 0 0 #5A26E3;\r\n}\r\n\r\ninput, button{\r\n  font-family: \"Comfortaa\", sans-serif;\r\n  background-color: white;\r\n  text-align: left;\r\n  font-size: 0.8vw;\r\n}\r\n\r\nlabel{\r\n  font-size: 0.8vw;\r\n}\r\n\r\nbutton {\r\n  font-size: 1.5vw;\r\n  text-decoration: none;\r\n  outline: none;\r\n  border: none;}\r\n\r\nbutton:hover{background-color: #EFEFEF;}\r\n\r\ninput.form-control{\r\n  color: #000000;\r\n}\r\n"

/***/ }),

/***/ "./src/app/upload/upload.component.html":
/*!**********************************************!*\
  !*** ./src/app/upload/upload.component.html ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h1>Upload file</h1>\r\n\r\n<div>\r\n  <div class=\"file\">\r\n    <h3>Upload from file</h3>\r\n    <form [formGroup]=\"uploadFromFileForm\" (ngSubmit)=\"onUploadFromFile()\">\r\n      <div class=\"form-group\">\r\n        <label for=\"file\">Select file : </label>\r\n        <input type=\"file\"\r\n               id=\"file\"\r\n               class=\"form-control\"\r\n               formControlName=\"file\">\r\n      </div>\r\n      <button type=\"submit\"\r\n              [disabled]=\"uploadFromFileForm.invalid\">Upload\r\n      </button>\r\n    </form>\r\n  </div>\r\n  <div class=\"url\">\r\n    <h3>Upload from URL</h3>\r\n    <form [formGroup]=\"uploadFromURLForm\" (ngSubmit)=\"onUploadFromURL()\">\r\n      <div class=\"form-group\">\r\n        <label for=\"fileURL\">Enter file URL : </label>\r\n        <input type=\"url\"\r\n               id=\"fileURL\"\r\n               class=\"form-control\"\r\n               formControlName=\"fileURL\">\r\n      </div>\r\n      <button type=\"submit\"\r\n              [disabled]=\"uploadFromURLForm.invalid\">Upload\r\n      </button>\r\n    </form>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/upload/upload.component.ts":
/*!********************************************!*\
  !*** ./src/app/upload/upload.component.ts ***!
  \********************************************/
/*! exports provided: UploadComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UploadComponent", function() { return UploadComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var UploadComponent = /** @class */ (function () {
    function UploadComponent(formBuilder) {
        this.formBuilder = formBuilder;
    }
    UploadComponent.prototype.ngOnInit = function () {
        this.initForms();
    };
    UploadComponent.prototype.initForms = function () {
        this.uploadFromFileForm = this.formBuilder.group({
            file: [null, [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]]
        });
        this.uploadFromURLForm = this.formBuilder.group({
            fileURL: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]]
        });
    };
    UploadComponent.prototype.onUploadFromFile = function () {
        console.log('Uploading file!');
    };
    UploadComponent.prototype.onUploadFromURL = function () {
        console.log('Uploading file from url!');
    };
    UploadComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-upload',
            template: __webpack_require__(/*! ./upload.component.html */ "./src/app/upload/upload.component.html"),
            styles: [__webpack_require__(/*! ./upload.component.css */ "./src/app/upload/upload.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"]])
    ], UploadComponent);
    return UploadComponent;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! D:\Documents\Programmation\Gliding-Tracks\gt-frontend\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map