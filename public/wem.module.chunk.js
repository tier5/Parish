webpackJsonp(["wem.module"],{

/***/ "../../../../../src/app/wem-list/wem-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WemRoutingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__wem_wem_component__ = __webpack_require__("../../../../../src/app/wem-list/wem/wem.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var wemRoutes = [
    { path: 'list', component: __WEBPACK_IMPORTED_MODULE_2__wem_wem_component__["a" /* WemComponent */] }
];
var WemRoutingModule = (function () {
    function WemRoutingModule() {
    }
    return WemRoutingModule;
}());
WemRoutingModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["e" /* RouterModule */].forChild(wemRoutes)],
        exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["e" /* RouterModule */]]
    })
], WemRoutingModule);

//# sourceMappingURL=wem-routing.module.js.map

/***/ }),

/***/ "../../../../../src/app/wem-list/wem.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WemModule", function() { return WemModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__wem_routing_module__ = __webpack_require__("../../../../../src/app/wem-list/wem-routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__wem_wem_component__ = __webpack_require__("../../../../../src/app/wem-list/wem/wem.component.ts");
/** module to load component and route for show and edit profile **/
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var WemModule = (function () {
    function WemModule() {
    }
    return WemModule;
}());
WemModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
        declarations: [__WEBPACK_IMPORTED_MODULE_4__wem_wem_component__["a" /* WemComponent */]],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_common__["CommonModule"],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormsModule"],
            __WEBPACK_IMPORTED_MODULE_3__wem_routing_module__["a" /* WemRoutingModule */]
        ],
        providers: []
    })
], WemModule);

//# sourceMappingURL=wem.module.js.map

/***/ }),

/***/ "../../../../../src/app/wem-list/wem/wem.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/wem-list/wem/wem.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n    <div class=\"col-lg-12\">\n        <h3 class=\"page-header\">Wem - List</h3>\n    </div>\n</div><!--/.row-->\n\n<div class=\"row\">\n    <div class=\"col-sm-12\">\n        <div class=\"panel panel-default\">\n            <div class=\"panel-heading\">\n                Wem List\n            </div>\n            <div class=\"panel-body overflowFix\">\n\n                <!-- Message Section -->\n                <div class=\"row\">\n                    <div class=\"col-lg-12\">\n                        <div *ngIf=\"!responseStatus && responseReceived\" class=\"alert alert-danger\">\n                            <strong>{{ responseMsg }}</strong>\n                        </div>\n                    </div>\n                    <div class=\"col-lg-12\">\n                        <div *ngIf=\"responseStatus && responseReceived\" class=\"alert alert-success\">\n                            <strong>{{ responseMsg }}</strong>\n                        </div>\n                    </div>\n                </div>\n\n                <div class=\"table-responsive\">\n                    <table class=\"table table-hover table-condensed\">\n                        <thead>\n                        <tr>\n                            <th>First Name</th>\n                            <th>Last Name</th>\n                            <th>Email</th>\n                            <th>Status</th>\n                            <th>Percentage</th>\n                            <th>Actions</th>\n                        </tr>\n                        </thead>\n                        <tbody>\n                        <tr *ngFor=\"let wem of wemData\">\n                            <td>{{ wem.first_name }}</td>\n                            <td>{{ wem.last_name }}</td>\n                            <td>{{ wem.email }}</td>\n                            <td>{{ wem.status_user }}</td>\n                            <td><input type=\"text\" name=\"percentage\" value=\"{{ wem.percentage }}\" [(ngModel)]=\"wem.percentage\">\n                                <button\n                                    class=\"btn btn-warning btn-xs\"\n                                    type=\"button\" (click)=\"updatePercentage(wem)\" >\n                                <i class=\"fa fa-pencil-square-o\" aria-hidden=\"true\"></i>\n                            </button></td>\n                            <td>\n                                <button\n                                        class=\"btn btn-success btn-xs\"\n                                        type=\"button\" *ngIf=\"wem.hold\" title=\"Click to Hold this account\" (click)=\"changeUserStatus(wem)\">\n                                    <i class=\"fa fa-thumbs-o-up\" aria-hidden=\"true\"></i>\n                                </button>\n                                <button\n                                        class=\"btn btn-danger btn-xs\"\n                                        type=\"button\" *ngIf=\"!wem.hold\" title=\"Click to put on Exemption this account\" (click)=\"changeUserStatus(wem)\">\n                                    <i class=\"fa fa-hand-paper-o\" aria-hidden=\"true\"></i>\n                                </button>\n                                \n                            </td>\n                        </tr>\n                        <tr *ngIf=\"!wemData\">\n                            {{ 'No WEM Found!' }}\n                        </tr>\n                        </tbody>\n                    </table>\n                </div>\n\n            </div>\n        </div>\n    </div>\n</div><!--/.row-->\n"

/***/ }),

/***/ "../../../../../src/app/wem-list/wem/wem.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WemComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__auth_auth_service__ = __webpack_require__("../../../../../src/app/auth/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__wem_service__ = __webpack_require__("../../../../../src/app/wem-list/wem.service.ts");
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




var WemComponent = (function () {
    /** Injecting services to be used in this component */
    function WemComponent(wemService, activatedRoute, authService, router) {
        this.wemService = wemService;
        this.activatedRoute = activatedRoute;
        this.authService = authService;
        this.router = router;
        this.wemData = [];
        this.responseReceived = false;
        this.responseStatus = false;
        this.activateReset = true;
        this.responseMsg = '';
        this.showLoader = false;
        this.isAdmin = false;
    }
    WemComponent.prototype.ngOnInit = function () {
        var _this = this;
        /** checking for admin */
        var user_type = this.authService.getToken().user_type;
        if (user_type == 1) {
            this.isAdmin = true;
        }
        /** Subscribe to event to refresh wem list */
        this.refreshWemListSubscription = this.wemService.refreshList
            .subscribe(function () {
            _this.wemService.listWEM()
                .subscribe(function (response) {
                _this.wemData = response.json().wem;
                _this.wemData.forEach(function (item) {
                    var user_status = (item.status == 0) ? 'On Hold' : 'On Exemption';
                    item.status_user = user_status;
                    item.hold = (item.status == 0) ? false : true;
                });
            }, function (error) {
                if (error.status === 401) {
                    _this.authService.removeToken();
                    _this.router.navigate(['/login']);
                }
                _this.responseStatus = false;
                _this.responseReceived = true;
                _this.wemData = [];
                _this.responseMsg = error.json().error;
            });
        });
        /** Emitting event which will refresh the payment list */
        this.wemService.refreshList.next();
    };
    /** Function to change status of WEM by superadmin */
    WemComponent.prototype.changeUserStatus = function (wem) {
        var _this = this;
        this.wemService.changeStatus(wem)
            .subscribe(function (response) {
            _this.responseStatus = response.json().status;
            _this.responseMsg = response.json().message;
            _this.wemService.refreshList.next({});
        }, function (error) {
            if (error.status === 401) {
                _this.authService.removeToken();
                _this.router.navigate(['/login']);
            }
            _this.responseStatus = false;
            _this.responseReceived = true;
        });
    };
    /** Function to add percentage for WEM by superadmin */
    WemComponent.prototype.updatePercentage = function (wem) {
        var _this = this;
        this.wemService.editWemPercentage(wem)
            .subscribe(function (response) {
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
    WemComponent.prototype.ngOnDestroy = function () {
        this.refreshWemListSubscription.unsubscribe();
    };
    return WemComponent;
}());
WemComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-wem',
        template: __webpack_require__("../../../../../src/app/wem-list/wem/wem.component.html"),
        styles: [__webpack_require__("../../../../../src/app/wem-list/wem/wem.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__wem_service__["a" /* WemService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__wem_service__["a" /* WemService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* ActivatedRoute */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__auth_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__auth_auth_service__["a" /* AuthService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["d" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["d" /* Router */]) === "function" && _d || Object])
], WemComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=wem.component.js.map

/***/ })

});
//# sourceMappingURL=wem.module.chunk.js.map