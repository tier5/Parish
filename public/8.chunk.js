webpackJsonp([8],{

/***/ "../../../../../src/app/province-zone-area-parish/parish/create-parish/create-parish.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/province-zone-area-parish/parish/create-parish/create-parish.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n    <div class=\"col-lg-12\">\n        <h3 class=\"page-header\">{{ title }}</h3>\n     </div>\n</div><!--/.row-->\n\n<div class=\"row\">\n    <div class=\"col-lg-12\">\n        <div class=\"panel panel-default\">\n            <div class=\"panel-heading\">{{ heading }} Parish</div>\n            <div class=\"panel-body\">\n                <div class=\"row\">\n                    <div class=\"col-lg-12\">\n                        <div *ngIf=\"!responseStatus && responseReceived\" class=\"alert alert-danger\">\n                            <strong>{{ responseMsg }}</strong>\n                        </div>\n                    </div>\n                    <div class=\"col-lg-12\">\n                        <div *ngIf=\"responseStatus && responseReceived\" class=\"alert alert-success\">\n                            <strong>{{ responseMsg }}</strong>\n                        </div>\n                    </div>\n                </div>\n                <form\n                        #createParishForm=\"ngForm\"\n                        (submit)=\"onSubmit(createParishForm)\">\n                    <div class=\"row\">\n                        <div class=\"col-md-4\">\n                            <div class=\"form-group\">\n                                <label>Select Province</label>\n                                <select\n                                        #selectedProvince\n                                        name=\"provience_id\"\n                                        [ngModel]=\"parishData.province_id\"\n                                        class=\"form-control\"\n                                        (change)=\"onSelectProvince(selectedProvince.value)\">\n                                    <option value=\"0\" selected>Choose...</option>\n                                    <option\n                                            *ngFor=\"let province of provinceList\"\n                                            [value]=\"province.id\">\n                                        {{province.province_name}}\n                                    </option>\n                                </select>\n                            </div>\n                        </div>\n                        <div class=\"col-md-4\" *ngIf=\"provinceSelected\">\n                            <div class=\"form-group\">\n                                <label>Select Zone</label>\n                                <select\n                                        #selectedZone\n                                        name=\"zone_id\"\n                                        [ngModel]=\"parishData.zone_id\"\n                                        class=\"form-control\"\n                                        [disabled]=\"!provinceList || !provinceSelected\"\n                                        (change)=\"onSelectZone(selectedZone.value)\">\n                                    <option value=\"0\" selected>Choose...</option>\n                                    <option\n                                            *ngFor=\"let zone of zoneList\"\n                                            [value]=\"zone.id\">\n                                        {{zone.zone_name}}\n                                    </option>\n                                </select>\n                            </div>\n\n                        </div>\n                        <div class=\"col-md-4\" *ngIf=\"provinceSelected && zoneSelected\">\n                            <div class=\"form-group\">\n                                <label>Select Area</label>\n                                <select\n                                        #selectedArea\n                                        name=\"area_id\"\n                                        [ngModel]=\"parishData.area_id\"\n                                        class=\"form-control\"\n                                        [disabled]=\"!provinceList|| !zoneList|| !provinceSelected || !zoneSelected\"\n                                        (change)=\"onSelectArea(selectedArea.value)\">\n                                    <option value=\"0\" selected>Choose...</option>\n                                    <option\n                                            *ngFor=\"let area of areaList\"\n                                            [value]=\"area.id\">\n                                        {{area.area_name}}\n                                    </option>\n                                </select>\n                            </div>\n\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"col-md-6\">\n                            <div class=\"form-group\">\n                                <label for=\"pname\">Parish Name</label>\n                                <input\n                                        id=\"pname\"\n                                        class=\"form-control\"\n                                        placeholder=\"Enter...\"\n                                        [disabled]=\"!provinceList || !provinceSelected || !zoneList || !zoneSelected || !areaList || !areaSelected\"\n                                        name=\"parish_name\"\n                                        required\n                                        [ngModel]=\"parishData.parish_name\"\n                                        #parishName=\"ngModel\">\n                            </div>\n                        </div>\n                        <div class=\"col-md-6\">\n                            <div\n                                    class=\"alert alert-danger\"\n                                    *ngIf=\"parishName.invalid && parishName.touched\">\n                                Parish Name is Required!\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"col-md-6\">\n                            <div class=\"form-group\">\n                                <label for=\"fname\">Pastor's First Name</label>\n                                <input\n                                        id=\"fname\"\n                                        class=\"form-control\"\n                                        placeholder=\"Enter...\"\n                                        [disabled]=\"!provinceList || !provinceSelected || !zoneList || !zoneSelected || !areaList || !areaSelected\"\n                                        name=\"first_name\"\n                                        required\n                                        [ngModel]=\"parishData.first_name\"\n                                        #firstName=\"ngModel\">\n                            </div>\n                        </div>\n                        <div class=\"col-md-6\">\n                            <div\n                                    class=\"alert alert-danger\"\n                                    *ngIf=\"firstName.invalid && firstName.touched\">\n                                First Name is Required!\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"col-md-6\">\n                            <div class=\"form-group\">\n                                <label for=\"lname\">Pastor's Last Name</label>\n                                <input\n                                        id=\"lname\"\n                                        class=\"form-control\"\n                                        placeholder=\"Enter...\"\n                                        [disabled]=\"!provinceList || !provinceSelected || !zoneList || !zoneSelected || !areaList || !areaSelected\"\n                                        name=\"last_name\"\n                                        required\n                                        [ngModel]=\"parishData.last_name\"\n                                        #lastName=\"ngModel\">\n                            </div>\n                        </div>\n                        <div class=\"col-md-6\">\n                            <div\n                                    class=\"alert alert-danger\"\n                                    *ngIf=\"lastName.invalid && lastName.touched\">\n                                Last Name is Required!\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"col-md-6\">\n                            <button\n                                    class=\"btn btn-primary\"\n                                    [disabled]=\"!provinceList || !provinceSelected || !zoneList || !zoneSelected || !areaList || !areaSelected || ( createParishForm.invalid && createParishForm.touched )\">\n                                <i *ngIf=\"showLoader\" class=\"fa fa-spinner fa-pulse fa-lg fa-fw\"></i>\n                                Submit\n                            </button>\n                            <button\n                                    type=\"button\"\n                                    class=\"btn btn-default\"\n                                    (click)=\"onReset(createParishForm)\"\n                            >Reset\n                            </button>\n                        </div>\n                    </div>\n                </form>\n            </div>\n        </div>\n    </div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/province-zone-area-parish/parish/create-parish/create-parish.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__auth_auth_service__ = __webpack_require__("../../../../../src/app/auth/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__province_zone_area_parish_service__ = __webpack_require__("../../../../../src/app/province-zone-area-parish/province-zone-area-parish.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CreateParishComponent; });
///<reference path="../../../../../node_modules/@angular/core/src/metadata/directives.d.ts"/>
/** Component to create and edit Parish */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var CreateParishComponent = (function () {
    /** Injecting services to be used in this component */
    function CreateParishComponent(pzapService, authService, activatedRoute, router) {
        this.pzapService = pzapService;
        this.authService = authService;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this.parishId = 0;
        this.editMode = false;
        this.parishData = {
            id: 0,
            user_id: 0,
            parish_id: 0,
            first_name: '',
            last_name: '',
            password: '',
            zone_id: 0,
            area_id: 0,
            province_id: 0,
            zone_name: '',
            area_name: '',
            parish_name: '',
            province_name: ''
        };
        this.default = {
            province: 0,
            zone: 0,
            area: 0
        };
        this.provinceList = [];
        this.zoneList = [];
        this.areaList = [];
        this.responseReceived = false;
        this.responseMsg = '';
        this.heading = 'Create New';
        this.title = 'Parish - Create';
        this.showLoader = false;
        this.responseStatus = false;
    }
    CreateParishComponent.prototype.ngOnInit = function () {
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
                    _this.areaSelected = true;
                    _this.heading = 'Update';
                    _this.title = 'Parish - Update';
                    /** Checking route params to get id of area to edit */
                    _this.activatedRoute.params.subscribe(function (params) {
                        _this.parishId = params['id'];
                        _this.pzapService.parishToEdit(_this.parishId)
                            .subscribe(function (response) {
                            _this.parishData = response.json().parish;
                            _this.pzapService.filterZone({ province_id: _this.parishData.province_id })
                                .subscribe(function (response) {
                                _this.zoneList = response.json().zones;
                                _this.pzapService.filterArea({ zone_id: _this.parishData.zone_id })
                                    .subscribe(function (response) {
                                    _this.areaList = response.json().areas;
                                });
                            }, function (error) {
                                if (error.status === 401) {
                                    _this.authService.removeToken();
                                    _this.router.navigate(['/login']);
                                }
                            });
                        });
                    }, function (error) {
                        if (error.status === 401) {
                            _this.authService.removeToken();
                            _this.router.navigate(['/login']);
                        }
                    }, function () { });
                }
                else {
                    _this.provinceSelected = false;
                    _this.zoneSelected = false;
                    _this.areaSelected = false;
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
    CreateParishComponent.prototype.onSelectProvince = function (id) {
        var _this = this;
        if (id > 0) {
            this.zoneSelected = false;
            this.areaSelected = false;
            if (id > 0) {
                this.provinceId = id;
                this.provinceSelected = true;
                this.pzapService.filterZone({ province_id: id })
                    .subscribe(function (response) {
                    _this.responseStatus = response.json().status;
                    if (response.json().status) {
                        _this.zoneList = response.json().zones;
                        _this.areaList = [];
                    }
                    else {
                        _this.zoneList = [];
                        _this.areaList = [];
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
                    _this.areaList = [];
                    _this.responseMsg = error.json().error;
                });
            }
            else {
                this.provinceSelected = false;
            }
        }
    };
    /** Function call when zone selected */
    CreateParishComponent.prototype.onSelectZone = function (id) {
        var _this = this;
        if (id > 0) {
            this.areaSelected = false;
            if (id > 0) {
                this.zoneId = id;
                this.zoneSelected = true;
                // const body = {
                // 	provience_id: this.provinceId,
                // 	zone_id: id
                // };
                this.pzapService.filterArea({ zone_id: id })
                    .subscribe(function (response) {
                    _this.responseStatus = response.json().status;
                    if (response.json().status) {
                        _this.areaList = response.json().areas;
                    }
                    else {
                        _this.areaList = [];
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
                this.zoneSelected = false;
            }
        }
    };
    /** Function call when area selected */
    CreateParishComponent.prototype.onSelectArea = function (id) {
        if (id > 0) {
            this.areaSelected = true;
        }
        else {
            this.areaSelected = false;
        }
    };
    /** Function call when form is submitted */
    CreateParishComponent.prototype.onSubmit = function (createParishForm) {
        var _this = this;
        this.showLoader = true;
        if (this.editMode) {
            var area_id = this.parishData.id;
            var pastor_id = this.parishData.user_id;
            this.pzapService.editParish(area_id, pastor_id, createParishForm.value)
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
            this.pzapService.createParish(createParishForm.value)
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
                createParishForm.reset();
                _this.provinceSelected = false;
                _this.zoneSelected = false;
                setTimeout(function () {
                    _this.responseReceived = false;
                }, 3000);
            });
        }
    };
    /** Function call to reset form */
    CreateParishComponent.prototype.onReset = function (createParishForm) {
        var _this = this;
        if (this.editMode) {
            this.pzapService.parishToEdit(this.parishId)
                .subscribe(function (response) {
                _this.provinceSelected = true;
                _this.parishData = response.json().parish;
                _this.onSelectProvince(_this.parishData.province_id);
                _this.onSelectZone(_this.parishData.zone_id);
                _this.zoneSelected = true;
                _this.onSelectArea(_this.parishData.area_id);
                _this.areaSelected = true;
                createParishForm.form.patchValue({
                    first_name: _this.parishData.first_name,
                    last_name: _this.parishData.last_name,
                    province_id: _this.parishData.province_id,
                    zone_id: _this.parishData.zone_id,
                    area_id: _this.parishData.area_id,
                    parish_name: _this.parishData.parish_name
                });
            }, function (error) {
                if (error.status === 401) {
                    _this.authService.removeToken();
                    _this.router.navigate(['/login']);
                }
            });
        }
        else {
            createParishForm.reset();
            this.provinceSelected = false;
            this.zoneSelected = false;
            this.areaSelected = false;
            createParishForm.form.patchValue({
                province_id: 0,
                zone_id: 0,
                area_is: 0
            });
        }
    };
    return CreateParishComponent;
}());
CreateParishComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        selector: 'app-create-parish',
        template: __webpack_require__("../../../../../src/app/province-zone-area-parish/parish/create-parish/create-parish.component.html"),
        styles: [__webpack_require__("../../../../../src/app/province-zone-area-parish/parish/create-parish/create-parish.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__province_zone_area_parish_service__["a" /* ProvinceZoneAreaParishService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__province_zone_area_parish_service__["a" /* ProvinceZoneAreaParishService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__auth_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__auth_auth_service__["a" /* AuthService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_router__["c" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_router__["c" /* ActivatedRoute */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_0__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_router__["b" /* Router */]) === "function" && _d || Object])
], CreateParishComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=create-parish.component.js.map

/***/ }),

/***/ "../../../../../src/app/province-zone-area-parish/parish/list-parish/list-parish.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/province-zone-area-parish/parish/list-parish/list-parish.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n    <div class=\"col-lg-12\">\n        <h3 class=\"page-header\">Parish - List</h3>\n    </div>\n</div><!--/.row-->\n\n<div class=\"row\">\n    <div class=\"col-sm-12\">\n        <div class=\"panel panel-default\">\n            <div class=\"panel-heading\">\n                Parish List\n            </div>\n            <div class=\"panel-body overflowFix\">\n                <div class=\"row\">\n                    <div class=\"col-lg-12\">\n                        <div *ngIf=\"!responseStatus && responseReceived\" class=\"alert alert-danger\">\n                            <strong>{{ responseMsg }}</strong>\n                        </div>\n                    </div>\n                    <div class=\"col-lg-12\">\n                        <div *ngIf=\"responseStatus && responseReceived\" class=\"alert alert-success\">\n                            <strong>{{ responseMsg }}</strong>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"row\">\n                    <div class=\"col-md-3\">\n                        <p></p>\n                        <button (click)=\"onResetFilters()\">Reset Filter</button>\n                    </div>\n\n                    <div class=\"col-md-3\">\n                        <label>Filter Province:</label>\n                        <select\n                                #selectedProvince\n                                name=\"province_id\"\n                                class=\"form-control\"\n                                [(ngModel)]=\"selectionProvince\"\n                                (change)=\"onSelectProvince(selectedProvince.value)\">\n                            <option value=\"0\" selected>Choose...</option>\n                            <option\n                                    *ngFor=\"let province of provinceList\"\n                                    [value]=\"province.id\">\n                                {{ province.province_name }}\n                            </option>\n                        </select>\n\n                    </div>\n\n                    <div class=\"col-md-3\">\n                        <label>Filter Zone:</label>\n                        <select\n                                #selectedZone\n                                class=\"form-control\"\n                                [(ngModel)]=\"selectionZone\"\n                                (change)=\"onSelectZone(selectedZone.value)\">\n                            <option value=\"0\" selected>Choose...</option>\n                            <option\n                                    *ngFor=\"let zone of zoneList\"\n                                    [value]=\"zone.id\">\n                                {{zone.zone_name}}\n                            </option>\n                        </select>\n                    </div>\n\n                    <div class=\"col-md-3\">\n                        <label>Filter Area:</label>\n                        <select\n                                #selectedArea\n                                class=\"form-control\"\n                                [(ngModel)]=\"selectionArea\"\n                                (change)=\"onSelectArea(selectedArea.value)\">\n                            <option value=\"0\" selected>Choose...</option>\n                            <option\n                                    *ngFor=\"let area of areaList\"\n                                    [value]=\"area.id\">\n                                {{area.area_name}}\n                            </option>\n                        </select>\n                    </div>\n\n                </div>\n                <div class=\"table-responsive\">\n                    <table class=\"table table-hover table-condensed\">\n                        <thead>\n                        <tr>\n                            <th>Parish Name</th>\n                            <th>First Name</th>\n                            <th>Last Name</th>\n                            <th>Province/Zone/Area</th>\n                            <th>Username</th>\n                            <th>Password</th>\n                            <th>Actions</th>\n                        </tr>\n                        </thead>\n                        <tbody>\n                            <tr *ngFor=\"let parish of parishList\">\n                                <td>{{ parish.parish_name }}</td>\n                                <td>{{ parish.first_name }}</td>\n                                <td>{{ parish.last_name }}</td>\n                                <td>{{ parish.province_name }}&nbsp;=>&nbsp;{{ parish.zone_name }}&nbsp;=>&nbsp;{{\n                                    parish.area_name }}\n                                </td>\n                                <td>{{ parish.parish_id }}</td>\n                                <td>{{ parish.password}}</td>\n                                <td>\n                                <button\n                                        class=\"btn btn-warning btn-xs\"\n                                        type=\"button\"\n                                        (click)=\"onEdit(parish)\">\n                                    <i class=\"fa fa-pencil fa-fw\"></i>\n                                </button>\n                                <button\n                                        class=\"btn btn-danger btn-xs\"\n                                        type=\"button\"\n                                        (click)=\"showPrompt(parish)\">\n                                    <i class=\"fa fa-trash fa-fw\"></i>\n                                </button>\n                            </td>\n                        </tr>\n                        <tr *ngIf=\"!parishList\">\n                            {{responseNoRecord}}\n                        </tr>\n                        </tbody>\n                    </table>\n                </div>\n\n            </div>\n        </div>\n    </div>\n</div><!--/.row-->\n\n<app-prompt\n        *ngIf=\"showDeletePrompt\"\n        [calledFrom]=\"'Parish'\"\n        [itemInfo]=\"toDeleteParish\"\n></app-prompt>"

/***/ }),

/***/ "../../../../../src/app/province-zone-area-parish/parish/list-parish/list-parish.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__province_zone_area_parish_service__ = __webpack_require__("../../../../../src/app/province-zone-area-parish/province-zone-area-parish.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__auth_auth_service__ = __webpack_require__("../../../../../src/app/auth/auth.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListParishComponent; });
/** Component to list and filter Parish */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ListParishComponent = (function () {
    /** Injecting services to be used in this component */
    function ListParishComponent(router, pzapService, authService) {
        this.router = router;
        this.pzapService = pzapService;
        this.authService = authService;
        this.responseMsg = '';
        this.responseNoRecord = '';
        this.responseStatus = false;
        this.responseReceived = false;
        this.showDeletePrompt = false;
        this.zoneSelected = false;
        this.areaSelected = false;
        this.provinceSelected = false;
        this.selectionProvince = 0;
        this.selectionZone = 0;
        this.selectionArea = 0;
    }
    ListParishComponent.prototype.ngOnInit = function () {
        var _this = this;
        /** Subscribe to event to refresh parish list */
        this.refreshParishListSubscription = this.pzapService.refreshList
            .subscribe(function (body) {
            _this.pzapService.filterParish(body).subscribe(function (response) {
                _this.responseStatus = response.json().status;
                if (response.json().status) {
                    _this.parishList = response.json().parishes;
                    _this.responseNoRecord = response.json().noData;
                }
                else {
                    _this.parishList = [];
                    _this.selectionProvince = null;
                    _this.selectionZone = null;
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
                _this.parishList = [];
                _this.responseMsg = error.json().error;
            });
        });
        /** Emitting event which will refresh the parish list */
        this.pzapService.refreshList.next({});
        /** Subscribe to event to close the delete prompt */
        this.closePromptEventSubscription = this.pzapService.closePromptEvent
            .subscribe(function () {
            _this.showDeletePrompt = false;
        });
        /** Subscribe to event to delete an parish */
        this.deleteParishEventSubscription = this.pzapService.deleteEvent
            .subscribe(function (id) {
            _this.showDeletePrompt = false;
            _this.pzapService.deleteParish(id).subscribe(function (response) {
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
        /** Service call to get list of all available zones */
        this.pzapService.filterZone({})
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
        /** Service call to get list of all available areas */
        this.pzapService.filterArea({})
            .subscribe(function (response) {
            _this.responseStatus = response.json().status;
            if (response.json().status) {
                _this.areaList = response.json().areas;
            }
            else {
                _this.areaList = [];
                _this.responseMsg = response.json().message;
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
    };
    /** Function to reset all filter value and reset list */
    ListParishComponent.prototype.onResetFilters = function () {
        this.selectionProvince = null;
        this.selectionZone = null;
        this.selectionArea = null;
        this.pzapService.refreshList.next({});
    };
    /** Function call on update button click */
    ListParishComponent.prototype.onEdit = function (obj) {
        var parish_id = obj.id;
        this.router.navigate(['parish/edit/', parish_id]);
    };
    /** Function call to show delete prompt */
    ListParishComponent.prototype.showPrompt = function (obj) {
        this.showDeletePrompt = true;
        this.toDeleteParish = obj;
    };
    /** Function call on selection of province from filters */
    ListParishComponent.prototype.onSelectProvince = function (id) {
        var _this = this;
        if (id > 0) {
            this.provID = id;
            this.pzapService.refreshList.next({ province_id: id });
            this.pzapService.filterZone({ province_id: id })
                .subscribe(function (response) {
                _this.responseStatus = response.json().status;
                if (response.json().status) {
                    if (response.json().zones != undefined) {
                        _this.zoneList = response.json().zones;
                        _this.selectionArea = null;
                        if (_this.zoneList != undefined && _this.zoneList.length == 1) {
                            _this.selectionZone = _this.zoneList[0]['id'];
                            _this.onSelectZone(_this.zoneList[0]['id']);
                        }
                        else {
                            _this.selectionZone = 0;
                            _this.pzapService.filterArea({ province_id: id })
                                .subscribe(function (response) {
                                _this.responseStatus = response.json().status;
                                if (response.json().status) {
                                    if (response.json().areas != undefined) {
                                        _this.areaList = response.json().areas;
                                        _this.selectionArea = 0;
                                    }
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
                                _this.responseReceived = true;
                                _this.zoneList = [];
                                _this.areaList = [];
                            });
                        }
                    }
                    else {
                        _this.responseStatus = false;
                        _this.zoneList = [];
                        _this.areaList = [];
                        _this.responseMsg = response.json().message;
                        _this.selectionZone = 0;
                        _this.selectionArea = 0;
                    }
                }
                else {
                    _this.zoneList = [];
                    _this.areaList = [];
                    _this.responseMsg = response.json().message;
                    _this.selectionZone = 0;
                    _this.selectionArea = 0;
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
            this.responseStatus = false;
            this.selectionProvince = null;
            this.selectionZone = null;
            this.selectionArea = null;
            this.provID = id;
            this.pzapService.refreshList.next({});
        }
    };
    /** Function call on selection of zone from filters */
    ListParishComponent.prototype.onSelectZone = function (id) {
        var _this = this;
        if (id > 0) {
            this.zoneSelected = true;
            this.zoneID = id;
            this.pzapService.refreshList.next({ zone_id: id });
            this.pzapService.filterArea({ zone_id: id })
                .subscribe(function (response) {
                _this.responseStatus = response.json().status;
                if (response.json().status) {
                    _this.areaList = response.json().areas;
                    _this.selectionArea = null;
                    if (_this.areaList != undefined && _this.areaList.length == 1) {
                        _this.selectionArea = _this.areaList[0]['id'];
                        _this.selectionProvince = _this.areaList[0]['province_id'];
                    }
                    else {
                        if (_this.areaList != undefined) {
                            _this.selectionProvince = _this.areaList[0]['province_id'];
                        }
                        _this.selectionArea = null;
                    }
                }
                else {
                    _this.selectionArea = null;
                    _this.areaList = [];
                    _this.responseMsg = response.json().message;
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
        }
        else {
            this.responseStatus = false;
            this.selectionProvince = 0;
            this.selectionZone = 0;
            this.selectionArea = 0;
            this.provID = id;
            this.pzapService.refreshList.next({});
        }
    };
    /** Function call on selection of area from filters */
    ListParishComponent.prototype.onSelectArea = function (id) {
        var _this = this;
        if (id > 0) {
            this.areaSelected = true;
            this.pzapService.refreshList.next({ area_id: id });
            /** get province and area id **/
            this.pzapService.filterParish({ area_id: id }).subscribe(function (response) {
                if (response.json().status) {
                    if (response.json().parishes != undefined) {
                        _this.selectionProvince = response.json().parishes[0]['province_id'];
                        _this.selectionZone = response.json().parishes[0]['zone_id'];
                    }
                }
                else {
                    _this.selectionProvince = null;
                    _this.selectionZone = null;
                }
            }, function (error) {
                if (error.status === 401) {
                    _this.authService.removeToken();
                    _this.router.navigate(['/login']);
                }
                _this.selectionProvince = null;
                _this.selectionZone = null;
            });
        }
        else {
            this.areaSelected = false;
            this.pzapService.refreshList.next({ zone_id: this.zoneID });
        }
    };
    /** Un-subscribing from all custom made events when component is destroyed */
    ListParishComponent.prototype.ngOnDestroy = function () {
        this.refreshParishListSubscription.unsubscribe();
        this.closePromptEventSubscription.unsubscribe();
        this.deleteParishEventSubscription.unsubscribe();
    };
    return ListParishComponent;
}());
ListParishComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-list-parish',
        template: __webpack_require__("../../../../../src/app/province-zone-area-parish/parish/list-parish/list-parish.component.html"),
        styles: [__webpack_require__("../../../../../src/app/province-zone-area-parish/parish/list-parish/list-parish.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__province_zone_area_parish_service__["a" /* ProvinceZoneAreaParishService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__province_zone_area_parish_service__["a" /* ProvinceZoneAreaParishService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__auth_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__auth_auth_service__["a" /* AuthService */]) === "function" && _c || Object])
], ListParishComponent);

var _a, _b, _c;
//# sourceMappingURL=list-parish.component.js.map

/***/ }),

/***/ "../../../../../src/app/province-zone-area-parish/parish/parish-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__create_parish_create_parish_component__ = __webpack_require__("../../../../../src/app/province-zone-area-parish/parish/create-parish/create-parish.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__list_parish_list_parish_component__ = __webpack_require__("../../../../../src/app/province-zone-area-parish/parish/list-parish/list-parish.component.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ParishRoutingModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var parishPoutes = [
    { path: 'create', component: __WEBPACK_IMPORTED_MODULE_2__create_parish_create_parish_component__["a" /* CreateParishComponent */], data: { editMode: false } },
    { path: 'list', component: __WEBPACK_IMPORTED_MODULE_3__list_parish_list_parish_component__["a" /* ListParishComponent */] },
    { path: 'edit/:id', component: __WEBPACK_IMPORTED_MODULE_2__create_parish_create_parish_component__["a" /* CreateParishComponent */], data: { editMode: true } }
];
var ParishRoutingModule = (function () {
    function ParishRoutingModule() {
    }
    return ParishRoutingModule;
}());
ParishRoutingModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* RouterModule */].forChild(parishPoutes)],
        exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* RouterModule */]]
    })
], ParishRoutingModule);

//# sourceMappingURL=parish-routing.module.js.map

/***/ }),

/***/ "../../../../../src/app/province-zone-area-parish/parish/parish.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__create_parish_create_parish_component__ = __webpack_require__("../../../../../src/app/province-zone-area-parish/parish/create-parish/create-parish.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__list_parish_list_parish_component__ = __webpack_require__("../../../../../src/app/province-zone-area-parish/parish/list-parish/list-parish.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__parish_routing_module__ = __webpack_require__("../../../../../src/app/province-zone-area-parish/parish/parish-routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__shared_shared_module__ = __webpack_require__("../../../../../src/app/shared/shared.module.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ParishModule", function() { return ParishModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var ParishModule = (function () {
    function ParishModule() {
    }
    return ParishModule;
}());
ParishModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_3__create_parish_create_parish_component__["a" /* CreateParishComponent */],
            __WEBPACK_IMPORTED_MODULE_4__list_parish_list_parish_component__["a" /* ListParishComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_common__["CommonModule"],
            __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormsModule"],
            __WEBPACK_IMPORTED_MODULE_5__parish_routing_module__["a" /* ParishRoutingModule */],
            __WEBPACK_IMPORTED_MODULE_6__shared_shared_module__["a" /* SharedModule */]
        ],
        providers: []
    })
], ParishModule);

//# sourceMappingURL=parish.module.js.map

/***/ })

});
//# sourceMappingURL=8.chunk.js.map