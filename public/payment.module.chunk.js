webpackJsonp(["payment.module"],{

/***/ "../../../../../src/app/payment-details/list-payment/list-payment.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".progress {\n    margin-bottom: 0;\n}\n.upload_file{\n    display: inline-block;\n    margin-left: 10px;\n    margin-bottom: 10px;\n}\n.resetfilter {\n    float: right;\n}\n\n.alert.alert-success {\n    background-color: #4CAF50;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/payment-details/list-payment/list-payment.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n    <div class=\"col-lg-12\">\n        <h3 class=\"page-header\">Payment - List</h3>\n    </div>\n</div><!--/.row-->\n\n<div class=\"row\">\n    <div class=\"col-sm-12\">\n        <div class=\"panel panel-default\">\n            <div class=\"panel-heading\">\n                List Payment\n                <button (click)=\"onResetFilters()\" class=\"resetfilter btn btn-default\">Reset Filter</button>\n            </div>\n\n            <div class=\"panel-body overflowFix\">\n\n                <!-- Error or Success Message -->\n                <div class=\"row\">\n                    <div class=\"col-lg-12\">\n                        <div *ngIf=\"!responseStatus && responseReceived\" class=\"alert alert-danger\">\n                            <strong>{{ responseMsg }}</strong>\n                        </div>\n                    </div>\n\n                    <div class=\"col-lg-12\">\n                        <div *ngIf=\"responseStatus && responseReceived\" class=\"alert alert-success\">\n                            <strong>{{ responseMsg }}</strong>\n                        </div>\n                    </div>\n                </div>\n\n                <!-- Reset Filter - Month - Year -->\n                <div class=\"row\">\n                    <div class=\"col-md-3\">\n                       <!-- <p></p>\n                        <button (click)=\"onResetFilters()\">Reset Filter</button>-->\n                    </div>\n\n                    <div class=\"col-md-3 col-md-offset-3\">\n                        <label>Filter Month:</label>\n                        <select\n                                #selectedMonth\n                                class=\"form-control\"\n                                [(ngModel)]=\"selectionMonth\"\n                                (change)=\"onSelectMonth(selectedMonth.value)\">\n                            <option value=\"0\" selected>Choose...</option>\n                            <option [value]=\"month.number\" *ngFor=\"let month of months;\">{{ month.name }}</option>\n                        </select>\n                    </div>\n\n                    <div class=\"col-md-3\">\n                        <label>Filter Year:</label>\n                        <select\n                                #selectedYear\n                                class=\"form-control\"\n                                [(ngModel)]=\"selectionYear\"\n                                (change)=\"onSelectYear(selectedYear.value)\">\n                            <option value=\"0\" selected>Choose...</option>\n                            <option\n                                    *ngFor=\"let year of currentYearList\"\n                                    [value]=\"year\">\n                                {{ year }}\n                            </option>\n                        </select>\n                    </div>\n\n                </div>\n\n                <br>\n\n                <!-- Province - Zone - Area - Parish -->\n                <div class=\"row\">\n\n                    <!-- Province -->\n                    <div class=\"col-md-3\" *ngIf=\"isWEM\">\n                        <label>Filter Province:</label>\n                        <select\n                                #selectedProvince\n                                name=\"province_id\"\n                                class=\"form-control\"\n                                [(ngModel)]=\"selectionProvince\"\n                                (change)=\"onSelectProvince(selectedProvince.value)\">\n                            <option value=\"0\" selected>Choose...</option>\n                            <option\n                                    *ngFor=\"let province of provinceList\"\n                                    [value]=\"province.id\">\n                                {{ province.province_name }}\n                            </option>\n                        </select>\n\n                    </div>\n\n                    <!-- Zone -->\n                    <div class=\"col-md-3\" *ngIf=\"isWEM || isProvincePastor\">\n                        <label>Filter Zone:</label>\n                        <select\n                                #selectedZone\n                                class=\"form-control\"\n                                [(ngModel)]=\"selectionZone\"\n                                (change)=\"onSelectZone(selectedZone.value)\">\n                            <option value=\"0\" selected>Choose...</option>\n                            <option\n                                    *ngFor=\"let zone of zoneList\"\n                                    [value]=\"zone.id\">\n                                {{zone.zone_name}}\n                            </option>\n                        </select>\n                    </div>\n\n                    <!-- Area -->\n                    <div class=\"col-md-3\" *ngIf=\"isWEM || isProvincePastor || isZonePastor\">\n                        <label>Filter Area:</label>\n                        <select\n                                #selectedArea\n                                class=\"form-control\"\n                                [(ngModel)]=\"selectionArea\"\n                                (change)=\"onSelectArea(selectedArea.value)\">\n                            <option value=\"0\" selected>Choose...</option>\n                            <option\n                                    *ngFor=\"let area of areaList\"\n                                    [value]=\"area.id\">\n                                {{area.area_name}}\n                            </option>\n                        </select>\n                    </div>\n\n                    <!-- Parish -->\n                    <div class=\"col-md-3\" *ngIf=\"isWEM || isProvincePastor || isZonePastor || isAreaPastor\">\n                        <label>Filter Parish:</label>\n                        <select\n                                #selectedParish\n                                name=\"parish_id\"\n                                class=\"form-control\"\n                                [(ngModel)]=\"selectionParish\"\n                                (change)=\"onSelectParish(selectedParish.value)\">\n                            <option value=\"0\" selected>Choose...</option>\n                            <option\n                                    *ngFor=\"let parish of parishList\"\n                                    [value]=\"parish.id\">\n                                {{ parish.parish_name }}\n                            </option>\n                        </select>\n\n                    </div>\n\n                </div>\n\n                <div class=\"table-responsive\">\n                    <table class=\"table table-hover table-condensed\">\n                        <thead>\n                        <tr>\n                            <th>Parish Id</th>\n                            <th>Province / Zone / Area / Parish</th>\n                            <th>Description</th>\n                            <th>Payment Month / Year</th>\n                            <th>File</th>\n                            <th>Status</th>\n                            <th *ngIf=\"!isProvincePastor && !isZonePastor && !isAreaPastor\">Actions</th>\n                        </tr>\n                        </thead>\n                        <tbody>\n                        <tr *ngFor=\"let payment of paymentDetails\">\n                            <td>ROI{{ payment.parish_id }}</td>\n                            <td>{{ payment.province_name }} / {{ payment.zone_name }} / {{ payment.area_name }} / {{ payment.parish_name }}</td>\n                            <td>{{ payment.payment_description }}</td>\n                            <td>{{ months[payment.upload_month - 1].name }} / {{ payment.upload_year }}</td>\n                            <td>{{ payment.file_name }}</td>\n                            <td>{{ payment.pay_status }}</td>\n                            <td *ngIf=\"!isProvincePastor && !isZonePastor && !isAreaPastor\">\n                                <!-- Appear Only in Admin Section -->\n                                <span *ngIf=\"payment.hold\">\n                                    <button\n                                            class=\"btn btn-success btn-xs\"\n                                            type=\"button\" *ngIf=\"isWEM\" (click)=\"OnChangeStatus(payment,0)\"> Accept\n                                    </button>\n                                    <button\n                                            class=\"btn btn-danger btn-xs\"\n                                            type=\"button\" *ngIf=\"isWEM\" (click)=\"OnChangeStatus(payment,1)\"> Reject\n                                    </button>\n\n                                </span>\n                                <!-- End appear in admin section -->\n                                <button\n                                        class=\"btn btn-active btn-xs\"\n                                        type=\"button\" *ngIf=\"isWEM\">\n                                    <i class=\"fa fa-eye fa-fw\"></i><a target=\"_blank\" class=\"btn btn-active btn-xs\" [href]=\"base_url+'/paymentReceipt/'+payment.file_name\" *ngIf=\"isWEM\">View</a>\n\n                                </button>\n\n\n                                <button\n                                        class=\"btn btn-active btn-xs\"\n                                        type=\"button\" *ngIf=\"isWEM && payment.reject\">\n                                    <i class=\"fa fa-trash fa-fw\"></i><a (click)=\"showPrompt(payment)\">Delete</a>\n\n                                </button>\n\n                                <button\n                                        class=\"btn btn-active btn-xs\"\n                                        type=\"button\" *ngIf=\"isWEM || (!isWEM && payment.accept)\">\n                                    <i class=\"fa fa-download fa-fw\"></i><a [href]=\"base_url+'/paymentReceipt/'+payment.file_name\" [download]=\"payment.file_name\">Download</a>\n\n                                </button>\n\n                                <input type=\"file\" ng2FileSelect [uploader]=\"uploader\" class=\"upload_file\" *ngIf=\"isParishPastor && payment.payment_status == 1 \" (change)=\"showUploader(payment,$event)\" accept=\".pdf,.doc,.docx,.jpeg,.jpg,.PDF,.DOC,.DOCX,.JPEG,.JPG\"/>\n\n                                <button type=\"button\" class=\"btn btn-success btn-xs\"\n                                        (click)=\"upload(payment)\" *ngIf=\"showUploadButton == payment.id\">\n                                    <span class=\"glyphicon glyphicon-upload\"></span> Upload\n                                </button>\n\n                                <div class=\"progress\" *ngIf=\"showUploadButton == payment.id && showProgressbar\">\n                                    <div class=\"progress-bar\" role=\"progressbar\" [ngStyle]=\"{ 'width': progress  + '%' }\"></div>\n                                </div>\n\n                            </td>\n                        </tr>\n                        <tr *ngIf=\"ifNoData\" >\n                            <td> No record found </td>\n                        </tr>\n                        </tbody>\n                    </table>\n                </div>\n\n            </div>\n        </div>\n    </div>\n</div><!--/.row-->\n\n<app-prompt\n        *ngIf=\"showDeletePrompt\"\n        [calledFrom]=\"'Payment'\"\n        [itemInfo]=\"toDeletePayment\"\n></app-prompt>\n\n"

/***/ }),

/***/ "../../../../../src/app/payment-details/list-payment/list-payment.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListPaymentComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_file_upload__ = __webpack_require__("../../../../ng2-file-upload/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_file_upload___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_ng2_file_upload__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__payment_service__ = __webpack_require__("../../../../../src/app/payment-details/payment.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__auth_auth_service__ = __webpack_require__("../../../../../src/app/auth/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__environments_environment_prod__ = __webpack_require__("../../../../../src/environments/environment.prod.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__province_zone_area_parish_province_zone_area_parish_service__ = __webpack_require__("../../../../../src/app/province-zone-area-parish/province-zone-area-parish.service.ts");
/** Component to handle list of payment */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var ListPaymentComponent = (function () {
    /** Injecting services to be used in this component */
    function ListPaymentComponent(paymentService, router, authService, pzapService) {
        this.paymentService = paymentService;
        this.router = router;
        this.authService = authService;
        this.pzapService = pzapService;
        this.responseStatus = false;
        this.responseReceived = false;
        this.responseMsg = '';
        this.ifNoData = false;
        this.showProgressbar = false;
        this.selectionYear = 0;
        this.selectionMonth = 0;
        this.selectionProvince = 0;
        this.selectionZone = 0;
        this.selectionArea = 0;
        this.selectionParish = 0;
        this.showParishIdList = false;
        this.currentYear = (new Date()).getFullYear();
        this.currentMonth = ((new Date()).getMonth()) + 1;
        this.currentYearList = [];
        this.isWEM = false;
        this.isProvincePastor = false;
        this.isZonePastor = false;
        this.isAreaPastor = false;
        this.isParishPastor = false;
        this.showDeletePrompt = false;
        this.paymentDetails = [];
        this.uploader = new __WEBPACK_IMPORTED_MODULE_1_ng2_file_upload__["FileUploader"]({});
        this.showUploadButton = 0;
        this.progress = 0;
        this.base_url = __WEBPACK_IMPORTED_MODULE_5__environments_environment_prod__["a" /* environment */].base_url;
        this.months = Array();
    }
    ListPaymentComponent.prototype.ngOnInit = function () {
        var _this = this;
        /** Setting user type */
        if (this.authService.getToken().user_type === 1) {
            this.showParishIdList = true;
            this.isWEM = true;
        }
        else {
            if (this.authService.getToken().pastor_type === 1) {
                this.isProvincePastor = true;
                this.isZonePastor = false;
                this.isAreaPastor = false;
                this.isParishPastor = false;
            }
            else if (this.authService.getToken().pastor_type === 2) {
                this.isProvincePastor = false;
                this.isZonePastor = true;
                this.isAreaPastor = false;
                this.isParishPastor = false;
            }
            else if (this.authService.getToken().pastor_type === 3) {
                this.isProvincePastor = false;
                this.isZonePastor = false;
                this.isAreaPastor = true;
                this.isParishPastor = false;
            }
            else {
                this.isProvincePastor = false;
                this.isZonePastor = false;
                this.isAreaPastor = false;
                this.isParishPastor = true;
            }
            this.showParishIdList = false;
            this.isWEM = false;
        }
        /** Populating the year array */
        for (var i = 2010; i <= this.currentYear; i++) {
            this.currentYearList.push(i);
        }
        /** Initializing month array */
        this.months[0] = { name: "January", number: 1 };
        this.months[1] = { name: "February", number: 2 };
        this.months[2] = { name: "March", number: 3 };
        this.months[3] = { name: "April", number: 4 };
        this.months[4] = { name: "May", number: 5 };
        this.months[5] = { name: "June", number: 6 };
        this.months[6] = { name: "July", number: 7 };
        this.months[7] = { name: "August", number: 8 };
        this.months[8] = { name: "September", number: 9 };
        this.months[9] = { name: "October", number: 10 };
        this.months[10] = { name: "November", number: 11 };
        this.months[11] = { name: "December", number: 12 };
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
        /** Subscribe to event to refresh zone list */
        this.refreshZoneListSubscription = this.paymentService.refreshList
            .subscribe(function () {
            if (_this.isWEM || _this.isProvincePastor) {
                _this.pzapService.filterZone(_this.getCurrentSelectedFilters())
                    .subscribe(function (response) {
                    _this.responseStatus = response.json().status;
                    if (response.json().status) {
                        _this.zoneList = response.json().zones;
                        if (_this.zoneList && _this.zoneList.length == 1) {
                            _this.selectionZone = _this.zoneList[0].id;
                        }
                    }
                    else {
                        _this.zoneList = [];
                        _this.responseMsg = response.json().message;
                        // this.responseNoRecord   = response.json().noData;
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
        });
        /** Subscribe to event to refresh area list */
        this.refreshAreaListSubscription = this.paymentService.refreshList
            .subscribe(function () {
            if (_this.isWEM || _this.isProvincePastor || _this.isZonePastor) {
                _this.pzapService.filterArea(_this.getCurrentSelectedFilters())
                    .subscribe(function (response) {
                    _this.responseStatus = response.json().status;
                    if (response.json().status) {
                        _this.areaList = response.json().areas;
                        if (_this.areaList && _this.areaList.length == 1) {
                            _this.selectionArea = _this.areaList[0].id;
                        }
                        // this.responseNoRecord   = response.json().noData;
                    }
                    else {
                        _this.areaList = [];
                        _this.responseMsg = response.json().message;
                        // this.responseNoRecord   = response.json().noData;
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
        });
        /** Subscribe to event to refresh parish list */
        this.refreshParishListSubscription = this.paymentService.refreshList
            .subscribe(function () {
            if (_this.isWEM || _this.isProvincePastor || _this.isZonePastor || _this.isAreaPastor) {
                _this.pzapService.filterParish(_this.getCurrentSelectedFilters())
                    .subscribe(function (response) {
                    _this.responseStatus = response.json().status;
                    if (response.json().status) {
                        _this.parishList = response.json().parishes;
                        if (_this.parishList && _this.parishList.length == 1) {
                            _this.selectionParish = _this.parishList[0].id;
                        }
                    }
                    else {
                        _this.parishList = [];
                        _this.selectionProvince = null;
                        _this.selectionZone = null;
                        _this.responseMsg = response.json().message;
                        // this.responseNoRecord   = response.json().noData;
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
            }
        });
        /** Subscribe to event to refresh payment list */
        this.refreshPaymentListSubscription = this.paymentService.refreshList
            .subscribe(function () {
            _this.paymentService.listPayment(_this.getCurrentSelectedFilters())
                .subscribe(function (response) {
                _this.responseStatus = response.json().status;
                _this.ifNoData = false;
                if (response.json().status) {
                    _this.paymentDetails = response.json().paymentDetail;
                    _this.paymentDetails.forEach(function (item) {
                        var pay_status = (item.payment_status == 3) ? 'On Hold' : (item.payment_status == 0) ? 'Accepted' : 'Rejected';
                        item.pay_status = pay_status;
                        if (item.payment_status == 3) {
                            item.hold = true;
                            item.accept = false;
                            item.reject = false;
                        }
                        else if (item.payment_status == 1) {
                            item.hold = false;
                            item.accept = false;
                            item.reject = true;
                        }
                        else {
                            item.hold = false;
                            item.accept = true;
                            item.reject = false;
                        }
                    });
                }
                else {
                    _this.ifNoData = true;
                    _this.responseMsg = response.json().message;
                    _this.paymentDetails = response.json().paymentDetail;
                }
            }, function (error) {
                if (error.status === 401) {
                    _this.authService.removeToken();
                    _this.router.navigate(['/login']);
                }
                _this.responseStatus = false;
                _this.responseReceived = true;
                _this.paymentDetails = [];
                _this.responseMsg = error.json().error;
            });
        });
        /** Subscribe to event to close the delete prompt */
        this.closePromptEventSubscription = this.pzapService.closePromptEvent
            .subscribe(function () {
            _this.showDeletePrompt = false;
        });
        /** Subscribe to event to delete an Payment */
        this.deletePaymentEventSubscription = this.paymentService.deleteEvent
            .subscribe(function (id) {
            _this.showDeletePrompt = false;
            _this.paymentService.deletePayment(id).subscribe(function (response) {
                _this.responseReceived = true;
                _this.responseStatus = response.json().status;
                if (response.json().status) {
                    _this.responseMsg = response.json().message;
                    _this.paymentService.refreshList.next({});
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
                _this.responseMsg = error.json().error;
            });
        });
        /** Emitting event which will refresh the payment list */
        this.paymentService.refreshList.next();
    };
    /** Upload doc Function */
    ListPaymentComponent.prototype.upload = function (payment) {
        var _this = this;
        this.progress = 10;
        this.showProgressbar = true;
        var user_id = this.authService.getToken().user_id;
        var formData = new FormData();
        formData.append("name", this.files[0]);
        formData.append("upload_month", payment.upload_month);
        formData.append('upload_year', payment.upload_year);
        formData.append("payment_description", payment.payment_description);
        formData.append("user_id", user_id);
        this.paymentService.paymentCreate(formData)
            .subscribe(function (response) {
            _this.responseStatus = response.json().status;
            if (response.json().status) {
                _this.progress = 100;
                _this.responseMsg = response.json().message;
                _this.responseReceived = true;
            }
            else {
                _this.responseMsg = '';
            }
            _this.paymentService.refreshList.next();
        }, function (error) {
            if (error.status === 401) {
                _this.authService.removeToken();
                _this.router.navigate(['/login']);
            }
            _this.progress = 0;
            _this.responseStatus = false;
            _this.responseReceived = true;
            _this.responseMsg = error.json().error;
        }, function () {
            setTimeout(function () {
                _this.progress = 0;
                _this.responseReceived = false;
                _this.showProgressbar = false;
            }, 3000);
        });
    };
    /** Show upload button when try to upload any doc */
    ListPaymentComponent.prototype.showUploader = function (payment, event) {
        this.showUploadButton = payment.id;
        this.files = event.target.files;
        this.progress = 10;
        this.showProgressbar = true;
    };
    /** Change status of Payment **/
    ListPaymentComponent.prototype.OnChangeStatus = function (payment, status) {
        var _this = this;
        var setpaymentArray = [
            { id: payment.id, payment_status: status }
        ];
        this.paymentService.paymentChangeStatus(setpaymentArray[0])
            .subscribe(function (response) {
            _this.responseReceived = true;
            _this.responseStatus = response.json().status;
            if (response.json().status) {
                _this.responseMsg = response.json().message;
            }
            else {
                _this.responseMsg = '';
            }
            _this.paymentService.refreshList.next();
        }, function (error) {
            if (error.status === 401) {
                _this.authService.removeToken();
                _this.router.navigate(['/login']);
            }
            _this.responseStatus = false;
            _this.responseReceived = true;
            _this.responseMsg = error.json().error;
        });
    };
    /** Function call when month selected */
    ListPaymentComponent.prototype.onSelectMonth = function (month) {
        this.selectionMonth = month;
        this.paymentService.refreshList.next();
    };
    /** Function call when year selected */
    ListPaymentComponent.prototype.onSelectYear = function (year) {
        this.selectionYear = year;
        this.paymentService.refreshList.next();
    };
    /** Function call to refresh payment list on select of province */
    ListPaymentComponent.prototype.onSelectProvince = function (provinceId) {
        this.selectionProvince = provinceId;
        this.selectionZone = 0;
        this.selectionArea = 0;
        this.selectionParish = 0;
        this.paymentService.refreshList.next();
    };
    /** Function call to refresh payment list on select of province */
    ListPaymentComponent.prototype.onSelectZone = function (zoneId) {
        var _this = this;
        this.selectionZone = zoneId;
        this.selectionArea = 0;
        this.selectionParish = 0;
        if (zoneId > 0) {
            var selected = this.zoneList.find(function (item) {
                return item.id == _this.selectionZone;
            });
            this.selectionProvince = selected.province_id;
        }
        else {
            this.zoneList = [];
        }
        this.paymentService.refreshList.next();
    };
    /** Function call to refresh payment list on select of province */
    ListPaymentComponent.prototype.onSelectArea = function (areaId) {
        var _this = this;
        this.selectionArea = areaId;
        this.selectionParish = 0;
        if (areaId > 0) {
            var selected = this.areaList.find(function (item) {
                return item.id == _this.selectionArea;
            });
            this.selectionProvince = selected.province_id;
            this.selectionZone = selected.zone_id;
        }
        else {
            this.areaList = [];
        }
        this.paymentService.refreshList.next();
    };
    /** Function call when month selected */
    ListPaymentComponent.prototype.onSelectParish = function (parishId) {
        var _this = this;
        this.selectionParish = parishId;
        if (parishId > 0) {
            var selected = this.parishList.find(function (item) {
                return item.id == _this.selectionParish;
            });
            this.selectionProvince = selected.province_id;
            this.selectionZone = selected.zone_id;
            this.selectionArea = selected.area_id;
        }
        else {
            this.areaList = [];
        }
        this.paymentService.refreshList.next();
    };
    /** Function call to reset filters */
    ListPaymentComponent.prototype.onResetFilters = function () {
        this.selectionMonth = 0;
        this.selectionYear = 0;
        this.selectionProvince = 0;
        this.selectionZone = 0;
        this.selectionArea = 0;
        this.selectionParish = 0;
        this.paymentService.refreshList.next();
    };
    /** Function that returns current selected filters */
    ListPaymentComponent.prototype.getCurrentSelectedFilters = function () {
        return {
            request_year: this.selectionYear > 0 ? this.selectionYear : '',
            request_month: this.selectionMonth > 0 ? this.selectionMonth : '',
            province_id: this.selectionProvince > 0 ? this.selectionProvince : '',
            zone_id: this.selectionZone > 0 ? this.selectionZone : '',
            area_id: this.selectionArea > 0 ? this.selectionArea : '',
            parish_id: this.selectionParish > 0 ? this.selectionParish : ''
        };
    };
    /** Function call to show delete prompt */
    ListPaymentComponent.prototype.showPrompt = function (obj) {
        this.showDeletePrompt = true;
        this.toDeletePayment = obj;
    };
    /** Function to delete a payment */
    ListPaymentComponent.prototype.OnClickDelete = function (payment) {
        console.log('delete');
        /*this.paymentService.deletePayment(payment.id)
            .subscribe(
                (response: Response) => {
                    this.responseReceived   = true;
                    this.responseStatus = response.json().status;
                    if ( response.json().status ) {
                        this.responseMsg = response.json().message;
                    } else {
                        this.responseMsg = '';
                    }
                    this.paymentService.refreshList.next();
                },
                (error: Response) => {
                    if( error.status === 401) {
                        this.authService.removeToken();
                        this.router.navigate( ['/login'] );
                    }
                    this.responseStatus = false;
                    this.responseReceived = true;
                    this.responseMsg = error.json().error;
                }
            );*/
    };
    /** Un-subscribing from all custom made events when component is destroyed */
    ListPaymentComponent.prototype.ngOnDestroy = function () {
        this.refreshPaymentListSubscription.unsubscribe();
        this.refreshZoneListSubscription.unsubscribe();
        this.refreshAreaListSubscription.unsubscribe();
        this.refreshParishListSubscription.unsubscribe();
        this.deletePaymentEventSubscription.unsubscribe();
    };
    return ListPaymentComponent;
}());
ListPaymentComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-list-payment',
        template: __webpack_require__("../../../../../src/app/payment-details/list-payment/list-payment.component.html"),
        styles: [__webpack_require__("../../../../../src/app/payment-details/list-payment/list-payment.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__payment_service__["a" /* PaymentService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__payment_service__["a" /* PaymentService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["d" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["d" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__auth_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__auth_auth_service__["a" /* AuthService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_6__province_zone_area_parish_province_zone_area_parish_service__["a" /* ProvinceZoneAreaParishService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__province_zone_area_parish_province_zone_area_parish_service__["a" /* ProvinceZoneAreaParishService */]) === "function" && _d || Object])
], ListPaymentComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=list-payment.component.js.map

/***/ }),

/***/ "../../../../../src/app/payment-details/payment-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PaymentRoutingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__upload_payment_upload_payment_component__ = __webpack_require__("../../../../../src/app/payment-details/upload-payment/upload-payment.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__list_payment_list_payment_component__ = __webpack_require__("../../../../../src/app/payment-details/list-payment/list-payment.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var paymentRoutes = [
    { path: 'upload', component: __WEBPACK_IMPORTED_MODULE_2__upload_payment_upload_payment_component__["a" /* UploadPaymentComponent */] },
    { path: 'list', component: __WEBPACK_IMPORTED_MODULE_3__list_payment_list_payment_component__["a" /* ListPaymentComponent */] }
];
var PaymentRoutingModule = (function () {
    function PaymentRoutingModule() {
    }
    return PaymentRoutingModule;
}());
PaymentRoutingModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
        imports: [__WEBPACK_IMPORTED_MODULE_0__angular_router__["e" /* RouterModule */].forChild(paymentRoutes)],
        exports: [__WEBPACK_IMPORTED_MODULE_0__angular_router__["e" /* RouterModule */]]
    })
], PaymentRoutingModule);

//# sourceMappingURL=payment-routing.module.js.map

/***/ }),

/***/ "../../../../../src/app/payment-details/payment.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PaymentModule", function() { return PaymentModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__upload_payment_upload_payment_component__ = __webpack_require__("../../../../../src/app/payment-details/upload-payment/upload-payment.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__payment_routing_module__ = __webpack_require__("../../../../../src/app/payment-details/payment-routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ng2_file_upload__ = __webpack_require__("../../../../ng2-file-upload/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ng2_file_upload___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_ng2_file_upload__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ng2_date_picker__ = __webpack_require__("../../../../ng2-date-picker/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ng2_date_picker___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_ng2_date_picker__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__list_payment_list_payment_component__ = __webpack_require__("../../../../../src/app/payment-details/list-payment/list-payment.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__shared_shared_module__ = __webpack_require__("../../../../../src/app/shared/shared.module.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









var PaymentModule = (function () {
    function PaymentModule() {
    }
    return PaymentModule;
}());
PaymentModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_3__upload_payment_upload_payment_component__["a" /* UploadPaymentComponent */],
            __WEBPACK_IMPORTED_MODULE_7__list_payment_list_payment_component__["a" /* ListPaymentComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_common__["CommonModule"],
            __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormsModule"],
            __WEBPACK_IMPORTED_MODULE_4__payment_routing_module__["a" /* PaymentRoutingModule */],
            __WEBPACK_IMPORTED_MODULE_5_ng2_file_upload__["FileUploadModule"],
            __WEBPACK_IMPORTED_MODULE_6_ng2_date_picker__["DpDatePickerModule"],
            __WEBPACK_IMPORTED_MODULE_8__shared_shared_module__["a" /* SharedModule */]
        ],
        providers: [],
        exports: [],
    })
], PaymentModule);

//# sourceMappingURL=payment.module.js.map

/***/ }),

/***/ "../../../../../src/app/payment-details/upload-payment/upload-payment.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".progress {\n    height: 20px;\n    overflow: hidden;\n    background-color: #f5f5f5;\n    border-radius: 4px;\n    box-shadow: inset 0 1px 2px rgba(0, 0, 0, .1);\n    margin-top: 15px;\n}\n\n.alert.alert-success {\n    background-color: #4CAF50;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/payment-details/upload-payment/upload-payment.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n    <div class=\"col-lg-12\">\n        <h3 class=\"page-header\">Payment</h3>\n    </div>\n</div><!--/.row-->\n\n<div class=\"row\">\n    <div class=\"col-lg-12\">\n        <div class=\"panel panel-default\">\n            <div class=\"panel-heading\">Upload Payment</div>\n            <div class=\"panel-body\">\n                <div class=\"row\">\n                    <div class=\"col-lg-12\">\n                        <div *ngIf=\"!responseStatus && responseReceived\" class=\"alert alert-danger\">\n                            <strong>{{ responseMsg }}</strong>\n                        </div>\n                    </div>\n                    <div class=\"col-lg-12\">\n                        <div *ngIf=\"responseStatus && responseReceived\" class=\"alert alert-success\">\n                            <strong>{{ responseMsg }}</strong>\n                        </div>\n                    </div>\n                </div>\n                <form #uploadPaymentForm=\"ngForm\" (submit)=\"onSubmit(uploadPaymentForm)\" enctype=\"multipart/form-data\">\n\n                    <div class=\"row\">\n                        <div class=\"col-md-6\">\n                            <div class=\"form-group\">\n                                <label >Choose Year & Month (*)</label>\n                                <!--<dp-month-calendar  [config]=\"config\" [(ngModel)]=\"paymentDate.payment_date\"  name=\"payment_date\" datestyle=\"yyyy/MM\"></dp-month-calendar>-->\n                                <dp-date-picker id=\"paymentDate\"\n                                                name=\"payment_date\"\n                                                #datePicker\n                                                #paymentDate=\"ngModel\"\n                                                [(ngModel)]=\"paymentDate.payment_date\"\n\n                                                [mode]=\"'month'\"\n                                                [placeholder]=\"'Pick Month & Year'\"\n                                                [config]=\"config\"\n                                                [theme]=\"'dp-material'\">\n                                </dp-date-picker>\n\n                            </div>\n                        </div>\n\n                        <div class=\"col-md-6\">\n                            <div class=\"alert alert-danger\" *ngIf=\"paymentDate.invalid && paymentDate.touched\">\n                                Payment Date is Required!\n                            </div>\n                        </div>\n                    </div>\n\n                    <div class=\"row\">\n                        <div class=\"col-md-6\">\n                            <div class=\"form-group\">\n                                <label for=\"pdescription\">Payment Description</label>\n                                <textarea class=\"form-control\" rows=\"3\" id=\"pdescription\" [(ngModel)]=\"paymentDate.payment_description\"  name=\"payment_description\"></textarea>\n                            </div>\n                        </div>\n                    </div>\n\n                    <div class=\"row\">\n                        <div class=\"col-md-6\">\n                            <div class=\"form-group\">\n                                <label for=\"pfile\">Upload File (*)</label>\n                                <input\n                                        id=\"pfile\"\n                                        class=\"form-control\"\n                                        name=\"uploadfile\"\n                                        required\n                                        [ngModel]=\"paymentDate.uploadfile\"\n                                        #uploadFile=\"ngModel\"\n                                        type=\"file\"\n                                        ng2FileSelect [uploader]=\"uploader\"\n                                        accept=\".pdf,.doc,.docx,.jpeg,.jpg,.PDF,.DOC,.DOCX,.JPEG,.JPG\"\n                                        (change)=\"checkUploadedFileType($event)\"\n                                > (.pdf,.doc,.docx,.jpeg,.jpg,.PDF,.DOC,.DOCX,.JPEG,.JPG only accepted)\n                            </div>\n                        </div>\n\n\n                        <div class=\"col-md-6\">\n                            <div class=\"form-group\" *ngIf=\"uploader?.queue?.length && length\">\n                                <label></label>\n                                <div class=\"progress\">\n                                    <div data-percentage=\"0%\" [ngStyle]=\"{ 'width': progress  + '%' }\" class=\"progress-bar progress-bar-blue\" role=\"progressbar\" aria-valuemin=\"0\" aria-valuemax=\"100\"></div>\n                                </div>\n                            </div>\n\n                            <div class=\"alert alert-danger\" *ngIf=\"uploader?.queue?.length == 0 && uploadFile.touched\">\n                                File is Required!\n                            </div>\n                        </div>\n\n                    </div>\n\n                    <div class=\"row\">\n                        <div class=\"col-md-6\">\n                            <button class=\"btn btn-primary\" [disabled]=\"uploader?.queue?.length == 0 || !length || paymentDate.invalid || !paymentDate.payment_date || showLoader\">\n                                <i *ngIf=\"showLoader\" class=\"fa fa-spinner fa-pulse fa-lg fa-fw\"></i>\n                                Submit\n                            </button>\n\n                           <button\n                                    type=\"button\"\n                                    class=\"btn btn-default\"\n                                    [disabled]=\"showLoader\"\n                                    (click)=\"onReset(uploadPaymentForm)\">Reset\n                            </button>\n                        </div>\n                    </div>\n                </form>\n            </div>\n        </div>\n    </div>\n</div>\n\n\n\n"

/***/ }),

/***/ "../../../../../src/app/payment-details/upload-payment/upload-payment.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UploadPaymentComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__auth_auth_service__ = __webpack_require__("../../../../../src/app/auth/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng2_file_upload__ = __webpack_require__("../../../../ng2-file-upload/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng2_file_upload___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_ng2_file_upload__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__payment_service__ = __webpack_require__("../../../../../src/app/payment-details/payment.service.ts");
/** Component to upload new payment */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var UploadPaymentComponent = (function () {
    /** Injecting services to be used in this component */
    function UploadPaymentComponent(payservice, authService) {
        this.payservice = payservice;
        this.authService = authService;
        this.paymentDate = {};
        this.showLoader = false;
        this.responseStatus = false;
        this.responseReceived = false;
        this.responseMsg = '';
        this.progress = 0;
        this.uploader = new __WEBPACK_IMPORTED_MODULE_2_ng2_file_upload__["FileUploader"]({});
        this.length = false;
        this.config = {
            firstDayOfWeek: 'su',
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
    /** Function call when form is submitted */
    UploadPaymentComponent.prototype.onSubmit = function (uploadPaymentForm) {
        var _this = this;
        this.showLoader = true;
        this.progress = 30;
        var payment_date = new Date(uploadPaymentForm.value.payment_date);
        var month = payment_date.getMonth() + 1;
        var user_id = this.authService.getToken().user_id;
        var year_data = payment_date.getFullYear().toString();
        var month_data = month.toString();
        var formData = new FormData();
        formData.append("name", this.files[0]);
        formData.append("upload_month", month_data);
        formData.append('upload_year', year_data);
        formData.append("payment_description", uploadPaymentForm.value.payment_description);
        formData.append("user_id", user_id);
        this.payservice.paymentCreate(formData)
            .subscribe(function (response) {
            _this.responseReceived = true;
            _this.responseStatus = response.json().status;
            _this.showLoader = false;
            if (response.json().status) {
                _this.progress = 100;
                _this.responseMsg = response.json().message;
            }
        }, function (error) {
            _this.showLoader = false;
            _this.responseStatus = false;
            _this.responseReceived = true;
            _this.responseMsg = error.json().error;
        }, function () {
            setTimeout(function () {
                _this.progress = 0;
                _this.responseReceived = false;
                _this.showLoader = false;
                uploadPaymentForm.reset();
            }, 3000);
        });
    };
    /** function to set files to be uploaded and increase progressbar */
    UploadPaymentComponent.prototype.checkUploadedFileType = function (event) {
        this.progress = 10;
        this.files = event.target.files;
        if (this.files.length > 0) {
            this.length = true;
        }
        else {
            this.length = false;
        }
    };
    /** function to reset upload payment form */
    UploadPaymentComponent.prototype.onReset = function (uploadPaymentForm) {
        uploadPaymentForm.reset();
        this.progress = 0;
        this.length = false;
        this.showLoader = false;
    };
    return UploadPaymentComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('fileInput'),
    __metadata("design:type", Object)
], UploadPaymentComponent.prototype, "fileInput", void 0);
UploadPaymentComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-upload-payment',
        template: __webpack_require__("../../../../../src/app/payment-details/upload-payment/upload-payment.component.html"),
        styles: [__webpack_require__("../../../../../src/app/payment-details/upload-payment/upload-payment.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__payment_service__["a" /* PaymentService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__payment_service__["a" /* PaymentService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__auth_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__auth_auth_service__["a" /* AuthService */]) === "function" && _b || Object])
], UploadPaymentComponent);

var _a, _b;
//# sourceMappingURL=upload-payment.component.js.map

/***/ }),

/***/ "../../../../ng2-file-upload/file-upload/file-drop.directive.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var file_uploader_class_1 = __webpack_require__("../../../../ng2-file-upload/file-upload/file-uploader.class.js");
var FileDropDirective = (function () {
    function FileDropDirective(element) {
        this.fileOver = new core_1.EventEmitter();
        this.onFileDrop = new core_1.EventEmitter();
        this.element = element;
    }
    FileDropDirective.prototype.getOptions = function () {
        return this.uploader.options;
    };
    FileDropDirective.prototype.getFilters = function () {
        return {};
    };
    FileDropDirective.prototype.onDrop = function (event) {
        var transfer = this._getTransfer(event);
        if (!transfer) {
            return;
        }
        var options = this.getOptions();
        var filters = this.getFilters();
        this._preventAndStop(event);
        this.uploader.addToQueue(transfer.files, options, filters);
        this.fileOver.emit(false);
        this.onFileDrop.emit(transfer.files);
    };
    FileDropDirective.prototype.onDragOver = function (event) {
        var transfer = this._getTransfer(event);
        if (!this._haveFiles(transfer.types)) {
            return;
        }
        transfer.dropEffect = 'copy';
        this._preventAndStop(event);
        this.fileOver.emit(true);
    };
    FileDropDirective.prototype.onDragLeave = function (event) {
        if (this.element) {
            if (event.currentTarget === this.element[0]) {
                return;
            }
        }
        this._preventAndStop(event);
        this.fileOver.emit(false);
    };
    FileDropDirective.prototype._getTransfer = function (event) {
        return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer; // jQuery fix;
    };
    FileDropDirective.prototype._preventAndStop = function (event) {
        event.preventDefault();
        event.stopPropagation();
    };
    FileDropDirective.prototype._haveFiles = function (types) {
        if (!types) {
            return false;
        }
        if (types.indexOf) {
            return types.indexOf('Files') !== -1;
        }
        else if (types.contains) {
            return types.contains('Files');
        }
        else {
            return false;
        }
    };
    return FileDropDirective;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", file_uploader_class_1.FileUploader)
], FileDropDirective.prototype, "uploader", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], FileDropDirective.prototype, "fileOver", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], FileDropDirective.prototype, "onFileDrop", void 0);
__decorate([
    core_1.HostListener('drop', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FileDropDirective.prototype, "onDrop", null);
__decorate([
    core_1.HostListener('dragover', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FileDropDirective.prototype, "onDragOver", null);
__decorate([
    core_1.HostListener('dragleave', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], FileDropDirective.prototype, "onDragLeave", null);
FileDropDirective = __decorate([
    core_1.Directive({ selector: '[ng2FileDrop]' }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], FileDropDirective);
exports.FileDropDirective = FileDropDirective;


/***/ }),

/***/ "../../../../ng2-file-upload/file-upload/file-item.class.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var file_like_object_class_1 = __webpack_require__("../../../../ng2-file-upload/file-upload/file-like-object.class.js");
var FileItem = (function () {
    function FileItem(uploader, some, options) {
        this.url = '/';
        this.headers = [];
        this.withCredentials = true;
        this.formData = [];
        this.isReady = false;
        this.isUploading = false;
        this.isUploaded = false;
        this.isSuccess = false;
        this.isCancel = false;
        this.isError = false;
        this.progress = 0;
        this.index = void 0;
        this.uploader = uploader;
        this.some = some;
        this.options = options;
        this.file = new file_like_object_class_1.FileLikeObject(some);
        this._file = some;
        if (uploader.options) {
            this.method = uploader.options.method || 'POST';
            this.alias = uploader.options.itemAlias || 'file';
        }
        this.url = uploader.options.url;
    }
    FileItem.prototype.upload = function () {
        try {
            this.uploader.uploadItem(this);
        }
        catch (e) {
            this.uploader._onCompleteItem(this, '', 0, {});
            this.uploader._onErrorItem(this, '', 0, {});
        }
    };
    FileItem.prototype.cancel = function () {
        this.uploader.cancelItem(this);
    };
    FileItem.prototype.remove = function () {
        this.uploader.removeFromQueue(this);
    };
    FileItem.prototype.onBeforeUpload = function () {
        return void 0;
    };
    FileItem.prototype.onBuildForm = function (form) {
        return { form: form };
    };
    FileItem.prototype.onProgress = function (progress) {
        return { progress: progress };
    };
    FileItem.prototype.onSuccess = function (response, status, headers) {
        return { response: response, status: status, headers: headers };
    };
    FileItem.prototype.onError = function (response, status, headers) {
        return { response: response, status: status, headers: headers };
    };
    FileItem.prototype.onCancel = function (response, status, headers) {
        return { response: response, status: status, headers: headers };
    };
    FileItem.prototype.onComplete = function (response, status, headers) {
        return { response: response, status: status, headers: headers };
    };
    FileItem.prototype._onBeforeUpload = function () {
        this.isReady = true;
        this.isUploading = true;
        this.isUploaded = false;
        this.isSuccess = false;
        this.isCancel = false;
        this.isError = false;
        this.progress = 0;
        this.onBeforeUpload();
    };
    FileItem.prototype._onBuildForm = function (form) {
        this.onBuildForm(form);
    };
    FileItem.prototype._onProgress = function (progress) {
        this.progress = progress;
        this.onProgress(progress);
    };
    FileItem.prototype._onSuccess = function (response, status, headers) {
        this.isReady = false;
        this.isUploading = false;
        this.isUploaded = true;
        this.isSuccess = true;
        this.isCancel = false;
        this.isError = false;
        this.progress = 100;
        this.index = void 0;
        this.onSuccess(response, status, headers);
    };
    FileItem.prototype._onError = function (response, status, headers) {
        this.isReady = false;
        this.isUploading = false;
        this.isUploaded = true;
        this.isSuccess = false;
        this.isCancel = false;
        this.isError = true;
        this.progress = 0;
        this.index = void 0;
        this.onError(response, status, headers);
    };
    FileItem.prototype._onCancel = function (response, status, headers) {
        this.isReady = false;
        this.isUploading = false;
        this.isUploaded = false;
        this.isSuccess = false;
        this.isCancel = true;
        this.isError = false;
        this.progress = 0;
        this.index = void 0;
        this.onCancel(response, status, headers);
    };
    FileItem.prototype._onComplete = function (response, status, headers) {
        this.onComplete(response, status, headers);
        if (this.uploader.options.removeAfterUpload) {
            this.remove();
        }
    };
    FileItem.prototype._prepareToUploading = function () {
        this.index = this.index || ++this.uploader._nextIndex;
        this.isReady = true;
    };
    return FileItem;
}());
exports.FileItem = FileItem;


/***/ }),

/***/ "../../../../ng2-file-upload/file-upload/file-like-object.class.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function isElement(node) {
    return !!(node && (node.nodeName || node.prop && node.attr && node.find));
}
var FileLikeObject = (function () {
    function FileLikeObject(fileOrInput) {
        var isInput = isElement(fileOrInput);
        var fakePathOrObject = isInput ? fileOrInput.value : fileOrInput;
        var postfix = typeof fakePathOrObject === 'string' ? 'FakePath' : 'Object';
        var method = '_createFrom' + postfix;
        this[method](fakePathOrObject);
    }
    FileLikeObject.prototype._createFromFakePath = function (path) {
        this.lastModifiedDate = void 0;
        this.size = void 0;
        this.type = 'like/' + path.slice(path.lastIndexOf('.') + 1).toLowerCase();
        this.name = path.slice(path.lastIndexOf('/') + path.lastIndexOf('\\') + 2);
    };
    FileLikeObject.prototype._createFromObject = function (object) {
        // this.lastModifiedDate = copy(object.lastModifiedDate);
        this.size = object.size;
        this.type = object.type;
        this.name = object.name;
    };
    return FileLikeObject;
}());
exports.FileLikeObject = FileLikeObject;


/***/ }),

/***/ "../../../../ng2-file-upload/file-upload/file-select.directive.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var file_uploader_class_1 = __webpack_require__("../../../../ng2-file-upload/file-upload/file-uploader.class.js");
// todo: filters
var FileSelectDirective = (function () {
    function FileSelectDirective(element) {
        this.element = element;
    }
    FileSelectDirective.prototype.getOptions = function () {
        return this.uploader.options;
    };
    FileSelectDirective.prototype.getFilters = function () {
        return void 0;
    };
    FileSelectDirective.prototype.isEmptyAfterSelection = function () {
        return !!this.element.nativeElement.attributes.multiple;
    };
    FileSelectDirective.prototype.onChange = function () {
        // let files = this.uploader.isHTML5 ? this.element.nativeElement[0].files : this.element.nativeElement[0];
        var files = this.element.nativeElement.files;
        var options = this.getOptions();
        var filters = this.getFilters();
        // if(!this.uploader.isHTML5) this.destroy();
        this.uploader.addToQueue(files, options, filters);
        if (this.isEmptyAfterSelection()) {
            // todo
            this.element.nativeElement.value = '';
        }
    };
    return FileSelectDirective;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", file_uploader_class_1.FileUploader)
], FileSelectDirective.prototype, "uploader", void 0);
__decorate([
    core_1.HostListener('change'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], FileSelectDirective.prototype, "onChange", null);
FileSelectDirective = __decorate([
    core_1.Directive({ selector: '[ng2FileSelect]' }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], FileSelectDirective);
exports.FileSelectDirective = FileSelectDirective;


/***/ }),

/***/ "../../../../ng2-file-upload/file-upload/file-type.class.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var FileType = (function () {
    function FileType() {
    }
    FileType.getMimeClass = function (file) {
        var mimeClass = 'application';
        if (this.mime_psd.indexOf(file.type) !== -1) {
            mimeClass = 'image';
        }
        else if (file.type.match('image.*')) {
            mimeClass = 'image';
        }
        else if (file.type.match('video.*')) {
            mimeClass = 'video';
        }
        else if (file.type.match('audio.*')) {
            mimeClass = 'audio';
        }
        else if (file.type === 'application/pdf') {
            mimeClass = 'pdf';
        }
        else if (this.mime_compress.indexOf(file.type) !== -1) {
            mimeClass = 'compress';
        }
        else if (this.mime_doc.indexOf(file.type) !== -1) {
            mimeClass = 'doc';
        }
        else if (this.mime_xsl.indexOf(file.type) !== -1) {
            mimeClass = 'xls';
        }
        else if (this.mime_ppt.indexOf(file.type) !== -1) {
            mimeClass = 'ppt';
        }
        if (mimeClass === 'application') {
            mimeClass = this.fileTypeDetection(file.name);
        }
        return mimeClass;
    };
    FileType.fileTypeDetection = function (inputFilename) {
        var types = {
            'jpg': 'image',
            'jpeg': 'image',
            'tif': 'image',
            'psd': 'image',
            'bmp': 'image',
            'png': 'image',
            'nef': 'image',
            'tiff': 'image',
            'cr2': 'image',
            'dwg': 'image',
            'cdr': 'image',
            'ai': 'image',
            'indd': 'image',
            'pin': 'image',
            'cdp': 'image',
            'skp': 'image',
            'stp': 'image',
            '3dm': 'image',
            'mp3': 'audio',
            'wav': 'audio',
            'wma': 'audio',
            'mod': 'audio',
            'm4a': 'audio',
            'compress': 'compress',
            'rar': 'compress',
            '7z': 'compress',
            'lz': 'compress',
            'z01': 'compress',
            'pdf': 'pdf',
            'xls': 'xls',
            'xlsx': 'xls',
            'ods': 'xls',
            'mp4': 'video',
            'avi': 'video',
            'wmv': 'video',
            'mpg': 'video',
            'mts': 'video',
            'flv': 'video',
            '3gp': 'video',
            'vob': 'video',
            'm4v': 'video',
            'mpeg': 'video',
            'm2ts': 'video',
            'mov': 'video',
            'doc': 'doc',
            'docx': 'doc',
            'eps': 'doc',
            'txt': 'doc',
            'odt': 'doc',
            'rtf': 'doc',
            'ppt': 'ppt',
            'pptx': 'ppt',
            'pps': 'ppt',
            'ppsx': 'ppt',
            'odp': 'ppt'
        };
        var chunks = inputFilename.split('.');
        if (chunks.length < 2) {
            return 'application';
        }
        var extension = chunks[chunks.length - 1].toLowerCase();
        if (types[extension] === undefined) {
            return 'application';
        }
        else {
            return types[extension];
        }
    };
    return FileType;
}());
/*  MS office  */
FileType.mime_doc = [
    'application/msword',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.template',
    'application/vnd.ms-word.document.macroEnabled.12',
    'application/vnd.ms-word.template.macroEnabled.12'
];
FileType.mime_xsl = [
    'application/vnd.ms-excel',
    'application/vnd.ms-excel',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.template',
    'application/vnd.ms-excel.sheet.macroEnabled.12',
    'application/vnd.ms-excel.template.macroEnabled.12',
    'application/vnd.ms-excel.addin.macroEnabled.12',
    'application/vnd.ms-excel.sheet.binary.macroEnabled.12'
];
FileType.mime_ppt = [
    'application/vnd.ms-powerpoint',
    'application/vnd.ms-powerpoint',
    'application/vnd.ms-powerpoint',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'application/vnd.openxmlformats-officedocument.presentationml.template',
    'application/vnd.openxmlformats-officedocument.presentationml.slideshow',
    'application/vnd.ms-powerpoint.addin.macroEnabled.12',
    'application/vnd.ms-powerpoint.presentation.macroEnabled.12',
    'application/vnd.ms-powerpoint.presentation.macroEnabled.12',
    'application/vnd.ms-powerpoint.slideshow.macroEnabled.12'
];
/* PSD */
FileType.mime_psd = [
    'image/photoshop',
    'image/x-photoshop',
    'image/psd',
    'application/photoshop',
    'application/psd',
    'zz-application/zz-winassoc-psd'
];
/* Compressed files */
FileType.mime_compress = [
    'application/x-gtar',
    'application/x-gcompress',
    'application/compress',
    'application/x-tar',
    'application/x-rar-compressed',
    'application/octet-stream'
];
exports.FileType = FileType;


/***/ }),

/***/ "../../../../ng2-file-upload/file-upload/file-upload.module.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var common_1 = __webpack_require__("../../../common/@angular/common.es5.js");
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var file_drop_directive_1 = __webpack_require__("../../../../ng2-file-upload/file-upload/file-drop.directive.js");
var file_select_directive_1 = __webpack_require__("../../../../ng2-file-upload/file-upload/file-select.directive.js");
var FileUploadModule = (function () {
    function FileUploadModule() {
    }
    return FileUploadModule;
}());
FileUploadModule = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule],
        declarations: [file_drop_directive_1.FileDropDirective, file_select_directive_1.FileSelectDirective],
        exports: [file_drop_directive_1.FileDropDirective, file_select_directive_1.FileSelectDirective]
    })
], FileUploadModule);
exports.FileUploadModule = FileUploadModule;


/***/ }),

/***/ "../../../../ng2-file-upload/file-upload/file-uploader.class.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var file_like_object_class_1 = __webpack_require__("../../../../ng2-file-upload/file-upload/file-like-object.class.js");
var file_item_class_1 = __webpack_require__("../../../../ng2-file-upload/file-upload/file-item.class.js");
var file_type_class_1 = __webpack_require__("../../../../ng2-file-upload/file-upload/file-type.class.js");
function isFile(value) {
    return (File && value instanceof File);
}
var FileUploader = (function () {
    function FileUploader(options) {
        this.isUploading = false;
        this.queue = [];
        this.progress = 0;
        this._nextIndex = 0;
        this.options = {
            autoUpload: false,
            isHTML5: true,
            filters: [],
            removeAfterUpload: false,
            disableMultipart: false
        };
        this.setOptions(options);
    }
    FileUploader.prototype.setOptions = function (options) {
        this.options = Object.assign(this.options, options);
        this.authToken = options.authToken;
        this.authTokenHeader = options.authTokenHeader || 'Authorization';
        this.autoUpload = options.autoUpload;
        this.options.filters.unshift({ name: 'queueLimit', fn: this._queueLimitFilter });
        if (this.options.maxFileSize) {
            this.options.filters.unshift({ name: 'fileSize', fn: this._fileSizeFilter });
        }
        if (this.options.allowedFileType) {
            this.options.filters.unshift({ name: 'fileType', fn: this._fileTypeFilter });
        }
        if (this.options.allowedMimeType) {
            this.options.filters.unshift({ name: 'mimeType', fn: this._mimeTypeFilter });
        }
        for (var i = 0; i < this.queue.length; i++) {
            this.queue[i].url = this.options.url;
        }
        // this.options.filters.unshift({name: 'folder', fn: this._folderFilter});
    };
    FileUploader.prototype.addToQueue = function (files, options, filters) {
        var _this = this;
        var list = [];
        for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
            var file = files_1[_i];
            list.push(file);
        }
        var arrayOfFilters = this._getFilters(filters);
        var count = this.queue.length;
        var addedFileItems = [];
        list.map(function (some) {
            if (!options) {
                options = _this.options;
            }
            var temp = new file_like_object_class_1.FileLikeObject(some);
            if (_this._isValidFile(temp, arrayOfFilters, options)) {
                var fileItem = new file_item_class_1.FileItem(_this, some, options);
                addedFileItems.push(fileItem);
                _this.queue.push(fileItem);
                _this._onAfterAddingFile(fileItem);
            }
            else {
                var filter = arrayOfFilters[_this._failFilterIndex];
                _this._onWhenAddingFileFailed(temp, filter, options);
            }
        });
        if (this.queue.length !== count) {
            this._onAfterAddingAll(addedFileItems);
            this.progress = this._getTotalProgress();
        }
        this._render();
        if (this.options.autoUpload) {
            this.uploadAll();
        }
    };
    FileUploader.prototype.removeFromQueue = function (value) {
        var index = this.getIndexOfItem(value);
        var item = this.queue[index];
        if (item.isUploading) {
            item.cancel();
        }
        this.queue.splice(index, 1);
        this.progress = this._getTotalProgress();
    };
    FileUploader.prototype.clearQueue = function () {
        while (this.queue.length) {
            this.queue[0].remove();
        }
        this.progress = 0;
    };
    FileUploader.prototype.uploadItem = function (value) {
        var index = this.getIndexOfItem(value);
        var item = this.queue[index];
        var transport = this.options.isHTML5 ? '_xhrTransport' : '_iframeTransport';
        item._prepareToUploading();
        if (this.isUploading) {
            return;
        }
        this.isUploading = true;
        this[transport](item);
    };
    FileUploader.prototype.cancelItem = function (value) {
        var index = this.getIndexOfItem(value);
        var item = this.queue[index];
        var prop = this.options.isHTML5 ? item._xhr : item._form;
        if (item && item.isUploading) {
            prop.abort();
        }
    };
    FileUploader.prototype.uploadAll = function () {
        var items = this.getNotUploadedItems().filter(function (item) { return !item.isUploading; });
        if (!items.length) {
            return;
        }
        items.map(function (item) { return item._prepareToUploading(); });
        items[0].upload();
    };
    FileUploader.prototype.cancelAll = function () {
        var items = this.getNotUploadedItems();
        items.map(function (item) { return item.cancel(); });
    };
    FileUploader.prototype.isFile = function (value) {
        return isFile(value);
    };
    FileUploader.prototype.isFileLikeObject = function (value) {
        return value instanceof file_like_object_class_1.FileLikeObject;
    };
    FileUploader.prototype.getIndexOfItem = function (value) {
        return typeof value === 'number' ? value : this.queue.indexOf(value);
    };
    FileUploader.prototype.getNotUploadedItems = function () {
        return this.queue.filter(function (item) { return !item.isUploaded; });
    };
    FileUploader.prototype.getReadyItems = function () {
        return this.queue
            .filter(function (item) { return (item.isReady && !item.isUploading); })
            .sort(function (item1, item2) { return item1.index - item2.index; });
    };
    FileUploader.prototype.destroy = function () {
        return void 0;
        /*forEach(this._directives, (key) => {
         forEach(this._directives[key], (object) => {
         object.destroy();
         });
         });*/
    };
    FileUploader.prototype.onAfterAddingAll = function (fileItems) {
        return { fileItems: fileItems };
    };
    FileUploader.prototype.onBuildItemForm = function (fileItem, form) {
        return { fileItem: fileItem, form: form };
    };
    FileUploader.prototype.onAfterAddingFile = function (fileItem) {
        return { fileItem: fileItem };
    };
    FileUploader.prototype.onWhenAddingFileFailed = function (item, filter, options) {
        return { item: item, filter: filter, options: options };
    };
    FileUploader.prototype.onBeforeUploadItem = function (fileItem) {
        return { fileItem: fileItem };
    };
    FileUploader.prototype.onProgressItem = function (fileItem, progress) {
        return { fileItem: fileItem, progress: progress };
    };
    FileUploader.prototype.onProgressAll = function (progress) {
        return { progress: progress };
    };
    FileUploader.prototype.onSuccessItem = function (item, response, status, headers) {
        return { item: item, response: response, status: status, headers: headers };
    };
    FileUploader.prototype.onErrorItem = function (item, response, status, headers) {
        return { item: item, response: response, status: status, headers: headers };
    };
    FileUploader.prototype.onCancelItem = function (item, response, status, headers) {
        return { item: item, response: response, status: status, headers: headers };
    };
    FileUploader.prototype.onCompleteItem = function (item, response, status, headers) {
        return { item: item, response: response, status: status, headers: headers };
    };
    FileUploader.prototype.onCompleteAll = function () {
        return void 0;
    };
    FileUploader.prototype._mimeTypeFilter = function (item) {
        return !(this.options.allowedMimeType && this.options.allowedMimeType.indexOf(item.type) === -1);
    };
    FileUploader.prototype._fileSizeFilter = function (item) {
        return !(this.options.maxFileSize && item.size > this.options.maxFileSize);
    };
    FileUploader.prototype._fileTypeFilter = function (item) {
        return !(this.options.allowedFileType &&
            this.options.allowedFileType.indexOf(file_type_class_1.FileType.getMimeClass(item)) === -1);
    };
    FileUploader.prototype._onErrorItem = function (item, response, status, headers) {
        item._onError(response, status, headers);
        this.onErrorItem(item, response, status, headers);
    };
    FileUploader.prototype._onCompleteItem = function (item, response, status, headers) {
        item._onComplete(response, status, headers);
        this.onCompleteItem(item, response, status, headers);
        var nextItem = this.getReadyItems()[0];
        this.isUploading = false;
        if (nextItem) {
            nextItem.upload();
            return;
        }
        this.onCompleteAll();
        this.progress = this._getTotalProgress();
        this._render();
    };
    FileUploader.prototype._headersGetter = function (parsedHeaders) {
        return function (name) {
            if (name) {
                return parsedHeaders[name.toLowerCase()] || void 0;
            }
            return parsedHeaders;
        };
    };
    FileUploader.prototype._xhrTransport = function (item) {
        var _this = this;
        var xhr = item._xhr = new XMLHttpRequest();
        var sendable;
        this._onBeforeUploadItem(item);
        // todo
        /*item.formData.map(obj => {
         obj.map((value, key) => {
         form.append(key, value);
         });
         });*/
        if (typeof item._file.size !== 'number') {
            throw new TypeError('The file specified is no longer valid');
        }
        if (!this.options.disableMultipart) {
            sendable = new FormData();
            this._onBuildItemForm(item, sendable);
            sendable.append(item.alias, item._file, item.file.name);
            if (this.options.additionalParameter !== undefined) {
                Object.keys(this.options.additionalParameter).forEach(function (key) {
                    sendable.append(key, _this.options.additionalParameter[key]);
                });
            }
        }
        else {
            sendable = item._file;
        }
        xhr.upload.onprogress = function (event) {
            var progress = Math.round(event.lengthComputable ? event.loaded * 100 / event.total : 0);
            _this._onProgressItem(item, progress);
        };
        xhr.onload = function () {
            var headers = _this._parseHeaders(xhr.getAllResponseHeaders());
            var response = _this._transformResponse(xhr.response, headers);
            var gist = _this._isSuccessCode(xhr.status) ? 'Success' : 'Error';
            var method = '_on' + gist + 'Item';
            _this[method](item, response, xhr.status, headers);
            _this._onCompleteItem(item, response, xhr.status, headers);
        };
        xhr.onerror = function () {
            var headers = _this._parseHeaders(xhr.getAllResponseHeaders());
            var response = _this._transformResponse(xhr.response, headers);
            _this._onErrorItem(item, response, xhr.status, headers);
            _this._onCompleteItem(item, response, xhr.status, headers);
        };
        xhr.onabort = function () {
            var headers = _this._parseHeaders(xhr.getAllResponseHeaders());
            var response = _this._transformResponse(xhr.response, headers);
            _this._onCancelItem(item, response, xhr.status, headers);
            _this._onCompleteItem(item, response, xhr.status, headers);
        };
        xhr.open(item.method, item.url, true);
        xhr.withCredentials = item.withCredentials;
        if (this.options.headers) {
            for (var _i = 0, _a = this.options.headers; _i < _a.length; _i++) {
                var header = _a[_i];
                xhr.setRequestHeader(header.name, header.value);
            }
        }
        if (item.headers.length) {
            for (var _b = 0, _c = item.headers; _b < _c.length; _b++) {
                var header = _c[_b];
                xhr.setRequestHeader(header.name, header.value);
            }
        }
        if (this.authToken) {
            xhr.setRequestHeader(this.authTokenHeader, this.authToken);
        }
        xhr.send(sendable);
        this._render();
    };
    FileUploader.prototype._getTotalProgress = function (value) {
        if (value === void 0) { value = 0; }
        if (this.options.removeAfterUpload) {
            return value;
        }
        var notUploaded = this.getNotUploadedItems().length;
        var uploaded = notUploaded ? this.queue.length - notUploaded : this.queue.length;
        var ratio = 100 / this.queue.length;
        var current = value * ratio / 100;
        return Math.round(uploaded * ratio + current);
    };
    FileUploader.prototype._getFilters = function (filters) {
        if (!filters) {
            return this.options.filters;
        }
        if (Array.isArray(filters)) {
            return filters;
        }
        if (typeof filters === 'string') {
            var names_1 = filters.match(/[^\s,]+/g);
            return this.options.filters
                .filter(function (filter) { return names_1.indexOf(filter.name) !== -1; });
        }
        return this.options.filters;
    };
    FileUploader.prototype._render = function () {
        return void 0;
        // todo: ?
    };
    // protected _folderFilter(item:FileItem):boolean {
    //   return !!(item.size || item.type);
    // }
    FileUploader.prototype._queueLimitFilter = function () {
        return this.options.queueLimit === undefined || this.queue.length < this.options.queueLimit;
    };
    FileUploader.prototype._isValidFile = function (file, filters, options) {
        var _this = this;
        this._failFilterIndex = -1;
        return !filters.length ? true : filters.every(function (filter) {
            _this._failFilterIndex++;
            return filter.fn.call(_this, file, options);
        });
    };
    FileUploader.prototype._isSuccessCode = function (status) {
        return (status >= 200 && status < 300) || status === 304;
    };
    /* tslint:disable */
    FileUploader.prototype._transformResponse = function (response, headers) {
        // todo: ?
        /*var headersGetter = this._headersGetter(headers);
         forEach($http.defaults.transformResponse, (transformFn) => {
         response = transformFn(response, headersGetter);
         });*/
        return response;
    };
    /* tslint:enable */
    FileUploader.prototype._parseHeaders = function (headers) {
        var parsed = {};
        var key;
        var val;
        var i;
        if (!headers) {
            return parsed;
        }
        headers.split('\n').map(function (line) {
            i = line.indexOf(':');
            key = line.slice(0, i).trim().toLowerCase();
            val = line.slice(i + 1).trim();
            if (key) {
                parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
            }
        });
        return parsed;
    };
    /*protected _iframeTransport(item:FileItem) {
     // todo: implement it later
     }*/
    FileUploader.prototype._onWhenAddingFileFailed = function (item, filter, options) {
        this.onWhenAddingFileFailed(item, filter, options);
    };
    FileUploader.prototype._onAfterAddingFile = function (item) {
        this.onAfterAddingFile(item);
    };
    FileUploader.prototype._onAfterAddingAll = function (items) {
        this.onAfterAddingAll(items);
    };
    FileUploader.prototype._onBeforeUploadItem = function (item) {
        item._onBeforeUpload();
        this.onBeforeUploadItem(item);
    };
    FileUploader.prototype._onBuildItemForm = function (item, form) {
        item._onBuildForm(form);
        this.onBuildItemForm(item, form);
    };
    FileUploader.prototype._onProgressItem = function (item, progress) {
        var total = this._getTotalProgress(progress);
        this.progress = total;
        item._onProgress(progress);
        this.onProgressItem(item, progress);
        this.onProgressAll(total);
        this._render();
    };
    /* tslint:disable */
    FileUploader.prototype._onSuccessItem = function (item, response, status, headers) {
        item._onSuccess(response, status, headers);
        this.onSuccessItem(item, response, status, headers);
    };
    /* tslint:enable */
    FileUploader.prototype._onCancelItem = function (item, response, status, headers) {
        item._onCancel(response, status, headers);
        this.onCancelItem(item, response, status, headers);
    };
    return FileUploader;
}());
exports.FileUploader = FileUploader;


/***/ }),

/***/ "../../../../ng2-file-upload/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__("../../../../ng2-file-upload/file-upload/file-select.directive.js"));
__export(__webpack_require__("../../../../ng2-file-upload/file-upload/file-drop.directive.js"));
__export(__webpack_require__("../../../../ng2-file-upload/file-upload/file-uploader.class.js"));
__export(__webpack_require__("../../../../ng2-file-upload/file-upload/file-item.class.js"));
__export(__webpack_require__("../../../../ng2-file-upload/file-upload/file-like-object.class.js"));
var file_upload_module_1 = __webpack_require__("../../../../ng2-file-upload/file-upload/file-upload.module.js");
exports.FileUploadModule = file_upload_module_1.FileUploadModule;


/***/ })

});
//# sourceMappingURL=payment.module.chunk.js.map