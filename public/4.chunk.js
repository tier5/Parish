webpackJsonp([4],{

/***/ "../../../../../src/app/province-zone-area/zone/create-zone/create-zone.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "input.ng-invalid.ng-touched {\n    border: 1px solid #a94442;\n}\n\nbutton {\n    margin-top: 15px;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/province-zone-area/zone/create-zone/create-zone.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n    <div class=\"col-lg-12\">\n        <h3 *ngIf=\"!editMode\" class=\"page-header\">Zone - Create</h3>\n        <h3 *ngIf=\"editMode\" class=\"page-header\">Zone - Update</h3>\n    </div>\n</div><!--/.row-->\n\n<div class=\"row\">\n    <div class=\"col-lg-12\">\n        <div class=\"panel panel-default\">\n            <div class=\"panel-heading\">{{ editMode ? 'Update':'Create New' }} Zone</div>\n            <div class=\"panel-body\">\n                <form\n                    #createZoneForm=\"ngForm\"\n                    (submit)=\"onSubmit(createZoneForm)\">\n                    <div class=\"row\">\n                        <div class=\"col-md-6\">\n                            <div class=\"form-group\">\n                                <label>Select Province</label>\n                                <select\n                                    #selected\n                                    name=\"provience_id\"\n                                    [ngModel]=\"zoneData.provience_id\"\n                                    class=\"form-control\"\n                                    (change)=\"onSelectProvince(selected.value)\"\n                                >\n                                    <option\n                                        *ngFor=\"let province of provinceList\"\n                                        [value]=\"province.id\"\n                                    >\n                                        {{province.province_name}}\n                                    </option>\n                                </select>\n                            </div>\n                        </div>\n                        <div class=\"col-md-6\">\n\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"col-md-6\">\n                            <div class=\"form-group\">\n                                <label for=\"zname\">Zone Name</label>\n                                <input\n                                    id=\"zname\"\n                                    class=\"form-control\"\n                                    [disabled]=\"provinceList.length<=0 || !provinceSelected\"\n                                    name=\"zone_name\"\n                                    required\n                                    [ngModel]=\"zoneData.zone_name\"\n                                    #zoneName=\"ngModel\"\n                                >\n                            </div>\n                        </div>\n                        <div class=\"col-md-6\">\n                            <div\n                                class=\"alert alert-danger\"\n                                *ngIf=\"zoneName.invalid && zoneName.touched\"\n                            >\n                                Zone Name is Required!\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"col-md-6\">\n                            <div class=\"form-group\">\n                                <label for=\"fname\">Pastor's First Name</label>\n                                <input\n                                    id=\"fname\"\n                                    class=\"form-control\"\n                                    [disabled]=\"provinceList.length<=0 || !provinceSelected\"\n                                    name=\"first_name\"\n                                    required\n                                    [ngModel]=\"zoneData.first_name\"\n                                    #firstName=\"ngModel\"\n                                >\n                            </div>\n                        </div>\n                        <div class=\"col-md-6\">\n                            <div\n                                class=\"alert alert-danger\"\n                                *ngIf=\"firstName.invalid && firstName.touched\"\n                            >\n                                First Name is Required!\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"col-md-6\">\n                            <div class=\"form-group\">\n                                <label for=\"lname\">Pastor's Last Name</label>\n                                <input\n                                    id=\"lname\"\n                                    class=\"form-control\"\n                                    [disabled]=\"provinceList.length<=0 || !provinceSelected\"\n                                    name=\"last_name\"\n                                    required\n                                    [ngModel]=\"zoneData.last_name\"\n                                    #lastName=\"ngModel\"\n                                >\n                            </div>\n                        </div>\n                        <div class=\"col-md-6\">\n                            <div\n                                class=\"alert alert-danger\"\n                                *ngIf=\"lastName.invalid && lastName.touched\"\n                            >\n                                Last Name is Required!\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"col-md-6\">\n                            <div\n                                *ngIf=\"!responseStatus && responseReceived\"\n                                class=\"alert alert-danger\"\n                            >\n                                <strong>{{ responseMsg }}</strong>\n                            </div>\n                            <div\n                                *ngIf=\"responseStatus && responseReceived\"\n                                class=\"alert alert-success\"\n                            >\n                                <strong>{{ responseMsg }}</strong>\n                            </div>\n                        </div>\n                        <div class=\"col-md-6\">\n                            <button\n                                class=\"btn btn-primary\"\n                                [disabled]=\"provinceList.length<=0 || !provinceSelected || ( createZoneForm.invalid && createZoneForm.touched )\"\n                            >\n                                <i *ngIf=\"showLoader\" class=\"fa fa-spinner fa-pulse fa-lg fa-fw\"></i>\n                                Submit\n                            </button>\n                            <button\n                                type=\"button\"\n                                class=\"btn btn-default\"\n                                (click)=\"onReset(createZoneForm)\"\n                            >Reset</button>\n                        </div>\n                    </div>\n                </form>\n            </div>\n        </div>\n    </div>\n</div>\n\n"

/***/ }),

/***/ "../../../../../src/app/province-zone-area/zone/create-zone/create-zone.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__zone_service__ = __webpack_require__("../../../../../src/app/province-zone-area/zone/zone.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__auth_auth_service__ = __webpack_require__("../../../../../src/app/auth/auth.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CreateZoneComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var CreateZoneComponent = (function () {
    function CreateZoneComponent(zoneService, authService, activatedRoute) {
        this.zoneService = zoneService;
        this.authService = authService;
        this.activatedRoute = activatedRoute;
        this.editMode = false;
        this.zoneData = {
            id: 0,
            user_id: 0,
            parish_id: 0,
            first_name: '',
            last_name: '',
            province_name: '',
            password: '',
            provience_id: 0,
            provience_name: '',
            zone_name: ''
        };
        this.provinceList = [];
        this.responseReceived = false;
        this.responseMsg = '';
        this.responseStatus = false;
        this.showLoader = false;
    }
    CreateZoneComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.zoneService.listProvince().subscribe(function (response) {
            if (response.json().status) {
                _this.responseStatus = true;
                _this.provinceList = response.json().provinces;
            }
            else {
                _this.responseStatus = false;
                _this.provinceList = [];
                _this.responseMsg = response.json().message;
            }
        }, function (error) {
            _this.responseStatus = false;
            _this.responseReceived = true;
            _this.provinceList = [];
            _this.responseMsg = error.json().error;
        });
        this.activatedRoute.data.subscribe(function (data) {
            _this.editMode = data['editMode'];
        });
        if (this.editMode) {
            this.provinceSelected = true;
            this.activatedRoute.params.subscribe(function (params) {
                _this.zoneId = params['id'];
                _this.zoneService.fetchSpecificZone(_this.zoneId)
                    .subscribe(function (response) {
                    _this.zoneData = response.json().zones;
                    console.log(_this.zoneData);
                });
            }, function (error) {
                console.log(error);
            }, function () { });
        }
        else {
            this.provinceSelected = false;
        }
    };
    CreateZoneComponent.prototype.onSelectProvince = function (id) {
        this.provinceSelected = true;
    };
    CreateZoneComponent.prototype.onSubmit = function (createZoneForm) {
        var _this = this;
        this.showLoader = true;
        if (this.editMode) {
            var zone_id = this.zoneData.id;
            var pastor_id = this.zoneData.user_id;
            this.zoneService.editZone(zone_id, pastor_id, createZoneForm.value)
                .subscribe(function (response) {
                _this.showLoader = false;
                if (response.json().status) {
                    _this.responseStatus = true;
                    _this.responseMsg = response.json().message;
                }
                else {
                    _this.responseStatus = false;
                    console.log(response);
                    console.log(response.status);
                }
            }, function (error) {
                if (error.status === 401) {
                    _this.authService.removeToken();
                }
                console.log(error);
                _this.showLoader = false;
                _this.responseStatus = false;
                _this.responseReceived = true;
                _this.responseMsg = error.json().error;
                setTimeout(function () {
                    _this.responseReceived = false;
                }, 3000);
            }, function () {
                createZoneForm.reset();
                _this.responseReceived = true;
                setTimeout(function () {
                    _this.responseReceived = false;
                }, 3000);
            });
        }
        else {
            this.zoneService.createZone(createZoneForm.value)
                .subscribe(function (response) {
                _this.showLoader = false;
                if (response.json().status) {
                    _this.responseStatus = true;
                    _this.responseMsg = response.json().message;
                }
                else {
                    _this.responseStatus = false;
                }
            }, function (error) {
                alert('error');
                if (error.status === 401) {
                    _this.authService.removeToken();
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
                createZoneForm.reset();
                _this.provinceSelected = false;
                setTimeout(function () {
                    _this.responseReceived = false;
                }, 3000);
            });
        }
    };
    CreateZoneComponent.prototype.onReset = function (createZoneForm) {
        createZoneForm.reset();
        this.provinceSelected = false;
    };
    return CreateZoneComponent;
}());
CreateZoneComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        selector: 'app-create-zone',
        template: __webpack_require__("../../../../../src/app/province-zone-area/zone/create-zone/create-zone.component.html"),
        styles: [__webpack_require__("../../../../../src/app/province-zone-area/zone/create-zone/create-zone.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__zone_service__["a" /* ZoneService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__zone_service__["a" /* ZoneService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__auth_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__auth_auth_service__["a" /* AuthService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_router__["c" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_router__["c" /* ActivatedRoute */]) === "function" && _c || Object])
], CreateZoneComponent);

var _a, _b, _c;
//# sourceMappingURL=create-zone.component.js.map

/***/ }),

/***/ "../../../../../src/app/province-zone-area/zone/list-zone/list-zone.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/province-zone-area/zone/list-zone/list-zone.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n    <div class=\"col-lg-12\">\n        <h3 class=\"page-header\">Zone - List</h3>\n    </div>\n</div><!--/.row-->\n\n<div class=\"row\">\n    <div class=\"col-sm-12\">\n        <div class=\"panel panel-default\">\n            <div class=\"panel-body overflowFix\">\n\n                <div class=\"table-responsive\">\n                    <table class=\"table table-hover table-condensed\">\n                        <thead>\n                        <tr>\n                            <th>First Name</th>\n                            <th>Last Name</th>\n                            <th>Province/Zone</th>\n                            <th>Username</th>\n                            <th>Password</th>\n                            <th>Actions</th>\n                        </tr>\n                        </thead>\n                        <tbody>\n                        <tr *ngFor=\"let zone of zoneList\">\n                            <td>{{ zone.first_name }}</td>\n                            <td>{{ zone.last_name }}</td>\n                            <td>{{ zone.provience_name }}&nbsp;=>&nbsp;{{ zone.zone_name }}</td>\n                            <td>{{ zone.parish_id }}</td>\n                            <td>{{ zone.password}}</td>\n                            <td>\n                                <button\n                                        class=\"btn btn-warning btn-xs\"\n                                        type=\"button\"\n                                        (click)=\"onEdit(zone)\"\n                                >\n                                    <i class=\"fa fa-pencil fa-fw\"></i>\n                                </button>\n                                <button class=\"btn btn-danger btn-xs\" type=\"button\">\n                                    <i class=\"fa fa-trash fa-fw\"></i>\n                                </button>\n                            </td>\n                        </tr>\n                        </tbody>\n                    </table>\n                </div>\n\n            </div>\n        </div>\n    </div>\n</div><!--/.row-->"

/***/ }),

/***/ "../../../../../src/app/province-zone-area/zone/list-zone/list-zone.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__zone_service__ = __webpack_require__("../../../../../src/app/province-zone-area/zone/zone.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListZoneComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ListZoneComponent = (function () {
    function ListZoneComponent(router, zoneService) {
        this.router = router;
        this.zoneService = zoneService;
        this.responseMsg = '';
        this.responseStatus = false;
        this.responseReceived = false;
    }
    ListZoneComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.zoneService.listZone().subscribe(function (response) {
            if (response.json().status) {
                _this.responseStatus = true;
                _this.zoneList = response.json().zones;
            }
            else {
                _this.responseStatus = false;
                _this.zoneList = [];
                _this.responseMsg = response.json().message;
            }
        }, function (error) {
            _this.responseStatus = false;
            _this.responseReceived = true;
            _this.zoneList = [];
            _this.responseMsg = error.json().error;
        });
    };
    ListZoneComponent.prototype.onEdit = function (obj) {
        var zone_id = obj.id;
        this.router.navigate(['zone/edit/', zone_id]);
    };
    return ListZoneComponent;
}());
ListZoneComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-list-zone',
        template: __webpack_require__("../../../../../src/app/province-zone-area/zone/list-zone/list-zone.component.html"),
        styles: [__webpack_require__("../../../../../src/app/province-zone-area/zone/list-zone/list-zone.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__zone_service__["a" /* ZoneService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__zone_service__["a" /* ZoneService */]) === "function" && _b || Object])
], ListZoneComponent);

var _a, _b;
//# sourceMappingURL=list-zone.component.js.map

/***/ }),

/***/ "../../../../../src/app/province-zone-area/zone/zone-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__create_zone_create_zone_component__ = __webpack_require__("../../../../../src/app/province-zone-area/zone/create-zone/create-zone.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__list_zone_list_zone_component__ = __webpack_require__("../../../../../src/app/province-zone-area/zone/list-zone/list-zone.component.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ZoneRoutingModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var provinceRoutes = [
    { path: 'create', component: __WEBPACK_IMPORTED_MODULE_2__create_zone_create_zone_component__["a" /* CreateZoneComponent */], data: { editMode: false } },
    { path: 'list', component: __WEBPACK_IMPORTED_MODULE_3__list_zone_list_zone_component__["a" /* ListZoneComponent */] },
    { path: 'edit/:id', component: __WEBPACK_IMPORTED_MODULE_2__create_zone_create_zone_component__["a" /* CreateZoneComponent */], data: { editMode: true } }
];
var ZoneRoutingModule = (function () {
    function ZoneRoutingModule() {
    }
    return ZoneRoutingModule;
}());
ZoneRoutingModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
        imports: [__WEBPACK_IMPORTED_MODULE_0__angular_router__["b" /* RouterModule */].forChild(provinceRoutes)],
        exports: [__WEBPACK_IMPORTED_MODULE_0__angular_router__["b" /* RouterModule */]]
    })
], ZoneRoutingModule);

//# sourceMappingURL=zone-routing.module.js.map

/***/ }),

/***/ "../../../../../src/app/province-zone-area/zone/zone.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__create_zone_create_zone_component__ = __webpack_require__("../../../../../src/app/province-zone-area/zone/create-zone/create-zone.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__list_zone_list_zone_component__ = __webpack_require__("../../../../../src/app/province-zone-area/zone/list-zone/list-zone.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__zone_routing_module__ = __webpack_require__("../../../../../src/app/province-zone-area/zone/zone-routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__zone_service__ = __webpack_require__("../../../../../src/app/province-zone-area/zone/zone.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ZoneModule", function() { return ZoneModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var ZoneModule = (function () {
    function ZoneModule() {
    }
    return ZoneModule;
}());
ZoneModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_3__create_zone_create_zone_component__["a" /* CreateZoneComponent */],
            __WEBPACK_IMPORTED_MODULE_4__list_zone_list_zone_component__["a" /* ListZoneComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_common__["CommonModule"],
            __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_5__zone_routing_module__["a" /* ZoneRoutingModule */]
        ],
        providers: [__WEBPACK_IMPORTED_MODULE_6__zone_service__["a" /* ZoneService */]],
        exports: [],
    })
], ZoneModule);

//# sourceMappingURL=zone.module.js.map

/***/ }),

/***/ "../../../../../src/app/province-zone-area/zone/zone.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__auth_auth_service__ = __webpack_require__("../../../../../src/app/auth/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment_prod__ = __webpack_require__("../../../../../src/environments/environment.prod.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ZoneService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ZoneService = (function () {
    function ZoneService(http, authService) {
        this.http = http;
        this.authService = authService;
    }
    /** Get List of all province on edit zone page */
    ZoneService.prototype.listProvince = function () {
        var user_id = this.authService.getToken().user_id;
        var header = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]({
            'X-Requested-With': 'XMLHttpRequest',
            'Authorization': 'Bearer ' + this.authService.getToken().token
        });
        return this.http.get(__WEBPACK_IMPORTED_MODULE_3__environments_environment_prod__["a" /* environment */].API_URL + 'provinces/' + user_id, { headers: header });
    };
    /** Get List of all zones on list zone page */
    ZoneService.prototype.listZone = function () {
        var user_id = this.authService.getToken().user_id;
        var header = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]({
            'X-Requested-With': 'XMLHttpRequest',
            'Authorization': 'Bearer ' + this.authService.getToken().token
        });
        return this.http.get(__WEBPACK_IMPORTED_MODULE_3__environments_environment_prod__["a" /* environment */].API_URL + 'zones/' + user_id, { headers: header });
    };
    /** Fetch specific province data */
    ZoneService.prototype.fetchSpecificZone = function (zone_id) {
        var header = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]({
            'X-Requested-With': 'XMLHttpRequest',
            'Authorization': 'Bearer ' + this.authService.getToken().token
        });
        return this.http.get(__WEBPACK_IMPORTED_MODULE_3__environments_environment_prod__["a" /* environment */].API_URL + 'zones/showDetail/zone/' + zone_id, { headers: header });
    };
    /** Function call for registration */
    ZoneService.prototype.createZone = function (body) {
        var obj = {
            user_id: this.authService.getToken().user_id
        };
        var header = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]({
            'X-Requested-With': 'XMLHttpRequest',
            'Authorization': 'Bearer ' + this.authService.getToken().token
        });
        return this.http.post(__WEBPACK_IMPORTED_MODULE_3__environments_environment_prod__["a" /* environment */].API_URL + 'zones', Object.assign(body, obj), { headers: header });
    };
    /** Create a new province */
    ZoneService.prototype.editZone = function (zone_id, pastor_id, body) {
        var wem_id = this.authService.getToken().user_id;
        var header = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]({
            'X-Requested-With': 'XMLHttpRequest',
            'Authorization': 'Bearer ' + this.authService.getToken().token
        });
        var api_url = __WEBPACK_IMPORTED_MODULE_3__environments_environment_prod__["a" /* environment */].API_URL + 'zones/' + pastor_id + '/' + wem_id + '/' + zone_id;
        return this.http.put(api_url, body, { headers: header });
    };
    return ZoneService;
}());
ZoneService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__auth_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__auth_auth_service__["a" /* AuthService */]) === "function" && _b || Object])
], ZoneService);

var _a, _b;
//# sourceMappingURL=zone.service.js.map

/***/ })

});
//# sourceMappingURL=4.chunk.js.map