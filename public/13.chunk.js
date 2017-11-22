webpackJsonp([13],{

/***/ "../../../../../src/app/auth/forgot-password/forgot-password-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__forgot_password_component__ = __webpack_require__("../../../../../src/app/auth/forgot-password/forgot-password.component.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ForgotPasswordRoutingModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var forgotPasswordRoutes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_2__forgot_password_component__["a" /* ForgotPasswordComponent */] }
];
var ForgotPasswordRoutingModule = (function () {
    function ForgotPasswordRoutingModule() {
    }
    return ForgotPasswordRoutingModule;
}());
ForgotPasswordRoutingModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* RouterModule */].forChild(forgotPasswordRoutes)],
        exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* RouterModule */]]
    })
], ForgotPasswordRoutingModule);

//# sourceMappingURL=forgot-password-routing.module.js.map

/***/ }),

/***/ "../../../../../src/app/auth/forgot-password/forgot-password.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "input.ng-invalid.ng-touched {\n    border: 2px solid #a94442;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/auth/forgot-password/forgot-password.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n    <div class=\"col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 col-md-4 col-md-offset-4\">\n        <div class=\"login-panel panel panel-default\">\n            <div class=\"panel-heading\"><strong>Forgot Password</strong></div>\n            <div class=\"panel-body\">\n                <div *ngIf=\"!fpStatus && responseReceived\"\n                     class=\"alert alert-danger\"\n                >\n                    <strong>{{ fpResponseMsg }}</strong>\n                </div>\n                <div *ngIf=\"fpStatus && responseReceived\"\n                     class=\"alert alert-success\"\n                >\n                    <strong>{{ fpResponseMsg }}</strong>\n                </div>\n                <form *ngIf=\"!redirect\" #form=\"ngForm\" (ngSubmit)=\"onSubmit(form)\">\n\n                    <fieldset>\n                        <div class=\"form-group\">\n                            <input\n                                    class=\"form-control\"\n                                    placeholder=\"Please enter your email!\"\n                                    name=\"email\"\n                                    ngModel\n                                    email\n                                    required\n                                    #email=\"ngModel\"\n                            >\n                        </div>\n                        <div class=\"alert alert-danger\"\n                             *ngIf=\"email.invalid && email.touched\"\n                        >\n                            <div *ngIf=\"email.errors.required\">\n                                Email is Required!\n                            </div>\n                            <div *ngIf=\"email.errors.email\">\n                                Email is Not Proper!\n                            </div>\n\n                        </div>\n\n\n                        <button\n                                [disabled]=\"form.invalid || showLoader\"\n                                class=\"btn btn-primary\"\n                        >\n                            <i *ngIf=\"showLoader\" class=\"fa fa-spinner fa-pulse fa-lg fa-fw\"></i>\n                            Forgot Password\n                        </button>\n                        <button type=\"reset\" class=\"btn btn-default\" [disabled]=\"showLoader\" (click)=\"onReset(form)\">Reset</button>\n                        <button type=\"button\" class=\"btn btn-primary pull-right\" [disabled]=\"showLoader\" (click)=\"onNavigate()\">Login</button>\n                    </fieldset>\n                </form>\n                <div class=\"row\" *ngIf=\"redirect\">\n                    <div class=\"col-md-12 col-sm-12 redirect\">\n                        <p>We are <strong>redirecting</strong> you to the Sign In page within <strong>{{ clock }}\n                            seconds</strong>.\n                            <br/>Please wait or <a routerLink=\"/login\">click here</a> to go to <strong>Log In</strong>\n                            page.\n                        </p>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div><!-- /.col-->\n</div><!-- /.row -->\n"

/***/ }),

/***/ "../../../../../src/app/auth/forgot-password/forgot-password.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__forgot_password_service__ = __webpack_require__("../../../../../src/app/auth/forgot-password/forgot-password.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ForgotPasswordComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ForgotPasswordComponent = (function () {
    function ForgotPasswordComponent(forgotPasswordService, router) {
        this.forgotPasswordService = forgotPasswordService;
        this.router = router;
        /** Variable declarations */
        this.clock = 10;
        this.redirect = false;
        this.responseReceived = false; // Track is some response has been recieved or not
        this.fpStatus = false; // Track response of login request
        this.showLoader = false; // Track if loader should be shown or not
    }
    /** Function call on submit */
    ForgotPasswordComponent.prototype.onSubmit = function (formForgotPassword) {
        var _this = this;
        this.showLoader = true;
        var body = {
            email: formForgotPassword.value.email
        };
        this.forgotPasswordService.resetPassword(body)
            .subscribe(function (response) {
            _this.showLoader = false;
            _this.responseReceived = true;
            if (response.json().status) {
                _this.fpStatus = true;
                _this.fpResponseMsg = response.json().message;
            }
            else {
                _this.fpStatus = false;
                _this.fpResponseMsg = response.json().error;
            }
        }, function (error) {
            console.log(error);
            _this.fpStatus = false;
            _this.fpResponseMsg = error.json().error;
            _this.showLoader = false;
            _this.responseReceived = true;
            setTimeout(function () {
                _this.responseReceived = false;
            }, 3000);
        }, function () {
            formForgotPassword.reset();
            /** Redirecting to login page */
            _this.redirect = true;
            setInterval(function () {
                if (_this.clock-- == 1) {
                    _this.router.navigate(['/login']);
                }
            }, 1000);
        });
    };
    /** Function call to reset form */
    ForgotPasswordComponent.prototype.onReset = function (formForgotPassword) {
        formForgotPassword.reset();
    };
    /** Function call to navigate to registration page */
    ForgotPasswordComponent.prototype.onNavigate = function () {
        this.router.navigate(['/login']);
    };
    return ForgotPasswordComponent;
}());
ForgotPasswordComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-forgot-password',
        template: __webpack_require__("../../../../../src/app/auth/forgot-password/forgot-password.component.html"),
        styles: [__webpack_require__("../../../../../src/app/auth/forgot-password/forgot-password.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__forgot_password_service__["a" /* ForgotPasswordService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__forgot_password_service__["a" /* ForgotPasswordService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* Router */]) === "function" && _b || Object])
], ForgotPasswordComponent);

var _a, _b;
//# sourceMappingURL=forgot-password.component.js.map

/***/ }),

/***/ "../../../../../src/app/auth/forgot-password/forgot-password.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__forgot_password_component__ = __webpack_require__("../../../../../src/app/auth/forgot-password/forgot-password.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__forgot_password_service__ = __webpack_require__("../../../../../src/app/auth/forgot-password/forgot-password.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__forgot_password_routing_module__ = __webpack_require__("../../../../../src/app/auth/forgot-password/forgot-password-routing.module.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ForgotPasswordModule", function() { return ForgotPasswordModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var ForgotPasswordModule = (function () {
    function ForgotPasswordModule() {
    }
    return ForgotPasswordModule;
}());
ForgotPasswordModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_common__["CommonModule"],
            __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormsModule"],
            __WEBPACK_IMPORTED_MODULE_5__forgot_password_routing_module__["a" /* ForgotPasswordRoutingModule */]
        ],
        declarations: [__WEBPACK_IMPORTED_MODULE_3__forgot_password_component__["a" /* ForgotPasswordComponent */]],
        providers: [__WEBPACK_IMPORTED_MODULE_4__forgot_password_service__["a" /* ForgotPasswordService */]]
    })
], ForgotPasswordModule);

//# sourceMappingURL=forgot-password.module.js.map

/***/ }),

/***/ "../../../../../src/app/auth/forgot-password/forgot-password.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__environments_environment_prod__ = __webpack_require__("../../../../../src/environments/environment.prod.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ForgotPasswordService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ForgotPasswordService = (function () {
    /** Service injection */
    function ForgotPasswordService(http) {
        this.http = http;
    }
    /** Function call for logging in*/
    ForgotPasswordService.prototype.resetPassword = function (body) {
        var header = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["b" /* Headers */]({ 'X-Requested-With': 'XMLHttpRequest' });
        return this.http.post(__WEBPACK_IMPORTED_MODULE_2__environments_environment_prod__["a" /* environment */].API_URL + 'forgot-password', body, { headers: header });
    };
    return ForgotPasswordService;
}());
ForgotPasswordService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_http__["c" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_http__["c" /* Http */]) === "function" && _a || Object])
], ForgotPasswordService);

var _a;
//# sourceMappingURL=forgot-password.service.js.map

/***/ })

});
//# sourceMappingURL=13.chunk.js.map