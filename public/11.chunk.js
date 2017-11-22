webpackJsonp([11],{

/***/ "../../../../../src/app/auth/reset-password/reset-password-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__reset_password_component__ = __webpack_require__("../../../../../src/app/auth/reset-password/reset-password.component.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ResetPasswordRoutingModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var resetPasswordRoutes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_2__reset_password_component__["a" /* ResetPasswordComponent */] }
];
var ResetPasswordRoutingModule = (function () {
    function ResetPasswordRoutingModule() {
    }
    return ResetPasswordRoutingModule;
}());
ResetPasswordRoutingModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* RouterModule */].forChild(resetPasswordRoutes)],
        exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* RouterModule */]]
    })
], ResetPasswordRoutingModule);

//# sourceMappingURL=reset-password-routing.module.js.map

/***/ }),

/***/ "../../../../../src/app/auth/reset-password/reset-password.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "input.ng-invalid.ng-touched {\n    border: 2px solid #a94442;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/auth/reset-password/reset-password.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n  <div class=\"col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 col-md-4 col-md-offset-4\">\n    <div class=\"login-panel panel panel-default\">\n      <div class=\"panel-heading\"><strong>Reset Password</strong></div>\n      <div class=\"panel-body\">\n          <div *ngIf=\"!rpStatus && responseReceived\" class=\"alert alert-danger\">\n              <strong>{{ rpMsg }}</strong>\n          </div>\n          <div *ngIf=\"rpStatus && responseReceived\" class=\"alert alert-success\">\n              <strong>{{ rpMsg }}</strong>\n          </div>\n          <form *ngIf=\"!redirect\" [formGroup]=\"formRP\" (ngSubmit)=\"onSubmit()\">\n\n          <fieldset>\n\n            <!-- Password -->\n            <div class=\"form-group\">\n              <input\n                      class=\"form-control\"\n                      formControlName=\"password\"\n                      type=\"password\"\n                      placeholder=\"Password\"\n              >\n            </div>\n            <div *ngIf=\"formRP.get('password').invalid && formRP.get('password').touched\">\n              <div class=\"alert alert-danger\" *ngIf=\"formRP.get('password').hasError('required')\">\n                Your Password is Required!\n              </div>\n            </div>\n\n            <!-- Confirm Password -->\n            <div class=\"form-group\">\n              <input\n                      class=\"form-control\"\n                      formControlName=\"confirm_password\"\n                      type=\"password\"\n                      placeholder=\"Confirm Password\"\n              >\n            </div>\n            <div *ngIf=\"formRP.get('confirm_password').invalid && formRP.get('confirm_password').touched\">\n              <div class=\"alert alert-danger\" >\n                <div *ngIf=\"formRP.get('confirm_password').hasError('required')\">\n                  Confirm password is Required!\n                </div>\n                <div *ngIf=\"formRP.get('confirm_password').hasError('confirmPassword')\">\n                  Confirm Password did not Match!\n                </div>\n              </div>\n            </div>\n\n            <button class=\"btn btn-primary\" [disabled]=\"formRP.invalid || rpRequested\">\n              <i *ngIf=\"rpRequested\" class=\"fa fa-spinner fa-pulse fa-lg fa-fw\"></i>\n              Reset Password\n            </button>\n            <button type=\"reset\" class=\"btn btn-default\" [disabled]=\"rpRequested\" (click)=\"onReset()\">Reset</button>\n            <button type=\"button\" class=\"btn btn-primary pull-right\" [disabled]=\"rpRequested\" (click)=\"onNavigate()\">Login</button>\n          </fieldset>\n        </form>\n        <div class=\"row\" *ngIf=\"redirect\">\n              <div class=\"col-md-12 col-sm-12 redirect\">\n                  <p>We are <strong>redirecting</strong> you to the Sign In page within <strong>{{ clock }} seconds</strong>.\n                      <br/>Please wait or <a routerLink=\"/login\">click here</a> to go to <strong>Log In</strong> page.\n                  </p>\n              </div>\n          </div>\n      </div>\n    </div>\n  </div><!-- /.col-->\n</div><!-- /.row -->\n"

/***/ }),

/***/ "../../../../../src/app/auth/reset-password/reset-password.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__reset_password_service__ = __webpack_require__("../../../../../src/app/auth/reset-password/reset-password.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ResetPasswordComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ResetPasswordComponent = (function () {
    /** Service injection */
    function ResetPasswordComponent(activatedRoute, resetPasswordService, router, formBuilder) {
        this.activatedRoute = activatedRoute;
        this.resetPasswordService = resetPasswordService;
        this.router = router;
        this.formBuilder = formBuilder;
        this.responseReceived = false;
        this.rpStatus = false;
        this.rpRequested = false;
        this.redirect = false;
        this.clock = 10;
        this.paramData = {
            email: '',
            token: ''
        };
        /** Custom confirm password validator */
        this.confirmPassword = function (control) {
            var pass = control.get('password');
            var cnfPass = control.get('confirm_password');
            if (!pass || !cnfPass) {
                return null;
            }
            if (pass.value === cnfPass.value) {
                return null;
            }
            else {
                control.get('confirm_password').setErrors({ confirmPassword: true });
                return { confirmPassword: true };
            }
        };
    }
    /** Function to be executed when component initializes */
    ResetPasswordComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.formRP = this.formBuilder.group({
            'password': new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormControl"](null, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required),
            'confirm_password': new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormControl"](null, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required)
        }, { validator: this.confirmPassword });
        /** Checking route params to get id of area to edit */
        this.activatedRoute.params.subscribe(function (params) {
            _this.paramData.email = params['email'];
            _this.paramData.token = params['token'];
        }, function (error) {
            console.log(error);
        });
    };
    /** Function call on submit */
    ResetPasswordComponent.prototype.onSubmit = function () {
        var _this = this;
        this.rpRequested = true;
        var body = this.formRP.value;
        this.resetPasswordService.resetPassword(Object.assign(body, this.paramData))
            .subscribe(function (response) {
            if (response.json().status) {
                _this.rpStatus = true;
                _this.rpMsg = response.json().message;
                _this.rpRequested = false;
            }
            else {
                _this.rpStatus = false;
                _this.rpMsg = response.json().error;
                _this.rpRequested = false;
            }
        }, function (error) {
            _this.rpStatus = false;
            _this.rpMsg = error.json().error;
            _this.responseReceived = true;
            _this.rpRequested = false;
            setTimeout(function () {
                _this.responseReceived = false;
            }, 3000);
        }, function () {
            _this.formRP.reset();
            _this.responseReceived = true;
            _this.rpRequested = false;
            setTimeout(function () {
                _this.responseReceived = false;
            }, 3000);
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
    ResetPasswordComponent.prototype.onReset = function () {
        this.formRP.reset();
    };
    /** Function call to navigate to login page */
    ResetPasswordComponent.prototype.onNavigate = function () {
        this.router.navigate(['/login']);
    };
    return ResetPasswordComponent;
}());
ResetPasswordComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_core__["Component"])({
        selector: 'app-reset-password',
        template: __webpack_require__("../../../../../src/app/auth/reset-password/reset-password.component.html"),
        styles: [__webpack_require__("../../../../../src/app/auth/reset-password/reset-password.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_router__["b" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_router__["b" /* ActivatedRoute */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__reset_password_service__["a" /* ResetPasswordService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__reset_password_service__["a" /* ResetPasswordService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_router__["c" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_router__["c" /* Router */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormBuilder"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormBuilder"]) === "function" && _d || Object])
], ResetPasswordComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=reset-password.component.js.map

/***/ }),

/***/ "../../../../../src/app/auth/reset-password/reset-password.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__reset_password_component__ = __webpack_require__("../../../../../src/app/auth/reset-password/reset-password.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__reset_password_service__ = __webpack_require__("../../../../../src/app/auth/reset-password/reset-password.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__reset_password_routing_module__ = __webpack_require__("../../../../../src/app/auth/reset-password/reset-password-routing.module.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ResetPasswordModule", function() { return ResetPasswordModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var ResetPasswordModule = (function () {
    function ResetPasswordModule() {
    }
    return ResetPasswordModule;
}());
ResetPasswordModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_common__["CommonModule"],
            __WEBPACK_IMPORTED_MODULE_4__angular_forms__["ReactiveFormsModule"],
            __WEBPACK_IMPORTED_MODULE_5__reset_password_routing_module__["a" /* ResetPasswordRoutingModule */]
        ],
        declarations: [__WEBPACK_IMPORTED_MODULE_2__reset_password_component__["a" /* ResetPasswordComponent */]],
        providers: [__WEBPACK_IMPORTED_MODULE_3__reset_password_service__["a" /* ResetPasswordService */]]
    })
], ResetPasswordModule);

//# sourceMappingURL=reset-password.module.js.map

/***/ }),

/***/ "../../../../../src/app/auth/reset-password/reset-password.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__environments_environment_prod__ = __webpack_require__("../../../../../src/environments/environment.prod.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ResetPasswordService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ResetPasswordService = (function () {
    /** Service injection */
    function ResetPasswordService(http) {
        this.http = http;
    }
    /** Function call for resetting password */
    ResetPasswordService.prototype.resetPassword = function (body) {
        var header = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]({ 'X-Requested-With': 'XMLHttpRequest' });
        return this.http.post(__WEBPACK_IMPORTED_MODULE_2__environments_environment_prod__["a" /* environment */].API_URL + 'reset-password', body, { headers: header });
    };
    return ResetPasswordService;
}());
ResetPasswordService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */]) === "function" && _a || Object])
], ResetPasswordService);

var _a;
//# sourceMappingURL=reset-password.service.js.map

/***/ })

});
//# sourceMappingURL=11.chunk.js.map