webpackJsonp([11],{

/***/ "../../../../../src/app/auth/login/login-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__login_component__ = __webpack_require__("../../../../../src/app/auth/login/login.component.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginRoutingModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var loginRoutes = [
    {
        path: '',
        component: __WEBPACK_IMPORTED_MODULE_2__login_component__["a" /* LoginComponent */],
        data: {
            title: 'Login'
        }
    }
];
var LoginRoutingModule = (function () {
    function LoginRoutingModule() {
    }
    return LoginRoutingModule;
}());
LoginRoutingModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* RouterModule */].forChild(loginRoutes)],
        exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* RouterModule */]]
    })
], LoginRoutingModule);

//# sourceMappingURL=login-routing.module.js.map

/***/ }),

/***/ "../../../../../src/app/auth/login/login.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "input.ng-invalid.ng-touched {\n    border: 2px solid #a94442;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/auth/login/login.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n    <div class=\"col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 col-md-4 col-md-offset-4\">\n        <div class=\"login-panel panel panel-default\">\n            <div class=\"panel-heading\"><strong>Log In</strong></div>\n            <div class=\"panel-body\">\n                <form #form=\"ngForm\" (ngSubmit)=\"onSubmit(form)\">\n                    <div\n                        *ngIf=\"!loginRequestStatus && responseReceived\"\n                        class=\"alert alert-danger\"\n                    >\n                        <strong>{{ loginRequestResponseMsg }}</strong>\n                    </div>\n                    <fieldset>\n                        <div class=\"form-group\">\n                            <input\n                                class=\"form-control\"\n                                placeholder=\"Username\"\n                                name=\"username\"\n                                ngModel\n                                required\n                                #username=\"ngModel\"\n                            >\n                        </div>\n                        <div\n                            class=\"alert alert-danger\"\n                            *ngIf=\"username.invalid && username.touched\"\n                        >\n                            Username is Required!\n                        </div>\n\n\n                        <div class=\"form-group\">\n                            <input\n                                class=\"form-control\"\n                                placeholder=\"Password\"\n                                type=\"password\"\n                                name=\"password\"\n                                ngModel\n                                required\n                                #password=\"ngModel\"\n                            >\n                        </div>\n                        <div\n                            class=\"alert alert-danger\"\n                            *ngIf=\"password.invalid && password.touched\"\n                        >\n                            Password is Required!\n                        </div>\n\n                        <!--<div class=\"checkbox\">-->\n                            <!--<label>-->\n                                <!--<input name=\"remember\" type=\"checkbox\" value=\"Remember Me\">Remember Me-->\n                            <!--</label>-->\n                        <!--</div>-->\n\n                        <button\n                            [disabled]=\"form.invalid\"\n                            class=\"btn btn-primary\"\n                        >\n                            <i *ngIf=\"showLoader\" class=\"fa fa-spinner fa-pulse fa-lg fa-fw\"></i>\n                            Login\n                        </button>\n                        <button type=\"reset\" class=\"btn btn-default\" (click)=\"onReset(form)\">Reset</button>\n                        <button type=\"button\" class=\"btn btn-primary pull-right\" (click)=\"onNavigate()\">Register</button>\n                    </fieldset>\n                </form>\n            </div>\n        </div>\n    </div><!-- /.col-->\n</div><!-- /.row -->\n"

/***/ }),

/***/ "../../../../../src/app/auth/login/login.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__login_service__ = __webpack_require__("../../../../../src/app/auth/login/login.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__province_zone_area_parish_province_zone_area_parish_service__ = __webpack_require__("../../../../../src/app/province-zone-area-parish/province-zone-area-parish.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__profile_details_profile_service__ = __webpack_require__("../../../../../src/app/profile-details/profile.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__payment_details_payment_service__ = __webpack_require__("../../../../../src/app/payment-details/payment.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__report_report_service__ = __webpack_require__("../../../../../src/app/report/report.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var LoginComponent = (function () {
    /** Service injection */
    function LoginComponent(pzapService, loginService, router, profileService, paymentService, reportService) {
        this.pzapService = pzapService;
        this.loginService = loginService;
        this.router = router;
        this.profileService = profileService;
        this.paymentService = paymentService;
        this.reportService = reportService;
        /** Variable declarations */
        this.responseReceived = false; // Track is some response has been recieved or not
        this.loginRequestStatus = false; // Track response of login request
        this.showLoader = false; // Track if loader should be shown or not
    }
    /** Function call on submit */
    LoginComponent.prototype.onSubmit = function (formSignIn) {
        var _this = this;
        this.showLoader = true;
        var body = {
            username: formSignIn.value.username,
            password: formSignIn.value.password
        };
        this.loginService.login(body)
            .subscribe(function (response) {
            _this.showLoader = false;
            if (response.json().status) {
                localStorage.setItem('loggedInUserData', JSON.stringify(response.json()));
                _this.loginRequestStatus = true;
                _this.loginRequestResponseMsg = response.json().message;
                _this.pzapService.refreshHeader();
                _this.profileService.refreshHeader();
                _this.profileService.refreshHeader();
                _this.paymentService.refreshHeader();
                _this.reportService.refreshHeader();
            }
            else {
                _this.loginRequestStatus = false;
                _this.loginRequestResponseMsg = response.json().error;
            }
        }, function (error) {
            console.log(error);
            _this.loginRequestStatus = false;
            _this.loginRequestResponseMsg = error.json().error;
            _this.showLoader = false;
            _this.responseReceived = true;
            setTimeout(function () {
                _this.responseReceived = false;
            }, 5000);
        }, function () {
            formSignIn.reset();
            _this.router.navigate(['/dashboard']);
        });
    };
    /** Function call to reset form */
    LoginComponent.prototype.onReset = function (formSignIn) {
        formSignIn.reset();
    };
    /** Function call to navigate to registration page */
    LoginComponent.prototype.onNavigate = function () {
        this.router.navigate(['/register']);
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'login',
        template: __webpack_require__("../../../../../src/app/auth/login/login.component.html"),
        styles: [__webpack_require__("../../../../../src/app/auth/login/login.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__province_zone_area_parish_province_zone_area_parish_service__["a" /* ProvinceZoneAreaParishService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__province_zone_area_parish_province_zone_area_parish_service__["a" /* ProvinceZoneAreaParishService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__login_service__["a" /* LoginService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__login_service__["a" /* LoginService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__profile_details_profile_service__["a" /* ProfileService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__profile_details_profile_service__["a" /* ProfileService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_5__payment_details_payment_service__["a" /* PaymentService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__payment_details_payment_service__["a" /* PaymentService */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_6__report_report_service__["a" /* ReportService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__report_report_service__["a" /* ReportService */]) === "function" && _f || Object])
], LoginComponent);

var _a, _b, _c, _d, _e, _f;
//# sourceMappingURL=login.component.js.map

/***/ }),

/***/ "../../../../../src/app/auth/login/login.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__login_component__ = __webpack_require__("../../../../../src/app/auth/login/login.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__login_routing_module__ = __webpack_require__("../../../../../src/app/auth/login/login-routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__login_service__ = __webpack_require__("../../../../../src/app/auth/login/login.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginModule", function() { return LoginModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var LoginModule = (function () {
    function LoginModule() {
    }
    return LoginModule;
}());
LoginModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_common__["CommonModule"],
            __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormsModule"],
            __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_5__login_routing_module__["a" /* LoginRoutingModule */]
        ],
        declarations: [__WEBPACK_IMPORTED_MODULE_4__login_component__["a" /* LoginComponent */]],
        providers: [__WEBPACK_IMPORTED_MODULE_6__login_service__["a" /* LoginService */]]
    })
], LoginModule);

//# sourceMappingURL=login.module.js.map

/***/ }),

/***/ "../../../../../src/app/auth/login/login.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__environments_environment_prod__ = __webpack_require__("../../../../../src/environments/environment.prod.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var LoginService = (function () {
    /** Service injection */
    function LoginService(http) {
        this.http = http;
    }
    /** Function call for logging in*/
    LoginService.prototype.login = function (body) {
        var header = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["b" /* Headers */]({ 'X-Requested-With': 'XMLHttpRequest' });
        return this.http.post(__WEBPACK_IMPORTED_MODULE_2__environments_environment_prod__["a" /* environment */].API_URL + 'sign-in', body, { headers: header });
    };
    return LoginService;
}());
LoginService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_http__["c" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_http__["c" /* Http */]) === "function" && _a || Object])
], LoginService);

var _a;
//# sourceMappingURL=login.service.js.map

/***/ })

});
//# sourceMappingURL=11.chunk.js.map