webpackJsonp(["parish.module"],{

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

module.exports = "<div class=\"row\">\n    <div class=\"col-lg-12\">\n        <h3 class=\"page-header\">{{ title }}</h3>\n     </div>\n</div><!--/.row-->\n\n<div class=\"row\">\n    <div class=\"col-lg-12\">\n        <div class=\"panel panel-default\">\n            <div class=\"panel-heading\">{{ heading }} Parish</div>\n            <div class=\"panel-body\">\n                <div class=\"row\">\n                    <div class=\"col-lg-12\">\n                        <div *ngIf=\"!responseStatus && responseReceived\" class=\"alert alert-danger\">\n                            <strong>{{ responseMsg }}</strong>\n                        </div>\n                    </div>\n                    <div class=\"col-lg-12\">\n                        <div *ngIf=\"responseStatus && responseReceived\" class=\"alert alert-success\">\n                            <strong>{{ responseMsg }}</strong>\n                        </div>\n                    </div>\n                </div>\n                <form\n                        #createParishForm=\"ngForm\"\n                        (submit)=\"onSubmit(createParishForm)\">\n                    <div class=\"row\">\n                        <div class=\"col-md-4\">\n                            <div class=\"form-group\">\n                                <label>Select Province</label>\n                                <select\n                                        #selectedProvince\n                                        name=\"provience_id\"\n                                        [ngModel]=\"parishData.province_id\"\n                                        class=\"form-control\"\n                                        (change)=\"onSelectProvince(selectedProvince.value)\">\n                                    <option value=\"0\" selected>Choose...</option>\n                                    <option\n                                            *ngFor=\"let province of provinceList\"\n                                            [value]=\"province.id\">\n                                        {{province.province_name}}\n                                    </option>\n                                </select>\n                            </div>\n                        </div>\n                        <div class=\"col-md-4\" *ngIf=\"provinceSelected\">\n                            <div class=\"form-group\">\n                                <label>Select Zone</label>\n                                <select\n                                        #selectedZone\n                                        name=\"zone_id\"\n                                        [ngModel]=\"parishData.zone_id\"\n                                        class=\"form-control\"\n                                        [disabled]=\"!provinceList || !provinceSelected\"\n                                        (change)=\"onSelectZone(selectedZone.value)\">\n                                    <option value=\"0\" selected>Choose...</option>\n                                    <option\n                                            *ngFor=\"let zone of zoneList\"\n                                            [value]=\"zone.id\">\n                                        {{zone.zone_name}}\n                                    </option>\n                                </select>\n                            </div>\n\n                        </div>\n                        <div class=\"col-md-4\" *ngIf=\"provinceSelected && zoneSelected\">\n                            <div class=\"form-group\">\n                                <label>Select Area</label>\n                                <select\n                                        #selectedArea\n                                        name=\"area_id\"\n                                        [ngModel]=\"parishData.area_id\"\n                                        class=\"form-control\"\n                                        [disabled]=\"!provinceList|| !zoneList|| !provinceSelected || !zoneSelected\"\n                                        (change)=\"onSelectArea(selectedArea.value)\">\n                                    <option value=\"0\" selected>Choose...</option>\n                                    <option\n                                            *ngFor=\"let area of areaList\"\n                                            [value]=\"area.id\">\n                                        {{area.area_name}}\n                                    </option>\n                                </select>\n                            </div>\n\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"col-md-6\">\n                            <div class=\"form-group\">\n                                <label for=\"pname\">Parish Name</label>\n                                <input\n                                        id=\"pname\"\n                                        class=\"form-control\"\n                                        placeholder=\"Enter...\"\n                                        [disabled]=\"!provinceList || !provinceSelected || !zoneList || !zoneSelected || !areaList || !areaSelected\"\n                                        name=\"parish_name\"\n                                        required\n                                        [ngModel]=\"parishData.parish_name\"\n                                        #parishName=\"ngModel\">\n                            </div>\n                        </div>\n                        <div class=\"col-md-6\">\n                            <div\n                                    class=\"alert alert-danger\"\n                                    *ngIf=\"parishName.invalid && parishName.touched\">\n                                Parish Name is Required!\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"col-md-6\">\n                            <div class=\"form-group\">\n                                <label for=\"fname\">Pastor's First Name</label>\n                                <input\n                                        id=\"fname\"\n                                        class=\"form-control\"\n                                        placeholder=\"Enter...\"\n                                        [disabled]=\"!provinceList || !provinceSelected || !zoneList || !zoneSelected || !areaList || !areaSelected\"\n                                        name=\"first_name\"\n                                        required\n                                        [ngModel]=\"parishData.first_name\"\n                                        #firstName=\"ngModel\">\n                            </div>\n                        </div>\n                        <div class=\"col-md-6\">\n                            <div\n                                    class=\"alert alert-danger\"\n                                    *ngIf=\"firstName.invalid && firstName.touched\">\n                                First Name is Required!\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"col-md-6\">\n                            <div class=\"form-group\">\n                                <label for=\"lname\">Pastor's Last Name</label>\n                                <input\n                                        id=\"lname\"\n                                        class=\"form-control\"\n                                        placeholder=\"Enter...\"\n                                        [disabled]=\"!provinceList || !provinceSelected || !zoneList || !zoneSelected || !areaList || !areaSelected\"\n                                        name=\"last_name\"\n                                        required\n                                        [ngModel]=\"parishData.last_name\"\n                                        #lastName=\"ngModel\">\n                            </div>\n                        </div>\n                        <div class=\"col-md-6\">\n                            <div\n                                    class=\"alert alert-danger\"\n                                    *ngIf=\"lastName.invalid && lastName.touched\">\n                                Last Name is Required!\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"col-md-6\">\n                            <div class=\"form-group\">\n                                <label> Choose Start Date </label>\n                                <dp-date-picker id=\"start_date\"\n                                                name=\"start_date\"\n                                                #datePicker\n                                                [(ngModel)]=\"parishData.start_date\"\n                                                [mode]=\"'day'\"\n                                                [placeholder]=\"'Pick Date'\"\n                                                [config]=\"config\"\n                                                [theme]=\"'dp-material'\"\n                                                #startDate=\"ngModel\"\n                                                required\n                                >\n                                </dp-date-picker>\n                            </div>\n                        </div>\n                        <div class=\"col-md-6\">\n                            <div\n                                    class=\"alert alert-danger\"\n                                    *ngIf=\"startDate.invalid && startDate.touched\">\n                                Start Date is Required!\n                            </div>\n                        </div>\n                    </div>\n\n\n                    <!-- Stripe Custom Form -->\n\n                    <div class=\"row\" >\n                        <div class=\"col-md-6\">\n                            <div class=\"form-group\">\n                                <div class=\"form-row\">\n                                    <label for=\"card-element\" *ngIf=\"!editMode\">\n                                        Credit or debit card\n                                    </label>\n                                    <div id=\"card-element\">\n                                        <!-- a Stripe Element will be inserted here. -->\n                                    </div>\n\n                                    <!-- Used to display form errors -->\n                                    <div id=\"card-errors\" role=\"alert\" *ngIf=\"!editMode\"></div>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n\n                    <div class=\"row\">\n                        <div class=\"col-md-6\">\n                            <button\n                                    class=\"btn btn-primary\"\n                                    [disabled]=\"!provinceList || !provinceSelected || !zoneList || !zoneSelected || !areaList || !areaSelected || ( createParishForm.invalid && createParishForm.touched ) || !parishData.start_date\">\n                                <i *ngIf=\"showLoader\" class=\"fa fa-spinner fa-pulse fa-lg fa-fw\"></i>\n                                Submit\n                            </button>\n                            <button\n                                    type=\"button\"\n                                    class=\"btn btn-default\"\n                                    (click)=\"onReset(createParishForm)\"\n                            >Reset\n                            </button>\n                        </div>\n                    </div>\n                </form>\n            </div>\n        </div>\n    </div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/province-zone-area-parish/parish/create-parish/create-parish.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CreateParishComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__auth_auth_service__ = __webpack_require__("../../../../../src/app/auth/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__province_zone_area_parish_service__ = __webpack_require__("../../../../../src/app/province-zone-area-parish/province-zone-area-parish.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_moment__ = __webpack_require__("../../../../moment/moment.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_moment__);
///<reference path="../../../../../node_modules/@angular/core/src/metadata/directives.d.ts"/>
/** Component to create and edit Parish */
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
            province_name: '',
            start_date: null
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
        this.config = {
            firstDayOfWeek: 'su',
            format: 'MM-DD-YYYY',
            monthFormat: 'MMM, YYYY',
            disableKeypress: false,
            allowMultiSelect: false,
            closeOnSelect: undefined,
            closeOnSelectDelay: 100,
            onOpenDelay: 0,
            weekDayFormat: 'ddd',
            appendTo: document.body,
            drops: 'down',
            opens: 'right',
            showNearMonthDays: false,
            showWeekNumbers: false,
            enableMonthSelector: true,
            yearFormat: 'YYYY',
            showGoToCurrent: true,
            dayBtnFormat: 'DD',
            monthBtnFormat: 'MMM',
            hours12Format: 'hh',
            hours24Format: 'HH',
            meridiemFormat: 'A',
            minutesFormat: 'mm',
            minutesInterval: 1,
            secondsFormat: 'ss',
            secondsInterval: 1,
            showSeconds: false,
            showTwentyFourHours: false,
            timeSeparator: ':',
            multipleYearsNavigateBy: 10,
            showMultipleYearsNavigation: false,
            locale: 'en'
        };
    }
    CreateParishComponent.prototype.ngOnInit = function () {
        var _this = this;
        /** Checking route params to get present mode */
        this.activatedRoute.data.subscribe(function (data) {
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
                        var tmpDate = __WEBPACK_IMPORTED_MODULE_4_moment__(_this.parishData.start_date);
                        _this.parishData.start_date = tmpDate;
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
        if (!this.editMode) {
            this.stripe = Stripe('pk_test_SIRpnt5y8OAGeLprrzbQKrKd');
            this.elements = this.stripe.elements();
            // Custom styling can be passed to options when creating an Element.
            this.style = {
                base: {
                    // Add your base input styles here. For example:
                    fontSize: '16px',
                    lineHeight: '18px',
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
        }
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
            var start_date = new Date(createParishForm.value.start_date);
            var year = start_date.getFullYear().toString();
            var month = (start_date.getMonth() + 1).toString();
            var day = start_date.getDate().toString();
            var date = year + "-" + month + "-" + day;
            createParishForm.value.start_date = date;
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
            this.stripe.createToken(this.card).then(function (result) {
                if (result.error) {
                    // Inform the user if there was an error
                    var errorElement = document.getElementById('card-errors');
                    errorElement.textContent = result.error.message;
                    _this.showLoader = false;
                }
                else {
                    // Send the token to your server
                    var start_date = new Date(createParishForm.value.start_date);
                    var year = start_date.getFullYear().toString();
                    var month = (start_date.getMonth() + 1).toString();
                    var day = start_date.getDate().toString();
                    var date = year + "-" + month + "-" + day;
                    createParishForm.value.start_date = date;
                    var body = createParishForm.value;
                    _this.pzapService.createParish(__assign({}, body, { token: result.token }))
                        .subscribe(function (response) {
                        _this.showLoader = false;
                        if (response.json().status) {
                            _this.card.clear();
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
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        selector: 'app-create-parish',
        template: __webpack_require__("../../../../../src/app/province-zone-area-parish/parish/create-parish/create-parish.component.html"),
        styles: [__webpack_require__("../../../../../src/app/province-zone-area-parish/parish/create-parish/create-parish.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__province_zone_area_parish_service__["a" /* ProvinceZoneAreaParishService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__province_zone_area_parish_service__["a" /* ProvinceZoneAreaParishService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__auth_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__auth_auth_service__["a" /* AuthService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_router__["a" /* ActivatedRoute */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_0__angular_router__["d" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_router__["d" /* Router */]) === "function" && _d || Object])
], CreateParishComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=create-parish.component.js.map

/***/ }),

/***/ "../../../../../src/app/province-zone-area-parish/parish/list-parish/list-parish.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".alert {\n    position: fixed;\n    top: 8%;\n    left: auto;\n    right:10px;\n    width:auto;\n    font-size: 23px;\n    /*  \ttransform: translate(-50%, -50%);*/\n    text-align: center;\n    padding: 25px;\n    background-color: #f44336;\n    color: white;\n    opacity: 1;\n    transition: opacity 0.6s;\n    z-index: 3;\n    cursor: pointer;\n    border-radius: 5px;\n}\n\n.alert.alert-success {\nbackground-color: #4CAF50;\n}\n\n/*.alert.info {*/\n/*background-color: #2196F3;*/\n/*}*/\n\n.close-btn{\n    margin-left: 15px;\n    color: black;\n    font-weight: bold;\n    float: right;\n    font-size: 23px;\n    position: absolute;\n    top: -6px;\n    right: 6px;\n    cursor: pointer;\n    transition: 0.3s;\n}\n.close-btn:hover{\n    color: red;\n}\n\n.alert-middle {\n    background: rgba(0, 0, 0, 0.7);\n    border-radius: 5px;\n    font-size: 23px;\n    left: 0;\n    right:0;\n    bottom:0;\n    opacity: 1;\n    padding: 25px;\n    position: fixed;\n    right: 10px;\n    text-align: center;\n    top: 0;\n    transition: opacity 0.6s ease 0s;\n    width: auto;\n    z-index: 3;\n}\n\n.alert-middle-main {\n    background:#fff;\n    width: 500px;\n    margin: 0 auto;\n    padding: 15px;\n    color: #000;\n    min-height: 300px;\n    padding-top: 70px;\n    position:fixed;\n    border-radius:4px;\n    top: 50%;\n    left: 50%;\n    margin-top: -150px;\n    margin-left: -250px;\n}\n\n.alert-middle.closebtn{\n    color: #000;\n}\n\n.alert-middle.closebtn:hover {\n    color: #fd7c02;\n}\n.resetfilter {\n    float: right;\n}\n@media screen and (max-width: 991px){\n    .table-responsive{\n        margin-top: 20px;\n    }\n    select{\n        margin-bottom: 10px;\n    }\n    label{\n        margin-top: 10px;\n    }\n}\n\n.input-penalty {\n\n    margin-top: 3px;\n    width: 50px;\n    height: 20px;\n    padding-left: 5px;\n\n\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/province-zone-area-parish/parish/list-parish/list-parish.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n    <div class=\"col-lg-12\">\n        <h3 class=\"page-header\">Parish - List</h3>\n    </div>\n</div><!--/.row-->\n\n<!-- To add due date -->\n<div class=\"row\" *ngIf=\"isWEM\" >\n    <div class=\"col-lg-6\">\n        <button\n                type=\"button\"\n                (click)=\"onAddDueDate()\"\n                *ngIf=\"!selectDate\">Add Due Date\n        </button>\n        <p></p>\n        <div class=\"row\" *ngIf=\"selectDate\">\n            <div class=\"col-md-8\">\n                <div class=\"panel panel-default\">\n                    <div class=\"panel-body\">\n                        <form\n                                #addDueDate=\"ngForm\"\n                                (submit)=\"onSubmit(addDueDate)\"\n                                >\n                            <div class=\"row\">\n                                <div class=\"col-md-6\">\n                                    <div class=\"form-group\">\n                                        <label > Choose Due Date </label>\n                                        <dp-date-picker id=\"due_date\"\n                                                        name=\"due_date\"\n                                                        #datePicker\n                                                        [(ngModel)]=\"formData.due_date\"\n                                                        [mode]=\"'day'\"\n                                                        [placeholder]=\"'Pick Due Date'\"\n                                                        [config]=\"config\"\n                                                        [theme]=\"'dp-material'\"\n                                                        #dueDate=\"ngModel\"\n                                                        required>\n                                        </dp-date-picker>\n                                    </div>\n                                </div>\n                                <div class=\"col-md-6\">\n                                    <div\n                                             class=\"col-md-6\"\n                                             class=\"alert alert-danger\"\n                                             *ngIf=\"dueDate.invalid && dueDate.touched\">\n                                            Due Date is Required!\n                                    </div>\n                                </div>\n                            </div>\n                            <div class=\"row\">\n                                <div class=\"col-md-8\">\n                                    <button\n                                            class=\"btn btn-primary\"\n                                            type=\"submit\"\n                                            [disabled]=\" ( addDueDate.invalid && addDueDate.touched ) || !formData.due_date\">\n                                        <i *ngIf=\"showLoader\" class=\"fa fa-spinner fa-pulse fa-lg fa-fw\"></i>\n                                        Save\n                                    </button>\n                                    <button\n                                            type=\"button\"\n                                            class=\"btn btn-default\"\n                                            (click)=\"onReset(addDueDate)\"\n                                    >Reset\n                                    </button>\n                                    <button\n                                            type=\"button\"\n                                            class=\"btn btn-default\"\n                                            (click)=\"onAddDueDate()\"\n                                    >Cancel\n                                    </button>\n                                </div>\n                            </div>\n                        </form>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n\n<div class=\"row\">\n    <div class=\"col-sm-12\">\n        <div class=\"panel panel-default\">\n            <div class=\"panel-heading\">\n                Parish List\n            </div>\n            <div class=\"panel-body overflowFix\">\n                <div class=\"row\">\n                    <div class=\"col-lg-12\">\n                        <div *ngIf=\"!responseStatus && responseReceived\" class=\"alert alert-danger\">\n                            <strong>{{ responseMsg }}</strong>\n                        </div>\n                    </div>\n\n\n                    <div class=\"col-lg-12\">\n                        <div *ngIf=\"responseStatus && responseReceived\" class=\"alert alert-success\">\n                            <strong> {{ responseMsg }}</strong>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"row\">\n                    <div class=\"col-md-3\">\n                        <p></p>\n                        <button (click)=\"onResetFilters()\">Reset Filter</button>\n                    </div>\n\n                    <div class=\"col-md-3\">\n                        <label>Filter Province:</label>\n                        <select\n                                #selectedProvince\n                                name=\"province_id\"\n                                class=\"form-control\"\n                                [(ngModel)]=\"selectionProvince\"\n                                (change)=\"onSelectProvince(selectedProvince.value)\">\n                            <option value=\"0\" selected>Choose...</option>\n                            <option\n                                    *ngFor=\"let province of provinceList\"\n                                    [value]=\"province.id\">\n                                {{ province.province_name }}\n                            </option>\n                        </select>\n\n                    </div>\n\n                    <div class=\"col-md-3\">\n                        <label>Filter Zone:</label>\n                        <select\n                                #selectedZone\n                                class=\"form-control\"\n                                [(ngModel)]=\"selectionZone\"\n                                (change)=\"onSelectZone(selectedZone.value)\">\n                            <option value=\"0\" selected>Choose...</option>\n                            <option\n                                    *ngFor=\"let zone of zoneList\"\n                                    [value]=\"zone.id\">\n                                {{zone.zone_name}}\n                            </option>\n                        </select>\n                    </div>\n\n                    <div class=\"col-md-3\">\n                        <label>Filter Area:</label>\n                        <select\n                                #selectedArea\n                                class=\"form-control\"\n                                [(ngModel)]=\"selectionArea\"\n                                (change)=\"onSelectArea(selectedArea.value)\">\n                            <option value=\"0\" selected>Choose...</option>\n                            <option\n                                    *ngFor=\"let area of areaList\"\n                                    [value]=\"area.id\">\n                                {{area.area_name}}\n                            </option>\n                        </select>\n                    </div>\n\n                    <div class=\"col-md-3\">\n                        <label>Filter Parish:</label>\n                        <select\n                                #selectedParish\n                                name=\"parish\"\n                                class=\"form-control\"\n                                [(ngModel)]=\"selectionParish\"\n                                (change)=\"onSelectParish(selectedParish.value)\">\n                            <option value=\"2\" selected>All</option>\n                            <option\n                                    [value]=\"1\">\n                               Compliants\n                            </option>\n                            <option\n                                    [value]=\"0\">\n                                Non-Compliants\n                            </option>\n                        </select>\n\n                    </div>\n\n                </div>\n                <div class=\"table-responsive\">\n                    <table class=\"table table-hover table-condensed\">\n                        <thead>\n                        <tr>\n                            <th>Parish ID</th>\n                            <th>Parish Name</th>\n                            <th>First Name</th>\n                            <th>Last Name</th>\n                            <th>Parish / Area / Zone / Province</th>\n                            <th>Username</th>\n                            <th>Password</th>\n                            <th>Penalty</th>\n                            <th>Actions</th>\n                        </tr>\n                        </thead>\n                        <tbody>\n                            <tr *ngFor=\"let parish of parishList\">\n                                <td [ngClass]=\"(parish.payment_status===2)?'danger': ''\">ROI{{ parish.id }}</td>\n                                <td [ngClass]=\"(parish.payment_status===2)?'danger': ''\">{{ parish.parish_name }}</td>\n                                <td [ngClass]=\"(parish.payment_status===2)?'danger': ''\">{{ parish.first_name }}</td>\n                                <td [ngClass]=\"(parish.payment_status===2)?'danger': ''\">{{ parish.last_name }}</td>\n                                <td [ngClass]=\"(parish.payment_status===2)?'danger': ''\">{{ parish.parish_name }} => {{ parish.area_name }} => {{ parish.zone_name }}&nbsp;=> {{ parish.province_name }}\n                                </td>\n                                <td [ngClass]=\"(parish.payment_status===2)?'danger': ''\"> {{ parish.parish_id }}</td>\n                                <td [ngClass]=\"(parish.payment_status===2)?'danger': ''\">{{ parish.password}}</td>\n                                <td [ngClass]=\"(parish.payment_status===2)?'danger': ''\">\n                                    <switch\n                                            [status]=\"(parish.penalty===1)?'true': 'false'\"\n                                            [size]=\"size\"\n                                            (statusChange)=\"onUpdatePenalty(parish)\"\n                                    >\n                                    </switch>\n                                    <div class=\"\" *ngIf=\"parish.penalty===1\">\n                                        <input class=\"input-penalty\" type=\"text\" name=\"percentage\" value=\"{{parish.penalty_percent}}\" [(ngModel)]=\"parish.penalty_percent\">\n                                        <button\n                                                class=\"btn btn-warning btn-xs\"\n                                                type=\"button\"\n                                                (click)=\"onUpdatePenaltyPercentage(parish)\">\n                                            <i class=\"fa fa-pencil-square-o\"></i>\n                                        </button>\n                                    </div>\n\n                                </td>\n\n\n                                <td [ngClass]=\"(parish.payment_status===2)?'danger': ''\">\n                                <td [ngClass]=\"(parish.payment_status===2)?'danger': ''\">\n                                <button\n                                        class=\"btn btn-warning btn-xs\"\n                                        type=\"button\"\n                                        (click)=\"onEdit(parish)\">\n                                    <i class=\"fa fa-pencil fa-fw\"></i>\n                                </button>\n                                <button\n                                        class=\"btn btn-danger btn-xs\"\n                                        type=\"button\"\n                                        (click)=\"showPrompt(parish)\">\n                                    <i class=\"fa fa-trash fa-fw\"></i>\n                                </button>\n                            </td>\n                        </tr>\n                        <tr *ngIf=\"!parishList\">\n                            {{responseNoRecord}}\n                        </tr>\n                        </tbody>\n                    </table>\n                </div>\n\n            </div>\n        </div>\n    </div>\n</div><!--/.row-->\n\n<app-prompt\n        *ngIf=\"showDeletePrompt\"\n        [calledFrom]=\"'Parish'\"\n        [itemInfo]=\"toDeleteParish\"\n></app-prompt>"

/***/ }),

/***/ "../../../../../src/app/province-zone-area-parish/parish/list-parish/list-parish.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListParishComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_moment__ = __webpack_require__("../../../../moment/moment.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__province_zone_area_parish_service__ = __webpack_require__("../../../../../src/app/province-zone-area-parish/province-zone-area-parish.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__auth_auth_service__ = __webpack_require__("../../../../../src/app/auth/auth.service.ts");
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
        this.isWEM = false;
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
        this.parishSelected = false;
        this.selectionParish = 2;
        this.selectDate = false;
        this.showLoader = false;
        this.config = {
            firstDayOfWeek: 'su',
            format: 'YYYY-MM-DD',
            monthFormat: 'MMM, YYYY',
            max: null,
            min: null,
            disableKeypress: false,
            allowMultiSelect: false,
            closeOnSelect: undefined,
            closeOnSelectDelay: 100,
            onOpenDelay: 0,
            weekDayFormat: 'ddd',
            appendTo: document.body,
            drops: 'down',
            opens: 'right',
            showNearMonthDays: false,
            showWeekNumbers: false,
            enableMonthSelector: false,
            yearFormat: 'YYYY',
            showGoToCurrent: true,
            dayBtnFormat: 'DD',
            monthBtnFormat: 'MMM',
            hours12Format: 'hh',
            hours24Format: 'HH',
            meridiemFormat: 'A',
            minutesFormat: 'mm',
            minutesInterval: 1,
            secondsFormat: 'ss',
            secondsInterval: 1,
            showSeconds: false,
            showTwentyFourHours: false,
            timeSeparator: ':',
            multipleYearsNavigateBy: 10,
            showMultipleYearsNavigation: false,
            locale: 'en'
        };
        this.formData = {
            due_date: null
        };
        this.size = "mini";
    }
    ListParishComponent.prototype.ngOnInit = function () {
        var _this = this;
        var user = this.authService.getToken().user_type;
        if (user == 1) {
            this.isWEM = true;
        }
        /** Subscribe to event to refresh parish list */
        this.refreshParishListSubscription = this.pzapService.refreshList
            .subscribe(function (body) {
            var user_type = _this.authService.getToken().user_type;
            _this.pzapService.filterParish(body).subscribe(function (response) {
                _this.responseStatus = response.json().status;
                if (response.json().status) {
                    _this.parishList = response.json().parishes;
                    var date = new Date();
                    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
                    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
                    var year = firstDay.getFullYear().toString();
                    var month = (firstDay.getMonth() + 1).toString();
                    var day = firstDay.getDate().toString();
                    var minDate1 = year + "-" + month + "-" + day;
                    var year = lastDay.getFullYear().toString();
                    var month = (lastDay.getMonth() + 1).toString();
                    var day = lastDay.getDate().toString();
                    var maxDate1 = year + "-" + month + "-" + day;
                    _this.config.min = __WEBPACK_IMPORTED_MODULE_2_moment__(minDate1);
                    _this.config.max = __WEBPACK_IMPORTED_MODULE_2_moment__(maxDate1);
                    _this.formData.due_date = response.json().due_date;
                    _this.responseNoRecord = response.json().noData;
                }
                else {
                    _this.parishList = [];
                    _this.selectionProvince = null;
                    _this.selectionZone = null;
                    _this.selectionParish = null;
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
        this.selectionParish = 2;
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
            if (this.selectionParish < 2) {
                this.pzapService.refreshList.next({ compliance: this.selectionParish, province_id: id });
            }
            else {
                this.pzapService.refreshList.next({ province_id: id });
            }
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
                        _this.selectionParish = 2;
                        _this.selectionArea = 0;
                    }
                }
                else {
                    _this.zoneList = [];
                    _this.areaList = [];
                    _this.responseMsg = response.json().message;
                    _this.selectionZone = 0;
                    _this.selectionParish = 2;
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
            this.selectionParish = 2;
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
            if (this.selectionParish < 2) {
                this.pzapService.refreshList.next({ compliance: this.selectionParish, zone_id: id });
            }
            else {
                this.pzapService.refreshList.next({ zone_id: id });
            }
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
            this.selectionParish = 2;
            this.provID = id;
            this.pzapService.refreshList.next({});
        }
    };
    /** Function call on selection of area from filters */
    ListParishComponent.prototype.onSelectArea = function (id) {
        var _this = this;
        if (id > 0) {
            this.areaSelected = true;
            if (this.selectionParish < 2) {
                this.pzapService.refreshList.next({ compliance: this.selectionParish, area_id: id });
            }
            else {
                this.pzapService.refreshList.next({ area_id: id });
            }
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
                _this.selectionParish = 2;
            });
        }
        else {
            this.areaSelected = false;
            this.pzapService.refreshList.next({ zone_id: this.zoneID });
        }
    };
    /** Function call on selection of compliant parish  from filters */
    ListParishComponent.prototype.onSelectParish = function (id) {
        if (id < 2) {
            this.parishSelected = true;
            this.pzapService.refreshList.next({ compliance: id, province_id: this.selectionProvince, area_id: this.selectionArea, zone_id: this.selectionZone });
        }
        else {
            this.parishSelected = false;
            this.pzapService.refreshList.next({ province_id: this.selectionProvince, area_id: this.selectionArea, zone_id: this.selectionZone });
        }
    };
    /** Function call for adding due date  */
    ListParishComponent.prototype.onAddDueDate = function () {
        if (this.selectDate) {
            this.selectDate = false;
            this.pzapService.refreshList.next({});
        }
        else {
            this.selectDate = true;
        }
    };
    /** On submission of due date for the month */
    ListParishComponent.prototype.onSubmit = function (addDueDate) {
        var _this = this;
        this.selectDate = true;
        this.showLoader = true;
        var due_date = new Date(addDueDate.value.due_date);
        var year = due_date.getFullYear().toString();
        var month = (due_date.getMonth() + 1).toString();
        var day = due_date.getDate().toString();
        var date = year + "-" + month + "-" + day;
        addDueDate.value.due_date = date;
        this.pzapService.addDueDate(addDueDate.value)
            .subscribe(function (response) {
            _this.showLoader = false;
            _this.responseStatus = response.json().status;
            if (response.json().status) {
                _this.responseMsg = response.json().message;
                _this.selectDate = false;
                _this.pzapService.updatePayment()
                    .subscribe(function (response) {
                    _this.showLoader = false;
                    _this.responseStatus = response.json().status;
                    if (response.json().status) {
                        _this.selectDate = false;
                        _this.pzapService.refreshList.next({});
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
                _this.pzapService.refreshList.next({});
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
            // this.responseReceived = true;
            // setTimeout( () => {
            // 	this.responseReceived = false;
            // }, 3000 )
        });
    };
    /** Function call to reset form */
    ListParishComponent.prototype.onReset = function (addDueDate) {
        var _this = this;
        if (!this.selectDate) {
            this.pzapService.addDueDate(addDueDate.value)
                .subscribe(function (response) {
                _this.selectDate = true;
            }, function (error) {
                if (error.status === 401) {
                    _this.authService.removeToken();
                    _this.router.navigate(['/login']);
                }
            });
        }
        else {
            addDueDate.form.patchValue({
                due_date: this.formData.due_date
            });
            addDueDate.reset();
        }
    };
    /** Function to update penalty */
    ListParishComponent.prototype.onUpdatePenalty = function (parishDetails) {
        var _this = this;
        this.pzapService.updatePenalty(parishDetails)
            .subscribe(function (response) {
            _this.showLoader = false;
            _this.responseStatus = response.json().status;
            if (response.json().status) {
                _this.responseMsg = response.json().message;
                _this.pzapService.refreshList.next({});
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
    /** Function to update penalty */
    ListParishComponent.prototype.onUpdatePenaltyPercentage = function (parishDetails) {
        var _this = this;
        this.pzapService.updatePenaltyPercentage(parishDetails)
            .subscribe(function (response) {
            _this.showLoader = false;
            _this.responseStatus = response.json().status;
            if (response.json().status) {
                _this.responseMsg = response.json().message;
                console.log(response.json());
                _this.pzapService.refreshList.next({});
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
    /** Un-subscribing from all custom made events when component is destroyed */
    ListParishComponent.prototype.ngOnDestroy = function () {
        this.refreshParishListSubscription.unsubscribe();
        this.closePromptEventSubscription.unsubscribe();
        this.deleteParishEventSubscription.unsubscribe();
    };
    return ListParishComponent;
}());
ListParishComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-list-parish',
        template: __webpack_require__("../../../../../src/app/province-zone-area-parish/parish/list-parish/list-parish.component.html"),
        styles: [__webpack_require__("../../../../../src/app/province-zone-area-parish/parish/list-parish/list-parish.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["d" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["d" /* Router */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__province_zone_area_parish_service__["a" /* ProvinceZoneAreaParishService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__province_zone_area_parish_service__["a" /* ProvinceZoneAreaParishService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__auth_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__auth_auth_service__["a" /* AuthService */]) === "function" && _c || Object])
], ListParishComponent);

var _a, _b, _c;
//# sourceMappingURL=list-parish.component.js.map

/***/ }),

/***/ "../../../../../src/app/province-zone-area-parish/parish/parish-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ParishRoutingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__create_parish_create_parish_component__ = __webpack_require__("../../../../../src/app/province-zone-area-parish/parish/create-parish/create-parish.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__list_parish_list_parish_component__ = __webpack_require__("../../../../../src/app/province-zone-area-parish/parish/list-parish/list-parish.component.ts");
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
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["e" /* RouterModule */].forChild(parishPoutes)],
        exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["e" /* RouterModule */]]
    })
], ParishRoutingModule);

//# sourceMappingURL=parish-routing.module.js.map

/***/ }),

/***/ "../../../../../src/app/province-zone-area-parish/parish/parish.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ParishModule", function() { return ParishModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_bootstrap_switch__ = __webpack_require__("../../../../angular2-bootstrap-switch/angular2-bootstrap-switch.umd.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_bootstrap_switch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_angular2_bootstrap_switch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__create_parish_create_parish_component__ = __webpack_require__("../../../../../src/app/province-zone-area-parish/parish/create-parish/create-parish.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__list_parish_list_parish_component__ = __webpack_require__("../../../../../src/app/province-zone-area-parish/parish/list-parish/list-parish.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__parish_routing_module__ = __webpack_require__("../../../../../src/app/province-zone-area-parish/parish/parish-routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__shared_shared_module__ = __webpack_require__("../../../../../src/app/shared/shared.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ng2_date_picker__ = __webpack_require__("../../../../ng2-date-picker/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ng2_date_picker___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_ng2_date_picker__);
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
    Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_4__create_parish_create_parish_component__["a" /* CreateParishComponent */],
            __WEBPACK_IMPORTED_MODULE_5__list_parish_list_parish_component__["a" /* ListParishComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_common__["CommonModule"],
            __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormsModule"],
            __WEBPACK_IMPORTED_MODULE_6__parish_routing_module__["a" /* ParishRoutingModule */],
            __WEBPACK_IMPORTED_MODULE_7__shared_shared_module__["a" /* SharedModule */],
            __WEBPACK_IMPORTED_MODULE_8_ng2_date_picker__["DpDatePickerModule"],
            __WEBPACK_IMPORTED_MODULE_3_angular2_bootstrap_switch__["BootstrapSwitchModule"].forRoot(),
        ],
        providers: []
    })
], ParishModule);

//# sourceMappingURL=parish.module.js.map

/***/ }),

/***/ "../../../../angular2-bootstrap-switch/angular2-bootstrap-switch.umd.js":
/***/ (function(module, exports, __webpack_require__) {

(function (global, factory) {
	 true ? factory(exports, __webpack_require__("../../../core/@angular/core.es5.js"), __webpack_require__("../../../common/@angular/common.es5.js")) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', '@angular/common'], factory) :
	(factory((global['angular2-bootstrap-switch'] = {}),global._angular_core,global._angular_common));
}(this, (function (exports,_angular_core,_angular_common) { 'use strict';

var BootstrapSwitchComponent = (function () {
    /**
     * @param {?} el
     * @param {?} renderer
     */
    function BootstrapSwitchComponent(el, renderer) {
        this.el = el;
        this.renderer = renderer;
        // public properties
        this.status = false;
        this.statusChange = new _angular_core.EventEmitter();
        this.onText = 'on';
        this.offText = 'off';
        this.onColor = 'bootstrap-switch-info';
        this.offColor = 'bootstrap-switch-default';
        this.size = 'normal';
        this.disabled = false;
        this._statusStr = 'false';
        // styles properties
        this._onColor = 'bootstrap-switch-info';
        this._offColor = 'bootstrap-switch-default';
        this._minWidth = 60;
        this._sizeClass = 'bootstrap-switch-normal';
        this._disabledClass = '';
        this._needCalculateWidth = false;
        this._calculateSize();
    }
    /**
     * @return {?}
     */
    BootstrapSwitchComponent.prototype.toggleStatus = function () {
        if (!this.disabled) {
            this.status = !this.status;
            this._statusStr = this.status.toString();
            this.statusChange.emit(this.status);
        }
    };
    /**
     * @param {?} disabled
     * @return {?}
     */
    BootstrapSwitchComponent.prototype._setDisabled = function (disabled) {
        if (disabled) {
            this._disabledClass = 'bootstrap-switch-disabled';
        }
        else {
            this._disabledClass = '';
        }
    };
    /**
     * @param {?} switchLabel
     * @param {?} value
     * @return {?}
     */
    BootstrapSwitchComponent.prototype._setColor = function (switchLabel, value) {
        var /** @type {?} */ color = '';
        var /** @type {?} */ defaultColor = 'bootstrap-switch-info';
        if (switchLabel === 'off') {
            defaultColor = 'bootstrap-switch-default';
        }
        switch (value) {
            case 'default':
                color = defaultColor;
                break;
            case 'blue':
                color = 'bootstrap-switch-primary';
                break;
            case 'sky-blue':
                color = 'bootstrap-switch-info';
                break;
            case 'red':
                color = 'bootstrap-switch-danger';
                break;
            case 'yellow':
                color = 'bootstrap-switch-warning';
                break;
            case 'green':
                color = 'bootstrap-switch-success';
                break;
            case 'gray':
                color = 'bootstrap-switch-default';
                break;
        }
        if (switchLabel === 'off') {
            this._offColor = color;
        }
        else {
            this._onColor = color;
        }
    };
    /**
     * @return {?}
     */
    BootstrapSwitchComponent.prototype._calculateWidth = function () {
        if (this._onSpan) {
            this.renderer.setElementStyle(this._onSpan.nativeElement, 'width', '');
            this.renderer.setElementStyle(this._midSpan.nativeElement, 'width', '');
            this.renderer.setElementStyle(this._offSpan.nativeElement, 'width', '');
            this.renderer.setElementStyle(this._main.nativeElement, "width", "");
            var /** @type {?} */ width = Math.max(this._onSpan.nativeElement.clientWidth, this._offSpan.nativeElement.clientWidth, this._minWidth);
            this.renderer.setElementStyle(this._onSpan.nativeElement, 'width', width.toString() + 'px');
            this.renderer.setElementStyle(this._midSpan.nativeElement, 'width', (width - 10).toString() + 'px');
            this.renderer.setElementStyle(this._offSpan.nativeElement, 'width', width.toString() + 'px');
            this.renderer.setElementStyle(this._container.nativeElement, 'width', (width * 3).toString() + 'px');
            this.renderer.setElementStyle(this._main.nativeElement, 'width', (width * 2).toString() + 'px');
        }
    };
    /**
     * @return {?}
     */
    BootstrapSwitchComponent.prototype._calculateSize = function () {
        switch (this.size) {
            case 'mini':
                this._sizeClass = 'bootstrap-switch-mini';
                this._minWidth = 25;
                break;
            case 'small':
                this._sizeClass = 'bootstrap-switch-small';
                this._minWidth = 30;
                break;
            case 'normal':
                this._sizeClass = 'bootstrap-switch-normal';
                this._minWidth = 60;
                break;
            case 'large':
                this._sizeClass = 'bootstrap-switch-large';
                this._minWidth = 80;
                break;
        }
        this._needCalculateWidth = true;
    };
    /**
     * @return {?}
     */
    BootstrapSwitchComponent.prototype.ngAfterViewChecked = function () {
        if (this._needCalculateWidth) {
            this._calculateWidth();
            this._needCalculateWidth = false;
        }
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    BootstrapSwitchComponent.prototype.ngOnChanges = function (changes) {
        var /** @type {?} */ log = [];
        for (var /** @type {?} */ propName in changes) {
            if (changes.hasOwnProperty(propName)) {
                var /** @type {?} */ changedProp = changes[propName];
                var /** @type {?} */ from = changedProp.previousValue;
                var /** @type {?} */ value = changedProp.currentValue;
                switch (propName) {
                    case 'onText':
                        this._needCalculateWidth = true;
                        break;
                    case 'offText':
                        this._needCalculateWidth = true;
                        break;
                    case 'onColor':
                        this._setColor('on', value);
                        break;
                    case 'offColor':
                        this._setColor('off', value);
                        break;
                    case 'status':
                        this._statusStr = value.toString();
                        break;
                    case 'size':
                        this._calculateSize();
                        break;
                    case 'disabled':
                        this._setDisabled(value);
                        break;
                }
            }
        }
    };
    /**
     * @return {?}
     */
    BootstrapSwitchComponent.prototype.ngAfterViewInit = function () {
        // this._calculateSize('normal');
        // this._calculateWidth();
    };
    return BootstrapSwitchComponent;
}());
BootstrapSwitchComponent.decorators = [
    { type: _angular_core.Component, args: [{
                encapsulation: _angular_core.ViewEncapsulation.None,
                selector: 'switch',
                template: "<div #main class=\"bootstrap-switch bootstrap-switch-wrapper bootstrap-switch-animate bootstrap-switch-off\" [ngClass]=\"_sizeClass + ' ' + _disabledClass\" (click)=\"toggleStatus()\">\n\t<div #container class=\"bootstrap-switch-container\"  [@statusChange]=\"_statusStr\" >\n        <span #on class=\"bootstrap-switch-handle-on\" [ngClass]=\"_onColor\" [ngStyle]=\"{'min-width': _minWidth +'px'}\">{{onText}}</span>\n        <span #mid class=\"bootstrap-switch-label\"></span>\n        <span #off class=\"bootstrap-switch-handle-off \" [ngClass]=\"_offColor\">{{offText}}</span>\n    </div>\n</div>\n",
                styles: ["/* ========================================================================\n  * bootstrap-switch - v3.3.2\n  * http://www.bootstrap-switch.org\n  * ========================================================================\n  * Copyright 2012-2013 Mattia Larentis\n  *\n  * ========================================================================\n  * Licensed under the Apache License, Version 2.0 (the \"License\");\n  * you may not use this file except in compliance with the License.\n  * You may obtain a copy of the License at\n  *\n  *     http://www.apache.org/licenses/LICENSE-2.0\n  *\n  * Unless required by applicable law or agreed to in writing, software\n  * distributed under the License is distributed on an \"AS IS\" BASIS,\n  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n  * See the License for the specific language governing permissions and\n  * limitations under the License.\n  * ========================================================================\n  */\n\n .bootstrap-switch {\n   display: inline-block;\n   direction: ltr;\n   cursor: pointer;\n   border-radius: 4px;\n   border: 1px solid;\n   border-color: #cccccc;\n   position: relative;\n   text-align: left;\n   overflow: hidden;\n   line-height: 8px;\n   z-index: 0;\n   -webkit-user-select: none;\n   -moz-user-select: none;\n   -ms-user-select: none;\n   user-select: none;\n   vertical-align: middle;\n   -webkit-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;\n   transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;\n }\n .bootstrap-switch .bootstrap-switch-container {\n   display: inline-block;\n   top: 0;\n   border-radius: 4px;\n   -webkit-transform: translate3d(0, 0, 0);\n   transform: translate3d(0, 0, 0);\n   background: #fff;\n }\n .bootstrap-switch .bootstrap-switch-handle-on,\n .bootstrap-switch .bootstrap-switch-handle-off,\n .bootstrap-switch .bootstrap-switch-label {\n   -webkit-box-sizing: border-box;\n   -moz-box-sizing: border-box;\n   box-sizing: border-box;\n   cursor: pointer;\n   display: inline-block !important;\n   height: 100%;\n   padding: 6px 12px;\n   font-size: 14px;\n   line-height: 20px;\n }\n .bootstrap-switch .bootstrap-switch-handle-on,\n .bootstrap-switch .bootstrap-switch-handle-off {\n   text-align: center;\n   z-index: 1;\n   white-space: nowrap;\n }\n .bootstrap-switch .bootstrap-switch-handle-on.bootstrap-switch-primary,\n .bootstrap-switch .bootstrap-switch-handle-off.bootstrap-switch-primary {\n   color: #fff;\n   background: #428bca;\n }\n .bootstrap-switch .bootstrap-switch-handle-on.bootstrap-switch-info,\n .bootstrap-switch .bootstrap-switch-handle-off.bootstrap-switch-info {\n   color: #fff;\n   background: #5bc0de;\n }\n .bootstrap-switch .bootstrap-switch-handle-on.bootstrap-switch-success,\n .bootstrap-switch .bootstrap-switch-handle-off.bootstrap-switch-success {\n   color: #fff;\n   background: #5cb85c;\n }\n .bootstrap-switch .bootstrap-switch-handle-on.bootstrap-switch-warning,\n .bootstrap-switch .bootstrap-switch-handle-off.bootstrap-switch-warning {\n   background: #f0ad4e;\n   color: #fff;\n }\n .bootstrap-switch .bootstrap-switch-handle-on.bootstrap-switch-danger,\n .bootstrap-switch .bootstrap-switch-handle-off.bootstrap-switch-danger {\n   color: #fff;\n   background: #d9534f;\n }\n .bootstrap-switch .bootstrap-switch-handle-on.bootstrap-switch-default,\n .bootstrap-switch .bootstrap-switch-handle-off.bootstrap-switch-default {\n   color: #000;\n   background: #eeeeee;\n }\n .bootstrap-switch .bootstrap-switch-label {\n   text-align: center;\n   margin-top: -1px;\n   margin-bottom: -1px;\n   z-index: 100;\n   color: #333333;\n   background: #ffffff;\n }\n .bootstrap-switch .bootstrap-switch-handle-on {\n   border-bottom-left-radius: 3px;\n   border-top-left-radius: 3px;\n }\n .bootstrap-switch .bootstrap-switch-handle-off {\n   border-bottom-right-radius: 3px;\n   border-top-right-radius: 3px;\n }\n .bootstrap-switch input[type='radio'],\n .bootstrap-switch input[type='checkbox'] {\n   position: absolute !important;\n   top: 0;\n   left: 0;\n   opacity: 0;\n   filter: alpha(opacity=0);\n   z-index: -1;\n }\n .bootstrap-switch input[type='radio'].form-control,\n .bootstrap-switch input[type='checkbox'].form-control {\n   height: auto;\n }\n .bootstrap-switch.bootstrap-switch-mini .bootstrap-switch-handle-on,\n .bootstrap-switch.bootstrap-switch-mini .bootstrap-switch-handle-off,\n .bootstrap-switch.bootstrap-switch-mini .bootstrap-switch-label {\n   padding: 1px 5px;\n   font-size: 12px;\n   line-height: 1.5;\n }\n .bootstrap-switch.bootstrap-switch-small .bootstrap-switch-handle-on,\n .bootstrap-switch.bootstrap-switch-small .bootstrap-switch-handle-off,\n .bootstrap-switch.bootstrap-switch-small .bootstrap-switch-label {\n   padding: 5px 10px;\n   font-size: 12px;\n   line-height: 1.5;\n }\n .bootstrap-switch.bootstrap-switch-large .bootstrap-switch-handle-on,\n .bootstrap-switch.bootstrap-switch-large .bootstrap-switch-handle-off,\n .bootstrap-switch.bootstrap-switch-large .bootstrap-switch-label {\n   padding: 6px 16px;\n   font-size: 18px;\n   line-height: 1.33;\n }\n .bootstrap-switch.bootstrap-switch-disabled,\n .bootstrap-switch.bootstrap-switch-readonly,\n .bootstrap-switch.bootstrap-switch-indeterminate {\n   cursor: default !important;\n }\n .bootstrap-switch.bootstrap-switch-disabled .bootstrap-switch-handle-on,\n .bootstrap-switch.bootstrap-switch-readonly .bootstrap-switch-handle-on,\n .bootstrap-switch.bootstrap-switch-indeterminate .bootstrap-switch-handle-on,\n .bootstrap-switch.bootstrap-switch-disabled .bootstrap-switch-handle-off,\n .bootstrap-switch.bootstrap-switch-readonly .bootstrap-switch-handle-off,\n .bootstrap-switch.bootstrap-switch-indeterminate .bootstrap-switch-handle-off,\n .bootstrap-switch.bootstrap-switch-disabled .bootstrap-switch-label,\n .bootstrap-switch.bootstrap-switch-readonly .bootstrap-switch-label,\n .bootstrap-switch.bootstrap-switch-indeterminate .bootstrap-switch-label {\n   opacity: 0.5;\n   filter: alpha(opacity=50);\n   cursor: default !important;\n }\n .bootstrap-switch.bootstrap-switch-animate .bootstrap-switch-container {\n   -webkit-transition: margin-left 0.5s;\n   transition: margin-left 0.5s;\n }\n .bootstrap-switch.bootstrap-switch-inverse .bootstrap-switch-handle-on {\n   border-bottom-left-radius: 0;\n   border-top-left-radius: 0;\n   border-bottom-right-radius: 3px;\n   border-top-right-radius: 3px;\n }\n .bootstrap-switch.bootstrap-switch-inverse .bootstrap-switch-handle-off {\n   border-bottom-right-radius: 0;\n   border-top-right-radius: 0;\n   border-bottom-left-radius: 3px;\n   border-top-left-radius: 3px;\n }\n .bootstrap-switch.bootstrap-switch-focused {\n   border-color: #66afe9;\n   outline: 0;\n   -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102, 175, 233, 0.6);\n   box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102, 175, 233, 0.6);\n }\n .bootstrap-switch.bootstrap-switch-on .bootstrap-switch-label,\n .bootstrap-switch.bootstrap-switch-inverse.bootstrap-switch-off .bootstrap-switch-label {\n   border-bottom-right-radius: 3px;\n   border-top-right-radius: 3px;\n }\n .bootstrap-switch.bootstrap-switch-off .bootstrap-switch-label,\n .bootstrap-switch.bootstrap-switch-inverse.bootstrap-switch-on .bootstrap-switch-label {\n   border-bottom-left-radius: 3px;\n   border-top-left-radius: 3px;\n }"],
                animations: [
                    _angular_core.trigger('statusChange', [
                        _angular_core.state('false', _angular_core.style({ transform: 'translateX(-33.333%)' })),
                        _angular_core.state('true', _angular_core.style({ transform: 'translateX(0)' })),
                        _angular_core.transition('true <=> false', _angular_core.animate('200ms'))
                    ])
                ]
            },] },
];
/**
 * @nocollapse
 */
BootstrapSwitchComponent.ctorParameters = function () { return [
    { type: _angular_core.ElementRef, },
    { type: _angular_core.Renderer, },
]; };
BootstrapSwitchComponent.propDecorators = {
    '_onSpan': [{ type: _angular_core.ViewChild, args: ['on',] },],
    '_offSpan': [{ type: _angular_core.ViewChild, args: ['off',] },],
    '_midSpan': [{ type: _angular_core.ViewChild, args: ['mid',] },],
    '_container': [{ type: _angular_core.ViewChild, args: ['container',] },],
    '_main': [{ type: _angular_core.ViewChild, args: ['main',] },],
    'status': [{ type: _angular_core.Input },],
    'statusChange': [{ type: _angular_core.Output },],
    'onText': [{ type: _angular_core.Input },],
    'offText': [{ type: _angular_core.Input },],
    'onColor': [{ type: _angular_core.Input },],
    'offColor': [{ type: _angular_core.Input },],
    'size': [{ type: _angular_core.Input },],
    'disabled': [{ type: _angular_core.Input },],
};

var BootstrapSwitchModule = (function () {
    function BootstrapSwitchModule() {
    }
    /**
     * @return {?}
     */
    BootstrapSwitchModule.forRoot = function () {
        return {
            ngModule: BootstrapSwitchModule,
            providers: []
        };
    };
    return BootstrapSwitchModule;
}());
BootstrapSwitchModule.decorators = [
    { type: _angular_core.NgModule, args: [{
                imports: [
                    _angular_common.CommonModule
                ],
                declarations: [
                    BootstrapSwitchComponent,
                ],
                exports: [
                    BootstrapSwitchComponent,
                ]
            },] },
];
/**
 * @nocollapse
 */
BootstrapSwitchModule.ctorParameters = function () { return []; };

exports.BootstrapSwitchModule = BootstrapSwitchModule;
exports.BootstrapSwitchComponent = BootstrapSwitchComponent;

Object.defineProperty(exports, '__esModule', { value: true });

})));


/***/ })

});
//# sourceMappingURL=parish.module.chunk.js.map