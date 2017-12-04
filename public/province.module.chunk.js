webpackJsonp(["province.module"],{

/***/ "../../../../../src/app/province-zone-area-parish/province/create-province/create-province.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "input.ng-invalid.ng-touched {\n    border: 1px solid #a94442;\n}\n\nbutton {\n    margin-top: 15px;\n}\n\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/province-zone-area-parish/province/create-province/create-province.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n    <div class=\"col-lg-12\">\n        <h3 class=\"page-header\">{{ title }}</h3>\n    </div>\n</div><!--/.row-->\n\n<div class=\"row\">\n    <div class=\"col-lg-12\">\n        <div class=\"panel panel-default\">\n            <div class=\"panel-heading\">{{ heading }} Province</div>\n            <div class=\"panel-body\">\n                <div class=\"row\">\n                    <div class=\"col-lg-12\">\n                        <div *ngIf=\"!responseStatus && responseReceived\" class=\"alert alert-danger\">\n                            <strong>{{ responseMsg }}</strong>\n                        </div>\n                    </div>\n                    <div class=\"col-lg-12\">\n                        <div *ngIf=\"responseStatus && responseReceived\" class=\"alert alert-success\">\n                            <strong>{{ responseMsg }}</strong>\n                        </div>\n                    </div>\n                </div>\n                <form #createProvinceForm=\"ngForm\" (submit)=\"onSubmit(createProvinceForm)\">\n\n                    <div class=\"row\">\n                        <div class=\"col-md-6\">\n                            <div class=\"form-group\">\n                                <label for=\"pname\">Province Name</label>\n                                <input\n                                        id=\"pname\"\n                                        class=\"form-control\"\n                                        name=\"province_name\"\n                                        required\n                                        [ngModel]=\"provinceData.province_name\"\n                                        #provinceName=\"ngModel\">\n                            </div>\n                        </div>\n                        <div class=\"col-md-6\">\n                            <div class=\"alert alert-danger\" *ngIf=\"provinceName.invalid && provinceName.touched\">\n                                Province Name is Required!\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"col-md-6\">\n                            <div class=\"form-group\">\n                                <label for=\"fname\">Pastor's First Name</label>\n                                <input\n                                        id=\"fname\"\n                                        class=\"form-control\"\n                                        name=\"first_name\"\n                                        required\n                                        [ngModel]=\"provinceData.first_name\"\n                                        #firstName=\"ngModel\">\n                            </div>\n                        </div>\n                        <div class=\"col-md-6\">\n                            <div class=\"alert alert-danger\" *ngIf=\"firstName.invalid && firstName.touched\">\n                                First Name is Required!\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"col-md-6\">\n                            <div class=\"form-group\">\n                                <label for=\"lname\">Pastor's Last Name</label>\n                                <input\n                                        id=\"lname\"\n                                        class=\"form-control\"\n                                        name=\"last_name\"\n                                        required\n                                        [ngModel]=\"provinceData.last_name\"\n                                        #lastName=\"ngModel\">\n                            </div>\n                        </div>\n                        <div class=\"col-md-6\">\n                            <div class=\"alert alert-danger\" *ngIf=\"lastName.invalid && lastName.touched\">\n                                Last Name is Required!\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"col-md-6\">\n                            <button class=\"btn btn-primary\" [disabled]=\"createProvinceForm.invalid || showLoader\">\n                                <i *ngIf=\"showLoader\" class=\"fa fa-spinner fa-pulse fa-lg fa-fw\"></i>\n                                Submit\n                            </button>\n                            <button\n                                    type=\"button\"\n                                    class=\"btn btn-default\"\n                                    [disabled]=\"showLoader\"\n                                    (click)=\"onReset(createProvinceForm)\">Reset\n                            </button>\n                        </div>\n                    </div>\n                </form>\n            </div>\n        </div>\n    </div>\n</div>\n\n\n"

/***/ }),

/***/ "../../../../../src/app/province-zone-area-parish/province/create-province/create-province.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CreateProvinceComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__auth_auth_service__ = __webpack_require__("../../../../../src/app/auth/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__province_zone_area_parish_service__ = __webpack_require__("../../../../../src/app/province-zone-area-parish/province-zone-area-parish.service.ts");
/** Component to handle create and edit Province */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var CreateProvinceComponent = (function () {
    /** Injecting services to be used in this component */
    function CreateProvinceComponent(pzapService, authService, activatedRoute, router) {
        this.pzapService = pzapService;
        this.authService = authService;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this.editMode = false; // Initializing edit mode for this component
        this.provinceData = {
            id: 0,
            user_id: 0,
            parish_id: 0,
            first_name: '',
            last_name: '',
            password: '',
            province_name: ''
        };
        this.showLoader = false;
        this.responseStatus = false;
        this.responseReceived = false;
        this.responseMsg = '';
        this.heading = 'Create New';
        this.title = 'Province - Create';
    }
    CreateProvinceComponent.prototype.ngOnInit = function () {
        var _this = this;
        /** Checking route params to get present mode */
        this.activatedRoute.data.subscribe(function (data) {
            _this.editMode = data['editMode'];
        });
        /** Perform operation is present mode is edit mode */
        if (this.editMode) {
            this.title = 'Province - Update';
            this.heading = 'Update';
            /** Checking route params to get id of province to edit */
            this.activatedRoute.params.subscribe(function (params) {
                _this.provinceId = params['id'];
                _this.pzapService.provinceToEdit(_this.provinceId)
                    .subscribe(function (response) {
                    _this.provinceData = response.json().provinces;
                });
            }, function (error) {
                if (error.status === 401) {
                    _this.authService.removeToken();
                    _this.router.navigate(['/login']);
                }
            });
        }
    };
    /** Function call when form is submitted */
    CreateProvinceComponent.prototype.onSubmit = function (createProvinceForm) {
        var _this = this;
        this.showLoader = true;
        if (this.editMode) {
            var province_id = this.provinceData.id;
            var pastor_id = this.provinceData.user_id;
            this.pzapService.editProvince(province_id, pastor_id, createProvinceForm.value)
                .subscribe(function (response) {
                _this.showLoader = false;
                _this.responseStatus = response.json().status;
                if (response.json().status) {
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
                //createProvinceForm.reset();
                _this.responseReceived = true;
                setTimeout(function () {
                    _this.responseReceived = false;
                }, 3000);
            });
        }
        else {
            this.pzapService.createProvince(createProvinceForm.value)
                .subscribe(function (response) {
                _this.showLoader = false;
                _this.responseStatus = response.json().status;
                if (response.json().status) {
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
                createProvinceForm.reset();
                _this.responseReceived = true;
                setTimeout(function () {
                    _this.responseReceived = false;
                }, 3000);
            });
        }
    };
    /** Function call to reset form */
    CreateProvinceComponent.prototype.onReset = function (createProvinceForm) {
        var _this = this;
        if (this.editMode) {
            this.pzapService.provinceToEdit(this.provinceId)
                .subscribe(function (response) {
                _this.provinceData = response.json().provinces;
                createProvinceForm.form.patchValue({
                    first_name: _this.provinceData.first_name,
                    last_name: _this.provinceData.last_name,
                    province_name: _this.provinceData.province_name
                });
            }, function (error) {
                if (error.status === 401) {
                    _this.authService.removeToken();
                    _this.router.navigate(['/login']);
                }
            });
        }
        else {
            createProvinceForm.reset();
        }
    };
    return CreateProvinceComponent;
}());
CreateProvinceComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        selector: 'app-create-province',
        template: __webpack_require__("../../../../../src/app/province-zone-area-parish/province/create-province/create-province.component.html"),
        styles: [__webpack_require__("../../../../../src/app/province-zone-area-parish/province/create-province/create-province.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__province_zone_area_parish_service__["a" /* ProvinceZoneAreaParishService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__province_zone_area_parish_service__["a" /* ProvinceZoneAreaParishService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__auth_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__auth_auth_service__["a" /* AuthService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_router__["a" /* ActivatedRoute */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_0__angular_router__["d" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_router__["d" /* Router */]) === "function" && _d || Object])
], CreateProvinceComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=create-province.component.js.map

/***/ }),

/***/ "../../../../../src/app/province-zone-area-parish/province/list-province/list-province.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/province-zone-area-parish/province/list-province/list-province.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n    <div class=\"col-lg-12\">\n        <h3 class=\"page-header\">Province - List</h3>\n    </div>\n</div><!--/.row-->\n\n<div class=\"row\">\n    <div class=\"col-sm-12\">\n        <div class=\"panel panel-default\">\n            <div class=\"panel-heading\">\n                List Provinces\n            </div>\n            <div class=\"panel-body overflowFix\">\n                <div class=\"row\">\n                    <div class=\"col-lg-12\">\n                        <div *ngIf=\"!responseStatus && responseReceived\" class=\"alert alert-danger\">\n                            <strong>{{ responseMsg }}</strong>\n                        </div>\n                    </div>\n\n                    <div class=\"col-lg-12\">\n                        <div *ngIf=\"responseStatus && responseReceived\" class=\"alert alert-success\">\n                            <strong>{{ responseMsg }}</strong>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"table-responsive\">\n                    <table class=\"table table-hover table-condensed\">\n                        <thead>\n                            <tr>\n                                <th>First Name</th>\n                                <th>Last Name</th>\n                                <th>Province</th>\n                                <th>Username</th>\n                                <th>Password</th>\n                                <th>Actions</th>\n                            </tr>\n                        </thead>\n                        <tbody>\n                            <tr *ngFor=\"let province of provinceList\">\n                                <td>{{ province.first_name }}</td>\n                                <td>{{ province.last_name }}</td>\n                                <td>{{ province.province_name }}</td>\n                                <td>{{ province.parish_id }}</td>\n                                <td>{{ province.password}}</td>\n                                <td>\n                                    <button\n                                            class=\"btn btn-warning btn-xs\"\n                                            type=\"button\"\n                                            (click)=\"onEdit(province)\"\n                                    >\n                                        <i class=\"fa fa-pencil fa-fw\"></i>\n                                    </button>\n                                    <button\n                                            class=\"btn btn-danger btn-xs\"\n                                            type=\"button\"\n                                            (click)=\"showPrompt(province)\">\n                                        <i class=\"fa fa-trash fa-fw\"></i>\n                                    </button>\n                                </td>\n                            </tr>\n                            <tr *ngIf=\"!provinceList\" colspan=\"6\">\n                                <td>{{ responseNoRecord }}</td>\n                            </tr>\n                        </tbody>\n                    </table>\n                </div>\n\n            </div>\n        </div>\n    </div>\n</div><!--/.row-->\n\n<app-prompt\n        *ngIf=\"showDeletePrompt\"\n        [calledFrom]=\"'Province'\"\n        [itemInfo]=\"toDeleteProvince\"\n></app-prompt>"

/***/ }),

/***/ "../../../../../src/app/province-zone-area-parish/province/list-province/list-province.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListProvinceComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__province_zone_area_parish_service__ = __webpack_require__("../../../../../src/app/province-zone-area-parish/province-zone-area-parish.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__auth_auth_service__ = __webpack_require__("../../../../../src/app/auth/auth.service.ts");
/** Component to handle list of Provice */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ListProvinceComponent = (function () {
    /** Injecting services to be used in this component */
    function ListProvinceComponent(pzapService, router, authService) {
        this.pzapService = pzapService;
        this.router = router;
        this.authService = authService;
        this.responseMsg = '';
        this.responseStatus = false;
        this.responseNoRecord = '';
        this.responseReceived = false;
        this.showDeletePrompt = false;
    }
    ListProvinceComponent.prototype.ngOnInit = function () {
        var _this = this;
        /** Subscribe to event to refresh province list */
        this.refreshProvinceListSubscription = this.pzapService.refreshList
            .subscribe(function () {
            _this.pzapService.listProvince().subscribe(function (response) {
                _this.responseStatus = response.json().status;
                if (response.json().status) {
                    _this.provinceList = response.json().provinces;
                    _this.responseNoRecord = response.json().noData;
                }
                else {
                    _this.provinceList = [];
                    _this.responseMsg = response.json().message;
                    _this.responseNoRecord = response.json().noData;
                }
            }, function (error) {
                if (error.status === 401) {
                    _this.authService.removeToken();
                    _this.router.navigate(['/login']);
                }
                _this.responseStatus = false;
                _this.responseReceived = true;
                _this.provinceList = [];
                _this.responseMsg = error.json().error;
            });
        });
        /** Emitting event which will refresh the province list */
        this.pzapService.refreshList.next();
        /** Subscribe to event to close the delete prompt */
        this.closePromptEventSubscription = this.pzapService.closePromptEvent
            .subscribe(function () {
            _this.showDeletePrompt = false;
        });
        /** Subscribe to event to delete a province */
        this.deleteProvinceEventSubscription = this.pzapService.deleteEvent
            .subscribe(function (id) {
            _this.showDeletePrompt = false;
            _this.pzapService.deleteProvince(id).subscribe(function (response) {
                _this.responseReceived = true;
                _this.responseStatus = response.json().status;
                if (response.json().status) {
                    _this.responseMsg = response.json().message;
                    _this.pzapService.refreshList.next();
                }
                else {
                    _this.provinceList = [];
                    _this.responseMsg = response.json().message;
                }
                setTimeout(function () {
                    _this.responseReceived = false;
                }, 3000);
            }, function (error) {
                if (error.status === 401) {
                    _this.authService.removeToken();
                    _this.router.navigate(['/login']);
                }
                _this.responseStatus = false;
                _this.responseReceived = true;
                _this.provinceList = [];
                _this.responseMsg = error.json().error;
                setTimeout(function () {
                    _this.responseReceived = false;
                }, 3000);
            });
        });
    };
    /** Function call on update button click */
    ListProvinceComponent.prototype.onEdit = function (obj) {
        var province_id = obj.id;
        this.router.navigate(['province/edit/', province_id]);
    };
    /** Function call to show delete prompt */
    ListProvinceComponent.prototype.showPrompt = function (obj) {
        this.showDeletePrompt = true;
        this.toDeleteProvince = obj;
    };
    /** Unsubscribing from all custom made events when component is destroyed */
    ListProvinceComponent.prototype.ngOnDestroy = function () {
        this.refreshProvinceListSubscription.unsubscribe();
        this.closePromptEventSubscription.unsubscribe();
        this.deleteProvinceEventSubscription.unsubscribe();
    };
    return ListProvinceComponent;
}());
ListProvinceComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-list-province',
        template: __webpack_require__("../../../../../src/app/province-zone-area-parish/province/list-province/list-province.component.html"),
        styles: [__webpack_require__("../../../../../src/app/province-zone-area-parish/province/list-province/list-province.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__province_zone_area_parish_service__["a" /* ProvinceZoneAreaParishService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__province_zone_area_parish_service__["a" /* ProvinceZoneAreaParishService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["d" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["d" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__auth_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__auth_auth_service__["a" /* AuthService */]) === "function" && _c || Object])
], ListProvinceComponent);

var _a, _b, _c;
//# sourceMappingURL=list-province.component.js.map

/***/ }),

/***/ "../../../../../src/app/province-zone-area-parish/province/province-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProvinceRoutingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__create_province_create_province_component__ = __webpack_require__("../../../../../src/app/province-zone-area-parish/province/create-province/create-province.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__list_province_list_province_component__ = __webpack_require__("../../../../../src/app/province-zone-area-parish/province/list-province/list-province.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var provinceRoutes = [
    { path: 'create', component: __WEBPACK_IMPORTED_MODULE_2__create_province_create_province_component__["a" /* CreateProvinceComponent */], data: { editMode: false } },
    { path: 'list', component: __WEBPACK_IMPORTED_MODULE_3__list_province_list_province_component__["a" /* ListProvinceComponent */] },
    { path: 'edit/:id', component: __WEBPACK_IMPORTED_MODULE_2__create_province_create_province_component__["a" /* CreateProvinceComponent */], data: { editMode: true } }
];
var ProvinceRoutingModule = (function () {
    function ProvinceRoutingModule() {
    }
    return ProvinceRoutingModule;
}());
ProvinceRoutingModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
        imports: [__WEBPACK_IMPORTED_MODULE_0__angular_router__["e" /* RouterModule */].forChild(provinceRoutes)],
        exports: [__WEBPACK_IMPORTED_MODULE_0__angular_router__["e" /* RouterModule */]]
    })
], ProvinceRoutingModule);

//# sourceMappingURL=province-routing.module.js.map

/***/ }),

/***/ "../../../../../src/app/province-zone-area-parish/province/province.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProvinceModule", function() { return ProvinceModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__create_province_create_province_component__ = __webpack_require__("../../../../../src/app/province-zone-area-parish/province/create-province/create-province.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__list_province_list_province_component__ = __webpack_require__("../../../../../src/app/province-zone-area-parish/province/list-province/list-province.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__province_routing_module__ = __webpack_require__("../../../../../src/app/province-zone-area-parish/province/province-routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__shared_shared_module__ = __webpack_require__("../../../../../src/app/shared/shared.module.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var ProvinceModule = (function () {
    function ProvinceModule() {
    }
    return ProvinceModule;
}());
ProvinceModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_3__create_province_create_province_component__["a" /* CreateProvinceComponent */],
            __WEBPACK_IMPORTED_MODULE_4__list_province_list_province_component__["a" /* ListProvinceComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_common__["CommonModule"],
            __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormsModule"],
            __WEBPACK_IMPORTED_MODULE_5__province_routing_module__["a" /* ProvinceRoutingModule */],
            __WEBPACK_IMPORTED_MODULE_6__shared_shared_module__["a" /* SharedModule */]
        ],
        providers: [],
        exports: [],
    })
], ProvinceModule);

//# sourceMappingURL=province.module.js.map

/***/ })

});
//# sourceMappingURL=province.module.chunk.js.map