webpackJsonp(["profile.module"],{

/***/ "../../../../../src/app/profile-details/profile-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfileRoutingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__profile_profile_component__ = __webpack_require__("../../../../../src/app/profile-details/profile/profile.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var profileRoutes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_2__profile_profile_component__["a" /* ProfileComponent */] }
];
var ProfileRoutingModule = (function () {
    function ProfileRoutingModule() {
    }
    return ProfileRoutingModule;
}());
ProfileRoutingModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["e" /* RouterModule */].forChild(profileRoutes)],
        exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["e" /* RouterModule */]]
    })
], ProfileRoutingModule);

//# sourceMappingURL=profile-routing.module.js.map

/***/ }),

/***/ "../../../../../src/app/profile-details/profile.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProfileModule", function() { return ProfileModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__profile_profile_component__ = __webpack_require__("../../../../../src/app/profile-details/profile/profile.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__profile_routing_module__ = __webpack_require__("../../../../../src/app/profile-details/profile-routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/** module to load component and route for show and edit profile **/
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var ProfileModule = (function () {
    function ProfileModule() {
    }
    return ProfileModule;
}());
ProfileModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
        declarations: [__WEBPACK_IMPORTED_MODULE_2__profile_profile_component__["a" /* ProfileComponent */]],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_common__["CommonModule"],
            __WEBPACK_IMPORTED_MODULE_4__angular_forms__["FormsModule"],
            __WEBPACK_IMPORTED_MODULE_3__profile_routing_module__["a" /* ProfileRoutingModule */]
        ],
        providers: []
    })
], ProfileModule);

//# sourceMappingURL=profile.module.js.map

/***/ }),

/***/ "../../../../../src/app/profile-details/profile/profile.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".passwordDiv .form-group {\n\tdisplay: inline-block;\n\twidth: 100%;\n}\n.passwordDiv .form-group label{\n    display: block;\n}\n.passwordDiv .form-group input {\n    width: 72%;\n    margin-right: 18px;\n    margin-bottom: 20px;\n}\n\n.btn-default {\n\twidth: auto;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/profile-details/profile/profile.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n    <div class=\"col-lg-12\">\n        <h3 class=\"page-header\">Profile - Update</h3>\n    </div>\n</div><!--/.row-->\n\n<div class=\"row\">\n    <div class=\"col-lg-12\">\n        <div class=\"panel panel-default\">\n            <div class=\"panel-heading\">Profile</div>\n            <div class=\"panel-body\">\n                <div class=\"row\">\n                    <div class=\"col-lg-12\">\n                        <div *ngIf=\"!responseStatus && responseReceived\" class=\"alert alert-danger\">\n                            <strong>{{ responseMsg }}</strong>\n                        </div>\n                    </div>\n                    <div class=\"col-lg-12\">\n                        <div *ngIf=\"responseStatus && responseReceived\" class=\"alert alert-success\">\n                            <strong>{{ responseMsg }}</strong>\n                        </div>\n                    </div>\n                </div>\n                <form\n                        #updateProfileForm=\"ngForm\"\n                        (submit)=\"onSubmit(updateProfileForm)\">\n\n                    <div class=\"row\">\n                        <div class=\"col-md-6\">\n                            <div class=\"form-group\">\n                                <label for=\"fname\">First Name</label>\n                                <input\n                                        id=\"fname\"\n                                        class=\"form-control\"\n                                        placeholder=\"Enter...\"\n\n                                        name=\"first_name\"\n                                        required\n                                        [ngModel]=\"profileData.first_name\"\n                                        #firstName=\"ngModel\">\n                            </div>\n                        </div>\n                        <div class=\"col-md-6\">\n                            <div\n                                    class=\"alert alert-danger\"\n                                    *ngIf=\"firstName.invalid && firstName.touched\">\n                                First Name is Required!\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"col-md-6\">\n                            <div class=\"form-group\">\n                                <label for=\"lname\">Last Name</label>\n                                <input\n                                        id=\"lname\"\n                                        class=\"form-control\"\n                                        placeholder=\"Enter...\"\n\n                                        name=\"last_name\"\n                                        required\n                                        [ngModel]=\"profileData.last_name\"\n                                        #lastName=\"ngModel\">\n                            </div>\n                        </div>\n                        <div class=\"col-md-6\">\n                            <div\n                                    class=\"alert alert-danger\"\n                                    *ngIf=\"lastName.invalid && lastName.touched\">\n                                Last Name is Required!\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"row passwordDiv\" *ngIf=\"!isAdmin\">\n                        <div class=\"col-md-6\">\n                            <div class=\"form-group\">\n                                <label for=\"pasword\">Password</label>\n                                <input\n                                        id=\"pasword\"\n                                        class=\"form-control col-md-9\"\n                                        name=\"uniqueKey\"\n                                        required\n                                        [ngModel]=\"profileData.uniqueKey\"\n                                        #uniqueKey=\"ngModel\" readonly>\n                                <button (click)=\"onResetPassword()\" type=\"button\"\n                                        class=\"btn btn-default col-md-3\">Reset Password\n                                </button>\n\n                            </div>\n\n                        </div>\n                    </div>\n                    <div class=\"row passwordDiv\" *ngIf=\"!isAdmin\">\n                        <div class=\"col-md-6\">\n                            <div class=\"form-group\">\n                                <label for=\"username\">Username</label>\n                                <input\n                                        id=\"username\"\n                                        class=\"form-control col-md-9\"\n                                        name=\"parish_id\"\n                                        required\n                                        [ngModel]=\"profileData.parish_id\"\n                                        #parish_id=\"ngModel\">\n                                <button (click)=\"onResetUsername(updateProfileForm)\" type=\"button\"\n                                        class=\"btn btn-default col-md-3\" [disabled] = \"!updateProfileForm.value.parish_id || !activateReset\">Reset Username\n                                </button>\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"col-md-6\">\n                            <button class=\"btn btn-primary\"\n                                    [disabled]=\"( updateProfileForm.invalid && updateProfileForm.touched )\">\n                                <i *ngIf=\"showLoader\" class=\"fa fa-spinner fa-pulse fa-lg fa-fw\"></i>\n                                Submit\n                            </button>\n                            <button\n                                    type=\"button\"\n                                    class=\"btn btn-default\"\n                                    (click)=\"onReset(updateProfileForm)\"\n                            >Reset\n                            </button>\n                        </div>\n                    </div>\n                </form>\n\n            </div>\n        </div>\n    </div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/profile-details/profile/profile.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfileComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__auth_auth_service__ = __webpack_require__("../../../../../src/app/auth/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__profile_service__ = __webpack_require__("../../../../../src/app/profile-details/profile.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/** Show and update logged in users profile */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ProfileComponent = (function () {
    /** Injecting services to be used in this component */
    function ProfileComponent(profileService, activatedRoute, authService, router) {
        this.profileService = profileService;
        this.activatedRoute = activatedRoute;
        this.authService = authService;
        this.router = router;
        this.profileData = {
            id: 0,
            user_id: 0,
            last_name: '',
            uniqueKey: '',
            first_name: '',
            parish_id: ''
        };
        this.responseReceived = false;
        this.responseStatus = false;
        this.activateReset = true;
        this.responseMsg = '';
        this.showLoader = false;
        this.isAdmin = false;
    }
    ProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        /** checking for admin */
        var user_type = this.authService.getToken().user_type;
        if (user_type == 1) {
            this.isAdmin = true;
        }
        this.activatedRoute.params.subscribe(function (params) {
            _this.profileService.profileToEdit()
                .subscribe(function (response) {
                _this.profileData = response.json().userDetail;
            });
        }, function (error) {
            if (error.status === 401) {
                _this.authService.removeToken();
                _this.router.navigate(['/login']);
            }
            _this.responseStatus = false;
            _this.responseMsg = error.json().error;
        }, function () { });
    };
    /** Function call when form is submitted */
    ProfileComponent.prototype.onSubmit = function (updateProfileForm) {
        var _this = this;
        this.showLoader = true;
        this.profileService.editProfile(updateProfileForm.value)
            .subscribe(function (response) {
            _this.showLoader = false;
            _this.responseStatus = response.json().status;
            if (response.json().status) {
                _this.responseStatus = true;
                _this.responseMsg = response.json().message;
            }
            else {
                _this.responseMsg = '';
            }
        }, function (error) {
            if (error.status === 401) {
                _this.authService.removeToken();
                _this.router.navigate(['/login']);
            }
            _this.showLoader = false;
            _this.responseStatus = false;
            _this.responseReceived = true;
            _this.responseMsg = error.json().error;
            setTimeout(function () {
                _this.responseReceived = false;
            }, 3000);
        }, function () {
            _this.responseReceived = true;
            setTimeout(function () {
                _this.responseReceived = false;
            }, 3000);
        });
    };
    /** Function call to reset form */
    ProfileComponent.prototype.onReset = function (updateProfileForm) {
        var _this = this;
        this.profileService.profileToEdit()
            .subscribe(function (response) {
            updateProfileForm.form.patchValue({
                first_name: _this.profileData.first_name,
                last_name: _this.profileData.last_name,
            });
        });
    };
    /** Function call to reset password */
    ProfileComponent.prototype.onResetPassword = function () {
        var _this = this;
        this.profileService.resetPassword()
            .subscribe(function (response) {
            _this.responseStatus = response.json().status;
            if (response.json().status) {
                _this.responseMsg = response.json().message;
                _this.profileData.uniqueKey = response.json().password;
            }
            else {
                _this.responseMsg = '';
            }
        }, function (error) {
            if (error.status === 401) {
                _this.authService.removeToken();
                _this.router.navigate(['/login']);
            }
            _this.responseStatus = false;
            _this.responseMsg = error.json().error;
        });
    };
    /** Function call to reset username */
    ProfileComponent.prototype.onResetUsername = function (updateProfileForm) {
        var _this = this;
        this.activateReset = false;
        var formData = new FormData();
        formData.append("username", updateProfileForm.value.parish_id);
        this.profileService.resetUsername(formData)
            .subscribe(function (response) {
            _this.responseStatus = response.json().status;
            if (response.json().status) {
                _this.activateReset = true;
                _this.responseMsg = response.json().message;
                _this.responseReceived = true;
            }
            else {
                _this.responseMsg = '';
                _this.activateReset = true;
            }
        }, function (error) {
            if (error.status === 401) {
                _this.authService.removeToken();
                _this.router.navigate(['/login']);
            }
            _this.activateReset = true;
            _this.responseStatus = false;
            _this.responseMsg = error.json().error;
        });
    };
    return ProfileComponent;
}());
ProfileComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-profile',
        template: __webpack_require__("../../../../../src/app/profile-details/profile/profile.component.html"),
        styles: [__webpack_require__("../../../../../src/app/profile-details/profile/profile.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__profile_service__["a" /* ProfileService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__profile_service__["a" /* ProfileService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* ActivatedRoute */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__auth_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__auth_auth_service__["a" /* AuthService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["d" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["d" /* Router */]) === "function" && _d || Object])
], ProfileComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=profile.component.js.map

/***/ })

});
//# sourceMappingURL=profile.module.chunk.js.map