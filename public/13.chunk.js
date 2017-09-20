webpackJsonp([13],{

/***/ "../../../../../src/app/widgets/charts/charts-routing.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__charts_component__ = __webpack_require__("../../../../../src/app/widgets/charts/charts.component.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChartsWidgetRoutingModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Created by mohma on 7/26/2017.
 */



var routes = [
    {
        path: '',
        component: __WEBPACK_IMPORTED_MODULE_2__charts_component__["a" /* ChartsWidgetComponent */],
        data: {
            title: 'Charts'
        }
    }
];
var ChartsWidgetRoutingModule = (function () {
    function ChartsWidgetRoutingModule() {
    }
    return ChartsWidgetRoutingModule;
}());
ChartsWidgetRoutingModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* RouterModule */].forChild(routes)],
        exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* RouterModule */]]
    })
], ChartsWidgetRoutingModule);

//# sourceMappingURL=charts-routing.js.map

/***/ }),

/***/ "../../../../../src/app/widgets/charts/charts.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChartsWidgetComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Created by mohma on 7/26/2017.
 */

var ChartsWidgetComponent = (function () {
    function ChartsWidgetComponent() {
        /*LineChart*/
        this.lineChartData = [
            { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
            { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
            { data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C' }
        ];
        this.lineChartLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
        this.lineChartOptions = {
            responsive: true
        };
        this.lineChartColors = [
            {
                backgroundColor: 'rgba(148,159,177,0.2)',
                borderColor: 'rgba(148,159,177,1)',
                pointBackgroundColor: 'rgba(148,159,177,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(148,159,177,0.8)'
            },
            {
                backgroundColor: 'rgba(77,83,96,0.2)',
                borderColor: 'rgba(77,83,96,1)',
                pointBackgroundColor: 'rgba(77,83,96,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(77,83,96,1)'
            },
            {
                backgroundColor: 'rgba(148,159,177,0.2)',
                borderColor: 'rgba(148,159,177,1)',
                pointBackgroundColor: 'rgba(148,159,177,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(148,159,177,0.8)'
            }
        ];
        this.lineChartLegend = true;
        this.lineChartType = 'line';
        /*Bar Chart*/
        this.barChartOptions = {
            scaleShowVerticalLines: false,
            responsive: true
        };
        this.barChartLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
        this.barChartType = 'bar';
        this.barChartLegend = true;
        this.barChartData = [
            { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
            { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
        ];
        // Doughnut
        this.doughnutChartLabels = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
        this.doughnutChartData = [350, 450, 100];
        this.doughnutChartType = 'doughnut';
        this.pieChartType = 'pie';
    }
    // events
    ChartsWidgetComponent.prototype.chartClicked = function (e) {
        console.log(e);
    };
    ChartsWidgetComponent.prototype.chartHovered = function (e) {
        console.log(e);
    };
    return ChartsWidgetComponent;
}());
ChartsWidgetComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        template: __webpack_require__("../../../../../src/app/widgets/charts/charts.html"),
        selector: 'charts-widgets'
    }),
    __metadata("design:paramtypes", [])
], ChartsWidgetComponent);

//# sourceMappingURL=charts.component.js.map

/***/ }),

/***/ "../../../../../src/app/widgets/charts/charts.html":
/***/ (function(module, exports) {

module.exports = "\n\n<div class=\"row\">\n  <div class=\"col-lg-12\">\n    <h1 class=\"page-header\">Charts</h1>\n  </div>\n</div><!--/.row-->\n\n<div class=\"row\">\n  <div class=\"col-md-6\">\n    <div class=\"panel panel-default\">\n      <div class=\"panel-heading\">\n        Line Chart\n      </div>\n      <div class=\"panel-body\">\n        <canvas baseChart width=\"100\" height=\"50\"\n                [datasets]=\"lineChartData\"\n                [labels]=\"lineChartLabels\"\n                [options]=\"lineChartOptions\"\n                [colors]=\"lineChartColors\"\n                [legend]=\"lineChartLegend\"\n                [chartType]=\"lineChartType\"\n                (chartHover)=\"chartHovered($event)\"\n                (chartClick)=\"chartClicked($event)\"></canvas>      </div>\n    </div>\n  </div>\n  <div class=\"col-md-6\">\n    <div class=\"panel panel-default\">\n      <div class=\"panel-heading\">\n        Bar Chart\n      </div>\n      <div class=\"panel-body\">\n        <canvas baseChart width=\"100\" height=\"50\"\n                [datasets]=\"barChartData\"\n                [labels]=\"barChartLabels\"\n                [options]=\"barChartOptions\"\n                [legend]=\"barChartLegend\"\n                [chartType]=\"barChartType\"\n                (chartHover)=\"chartHovered($event)\"\n                (chartClick)=\"chartClicked($event)\"></canvas>\n      </div>\n    </div>\n  </div>\n</div><!--/.row-->\n\n\n\n<div class=\"row\">\n  <div class=\"col-md-6\">\n    <div class=\"panel panel-default\">\n      <div class=\"panel-heading\">\n        Line Chart\n      </div>\n      <div class=\"panel-body\">\n        <canvas baseChart width=\"100\" height=\"50\"\n                [data]=\"doughnutChartData\"\n                [labels]=\"doughnutChartLabels\"\n                [chartType]=\"doughnutChartType\"\n                (chartHover)=\"chartHovered($event)\"\n                (chartClick)=\"chartClicked($event)\"></canvas>\n      </div>\n    </div>\n  </div>\n  <div class=\"col-md-6\">\n    <div class=\"panel panel-default\">\n      <div class=\"panel-heading\">\n        Bar Chart\n      </div>\n      <div class=\"panel-body\">\n        <canvas baseChart width=\"100\" height=\"50\"\n                [data]=\"doughnutChartData\"\n                [labels]=\"doughnutChartLabels\"\n                [chartType]=\"pieChartType\"\n                (chartHover)=\"chartHovered($event)\"\n                (chartClick)=\"chartClicked($event)\"></canvas>\n      </div>\n    </div>\n  </div>\n</div><!--/.row-->\n"

/***/ }),

/***/ "../../../../../src/app/widgets/charts/charts.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__charts_component__ = __webpack_require__("../../../../../src/app/widgets/charts/charts.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__charts_routing__ = __webpack_require__("../../../../../src/app/widgets/charts/charts-routing.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ng2_charts__ = __webpack_require__("../../../../ng2-charts/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ng2_charts___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_ng2_charts__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChartsWidgetModule", function() { return ChartsWidgetModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Created by mohma on 7/26/2017.
 */






var ChartsWidgetModule = (function () {
    function ChartsWidgetModule() {
    }
    return ChartsWidgetModule;
}());
ChartsWidgetModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormsModule */], __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* ReactiveFormsModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_common__["CommonModule"],
            __WEBPACK_IMPORTED_MODULE_4__charts_routing__["a" /* ChartsWidgetRoutingModule */],
            __WEBPACK_IMPORTED_MODULE_5_ng2_charts__["ChartsModule"]
        ],
        declarations: [__WEBPACK_IMPORTED_MODULE_3__charts_component__["a" /* ChartsWidgetComponent */]],
        providers: []
    })
], ChartsWidgetModule);

//# sourceMappingURL=charts.module.js.map

/***/ })

});
//# sourceMappingURL=13.chunk.js.map