webpackJsonp(["main"],{

/***/ "../../../../../src lazy recursive":
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./auth/forgot-password/forgot-password.module": [
		"../../../../../src/app/auth/forgot-password/forgot-password.module.ts",
		"common",
		"forgot-password.module"
	],
	"./auth/login/login.module": [
		"../../../../../src/app/auth/login/login.module.ts",
		"common",
		"login.module"
	],
	"./auth/register/register.module": [
		"../../../../../src/app/auth/register/register.module.ts",
		"common",
		"register.module"
	],
	"./auth/reset-password/reset-password.module": [
		"../../../../../src/app/auth/reset-password/reset-password.module.ts",
		"common",
		"reset-password.module"
	],
	"./dashboard/dashboard.module": [
		"../../../../../src/app/dashboard/dashboard.module.ts",
		"common",
		"dashboard.module"
	],
	"./form/form.module": [
		"../../../../../src/app/form/form.module.ts",
		"common",
		"form.module"
	],
	"./payment-details/payment.module": [
		"../../../../../src/app/payment-details/payment.module.ts",
		"common",
		"payment.module"
	],
	"./profile-details/profile.module": [
		"../../../../../src/app/profile-details/profile.module.ts",
		"common",
		"profile.module"
	],
	"./province-zone-area-parish/area/area.module": [
		"../../../../../src/app/province-zone-area-parish/area/area.module.ts",
		"common",
		"area.module"
	],
	"./province-zone-area-parish/parish/parish.module": [
		"../../../../../src/app/province-zone-area-parish/parish/parish.module.ts",
		"common",
		"parish.module"
	],
	"./province-zone-area-parish/province/province.module": [
		"../../../../../src/app/province-zone-area-parish/province/province.module.ts",
		"common",
		"province.module"
	],
	"./province-zone-area-parish/zone/zone.module": [
		"../../../../../src/app/province-zone-area-parish/zone/zone.module.ts",
		"common",
		"zone.module"
	],
	"./report/report.module": [
		"../../../../../src/app/report/report.module.ts",
		"common",
		"report.module"
	],
	"./wem-list/wem.module": [
		"../../../../../src/app/wem-list/wem.module.ts",
		"common",
		"wem.module"
	],
	"./widgets/charts/charts.module": [
		"../../../../../src/app/widgets/charts/charts.module.ts",
		"common",
		"charts.module"
	],
	"./widgets/main/main.module": [
		"../../../../../src/app/widgets/main/main.module.ts",
		"common",
		"main.module"
	],
	"./widgets/tables/tables.module": [
		"../../../../../src/app/widgets/tables/tables.module.ts",
		"common",
		"tables.module"
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return Promise.all(ids.slice(1).map(__webpack_require__.e)).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
module.exports = webpackAsyncContext;
webpackAsyncContext.id = "../../../../../src lazy recursive";

/***/ }),

/***/ "../../../../../src/app/app-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppRoutingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__auth_auth_guard__ = __webpack_require__("../../../../../src/app/auth/auth.guard.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__layout_full_layout_component__ = __webpack_require__("../../../../../src/app/layout/full-layout.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__auth_not_auth_guard__ = __webpack_require__("../../../../../src/app/auth/not-auth.guard.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





/** All Routes */
var appRoutes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', canActivate: [__WEBPACK_IMPORTED_MODULE_4__auth_not_auth_guard__["a" /* NotAuthGuard */]], loadChildren: './auth/login/login.module#LoginModule' },
    { path: 'register', canActivate: [__WEBPACK_IMPORTED_MODULE_4__auth_not_auth_guard__["a" /* NotAuthGuard */]], loadChildren: './auth/register/register.module#RegisterModule' },
    { path: 'forgot-password', canActivate: [__WEBPACK_IMPORTED_MODULE_4__auth_not_auth_guard__["a" /* NotAuthGuard */]], loadChildren: './auth/forgot-password/forgot-password.module#ForgotPasswordModule' },
    { path: 'reset-password/:email/:token', canActivate: [__WEBPACK_IMPORTED_MODULE_4__auth_not_auth_guard__["a" /* NotAuthGuard */]], loadChildren: './auth/reset-password/reset-password.module#ResetPasswordModule' },
    { path: '', canActivate: [__WEBPACK_IMPORTED_MODULE_2__auth_auth_guard__["a" /* AuthGuard */]], canActivateChild: [__WEBPACK_IMPORTED_MODULE_2__auth_auth_guard__["a" /* AuthGuard */]], component: __WEBPACK_IMPORTED_MODULE_3__layout_full_layout_component__["a" /* FullLayoutComponent */], data: { title: 'Home' }, children: [
            { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule', data: { title2: 'Dashboard' } },
            { path: 'form', loadChildren: './form/form.module#FormModule' },
            { path: 'widget', children: [
                    { path: '', pathMatch: 'full', redirectTo: 'widget/main' },
                    { path: 'main', loadChildren: './widgets/main/main.module#MainWidgetModule' },
                    { path: 'table', loadChildren: './widgets/tables/tables.module#TablesWidgetModule' },
                    { path: 'chart', loadChildren: './widgets/charts/charts.module#ChartsWidgetModule' }
                ] },
            { path: 'province', loadChildren: './province-zone-area-parish/province/province.module#ProvinceModule' },
            { path: 'zone', loadChildren: './province-zone-area-parish/zone/zone.module#ZoneModule' },
            { path: 'area', loadChildren: './province-zone-area-parish/area/area.module#AreaModule' },
            { path: 'parish', loadChildren: './province-zone-area-parish/parish/parish.module#ParishModule' },
            { path: 'profile', loadChildren: './profile-details/profile.module#ProfileModule' },
            { path: 'report', loadChildren: './report/report.module#ReportModule' },
            { path: 'payment', loadChildren: './payment-details/payment.module#PaymentModule' },
            { path: 'wem', loadChildren: './wem-list/wem.module#WemModule' }
        ] },
    { path: '**', redirectTo: 'login' }
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    return AppRoutingModule;
}());
AppRoutingModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["e" /* RouterModule */].forRoot(appRoutes, { preloadingStrategy: __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* PreloadAllModules */] })],
        exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["e" /* RouterModule */]]
    })
], AppRoutingModule);

//# sourceMappingURL=app-routing.module.js.map

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = (function () {
    function AppComponent() {
    }
    return AppComponent;
}());
AppComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-root',
        template: '<router-outlet></router-outlet>'
    })
], AppComponent);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_routing_module__ = __webpack_require__("../../../../../src/app/app-routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__auth_auth_guard__ = __webpack_require__("../../../../../src/app/auth/auth.guard.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__auth_auth_service__ = __webpack_require__("../../../../../src/app/auth/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__layout_full_layout_component__ = __webpack_require__("../../../../../src/app/layout/full-layout.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_ng2_auto_breadcrumb__ = __webpack_require__("../../../../ng2-auto-breadcrumb/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__angular_platform_browser_animations__ = __webpack_require__("../../../platform-browser/@angular/platform-browser/animations.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__auth_not_auth_guard__ = __webpack_require__("../../../../../src/app/auth/not-auth.guard.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__province_zone_area_parish_province_zone_area_parish_service__ = __webpack_require__("../../../../../src/app/province-zone-area-parish/province-zone-area-parish.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__shared_shared_module__ = __webpack_require__("../../../../../src/app/shared/shared.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__profile_details_profile_service__ = __webpack_require__("../../../../../src/app/profile-details/profile.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__payment_details_payment_service__ = __webpack_require__("../../../../../src/app/payment-details/payment.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__report_report_service__ = __webpack_require__("../../../../../src/app/report/report.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__wem_list_wem_service__ = __webpack_require__("../../../../../src/app/wem-list/wem.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__dashboard_dashboard_service__ = __webpack_require__("../../../../../src/app/dashboard/dashboard.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



















var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_5__app_routing_module__["a" /* AppRoutingModule */],
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["BrowserModule"],
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
            __WEBPACK_IMPORTED_MODULE_2__angular_http__["c" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_9_ng2_auto_breadcrumb__["a" /* Ng2AutoBreadCrumb */],
            __WEBPACK_IMPORTED_MODULE_13__shared_shared_module__["a" /* SharedModule */],
            __WEBPACK_IMPORTED_MODULE_10__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */]
        ],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_8__layout_full_layout_component__["a" /* FullLayoutComponent */],
            __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_7__auth_auth_service__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_6__auth_auth_guard__["a" /* AuthGuard */],
            __WEBPACK_IMPORTED_MODULE_11__auth_not_auth_guard__["a" /* NotAuthGuard */],
            __WEBPACK_IMPORTED_MODULE_12__province_zone_area_parish_province_zone_area_parish_service__["a" /* ProvinceZoneAreaParishService */],
            __WEBPACK_IMPORTED_MODULE_14__profile_details_profile_service__["a" /* ProfileService */],
            __WEBPACK_IMPORTED_MODULE_15__payment_details_payment_service__["a" /* PaymentService */],
            __WEBPACK_IMPORTED_MODULE_16__report_report_service__["a" /* ReportService */],
            __WEBPACK_IMPORTED_MODULE_17__wem_list_wem_service__["a" /* WemService */],
            __WEBPACK_IMPORTED_MODULE_18__dashboard_dashboard_service__["a" /* DashboardService */]
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ "../../../../../src/app/auth/auth.guard.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthGuard; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__auth_service__ = __webpack_require__("../../../../../src/app/auth/auth.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AuthGuard = (function () {
    function AuthGuard(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    AuthGuard.prototype.canActivate = function (next, state) {
        if (this.authService.isAuthenticated()) {
            return true;
        }
        else {
            this.router.navigate(['/']);
            return false;
        }
    };
    AuthGuard.prototype.canActivateChild = function () {
        if (this.authService.isAuthenticated()) {
            return true;
        }
        else {
            this.router.navigate(['/']);
            return false;
        }
    };
    return AuthGuard;
}());
AuthGuard = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__auth_service__["a" /* AuthService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_router__["d" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_router__["d" /* Router */]) === "function" && _b || Object])
], AuthGuard);

var _a, _b;
//# sourceMappingURL=auth.guard.js.map

/***/ }),

/***/ "../../../../../src/app/auth/auth.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__environments_environment_prod__ = __webpack_require__("../../../../../src/environments/environment.prod.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

// import { Subject } from 'rxjs/Subject';


var AuthService = (function () {
    // loggedIn = new Subject();
    function AuthService(http) {
        this.http = http;
    }
    AuthService.prototype.logout = function (token) {
        var header = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({
            'X-Requested-With': 'XMLHttpRequest',
            'Authorization': 'Bearer ' + token
        });
        return this.http.post(__WEBPACK_IMPORTED_MODULE_2__environments_environment_prod__["a" /* environment */].API_URL + 'sign-out', '', { headers: header });
    };
    AuthService.prototype.getToken = function () {
        var data = localStorage.getItem('loggedInUserData');
        return JSON.parse(data);
    };
    AuthService.prototype.removeToken = function () {
        localStorage.removeItem('loggedInUserData');
    };
    AuthService.prototype.isAuthenticated = function () {
        var data = this.getToken();
        if (data && (data.token !== null)) {
            return true;
        }
        else {
            return false;
        }
    };
    return AuthService;
}());
AuthService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object])
], AuthService);

var _a;
//# sourceMappingURL=auth.service.js.map

/***/ }),

/***/ "../../../../../src/app/auth/not-auth.guard.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NotAuthGuard; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__auth_service__ = __webpack_require__("../../../../../src/app/auth/auth.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var NotAuthGuard = (function () {
    function NotAuthGuard(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    NotAuthGuard.prototype.canActivate = function (next, state) {
        if (this.authService.isAuthenticated()) {
            this.router.navigate(['/dashboard']);
            return false;
        }
        else {
            return true;
        }
    };
    return NotAuthGuard;
}());
NotAuthGuard = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__auth_service__["a" /* AuthService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_router__["d" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_router__["d" /* Router */]) === "function" && _b || Object])
], NotAuthGuard);

var _a, _b;
//# sourceMappingURL=not-auth.guard.js.map

/***/ }),

/***/ "../../../../../src/app/dashboard/dashboard.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DashboardService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__ = __webpack_require__("../../../../rxjs/Subject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__auth_auth_service__ = __webpack_require__("../../../../../src/app/auth/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__environments_environment_prod__ = __webpack_require__("../../../../../src/environments/environment.prod.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var DashboardService = (function () {
    /** Injecting services to be used in this component */
    function DashboardService(http, authService) {
        this.http = http;
        this.authService = authService;
        /** Initializing custom Observables */
        this.refreshList = new __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__["Subject"]();
        /** Initializing the different headers to be passed with each api call */
        this.headers = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["a" /* Headers */]({
            'X-Requested-With': 'XMLHttpRequest'
        });
        if (this.authService.isAuthenticated()) {
            this.refreshHeader();
        }
    }
    /** Refreshing the header for authenticated users */
    DashboardService.prototype.refreshHeader = function () {
        this.headers.set('Authorization', 'Bearer ' + this.authService.getToken().token);
    };
    /** Fetch dashboard data for the graph */
    DashboardService.prototype.getChartData = function () {
        var user_id = this.authService.getToken().user_id;
        return this.http.get(__WEBPACK_IMPORTED_MODULE_4__environments_environment_prod__["a" /* environment */].API_URL + 'parish/dashboard/' + user_id, { headers: this.headers });
    };
    /** Fetch number of province, zone and area pastor, no of WEm and no of parish data */
    DashboardService.prototype.getUserCount = function () {
        var user_id = this.authService.getToken().user_id;
        return this.http.get(__WEBPACK_IMPORTED_MODULE_4__environments_environment_prod__["a" /* environment */].API_URL + 'user/dashboard/getCountOfUsers/' + user_id, { headers: this.headers });
    };
    return DashboardService;
}());
DashboardService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_http__["b" /* Http */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__auth_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__auth_auth_service__["a" /* AuthService */]) === "function" && _b || Object])
], DashboardService);

var _a, _b;
//# sourceMappingURL=dashboard.service.js.map

/***/ }),

/***/ "../../../../../src/app/layout/full-layout.component.html":
/***/ (function(module, exports) {

module.exports = "    <nav class=\"navbar navbar-inverse navbar-fixed-top\" role=\"navigation\">\n    <div class=\"container-fluid\">\n        <div class=\"navbar-header\">\n            <button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\"#sidebar-collapse\"\n                    (click)=\"toggle()\">\n                <span class=\"sr-only\">Toggle navigation</span>\n                <i class=\"fa {{toggleBarIcon?'fa-bars':'fa-remove'}} text-white custom-nav-toggle\"></i>\n            </button>\n            <a class=\"navbar-brand\" [routerLink]=\"['/dashboard']\" ><span>Parish </span><!--Admin--></a>\n            <ul class=\"user-menu\">\n                <li class=\"dropdown pull-right\">\n                    <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\">\n                        {{ userInformation.user_first_name + ' ' + userInformation.user_last_name }}  <span class=\"caret\"></span></a>\n                    <ul class=\"dropdown-menu\" role=\"menu\">\n                        <li [routerLink]=\"['/profile']\"><a><i class=\"fa fa-fw fa-user\"></i> Profile</a></li>\n                        <li><a (click)=\"onLogout()\"><i class=\"fa fa-fw fa-lock\"></i> Logout</a></li>\n                    </ul>\n                </li>\n            </ul>\n\n            <ul class=\"user-menu\" *ngIf=\"paymentStatus\">\n                <li class=\"dropdown pull-right\">\n                    <a class=\"dropdown-toggle\" data-toggle=\"dropdown\">\n                        <i class=\"fa fa-bell-o\"></i>\n                        <span class=\"label label-warning\">1</span>\n                        <i class=\"fa fa-angle-double-down fa-fw\"></i>\n                    </a>\n                    <ul class=\"dropdown-menu\" role=\"menu\">\n                        <li>\n                            <a>\n                                <div>\n                                    <i class=\"fa fa-flag fa-fw\"></i> You have not yet submitted your payment\n                                    <span class=\"pull-right text-muted small\"></span>\n                                </div>\n                            </a>\n                        </li>\n\n                        <li>\n                            <a>\n                                <div>\n                                    <i class=\"fa fa-exclamation fa-fw\"></i> Note: Late submission will attract 10% surcharge\n                                    <span class=\"pull-right text-muted small\"></span>\n                                </div>\n                            </a>\n                        </li>\n                        <li class=\"footer\" [routerLink]=\"['/payment/upload']\">\n                            <a>\n                                <i class=\"fa fa-sign-in fa-fw\" ></i>Click Here for Payment\n                            </a>\n                        </li>\n                    </ul>\n                </li>\n            </ul>\n\n        </div>\n    </div><!-- /.container-fluid -->\n</nav>\n\n<div id=\"sidebar-collapse\" class=\"col-sm-3 col-lg-2 sidebar\">\n\n    <ul class=\"nav menu\">\n\n        <!-- Dashboard Section -->\n        <li>\n            <a routerLinkActive=\"active\" [routerLink]=\"['/dashboard']\">\n                <img src=\"{{ base_url }}/images/dashboard-icon.png\"> Dashboard\n            </a>\n        </li>\n\n        <!-- <li role=\"presentation\" class=\"divider\"></li> -->\n\n        <!-- Province Section -->\n        <li class=\"parent \" *ngIf=\"showSidebar\">\n            <a data-toggle=\"collapse\" href=\"#sub-item-1\">\n                <img src=\"{{ base_url }}/images/province-icon.png\"> Province\n            </a>\n            <ul class=\"children collapse\" id=\"sub-item-1\">\n                <li>\n                    <a routerLinkActive=\"active\" [routerLink]=\"['/province/create']\">\n                        <i class=\"fa fa-fw fa-plus-square\"></i> Create\n                    </a>\n                </li>\n                <li>\n                    <a routerLinkActive=\"active\" [routerLink]=\"['/province/list']\">\n                        <i class=\"fa fa-fw fa-th-list\"></i> List\n                    </a>\n                </li>\n            </ul>\n        </li>\n\n        <!-- Zone Section -->\n        <li class=\"parent\" *ngIf=\"showSidebar\">\n            <a data-toggle=\"collapse\" href=\"#sub-item-2\">\n                <img src=\"{{ base_url }}/images/zone-icon.png\"> Zone\n            </a>\n            <ul class=\"children collapse\" id=\"sub-item-2\">\n                <li>\n                    <a routerLinkActive=\"active\" [routerLink]=\"['/zone/create']\">\n                        <i class=\"fa fa-fw fa-plus-square\"></i> Create\n                    </a>\n                </li>\n                <li>\n                    <a routerLinkActive=\"active\" [routerLink]=\"['/zone/list']\">\n                        <i class=\"fa fa-fw fa-th-list\"></i> List\n                    </a>\n                </li>\n            </ul>\n        </li>\n\n        <!-- Area Section -->\n        <li class=\"parent\" *ngIf=\"showSidebar\">\n            <a data-toggle=\"collapse\" href=\"#sub-item-3\">\n                <img src=\"{{ base_url }}/images/area-icon.png\"> Area\n            </a>\n            <ul class=\"children collapse\" id=\"sub-item-3\">\n                <li>\n                    <a routerLinkActive=\"active\" [routerLink]=\"['/area/create']\">\n                        <i class=\"fa fa-fw fa-plus-square\"></i> Create\n                    </a>\n                </li>\n                <li>\n                    <a routerLinkActive=\"active\" [routerLink]=\"['/area/list']\">\n                        <i class=\"fa fa-fw fa-th-list\"></i> List\n                    </a>\n                </li>\n            </ul>\n        </li>\n\n        <!-- <li role=\"presentation\" class=\"divider\" *ngIf=\"showSidebar\"></li> -->\n\n        <!-- Parish Section -->\n        <li class=\"parent\" *ngIf=\"showSidebar\">\n            <a data-toggle=\"collapse\" href=\"#parish-section\">\n                <img src=\"{{ base_url }}/images/church-icon.png\"> Parish\n            </a>\n            <ul class=\"children collapse\" id=\"parish-section\">\n                <li>\n                    <a routerLinkActive=\"active\" [routerLink]=\"['/parish/create']\">\n                        <i class=\"fa fa-fw fa-plus-square\"></i> Create\n                    </a>\n                </li>\n                <li>\n                    <a routerLinkActive=\"active\" [routerLink]=\"['/parish/list']\">\n                        <i class=\"fa fa-fw fa-th-list\"></i> List\n                    </a>\n                </li>\n            </ul>\n        </li>\n\n        <!-- <li role=\"presentation\" class=\"divider\" *ngIf=\"showSidebar\"></li> -->\n\n        <!-- Payment Section -->\n        <li class=\"parent\" *ngIf=\"!superAdmin\">\n            <a data-toggle=\"collapse\" href=\"#payment-section\">\n                <img src=\"{{ base_url }}/images/payment-icon.png\"> Payment\n            </a>\n            <ul class=\"children collapse\" id=\"payment-section\">\n                <li *ngIf=\"paymentOption\">\n                    <a routerLinkActive=\"active\" [routerLink]=\"['/payment/upload']\">\n                        <i class=\"fa fa-fw fa-plus-square\"></i> Upload\n                    </a>\n                </li>\n                <li>\n                    <a routerLinkActive=\"active\" [routerLink]=\"['/payment/list']\">\n                        <i class=\"fa fa-fw fa-th-list\"></i> List\n                    </a>\n                </li>\n            </ul>\n        </li>\n\n        <!-- Report Section -->\n        <li class=\"parent\" *ngIf=\"!superAdmin\">\n            <a data-toggle=\"collapse\" href=\"#report-section\">\n                <img src=\"{{ base_url }}/images/report-icon.png\">  Report\n            </a>\n            <ul class=\"children collapse\" id=\"report-section\">\n                <li *ngIf=\"paymentOption\">\n                    <a routerLinkActive=\"active\" [routerLink]=\"['/report/create']\">\n                        <i class=\"fa fa-fw fa-plus-square\"></i> Create\n                    </a>\n                </li>\n                <li>\n                    <a routerLinkActive=\"active\" [routerLink]=\"['/report/list']\">\n                        <i class=\"fa fa-fw fa-th-list\"></i> List\n                    </a>\n                </li>\n            </ul>\n        </li>\n\n        <!-- <li role=\"presentation\" class=\"divider\" *ngIf=\"showSidebar\"></li> -->\n\n\n        <!-- WEM Section -->\n        <li class=\"parent\" *ngIf=\"this.superAdmin\">\n            <a data-toggle=\"collapse\" href=\"#wem-section\">\n                <img src=\"{{ base_url }}/images/report-icon.png\">  Wem\n            </a>\n            <ul class=\"children collapse\" id=\"wem-section\">\n                <li>\n                    <a routerLinkActive=\"active\" [routerLink]=\"['/wem/list']\">\n                        <i class=\"fa fa-fw fa-th-list\"></i> List\n                    </a>\n                </li>\n                <li>\n                    <a routerLinkActive=\"active\" [routerLink]=\"['/parish/list']\">\n                        <i class=\"fa fa-fw fa-th-list\"></i> Parish List\n                    </a>\n                </li>\n            </ul>\n        </li>\n\n    </ul>\n</div><!--/.sidebar-->\n<div class=\"col-sm-9 col-sm-offset-3 col-lg-10 col-lg-offset-2 main\">\n    <!-- Main content -->\n    <div class=\"row\">\n        <ng2-auto-breadcrumb></ng2-auto-breadcrumb>\n    </div><!--/.row-->\n\n    <router-outlet></router-outlet>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/layout/full-layout.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "@media only screen and (max-width: 480px) {\n  .attribution {\n    position: relative; }\n  .sidebar {\n    position: fixed;\n    /* Set the navbar to fixed position */\n    top: 50px;\n    /* Position the navbar at the top of the page */\n    width: 100%;\n    z-index: 1;\n    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19); } }\n\n.navbar-toggle {\n  padding: initial !important; }\n\n.custom-nav-toggle {\n  padding: 5px 15px 5px 15px;\n  font-size: 20px; }\n\na {\n  cursor: pointer; }\n\n.sidebar {\n  background-color: #252525; }\n\n.nav > li > a {\n  color: #fff; }\n\n.navbar-inverse {\n  background: #1c1c1c; }\n\n.main .breadcrumb {\n  background: none;\n  box-shadow: none; }\n\n.fa-fw {\n  font-size: 20px; }\n\n.sidebar ul.nav a:hover, .sidebar ul.nav li.parent ul li a:hover, .nav > li > a:hover, .nav > li > a:focus {\n  background: #1c1c1c; }\n\n@media only screen and (max-width: 767px) {\n  .nav {\n    overflow-y: auto;\n    max-height: 420px; } }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/layout/full-layout.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FullLayoutComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__auth_auth_service__ = __webpack_require__("../../../../../src/app/auth/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment_prod__ = __webpack_require__("../../../../../src/environments/environment.prod.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__province_zone_area_parish_province_zone_area_parish_service__ = __webpack_require__("../../../../../src/app/province-zone-area-parish/province-zone-area-parish.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var FullLayoutComponent = (function () {
    function FullLayoutComponent(authService, router, pzapService) {
        this.authService = authService;
        this.router = router;
        this.pzapService = pzapService;
        this.toggleBarIcon = true;
        this.showSidebar = true;
        this.paymentOption = false;
        this.parishStatus = 0;
        this.superAdmin = false;
        this.paymentStatus = false;
        this.base_url = __WEBPACK_IMPORTED_MODULE_3__environments_environment_prod__["a" /* environment */].base_url;
    }
    FullLayoutComponent.prototype.ngOnInit = function () {
        var _this = this;
        var user_type = this.authService.getToken().user_type;
        this.userInformation = this.authService.getToken();
        /* user type: 0 => super admin , user type : 1 => WEM, user type: 2 => pastor(province, zone or area), user type: 3 => Parish */
        if (user_type != 1) {
            this.showSidebar = false;
            if (user_type == 3) {
                this.pzapService.getParish()
                    .subscribe(function (response) {
                    if (response.json().status) {
                        _this.parishStatus = response.json().parish.payment_status;
                        if (_this.parishStatus != 1) {
                            _this.paymentStatus = true;
                            _this.paymentOption = false;
                        }
                        else {
                            _this.paymentOption = true;
                        }
                    }
                }, function (error) {
                    if (error.status === 401) {
                        _this.authService.removeToken();
                        _this.router.navigate(['/login']);
                    }
                });
                this.superAdmin = false;
            }
            else if (user_type == 0) {
                this.superAdmin = true;
            }
            else {
                this.superAdmin = false;
            }
        }
    };
    FullLayoutComponent.prototype.onLogout = function () {
        var _this = this;
        var data = this.authService.getToken();
        this.authService.logout(data.token).subscribe(function (response) {
            localStorage.removeItem('loggedInUserData');
        }, function (error) {
            if (error.status === 401) {
                _this.authService.removeToken();
                _this.router.navigate(['/login']);
            }
        }, function () {
            _this.router.navigate(['/login']);
        });
    };
    FullLayoutComponent.prototype.toggle = function () {
        var self = this;
        setTimeout(function () {
            self.toggleBarIcon = !self.toggleBarIcon;
        }, 500);
    };
    return FullLayoutComponent;
}());
FullLayoutComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-dashboard',
        template: __webpack_require__("../../../../../src/app/layout/full-layout.component.html"),
        styles: [__webpack_require__("../../../../../src/app/layout/full-layout.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__auth_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__auth_auth_service__["a" /* AuthService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["d" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["d" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__province_zone_area_parish_province_zone_area_parish_service__["a" /* ProvinceZoneAreaParishService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__province_zone_area_parish_province_zone_area_parish_service__["a" /* ProvinceZoneAreaParishService */]) === "function" && _c || Object])
], FullLayoutComponent);

var _a, _b, _c;
//# sourceMappingURL=full-layout.component.js.map

/***/ }),

/***/ "../../../../../src/app/payment-details/payment.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PaymentService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__auth_auth_service__ = __webpack_require__("../../../../../src/app/auth/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment_prod__ = __webpack_require__("../../../../../src/environments/environment.prod.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Subject__ = __webpack_require__("../../../../rxjs/Subject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_Subject__);
/** Service created for upload payment */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var PaymentService = (function () {
    /** Injecting services to be used in this component */
    function PaymentService(http, authService) {
        this.http = http;
        this.authService = authService;
        /** Initializing custom Observables */
        this.closePromptEvent = new __WEBPACK_IMPORTED_MODULE_4_rxjs_Subject__["Subject"]();
        this.deleteEvent = new __WEBPACK_IMPORTED_MODULE_4_rxjs_Subject__["Subject"]();
        this.refreshList = new __WEBPACK_IMPORTED_MODULE_4_rxjs_Subject__["Subject"]();
        /** Initializing the different headers to be passed with each api call */
        this.headers = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["a" /* Headers */]({
            'X-Requested-With': 'XMLHttpRequest'
        });
        if (this.authService.isAuthenticated()) {
            this.refreshHeader();
        }
    }
    /** Refreshing the header for authenticated users */
    PaymentService.prototype.refreshHeader = function () {
        this.headers.set('Authorization', 'Bearer ' + this.authService.getToken().token);
    };
    /** Function to create a new payment */
    PaymentService.prototype.paymentCreate = function (body) {
        var headers = this.headers;
        headers.delete('Content-Type');
        return this.http.post(__WEBPACK_IMPORTED_MODULE_3__environments_environment_prod__["a" /* environment */].API_URL + 'payment/upload-payment', body, { headers: this.headers });
    };
    /** Get List of all payment  */
    PaymentService.prototype.listPayment = function (body) {
        var user_id = this.authService.getToken().user_id;
        var user_type = this.authService.getToken().user_type;
        return this.http.post(__WEBPACK_IMPORTED_MODULE_3__environments_environment_prod__["a" /* environment */].API_URL + 'payment/' + user_id + '/' + user_type, body, { headers: this.headers });
    };
    /** Function to change status of payment */
    PaymentService.prototype.paymentChangeStatus = function (body) {
        var headers = this.headers;
        headers.delete('Content-Type');
        return this.http.put(__WEBPACK_IMPORTED_MODULE_3__environments_environment_prod__["a" /* environment */].API_URL + 'payment/update-payment-status' + '/' + body.id, body, { headers: this.headers });
    };
    /** Function to delete an existing payment */
    PaymentService.prototype.deletePayment = function (payment_id) {
        var wem_id = this.authService.getToken().user_id;
        var api_url = __WEBPACK_IMPORTED_MODULE_3__environments_environment_prod__["a" /* environment */].API_URL + 'payment/delete/' + payment_id;
        return this.http.delete(api_url, { headers: this.headers });
    };
    return PaymentService;
}());
PaymentService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_http__["b" /* Http */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__auth_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__auth_auth_service__["a" /* AuthService */]) === "function" && _b || Object])
], PaymentService);

var _a, _b;
//# sourceMappingURL=payment.service.js.map

/***/ }),

/***/ "../../../../../src/app/profile-details/profile.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfileService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__auth_auth_service__ = __webpack_require__("../../../../../src/app/auth/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment_prod__ = __webpack_require__("../../../../../src/environments/environment.prod.ts");
/** Service created for show and update profile */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ProfileService = (function () {
    /** Injecting services to be used in this component */
    function ProfileService(http, authService) {
        this.http = http;
        this.authService = authService;
        /** Initializing the different headers to be passed with each api call */
        this.headers = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["a" /* Headers */]({
            'X-Requested-With': 'XMLHttpRequest'
        });
        if (this.authService.isAuthenticated()) {
            this.refreshHeader();
        }
    }
    /** Refreshing the header for authenticated users */
    ProfileService.prototype.refreshHeader = function () {
        this.headers.set('Authorization', 'Bearer ' + this.authService.getToken().token);
    };
    /** Edit an existing profile */
    ProfileService.prototype.editProfile = function (body) {
        var user_id = this.authService.getToken().user_id;
        var api_url = __WEBPACK_IMPORTED_MODULE_3__environments_environment_prod__["a" /* environment */].API_URL + 'user/edit/' + user_id;
        return this.http.put(api_url, body, { headers: this.headers });
    };
    /** Details of logged in profile */
    ProfileService.prototype.profileToEdit = function () {
        var user_id = this.authService.getToken().user_id;
        return this.http.get(__WEBPACK_IMPORTED_MODULE_3__environments_environment_prod__["a" /* environment */].API_URL + 'user/show-detail/' + user_id, { headers: this.headers });
    };
    /** Call to reset password for logged in user */
    ProfileService.prototype.resetPassword = function () {
        var user_id = this.authService.getToken().user_id;
        return this.http.get(__WEBPACK_IMPORTED_MODULE_3__environments_environment_prod__["a" /* environment */].API_URL + 'user/password-reset/' + user_id, { headers: this.headers });
    };
    /** Call to reset password for logged in user */
    ProfileService.prototype.resetUsername = function (body) {
        var user_id = this.authService.getToken().user_id;
        return this.http.post(__WEBPACK_IMPORTED_MODULE_3__environments_environment_prod__["a" /* environment */].API_URL + 'user/username-reset/' + user_id, body, { headers: this.headers });
    };
    return ProfileService;
}());
ProfileService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_http__["b" /* Http */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__auth_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__auth_auth_service__["a" /* AuthService */]) === "function" && _b || Object])
], ProfileService);

var _a, _b;
//# sourceMappingURL=profile.service.js.map

/***/ }),

/***/ "../../../../../src/app/province-zone-area-parish/province-zone-area-parish.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProvinceZoneAreaParishService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__ = __webpack_require__("../../../../rxjs/Subject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__auth_auth_service__ = __webpack_require__("../../../../../src/app/auth/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__environments_environment_prod__ = __webpack_require__("../../../../../src/environments/environment.prod.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ProvinceZoneAreaParishService = (function () {
    /** Injecting services to be used in this component */
    function ProvinceZoneAreaParishService(http, authService) {
        this.http = http;
        this.authService = authService;
        /** Initializing custom Observables */
        this.closePromptEvent = new __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__["Subject"]();
        this.deleteEvent = new __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__["Subject"]();
        this.refreshList = new __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__["Subject"]();
        /** Initializing the different headers to be passed with each api call */
        this.headers = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["a" /* Headers */]({
            'X-Requested-With': 'XMLHttpRequest'
        });
        if (this.authService.isAuthenticated()) {
            this.refreshHeader();
        }
    }
    /** Refreshing the header for authenticated users */
    ProvinceZoneAreaParishService.prototype.refreshHeader = function () {
        this.headers.set('Authorization', 'Bearer ' + this.authService.getToken().token);
    };
    /** Function to create a new province */
    ProvinceZoneAreaParishService.prototype.createProvince = function (body) {
        var obj = {
            user_id: this.authService.getToken().user_id
        };
        return this.http.post(__WEBPACK_IMPORTED_MODULE_4__environments_environment_prod__["a" /* environment */].API_URL + 'province/create', Object.assign(body, obj), { headers: this.headers });
    };
    /** Function to create a new zone */
    ProvinceZoneAreaParishService.prototype.createZone = function (body) {
        var obj = {
            user_id: this.authService.getToken().user_id
        };
        return this.http.post(__WEBPACK_IMPORTED_MODULE_4__environments_environment_prod__["a" /* environment */].API_URL + 'zone/create', Object.assign(body, obj), { headers: this.headers });
    };
    /** Function to create a new area */
    ProvinceZoneAreaParishService.prototype.createArea = function (body) {
        var obj = {
            user_id: this.authService.getToken().user_id
        };
        return this.http.post(__WEBPACK_IMPORTED_MODULE_4__environments_environment_prod__["a" /* environment */].API_URL + 'area/create', Object.assign(body, obj), { headers: this.headers });
    };
    /** Function to create a new parish */
    ProvinceZoneAreaParishService.prototype.createParish = function (body) {
        var obj = {
            user_id: this.authService.getToken().user_id
        };
        return this.http.post(__WEBPACK_IMPORTED_MODULE_4__environments_environment_prod__["a" /* environment */].API_URL + 'parish/create', Object.assign(body, obj), { headers: this.headers });
    };
    /** Fetch specific province data to edit */
    ProvinceZoneAreaParishService.prototype.provinceToEdit = function (province_id) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_4__environments_environment_prod__["a" /* environment */].API_URL + 'province/show-detail/' + province_id, { headers: this.headers });
    };
    /** Fetch specific zone data to edit */
    ProvinceZoneAreaParishService.prototype.zoneToEdit = function (zone_id) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_4__environments_environment_prod__["a" /* environment */].API_URL + 'zone/show-detail/' + zone_id, { headers: this.headers });
    };
    /** Fetch specific area data to edit */
    ProvinceZoneAreaParishService.prototype.areaToEdit = function (area_id) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_4__environments_environment_prod__["a" /* environment */].API_URL + 'area/show-detail/' + area_id, { headers: this.headers });
    };
    /** Fetch specific parish data to edit */
    ProvinceZoneAreaParishService.prototype.parishToEdit = function (parish_id) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_4__environments_environment_prod__["a" /* environment */].API_URL + 'parish/show-detail/' + parish_id, { headers: this.headers });
    };
    /** Edit an existing province */
    ProvinceZoneAreaParishService.prototype.editProvince = function (province_id, pastor_id, body) {
        var wem_id = this.authService.getToken().user_id;
        var api_url = __WEBPACK_IMPORTED_MODULE_4__environments_environment_prod__["a" /* environment */].API_URL + 'province/edit/' + pastor_id + '/' + wem_id + '/' + province_id;
        return this.http.put(api_url, body, { headers: this.headers });
    };
    /** Edit an existing zone */
    ProvinceZoneAreaParishService.prototype.editZone = function (zone_id, pastor_id, body) {
        var wem_id = this.authService.getToken().user_id;
        var api_url = __WEBPACK_IMPORTED_MODULE_4__environments_environment_prod__["a" /* environment */].API_URL + 'zone/edit/' + pastor_id + '/' + wem_id + '/' + zone_id;
        return this.http.put(api_url, body, { headers: this.headers });
    };
    /** Edit an existing area */
    ProvinceZoneAreaParishService.prototype.editArea = function (area_id, pastor_id, body) {
        var wem_id = this.authService.getToken().user_id;
        var api_url = __WEBPACK_IMPORTED_MODULE_4__environments_environment_prod__["a" /* environment */].API_URL + 'area/edit/' + pastor_id + '/' + wem_id + '/' + area_id;
        return this.http.put(api_url, body, { headers: this.headers });
    };
    /** Edit an existing parish */
    ProvinceZoneAreaParishService.prototype.editParish = function (parish_id, pastor_id, body) {
        var wem_id = this.authService.getToken().user_id;
        var api_url = __WEBPACK_IMPORTED_MODULE_4__environments_environment_prod__["a" /* environment */].API_URL + 'parish/edit/' + pastor_id + '/' + wem_id + '/' + parish_id;
        return this.http.put(api_url, body, { headers: this.headers });
    };
    /** Get List of all province for drop-down */
    ProvinceZoneAreaParishService.prototype.listProvince = function () {
        var user_id = this.authService.getToken().user_id;
        return this.http.get(__WEBPACK_IMPORTED_MODULE_4__environments_environment_prod__["a" /* environment */].API_URL + 'province/' + user_id, { headers: this.headers });
    };
    /** Function call for filtering zone based on different parameters i.e. province_id */
    ProvinceZoneAreaParishService.prototype.filterZone = function (body) {
        var obj = {
            user_id: this.authService.getToken().user_id
        };
        return this.http.post(__WEBPACK_IMPORTED_MODULE_4__environments_environment_prod__["a" /* environment */].API_URL + 'zone/filter-zone', Object.assign(body, obj), { headers: this.headers });
    };
    /** Function call for filtering area based on different parameters i.e. province_id, zone_id */
    ProvinceZoneAreaParishService.prototype.filterArea = function (body) {
        var obj = {
            user_id: this.authService.getToken().user_id
        };
        return this.http.post(__WEBPACK_IMPORTED_MODULE_4__environments_environment_prod__["a" /* environment */].API_URL + 'area/filter-area', Object.assign(body, obj), { headers: this.headers });
    };
    /** Function call for filtering parish based on different parameters i.e. province_id, zone_id, area_id  */
    ProvinceZoneAreaParishService.prototype.filterParish = function (body) {
        var obj = {
            user_id: this.authService.getToken().user_id
        };
        return this.http.post(__WEBPACK_IMPORTED_MODULE_4__environments_environment_prod__["a" /* environment */].API_URL + 'parish/filter-parish', Object.assign(body, obj), { headers: this.headers });
    };
    /** Function to delete an existing province */
    ProvinceZoneAreaParishService.prototype.deleteProvince = function (province_id) {
        var wem_id = this.authService.getToken().user_id;
        var api_url = __WEBPACK_IMPORTED_MODULE_4__environments_environment_prod__["a" /* environment */].API_URL + 'province/delete/' + wem_id + '/' + province_id;
        return this.http.delete(api_url, { headers: this.headers });
    };
    /** Function to delete an existing zone */
    ProvinceZoneAreaParishService.prototype.deleteZone = function (zone_id) {
        var wem_id = this.authService.getToken().user_id;
        var api_url = __WEBPACK_IMPORTED_MODULE_4__environments_environment_prod__["a" /* environment */].API_URL + 'zone/delete/' + wem_id + '/' + zone_id;
        return this.http.delete(api_url, { headers: this.headers });
    };
    /** Function to delete an existing area */
    ProvinceZoneAreaParishService.prototype.deleteArea = function (area_id) {
        var wem_id = this.authService.getToken().user_id;
        var api_url = __WEBPACK_IMPORTED_MODULE_4__environments_environment_prod__["a" /* environment */].API_URL + 'area/delete/' + wem_id + '/' + area_id;
        return this.http.delete(api_url, { headers: this.headers });
    };
    /** Delete an existing parish */
    ProvinceZoneAreaParishService.prototype.deleteParish = function (parish_id) {
        var wem_id = this.authService.getToken().user_id;
        var api_url = __WEBPACK_IMPORTED_MODULE_4__environments_environment_prod__["a" /* environment */].API_URL + 'parish/delete/' + parish_id;
        return this.http.delete(api_url, { headers: this.headers });
    };
    /**Add due date for the current month */
    ProvinceZoneAreaParishService.prototype.addDueDate = function (body) {
        var obj = {
            user_id: this.authService.getToken().user_id
        };
        var user_id = this.authService.getToken().user_id;
        return this.http.post(__WEBPACK_IMPORTED_MODULE_4__environments_environment_prod__["a" /* environment */].API_URL + 'parish/add-duedate/' + user_id, Object.assign(body, obj), { headers: this.headers });
    };
    /**Update penalty status for the parish */
    ProvinceZoneAreaParishService.prototype.updatePenalty = function (body) {
        var obj = {
            user_id: this.authService.getToken().user_id
        };
        var user_id = this.authService.getToken().user_id;
        return this.http.post(__WEBPACK_IMPORTED_MODULE_4__environments_environment_prod__["a" /* environment */].API_URL + 'parish/update-penalty/' + user_id, Object.assign(body, obj), { headers: this.headers });
    };
    /**Update payment */
    ProvinceZoneAreaParishService.prototype.updatePayment = function () {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_4__environments_environment_prod__["a" /* environment */].API_URL + 'parish/update-payment', { headers: this.headers });
    };
    /**Update penalty % for the parish  */
    ProvinceZoneAreaParishService.prototype.updatePenaltyPercentage = function (body) {
        var obj = {
            user_id: this.authService.getToken().user_id
        };
        var user_id = this.authService.getToken().user_id;
        return this.http.post(__WEBPACK_IMPORTED_MODULE_4__environments_environment_prod__["a" /* environment */].API_URL + 'parish/update-penalty-percentage/' + user_id, Object.assign(body, obj), { headers: this.headers });
    };
    /**Get penalty % for the parish  */
    ProvinceZoneAreaParishService.prototype.getPenalty = function () {
        var user_id = this.authService.getToken().user_id;
        return this.http.get(__WEBPACK_IMPORTED_MODULE_4__environments_environment_prod__["a" /* environment */].API_URL + 'parish/get-penalty/' + user_id, { headers: this.headers });
    };
    /**Get parish details */
    ProvinceZoneAreaParishService.prototype.getParish = function () {
        var user_id = this.authService.getToken().user_id;
        return this.http.get(__WEBPACK_IMPORTED_MODULE_4__environments_environment_prod__["a" /* environment */].API_URL + 'parish/get-parish/' + user_id, { headers: this.headers });
    };
    return ProvinceZoneAreaParishService;
}());
ProvinceZoneAreaParishService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_http__["b" /* Http */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__auth_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__auth_auth_service__["a" /* AuthService */]) === "function" && _b || Object])
], ProvinceZoneAreaParishService);

var _a, _b;
//# sourceMappingURL=province-zone-area-parish.service.js.map

/***/ }),

/***/ "../../../../../src/app/report/report.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReportService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__auth_auth_service__ = __webpack_require__("../../../../../src/app/auth/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__ = __webpack_require__("../../../../rxjs/Subject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__environments_environment_prod__ = __webpack_require__("../../../../../src/environments/environment.prod.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ReportService = (function () {
    /** Injecting services to be used in this component */
    function ReportService(http, authService) {
        this.http = http;
        this.authService = authService;
        /** Initializing custom Observables */
        this.generateReport = new __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__["Subject"]();
        this.refreshReportList = new __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__["Subject"]();
        /** Initializing the different headers to be passed with each api call */
        this.headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({
            'X-Requested-With': 'XMLHttpRequest'
        });
        if (this.authService.isAuthenticated()) {
            this.refreshHeader();
        }
    }
    /** Refreshing the header for authenticated users */
    ReportService.prototype.refreshHeader = function () {
        this.headers.set('Authorization', 'Bearer ' + this.authService.getToken().token);
    };
    /** Function to get a new report blueprint */
    ReportService.prototype.getReportBP = function (body) {
        var obj = {
            user_id: this.authService.getToken().user_id
        };
        return this.http.post(__WEBPACK_IMPORTED_MODULE_4__environments_environment_prod__["a" /* environment */].API_URL + 'report/all-report', Object.assign(body, obj), { headers: this.headers });
    };
    /** Function to send a new report */
    ReportService.prototype.sendReport = function (body) {
        var obj = {
            user_id: this.authService.getToken().user_id
        };
        return this.http.post(__WEBPACK_IMPORTED_MODULE_4__environments_environment_prod__["a" /* environment */].API_URL + 'report/create', Object.assign(body, obj), { headers: this.headers });
    };
    /** Function to send a new report */
    ReportService.prototype.viewReport = function (report_id) {
        var obj = {
            user_id: this.authService.getToken().user_id
        };
        return this.http.get(__WEBPACK_IMPORTED_MODULE_4__environments_environment_prod__["a" /* environment */].API_URL + 'report/view-report/' + report_id, { headers: this.headers });
    };
    /** Function to get list of all reports */
    ReportService.prototype.getReports = function (body) {
        var user_id = this.authService.getToken().user_id;
        var user_type = this.authService.getToken().user_type;
        return this.http.post(__WEBPACK_IMPORTED_MODULE_4__environments_environment_prod__["a" /* environment */].API_URL + 'report/filter-report/' + user_id + '/' + user_type, body, { headers: this.headers });
    };
    /** Function to get detail of single report */
    ReportService.prototype.fetchReport = function (body) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_4__environments_environment_prod__["a" /* environment */].API_URL + 'report/fetch-report', body, { headers: this.headers });
    };
    /** Function to get view of specific report */
    ReportService.prototype.reportToEdit = function (report_id) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_4__environments_environment_prod__["a" /* environment */].API_URL + 'report/view-report/' + report_id, { headers: this.headers });
    };
    /** Function to edit a report */
    ReportService.prototype.updateReport = function (body, id) {
        var obj = {
            user_id: this.authService.getToken().user_id
        };
        return this.http.put(__WEBPACK_IMPORTED_MODULE_4__environments_environment_prod__["a" /* environment */].API_URL + 'report/update-report/' + id, Object.assign(body, obj), { headers: this.headers });
    };
    /** Delete an existing report */
    ReportService.prototype.deleteReport = function (report_id) {
        var api_url = __WEBPACK_IMPORTED_MODULE_4__environments_environment_prod__["a" /* environment */].API_URL + 'report/delete/' + report_id;
        return this.http.delete(api_url, { headers: this.headers });
    };
    /** Accept or reject an existing report */
    ReportService.prototype.acceptReport = function (body) {
        var obj = {
            user_id: this.authService.getToken().user_id
        };
        var api_url = __WEBPACK_IMPORTED_MODULE_4__environments_environment_prod__["a" /* environment */].API_URL + 'report/accept-report/' + body.id;
        return this.http.put(api_url, Object.assign(body, obj), { headers: this.headers });
    };
    return ReportService;
}());
ReportService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__auth_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__auth_auth_service__["a" /* AuthService */]) === "function" && _b || Object])
], ReportService);

var _a, _b;
//# sourceMappingURL=report.service.js.map

/***/ }),

/***/ "../../../../../src/app/shared/edit-province-zone-area/edit-province-zone-area.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/shared/edit-province-zone-area/edit-province-zone-area.component.html":
/***/ (function(module, exports) {

module.exports = "<h1>Edit works!</h1>\n<h3>{{data}}</h3>"

/***/ }),

/***/ "../../../../../src/app/shared/edit-province-zone-area/edit-province-zone-area.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EditProvinceZoneAreaComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var EditProvinceZoneAreaComponent = (function () {
    function EditProvinceZoneAreaComponent(activatedRoute) {
        this.activatedRoute = activatedRoute;
        this.data = '';
    }
    EditProvinceZoneAreaComponent.prototype.ngOnInit = function () {
        var _this = this;
        // this.data = this.activatedRoute.snapshot.data['editMode'];
        this.activatedRoute.data.subscribe(function (data) {
            _this.data = data['editMode'];
        });
    };
    return EditProvinceZoneAreaComponent;
}());
EditProvinceZoneAreaComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-edit-province-zone-area',
        template: __webpack_require__("../../../../../src/app/shared/edit-province-zone-area/edit-province-zone-area.component.html"),
        styles: [__webpack_require__("../../../../../src/app/shared/edit-province-zone-area/edit-province-zone-area.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _a || Object])
], EditProvinceZoneAreaComponent);

var _a;
//# sourceMappingURL=edit-province-zone-area.component.js.map

/***/ }),

/***/ "../../../../../src/app/shared/prompt/prompt.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".alert {\n    position: fixed;\n    top: 8%;\n    left: auto;\n    right:10px;\n    width:auto;\n    font-size: 23px;\n/*  \ttransform: translate(-50%, -50%);*/\n    text-align: center;\n    padding: 25px;\n    background-color: #f44336;\n    color: white;\n    opacity: 1;\n    transition: opacity 0.6s;\n    z-index: 3;\n    cursor: pointer;\n    border-radius: 5px;\n}\n\n/*.alert.success {*/\n    /*background-color: #4CAF50;*/\n/*}*/\n\n/*.alert.info {*/\n    /*background-color: #2196F3;*/\n/*}*/\n\n.close-btn{\n    margin-left: 15px;\n    color: black;\n    font-weight: bold;\n    float: right;\n    font-size: 23px;\n    position: absolute;\n    top: -6px;\n    right: 6px;\n    cursor: pointer;\n    transition: 0.3s;\n}\n.close-btn:hover{\n    color: red;\n}\n\n.alert-middle {\n    background: rgba(0, 0, 0, 0.7);\n    border-radius: 5px;\n    font-size: 23px;\n    left: 0;\n    right:0;\n    bottom:0;\n    opacity: 1;\n    padding: 25px;\n    position: fixed;\n    right: 10px;\n    text-align: center;\n    top: 0;\n    transition: opacity 0.6s ease 0s;\n    width: auto;\n    z-index: 3;\n}\n\n.alert-middle-main {\n    background:#fff;\n    width: 500px;\n    margin: 0 auto;\n    padding: 15px;\n    color: #000;\n    min-height: 300px;\n    padding-top: 70px;\n    position:fixed;\n    border-radius:4px;\n    top: 50%;\n    left: 50%;\n    margin-top: -150px;\n    margin-left: -250px;\n}\n\n.alert-middle.closebtn{\n    color: #000;\n}\n\n.alert-middle.closebtn:hover {\n    color: #fd7c02;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/shared/prompt/prompt.component.html":
/***/ (function(module, exports) {

module.exports = "<!-- Pop Up -->\n<div class=\"row\">\n\n    <div class=\"col-md-6\">\n\n        <!-- Popup -->\n        <div class=\"alert-middle\">\n\n            <div class=\"alert-middle-main\">\n                <h4 *ngIf=\"calledFrom=='Province'\">\n                    Deleting this Province will Delete all related <strong>Zones</strong> as well as <strong>Areas</strong> and Parishes.<br/>\n                    Are you sure you want to delete this<br/>\n                    <strong>{{calledFrom}}</strong>?\n                </h4>\n\n                <h4 *ngIf=\"calledFrom=='Zone'\">\n                    Deleting this Zone will Delete all related <strong>Areas</strong> and Parishes.<br/>\n                    Are you sure you want to delete this<br/>\n                    <strong>{{calledFrom}}</strong>?\n                </h4>\n\n                <h4 *ngIf=\"calledFrom=='Area'\">\n                    Deleting this Area will Delete all related <strong>Parishes</strong>.<br/>\n                    Are you sure you want to delete this<br/>\n                    <strong>{{calledFrom}}</strong>?\n                </h4>\n\n                <h4 *ngIf=\"calledFrom=='Parish'\">\n                    Are you sure you want to delete this<br/>\n                    <strong>{{calledFrom}}</strong>?\n                </h4>\n\n                <h4 *ngIf=\"calledFrom=='Payment'\">\n                    Are you sure you want to delete this<br/>\n                    <strong>{{calledFrom}}</strong>?\n                </h4>\n\n                <span class=\"close-btn\" (click)=\"hidePrompt()\">&times;</span>\n                <div class=btn-confirm>\n                    <button class=\"btn btn-primary\" (click)=\"deletePrompt()\">Confirm</button>\n                    <button class=\"btn btn-danger\" (click)=\"hidePrompt()\">Cancel</button>\n                </div>\n\n            </div>\n\n        </div>\n\n    </div>\n\n</div>\n\n"

/***/ }),

/***/ "../../../../../src/app/shared/prompt/prompt.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PromptComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__province_zone_area_parish_province_zone_area_parish_service__ = __webpack_require__("../../../../../src/app/province-zone-area-parish/province-zone-area-parish.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__payment_details_payment_service__ = __webpack_require__("../../../../../src/app/payment-details/payment.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var PromptComponent = (function () {
    function PromptComponent(pzapService, payservice) {
        this.pzapService = pzapService;
        this.payservice = payservice;
    }
    PromptComponent.prototype.hidePrompt = function () {
        this.pzapService.closePromptEvent.next();
        this.payservice.closePromptEvent.next();
    };
    PromptComponent.prototype.deletePrompt = function () {
        this.pzapService.deleteEvent.next(this.itemInfo.id);
        this.payservice.deleteEvent.next(this.itemInfo.id);
    };
    return PromptComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('calledFrom'),
    __metadata("design:type", Object)
], PromptComponent.prototype, "calledFrom", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('itemInfo'),
    __metadata("design:type", Object)
], PromptComponent.prototype, "itemInfo", void 0);
PromptComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-prompt',
        template: __webpack_require__("../../../../../src/app/shared/prompt/prompt.component.html"),
        styles: [__webpack_require__("../../../../../src/app/shared/prompt/prompt.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__province_zone_area_parish_province_zone_area_parish_service__["a" /* ProvinceZoneAreaParishService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__province_zone_area_parish_province_zone_area_parish_service__["a" /* ProvinceZoneAreaParishService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__payment_details_payment_service__["a" /* PaymentService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__payment_details_payment_service__["a" /* PaymentService */]) === "function" && _b || Object])
], PromptComponent);

var _a, _b;
//# sourceMappingURL=prompt.component.js.map

/***/ }),

/***/ "../../../../../src/app/shared/shared.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SharedModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__edit_province_zone_area_edit_province_zone_area_component__ = __webpack_require__("../../../../../src/app/shared/edit-province-zone-area/edit-province-zone-area.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__prompt_prompt_component__ = __webpack_require__("../../../../../src/app/shared/prompt/prompt.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var SharedModule = (function () {
    function SharedModule() {
    }
    return SharedModule;
}());
SharedModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
        imports: [__WEBPACK_IMPORTED_MODULE_0__angular_common__["CommonModule"]],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_3__prompt_prompt_component__["a" /* PromptComponent */],
            __WEBPACK_IMPORTED_MODULE_2__edit_province_zone_area_edit_province_zone_area_component__["a" /* EditProvinceZoneAreaComponent */]
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_3__prompt_prompt_component__["a" /* PromptComponent */],
            __WEBPACK_IMPORTED_MODULE_2__edit_province_zone_area_edit_province_zone_area_component__["a" /* EditProvinceZoneAreaComponent */]
        ]
    })
], SharedModule);

//# sourceMappingURL=shared.module.js.map

/***/ }),

/***/ "../../../../../src/app/wem-list/wem.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WemService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__auth_auth_service__ = __webpack_require__("../../../../../src/app/auth/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment_prod__ = __webpack_require__("../../../../../src/environments/environment.prod.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Subject__ = __webpack_require__("../../../../rxjs/Subject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_Subject__);
/** Service created for show and update wem-list */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var WemService = (function () {
    /** Injecting services to be used in this component */
    function WemService(http, authService) {
        this.http = http;
        this.authService = authService;
        this.refreshList = new __WEBPACK_IMPORTED_MODULE_4_rxjs_Subject__["Subject"]();
        /** Initializing the different headers to be passed with each api call */
        this.headers = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["a" /* Headers */]({
            'X-Requested-With': 'XMLHttpRequest'
        });
        if (this.authService.isAuthenticated()) {
            this.refreshHeader();
        }
    }
    /** Refreshing the header for authenticated users */
    WemService.prototype.refreshHeader = function () {
        this.headers.set('Authorization', 'Bearer ' + this.authService.getToken().token);
    };
    /** Get List of all WEM */
    WemService.prototype.listWEM = function () {
        var user_id = this.authService.getToken().user_id;
        return this.http.get(__WEBPACK_IMPORTED_MODULE_3__environments_environment_prod__["a" /* environment */].API_URL + 'user/wem-list/' + user_id, { headers: this.headers });
    };
    /** Change status of WEM */
    WemService.prototype.changeStatus = function (body) {
        var super_admin_id = this.authService.getToken().user_id;
        var api_url = __WEBPACK_IMPORTED_MODULE_3__environments_environment_prod__["a" /* environment */].API_URL + 'user/change-status/' + super_admin_id;
        return this.http.post(api_url, body, { headers: this.headers });
    };
    /** Update Wem Percentage */
    WemService.prototype.editWemPercentage = function (body) {
        var user_id = this.authService.getToken().user_id;
        var api_url = __WEBPACK_IMPORTED_MODULE_3__environments_environment_prod__["a" /* environment */].API_URL + 'user/wem-percentage-update/' + user_id;
        return this.http.put(api_url, body, { headers: this.headers });
    };
    return WemService;
}());
WemService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_http__["b" /* Http */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__auth_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__auth_auth_service__["a" /* AuthService */]) === "function" && _b || Object])
], WemService);

var _a, _b;
//# sourceMappingURL=wem.service.js.map

/***/ }),

/***/ "../../../../../src/environments/environment.prod.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
var environment = {
    production: true,
    API_URL: 'http://parish.local/api/v1/',
    base_url: 'http://parish.local',
    stripeKey: 'pk_test_SIRpnt5y8OAGeLprrzbQKrKd'
};
//# sourceMappingURL=environment.prod.js.map

/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/@angular/platform-browser-dynamic.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["enableProdMode"])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map