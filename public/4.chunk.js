webpackJsonp([4],{

/***/ "../../../../../src/app/components/alert/alert.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"alert\" role=\"alert\" [style.background]=\"color\" [style.color]=\"font\" [hidden]=\"alertHidden\" [style.opacity]=\"opacity\">\n  {{text}} <i (click)=\"dismiss()\" class=\"fa fa-remove fa-fw pull-right\"></i>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/components/alert/alert.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AlertComponent; });
/**
 * Created by mohma on 7/29/2017.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AlertComponent = (function () {
    function AlertComponent() {
        this.color = "#ec045b";
        this.font = "#ececec";
        this.text = "Alert";
        this.opacity = 0;
        this.alertHidden = true;
    }
    AlertComponent.prototype.ngOnInit = function () {
        var self = this;
        setTimeout(function () {
            self.alertHidden = false;
            setInterval(function () {
                self.opacity += 0.1;
                //if(self.opacity===1.0)
            }, 70);
        }, 500);
    };
    AlertComponent.prototype.dismiss = function () {
        this.alertHidden = true;
    };
    return AlertComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('color'),
    __metadata("design:type", String)
], AlertComponent.prototype, "color", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('fontColor'),
    __metadata("design:type", String)
], AlertComponent.prototype, "font", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('text'),
    __metadata("design:type", String)
], AlertComponent.prototype, "text", void 0);
AlertComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        template: __webpack_require__("../../../../../src/app/components/alert/alert.component.html"),
        selector: 'alert',
    })
], AlertComponent);

//# sourceMappingURL=alert.component.js.map

/***/ }),

/***/ "../../../../../src/app/components/calendar/calendar.component.html":
/***/ (function(module, exports) {

module.exports = "<!--\n  Theme: PaperAdmin V1\n  Author: https://github.com/mohdrashid\n  Custom plugin\n-->\n<div class=\"panel\" [style.background]=\"properties['color']\" [style.color]=\"properties['font']\">\n  <div class=\"panel-heading dark-overlay\">\n    <i class=\"{{properties['icon']}}\" style=\"margin-right: 10px\"></i>{{properties['label']}}\n  </div>\n  <div class=\"panel-body\">\n    <div id=\"{{properties['id']}}\" (click)=\"onCalendarClick($event)\"></div>\n  </div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/components/calendar/calendar.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__calendar__ = __webpack_require__("../../../../../src/app/components/calendar/calendar.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__calendar___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__calendar__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CalendarComponent; });
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
 * Created by mohma on 7/27/2017.
 */


var CalendarComponent = (function () {
    function CalendarComponent() {
        this.properties = { color: "red", icon: "fa fa-calendar", label: "Calendar", font: "#ececec", id: "calendar1", click: function ($event) {
                console.log($event);
            } };
    }
    CalendarComponent.prototype.ngOnInit = function () {
        this.properties.icon += " fa-fw";
    };
    CalendarComponent.prototype.ngAfterViewInit = function () {
        $("#" + this.properties.id).datepicker({});
    };
    /**
     *
     * @param $event: Event details generated from click event
     * Passes object of type JSON to callback
     * Sample: Object {event: MouseEvent, value: "13", month: "July", year: "2017"}
     */
    CalendarComponent.prototype.onCalendarClick = function ($event) {
        var data = { event: $event, value: $event['target']['innerText'] };
        var chosen = $(".datepicker-switch")[0].innerText.split(" ");
        data['month'] = chosen[0];
        data['year'] = chosen[1];
        this.properties.click(data);
    };
    return CalendarComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('data'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__calendar__["Calendar"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__calendar__["Calendar"]) === "function" && _a || Object)
], CalendarComponent.prototype, "properties", void 0);
CalendarComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        template: __webpack_require__("../../../../../src/app/components/calendar/calendar.component.html"),
        selector: 'calendar',
        styles: [__webpack_require__("../../../../../src/app/components/calendar/calendar.scss")]
    }),
    __metadata("design:paramtypes", [])
], CalendarComponent);

var _a;
//# sourceMappingURL=calendar.component.js.map

/***/ }),

/***/ "../../../../../src/app/components/calendar/calendar.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/calendar/calendar.ts":
/***/ (function(module, exports) {

//# sourceMappingURL=calendar.js.map

/***/ }),

/***/ "../../../../../src/app/widgets/main/main-routing.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__main_component__ = __webpack_require__("../../../../../src/app/widgets/main/main.component.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MainWidgetRoutingModule; });
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
        component: __WEBPACK_IMPORTED_MODULE_2__main_component__["a" /* MainWidgetComponent */],
        data: {
            title: 'Form'
        }
    }
];
var MainWidgetRoutingModule = (function () {
    function MainWidgetRoutingModule() {
    }
    return MainWidgetRoutingModule;
}());
MainWidgetRoutingModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* RouterModule */].forChild(routes)],
        exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* RouterModule */]]
    })
], MainWidgetRoutingModule);

//# sourceMappingURL=main-routing.js.map

/***/ }),

/***/ "../../../../../src/app/widgets/main/main.component.html":
/***/ (function(module, exports) {

module.exports = "\n\n<div class=\"row\">\n  <div class=\"col-lg-12\">\n    <h1 class=\"page-header\">Main Widgets</h1>\n  </div>\n</div><!--/.row-->\n\n<div class=\"row\">\n  <div class=\"col-md-4\">\n    <h2>Calendar</h2>\n    <calendar></calendar>\n  </div>\n  <div class=\"col-md-4\">\n    <h2>ListView with CRUD with JavaScript Objects</h2>\n    <ng2-listview-crud [properties]=\"listView\" [data]=\"listItems\"></ng2-listview-crud>\n  </div>\n  <div class=\"col-md-4\">\n    <h2>ListView with CRUD with Arrays</h2>\n    <ng2-listview-crud [properties]=\"arraysListViewProperty\" [data]=\"crudArray\"></ng2-listview-crud>\n  </div>\n</div>\n\n<div class=\"row\">\n  <div class=\"col-lg-12\">\n    <h2>Alerts</h2>\n    <alert [color]=\"successColor\" [fontColor]=\"fontColor\" [text]='successText'></alert>\n    <alert [color]=\"warningCOlor\" [text]=\"warningText\"></alert>\n    <alert [color]=\"dangerColor\" [text]=\"dangerText\"></alert>\n  </div>\n</div>\n\n\n<div class=\"row\">\n  <div class=\"col-lg-12\">\n    <h2>Basic Panels</h2>\n  </div>\n  <div class=\"col-md-4\">\n    <div class=\"panel panel-default\">\n      <div class=\"panel-heading\">\n        Default Panel\n      </div>\n      <div class=\"panel-body\">\n        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ut ante in sapien blandit luctus sed ut lacus. Phasellus urna est, faucibus nec ultrices placerat, feugiat et ligula. Donec vestibulum magna a dui pharetra molestie. Fusce et dui urna.</p>\n      </div>\n    </div>\n  </div>\n\n  <div class=\"col-md-4\">\n    <div class=\"panel panel-primary\">\n      <div class=\"panel-heading\">\n        Primary Panel\n      </div>\n      <div class=\"panel-body\">\n        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ut ante in sapien blandit luctus sed ut lacus. Phasellus urna est, faucibus nec ultrices placerat, feugiat et ligula. Donec vestibulum magna a dui pharetra molestie. Fusce et dui urna.</p>\n      </div>\n    </div>\n  </div>\n\n  <div class=\"col-md-4\">\n    <div class=\"panel panel-success\">\n      <div class=\"panel-heading\">\n        Success Panel\n      </div>\n      <div class=\"panel-body\">\n        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ut ante in sapien blandit luctus sed ut lacus. Phasellus urna est, faucibus nec ultrices placerat, feugiat et ligula. Donec vestibulum magna a dui pharetra molestie. Fusce et dui urna.</p>\n      </div>\n    </div>\n  </div>\n\n</div><!-- /.row -->\n\n<div class=\"row\">\n  <div class=\"col-md-4\">\n    <div class=\"panel panel-info\">\n      <div class=\"panel-heading\">\n        Info Panel\n      </div>\n      <div class=\"panel-body\">\n        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ut ante in sapien blandit luctus sed ut lacus. Phasellus urna est, faucibus nec ultrices placerat, feugiat et ligula. Donec vestibulum magna a dui pharetra molestie. Fusce et dui urna.</p>\n      </div>\n    </div>\n  </div>\n\n  <div class=\"col-md-4\">\n    <div class=\"panel panel-warning\">\n      <div class=\"panel-heading\">\n        Warning Panel\n      </div>\n      <div class=\"panel-body\">\n        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ut ante in sapien blandit luctus sed ut lacus. Phasellus urna est, faucibus nec ultrices placerat, feugiat et ligula. Donec vestibulum magna a dui pharetra molestie. Fusce et dui urna.</p>\n      </div>\n    </div>\n  </div>\n\n  <div class=\"col-md-4\">\n    <div class=\"panel panel-danger\">\n      <div class=\"panel-heading\">\n        Danger Panel\n      </div>\n      <div class=\"panel-body\">\n        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ut ante in sapien blandit luctus sed ut lacus. Phasellus urna est, faucibus nec ultrices placerat, feugiat et ligula. Donec vestibulum magna a dui pharetra molestie. Fusce et dui urna.</p>\n      </div>\n    </div>\n  </div>\n\n</div><!-- /.row -->\n\n\n<div class=\"row\">\n  <div class=\"col-lg-12\">\n    <h2>Widget Panels</h2>\n  </div>\n\n  <div class=\"col-md-6\">\n    <div class=\"panel panel-blue\">\n      <div class=\"panel-heading dark-overlay\">Blue Panel</div>\n      <div class=\"panel-body\">\n        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ut ante in sapien blandit luctus sed ut lacus. Phasellus urna est, faucibus nec ultrices placerat, feugiat et ligula. Donec vestibulum magna a dui pharetra molestie. Fusce et dui urna.</p>\n      </div>\n    </div>\n  </div><!--/.col-->\n  <div class=\"col-md-6\">\n    <div class=\"panel panel-teal\">\n      <div class=\"panel-heading dark-overlay\">Teal Panel</div>\n      <div class=\"panel-body\">\n        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ut ante in sapien blandit luctus sed ut lacus. Phasellus urna est, faucibus nec ultrices placerat, feugiat et ligula. Donec vestibulum magna a dui pharetra molestie. Fusce et dui urna.</p>\n      </div>\n    </div>\n  </div><!--/.col-->\n\n  <div class=\"col-md-6\">\n    <div class=\"panel panel-orange\">\n      <div class=\"panel-heading dark-overlay\">Orange Panel</div>\n      <div class=\"panel-body\">\n        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ut ante in sapien blandit luctus sed ut lacus. Phasellus urna est, faucibus nec ultrices placerat, feugiat et ligula. Donec vestibulum magna a dui pharetra molestie. Fusce et dui urna.</p>\n      </div>\n    </div>\n  </div><!--/.col-->\n\n  <div class=\"col-md-6\">\n    <div class=\"panel panel-red\">\n      <div class=\"panel-heading dark-overlay\">Red Panel</div>\n      <div class=\"panel-body\">\n        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ut ante in sapien blandit luctus sed ut lacus. Phasellus urna est, faucibus nec ultrices placerat, feugiat et ligula. Donec vestibulum magna a dui pharetra molestie. Fusce et dui urna.</p>\n      </div>\n    </div>\n  </div><!--/.col-->\n</div>\n\n<div class=\"row\">\n  <div class=\"col-lg-12\">\n    <h2>Tab Panels</h2>\n  </div>\n\n  <div class=\"col-md-6\">\n    <div class=\"panel panel-default\">\n      <div class=\"panel-body tabs\">\n        <ul class=\"nav nav-tabs\">\n          <li class=\"active\"><a href=\"#tab1\" data-toggle=\"tab\">Tab 1</a></li>\n          <li><a href=\"#tab2\" data-toggle=\"tab\">Tab 2</a></li>\n          <li><a href=\"#tab3\" data-toggle=\"tab\">Tab 3</a></li>\n        </ul>\n\n        <div class=\"tab-content\">\n          <div class=\"tab-pane fade in active\" id=\"tab1\">\n            <h4>Tab 1</h4>\n            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget rutrum purus. Donec hendrerit ante ac metus sagittis elementum. Mauris feugiat nisl sit amet neque luctus, a tincidunt odio auctor. </p>\n          </div>\n          <div class=\"tab-pane fade\" id=\"tab2\">\n            <h4>Tab 2</h4>\n            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget rutrum purus. Donec hendrerit ante ac metus sagittis elementum. Mauris feugiat nisl sit amet neque luctus, a tincidunt odio auctor. </p>\n          </div>\n          <div class=\"tab-pane fade\" id=\"tab3\">\n            <h4>Tab 3</h4>\n            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget rutrum purus. Donec hendrerit ante ac metus sagittis elementum. Mauris feugiat nisl sit amet neque luctus, a tincidunt odio auctor. </p>\n          </div>\n        </div>\n      </div>\n    </div><!--/.panel-->\n  </div><!--/.col-->\n\n  <div class=\"col-md-6\">\n    <div class=\"panel panel-default\">\n      <div class=\"panel-body tabs\">\n\n        <ul class=\"nav nav-pills\">\n          <li class=\"active\"><a href=\"#pilltab1\" data-toggle=\"tab\">Tab 1</a></li>\n          <li><a href=\"#pilltab2\" data-toggle=\"tab\">Tab 2</a></li>\n          <li><a href=\"#pilltab3\" data-toggle=\"tab\">Tab 3</a></li>\n        </ul>\n\n        <div class=\"tab-content\">\n          <div class=\"tab-pane fade in active\" id=\"pilltab1\">\n            <h4>Tab 1</h4>\n            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget rutrum purus. Donec hendrerit ante ac metus sagittis elementum. Mauris feugiat nisl sit amet neque luctus, a tincidunt odio auctor. </p>\n          </div>\n          <div class=\"tab-pane fade\" id=\"pilltab2\">\n            <h4>Tab 2</h4>\n            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget rutrum purus. Donec hendrerit ante ac metus sagittis elementum. Mauris feugiat nisl sit amet neque luctus, a tincidunt odio auctor. </p>\n          </div>\n          <div class=\"tab-pane fade\" id=\"pilltab3\">\n            <h4>Tab 3</h4>\n            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget rutrum purus. Donec hendrerit ante ac metus sagittis elementum. Mauris feugiat nisl sit amet neque luctus, a tincidunt odio auctor. </p>\n          </div>\n        </div>\n      </div>\n    </div><!--/.panel-->\n  </div><!-- /.col-->\n\n</div><!-- /.row -->\n\n<div class=\"row\">\n  <div class=\"col-md-6\">\n    <div class=\"panel  chat\">\n      <div class=\"panel-heading panel-blue\" id=\"accordion\">\n        <i class=\"fa fa-list fa-fw\"></i> Chat</div>\n      <div class=\"panel-body\">\n        <ul>\n          <li class=\"left clearfix\">\n\t\t\t\t\t\t\t\t<span class=\"chat-img pull-left\">\n\t\t\t\t\t\t\t\t\t<img src=\"http://placehold.it/80/30a5ff/fff\" alt=\"User Avatar\" class=\"img-circle\" />\n\t\t\t\t\t\t\t\t</span>\n            <div class=\"chat-body clearfix\">\n              <div class=\"header\">\n                <strong class=\"primary-font\">John Doe</strong> <small class=\"text-muted\">32 mins ago</small>\n              </div>\n              <p>\n                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ante turpis, rutrum ut ullamcorper sed, dapibus ac nunc. Vivamus luctus convallis mauris, eu gravida tortor aliquam ultricies.\n              </p>\n            </div>\n          </li>\n          <li class=\"right clearfix\">\n\t\t\t\t\t\t\t\t<span class=\"chat-img pull-right\">\n\t\t\t\t\t\t\t\t\t<img src=\"http://placehold.it/80/dde0e6/5f6468\" alt=\"User Avatar\" class=\"img-circle\" />\n\t\t\t\t\t\t\t\t</span>\n            <div class=\"chat-body clearfix\">\n              <div class=\"header\">\n                <strong class=\"pull-left primary-font\">Jane Doe</strong> <small class=\"text-muted\">6 mins ago</small>\n              </div>\n              <p>\n                Mauris dignissim porta enim, sed commodo sem blandit non. Ut scelerisque sapien eu mauris faucibus ultrices. Nulla ac odio nisl. Proin est metus, interdum scelerisque quam eu, eleifend pretium nunc. Suspendisse finibus auctor lectus, eu interdum sapien.\n              </p>\n            </div>\n          </li>\n          <li class=\"left clearfix\">\n\t\t\t\t\t\t\t\t<span class=\"chat-img pull-left\">\n\t\t\t\t\t\t\t\t\t<img src=\"http://placehold.it/80/30a5ff/fff\" alt=\"User Avatar\" class=\"img-circle\" />\n\t\t\t\t\t\t\t\t</span>\n            <div class=\"chat-body clearfix\">\n              <div class=\"header\">\n                <strong class=\"primary-font\">John Doe</strong> <small class=\"text-muted\">32 mins ago</small>\n              </div>\n              <p>\n                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ante turpis, rutrum ut ullamcorper sed, dapibus ac nunc. Vivamus luctus convallis mauris, eu gravida tortor aliquam ultricies.\n              </p>\n            </div>\n          </li>\n        </ul>\n      </div>\n\n      <div class=\"panel-footer\">\n        <div class=\"input-group\">\n          <input id=\"btn-input\" type=\"text\" class=\"form-control input-md\" placeholder=\"Type your message here...\" />\n          <span class=\"input-group-btn\">\n\t\t\t\t\t\t\t\t<button class=\"btn btn-success btn-md\" id=\"btn-chat\">Send</button>\n\t\t\t\t\t\t\t</span>\n        </div>\n      </div>\n    </div>\n\n  </div><!--/.col-->\n</div>\n<div class=\"row\">\n  <div class=\"col-md-6\">\n    <div class=\"panel panel-default \">\n      <div class=\"panel-heading\">\n        Timeline\n      </div>\n\n      <div class=\"panel-body timeline-container\">\n        <ng2-timeline [completeListener]=\"completeListener\" [data]=\"timelineData\"></ng2-timeline>\n      </div>\n    </div>\n  </div>\n\n\n  <div class=\"col-md-6\">\n    <div class=\"panel panel-default articles\">\n      <div class=\"panel-heading\">\n        Latest News\n      </div>\n      <div class=\"panel-body articles-container\">\n        <ng2-news-list [data]=\"newsList\"></ng2-news-list>\n      </div>\n    </div><!--End .articles-->\n\n    <div class=\"panel panel-default \">\n      <div class=\"panel-heading\">\n        Progress bars\n      </div>\n      <div class=\"panel-body\">\n        <div class=\"col-md-12 no-padding\">\n          <div class=\"row progress-labels\">\n            <div class=\"col-sm-6\">New Orders</div>\n            <div class=\"col-sm-6\" style=\"text-align: right;\">80%</div>\n          </div>\n          <div class=\"progress\">\n            <div data-percentage=\"0%\" style=\"width: 80%;\" class=\"progress-bar progress-bar-blue\" role=\"progressbar\" aria-valuemin=\"0\" aria-valuemax=\"100\"></div>\n          </div>\n          <div class=\"row progress-labels\">\n            <div class=\"col-sm-6\">Comments</div>\n            <div class=\"col-sm-6\" style=\"text-align: right;\">60%</div>\n          </div>\n          <div class=\"progress\">\n            <div data-percentage=\"0%\" style=\"width: 60%;background-color: #1ebfae\" class=\"progress-bar\" role=\"progressbar\" aria-valuemin=\"0\" aria-valuemax=\"100\"></div>\n          </div>\n          <div class=\"row progress-labels\">\n            <div class=\"col-sm-6\">New Users</div>\n            <div class=\"col-sm-6\" style=\"text-align: right;\">40%</div>\n          </div>\n          <div class=\"progress\">\n            <div data-percentage=\"0%\" style=\"width: 40%;\" class=\"progress-bar progress-bar-teal\" role=\"progressbar\" aria-valuemin=\"0\" aria-valuemax=\"100\"></div>\n          </div>\n          <div class=\"row progress-labels\">\n            <div class=\"col-sm-6\">Page Views</div>\n            <div class=\"col-sm-6\" style=\"text-align: right;\">20%</div>\n          </div>\n          <div class=\"progress\">\n            <div data-percentage=\"0%\" style=\"width: 20%;\" class=\"progress-bar progress-bar-red\" role=\"progressbar\" aria-valuemin=\"0\" aria-valuemax=\"100\"></div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/widgets/main/main.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MainWidgetComponent; });
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

var MainWidgetComponent = (function () {
    function MainWidgetComponent() {
        this.successText = "Successful";
        this.warningText = "Warning";
        this.dangerText = "Danger";
        this.successColor = "#8ad919";
        this.warningCOlor = "#ffb53e";
        this.dangerColor = "#f9243f";
        this.fontColor = "#ececec";
        this.timelineData = [
            {
                title: "Step 1",
                icon: '<i class="fa fa-home"></i>',
                content: "Hello World",
                complete: true
            },
            {
                title: "Step 2",
                icon: '<i class="fa fa-pencil"></i>',
                content: "Welcome World",
                complete: false
            }
        ];
        //News Component
        this.newsList = [
            {
                large: "30",
                small: "Jun",
                link: "http://www.aebiss.com",
                title: "AEBISS",
                content: "Fullstack development, IoT, Blockchain related services in the U.A.E"
            },
            {
                large: "1",
                small: "Jul",
                link: "http://www.tayar.ae",
                title: "Tayar",
                content: "One device that let you control any electrical device at home"
            },
            {
                large: "1",
                small: "Jul",
                link: "http://www.wavex.io",
                title: "WaveX",
                content: "Blockchain based electricity trading platform"
            }
        ];
        this.listView = {
            add: true,
            remove: true,
            edit: true,
            dataIsObject: true,
            path: ["name", "first"],
            label: "CRUD ListView",
            headingBackgroundColor: "#3752ff",
            headingFontColor: "#ececec",
            icon: "fa fa-cogs",
            onDelete: function (value) {
                console.log("Deleting Value: " + JSON.stringify(value));
                return true;
            },
            onUpdate: function (value, newValue) {
                console.log("Editing Value: " + JSON.stringify(value) + " New Value:" + newValue);
                return true;
            },
            onSearch: function (value) {
                console.log(value);
            },
            onAdd: function (value) {
                console.log("Adding Value: " + JSON.stringify(value));
                return true;
            },
            onSelect: function (value) {
                console.log(JSON.stringify(value));
            },
            onSearchChange: function (value) {
                console.log(value);
            }
        };
        //In this specific example the field name.first is displayed in the list
        this.listItems = [
            { name: { first: "Hello", last: "World" }, count: 2 },
            { name: { first: "Hello2", last: "World" }, count: 2 }
        ];
        this.arraysListViewProperty = {
            add: true,
            remove: true,
            edit: true,
            dataIsObject: false,
            path: [],
            label: "CRUD ListView with Arrays",
            headingBackgroundColor: "#3752ff",
            headingFontColor: "#ececec",
            icon: "fa fa-cogs",
            onDelete: function (value) {
                console.log("Deleting Value: " + JSON.stringify(value));
                return true;
            },
            onUpdate: function (value, newValue) {
                console.log("Editing Value: " + JSON.stringify(value) + " New Value:" + newValue);
                return true;
            },
            onSearch: function (value) {
                console.log(value);
            },
            onAdd: function (value) {
                console.log("Adding Value: " + JSON.stringify(value));
                return true;
            },
            onSelect: function (value) {
                console.log(JSON.stringify(value));
            },
            onSearchChange: function (value) {
                console.log(value);
            }
        };
        //In this specific example the field name.first is displayed in the list
        this.crudArray = [
            "Apple", "Orange", "Banana"
        ];
        var self = this;
        setTimeout(function () {
            self.timelineData.push({
                title: "Step 3",
                icon: '<i class="fa fa-remove"></i>',
                content: "Bye World",
                complete: false
            });
        }, 5000);
    }
    //Timeline Related
    MainWidgetComponent.prototype.completeListener = function (item) {
        console.log(item);
        return true;
    };
    return MainWidgetComponent;
}());
MainWidgetComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        template: __webpack_require__("../../../../../src/app/widgets/main/main.component.html"),
        selector: 'widget-main'
    }),
    __metadata("design:paramtypes", [])
], MainWidgetComponent);

//# sourceMappingURL=main.component.js.map

/***/ }),

/***/ "../../../../../src/app/widgets/main/main.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__main_component__ = __webpack_require__("../../../../../src/app/widgets/main/main.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__main_routing__ = __webpack_require__("../../../../../src/app/widgets/main/main-routing.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng2_listview_crud__ = __webpack_require__("../../../../ng2-listview-crud/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_calendar_calendar_component__ = __webpack_require__("../../../../../src/app/components/calendar/calendar.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_alert_alert_component__ = __webpack_require__("../../../../../src/app/components/alert/alert.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ng2_timeline__ = __webpack_require__("../../../../ng2-timeline/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_ng2_newslist_ng2newslist_module__ = __webpack_require__("../../../../../src/app/components/ng2-newslist/ng2newslist.module.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MainWidgetModule", function() { return MainWidgetModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Created by mohma on 7/26/2017.
 */










var MainWidgetModule = (function () {
    function MainWidgetModule() {
    }
    return MainWidgetModule;
}());
MainWidgetModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormsModule"], __WEBPACK_IMPORTED_MODULE_1__angular_forms__["ReactiveFormsModule"],
            __WEBPACK_IMPORTED_MODULE_3__main_routing__["a" /* MainWidgetRoutingModule */],
            __WEBPACK_IMPORTED_MODULE_5__angular_common__["CommonModule"],
            __WEBPACK_IMPORTED_MODULE_4_ng2_listview_crud__["a" /* Ng2ListViewCRUD */],
            __WEBPACK_IMPORTED_MODULE_8_ng2_timeline__["a" /* Ng2Timeline */], __WEBPACK_IMPORTED_MODULE_9__components_ng2_newslist_ng2newslist_module__["a" /* Ng2NewsList */]
        ],
        declarations: [__WEBPACK_IMPORTED_MODULE_2__main_component__["a" /* MainWidgetComponent */], __WEBPACK_IMPORTED_MODULE_6__components_calendar_calendar_component__["a" /* CalendarComponent */], __WEBPACK_IMPORTED_MODULE_7__components_alert_alert_component__["a" /* AlertComponent */]],
        providers: [],
    })
], MainWidgetModule);

//# sourceMappingURL=main.module.js.map

/***/ }),

/***/ "../../../../ng2-listview-crud/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Ng2ListViewCRUD; });




/**
 * Created by mohma on 7/27/2017.
 */
var Ng2ListViewCRUDComponent = (function () {
    function Ng2ListViewCRUDComponent() {
        this.value = "";
        this.search = "";
        this.opType = "Add";
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    Ng2ListViewCRUDComponent.prototype.ngOnChanges = function (changes) {
        this.subData = this.items;
    };
    /**
     * @return {?}
     */
    Ng2ListViewCRUDComponent.prototype.ngOnInit = function () {
        this.properties.icon += " fa-fw";
        this.subData = this.items;
        this.path = "";
        for (var /** @type {?} */ i = 0; i < this.properties.path.length; i++) {
            this.path += this.properties.path[i];
            if (i !== this.properties.path.length - 1) {
                this.path += ".";
            }
        }
    };
    /**
     * @return {?}
     */
    Ng2ListViewCRUDComponent.prototype.ngAfterViewInit = function () {
        var /** @type {?} */ self = this;
        $('ul.ng2-listview').on('click', 'li', function () {
            $('.selected').removeClass('selected');
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                self.selectedIndex = $(this).attr('id');
                $(this).addClass('selected');
                self.properties.onSelect(self.items[self.selectedIndex]);
            }
        });
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    Ng2ListViewCRUDComponent.prototype.onChangeListener = function ($event) {
        var /** @type {?} */ self = this;
        if (this.search === "") {
            this.subData = this.items;
            return;
        }
        this.properties.onSearchChange(self.search);
        var /** @type {?} */ result = this.items.filter(function (lhs) {
            var /** @type {?} */ data = lhs;
            if (self.properties.dataIsObject) {
                if (!lhs[self.properties.path[0]])
                    return false;
                data = lhs[self.properties.path[0]];
                for (var /** @type {?} */ i = 1; i < self.properties.path.length; i++) {
                    if (data[self.properties.path[i]])
                        data = data[self.properties.path[i]];
                    else {
                        return false;
                    }
                }
            }
            return data.match(self.search);
        });
        this.subData = result;
    };
    /**
     * @param {?} obj
     * @param {?} path
     * @param {?} newValue
     * @return {?}
     */
    Ng2ListViewCRUDComponent.prototype.changeJSONValue = function (obj, path, newValue) {
        var /** @type {?} */ parts = path.split('.');
        while (parts.length > 1 && (obj = obj[parts.shift()])) { }
        
        obj[parts.shift()] = newValue;
        return obj;
    };
    /**
     * @param {?} obj
     * @return {?}
     */
    Ng2ListViewCRUDComponent.prototype.getJSONValue = function (obj) {
        if (!obj[this.properties.path[0]])
            return "Not Available";
        var /** @type {?} */ data = obj[this.properties.path[0]];
        for (var /** @type {?} */ i = 1; i < this.properties.path.length; i++) {
            if (!data[this.properties.path[i]])
                return "Not Available";
            data = data[this.properties.path[i]];
        }
        return data;
    };
    /**
     * @param {?} value
     * @return {?}
     */
    Ng2ListViewCRUDComponent.prototype.append = function (value) {
        var /** @type {?} */ data = value;
        if (this.properties.dataIsObject) {
            data = "";
            var /** @type {?} */ closing = "";
            for (var /** @type {?} */ i = 0; i < this.properties.path.length; i++) {
                data += "{\"";
                data += this.properties.path[i] + "\":";
                closing += "}";
            }
            data += ('"' + value + '"' + closing);
            try {
                data = JSON.parse(data);
            }
            catch (e) {
                throw e;
            }
        }
        this.items.push(data);
        return data;
    };
    /**
     * @return {?}
     */
    Ng2ListViewCRUDComponent.prototype.onAddClickListener = function () {
        if (this.value.length !== 0 && this.opType === "Add") {
            if (this.properties.onAdd && this.properties.onAdd(this.append(this.value))) {
                this.value = "";
            }
            else {
                console.log("Function onAdd not found");
            }
        }
        else if (this.value.length !== 0 && this.opType === "Edit") {
            if (this.properties.onAdd && this.properties.onUpdate(this.items[this.selectedIndex], this.value)) {
                if (!this.properties.dataIsObject) {
                    this.items[this.selectedIndex] = this.value;
                }
                else {
                    this.changeJSONValue(this.items[this.selectedIndex], this.path, this.value);
                }
                this.value = "";
                this.opType = "Add";
            }
            else {
                console.log("Function onEdit not found");
            }
        }
    };
    /**
     * @param {?} index
     * @return {?}
     */
    Ng2ListViewCRUDComponent.prototype.onEditClickListener = function (index) {
        this.selectedIndex = index;
        if (!this.properties.dataIsObject)
            this.value = this.items[this.selectedIndex];
        else {
            var /** @type {?} */ data = this.items[this.selectedIndex][this.properties.path[0]];
            for (var /** @type {?} */ i = 1; i < this.properties.path.length; i++) {
                if (!data[this.properties.path[i]]) {
                    return null;
                }
                data = data[this.properties.path[i]];
            }
            this.value = data;
        }
        this.opType = "Edit";
    };
    /**
     * @param {?} index
     * @return {?}
     */
    Ng2ListViewCRUDComponent.prototype.delete = function (index) {
        this.items.splice(index, 1);
    };
    /**
     * @param {?} index
     * @return {?}
     */
    Ng2ListViewCRUDComponent.prototype.get = function (index) {
        return this.items[index];
    };
    /**
     * @param {?} index
     * @return {?}
     */
    Ng2ListViewCRUDComponent.prototype.onDeleteClickListener = function (index) {
        this.selectedIndex = index;
        if (this.properties.onDelete && this.properties.onDelete(this.get(this.selectedIndex))) {
            this.delete(this.selectedIndex);
        }
    };
    /**
     * @param {?} item
     * @return {?}
     */
    Ng2ListViewCRUDComponent.prototype.getData = function (item) {
        if (!this.properties.dataIsObject) {
            return item;
        }
        return this.getJSONValue(item);
    };
    return Ng2ListViewCRUDComponent;
}());
Ng2ListViewCRUDComponent.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"], args: [{
                template: "<div class=\"panel\"> <div class=\"panel-heading\" [style.background]=\"properties['headingBackgroundColor']\" [style.color]=\"properties['headingFontColor']\"> <i [class]=\"properties['icon']\" style=\"margin-right: 10px\"></i>{{properties['label']}} </div> <input type=\"text\" class=\"form-control searchBoxListView\" placeholder=\"Search....\" [(ngModel)]=\"search\" (keyup)=\"onChangeListener($event)\"> <div class=\"panel-body\"> <ul class=\"ng2-listview\"> <li *ngFor=\"let item of subData; index as i\" class=\"ng2-listview-item\" [id]=\"i\" > {{getData(item)}} <div class=\"pull-right action-buttons\"> <a href=\"javascript:void(0)\" (click)=\"onEditClickListener(i)\" [hidden]=\"!properties['edit']\"><i class=\"fa fa-pencil fa-fw\"></i> </a> <a href=\"javascript:void(0)\" (click)=\"onDeleteClickListener(i)\" [hidden]=\"!properties['remove']\"><i class=\"fa-fw fa fa-remove\"></i> </a> </div> </li> </ul> </div> <div class=\"panel-footer\" [hidden]=\"!properties['add']\"> <div class=\"input-group\"> <input type=\"text\" class=\"form-control input-md\" placeholder=\"Add\" [(ngModel)]=\"value\"> <span class=\"input-group-btn\"> <button class=\"btn btn-success btn-md\" id=\"btn-todo\" (click)=\"onAddClickListener()\">{{opType}}</button> </span> </div> </div> </div> ",
                selector: 'ng2-listview-crud',
                styles: ["/** NG2-Listview-CRUD Author: Mohammed Rashid Github: https://github.com/mohdrashid */ .selected { background: bisque; } .ng2-listview { padding: 0; margin: -15px; background: #fff; color: #5f6468; } #checkbox { margin: 0; } .ng2-listview .checkbox { display: inline-block; margin: 0px; } .panel-body input[type=checkbox]:checked + label { text-decoration: line-through; color: #777; } .ng2-listview-item { list-style: none; line-height: 0.9; padding: 14px 15px 8px 15px; } .ng2-listview-item:hover, a.ng2-listview-item:focus { text-decoration: none; background-color: #f6f6f6; } .ng2-listview-item .trash .glyph:hover { color: #ef4040; } .searchBoxListView { border-radius: 0px; } ul li a { text-decoration: none; } ul li div { display: none; } ul li:hover div { display: inline; } "]
            },] },
];
/**
 * @nocollapse
 */
Ng2ListViewCRUDComponent.ctorParameters = function () { return []; };
Ng2ListViewCRUDComponent.propDecorators = {
    'properties': [{ type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"], args: ['properties',] },],
    'items': [{ type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"], args: ['data',] },],
};

var Ng2ListViewCRUD = (function () {
    function Ng2ListViewCRUD() {
    }
    return Ng2ListViewCRUD;
}());
Ng2ListViewCRUD.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"], args: [{
                imports: [
                    __WEBPACK_IMPORTED_MODULE_0__angular_common__["CommonModule"], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormsModule"], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["ReactiveFormsModule"],
                ],
                declarations: [
                    Ng2ListViewCRUDComponent
                ],
                exports: [
                    Ng2ListViewCRUDComponent
                ]
            },] },
];
/**
 * @nocollapse
 */
Ng2ListViewCRUD.ctorParameters = function () { return []; };




/***/ })

});
//# sourceMappingURL=4.chunk.js.map