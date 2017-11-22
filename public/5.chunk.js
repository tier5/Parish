webpackJsonp([5],{

/***/ "../../../../../src/app/auth/register/register-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__register_component__ = __webpack_require__("../../../../../src/app/auth/register/register.component.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegisterRoutingModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var routes = [
    {
        path: '',
        component: __WEBPACK_IMPORTED_MODULE_2__register_component__["a" /* RegisterComponent */],
        data: {
            title: 'Register'
        }
    }
];
var RegisterRoutingModule = (function () {
    function RegisterRoutingModule() {
    }
    return RegisterRoutingModule;
}());
RegisterRoutingModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* RouterModule */].forChild(routes)],
        exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* RouterModule */]]
    })
], RegisterRoutingModule);

//# sourceMappingURL=register-routing.module.js.map

/***/ }),

/***/ "../../../../../src/app/auth/register/register.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "input.ng-invalid.ng-touched {\n    border: 2px solid #a94442;\n}\n\n.StripeElement {\n    background-color: white;\n    padding: 8px 12px;\n    border-radius: 4px;\n    border: 1px solid #eeeeee;\n    box-shadow: 0 1px 3px 0 #e6ebf1;\n    transition: box-shadow 150ms ease;\n}\n\n.StripeElement--focus {\n    box-shadow: 0 1px 3px 0 #cfd7df;\n}\n\n.StripeElement--invalid {\n    border-color: #fa755a;\n}\n\n.StripeElement--webkit-autofill {\n    background-color: #fefde5 !important;\n}\n.content {\n    padding-top: 30px;\n    padding-bottom: 30px;\n}\n\n/***\nPricing table\n***/\n.pricing {\n    position: relative;\n    margin-bottom: 15px;\n    border: 3px solid #eee;\n}\n\n.pricing-active {\n    border: 3px solid #30A5FF;\n    margin-top: -10px;\n}\n\n.pricing:hover {\n    border: 3px solid #30A5FF;\n}\n\n.pricing:hover h4 {\n    color: #fff;\n}\n\n.pricing-head {\n    text-align: center;\n}\n\n.pricing-head h3,\n.pricing-head h4 {\n    margin: 0;\n    line-height: normal;\n}\n\n.pricing-head h3 span,\n.pricing-head h4 span {\n    display: block;\n    margin-top: 5px;\n    font-size: 14px;\n    font-style: italic;\n}\n\n.pricing-head h3 {\n    font-weight: 300;\n    color: #fafafa;\n    padding: 10px 0;\n    font-size: 20px;\n    background: #1c1c1c;\n}\n\n.pricing-head h4 {\n    color: #fff;\n    padding: 5px 0;\n    font-weight: 300;\n    background: #1c1c1c;\n    border-bottom: solid 1px #f5f9e7;\n}\n\n.pricing-head-active h4 {\n    color: #fff;\n}\n\n.pricing-head h4 i {\n    top: -8px;\n    font-size: 28px;\n    font-style: normal;\n    position: relative;\n}\n\n.pricing-head h4 span {\n    top: -10px;\n    font-size: 14px;\n    font-style: normal;\n    position: relative;\n}\n\n.back-btn{\n    display: inline-block;\n    color: #fff;\n    font-size: 15px;\n    background: #30a5ff;\n    padding: 5px 20px;\n    margin-bottom: 10px;\n    border-radius: 5px;\n    box-shadow: 1px 1px 1px 1px #333;\n    text-decoration: none;\n}\n\n/*Pricing Content*/\n.pricing-content li {\n    color: #888;\n    font-size: 12px;\n    padding: 7px 15px;\n    border-bottom: solid 1px #f5f9e7;\n}\n.pricing-content{\n    background: #fff;\n    margin: 0;\n}\n\n\n/*Pricing Footer*/\n.pricing-footer {\n    font-size: 11px;\n    line-height: 17px;\n    text-align: center;\n    padding: 0 20px 19px;\n    background: #1c1c1c;\n    display: inline-block;\n    width: 100%;\n}\n.pricing-footer p{\n    color: #fff;\n    margin: 10px 0;\n    font-size: 15px;\n}\n\n/*Priceing Active*/\n.price-active,\n.pricing:hover {\n    z-index: 9;\n}\n\n.price-active h4 {\n    color: #36d7ac;\n}\n\n.no-space-pricing .pricing:hover {\n    transition: box-shadow 0.2s ease-in-out;\n}\n\n.no-space-pricing .price-active .pricing-head h4,\n.no-space-pricing .pricing:hover .pricing-head h4 {\n    color: #36d7ac;\n    padding: 15px 0;\n    font-size: 80px;\n    transition: color 0.5s ease-in-out;\n}\n\n.yellow-crusta.btn {\n    color: #FFFFFF;\n    background-color: #30A5FF;\n}\n.yellow-crusta.btn:hover,\n.yellow-crusta.btn:focus,\n.yellow-crusta.btn:active,\n.yellow-crusta.btn.active {\n    color: #FFFFFF;\n    background-color: #1d86d6;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/auth/register/register.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\" [hidden]=\"!planSelected\">\n    <div class=\"col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 col-md-4 col-md-offset-4\">\n        <div class=\"login-panel panel panel-default\">\n            <div class=\"panel-heading\">\n                <i class=\"fa fa-angle-double-left fa-pull-right\" aria-hidden=\"true\" (click)=\"onUndoSubscription()\"></i>\n                <strong>Register</strong>\n            </div>\n            <div class=\"panel-body\">\n                <form [formGroup]=\"formRegister\" (ngSubmit)=\"onSubmit()\">\n                    <div *ngIf=\"!userRegisterStatus && responseReceived\" class=\"alert alert-danger\">\n                        <strong>{{ userRegisteredMsg }}</strong>\n                    </div>\n                    <div *ngIf=\"userRegisterStatus && responseReceived\" class=\"alert alert-success\">\n                        <strong>{{ userRegisteredMsg }}</strong>\n                    </div>\n                    <fieldset>\n                        <!-- First Name -->\n                        <div class=\"form-group\">\n                            <input\n                                class=\"form-control\"\n                                formControlName=\"first_name\"\n                                placeholder=\"First Name\"\n                            >\n                        </div>\n                        <div *ngIf=\"formRegister.get('first_name').invalid && formRegister.get('first_name').touched\">\n                            <div class=\"alert alert-danger\" *ngIf=\"formRegister.get('first_name').hasError('required')\">\n                                Your First Name is Required!\n                            </div>\n                        </div>\n\n                        <!-- Last Name -->\n                        <div class=\"form-group\">\n                            <input\n                                class=\"form-control\"\n                                formControlName=\"last_name\"\n                                placeholder=\"Last Name\"\n                            >\n                        </div>\n                        <div *ngIf=\"formRegister.get('last_name').invalid && formRegister.get('last_name').touched\">\n                            <div class=\"alert alert-danger\" *ngIf=\"formRegister.get('last_name').hasError('required')\">\n                                Your Last Name is Required!\n                            </div>\n                        </div>\n\n                        <!-- Email -->\n                        <div class=\"form-group\">\n                            <input\n                                class=\"form-control\"\n                                formControlName=\"email\"\n                                placeholder=\"Email Address\"\n                            >\n                        </div>\n                        <div *ngIf=\"formRegister.get('email').invalid && formRegister.get('email').touched\">\n                            <div class=\"alert alert-danger\">\n                                <div *ngIf=\"formRegister.get('email').hasError('required')\">\n                                   Your Email is Required!\n                                </div>\n                                <div *ngIf=\"formRegister.get('email').hasError('email')\">\n                                    Enter a Proper Email!\n                                </div>\n                                <div *ngIf=\"formRegister.get('email').hasError('emailTaken')\">\n                                    Email has already been taken!\n                                </div>\n                            </div>\n                        </div>\n\n                        <!-- Password -->\n                        <div class=\"form-group\">\n                            <input\n                                class=\"form-control\"\n                                formControlName=\"password\"\n                                type=\"password\"\n                                placeholder=\"Password\"\n                            >\n                        </div>\n                        <div *ngIf=\"formRegister.get('password').invalid && formRegister.get('password').touched\">\n                            <div class=\"alert alert-danger\" *ngIf=\"formRegister.get('password').hasError('required')\">\n                                Your Password is Required!\n                            </div>\n                        </div>\n\n                        <!-- Confirm Password -->\n                        <div class=\"form-group\">\n                            <input\n                                class=\"form-control\"\n                                formControlName=\"confirm_password\"\n                                type=\"password\"\n                                placeholder=\"Confirm Password\"\n                            >\n                        </div>\n                        <div *ngIf=\"formRegister.get('confirm_password').invalid && formRegister.get('confirm_password').touched\">\n                            <div class=\"alert alert-danger\" >\n                                <div *ngIf=\"formRegister.get('confirm_password').hasError('required')\">\n                                    Confirm password is Required!\n                                </div>\n                                <div *ngIf=\"formRegister.get('confirm_password').hasError('confirmPassword')\">\n                                    Confirm Password did not Match!\n                                </div>\n                            </div>\n                        </div>\n\n                        <!-- Stripe Custom Form -->\n                        <div class=\"form-group\">\n                            <div class=\"form-row\">\n                                <label for=\"card-element\">\n                                    Credit or debit card\n                                </label>\n                                <div id=\"card-element\">\n                                    <!-- a Stripe Element will be inserted here. -->\n                                </div>\n\n                                <!-- Used to display form errors -->\n                                <div id=\"card-errors\" role=\"alert\"></div>\n                            </div>\n                        </div>\n\n                        <button class=\"btn btn-primary\" [disabled]=\"formRegister.invalid || userRegisterRequested\">\n                            <i *ngIf=\"userRegisterRequested\" class=\"fa fa-spinner fa-pulse fa-lg fa-fw\"></i>\n                            Register\n                        </button>\n                        <button type=\"reset\" class=\"btn btn-default\" [disabled]=\"userRegisterRequested\" (click)=\"onReset()\">Reset</button>\n                    <!--    <app-subscription></app-subscription> -->\n                        <button type=\"button\" class=\"btn btn-primary pull-right\" [disabled]=\"userRegisterRequested\" (click)=\"onNavigate()\">Login</button>\n                    </fieldset>\n                </form>\n            </div>\n        </div>\n    </div><!-- /.col-->\n</div><!-- /.row -->\n<div class=\"container content\" *ngIf=\"!planSelected\">\n    <div class=\"row\">\n        <div class=\"col-md-12\">\n            <a href=\"/\" class=\"back-btn\">< Back</a>\n        </div>\n    </div>\n    <div class=\"row\">\n        <!-- Pricing -->\n        <div class=\"col-md-3\" *ngFor=\"let plan of planList\">\n            <div class=\"pricing hover-effect\">\n                <div class=\"pricing-head\">\n                    <h3>\n                        {{ plan.name }}\n                        <span></span>\n                    </h3>\n                    <h4>\n                        <i>$</i> <i>{{ plan.amount/100 }}</i>\n                        <span>Per Month</span>\n                    </h4>\n                </div>\n                <ul class=\"pricing-content list-unstyled\">\n                    <li>\n                        At vero eos\n                    </li>\n                    <li>\n                        No Support\n                    </li>\n                    <li>\n                        Fusce condimentum\n                    </li>\n                    <li>\n                        Ut non libero\n                    </li>\n                    <li>\n                        Consecte adiping elit\n                    </li>\n                </ul>\n                <div class=\"pricing-footer\">\n                    <p>\n                        {{ plan.statement_descriptor }}\n                    </p>\n                    <a href=\"javascript:;\" class=\"btn yellow-crusta\" (click)=\"onSelectSubscription(plan.id)\">\n                        Sign Up\n                    </a>\n                </div>\n            </div>\n        </div>\n        <!--//End Pricing -->\n    </div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/auth/register/register.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__register_service__ = __webpack_require__("../../../../../src/app/auth/register/register.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegisterComponent; });
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var RegisterComponent = (function () {
    /** Service injection */
    function RegisterComponent(registerService, router, formBuilder) {
        this.registerService = registerService;
        this.router = router;
        this.formBuilder = formBuilder;
        this.responseReceived = false;
        this.userRegisterStatus = false;
        this.userRegisterRequested = false;
        this.planId = 1;
        this.planSelected = false;
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
    RegisterComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.stripe = Stripe('pk_test_SIRpnt5y8OAGeLprrzbQKrKd');
        this.elements = this.stripe.elements();
        // Custom styling can be passed to options when creating an Element.
        this.style = {
            base: {
                // Add your base input styles here. For example:
                fontSize: '16px',
                lineHeight: '24px',
            },
        };
        // Create an instance of the card Element
        this.card = this.elements.create('card', { style: this.style });
        // Add an instance of the card Element into the `card-element` <div>
        this.card.mount('#card-element');
        this.card.addEventListener('change', function (_a) {
            var error = _a.error;
            var displayError = document.getElementById('card-errors');
            if (error) {
                displayError.textContent = error.message;
            }
            else {
                displayError.textContent = '';
            }
        });
        /** Function to get plan list */
        this.registerService.listPlans()
            .subscribe(function (response) {
            if (response.json().status) {
                _this.planList = response.json().plans;
            }
        }, function (error) {
            console.log(error.json());
        });
        /** Form Initialization */
        this.formRegister = this.formBuilder.group({
            'first_name': new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormControl"](null, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required),
            'last_name': new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormControl"](null, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required),
            'email': new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormControl"](null, [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].email], this.validateEmail.bind(this)),
            'password': new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormControl"](null, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required),
            'confirm_password': new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormControl"](null, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required)
        }, { validator: this.confirmPassword });
    };
    /** Function to validate email*/
    RegisterComponent.prototype.validateEmail = function (control) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this.registerService.validateEmail({ email: control.value })
                .subscribe(function (response) {
                if (response.json().status) {
                    resolve(null);
                }
                else {
                    resolve({ emailTaken: true });
                }
            });
        });
        return promise;
    };
    /** Function call on submit */
    RegisterComponent.prototype.onSubmit = function () {
        var _this = this;
        var body = this.formRegister.value;
        this.stripe.createToken(this.card).then(function (result) {
            if (result.error) {
                // Inform the user if there was an error
                var errorElement = document.getElementById('card-errors');
                errorElement.textContent = result.error.message;
            }
            else {
                // Send the token to your server
                _this.userRegisterRequested = true;
                _this.registerService.register(__assign({}, body, { token: result.token, planId: _this.planId }))
                    .subscribe(function (response) {
                    if (response.json().status) {
                        _this.userRegisterStatus = true;
                        _this.card.clear();
                        _this.userRegisteredMsg = response.json().message;
                        _this.userRegisterRequested = false;
                        setTimeout(function () {
                            _this.router.navigate(['/login']);
                        }, 5000);
                    }
                    else {
                        _this.userRegisterStatus = false;
                        _this.userRegisteredMsg = response.json().error;
                        _this.userRegisterRequested = false;
                    }
                }, function (error) {
                    _this.userRegisterStatus = false;
                    _this.userRegisteredMsg = error.json().error;
                    _this.responseReceived = true;
                    _this.userRegisterRequested = false;
                    setTimeout(function () {
                        _this.responseReceived = false;
                    }, 5000);
                }, function () {
                    _this.formRegister.reset();
                    _this.responseReceived = true;
                    _this.userRegisterRequested = false;
                    setTimeout(function () {
                        _this.responseReceived = false;
                    }, 5000);
                });
            }
        });
    };
    /** Function to choose subscription*/
    RegisterComponent.prototype.onSelectSubscription = function (id) {
        this.planId = id;
        this.planSelected = true;
    };
    /** Function to undo subscription*/
    RegisterComponent.prototype.onUndoSubscription = function () {
        this.planId = 0;
        this.planSelected = false;
        this.formRegister.reset();
        this.card.clear();
    };
    /** Function call to reset form */
    RegisterComponent.prototype.onReset = function () {
        this.formRegister.reset();
    };
    /** Function call to navigate to login page */
    RegisterComponent.prototype.onNavigate = function () {
        this.router.navigate(['/login']);
    };
    return RegisterComponent;
}());
RegisterComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'register',
        template: __webpack_require__("../../../../../src/app/auth/register/register.component.html"),
        styles: [__webpack_require__("../../../../../src/app/auth/register/register.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__register_service__["a" /* RegisterService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__register_service__["a" /* RegisterService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormBuilder"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormBuilder"]) === "function" && _c || Object])
], RegisterComponent);

var _a, _b, _c;
//# sourceMappingURL=register.component.js.map

/***/ }),

/***/ "../../../../../src/app/auth/register/register.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__register_component__ = __webpack_require__("../../../../../src/app/auth/register/register.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__register_routing_module__ = __webpack_require__("../../../../../src/app/auth/register/register-routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__register_service__ = __webpack_require__("../../../../../src/app/auth/register/register.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__subscription_subscription_module__ = __webpack_require__("../../../../../src/app/subscription/subscription.module.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegisterModule", function() { return RegisterModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








var RegisterModule = (function () {
    function RegisterModule() {
    }
    return RegisterModule;
}());
RegisterModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_common__["CommonModule"],
            __WEBPACK_IMPORTED_MODULE_5__register_routing_module__["a" /* RegisterRoutingModule */],
            __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormsModule"],
            __WEBPACK_IMPORTED_MODULE_1__angular_forms__["ReactiveFormsModule"],
            __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_7__subscription_subscription_module__["a" /* SubscriptionModule */]
        ],
        declarations: [__WEBPACK_IMPORTED_MODULE_4__register_component__["a" /* RegisterComponent */]],
        providers: [__WEBPACK_IMPORTED_MODULE_6__register_service__["a" /* RegisterService */]]
    })
], RegisterModule);

//# sourceMappingURL=register.module.js.map

/***/ }),

/***/ "../../../../../src/app/auth/register/register.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__environments_environment_prod__ = __webpack_require__("../../../../../src/environments/environment.prod.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegisterService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var RegisterService = (function () {
    /** Service injection */
    function RegisterService(http) {
        this.http = http;
    }
    /** Function call for registration */
    RegisterService.prototype.register = function (body) {
        var header = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["b" /* Headers */]({ 'X-Requested-With': 'XMLHttpRequest' });
        return this.http.post(__WEBPACK_IMPORTED_MODULE_2__environments_environment_prod__["a" /* environment */].API_URL + 'sign-up', body, { headers: header });
    };
    /** Function to validate requested email */
    RegisterService.prototype.validateEmail = function (body) {
        var header = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["b" /* Headers */]({ 'X-Requested-With': 'XMLHttpRequest' });
        return this.http.post(__WEBPACK_IMPORTED_MODULE_2__environments_environment_prod__["a" /* environment */].API_URL + 'validate-email', body, { headers: header });
    };
    /** Function to list plans */
    RegisterService.prototype.listPlans = function () {
        var header = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["b" /* Headers */]({ 'X-Requested-With': 'XMLHttpRequest' });
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__environments_environment_prod__["a" /* environment */].API_URL + 'list-plan', { headers: header });
    };
    return RegisterService;
}());
RegisterService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_http__["c" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_http__["c" /* Http */]) === "function" && _a || Object])
], RegisterService);

var _a;
//# sourceMappingURL=register.service.js.map

/***/ }),

/***/ "../../../../../src/app/subscription/subscription.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/subscription/subscription.component.html":
/***/ (function(module, exports) {

module.exports = "<button type=\"button\" (click)=\"handlePayment()\">\n  Add Credits to your Account\n</button>\n"

/***/ }),

/***/ "../../../../../src/app/subscription/subscription.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__environments_environment_prod__ = __webpack_require__("../../../../../src/environments/environment.prod.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__subscription_service__ = __webpack_require__("../../../../../src/app/subscription/subscription.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SubscriptionComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var SubscriptionComponent = (function () {
    function SubscriptionComponent(subscriptionService) {
        this.subscriptionService = subscriptionService;
        this.amount = 500;
    }
    SubscriptionComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.handler = StripeCheckout.configure({
            key: __WEBPACK_IMPORTED_MODULE_1__environments_environment_prod__["a" /* environment */].stripeKey,
            image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
            locale: 'auto',
            token: function (token) {
                _this.subscriptionService.processPayment(token, _this.amount);
            }
        });
    };
    SubscriptionComponent.prototype.handlePayment = function () {
        this.handler.open({
            name: 'FireStarter',
            excerpt: 'Deposit Funds to Account',
            amount: this.amount
        });
    };
    SubscriptionComponent.prototype.onPopstate = function () {
        this.handler.close();
    };
    return SubscriptionComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"])('window:popstate'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SubscriptionComponent.prototype, "onPopstate", null);
SubscriptionComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-subscription',
        template: __webpack_require__("../../../../../src/app/subscription/subscription.component.html"),
        styles: [__webpack_require__("../../../../../src/app/subscription/subscription.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__subscription_service__["a" /* SubscriptionService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__subscription_service__["a" /* SubscriptionService */]) === "function" && _a || Object])
], SubscriptionComponent);

var _a;
//# sourceMappingURL=subscription.component.js.map

/***/ }),

/***/ "../../../../../src/app/subscription/subscription.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__subscription_component__ = __webpack_require__("../../../../../src/app/subscription/subscription.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__subscription_service__ = __webpack_require__("../../../../../src/app/subscription/subscription.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SubscriptionModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var SubscriptionModule = (function () {
    function SubscriptionModule() {
    }
    return SubscriptionModule;
}());
SubscriptionModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_common__["CommonModule"],
            __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* HttpModule */]
        ],
        exports: [__WEBPACK_IMPORTED_MODULE_3__subscription_component__["a" /* SubscriptionComponent */]],
        declarations: [__WEBPACK_IMPORTED_MODULE_3__subscription_component__["a" /* SubscriptionComponent */]],
        providers: [__WEBPACK_IMPORTED_MODULE_4__subscription_service__["a" /* SubscriptionService */]]
    })
], SubscriptionModule);

//# sourceMappingURL=subscription.module.js.map

/***/ }),

/***/ "../../../../../src/app/subscription/subscription.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__environments_environment_prod__ = __webpack_require__("../../../../../src/environments/environment.prod.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__auth_auth_service__ = __webpack_require__("../../../../../src/app/auth/auth.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SubscriptionService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var SubscriptionService = (function () {
    /** Injecting services to be used in this component */
    function SubscriptionService(http, authService) {
        this.http = http;
        this.authService = authService;
        /** Initializing the different headers to be passed with each api call */
        this.headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]({
            'X-Requested-With': 'XMLHttpRequest'
        });
        if (this.authService.isAuthenticated()) {
            this.refreshHeader();
        }
    }
    /** Refreshing the header for authenticated users */
    SubscriptionService.prototype.refreshHeader = function () {
        this.headers.set('Authorization', 'Bearer ' + this.authService.getToken().token);
    };
    SubscriptionService.prototype.processPayment = function (token, amount) {
        var payment = { token: token, amount: amount };
        return this.http.post(__WEBPACK_IMPORTED_MODULE_2__environments_environment_prod__["a" /* environment */].API_URL + 'report/all-report', payment, { headers: this.headers });
    };
    return SubscriptionService;
}());
SubscriptionService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__auth_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__auth_auth_service__["a" /* AuthService */]) === "function" && _b || Object])
], SubscriptionService);

var _a, _b;
//# sourceMappingURL=subscription.service.js.map

/***/ })

});
//# sourceMappingURL=5.chunk.js.map