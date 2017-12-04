webpackJsonp(["area.module"],{

/***/ "../../../../../src/app/province-zone-area-parish/area/area-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AreaRoutingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__create_area_create_area_component__ = __webpack_require__("../../../../../src/app/province-zone-area-parish/area/create-area/create-area.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__list_area_list_area_component__ = __webpack_require__("../../../../../src/app/province-zone-area-parish/area/list-area/list-area.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var provinceRoutes = [
    { path: 'create', component: __WEBPACK_IMPORTED_MODULE_2__create_area_create_area_component__["a" /* CreateAreaComponent */], data: { editMode: false } },
    { path: 'list', component: __WEBPACK_IMPORTED_MODULE_3__list_area_list_area_component__["a" /* ListAreaComponent */] },
    { path: 'edit/:id', component: __WEBPACK_IMPORTED_MODULE_2__create_area_create_area_component__["a" /* CreateAreaComponent */], data: { editMode: true } }
];
var AreaRoutingModule = (function () {
    function AreaRoutingModule() {
    }
    return AreaRoutingModule;
}());
AreaRoutingModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
        imports: [__WEBPACK_IMPORTED_MODULE_0__angular_router__["e" /* RouterModule */].forChild(provinceRoutes)],
        exports: [__WEBPACK_IMPORTED_MODULE_0__angular_router__["e" /* RouterModule */]]
    })
], AreaRoutingModule);

//# sourceMappingURL=area-routing.module.js.map

/***/ }),

/***/ "../../../../../src/app/province-zone-area-parish/area/area.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AreaModule", function() { return AreaModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__create_area_create_area_component__ = __webpack_require__("../../../../../src/app/province-zone-area-parish/area/create-area/create-area.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__list_area_list_area_component__ = __webpack_require__("../../../../../src/app/province-zone-area-parish/area/list-area/list-area.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__area_routing_module__ = __webpack_require__("../../../../../src/app/province-zone-area-parish/area/area-routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__shared_shared_module__ = __webpack_require__("../../../../../src/app/shared/shared.module.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var AreaModule = (function () {
    function AreaModule() {
    }
    return AreaModule;
}());
AreaModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_3__create_area_create_area_component__["a" /* CreateAreaComponent */],
            __WEBPACK_IMPORTED_MODULE_4__list_area_list_area_component__["a" /* ListAreaComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_5__area_routing_module__["a" /* AreaRoutingModule */],
            __WEBPACK_IMPORTED_MODULE_0__angular_common__["CommonModule"],
            __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormsModule"],
            __WEBPACK_IMPORTED_MODULE_6__shared_shared_module__["a" /* SharedModule */]
        ],
        providers: [],
        exports: [],
    })
], AreaModule);

//# sourceMappingURL=area.module.js.map

/***/ }),

/***/ "../../../../../src/app/province-zone-area-parish/area/create-area/create-area.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "input.ng-invalid.ng-touched {\n    border: 1px solid #a94442;\n}\n\nbutton {\n    margin-top: 15px;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/province-zone-area-parish/area/create-area/create-area.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n    <div class=\"col-lg-12\">\n        <h3 class=\"page-header\">{{ title }}</h3>\n    </div>\n</div><!--/.row-->\n\n<div class=\"row\">\n    <div class=\"col-lg-12\">\n        <div class=\"panel panel-default\">\n            <div class=\"panel-heading\">{{ heading }} Area</div>\n            <div class=\"panel-body\">\n                <div class=\"row\">\n                    <div class=\"col-lg-12\">\n                        <div *ngIf=\"!responseStatus && responseReceived\" class=\"alert alert-danger\">\n                            <strong>{{ responseMsg }}</strong>\n                        </div>\n                    </div>\n                    <div class=\"col-lg-12\">\n                        <div *ngIf=\"responseStatus && responseReceived\" class=\"alert alert-success\">\n                            <strong>{{ responseMsg }}</strong>\n                        </div>\n                    </div>\n                </div>\n                <form\n                        #createAreaForm=\"ngForm\"\n                        (submit)=\"onSubmit(createAreaForm)\">\n                    <div class=\"row\">\n                        <div class=\"col-md-6\">\n                            <div class=\"form-group\">\n                                <label>Select Province</label>\n                                <select\n                                        #selectedProvince\n                                        name=\"province_id\"\n                                        [ngModel]=\"areaData.province_id\"\n                                        class=\"form-control\"\n                                        (change)=\"onSelectProvince(selectedProvince.value)\">\n                                    <option value=\"0\" selected>Choose...</option>\n                                    <option\n                                            *ngFor=\"let province of provinceList\"\n                                            [value]=\"province.id\">\n                                        {{province.province_name}}\n                                    </option>\n                                </select>\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"row\" *ngIf=\"provinceSelected\">\n                        <div class=\"col-md-6\">\n                            <div class=\"form-group\">\n                                <label>Select Zone</label>\n                                <select\n                                        #selectedZone\n                                        name=\"zone_id\"\n                                        [ngModel]=\"areaData.zone_id\"\n                                        class=\"form-control\"\n                                        [disabled]=\"!provinceList || !provinceSelected\"\n                                        (change)=\"onSelectZone(selectedZone.value)\">\n                                    <option value=\"0\" selected>Choose...</option>\n                                    <option\n                                            *ngFor=\"let zone of zoneList\"\n                                            [value]=\"zone.id\">\n                                        {{zone.zone_name}}\n                                    </option>\n                                </select>\n                            </div>\n\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"col-md-6\">\n                            <div class=\"form-group\">\n                                <label for=\"aname\">Area Name</label>\n                                <input\n                                        id=\"aname\"\n                                        class=\"form-control\"\n                                        [disabled]=\"!provinceList || !provinceSelected || (zoneList && !zoneList) || !zoneSelected\"\n                                        name=\"area_name\"\n                                        required\n                                        [ngModel]=\"areaData.area_name\"\n                                        #areaName=\"ngModel\">\n                            </div>\n                        </div>\n                        <div class=\"col-md-6\">\n                            <div\n                                    class=\"alert alert-danger\"\n                                    *ngIf=\"areaName.invalid && areaName.touched\">\n                                Area Name is Required!\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"col-md-6\">\n                            <div class=\"form-group\">\n                                <label for=\"fname\">Pastor's First Name</label>\n                                <input\n                                        id=\"fname\"\n                                        class=\"form-control\"\n                                        [disabled]=\"!provinceList || !provinceSelected || (zoneList && !zoneList) || !zoneSelected\"\n                                        name=\"first_name\"\n                                        required\n                                        [ngModel]=\"areaData.first_name\"\n                                        #firstName=\"ngModel\">\n                            </div>\n                        </div>\n                        <div class=\"col-md-6\">\n                            <div\n                                    class=\"alert alert-danger\"\n                                    *ngIf=\"firstName.invalid && firstName.touched\">\n                                First Name is Required!\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"col-md-6\">\n                            <div class=\"form-group\">\n                                <label for=\"lname\">Pastor's Last Name</label>\n                                <input\n                                        id=\"lname\"\n                                        class=\"form-control\"\n                                        [disabled]=\"!provinceList || !provinceSelected || !zoneList || !zoneSelected\"\n                                        name=\"last_name\"\n                                        required\n                                        [ngModel]=\"areaData.last_name\"\n                                        #lastName=\"ngModel\">\n                            </div>\n                        </div>\n                        <div class=\"col-md-6\">\n                            <div\n                                    class=\"alert alert-danger\"\n                                    *ngIf=\"lastName.invalid && lastName.touched\">\n                                Last Name is Required!\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"col-md-6\">\n                            <button\n                                    class=\"btn btn-primary\"\n                                    [disabled]=\"!provinceList || !provinceSelected || !zoneList || !zoneSelected || ( createAreaForm.invalid && createAreaForm.touched )\">\n                                <i *ngIf=\"showLoader\" class=\"fa fa-spinner fa-pulse fa-lg fa-fw\"></i>\n                                Submit\n                            </button>\n                            <button\n                                    type=\"button\"\n                                    class=\"btn btn-default\"\n                                    (click)=\"onReset(createAreaForm)\">\n                                Reset\n                            </button>\n                        </div>\n                    </div>\n                </form>\n            </div>\n        </div>\n    </div>\n</div>\n\n"

/***/ }),

/***/ "../../../../../src/app/province-zone-area-parish/area/create-area/create-area.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CreateAreaComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__auth_auth_service__ = __webpack_require__("../../../../../src/app/auth/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__province_zone_area_parish_service__ = __webpack_require__("../../../../../src/app/province-zone-area-parish/province-zone-area-parish.service.ts");
/** Component to create and edit Area */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var CreateAreaComponent = (function () {
    /** Injecting services to be used in this component */
    function CreateAreaComponent(authService, activatedRoute, pzapService, router) {
        this.authService = authService;
        this.activatedRoute = activatedRoute;
        this.pzapService = pzapService;
        this.router = router;
        this.editMode = false;
        this.areaData = {
            id: 0,
            user_id: 0,
            parish_id: 0,
            first_name: '',
            last_name: '',
            password: '',
            zone_id: 0,
            province_id: 0,
            zone_name: '',
            area_name: '',
            province_name: ''
        };
        this.areaId = 0;
        this.provinceList = [];
        this.zoneList = [];
        this.responseMsg = '';
        this.title = 'Area - Create';
        this.heading = 'Create New';
        this.showLoader = false;
        this.responseStatus = false;
        this.responseReceived = false;
    }
    CreateAreaComponent.prototype.ngOnInit = function () {
        var _this = this;
        /** Service call to get list of all available province */
        this.pzapService.listProvince()
            .subscribe(function (response) {
            _this.responseStatus = response.json().status;
            if (response.json().status) {
                _this.provinceList = response.json().provinces;
            }
            else {
                _this.provinceList = [];
                _this.responseMsg = response.json().message;
            }
            /** Checking route params to get present mode */
            _this.activatedRoute.data.subscribe(function (data) {
                _this.editMode = data['editMode'];
                /** Perform operation is present mode is edit mode */
                if (_this.editMode) {
                    _this.provinceSelected = true;
                    _this.zoneSelected = true;
                    _this.heading = 'Update';
                    _this.title = 'Area - Update';
                    /** Checking route params to get id of area to edit */
                    _this.activatedRoute.params.subscribe(function (params) {
                        _this.areaId = params['id'];
                        _this.pzapService.areaToEdit(_this.areaId)
                            .subscribe(function (response) {
                            _this.areaData = response.json().areas;
                            _this.pzapService.filterZone({ province_id: _this.areaData.province_id })
                                .subscribe(function (response) {
                                _this.zoneList = response.json().zones;
                            });
                        });
                    }, function (error) {
                        console.log(error);
                    }, function () { });
                }
                else {
                    _this.provinceSelected = false;
                    _this.zoneSelected = false;
                }
            });
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
    };
    /** Function call when province selected */
    CreateAreaComponent.prototype.onSelectProvince = function (id) {
        var _this = this;
        if (id > 0) {
            this.provinceSelected = true;
            this.zoneSelected = false;
            this.pzapService.filterZone({ province_id: id })
                .subscribe(function (response) {
                _this.responseStatus = response.json().status;
                if (response.json().status) {
                    _this.zoneList = response.json().zones;
                }
                else {
                    _this.zoneList = [];
                    _this.responseMsg = response.json().message;
                }
            }, function (error) {
                if (error.status === 401) {
                    _this.authService.removeToken();
                    _this.router.navigate(['/login']);
                }
                _this.responseStatus = false;
                _this.responseReceived = true;
                _this.zoneList = [];
                _this.responseMsg = error.json().error;
            });
        }
        else {
            this.provinceSelected = false;
            this.zoneSelected = false;
        }
    };
    /** Function call when zone selected */
    CreateAreaComponent.prototype.onSelectZone = function (id) {
        this.zoneSelected = true;
    };
    /** Function call when form is submitted */
    CreateAreaComponent.prototype.onSubmit = function (createAreaForm) {
        var _this = this;
        this.showLoader = true;
        if (this.editMode) {
            var area_id = this.areaData.id;
            var pastor_id = this.areaData.user_id;
            this.pzapService.editArea(area_id, pastor_id, createAreaForm.value)
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
                //createAreaForm.reset();
                _this.responseReceived = true;
                setTimeout(function () {
                    _this.responseReceived = false;
                }, 3000);
            });
        }
        else {
            this.pzapService.createArea(createAreaForm.value)
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
                _this.responseReceived = true;
                createAreaForm.reset();
                _this.provinceSelected = false;
                _this.zoneSelected = false;
                setTimeout(function () {
                    _this.responseReceived = false;
                }, 3000);
            });
        }
    };
    /** Function call to reset form */
    CreateAreaComponent.prototype.onReset = function (createAreaForm) {
        var _this = this;
        if (this.editMode) {
            this.pzapService.areaToEdit(this.areaId)
                .subscribe(function (response) {
                _this.provinceSelected = true;
                _this.areaData = response.json().areas;
                _this.onSelectProvince(_this.areaData.province_id);
                _this.zoneSelected = true;
                createAreaForm.form.patchValue({
                    first_name: _this.areaData.first_name,
                    last_name: _this.areaData.last_name,
                    province_id: _this.areaData.province_id,
                    zone_id: _this.areaData.zone_id,
                    area_name: _this.areaData.area_name
                });
            }, function (error) {
                if (error.status === 401) {
                    _this.authService.removeToken();
                    _this.router.navigate(['/login']);
                }
            });
        }
        else {
            createAreaForm.reset();
            this.provinceSelected = false;
            this.zoneSelected = false;
            createAreaForm.form.patchValue({
                province_id: 0,
                zone_id: 0
            });
        }
    };
    return CreateAreaComponent;
}());
CreateAreaComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        selector: 'app-create-area',
        template: __webpack_require__("../../../../../src/app/province-zone-area-parish/area/create-area/create-area.component.html"),
        styles: [__webpack_require__("../../../../../src/app/province-zone-area-parish/area/create-area/create-area.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__auth_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__auth_auth_service__["a" /* AuthService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_router__["a" /* ActivatedRoute */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__province_zone_area_parish_service__["a" /* ProvinceZoneAreaParishService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__province_zone_area_parish_service__["a" /* ProvinceZoneAreaParishService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_0__angular_router__["d" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_router__["d" /* Router */]) === "function" && _d || Object])
], CreateAreaComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=create-area.component.js.map

/***/ }),

/***/ "../../../../../src/app/province-zone-area-parish/area/list-area/list-area.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/province-zone-area-parish/area/list-area/list-area.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n    <div class=\"col-lg-12\">\n        <h3 class=\"page-header\">Area - List</h3>\n    </div>\n</div><!--/.row-->\n\n<div class=\"row\">\n    <div class=\"col-sm-12\">\n        <div class=\"panel panel-default\">\n            <div class=\"panel-heading\">\n                List Area\n            </div>\n            <div class=\"panel-body overflowFix\">\n                <div class=\"row\">\n                    <div class=\"col-lg-12\">\n                        <div *ngIf=\"!responseStatus && responseReceived\" class=\"alert alert-danger\">\n                            <strong>{{ responseMsg }}</strong>\n                        </div>\n                    </div>\n                    <div class=\"col-lg-12\">\n                        <div *ngIf=\"responseStatus && responseReceived\" class=\"alert alert-success\">\n                            <strong>{{ responseMsg }}</strong>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"row\">\n                    <div class=\"col-md-4\">\n                        <p></p>\n                        <button (click)=\"onResetList()\">Reset Filter</button>\n                    </div>\n\n                    <div class=\"col-md-4\">\n                        <label>Filter Province:</label>\n                        <select\n                                #selectedProvince\n                                name=\"province_id\"\n                                class=\"form-control\"\n                                [(ngModel)]=\"selectionProvince\"\n                                (change)=\"onSelectProvince(selectedProvince.value)\">\n                            <option value=\"0\" selected>Choose...</option>\n                            <option\n                                    *ngFor=\"let province of provinceList\"\n                                    [value]=\"province.id\">\n                                {{province.province_name}}\n                            </option>\n                        </select>\n\n                    </div>\n\n                    <div class=\"col-md-4\">\n                        <label>Filter Zone:</label>\n                        <select\n                                #selectedZone\n                                class=\"form-control\"\n                                [(ngModel)]=\"selectionZone\"\n                                (change)=\"onSelectZone(selectedZone.value)\">\n                            <option value=\"0\" selected>Choose...</option>\n                            <option\n                                    *ngFor=\"let zone of zoneList\"\n                                    [value]=\"zone.id\">\n                                {{zone.zone_name}}\n                            </option>\n                        </select>\n                    </div>\n\n\n                </div>\n                <div class=\"table-responsive\">\n                    <table class=\"table table-hover table-condensed\">\n                        <thead>\n                            <tr>\n                                <th>First Name</th>\n                                <th>Last Name</th>\n                                <th>Province / Zone / Area</th>\n                                <th>Username</th>\n                                <th>Password</th>\n                                <th>Actions</th>\n                            </tr>\n                        </thead>\n                        <tbody>\n                            <tr *ngFor=\"let area of areaList\">\n                                <td>{{ area.first_name }}</td>\n                                <td>{{ area.last_name }}</td>\n                                <td>{{ area.province_name }} / {{ area.zone_name }} / {{ area.area_name }}</td>\n                                <td>{{ area.parish_id }}</td>\n                                <td>{{ area.password}}</td>\n                                <td>\n                                <button\n                                        class=\"btn btn-warning btn-xs\"\n                                        type=\"button\"\n                                        (click)=\"onEdit(area)\">\n                                    <i class=\"fa fa-pencil fa-fw\"></i>\n                                </button>\n                                <button\n                                        class=\"btn btn-danger btn-xs\"\n                                        type=\"button\"\n                                        (click)=\"showPrompt(area)\">\n                                    <i class=\"fa fa-trash fa-fw\"></i>\n                                </button>\n                            </td>\n                            </tr>\n                            <tr *ngIf=\"!areaList\">\n                                {{responseNoRecord}}\n                            </tr>\n                        </tbody>\n                    </table>\n                </div>\n\n            </div>\n        </div>\n    </div>\n</div><!--/.row-->\n\n<app-prompt\n        *ngIf=\"showDeletePrompt\"\n        [calledFrom]=\"'Area'\"\n        [itemInfo]=\"toDeleteArea\"\n></app-prompt>"

/***/ }),

/***/ "../../../../../src/app/province-zone-area-parish/area/list-area/list-area.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListAreaComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__province_zone_area_parish_service__ = __webpack_require__("../../../../../src/app/province-zone-area-parish/province-zone-area-parish.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__auth_auth_service__ = __webpack_require__("../../../../../src/app/auth/auth.service.ts");
/** Component to list and filter Area */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ListAreaComponent = (function () {
    /** Injecting services to be used in this component */
    function ListAreaComponent(router, pzapService, authService) {
        this.router = router;
        this.pzapService = pzapService;
        this.authService = authService;
        this.responseMsg = '';
        this.zoneSelected = false;
        this.responseStatus = false;
        this.responseNoRecord = '';
        this.responseReceived = false;
        this.showDeletePrompt = false;
        this.provinceSelected = false;
        this.provID = 0;
        this.zoneID = 0;
        this.selectionProvince = 0;
        this.selectionZone = 0;
    }
    ListAreaComponent.prototype.ngOnInit = function () {
        var _this = this;
        /** Subscribe to event to refresh area list */
        this.refreshAreaListSubscription = this.pzapService.refreshList
            .subscribe(function (body) {
            _this.pzapService.filterArea(body).subscribe(function (response) {
                _this.responseStatus = response.json().status;
                if (response.json().status) {
                    _this.areaList = response.json().areas;
                    _this.responseNoRecord = response.json().noData;
                }
                else {
                    _this.areaList = [];
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
                _this.areaList = [];
                _this.responseMsg = error.json().error;
            });
        });
        /** Subscribe to event to refresh zone list */
        this.refreshZoneListSubscription = this.pzapService.refreshList
            .subscribe(function (body) {
            _this.pzapService.filterZone(body).subscribe(function (response) {
                _this.responseStatus = response.json().status;
                if (response.json().status) {
                    _this.zoneList = response.json().zones;
                    if (_this.selectionProvince == 0 && _this.zoneSelected) {
                        _this.selectionProvince = _this.zoneList[0].province_id;
                    }
                    _this.responseNoRecord = response.json().noData;
                }
                else {
                    _this.zoneList = [];
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
                _this.zoneList = [];
                _this.responseMsg = error.json().error;
            });
        });
        /** Emitting event which will refresh the area and zone list */
        this.pzapService.refreshList.next({});
        /** Subscribe to event to close the delete prompt */
        this.closePromptEventSubscription = this.pzapService.closePromptEvent
            .subscribe(function () {
            _this.showDeletePrompt = false;
        });
        /** Subscribe to event to delete an area */
        this.deleteAreaEventSubscription = this.pzapService.deleteEvent
            .subscribe(function (id) {
            _this.showDeletePrompt = false;
            _this.pzapService.deleteArea(id).subscribe(function (response) {
                _this.responseReceived = true;
                _this.responseStatus = response.json().status;
                if (response.json().status) {
                    _this.responseMsg = response.json().message;
                    _this.pzapService.refreshList.next({});
                }
                else {
                    _this.areaList = [];
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
                _this.areaList = [];
                _this.responseMsg = error.json().error;
                setTimeout(function () {
                    _this.responseReceived = false;
                }, 3000);
            });
        });
        /** Service call to get list of all available province */
        this.pzapService.listProvince()
            .subscribe(function (response) {
            _this.responseStatus = response.json().status;
            if (response.json().status) {
                _this.provinceList = response.json().provinces;
            }
            else {
                _this.provinceList = [];
                _this.responseMsg = response.json().message;
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
    };
    /** Function to reset all filter value and reset list */
    ListAreaComponent.prototype.onResetList = function () {
        this.selectionProvince = 0;
        this.selectionZone = 0;
        this.pzapService.refreshList.next({});
    };
    /** Function call on update button click */
    ListAreaComponent.prototype.onEdit = function (obj) {
        var area_id = obj.id;
        this.router.navigate(['area/edit/', area_id]);
    };
    /** Function call to show delete prompt */
    ListAreaComponent.prototype.showPrompt = function (obj) {
        this.showDeletePrompt = true;
        this.toDeleteArea = obj;
    };
    /** Function call on selection of province from filters */
    ListAreaComponent.prototype.onSelectProvince = function (id) {
        var _this = this;
        if (id > 0) {
            this.provinceSelected = true;
            this.zoneSelected = false;
            this.provID = id;
            this.pzapService.filterZone({ province_id: id })
                .subscribe(function (response) {
                _this.responseStatus = response.json().status;
                if (response.json().status) {
                    if (response.json().zones != undefined && response.json().zones.length == 1) {
                        _this.selectionZone = response.json().zones[0]['id'];
                    }
                    else {
                        _this.selectionZone = null;
                    }
                }
                else {
                    _this.selectionZone = null;
                }
            }, function (error) {
                if (error.status === 401) {
                    _this.authService.removeToken();
                    _this.router.navigate(['/login']);
                }
                _this.responseStatus = false;
                _this.responseReceived = true;
                _this.selectionZone = null;
                _this.zoneList = [];
                _this.responseMsg = error.json().error;
            });
            this.pzapService.refreshList.next({ province_id: id });
        }
        else {
            this.provinceSelected = false;
            this.zoneSelected = false;
            this.provID = id;
            if (this.zoneID > 0) {
                this.pzapService.refreshList.next({ zone_id: this.zoneID });
            }
            else {
                this.pzapService.refreshList.next({});
            }
        }
    };
    /** Function call on selection of zone from filters */
    ListAreaComponent.prototype.onSelectZone = function (id) {
        var _this = this;
        if (id > 0) {
            this.zoneSelected = true;
            this.pzapService.refreshList.next({ zone_id: id });
            this.pzapService.filterArea({ zone_id: id })
                .subscribe(function (response) {
                _this.responseStatus = response.json().status;
                if (response.json().status) {
                    if (response.json().areas != undefined) {
                        _this.selectionProvince = response.json().areas[0]['province_id'];
                    }
                }
                else {
                    _this.responseMsg = response.json().message;
                }
            }, function (error) {
                if (error.status === 401) {
                    _this.authService.removeToken();
                    _this.router.navigate(['/login']);
                }
                _this.responseStatus = false;
                _this.responseReceived = true;
                _this.responseMsg = error.json().error;
            });
        }
        else {
            this.zoneSelected = false;
            this.pzapService.refreshList.next({ province_id: this.provID });
        }
    };
    /** Un-subscribing from all custom made events when component is destroyed */
    ListAreaComponent.prototype.ngOnDestroy = function () {
        this.closePromptEventSubscription.unsubscribe();
        this.deleteAreaEventSubscription.unsubscribe();
        this.refreshAreaListSubscription.unsubscribe();
        this.refreshZoneListSubscription.unsubscribe();
    };
    return ListAreaComponent;
}());
ListAreaComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-list-area',
        template: __webpack_require__("../../../../../src/app/province-zone-area-parish/area/list-area/list-area.component.html"),
        styles: [__webpack_require__("../../../../../src/app/province-zone-area-parish/area/list-area/list-area.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["d" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["d" /* Router */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__province_zone_area_parish_service__["a" /* ProvinceZoneAreaParishService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__province_zone_area_parish_service__["a" /* ProvinceZoneAreaParishService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__auth_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__auth_auth_service__["a" /* AuthService */]) === "function" && _c || Object])
], ListAreaComponent);

var _a, _b, _c;
//# sourceMappingURL=list-area.component.js.map

/***/ })

});
//# sourceMappingURL=area.module.chunk.js.map