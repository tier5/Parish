webpackJsonp([6],{

/***/ "../../../../../src/app/report/create-report/create-report.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "h4{\n    background: #30a5ff;\n    color: #fff;\n    text-transform: uppercase;\n    padding: 10px;\n    margin: 0;\n    border-bottom: 1px solid #000;\n}\n.row-eq-height {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display:         flex;\n}\n.acc-name, .acc-id{\n    color: #000;\n    font-size: 16px;\n    margin: 10px 0;\n}\n.acc-name span, .acc-id select{\n    color: #0600ff;\n    text-decoration: underline;\n    font-size: 20px;\n    text-transform: uppercase;\n}\n.acc-id select{\n    text-decoration: none;\n    font-size: 16px;\n    background: #fff;\n    width: 100px;\n    padding: 5px;\n}\n.border-black{\n    border: 2px solid #000;\n    background: #fff;\n}\n.no-right-border{\n    border-right: 0;\n}\n.no-left-border{\n    border-left: 0;\n}\nlabel{\n    font-weight: normal;\n}\n.acc-details span{\n    color: #000;\n    font-weight: bold;\n}\ntable th{\n    text-align: center;\n}\n.table-bordered, .table>thead>tr>th, .table>thead>tr>td {\n    border: 1px solid #000;\n    color: #000;\n    background: #cde9ff;\n}\n.table>thead>tr>th{\n    font-size: 14px !important;\n    padding: 0;\n    height: auto;\n}\n.table>thead>tr>th.blank, .table>tbody>tr>td.blank{\n    border: none;\n    background: #fff;\n    padding: 5px;\n}\n.spacer{\n    background: #000;\n    height: 5px;\n    padding: 0;\n    border: 1px solid #000;\n    border-top: 0;\n    border-bottom: 0;\n}\n.highlight{\n    color: #0600ff !important;\n    text-transform: uppercase;\n}\n.bg-pink{\n    background: #ffcece;\n    color: #fff;\n}\n.sea-green{\n    background: #98faee;\n}\ntable tr th span{\n    display: block;\n    padding: 5px;\n}\n.table>tbody>tr>td{\n    font-size: 14px !important;\n    padding: 0;\n    height: auto;\n    border: 1px solid #000;\n    position: relative;\n}\n\ntable tr td input{\n    display: block;\n    width: 100%;\n    padding: 5px 1px;\n    border: none;\n    color: #000;\n    text-align: center;\n    border-radius: 0;\n}\ntd strong{\n    font-size: 13px;\n    line-height: 35px;\n    padding-right: 3px;\n    background: #f6f4de;\n    display: block;\n    text-align: right;\n    height: 100%;\n    position: absolute;\n    width: 100%;\n    left: 0;\n    right: 0;\n    top: 0;\n    bottom: 0;\n}\ntable tr td b input{\n    font-size: 14px;\n}\ntable tr p{\n    text-align: center;\n    color: #000;\n    margin: 0;\n    font-size: 20px;\n    font-weight: bold;\n}\ntable tr td span{\n    text-align: center;\n    display: inline-block;\n    width: 100%;\n    font-weight: bold;\n    font-size: 14px;\n    line-height: 30px;\n}\ntable tr td span.date{\n    width: auto;\n}\ntable tr td span.maa{\n    display: inline-block;\n    width: auto;\n}\n/*table tr td b{\n    height: 100%;\n    position: absolute;\n    width: 100%;\n    left: 0;\n    right: 0;\n    top: 0;\n    bottom: 0;\n    background: #fff;\n}*/\ntable tr td b.sea-green{\n    background: #98faee;\n}\ntable tr td input.highlight-light{\n    background: #e8f5ff;\n}\n.highlight-light{\n    background: #e8f5ff;\n}\n\n.monthly-growth{\n    background: #000;\n    color: #fff;\n}\n\n.monthly-growth span{\n    font-size: 20px !important;\n    margin-top: 10px;\n}\nh3.page-header span{\n    color: #fff;\n    font-size: 16px;\n}\n\n@media screen and (max-width: 991px){\n    .row-eq-height{\n        display: block;\n    }\n}\n@media screen and (max-width: 767px){\n    .acc-details div{\n        text-align: center;\n    }\n}\n\n\n.no-margin{margin: 0 !important;}\n\n\n.width48{width: 48%;}\n.width4{width: 4%;}\n\n.no-margin{margin: 0;}\n/*    .width48{width: 48%;}\n.width4{width: 4%;}*/\n\nselect{width: 100%; background: #fff; border: 1px solid #ccc; padding: 3px;}\n.table-responsive{width: 100%; overflow-y: auto;}\n.sky-blue, .disabled_input td, .disabled_input td input{background: #cde9ff;}\n.disabled_input td input{\n    font-weight: bold;\n}\n.dp-date-picker.dp-material .dp-picker-input{width: 105px !important;}\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/report/create-report/create-report.component.html":
/***/ (function(module, exports) {

module.exports = "<h3 class=\"page-header\">{{ title }} <span *ngIf=\"createMode\">( Pick a date to create report )</span></h3>\n\n\n<div class=\"row\">\n    <div class=\"col-lg-12\">\n        <div *ngIf=\"!responseStatus && responseReceived\" class=\"alert alert-danger\">\n            <strong>{{ responseMsg }}</strong>\n        </div>\n    </div>\n    <div class=\"col-lg-12\">\n        <div *ngIf=\"responseStatus && responseReceived\" class=\"alert alert-success\">\n            <strong>{{ responseMsg }}</strong>\n        </div>\n    </div>\n</div>\n\n<form #prForm=\"ngForm\">\n    <div class=\"col-md-12\">\n        <div class=\"row row-eq-height\">\n            <div class=\"col-md-12 border-black\">\n                <div class=\"row\">\n                    <h4 class=\"text-center\">\n                        monthly progress report\n                    </h4>\n                    <div class=\"col-sm-12\">\n                        <p class=\"acc-id\" *ngIf=\"parishShow\">Parish Id :\n                            <select *ngIf=\"parish_id\"\n                                    #parishidlist\n                                    [disabled]=\"!viewMode\"\n                                    (change)=\"onParishIdChange(parishidlist.value)\"\n                                    [ngModel]=\"parish_id\"\n                                    name=\"parishIdDropDown\"\n                            >\n                                <option [value]=\"parish.id\" *ngFor=\"let parish of parishIdList\">ROI{{ parish.id }}</option>\n\n                            </select>\n                        </p>\n                        <p class=\"acc-id\" *ngIf=\"!parishShow\">Parish Id : ROI{{ parish_id }}</p>\n                        <p class=\"acc-name\">\n                            Account Name :\n                            <span>\n                                {{ progress_report.account_name }}\n                            </span>\n                        </p>\n                    </div>\n\n\n                    <div class=\"acc-details\">\n                        <div class=\"col-sm-6\">\n                            <div class=\"block\">\n                                <label>Month: </label>\n                                <span>{{ progress_report.month }}</span>\n                            </div>\n                            <div class=\"block\">\n                                <label>Parish Pastor: </label>\n                                <span>{{ progress_report.parish_pastor }}</span>\n                            </div>\n                            <div class=\"block\">\n                                <label>Zonal Pastor: </label>\n                                <span>{{ progress_report.zonal_pastor }}</span>\n                            </div>\n                        </div>\n                        <div class=\"col-sm-6\">\n                            <div class=\"block\">\n                                <label>Year: </label>\n                                <span>{{ progress_report.year }}</span>\n                            </div>\n                            <div class=\"block\">\n                                <label>Area Pastor: </label>\n                                <span>{{ progress_report.area_pastor }}</span>\n                            </div>\n                            <div class=\"block\">\n                                <label>Provincial Pastor: </label>\n                                <span>{{ progress_report.province_pastor }}</span>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n        <div class=\"row\">\n            <div class=\"col-md-12\">\n                <div class=\"row\">\n                    <div class=\"spacer\"></div>\n                </div>\n            </div>\n        </div>\n        <div class=\"row\">\n            <div class=\"col-md-12\">\n                <div class=\"row\">\n                    <div class=\"table-responsive\">\n                        <table class=\"table table-bordered\">\n                            <tbody>\n                            <tr>\n                                <td colspan=\"14\">\n                                    <table class=\"table no-margin\">\n                                        <tbody>\n                                        <tr>\n                                            <td colspan=\"2\">\n                                                <span class=\"highlight\">Progress Report For </span>\n                                            </td>\n                                            <td>\n\n\t\t\t\t\t\t\t\t\t\t        <span class=\"sea-green\">\n                                                    <dp-date-picker id=\"daytimePicker\"\n                                                                    name=\"daytimePicker\"\n                                                                    #datePicker\n                                                                    #daytimePicker=\"ngModel\"\n                                                                    [(ngModel)]=\"progress_report.crucial_date\"\n                                                                    (ngModelChange)=\"log($event)\"\n                                                                    [mode]=\"'month'\"\n                                                                    [placeholder]=\"'Pick Month & Year'\"\n                                                                    [config]=\"config\"\n                                                                    [theme]=\"'dp-material'\" [disabled]=\"editMode\">\n                                                    </dp-date-picker>\n                                                    <select *ngIf=\"viewMode && reportIdList && displaymode\"\n                                                            [ngModel]=\"reportId\"\n                                                            name=\"reportIDList\"\n                                                            #reportNo\n                                                            (change)=\"onReportChange(reportNo.value)\"\n                                                    >\n                                                        <option [value]=\"report.id\"\n                                                                *ngFor=\"let report of reportIdList; let i = index;\"\n                                                        >\n                                                            {{ 'Report ' + (i + 1) }}\n                                                        </option>\n                                                    </select>\n                                                </span>\n                                            </td>\n                                            <td colspan=\"4\"><span>Attendance</span></td>\n                                            <td class=\"blank\"><span></span></td>\n                                            <td colspan=\"6\"><span>Monetary</span></td>\n                                        </tr>\n                                        </tbody>\n                                    </table>\n                                </td>\n                            </tr>\n                            <!-- First section start -->\n                            <tr *ngIf=\"progress_report.crucial_date != undefined && displaymode\">\n                                <td colspan=\"14\">\n                                    <table class=\"table no-margin\">\n                                        <tbody>\n                                        <tr class=\"sky-blue disabled_input\">\n                                            <td><input value=\"Date\" disabled=\"disabled\"></td>\n                                            <td><input value=\"Day\" disabled></td>\n                                            <td><input value=\"Programmes\" disabled></td>\n                                            <td><input value=\"Men\" disabled></td>\n                                            <td><input value=\"Women\" disabled></td>\n                                            <td><input value=\"Children\" disabled></td>\n                                            <td><input value=\"Total\" disabled></td>\n                                            <td style=\"width: 1.8%\">&nbsp;</td>\n                                            <td><input value=\"Offering\" disabled></td>\n                                            <td colspan=\"2\">\n                                                <table class=\"table no-margin sky-blue\">\n                                                    <tr>\n                                                        <td colspan=\"2\"><input value=\"Tithe\" disabled></td>\n                                                    </tr>\n                                                    <tr>\n                                                        <td style=\"border: 1px solid #000;border-left: 0;border-bottom: 0;\">\n                                                            <input value=\"Pastor\" disabled></td>\n                                                        <td><input value=\"General\" disabled></td>\n                                                    </tr>\n                                                </table>\n\n                                            </td>\n                                            <td><input value=\"F/Fruit\" disabled></td>\n                                            <td><input value=\"T/Giving\" disabled></td>\n                                            <td><input value=\"Total\" disabled></td>\n                                        </tr>\n                                        </tbody>\n                                    </table>\n\n                                    <!-- Week Generating Section Start -->\n                                    <table class=\"table no-margin\"\n                                           *ngFor=\"let weekly of progress_report.report.weekly; let i = index\">\n                                        <tbody *ngFor=\"let week of weekly.days; let j = index\">\n                                        <tr *ngIf=\"week.day === 'Sunday'\">\n                                            <td>\n                                                <input type=\"text\"\n                                                       [name]=\"'week' + i + 'date' + j\"\n                                                       [(ngModel)]=\"week.date\"\n                                                       class=\"form-control bg-pink\"\n                                                       disabled\n                                                >\n                                            </td>\n                                            <td>\n                                                <input type=\"text\"\n                                                       [name]=\"'week' + i + 'day' + j\"\n                                                       [(ngModel)]=\"week.day\"\n                                                       class=\"form-control\"\n                                                       disabled\n                                                >\n                                            </td>\n                                            <td>\n                                                <input type=\"text\"\n                                                       [name]=\"'week' + i + 'programmes' + j\"\n                                                       [(ngModel)]=\"week.programmes\"\n                                                       class=\"form-control bg-pink\"\n                                                >\n                                            </td>\n                                            <td>\n                                                <input type=\"number\"\n                                                       [name]=\"'week' + i + 'men' + j\"\n                                                       [(ngModel)]=\"week.attendance.men\"\n                                                       min=\"0\"\n                                                       step=\"1\"\n                                                       class=\"form-control sea-green\"\n                                                >\n                                            </td>\n                                            <td>\n                                                <input type=\"number\"\n                                                       [name]=\"'week' + i + 'women' + j\"\n                                                       [(ngModel)]=\"week.attendance.women\"\n                                                       min=\"0\"\n                                                       step=\"1\"\n                                                       class=\"form-control sea-green\"\n                                                >\n                                            </td>\n                                            <td>\n                                                <input type=\"number\"\n                                                       [name]=\"'week' + i + 'children' + j\"\n                                                       [(ngModel)]=\"week.attendance.children\"\n                                                       min=\"0\"\n                                                       step=\"1\"\n                                                       class=\"form-control sea-green\"\n                                                >\n                                            </td>\n                                            <td>\n                                                <input type=\"number\"\n                                                       [name]=\"'week' + i + 'a_total' + j\"\n                                                       [(ngModel)]=\"week.attendance.total\"\n                                                       min=\"0\"\n                                                       step=\"1\"\n                                                       class=\"form-control\"\n                                                       disabled\n                                                >\n                                            </td>\n                                            <td class=\"blank\" style=\"width: 1%\">&nbsp;</td>\n                                            <td colspan=\"6\">&nbsp;</td>\n                                        </tr>\n                                        <tr *ngIf=\"week.day !== 'Sunday'\">\n                                            <td>\n                                                <input type=\"text\"\n                                                       [name]=\"'week' + i + 'date' + j\"\n                                                       [(ngModel)]=\"week.date\"\n                                                       class=\"form-control bg-pink\"\n                                                       disabled\n                                                >\n                                            </td>\n                                            <td>\n                                                <input type=\"text\"\n                                                       [name]=\"'week' + i + 'day' + j\"\n                                                       [(ngModel)]=\"week.day\"\n                                                       class=\"form-control\"\n                                                       disabled\n                                                >\n                                            </td>\n                                            <td>\n                                                <input type=\"text\"\n                                                       [name]=\"'week' + i + 'programmes' + j\"\n                                                       [(ngModel)]=\"week.programmes\"\n                                                       class=\"form-control bg-pink\"\n                                                >\n                                            </td>\n                                            <td>\n                                                <input type=\"number\"\n                                                       [name]=\"'week' + i + 'men' + j\"\n                                                       [(ngModel)]=\"week.attendance.men\"\n                                                       min=\"0\"\n                                                       step=\"1\"\n                                                       class=\"form-control sea-green\"\n                                                >\n                                            </td>\n                                            <td>\n                                                <input type=\"number\"\n                                                       [name]=\"'week' + i + 'women' + j\"\n                                                       [(ngModel)]=\"week.attendance.women\"\n                                                       min=\"0\"\n                                                       step=\"1\"\n                                                       class=\"form-control sea-green\"\n                                                >\n                                            </td>\n                                            <td>\n                                                <input type=\"number\"\n                                                       [name]=\"'week' + i + 'children' + j\"\n                                                       [(ngModel)]=\"week.attendance.children\"\n                                                       min=\"0\"\n                                                       step=\"1\"\n                                                       class=\"form-control sea-green\"\n                                                >\n                                            </td>\n                                            <td>\n                                                <input type=\"number\"\n                                                       [name]=\"'week' + i + 'a_total' + j\"\n                                                       [(ngModel)]=\"week.attendance.total\"\n                                                       min=\"0\"\n                                                       step=\"1\"\n                                                       class=\"form-control\"\n                                                       disabled\n                                                >\n                                            </td>\n                                            <td class=\"blank\" style=\"width: 1%\">&nbsp;</td>\n                                            <td>\n                                                <input type=\"number\"\n                                                       [name]=\"'week' + i + 'offering' + j\"\n                                                       [(ngModel)]=\"week.monetary.offering\"\n                                                       min=\"0\"\n                                                       step=\"0.01\"\n                                                       class=\"form-control sea-green\"\n                                                >\n                                            </td>\n                                            <td>\n                                                <input type=\"number\"\n                                                       [name]=\"'week' + i + 'pastor' + j\"\n                                                       [(ngModel)]=\"week.monetary.tithe.pastor\"\n                                                       min=\"0\"\n                                                       step=\"0.01\"\n                                                       class=\"form-control sea-green\"\n                                                >\n                                            </td>\n                                            <td>\n                                                <input type=\"number\"\n                                                       [name]=\"'week' + i + 'general' + j\"\n                                                       [(ngModel)]=\"week.monetary.tithe.general\"\n                                                       min=\"0\"\n                                                       step=\"0.01\"\n                                                       class=\"form-control sea-green\"\n                                                >\n                                            </td>\n                                            <td>\n                                                <input type=\"number\"\n                                                       [name]=\"'week' + i + 'f_fruit' + j\"\n                                                       [(ngModel)]=\"week.monetary.f_fruit\"\n                                                       min=\"0\"\n                                                       step=\"0.01\"\n                                                       class=\"form-control sea-green\"\n                                                >\n                                            </td>\n                                            <td>\n                                                <input type=\"number\"\n                                                       [name]=\"'week' + i + 't_giving' + j\"\n                                                       [(ngModel)]=\"week.monetary.t_giving\"\n                                                       min=\"0\"\n                                                       step=\"0.01\"\n                                                       class=\"form-control sea-green\"\n                                                >\n                                            </td>\n                                            <td>\n                                                <input type=\"number\"\n                                                       [name]=\"'week' + i + 'm_total' + j\"\n                                                       [(ngModel)]=\"week.monetary.total\"\n                                                       min=\"0\"\n                                                       step=\"0.01\"\n                                                       class=\"form-control\"\n                                                       disabled\n                                                >\n                                            </td>\n                                        </tr>\n                                        </tbody>\n                                        <tbody>\n                                        <tr>\n                                            <td class=\"blank\" colspan=\"6\">&nbsp;</td>\n                                            <td colspan=\"2\">\n                                                <strong>Weekly Total</strong>\n                                            </td>\n                                            <td>\n                                                <b>\n                                                    <input type=\"number\"\n                                                           [name]=\"'weekly_total' + i + 'offering'\"\n                                                           [(ngModel)]=\"progress_report.report.weekly[i].weekly_total.monetary.offering\"\n                                                           min=\"0\"\n                                                           step=\"1\"\n                                                           class=\"form-control\"\n                                                           disabled\n                                                    >\n                                                </b>\n                                            </td>\n                                            <td>\n                                                <input type=\"number\"\n                                                       [name]=\"'weekly_total' + i + 'pastor'\"\n                                                       [(ngModel)]=\"progress_report.report.weekly[i].weekly_total.monetary.tithe.pastor\"\n                                                       min=\"0\"\n                                                       step=\"1\"\n                                                       class=\"form-control\"\n                                                       disabled\n                                                >\n                                            </td>\n                                            <td>\n                                                <b>\n                                                    <input type=\"number\"\n                                                           [name]=\"'weekly_total' + i + 'general'\"\n                                                           [(ngModel)]=\"progress_report.report.weekly[i].weekly_total.monetary.tithe.general\"\n                                                           min=\"0\"\n                                                           step=\"1\"\n                                                           class=\"form-control\"\n                                                           disabled\n                                                    >\n                                                </b>\n                                            </td>\n                                            <td>\n                                                <input type=\"number\"\n                                                       [name]=\"'weekly_total' + i + 'f_fruit'\"\n                                                       [(ngModel)]=\"progress_report.report.weekly[i].weekly_total.monetary.f_fruit\"\n                                                       min=\"0\"\n                                                       step=\"1\"\n                                                       class=\"form-control\"\n                                                       disabled\n                                                >\n                                            </td>\n                                            <td>\n                                                <b>\n                                                    <input type=\"number\"\n                                                           [name]=\"'weekly_total' + i + 't_giving'\"\n                                                           [(ngModel)]=\"progress_report.report.weekly[i].weekly_total.monetary.t_giving\"\n                                                           min=\"0\"\n                                                           step=\"1\"\n                                                           class=\"form-control\"\n                                                           disabled\n                                                    >\n                                                </b>\n                                            </td>\n                                            <td>\n                                                <b>\n                                                    <input type=\"number\"\n                                                           [name]=\"'weekly_total' + i + 'total'\"\n                                                           [(ngModel)]=\"progress_report.report.weekly[i].weekly_total.monetary.total\"\n                                                           min=\"0\"\n                                                           step=\"1\"\n                                                           class=\"form-control\"\n                                                           disabled\n                                                    >\n                                                </b>\n                                            </td>\n                                        </tr>\n                                        </tbody>\n                                    </table>\n                                    <!-- Week Generating Section End -->\n\n                                </td>\n                            </tr>\n                            <!-- First section end -->\n\n                            <!-- Last section start -->\n                            <tr *ngIf=\"progress_report.crucial_date != undefined && displaymode\">\n                                <td colspan=\"14\">\n                                    <table class=\"table\" style=\"margin-bottom: 0;\">\n                                        <tbody>\n                                        <tr>\n                                            <td colspan=\"6\">\n                                                <p>Monthly Average Attendance(MAA)</p>\n                                            </td>\n                                            <td colspan=\"2\">\n                                                <strong>Monthly Total</strong>\n                                            </td>\n                                            <td>\n                                                <b>\n                                                    <input type=\"number\"\n                                                           [name]=\"'monthly_total' +  'offering'\"\n                                                           [(ngModel)]=\"progress_report.report.monthly_total.monetary.offering\"\n                                                           min=\"0\"\n                                                           step=\"1\"\n                                                           class=\"form-control\"\n                                                           disabled\n                                                    >\n                                                </b>\n                                            </td>\n                                            <td>\n                                                <b>\n                                                    <input type=\"number\"\n                                                           [name]=\"'monthly_total' +  'pastor'\"\n                                                           [(ngModel)]=\"progress_report.report.monthly_total.monetary.tithe.pastor\"\n                                                           min=\"0\"\n                                                           step=\"1\"\n                                                           class=\"form-control\"\n                                                           disabled\n                                                    >\n                                                </b>\n                                            </td>\n                                            <td>\n                                                <b>\n                                                    <input type=\"number\"\n                                                           [name]=\"'monthly_total' +  'general'\"\n                                                           [(ngModel)]=\"progress_report.report.monthly_total.monetary.tithe.general\"\n                                                           min=\"0\"\n                                                           step=\"1\"\n                                                           class=\"form-control\"\n                                                           disabled\n                                                    >\n                                                </b>\n                                            </td>\n                                            <td>\n                                                <input type=\"number\"\n                                                       [name]=\"'monthly_total' +  'f_fruit'\"\n                                                       [(ngModel)]=\"progress_report.report.monthly_total.monetary.f_fruit\"\n                                                       min=\"0\"\n                                                       step=\"1\"\n                                                       class=\"form-control\"\n                                                       disabled\n                                                >\n                                            </td>\n                                            <td>\n                                                <b>\n                                                    <input type=\"number\"\n                                                           [name]=\"'monthly_total' +  't_giving'\"\n                                                           [(ngModel)]=\"progress_report.report.monthly_total.monetary.t_giving\"\n                                                           min=\"0\"\n                                                           step=\"1\"\n                                                           class=\"form-control\"\n                                                           disabled\n                                                    >\n                                                </b>\n                                            </td>\n                                            <td>\n                                                <b>\n                                                    <input type=\"number\"\n                                                           [name]=\"'monthly_total' +  'm_total'\"\n                                                           [(ngModel)]=\"progress_report.report.monthly_total.monetary.total\"\n                                                           min=\"0\"\n                                                           step=\"1\"\n                                                           class=\"form-control\"\n                                                           disabled\n                                                    >\n                                                </b>\n                                            </td>\n                                        </tr>\n                                        </tbody>\n                                        <tbody>\n                                        <tr>\n                                            <td colspan=\"2\"><span>Services</span></td>\n                                            <td><span>Children</span></td>\n                                            <td><span>Women</span></td>\n                                            <td><span>Men</span></td>\n                                            <td><span>Total</span></td>\n                                            <td colspan=\"4\">\n                                                <strong>Parish Start Date: <span class=\"date\">{{ progress_report.parish_start_date }}</span></strong>\n                                            </td>\n                                            <td><span>Area Contrib.</span></td>\n                                            <td>\n                                                <b><input type=\"text\" class=\"form-control highlight\" value=\"{{ progress_report.area_dues }}\" disabled></b>\n                                            </td>\n                                            <td><span>WEM</span></td>\n                                            <td>\n                                                <b>\n\n                                                    <input type=\"number\"\n                                                           [name]=\"'monthly_total' +  'wemshare'\"\n                                                           [(ngModel)]=\"progress_report.wem_share\"\n                                                           min=\"0\"\n                                                           step=\"1\"\n                                                           class=\"form-control\"\n                                                           disabled\n                                                    >\n                                                </b>\n                                            </td>\n                                        </tr>\n                                        </tbody>\n                                        <tbody>\n                                        <tr>\n                                            <td colspan=\"2\"><span>Sunday School</span></td>\n                                            <td class=\"highlight-light\">\n                                                <input type=\"text\" class=\"form-control highlight-light\" value=\"{{ child_sunday }}\" disabled>\n                                            </td>\n                                            <td class=\"highlight-light\">\n                                                <input type=\"text\" class=\"form-control highlight-light\" value=\"{{ women_sunday }}\" disabled>\n                                            </td>\n                                            <td class=\"highlight-light\">\n                                                <input type=\"text\" class=\"form-control highlight-light\" value=\"{{ men_sunday }}\" disabled>\n                                            </td>\n                                            <td class=\"highlight-light\">\n                                                <b><input type=\"text\" class=\"form-control highlight-light\"\n                                                          value=\"{{ child_sunday + women_sunday + men_sunday }}\" disabled></b>\n                                            </td>\n                                            <td colspan=\"2\">\n                                                <strong>Adults only: </strong>\n                                            </td>\n                                            <td colspan=\"2\" class=\"highlight\">\n                                                <strong><span class=\"highlight maa\">MAA(Adults Only)</span></strong>\n                                            </td>\n                                            <td colspan=\"4\"><span>Projected Parish Numerical Strength</span></td>\n                                        </tr>\n                                        </tbody>\n                                        <tbody>\n                                        <tr>\n                                            <td colspan=\"2\"><span>Sunday</span></td>\n                                            <td class=\"highlight-light\">\n                                                <input type=\"text\" class=\"form-control highlight-light\" value=\"{{ child_sunday_service }}\" disabled>\n                                            </td>\n                                            <td class=\"highlight-light\">\n                                                <input type=\"text\" class=\"form-control highlight-light\" value=\"{{ women_sunday_service }}\" disabled>\n                                            </td>\n                                            <td class=\"highlight-light\">\n                                                <input type=\"text\" class=\"form-control highlight-light\" value=\"{{ men_sunday_service }}\" disabled>\n                                            </td>\n                                            <td class=\"highlight-light\">\n                                                <b><input type=\"text\" class=\"form-control highlight-light\" value=\"{{ child_sunday_service + women_sunday_service + men_sunday_service }}\" disabled></b>\n                                            </td>\n                                            <td>\n                                                <span>Sunday</span>\n                                            </td>\n                                            <td class=\"highlight-light\">\n                                                <input type=\"text\" class=\"form-control highlight-light\" value=\"{{ men_sunday_service + women_sunday_service }}\" disabled>\n                                            </td>\n                                            <td colspan=\"2\" style=\"border-bottom: 0;\">\n                                                <input type=\"text\" class=\"form-control\" value=\"\" disabled>\n                                            </td>\n                                            <td colspan=\"4\" style=\"border-bottom: 0;\">\n                                                <input type=\"text\" class=\"form-control\" value=\"\" disabled>\n                                            </td>\n                                        </tr>\n                                        </tbody>\n                                        <tbody>\n                                        <tr>\n                                            <td colspan=\"2\"><span>Mid Week</span></td>\n                                            <td class=\"highlight-light\">\n                                                <input type=\"text\" class=\"form-control highlight-light\" value=\"{{ midWeek_child }}\" disabled>\n                                            </td>\n                                            <td class=\"highlight-light\">\n                                                <input type=\"text\" class=\"form-control highlight-light\" value=\"{{ midWeek_women }}\" disabled>\n                                            </td>\n                                            <td class=\"highlight-light\">\n                                                <input type=\"text\" class=\"form-control highlight-light\" value=\"{{ midWeek_men }}\" disabled>\n                                            </td>\n                                            <td class=\"highlight-light\">\n                                                <b><input type=\"text\" class=\"form-control highlight-light\"\n                                                          value=\"{{ midWeek_child + midWeek_men + midWeek_women }}\" disabled></b>\n                                            </td>\n                                            <td>\n                                                <span>Mid Week</span>\n                                            </td>\n                                            <td class=\"highlight-light\">\n                                                <input type=\"text\" class=\"form-control highlight-light\" value=\"{{ midWeek_men + midWeek_women }}\" disabled>\n                                            </td>\n                                            <td colspan=\"2\" style=\"border-top: 0;\" class=\"highlight\">\n                                                <b><input type=\"text\" class=\"form-control highlight\" value=\"{{ midWeek_men + midWeek_women + men_sunday_service + women_sunday_service }}\" disabled></b>\n                                            </td>\n                                            <td colspan=\"4\" style=\"border-top: 0;\">\n                                                <b><input type=\"text\" class=\"form-control\" value=\"{{ (midWeek_men + midWeek_women + men_sunday_service + women_sunday_service) +((midWeek_men + midWeek_women + men_sunday_service + women_sunday_service )*.02)}}\" disabled></b>\n                                            </td>\n                                        </tr>\n                                        </tbody>\n                                        <tbody>\n                                        <tr>\n                                            <td colspan=\"2\" class=\"monthly-growth\"><span>Monthly Growth</span></td>\n                                            <td><span>Number of Births</span></td>\n                                            <td class=\"sea-green\">\n                                                <b class=\"sea-green\"><input type=\"text\" class=\"form-control sea-green\"\n                                                                            value=\"{{ progress_report.no_of_birth }}\" [(ngModel)]=\"progress_report.no_of_birth\" name=\"no_of_birth\"></b>\n                                            </td>\n                                            <td><span>Number of Deaths</span></td>\n                                            <td class=\"sea-green\">\n                                                <b class=\"sea-green\"><input type=\"text\" class=\"form-control sea-green\"\n                                                                            value=\"{{ progress_report.no_of_death }}\" [(ngModel)]=\"progress_report.no_of_death\" name=\"no_of_death\"></b>\n                                            </td>\n                                            <td colspan=\"2\"><span>Number of Marriages</span></td>\n                                            <td class=\"sea-green\">\n                                                <b class=\"sea-green\"><input type=\"text\" class=\"form-control sea-green\"\n                                                                            value=\"{{ progress_report.no_of_marrg }}\" [(ngModel)]=\"progress_report.no_of_marrg\" name=\"no_of_marrg\"></b>\n                                            </td>\n                                            <td><span>Number of Souls Saved</span></td>\n                                            <td class=\"sea-green\">\n                                                <b class=\"sea-green\"><input type=\"text\" class=\"form-control sea-green\"\n                                                                            value=\"{{ progress_report.no_of_souls_saved }}\" [(ngModel)]=\"progress_report.no_of_souls_saved\" name=\"no_of_souls_saved\"></b>\n                                            </td>\n                                            <td colspan=\"2\"><span>Number of New Workers</span></td>\n                                            <td class=\"sea-green\">\n                                                <b class=\"sea-green\"><input type=\"text\" class=\"form-control sea-green\" name =\"no_of_new_workers\" [(ngModel)]=\"progress_report.no_of_new_workers\"\n                                                                            value=\"{{ progress_report.no_of_new_workers }}\"></b>\n                                            </td>\n                                        </tr>\n                                        </tbody>\n                                    </table>\n                                </td>\n                            </tr>\n                            <!-- Last section end -->\n                            </tbody>\n                        </table>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class=\"col-md-6\">\n        <button class=\"btn btn-primary form-control\"\n                *ngIf=\"progress_report.crucial_date != undefined && !viewMode\"\n                (click)=\"onSubmit('save')\">\n            Submit\n        </button>\n    </div>\n    <div class=\"col-md-6\">\n        <button class=\"btn btn-primary form-control\"\n                *ngIf=\"progress_report.crucial_date != undefined && !viewMode\"\n                (click)=\"onSubmit('draft')\">\n            Draft\n        </button>\n    </div>\n</form>\n"

/***/ }),

/***/ "../../../../../src/app/report/create-report/create-report.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__report_service__ = __webpack_require__("../../../../../src/app/report/report.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__auth_auth_service__ = __webpack_require__("../../../../../src/app/auth/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_moment__ = __webpack_require__("../../../../moment/moment.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__province_zone_area_parish_province_zone_area_parish_service__ = __webpack_require__("../../../../../src/app/province-zone-area-parish/province-zone-area-parish.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CreateReportComponent; });
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







var CreateReportComponent = (function () {
    function CreateReportComponent(authService, reportService, router, activatedRoute, pzapService) {
        this.authService = authService;
        this.reportService = reportService;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.pzapService = pzapService;
        this.editMode = false;
        this.viewMode = false;
        this.createMode = false;
        this.displaymode = true;
        this.responseMsg = '';
        this.responseStatus = false;
        this.responseReceived = false;
        this.parishShow = false;
        this.count = 0;
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
        this.temp_report = {
            'wem_percentage': 0,
            'wem_share': 0,
            'account_name': '',
            'parish_id': 0,
            'parish_pastor': '',
            'area_pastor': '',
            'zonal_pastor': '',
            'province_pastor': '',
            'crucial_date': '',
            'parish_start_date': '',
            'area_dues': 0,
            'month': '',
            'year': '',
            'no_of_birth': 0,
            'no_of_death': 0,
            'no_of_marrg': 0,
            'no_of_new_workers': 0,
            'no_of_souls_saved': 0,
            'report': {
                'monthly_total': {
                    'attendance': {
                        'men': null,
                        'women': null,
                        'children': null,
                        'total': null
                    },
                    'monetary': {
                        'offering': null,
                        'tithe': {
                            'pastor': null,
                            'general': null
                        },
                        'f_fruit': null,
                        't_giving': null,
                        'total': null
                    }
                },
                'weekly': [
                    {
                        'weekly_total': {
                            'attendance': {
                                'men': null,
                                'women': null,
                                'children': null,
                                'total': null,
                            },
                            'monetary': {
                                'offering': null,
                                'tithe': {
                                    'pastor': null,
                                    'general': null
                                },
                                'f_fruit': null,
                                't_giving': null,
                                'total': null
                            }
                        },
                        'days': [
                            {
                                'date': 'Sunday',
                                'day': '1',
                                'programmes': '',
                                'attendance': {
                                    'men': null,
                                    'women': null,
                                    'children': null,
                                    'total': null
                                },
                                'monetary': {
                                    'offering': null,
                                    'tithe': {
                                        'pastor': null,
                                        'general': null
                                    },
                                    'f_fruit': null,
                                    't_giving': null,
                                    'total': null
                                }
                            },
                            {
                                'date': 'Monday',
                                'day': '2',
                                'programmes': '',
                                'attendance': {
                                    'men': null,
                                    'women': null,
                                    'children': null,
                                    'total': null
                                },
                                'monetary': {
                                    'offering': null,
                                    'tithe': {
                                        'pastor': null,
                                        'general': null
                                    },
                                    'f_fruit': null,
                                    't_giving': null,
                                    'total': null
                                }
                            },
                            {
                                'date': 'Tuesday',
                                'day': '3',
                                'programmes': '',
                                'attendance': {
                                    'men': null,
                                    'women': null,
                                    'children': null,
                                    'total': null
                                },
                                'monetary': {
                                    'offering': null,
                                    'tithe': {
                                        'pastor': null,
                                        'general': null
                                    },
                                    'f_fruit': null,
                                    't_giving': null,
                                    'total': null
                                }
                            },
                            {
                                'date': 'Wednesday',
                                'day': '4',
                                'programmes': '',
                                'attendance': {
                                    'men': null,
                                    'women': null,
                                    'children': null,
                                    'total': null
                                },
                                'monetary': {
                                    'offering': null,
                                    'tithe': {
                                        'pastor': null,
                                        'general': null
                                    },
                                    'f_fruit': null,
                                    't_giving': null,
                                    'total': null
                                }
                            },
                            {
                                'date': 'Thursday',
                                'day': '5',
                                'programmes': '',
                                'attendance': {
                                    'men': null,
                                    'women': null,
                                    'children': null,
                                    'total': null
                                },
                                'monetary': {
                                    'offering': null,
                                    'tithe': {
                                        'pastor': null,
                                        'general': null
                                    },
                                    'f_fruit': null,
                                    't_giving': null,
                                    'total': null
                                }
                            },
                            {
                                'date': 'Friday',
                                'day': '6',
                                'programmes': '',
                                'attendance': {
                                    'men': null,
                                    'women': null,
                                    'children': null,
                                    'total': null
                                },
                                'monetary': {
                                    'offering': null,
                                    'tithe': {
                                        'pastor': null,
                                        'general': null
                                    },
                                    'f_fruit': null,
                                    't_giving': null,
                                    'total': null
                                }
                            },
                            {
                                'date': 'Saturday',
                                'day': '7',
                                'programmes': '',
                                'attendance': {
                                    'men': null,
                                    'women': null,
                                    'children': null,
                                    'total': null
                                },
                                'monetary': {
                                    'offering': null,
                                    'tithe': {
                                        'pastor': null,
                                        'general': null
                                    },
                                    'f_fruit': null,
                                    't_giving': null,
                                    'total': null
                                }
                            }
                        ]
                    },
                    {
                        'weekly_total': {
                            'attendance': {
                                'men': null,
                                'women': null,
                                'children': null,
                                'total': null
                            },
                            'monetary': {
                                'offering': null,
                                'tithe': {
                                    'pastor': null,
                                    'general': null
                                },
                                'f_fruit': null,
                                't_giving': null,
                                'total': null
                            }
                        },
                        'days': [
                            {
                                'date': 'Sunday',
                                'day': '8',
                                'programmes': '',
                                'attendance': {
                                    'men': null,
                                    'women': null,
                                    'children': null,
                                    'total': null
                                },
                                'monetary': {
                                    'offering': null,
                                    'tithe': {
                                        'pastor': null,
                                        'general': null
                                    },
                                    'f_fruit': null,
                                    't_giving': null,
                                    'total': null
                                }
                            },
                            {
                                'date': 'Monday',
                                'day': '9',
                                'programmes': '',
                                'attendance': {
                                    'men': null,
                                    'women': null,
                                    'children': null,
                                    'total': null
                                },
                                'monetary': {
                                    'offering': null,
                                    'tithe': {
                                        'pastor': null,
                                        'general': null
                                    },
                                    'f_fruit': null,
                                    't_giving': null,
                                    'total': null
                                }
                            },
                            {
                                'date': 'Tuesday',
                                'day': '10',
                                'programmes': '',
                                'attendance': {
                                    'men': null,
                                    'women': null,
                                    'children': null,
                                    'total': null
                                },
                                'monetary': {
                                    'offering': null,
                                    'tithe': {
                                        'pastor': null,
                                        'general': null
                                    },
                                    'f_fruit': null,
                                    't_giving': null,
                                    'total': null
                                }
                            },
                            {
                                'date': 'Wednesday',
                                'day': '11',
                                'programmes': '',
                                'attendance': {
                                    'men': null,
                                    'women': null,
                                    'children': null,
                                    'total': null
                                },
                                'monetary': {
                                    'offering': null,
                                    'tithe': {
                                        'pastor': null,
                                        'general': null
                                    },
                                    'f_fruit': null,
                                    't_giving': null,
                                    'total': null
                                }
                            },
                            {
                                'date': 'Thursday',
                                'day': '12',
                                'programmes': '',
                                'attendance': {
                                    'men': null,
                                    'women': null,
                                    'children': null,
                                    'total': null
                                },
                                'monetary': {
                                    'offering': null,
                                    'tithe': {
                                        'pastor': null,
                                        'general': null
                                    },
                                    'f_fruit': null,
                                    't_giving': null,
                                    'total': null
                                }
                            },
                            {
                                'date': 'Friday',
                                'day': '13',
                                'programmes': '',
                                'attendance': {
                                    'men': null,
                                    'women': null,
                                    'children': null,
                                    'total': null
                                },
                                'monetary': {
                                    'offering': null,
                                    'tithe': {
                                        'pastor': null,
                                        'general': null
                                    },
                                    'f_fruit': null,
                                    't_giving': null,
                                    'total': null
                                }
                            },
                            {
                                'date': 'Saturday',
                                'day': '14',
                                'programmes': '',
                                'attendance': {
                                    'men': null,
                                    'women': null,
                                    'children': null,
                                    'total': null
                                },
                                'monetary': {
                                    'offering': null,
                                    'tithe': {
                                        'pastor': null,
                                        'general': null
                                    },
                                    'f_fruit': null,
                                    't_giving': null,
                                    'total': null
                                }
                            }
                        ]
                    },
                    {
                        'weekly_total': {
                            'attendance': {
                                'men': null,
                                'women': null,
                                'children': null,
                                'total': null
                            },
                            'monetary': {
                                'offering': null,
                                'tithe': {
                                    'pastor': null,
                                    'general': null
                                },
                                'f_fruit': null,
                                't_giving': null,
                                'total': null
                            }
                        },
                        'days': [
                            {
                                'date': 'Sunday',
                                'day': '15',
                                'programmes': '',
                                'attendance': {
                                    'men': null,
                                    'women': null,
                                    'children': null,
                                    'total': null
                                },
                                'monetary': {
                                    'offering': null,
                                    'tithe': {
                                        'pastor': null,
                                        'general': null
                                    },
                                    'f_fruit': null,
                                    't_giving': null,
                                    'total': null
                                }
                            },
                            {
                                'date': 'Monday',
                                'day': '16',
                                'programmes': '',
                                'attendance': {
                                    'men': null,
                                    'women': null,
                                    'children': null,
                                    'total': null
                                },
                                'monetary': {
                                    'offering': null,
                                    'tithe': {
                                        'pastor': null,
                                        'general': null
                                    },
                                    'f_fruit': null,
                                    't_giving': null,
                                    'total': null
                                }
                            },
                            {
                                'date': 'Tuesday',
                                'day': '17',
                                'programmes': '',
                                'attendance': {
                                    'men': null,
                                    'women': null,
                                    'children': null,
                                    'total': null
                                },
                                'monetary': {
                                    'offering': null,
                                    'tithe': {
                                        'pastor': null,
                                        'general': null
                                    },
                                    'f_fruit': null,
                                    't_giving': null,
                                    'total': null
                                }
                            },
                            {
                                'date': 'Wednesday',
                                'day': '18',
                                'programmes': '',
                                'attendance': {
                                    'men': null,
                                    'women': null,
                                    'children': null,
                                    'total': null
                                },
                                'monetary': {
                                    'offering': null,
                                    'tithe': {
                                        'pastor': null,
                                        'general': null
                                    },
                                    'f_fruit': null,
                                    't_giving': null,
                                    'total': null
                                }
                            },
                            {
                                'date': 'Thursday',
                                'day': '19',
                                'programmes': '',
                                'attendance': {
                                    'men': null,
                                    'women': null,
                                    'children': null,
                                    'total': null
                                },
                                'monetary': {
                                    'offering': null,
                                    'tithe': {
                                        'pastor': null,
                                        'general': null
                                    },
                                    'f_fruit': null,
                                    't_giving': null,
                                    'total': null
                                }
                            },
                            {
                                'date': 'Friday',
                                'day': '20',
                                'programmes': '',
                                'attendance': {
                                    'men': null,
                                    'women': null,
                                    'children': null,
                                    'total': null
                                },
                                'monetary': {
                                    'offering': null,
                                    'tithe': {
                                        'pastor': null,
                                        'general': null
                                    },
                                    'f_fruit': null,
                                    't_giving': null,
                                    'total': null
                                }
                            },
                            {
                                'date': 'Saturday',
                                'day': '21',
                                'programmes': '',
                                'attendance': {
                                    'men': null,
                                    'women': null,
                                    'children': null,
                                    'total': null
                                },
                                'monetary': {
                                    'offering': null,
                                    'tithe': {
                                        'pastor': null,
                                        'general': null
                                    },
                                    'f_fruit': null,
                                    't_giving': null,
                                    'total': null
                                }
                            }
                        ]
                    },
                    {
                        'weekly_total': {
                            'attendance': {
                                'men': null,
                                'women': null,
                                'children': null,
                                'total': null
                            },
                            'monetary': {
                                'offering': null,
                                'tithe': {
                                    'pastor': null,
                                    'general': null
                                },
                                'f_fruit': null,
                                't_giving': null,
                                'total': null
                            }
                        },
                        'days': [
                            {
                                'date': 'Sunday',
                                'day': '22',
                                'programmes': '',
                                'attendance': {
                                    'men': null,
                                    'women': null,
                                    'children': null,
                                    'total': null
                                },
                                'monetary': {
                                    'offering': null,
                                    'tithe': {
                                        'pastor': null,
                                        'general': null
                                    },
                                    'f_fruit': null,
                                    't_giving': null,
                                    'total': null
                                }
                            },
                            {
                                'date': 'Monday',
                                'day': '23',
                                'programmes': '',
                                'attendance': {
                                    'men': null,
                                    'women': null,
                                    'children': null,
                                    'total': null
                                },
                                'monetary': {
                                    'offering': null,
                                    'tithe': {
                                        'pastor': null,
                                        'general': null
                                    },
                                    'f_fruit': null,
                                    't_giving': null,
                                    'total': null
                                }
                            },
                            {
                                'date': 'Tuesday',
                                'day': '24',
                                'programmes': '',
                                'attendance': {
                                    'men': null,
                                    'women': null,
                                    'children': null,
                                    'total': null
                                },
                                'monetary': {
                                    'offering': null,
                                    'tithe': {
                                        'pastor': null,
                                        'general': null
                                    },
                                    'f_fruit': null,
                                    't_giving': null,
                                    'total': null
                                }
                            },
                            {
                                'date': 'Wednesday',
                                'day': '25',
                                'programmes': '',
                                'attendance': {
                                    'men': null,
                                    'women': null,
                                    'children': null,
                                    'total': null
                                },
                                'monetary': {
                                    'offering': null,
                                    'tithe': {
                                        'pastor': null,
                                        'general': null
                                    },
                                    'f_fruit': null,
                                    't_giving': null,
                                    'total': null
                                }
                            },
                            {
                                'date': 'Thursday',
                                'day': '26',
                                'programmes': '',
                                'attendance': {
                                    'men': null,
                                    'women': null,
                                    'children': null,
                                    'total': null
                                },
                                'monetary': {
                                    'offering': null,
                                    'tithe': {
                                        'pastor': null,
                                        'general': null
                                    },
                                    'f_fruit': null,
                                    't_giving': null,
                                    'total': null
                                }
                            },
                            {
                                'date': 'Friday',
                                'day': '27',
                                'programmes': '',
                                'attendance': {
                                    'men': null,
                                    'women': null,
                                    'children': null,
                                    'total': null
                                },
                                'monetary': {
                                    'offering': null,
                                    'tithe': {
                                        'pastor': null,
                                        'general': null
                                    },
                                    'f_fruit': null,
                                    't_giving': null,
                                    'total': null
                                }
                            },
                            {
                                'date': 'Saturday',
                                'day': '28',
                                'programmes': '',
                                'attendance': {
                                    'men': null,
                                    'women': null,
                                    'children': null,
                                    'total': null
                                },
                                'monetary': {
                                    'offering': null,
                                    'tithe': {
                                        'pastor': null,
                                        'general': null
                                    },
                                    'f_fruit': null,
                                    't_giving': null,
                                    'total': null
                                }
                            }
                        ]
                    }
                ]
            }
        };
        this.progress_report = this.temp_report;
    }
    CreateReportComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.displaymode = true;
        this.title = "Create Report";
        this.prForm.valueChanges
            .subscribe(function (response) {
            var monthTemp = {
                'attendance': {
                    'men': 0,
                    'women': 0,
                    'children': 0,
                    'total': 0,
                    'sunday_child': 0,
                    'sunday_service_child': 0,
                    'sunday_women': 0,
                    'sunday_service_women': 0,
                    'sunday_men': 0,
                    'sunday_service_men': 0,
                    'mid_week_men': 0,
                    'mid_week_women': 0,
                    'mid_week_child': 0,
                },
                'monetary': {
                    'offering': 0,
                    'tithe': {
                        'pastor': 0,
                        'general': 0,
                    },
                    'f_fruit': 0,
                    't_giving': 0,
                    'total': 0
                }
            };
            _this.sundaychild = [];
            _this.sundayServicechild = [];
            _this.sundaywomen = [];
            _this.sundayServicewomen = [];
            _this.sundaymen = [];
            _this.sundayServicemen = [];
            _this.midWeekmen = [];
            _this.midWeekwomen = [];
            _this.midWeekchild = [];
            for (var i = 0; i < _this.progress_report.report.weekly.length; i++) {
                var weeklyTemp = {
                    'attendance': {
                        'men': 0,
                        'women': 0,
                        'children': 0,
                        'total': 0,
                        'sunday_child': 0,
                        'sunday_service_child': 0,
                        'sunday_women': 0,
                        'sunday_service_women': 0,
                        'sunday_men': 0,
                        'sunday_service_men': 0,
                        'mid_week_men': 0,
                        'mid_week_women': 0,
                        'mid_week_child': 0,
                    },
                    'monetary': {
                        'offering': 0,
                        'tithe': {
                            'pastor': 0,
                            'general': 0
                        },
                        'f_fruit': 0,
                        't_giving': 0,
                        'total': 0
                    }
                };
                for (var j = 0; j < _this.progress_report.report.weekly[i].days.length; j++) {
                    /** Calculating and saving daily attendance */
                    _this.progress_report.report.weekly[i].days[j].attendance.total = _this.progress_report.report.weekly[i].days[j].attendance.men + _this.progress_report.report.weekly[i].days[j].attendance.women + _this.progress_report.report.weekly[i].days[j].attendance.children;
                    /** Calculating and saving daily monetary */
                    _this.progress_report.report.weekly[i].days[j].monetary.total = _this.progress_report.report.weekly[i].days[j].monetary.offering + _this.progress_report.report.weekly[i].days[j].monetary.tithe.general + _this.progress_report.report.weekly[i].days[j].monetary.tithe.pastor + _this.progress_report.report.weekly[i].days[j].monetary.f_fruit + _this.progress_report.report.weekly[i].days[j].monetary.t_giving;
                    /** Calculating weekly attendance */
                    weeklyTemp.attendance.men += _this.progress_report.report.weekly[i].days[j].attendance.men;
                    weeklyTemp.attendance.women += _this.progress_report.report.weekly[i].days[j].attendance.women;
                    weeklyTemp.attendance.children += _this.progress_report.report.weekly[i].days[j].attendance.children;
                    weeklyTemp.attendance.total += _this.progress_report.report.weekly[i].days[j].attendance.total;
                    if (_this.progress_report.report.weekly[i].days[j].programmes == 'Sunday School') {
                        weeklyTemp.attendance.sunday_child += _this.progress_report.report.weekly[i].days[j].attendance.children;
                        weeklyTemp.attendance.sunday_women += _this.progress_report.report.weekly[i].days[j].attendance.women;
                        weeklyTemp.attendance.sunday_men += _this.progress_report.report.weekly[i].days[j].attendance.men;
                    }
                    if (_this.progress_report.report.weekly[i].days[j].programmes == 'Sunday Service') {
                        weeklyTemp.attendance.sunday_service_child += _this.progress_report.report.weekly[i].days[j].attendance.children;
                        weeklyTemp.attendance.sunday_service_women += _this.progress_report.report.weekly[i].days[j].attendance.women;
                        weeklyTemp.attendance.sunday_service_men += _this.progress_report.report.weekly[i].days[j].attendance.men;
                    }
                    if (_this.progress_report.report.weekly[i].days[j].programmes != 'Sunday Service' && _this.progress_report.report.weekly[i].days[j].programmes != 'Sunday School') {
                        weeklyTemp.attendance.mid_week_men += _this.progress_report.report.weekly[i].days[j].attendance.men;
                        weeklyTemp.attendance.mid_week_women += _this.progress_report.report.weekly[i].days[j].attendance.women;
                        weeklyTemp.attendance.mid_week_child += _this.progress_report.report.weekly[i].days[j].attendance.children;
                    }
                    /** Calculating weekly monetary */
                    weeklyTemp.monetary.offering += _this.progress_report.report.weekly[i].days[j].monetary.offering;
                    weeklyTemp.monetary.tithe.pastor += _this.progress_report.report.weekly[i].days[j].monetary.tithe.pastor;
                    weeklyTemp.monetary.tithe.general += _this.progress_report.report.weekly[i].days[j].monetary.tithe.general;
                    weeklyTemp.monetary.f_fruit += _this.progress_report.report.weekly[i].days[j].monetary.f_fruit;
                    weeklyTemp.monetary.t_giving += _this.progress_report.report.weekly[i].days[j].monetary.t_giving;
                    weeklyTemp.monetary.total += _this.progress_report.report.weekly[i].days[j].monetary.total;
                }
                /** Saving weekly attendance */
                _this.progress_report.report.weekly[i].weekly_total.attendance.men = weeklyTemp.attendance.men;
                _this.progress_report.report.weekly[i].weekly_total.attendance.women = weeklyTemp.attendance.women;
                _this.progress_report.report.weekly[i].weekly_total.attendance.children = weeklyTemp.attendance.children;
                _this.progress_report.report.weekly[i].weekly_total.attendance.total = weeklyTemp.attendance.total;
                _this.sundaychild[i] = weeklyTemp.attendance.sunday_child;
                _this.sundayServicechild[i] = weeklyTemp.attendance.sunday_service_child;
                _this.sundaywomen[i] = weeklyTemp.attendance.sunday_women;
                _this.sundayServicewomen[i] = weeklyTemp.attendance.sunday_service_women;
                _this.sundaymen[i] = weeklyTemp.attendance.sunday_men;
                _this.sundayServicemen[i] = weeklyTemp.attendance.sunday_service_men;
                _this.midWeekmen[i] = weeklyTemp.attendance.mid_week_men;
                _this.midWeekwomen[i] = weeklyTemp.attendance.mid_week_women;
                _this.midWeekchild[i] = weeklyTemp.attendance.mid_week_child;
                /** Saving weekly monetary */
                _this.progress_report.report.weekly[i].weekly_total.monetary.offering = weeklyTemp.monetary.offering;
                _this.progress_report.report.weekly[i].weekly_total.monetary.tithe.pastor = weeklyTemp.monetary.tithe.pastor;
                _this.progress_report.report.weekly[i].weekly_total.monetary.tithe.general = weeklyTemp.monetary.tithe.general;
                _this.progress_report.report.weekly[i].weekly_total.monetary.f_fruit = weeklyTemp.monetary.f_fruit;
                _this.progress_report.report.weekly[i].weekly_total.monetary.t_giving = weeklyTemp.monetary.t_giving;
                _this.progress_report.report.weekly[i].weekly_total.monetary.total = weeklyTemp.monetary.total;
                /** Calculating monthly attendance */
                monthTemp.attendance.men += _this.progress_report.report.weekly[i].weekly_total.attendance.men;
                monthTemp.attendance.women += _this.progress_report.report.weekly[i].weekly_total.attendance.women;
                monthTemp.attendance.children += _this.progress_report.report.weekly[i].weekly_total.attendance.children;
                monthTemp.attendance.total += _this.progress_report.report.weekly[i].weekly_total.attendance.total;
                monthTemp.attendance.sunday_child += _this.sundaychild[i];
                monthTemp.attendance.sunday_service_child += _this.sundayServicechild[i];
                monthTemp.attendance.sunday_women += _this.sundaywomen[i];
                monthTemp.attendance.sunday_service_women += _this.sundayServicewomen[i];
                monthTemp.attendance.sunday_men += _this.sundaymen[i];
                monthTemp.attendance.sunday_service_men += _this.sundayServicemen[i];
                monthTemp.attendance.mid_week_men += _this.midWeekmen[i];
                monthTemp.attendance.mid_week_women += _this.midWeekwomen[i];
                monthTemp.attendance.mid_week_child += _this.midWeekchild[i];
                /** Calculating monthly monetary */
                monthTemp.monetary.offering += _this.progress_report.report.weekly[i].weekly_total.monetary.offering;
                monthTemp.monetary.tithe.pastor += _this.progress_report.report.weekly[i].weekly_total.monetary.tithe.pastor;
                monthTemp.monetary.tithe.general += _this.progress_report.report.weekly[i].weekly_total.monetary.tithe.general;
                monthTemp.monetary.f_fruit += _this.progress_report.report.weekly[i].weekly_total.monetary.f_fruit;
                monthTemp.monetary.t_giving += _this.progress_report.report.weekly[i].weekly_total.monetary.t_giving;
                monthTemp.monetary.total += _this.progress_report.report.weekly[i].weekly_total.monetary.total;
            }
            /** Saving weekly attendance */
            _this.progress_report.report.monthly_total.attendance.men = monthTemp.attendance.men;
            _this.progress_report.report.monthly_total.attendance.women = monthTemp.attendance.women;
            _this.progress_report.report.monthly_total.attendance.children = monthTemp.attendance.children;
            _this.progress_report.report.monthly_total.attendance.total = monthTemp.attendance.total;
            _this.child_sunday = monthTemp.attendance.sunday_child;
            _this.child_sunday_service = monthTemp.attendance.sunday_service_child;
            _this.women_sunday = monthTemp.attendance.sunday_women;
            _this.women_sunday_service = monthTemp.attendance.sunday_service_women;
            _this.men_sunday = monthTemp.attendance.sunday_men;
            _this.men_sunday_service = monthTemp.attendance.sunday_service_men;
            _this.midWeek_men = monthTemp.attendance.mid_week_men;
            _this.midWeek_women = monthTemp.attendance.mid_week_women;
            _this.midWeek_child = monthTemp.attendance.mid_week_child;
            /** Saving weekly monetary */
            _this.progress_report.report.monthly_total.monetary.offering = monthTemp.monetary.offering;
            _this.progress_report.report.monthly_total.monetary.tithe.pastor = monthTemp.monetary.tithe.pastor;
            _this.progress_report.report.monthly_total.monetary.tithe.general = monthTemp.monetary.tithe.general;
            _this.progress_report.report.monthly_total.monetary.f_fruit = monthTemp.monetary.f_fruit;
            _this.progress_report.report.monthly_total.monetary.t_giving = monthTemp.monetary.t_giving;
            _this.progress_report.report.monthly_total.monetary.total = monthTemp.monetary.total;
            /** Calculating wem's share */
            _this.progress_report.wem_share = _this.progress_report.report.monthly_total.monetary.total * (_this.progress_report.wem_percentage / 100);
            var date = new Date(_this.progress_report.parish_start_date);
            var parish_start_year = date.getFullYear();
            var parish_start_month = date.getMonth() + 1;
            var c_date = new Date(_this.progress_report.crucial_date);
            var crucial_date_year = c_date.getFullYear();
            var crucial_date_month = c_date.getMonth() + 1;
            var parish_age_in_months = ((crucial_date_year - parish_start_year) * 12) + (crucial_date_month - parish_start_month);
            var tithe_offering_index = (parish_age_in_months < 25) ? .1 : (parish_age_in_months < 37) ? .15 : .20;
            var thanksgiving_index = .10;
            var monthly_tithe = _this.progress_report.report.monthly_total.monetary.offering;
            var monthly_offering = _this.progress_report.report.monthly_total.monetary.tithe.general;
            var monthly_thanksgiving = _this.progress_report.report.monthly_total.monetary.t_giving;
            var monthly_wem_thankgiving = (monthly_thanksgiving * 0.3);
            var wem_income = (monthly_tithe + monthly_offering + monthly_wem_thankgiving);
            var wem_tithe_offering = (monthly_tithe + monthly_offering) * tithe_offering_index;
            var wem_thanks = (monthly_thanksgiving * .3 * thanksgiving_index);
            var wem_total = (wem_tithe_offering + wem_thanks);
            var area_dues = (wem_income - wem_total) * .05;
            _this.progress_report.area_dues = area_dues;
            _this.progress_report.wem_share = wem_total;
        }, function (error) {
            if (error.status === 401) {
                _this.authService.removeToken();
                _this.router.navigate(['/login']);
            }
        });
        this.generateReportSubscription = this.reportService.generateReport
            .subscribe(function (body) {
            if (_this.editMode) {
                _this.displaymode = true;
                _this.title = "Update Report";
                if (_this.count == 0) {
                    _this.count = 1;
                    /** Checking route params to get id of province to edit */
                    _this.activatedRoute.params
                        .subscribe(function (params) {
                        _this.reportId = params['id'];
                        _this.reportService.reportToEdit(_this.reportId)
                            .subscribe(function (response) {
                            _this.progress_report = response.json().report.progress_report;
                            _this.progress_report.account_name = response.json().report.account_name;
                            _this.parish_id = response.json().report.parish_id;
                            var tempDate = __WEBPACK_IMPORTED_MODULE_5_moment__(_this.progress_report.crucial_date);
                            _this.progress_report.crucial_date = tempDate;
                            _this.progress_report.account_name = response.json().report.account_name;
                        }, function (error) {
                            if (error.status === 401) {
                                _this.authService.removeToken();
                                _this.router.navigate(['/login']);
                            }
                        });
                    }, function (error) {
                        if (error.status === 401) {
                            _this.authService.removeToken();
                            _this.router.navigate(['/login']);
                        }
                    });
                }
            }
            else {
                _this.reportService.getReportBP(body)
                    .subscribe(function (response) {
                    var crucial_date = _this.progress_report.crucial_date;
                    _this.progress_report = response.json().progress_report[(response.json().progress_report).length - 1].progress_report;
                    _this.progress_report.crucial_date = crucial_date;
                    _this.parish_id = _this.progress_report.parish_id;
                }, function (error) {
                    if (error.status === 401) {
                        _this.authService.removeToken();
                        _this.router.navigate(['/login']);
                    }
                });
            }
        });
        /** Checking route data to get present mode */
        this.activatedRoute.data
            .subscribe(function (data) {
            _this.editMode = data['editMode'];
            _this.viewMode = data['viewMode'];
            if (_this.editMode) {
                _this.reportService.generateReport.next({});
            }
            if (_this.viewMode) {
                _this.title = "View Report";
                /** Checking route params to get id of report to edit */
                _this.activatedRoute.params
                    .subscribe(function (params) {
                    if (_this.viewMode) {
                        _this.reportId = params['id'];
                        _this.displaymode = true;
                        _this.reportService.viewReport(_this.reportId)
                            .subscribe(function (response) {
                            _this.reportIdList = response.json().allreportId;
                            _this.parish_id = response.json().report.parish_id;
                            _this.progress_report = response.json().report.progress_report;
                            var tmpDate = __WEBPACK_IMPORTED_MODULE_5_moment__(_this.progress_report.crucial_date);
                            var date = new Date(_this.progress_report.crucial_date);
                            _this.progress_report.crucial_date = tmpDate;
                            _this.progress_report.account_name = response.json().report.account_name;
                            _this.timeInfo = {
                                report_month: date.getMonth() + 1,
                                report_year: date.getFullYear()
                            };
                        });
                    }
                }, function (error) {
                    console.log(error);
                });
            }
            if (!_this.editMode && !_this.viewMode) {
                _this.createMode = true;
            }
        });
        /** List all available Parish Id's*/
        var user_type = this.authService.getToken().user_type;
        if (user_type != 3) {
            this.parishShow = true;
            this.pzapService.filterParish({})
                .subscribe(function (response) {
                if (response.json().status) {
                    _this.displaymode = true;
                    _this.parishIdList = response.json().parishes;
                }
            }, function (error) {
                console.log(error.json());
            });
        }
        else {
            this.parishShow = false;
        }
    };
    /** Function to get date while changing dates in date picker */
    CreateReportComponent.prototype.log = function (event) {
        var _this = this;
        if (event) {
            var date = new Date(event);
            this.timeInfo = {
                report_month: date.getMonth() + 1,
                report_year: date.getFullYear()
            };
            if (this.viewMode) {
                var obj = __assign({}, this.timeInfo, { parish_id: this.parish_id });
                this.reportService.fetchReport(obj)
                    .subscribe(function (response) {
                    if (response.json().status) {
                        _this.displaymode = true;
                        _this.reportIdList = response.json().allreportId;
                        var reportIsPresent = false;
                        for (var i = 0; i < _this.reportIdList.length; i++) {
                            if (_this.reportIdList[i].id == _this.reportId) {
                                reportIsPresent = true;
                            }
                        }
                        if (!reportIsPresent) {
                            _this.reportId = _this.reportIdList[0].id;
                            _this.onReportChange(_this.reportId);
                        }
                    }
                    else {
                        _this.reportIdList = response.json().allreportId;
                        _this.displaymode = false;
                    }
                }, function (error) {
                    _this.reportIdList = error.json().allreportId;
                    _this.displaymode = false;
                });
            }
            else {
                this.reportService.generateReport.next(this.timeInfo);
            }
        }
    };
    /** Function call when parish id changed */
    CreateReportComponent.prototype.onParishIdChange = function (parishId) {
        var _this = this;
        var obj = __assign({}, this.timeInfo, { parish_id: parishId });
        this.reportService.fetchReport(obj)
            .subscribe(function (response) {
            if (response.json().status) {
                _this.displaymode = true;
                _this.reportIdList = response.json().allreportId;
                var reportIsPresent = false;
                for (var i = 0; i < _this.reportIdList.length; i++) {
                    if (_this.reportIdList[i].id == _this.reportId) {
                        reportIsPresent = true;
                    }
                }
                if (!reportIsPresent) {
                    _this.reportId = _this.reportIdList[0].id;
                    _this.onReportChange(_this.reportId);
                }
            }
            else {
                _this.reportIdList = response.json().allreportId;
                _this.displaymode = false;
            }
        }, function (error) {
            _this.reportIdList = error.json().allreportId;
            _this.displaymode = false;
        });
    };
    /** Function to create report */
    CreateReportComponent.prototype.onSubmit = function (submit_status) {
        var _this = this;
        if (this.editMode) {
            var obj = {
                progress_report: this.progress_report,
                status: submit_status
            };
            this.reportService.updateReport(obj, this.reportId)
                .subscribe(function (response) {
                _this.responseStatus = response.json().status;
                _this.responseMsg = response.json().message;
                _this.responseReceived = true;
                _this.reportService.generateReport.next({});
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
                }, 5000);
            }, function () {
                _this.progress_report = _this.temp_report;
                _this.progress_report.crucial_date = undefined;
                setTimeout(function () {
                    _this.responseReceived = false;
                }, 5000);
            });
        }
        else {
            var obj = {
                report_month: this.timeInfo.report_month,
                report_year: this.timeInfo.report_year,
                progress_report: this.progress_report,
                status: submit_status
            };
            this.reportService.sendReport(obj)
                .subscribe(function (response) {
                _this.responseStatus = response.json().status;
                _this.responseMsg = response.json().message;
                _this.responseReceived = true;
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
                }, 5000);
            }, function () {
                _this.progress_report = _this.temp_report;
                _this.progress_report.crucial_date = undefined;
                setTimeout(function () {
                    _this.responseReceived = false;
                }, 5000);
            });
        }
    };
    CreateReportComponent.prototype.onReportChange = function (reportId) {
        this.router.navigate(['report/view/', reportId]);
    };
    CreateReportComponent.prototype.ngOnDestroy = function () {
        this.generateReportSubscription.unsubscribe();
    };
    return CreateReportComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChild"])('prForm'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__angular_forms__["NgForm"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_forms__["NgForm"]) === "function" && _a || Object)
], CreateReportComponent.prototype, "prForm", void 0);
CreateReportComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        selector: 'app-create-report',
        template: __webpack_require__("../../../../../src/app/report/create-report/create-report.component.html"),
        styles: [__webpack_require__("../../../../../src/app/report/create-report/create-report.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__auth_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__auth_auth_service__["a" /* AuthService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__report_service__["a" /* ReportService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__report_service__["a" /* ReportService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_0__angular_router__["c" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_router__["c" /* Router */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_0__angular_router__["b" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_router__["b" /* ActivatedRoute */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_6__province_zone_area_parish_province_zone_area_parish_service__["a" /* ProvinceZoneAreaParishService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__province_zone_area_parish_province_zone_area_parish_service__["a" /* ProvinceZoneAreaParishService */]) === "function" && _f || Object])
], CreateReportComponent);

var _a, _b, _c, _d, _e, _f;
//# sourceMappingURL=create-report.component.js.map

/***/ }),

/***/ "../../../../../src/app/report/list-report/list-report.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".alert {\n    position: fixed;\n    top: 8%;\n    left: auto;\n    right:10px;\n    width:auto;\n    font-size: 23px;\n    /*  \ttransform: translate(-50%, -50%);*/\n    text-align: center;\n    padding: 25px;\n    background-color: #f44336;\n    color: white;\n    opacity: 1;\n    transition: opacity 0.6s;\n    z-index: 3;\n    cursor: pointer;\n    border-radius: 5px;\n}\n\n/*.alert.success {*/\n/*background-color: #4CAF50;*/\n/*}*/\n\n/*.alert.info {*/\n/*background-color: #2196F3;*/\n/*}*/\n\n.close-btn{\n    margin-left: 15px;\n    color: black;\n    font-weight: bold;\n    float: right;\n    font-size: 23px;\n    position: absolute;\n    top: -6px;\n    right: 6px;\n    cursor: pointer;\n    transition: 0.3s;\n}\n.close-btn:hover{\n    color: red;\n}\n\n.alert-middle {\n    background: rgba(0, 0, 0, 0.7);\n    border-radius: 5px;\n    font-size: 23px;\n    left: 0;\n    right:0;\n    bottom:0;\n    opacity: 1;\n    padding: 25px;\n    position: fixed;\n    right: 10px;\n    text-align: center;\n    top: 0;\n    transition: opacity 0.6s ease 0s;\n    width: auto;\n    z-index: 3;\n}\n\n.alert-middle-main {\n    background:#fff;\n    width: 500px;\n    margin: 0 auto;\n    padding: 15px;\n    color: #000;\n    min-height: 300px;\n    padding-top: 70px;\n    position:fixed;\n    border-radius:4px;\n    top: 50%;\n    left: 50%;\n    margin-top: -150px;\n    margin-left: -250px;\n}\n\n.alert-middle.closebtn{\n    color: #000;\n}\n\n.alert-middle.closebtn:hover {\n    color: #fd7c02;\n}\n.resetfilter {\n    float: right;\n}\n@media screen and (max-width: 991px){\n    .table-responsive{\n        margin-top: 20px;\n    }\n    select{\n        margin-bottom: 10px;\n    }\n    label{\n        margin-top: 10px;\n    }\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/report/list-report/list-report.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n    <div class=\"col-lg-12\">\n        <h3 class=\"page-header\">Report - List</h3>\n    </div>\n</div><!--/.row-->\n\n<div class=\"row\">\n    <div class=\"col-sm-12\">\n        <div class=\"panel panel-default\">\n            <div class=\"panel-heading\">\n                Report List\n                <button (click)=\"onResetFilters()\" class=\"resetfilter btn btn-default\">Reset Filter</button>\n            </div>\n            <div class=\"panel-body overflowFix\">\n\n                <!-- Message Section -->\n                <div class=\"row\">\n                    <div class=\"col-lg-12\">\n                        <div *ngIf=\"!responseStatus && responseReceived\" class=\"alert alert-danger\">\n                            <strong>{{ responseMsg }}</strong>\n                        </div>\n                    </div>\n                    <div class=\"col-lg-12\">\n                        <div *ngIf=\"responseStatus && responseReceived\" class=\"alert alert-success\">\n                            <strong>{{ responseMsg }}</strong>\n                        </div>\n                    </div>\n                </div>\n\n\n                <!-- Reset Filter - Month - Year -->\n                <div class=\"row\">\n                    <div class=\"col-md-3\">\n                       <!-- <p></p>\n                        <button (click)=\"onResetFilters()\">Reset Filter</button>-->\n                    </div>\n\n                    <div class=\"col-md-3 col-md-offset-3\">\n                        <label>Filter Month:</label>\n                        <select\n                                #selectedMonth\n                                class=\"form-control\"\n                                [(ngModel)]=\"selectionMonth\"\n                                (change)=\"onSelectMonth(selectedMonth.value)\">\n                            <option value=\"0\" selected>Choose...</option>\n                            <option [value]=\"month.number\" *ngFor=\"let month of months;\">{{ month.name }}</option>\n                        </select>\n                    </div>\n\n                    <div class=\"col-md-3\">\n                        <label>Filter Year:</label>\n                        <select\n                                #selectedYear\n                                class=\"form-control\"\n                                [(ngModel)]=\"selectionYear\"\n                                (change)=\"onSelectYear(selectedYear.value)\">\n                            <option value=\"0\" selected>Choose...</option>\n                            <option\n                                    *ngFor=\"let year of currentYearList\"\n                                    [value]=\"year\">\n                                {{ year }}\n                            </option>\n                        </select>\n                    </div>\n\n                </div>\n\n                <br>\n\n                <!-- Province - Zone - Area - Parish -->\n                <div class=\"row\">\n\n                    <!-- Province -->\n                    <div class=\"col-md-3\" *ngIf=\"isWEM\">\n                        <label>Filter Province:</label>\n                        <select\n                                #selectedProvince\n                                name=\"province_id\"\n                                class=\"form-control\"\n                                [(ngModel)]=\"selectionProvince\"\n                                (change)=\"onSelectProvince(selectedProvince.value)\">\n                            <option value=\"0\" selected>Choose...</option>\n                            <option\n                                    *ngFor=\"let province of provinceList\"\n                                    [value]=\"province.id\">\n                                {{ province.province_name }}\n                            </option>\n                        </select>\n\n                    </div>\n\n                    <!-- Zone -->\n                    <div class=\"col-md-3\" *ngIf=\"isWEM || isProvincePastor\">\n                        <label>Filter Zone:</label>\n                        <select\n                                #selectedZone\n                                class=\"form-control\"\n                                [(ngModel)]=\"selectionZone\"\n                                (change)=\"onSelectZone(selectedZone.value)\">\n                            <option value=\"0\" selected>Choose...</option>\n                            <option\n                                    *ngFor=\"let zone of zoneList\"\n                                    [value]=\"zone.id\">\n                                {{zone.zone_name}}\n                            </option>\n                        </select>\n                    </div>\n\n                    <!-- Area -->\n                    <div class=\"col-md-3\" *ngIf=\"isWEM || isProvincePastor || isZonePastor\">\n                        <label>Filter Area:</label>\n                        <select\n                                #selectedArea\n                                class=\"form-control\"\n                                [(ngModel)]=\"selectionArea\"\n                                (change)=\"onSelectArea(selectedArea.value)\">\n                            <option value=\"0\" selected>Choose...</option>\n                            <option\n                                    *ngFor=\"let area of areaList\"\n                                    [value]=\"area.id\">\n                                {{area.area_name}}\n                            </option>\n                        </select>\n                    </div>\n\n                    <!-- Parish -->\n                    <div class=\"col-md-3\" *ngIf=\"isWEM || isProvincePastor || isZonePastor || isAreaPastor\">\n                        <label>Filter Parish:</label>\n                        <select\n                                #selectedParish\n                                name=\"parish_id\"\n                                class=\"form-control\"\n                                [(ngModel)]=\"selectionParish\"\n                                (change)=\"onSelectParish(selectedParish.value)\">\n                            <option value=\"0\" selected>Choose...</option>\n                            <option\n                                    *ngFor=\"let parish of parishList\"\n                                    [value]=\"parish.id\">\n                                {{ parish.parish_name }}\n                            </option>\n                        </select>\n\n                    </div>\n\n                </div>\n\n                <div class=\"table-responsive\">\n                    <table class=\"table table-hover table-condensed\">\n                        <thead>\n                        <tr>\n                            <th>Parish ID</th>\n                            <th>Parish Name</th>\n                            <th>Province / Zone / Area / Parish</th>\n                            <th>Payment Month / Year</th>\n                            <th>Status</th>\n                            <th>Accept/Reject</th>\n                            <th>Actions</th>\n                        </tr>\n                        </thead>\n                        <tbody>\n                        <tr *ngFor=\"let report of reportList\">\n                            <td [ngClass]=\"(report.compliance===1)?'success': 'danger'\">ROI{{ report.parish_id }}</td>\n                            <td [ngClass]=\"(report.compliance===1)?'success': 'danger'\">{{ report.parish_name }}</td>\n                            <td [ngClass]=\"(report.compliance===1)?'success': 'danger'\">{{ report.province_name }} / {{ report.zone_name }} / {{ report.area_name }} / {{ report.parish_name }}</td>\n                            <td [ngClass]=\"(report.compliance===1)?'success': 'danger'\">{{ months[report.report_month - 1].name }} / {{ report.report_year}}</td>\n                            <td [ngClass]=\"(report.compliance===1)?'success': 'danger'\"> {{ report.status }} </td>\n                            <td [ngClass]=\"(report.compliance===1)?'success': 'danger'\">\n                                <button\n                                        class=\"btn btn-success btn-xs\"\n                                        type=\"button\"\n                                        (click)=\"onAccept(report)\"\n                                        *ngIf=\"report.compliance===0\">Accept\n                                    <i class=\"fa fa-pencil fa-fw\"></i>\n                                </button>\n                                <button\n                                        class=\"btn btn-danger btn-xs\"\n                                        type=\"button\"\n                                        (click)=\"onAccept(report)\"\n                                        *ngIf=\"report.compliance===1\">Reject\n                                    <i class=\"fa fa-pencil fa-fw\"></i>\n                                </button>\n                            </td>\n                            <td [ngClass]=\"(report.compliance===1)?'success': 'danger'\">\n                                <button\n                                        class=\"btn btn-warning btn-xs\"\n                                        type=\"button\"\n                                        (click)=\"onEdit(report)\"\n                                        *ngIf=\"isParishPastor\">\n                                    <i class=\"fa fa-pencil fa-fw\"></i>\n                                </button>\n                                <button\n                                        class=\"btn btn-danger btn-xs\"\n                                        type=\"button\"\n                                        (click)=\"showPrompt(report)\"\n                                        *ngIf=\"isParishPastor\">\n                                    <i class=\"fa fa-trash fa-fw\"></i>\n                                </button>\n                                <button\n                                        class=\"btn btn-primary btn-xs\"\n                                        type=\"button\"\n                                        (click)=\"viewReport(report)\"\n                                        *ngIf=\"!isParishPastor\">\n                                    <i class=\"fa fa-eye fa-fw\"></i>\n                                </button>\n                            </td>\n                        </tr>\n                        <tr *ngIf=\"reportList && !reportList.length\">\n                            {{ 'No Reports Found!' }}\n                        </tr>\n                        </tbody>\n                    </table>\n                </div>\n\n            </div>\n        </div>\n    </div>\n</div><!--/.row-->\n\n<!-- Pop Up -->\n<div class=\"row\" *ngIf=\"prompt\">\n\n    <div class=\"col-md-6\">\n\n        <!-- Popup -->\n        <div class=\"alert-middle\">\n\n            <div class=\"alert-middle-main\">\n\n                <h4>\n                    Are you sure you want to delete this<br/>\n                    <strong>Report</strong>?\n                </h4>\n\n                <span class=\"close-btn\" (click)=\"hidePrompt()\">&times;</span>\n                <div class=btn-confirm>\n                    <button class=\"btn btn-primary\" (click)=\"deletePrompt()\">Confirm</button>\n                    <button class=\"btn btn-danger\" (click)=\"hidePrompt()\">Cancel</button>\n                </div>\n\n            </div>\n\n        </div>\n\n    </div>\n\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/report/list-report/list-report.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__auth_auth_service__ = __webpack_require__("../../../../../src/app/auth/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__province_zone_area_parish_province_zone_area_parish_service__ = __webpack_require__("../../../../../src/app/province-zone-area-parish/province-zone-area-parish.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__report_service__ = __webpack_require__("../../../../../src/app/report/report.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListReportComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ListReportComponent = (function () {
    /** Injecting services to be used in this component */
    function ListReportComponent(authService, router, reportService, pzapService) {
        this.authService = authService;
        this.router = router;
        this.reportService = reportService;
        this.pzapService = pzapService;
        /** Initial variable declaration */
        this.currentYear = (new Date()).getFullYear();
        this.currentMonth = ((new Date()).getMonth()) + 1;
        this.currentYearList = [];
        this.months = Array();
        this.prompt = false;
        this.showParishIdList = false;
        this.isWEM = false;
        this.isProvincePastor = false;
        this.isZonePastor = false;
        this.isAreaPastor = false;
        this.isParishPastor = false;
        this.responseStatus = false;
        this.responseReceived = false;
        this.responseMsg = '';
        this.selectionYear = 0;
        this.selectionMonth = 0;
        this.selectionProvince = 0;
        this.selectionZone = 0;
        this.selectionArea = 0;
        this.selectionParish = 0;
    }
    ListReportComponent.prototype.ngOnInit = function () {
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
        if (this.isWEM) {
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
        }
        /** Subscribe to event to refresh zone list */
        this.refreshZoneListSubscription = this.reportService.refreshReportList
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
        this.refreshAreaListSubscription = this.reportService.refreshReportList
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
            }
        });
        /** Subscribe to event to refresh parish list */
        this.refreshParishListSubscription = this.reportService.refreshReportList
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
        this.refreshReportListSubscription = this.reportService.refreshReportList
            .subscribe(function () {
            _this.reportService.getReports(_this.getCurrentSelectedFilters())
                .subscribe(function (response) {
                if (response.json().status) {
                    _this.reportList = response.json().report;
                }
                else {
                    _this.reportList = [];
                }
            }, function (error) {
                if (error.status === 401) {
                    _this.authService.removeToken();
                    _this.router.navigate(['/login']);
                }
            });
        });
        /** Emitting event which will refresh the payment list */
        this.reportService.refreshReportList.next({});
    };
    /** Function call when month selected */
    ListReportComponent.prototype.onSelectMonth = function (month) {
        this.selectionMonth = month;
        this.reportService.refreshReportList.next();
    };
    /** Function call when year selected */
    ListReportComponent.prototype.onSelectYear = function (year) {
        this.selectionYear = year;
        this.reportService.refreshReportList.next();
    };
    /** Function call to refresh payment list on select of province */
    ListReportComponent.prototype.onSelectProvince = function (provinceId) {
        this.selectionProvince = provinceId;
        this.selectionZone = 0;
        this.selectionArea = 0;
        this.selectionParish = 0;
        this.reportService.refreshReportList.next();
    };
    /** Function call to refresh payment list on select of province */
    ListReportComponent.prototype.onSelectZone = function (zoneId) {
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
        this.reportService.refreshReportList.next();
    };
    /** Function call to refresh payment list on select of province */
    ListReportComponent.prototype.onSelectArea = function (areaId) {
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
        this.reportService.refreshReportList.next();
    };
    /** Function call when month selected */
    ListReportComponent.prototype.onSelectParish = function (parishId) {
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
        this.reportService.refreshReportList.next();
    };
    /** Function call on edit button click */
    ListReportComponent.prototype.onEdit = function (report) {
        var report_id = report.id;
        this.router.navigate(['report/edit/', report_id]);
    };
    /** Function call to reset filters */
    ListReportComponent.prototype.onResetFilters = function () {
        this.selectionMonth = 0;
        this.selectionYear = 0;
        this.selectionProvince = 0;
        this.selectionZone = 0;
        this.selectionArea = 0;
        this.selectionParish = 0;
        this.reportService.refreshReportList.next();
    };
    /** Function call to show delete prompt */
    ListReportComponent.prototype.showPrompt = function (obj) {
        this.prompt = true;
        this.toDeleteReport = obj.id;
    };
    /** Function call to delete report */
    ListReportComponent.prototype.deletePrompt = function () {
        var _this = this;
        this.reportService.deleteReport(this.toDeleteReport)
            .subscribe(function (response) {
            if (response.json().status) {
                _this.reportService.refreshReportList.next({});
            }
        }, function (error) {
            if (error.status === 401) {
                _this.authService.removeToken();
                _this.router.navigate(['/login']);
            }
        }, function () {
            _this.prompt = false;
        });
    };
    /** Function call to hide delete prompt */
    ListReportComponent.prototype.hidePrompt = function () {
        this.prompt = false;
        this.toDeleteReport = undefined;
    };
    /** Function call to view Report */
    ListReportComponent.prototype.viewReport = function (report) {
        this.router.navigate(['report/view/', report.id]);
    };
    /** Function that returns current selected filters */
    ListReportComponent.prototype.getCurrentSelectedFilters = function () {
        return {
            report_year: this.selectionYear > 0 ? this.selectionYear : '',
            report_month: this.selectionMonth > 0 ? this.selectionMonth : '',
            province_id: this.selectionProvince > 0 ? this.selectionProvince : '',
            zone_id: this.selectionZone > 0 ? this.selectionZone : '',
            area_id: this.selectionArea > 0 ? this.selectionArea : '',
            parish_id: this.selectionParish > 0 ? this.selectionParish : ''
        };
    };
    /** Function to accept or reject the report */
    ListReportComponent.prototype.onAccept = function (report) {
        var _this = this;
        this.reportService.acceptReport(report)
            .subscribe(function (response) {
            _this.responseStatus = response.json().status;
            if (response.json().status) {
                _this.responseStatus = true;
                _this.reportService.refreshReportList.next({});
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
    ListReportComponent.prototype.ngOnDestroy = function () {
        this.refreshReportListSubscription.unsubscribe();
        this.refreshZoneListSubscription.unsubscribe();
        this.refreshAreaListSubscription.unsubscribe();
        this.refreshParishListSubscription.unsubscribe();
    };
    return ListReportComponent;
}());
ListReportComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-list-report',
        template: __webpack_require__("../../../../../src/app/report/list-report/list-report.component.html"),
        styles: [__webpack_require__("../../../../../src/app/report/list-report/list-report.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__auth_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__auth_auth_service__["a" /* AuthService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__report_service__["a" /* ReportService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__report_service__["a" /* ReportService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__province_zone_area_parish_province_zone_area_parish_service__["a" /* ProvinceZoneAreaParishService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__province_zone_area_parish_province_zone_area_parish_service__["a" /* ProvinceZoneAreaParishService */]) === "function" && _d || Object])
], ListReportComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=list-report.component.js.map

/***/ }),

/***/ "../../../../../src/app/report/report-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__create_report_create_report_component__ = __webpack_require__("../../../../../src/app/report/create-report/create-report.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__list_report_list_report_component__ = __webpack_require__("../../../../../src/app/report/list-report/list-report.component.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReportRoutingModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var reportRoutes = [
    { path: 'create', component: __WEBPACK_IMPORTED_MODULE_2__create_report_create_report_component__["a" /* CreateReportComponent */], data: { editMode: false, viewMode: false } },
    { path: 'list', component: __WEBPACK_IMPORTED_MODULE_3__list_report_list_report_component__["a" /* ListReportComponent */] },
    { path: 'edit/:id', component: __WEBPACK_IMPORTED_MODULE_2__create_report_create_report_component__["a" /* CreateReportComponent */], data: { editMode: true, viewMode: false } },
    { path: 'view/:id', component: __WEBPACK_IMPORTED_MODULE_2__create_report_create_report_component__["a" /* CreateReportComponent */], data: { editMode: false, viewMode: true } }
];
var ReportRoutingModule = (function () {
    function ReportRoutingModule() {
    }
    return ReportRoutingModule;
}());
ReportRoutingModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* RouterModule */].forChild(reportRoutes)],
        exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* RouterModule */]]
    })
], ReportRoutingModule);

//# sourceMappingURL=report-routing.module.js.map

/***/ }),

/***/ "../../../../../src/app/report/report.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_date_picker__ = __webpack_require__("../../../../ng2-date-picker/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_date_picker___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_ng2_date_picker__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__create_report_create_report_component__ = __webpack_require__("../../../../../src/app/report/create-report/create-report.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__list_report_list_report_component__ = __webpack_require__("../../../../../src/app/report/list-report/list-report.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__report_routing_module__ = __webpack_require__("../../../../../src/app/report/report-routing.module.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReportModule", function() { return ReportModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var ReportModule = (function () {
    function ReportModule() {
    }
    return ReportModule;
}());
ReportModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_4__create_report_create_report_component__["a" /* CreateReportComponent */],
            __WEBPACK_IMPORTED_MODULE_5__list_report_list_report_component__["a" /* ListReportComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_common__["CommonModule"],
            __WEBPACK_IMPORTED_MODULE_1_ng2_date_picker__["DpDatePickerModule"],
            __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormsModule"],
            __WEBPACK_IMPORTED_MODULE_6__report_routing_module__["a" /* ReportRoutingModule */]
        ],
        providers: []
    })
], ReportModule);

//# sourceMappingURL=report.module.js.map

/***/ })

});
//# sourceMappingURL=6.chunk.js.map