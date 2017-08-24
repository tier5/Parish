webpackJsonp([5],{

/***/ "../../../../../src/app/province-zone-area/province/create-province/create-province.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "input.ng-invalid.ng-touched {\n    border: 1px solid #a94442;\n}\n\nbutton {\n    margin-top: 15px;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/province-zone-area/province/create-province/create-province.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n    <div class=\"col-lg-12\">\n        <h3 *ngIf=\"!editMode\" class=\"page-header\">Province - Create</h3>\n        <h3 *ngIf=\"editMode\" class=\"page-header\">Province - Update</h3>\n    </div>\n</div><!--/.row-->\n\n<div class=\"row\">\n    <div class=\"col-lg-12\">\n        <div class=\"panel panel-default\">\n            <div class=\"panel-heading\">{{ editMode ? 'Update':'Create New' }} Province</div>\n            <div class=\"panel-body\">\n                <form\n                    #createProvinceForm=\"ngForm\"\n                    (submit)=\"onSubmit(createProvinceForm)\"\n                >\n\n                    <div class=\"row\">\n                        <div class=\"col-md-6\">\n                            <div class=\"form-group\">\n                                <label for=\"pname\">Province Name</label>\n                                <input\n                                    id=\"pname\"\n                                    class=\"form-control\"\n                                    name=\"provience_name\"\n                                    required\n                                    [ngModel]=\"provinceData.province_name\"\n                                    #provinceName=\"ngModel\"\n                                >\n                            </div>\n                        </div>\n                        <div class=\"col-md-6\">\n                            <div\n                                class=\"alert alert-danger\"\n                                *ngIf=\"provinceName.invalid && provinceName.touched\"\n                            >\n                                Province Name is Required!\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"col-md-6\">\n                            <div class=\"form-group\">\n                                <label for=\"fname\">Pastor's First Name</label>\n                                <input\n                                    id=\"fname\"\n                                    class=\"form-control\"\n                                    name=\"first_name\"\n                                    required\n                                    [ngModel]=\"provinceData.first_name\"\n                                    #firstName=\"ngModel\"\n                                >\n                            </div>\n                        </div>\n                        <div class=\"col-md-6\">\n                            <div\n                                class=\"alert alert-danger\"\n                                *ngIf=\"firstName.invalid && firstName.touched\"\n                            >\n                                First Name is Required!\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"col-md-6\">\n                            <div class=\"form-group\">\n                                <label for=\"lname\">Pastor's Last Name</label>\n                                <input\n                                    id=\"lname\"\n                                    class=\"form-control\"\n                                    name=\"last_name\"\n                                    required\n                                    [ngModel]=\"provinceData.last_name\"\n                                    #lastName=\"ngModel\"\n                                >\n                            </div>\n                        </div>\n                        <div class=\"col-md-6\">\n                            <div\n                                class=\"alert alert-danger\"\n                                *ngIf=\"lastName.invalid && lastName.touched\"\n                            >\n                                Last Name is Required!\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"col-md-6\">\n                            <div\n                                *ngIf=\"!responseStatus && responseReceived\"\n                                class=\"alert alert-danger\"\n                            >\n                                <strong>{{ responseMsg }}</strong>\n                            </div>\n                            <div\n                                *ngIf=\"responseStatus && responseReceived\"\n                                class=\"alert alert-success\"\n                            >\n                                <strong>{{ responseMsg }}</strong>\n                            </div>\n                        </div>\n                        <div class=\"col-md-6\">\n                            <button\n                                class=\"btn btn-primary\"\n                                [disabled]=\"createProvinceForm.invalid || showLoader\"\n                            >\n                                <i *ngIf=\"showLoader\" class=\"fa fa-spinner fa-pulse fa-lg fa-fw\"></i>\n                                Submit\n                            </button>\n                            <button\n                                type=\"button\"\n                                class=\"btn btn-default\"\n                                (click)=\"onReset(createProvinceForm)\"\n                            >Reset</button>\n                        </div>\n                    </div>\n                </form>\n            </div>\n        </div>\n    </div>\n</div>\n\n\n"

/***/ }),

/***/ "../../../../../src/app/province-zone-area/province/create-province/create-province.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__auth_auth_service__ = __webpack_require__("../../../../../src/app/auth/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__province_service__ = __webpack_require__("../../../../../src/app/province-zone-area/province/province.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CreateProvinceComponent; });
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
    function CreateProvinceComponent(provinceService, authService, activatedRoute) {
        this.provinceService = provinceService;
        this.authService = authService;
        this.activatedRoute = activatedRoute;
        this.editMode = false;
        this.provinceData = {
            id: 0,
            user_id: 0,
            parish_id: 0,
            first_name: '',
            last_name: '',
            province_name: '',
            password: ''
        };
        this.showLoader = false;
        this.responseStatus = false;
        this.responseReceived = false;
        this.responseMsg = '';
    }
    CreateProvinceComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activatedRoute.data.subscribe(function (data) {
            _this.editMode = data['editMode'];
        });
        if (this.editMode) {
            this.activatedRoute.params.subscribe(function (params) {
                _this.provinceId = params['id'];
                _this.provinceService.fetchSpecificProvince(_this.provinceId)
                    .subscribe(function (response) {
                    _this.provinceData = response.json().provinces;
                });
            }, function (error) {
                console.log(error);
            }, function () { });
        }
    };
    CreateProvinceComponent.prototype.onSubmit = function (createProvinceForm) {
        var _this = this;
        this.showLoader = true;
        if (this.editMode) {
            var province_id = this.provinceData.id;
            var pastor_id = this.provinceData.user_id;
            this.provinceService.editProvince(province_id, pastor_id, createProvinceForm.value)
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
                createProvinceForm.reset();
                _this.responseReceived = true;
                setTimeout(function () {
                    _this.responseReceived = false;
                }, 3000);
            });
        }
        else {
            this.provinceService.createProvince(createProvinceForm.value)
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
                createProvinceForm.reset();
                _this.responseReceived = true;
                setTimeout(function () {
                    _this.responseReceived = false;
                }, 3000);
            });
        }
    };
    CreateProvinceComponent.prototype.onReset = function (createProvinceForm) {
        createProvinceForm.reset();
    };
    return CreateProvinceComponent;
}());
CreateProvinceComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        selector: 'app-create-province',
        template: __webpack_require__("../../../../../src/app/province-zone-area/province/create-province/create-province.component.html"),
        styles: [__webpack_require__("../../../../../src/app/province-zone-area/province/create-province/create-province.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__province_service__["a" /* ProvinceService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__province_service__["a" /* ProvinceService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__auth_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__auth_auth_service__["a" /* AuthService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_router__["c" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_router__["c" /* ActivatedRoute */]) === "function" && _c || Object])
], CreateProvinceComponent);

var _a, _b, _c;
//# sourceMappingURL=create-province.component.js.map

/***/ }),

/***/ "../../../../../src/app/province-zone-area/province/list-province/list-province.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/province-zone-area/province/list-province/list-province.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n    <div class=\"col-lg-12\">\n        <h3 class=\"page-header\">Province - List</h3>\n    </div>\n</div><!--/.row-->\n\n<div class=\"row\">\n    <div class=\"col-sm-12\">\n        <div class=\"panel panel-default\">\n            <div class=\"panel-body overflowFix\">\n\n                <div class=\"table-responsive\">\n                    <table class=\"table table-hover table-condensed\">\n                        <thead>\n                        <tr>\n                            <th>First Name</th>\n                            <th>Last Name</th>\n                            <th>Province</th>\n                            <th>Username</th>\n                            <th>Password</th>\n                            <th>Actions</th>\n                        </tr>\n                        </thead>\n                        <tbody>\n                        <tr *ngFor=\"let province of provinceList\">\n                            <td>{{ province.first_name }}</td>\n                            <td>{{ province.last_name }}</td>\n                            <td>{{ province.province_name }}</td>\n                            <td>{{ province.parish_id }}</td>\n                            <td>{{ province.password}}</td>\n                            <td>\n                                <button\n                                    class=\"btn btn-warning btn-xs\"\n                                    type=\"button\"\n                                    (click)=\"onEdit(province)\"\n                                >\n                                    <i class=\"fa fa-pencil fa-fw\"></i>\n                                </button>\n                                <button class=\"btn btn-danger btn-xs\" type=\"button\">\n                                    <i class=\"fa fa-trash fa-fw\"></i>\n                                </button>\n                            </td>\n                        </tr>\n                        </tbody>\n                    </table>\n                </div>\n\n            </div>\n        </div>\n    </div>\n</div><!--/.row-->"

/***/ }),

/***/ "../../../../../src/app/province-zone-area/province/list-province/list-province.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__province_service__ = __webpack_require__("../../../../../src/app/province-zone-area/province/province.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListProvinceComponent; });
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
    function ListProvinceComponent(provinceService, router) {
        this.provinceService = provinceService;
        this.router = router;
        this.responseMsg = '';
        this.responseStatus = false;
        this.responseReceived = false;
    }
    ListProvinceComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.provinceService.listProvince().subscribe(function (response) {
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
    };
    ListProvinceComponent.prototype.onEdit = function (obj) {
        var province_id = obj.id;
        var pastor_id = obj.user_id;
        this.router.navigate(['province/edit/', province_id]);
    };
    return ListProvinceComponent;
}());
ListProvinceComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-list-province',
        template: __webpack_require__("../../../../../src/app/province-zone-area/province/list-province/list-province.component.html"),
        styles: [__webpack_require__("../../../../../src/app/province-zone-area/province/list-province/list-province.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__province_service__["a" /* ProvinceService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__province_service__["a" /* ProvinceService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === "function" && _b || Object])
], ListProvinceComponent);

var _a, _b;
//# sourceMappingURL=list-province.component.js.map

/***/ }),

/***/ "../../../../../src/app/province-zone-area/province/province-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__create_province_create_province_component__ = __webpack_require__("../../../../../src/app/province-zone-area/province/create-province/create-province.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__list_province_list_province_component__ = __webpack_require__("../../../../../src/app/province-zone-area/province/list-province/list-province.component.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProvinceRoutingModule; });
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
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
        imports: [__WEBPACK_IMPORTED_MODULE_0__angular_router__["b" /* RouterModule */].forChild(provinceRoutes)],
        exports: [__WEBPACK_IMPORTED_MODULE_0__angular_router__["b" /* RouterModule */]]
    })
], ProvinceRoutingModule);

//# sourceMappingURL=province-routing.module.js.map

/***/ }),

/***/ "../../../../../src/app/province-zone-area/province/province.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__create_province_create_province_component__ = __webpack_require__("../../../../../src/app/province-zone-area/province/create-province/create-province.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__list_province_list_province_component__ = __webpack_require__("../../../../../src/app/province-zone-area/province/list-province/list-province.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__province_routing_module__ = __webpack_require__("../../../../../src/app/province-zone-area/province/province-routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__province_service__ = __webpack_require__("../../../../../src/app/province-zone-area/province/province.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__shared_shared_module__ = __webpack_require__("../../../../../src/app/shared/shared.module.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProvinceModule", function() { return ProvinceModule; });
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
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_3__create_province_create_province_component__["a" /* CreateProvinceComponent */],
            __WEBPACK_IMPORTED_MODULE_4__list_province_list_province_component__["a" /* ListProvinceComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_common__["CommonModule"],
            __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_5__province_routing_module__["a" /* ProvinceRoutingModule */],
            __WEBPACK_IMPORTED_MODULE_7__shared_shared_module__["a" /* SharedModule */]
        ],
        providers: [__WEBPACK_IMPORTED_MODULE_6__province_service__["a" /* ProvinceService */]],
        exports: [],
    })
], ProvinceModule);

//# sourceMappingURL=province.module.js.map

/***/ }),

/***/ "../../../../../src/app/province-zone-area/province/province.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__auth_auth_service__ = __webpack_require__("../../../../../src/app/auth/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment_prod__ = __webpack_require__("../../../../../src/environments/environment.prod.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProvinceService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ProvinceService = (function () {
    function ProvinceService(http, authService) {
        this.http = http;
        this.authService = authService;
    }
    /** List all Province */
    ProvinceService.prototype.listProvince = function () {
        var user_id = this.authService.getToken().user_id;
        var header = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["b" /* Headers */]({
            'X-Requested-With': 'XMLHttpRequest',
            'Authorization': 'Bearer ' + this.authService.getToken().token
        });
        return this.http.get(__WEBPACK_IMPORTED_MODULE_3__environments_environment_prod__["a" /* environment */].API_URL + 'provinces/' + user_id, { headers: header });
    };
    /** Fetch specific province data */
    ProvinceService.prototype.fetchSpecificProvince = function (province_id) {
        var header = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["b" /* Headers */]({
            'X-Requested-With': 'XMLHttpRequest',
            'Authorization': 'Bearer ' + this.authService.getToken().token
        });
        return this.http.get(__WEBPACK_IMPORTED_MODULE_3__environments_environment_prod__["a" /* environment */].API_URL + 'provinces/showDetail/' + province_id, { headers: header });
    };
    /** Create a new province */
    ProvinceService.prototype.createProvince = function (body) {
        var obj = {
            user_id: this.authService.getToken().user_id
        };
        var header = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["b" /* Headers */]({
            'X-Requested-With': 'XMLHttpRequest',
            'Authorization': 'Bearer ' + this.authService.getToken().token
        });
        return this.http.post(__WEBPACK_IMPORTED_MODULE_3__environments_environment_prod__["a" /* environment */].API_URL + 'provinces', Object.assign(body, obj), { headers: header });
    };
    /** Create a new province */
    ProvinceService.prototype.editProvince = function (province_id, pastor_id, body) {
        var wem_id = this.authService.getToken().user_id;
        var header = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["b" /* Headers */]({
            'X-Requested-With': 'XMLHttpRequest',
            'Authorization': 'Bearer ' + this.authService.getToken().token
        });
        var api_url = __WEBPACK_IMPORTED_MODULE_3__environments_environment_prod__["a" /* environment */].API_URL + 'provinces/' + pastor_id + '/' + wem_id + '/' + province_id;
        return this.http.put(api_url, body, { headers: header });
    };
    return ProvinceService;
}());
ProvinceService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_http__["c" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_http__["c" /* Http */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__auth_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__auth_auth_service__["a" /* AuthService */]) === "function" && _b || Object])
], ProvinceService);

var _a, _b;
//# sourceMappingURL=province.service.js.map

/***/ })

});
//# sourceMappingURL=5.chunk.js.map