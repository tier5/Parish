import { Component, ViewChild } from '@angular/core';
import { ProgressReportModel } from '../report-models/progress-report.model';
import { NgForm } from '@angular/forms';
import { IDatePickerConfig } from 'ng2-date-picker';

@Component({
	selector: 'app-list-report',
	templateUrl: './list-report.component.html',
	styleUrls: [ './list-report.component.css' ]
})
export class ListReportComponent {
	
	@ViewChild( 'prForm' ) prForm: NgForm;
	date = '';
	config: IDatePickerConfig = {
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
		showNearMonthDays: true,
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
		locale: 'en',
	};
	progress_report: ProgressReportModel = {
		"account_name": "Account Name",
		"parish_id": 1001,
		"parish_pastor": "Parish Pastor",
		"area_pastor": "Area Pastor",
		"zonal_pastor": "Zonal Pastor",
		"province_pastor": "Province Pastor",
		"crucial_date": "",
		"month": "September",
		"year": "2017",
		"report": {
			"monthly_total": {
				"attendance": {
					"men": null,
					"women": null,
					"children": null,
					"total": null
				},
				"monetary": {
					"offering": null,
					"tithe": {
						"pastor": null,
						"general": null,
						
					},
					"f_fruit": null,
					"t_giving": null,
					"total": null
				}
			},
			"weekly": [
				{
					"week_total": {
						"attendance": {
							"men": null,
							"women": null,
							"children": null,
							"total": null
						},
						"monetary": {
							"offering": null,
							"tithe": {
								"pastor": null,
								"general": null,
								
							},
							"f_fruit": null,
							"t_giving": null,
							"total": null
						}
					},
					"days": [
						{
							"date": "Sunday",
							"day": "1",
							"programmes": "",
							"attendance": {
								"men": null,
								"women": null,
								"children": null,
								"total": null
							},
							"monetary": {
								"offering": null,
								"tithe": {
									"pastor": null,
									"general": null
								},
								"f_fruit": null,
								"t_giving": null,
								"total": null
							}
						},
						{
							"date": "Monday",
							"day": "2",
							"programmes": "",
							"attendance": {
								"men": null,
								"women": null,
								"children": null,
								"total": null
							},
							"monetary": {
								"offering": null,
								"tithe": {
									"pastor": null,
									"general": null,
									
								},
								"f_fruit": null,
								"t_giving": null,
								"total": null
							}
						},
						{
							"date": "Tuesday",
							"day": "3",
							"programmes": "",
							"attendance": {
								"men": null,
								"women": null,
								"children": null,
								"total": null
							},
							"monetary": {
								"offering": null,
								"tithe": {
									"pastor": null,
									"general": null,
									
								},
								"f_fruit": null,
								"t_giving": null,
								"total": null
							}
						},
						{
							"date": "Wednesday",
							"day": "4",
							"programmes": "",
							"attendance": {
								"men": null,
								"women": null,
								"children": null,
								"total": null
							},
							"monetary": {
								"offering": null,
								"tithe": {
									"pastor": null,
									"general": null,
									
								},
								"f_fruit": null,
								"t_giving": null,
								"total": null
							}
						},
						{
							"date": "Thursday",
							"day": "5",
							"programmes": "",
							"attendance": {
								"men": null,
								"women": null,
								"children": null,
								"total": null
							},
							"monetary": {
								"offering": null,
								"tithe": {
									"pastor": null,
									"general": null,
									
								},
								"f_fruit": null,
								"t_giving": null,
								"total": null
							}
						},
						{
							"date": "Friday",
							"day": "6",
							"programmes": "",
							"attendance": {
								"men": null,
								"women": null,
								"children": null,
								"total": null
							},
							"monetary": {
								"offering": null,
								"tithe": {
									"pastor": null,
									"general": null,
									
								},
								"f_fruit": null,
								"t_giving": null,
								"total": null
							}
						},
						{
							"date": "Saturday",
							"day": "7",
							"programmes": "",
							"attendance": {
								"men": null,
								"women": null,
								"children": null,
								"total": null
							},
							"monetary": {
								"offering": null,
								"tithe": {
									"pastor": null,
									"general": null,
									
								},
								"f_fruit": null,
								"t_giving": null,
								"total": null
							}
						}
					]
				},
				{
					"week_total": {
						"attendance": {
							"men": null,
							"women": null,
							"children": null,
							"total": null
						},
						"monetary": {
							"offering": null,
							"tithe": {
								"pastor": null,
								"general": null,
								
							},
							"f_fruit": null,
							"t_giving": null,
							"total": null
						}
					},
					"days": [
						{
							"date": "Sunday",
							"day": "8",
							"programmes": "",
							"attendance": {
								"men": null,
								"women": null,
								"children": null,
								"total": null
							},
							"monetary": {
								"offering": null,
								"tithe": {
									"pastor": null,
									"general": null,
									
								},
								"f_fruit": null,
								"t_giving": null,
								"total": null
							}
						},
						{
							"date": "Monday",
							"day": "9",
							"programmes": "",
							"attendance": {
								"men": null,
								"women": null,
								"children": null,
								"total": null
							},
							"monetary": {
								"offering": null,
								"tithe": {
									"pastor": null,
									"general": null,
									
								},
								"f_fruit": null,
								"t_giving": null,
								"total": null
							}
						},
						{
							"date": "Tuesday",
							"day": "10",
							"programmes": "",
							"attendance": {
								"men": null,
								"women": null,
								"children": null,
								"total": null
							},
							"monetary": {
								"offering": null,
								"tithe": {
									"pastor": null,
									"general": null,
									
								},
								"f_fruit": null,
								"t_giving": null,
								"total": null
							}
						},
						{
							"date": "Wednesday",
							"day": "11",
							"programmes": "",
							"attendance": {
								"men": null,
								"women": null,
								"children": null,
								"total": null
							},
							"monetary": {
								"offering": null,
								"tithe": {
									"pastor": null,
									"general": null,
									
								},
								"f_fruit": null,
								"t_giving": null,
								"total": null
							}
						},
						{
							"date": "Thursday",
							"day": "12",
							"programmes": "",
							"attendance": {
								"men": null,
								"women": null,
								"children": null,
								"total": null
							},
							"monetary": {
								"offering": null,
								"tithe": {
									"pastor": null,
									"general": null,
									
								},
								"f_fruit": null,
								"t_giving": null,
								"total": null
							}
						},
						{
							"date": "Friday",
							"day": "13",
							"programmes": "",
							"attendance": {
								"men": null,
								"women": null,
								"children": null,
								"total": null
							},
							"monetary": {
								"offering": null,
								"tithe": {
									"pastor": null,
									"general": null,
									
								},
								"f_fruit": null,
								"t_giving": null,
								"total": null
							}
						},
						{
							"date": "Saturday",
							"day": "14",
							"programmes": "",
							"attendance": {
								"men": null,
								"women": null,
								"children": null,
								"total": null
							},
							"monetary": {
								"offering": null,
								"tithe": {
									"pastor": null,
									"general": null,
									
								},
								"f_fruit": null,
								"t_giving": null,
								"total": null
							}
						}
					]
				},
				{
					"week_total": {
						"attendance": {
							"men": null,
							"women": null,
							"children": null,
							"total": null
						},
						"monetary": {
							"offering": null,
							"tithe": {
								"pastor": null,
								"general": null,
								
							},
							"f_fruit": null,
							"t_giving": null,
							"total": null
						}
					},
					"days": [
						{
							"date": "Sunday",
							"day": "15",
							"programmes": "",
							"attendance": {
								"men": null,
								"women": null,
								"children": null,
								"total": null
							},
							"monetary": {
								"offering": null,
								"tithe": {
									"pastor": null,
									"general": null,
									
								},
								"f_fruit": null,
								"t_giving": null,
								"total": null
							}
						},
						{
							"date": "Monday",
							"day": "16",
							"programmes": "",
							"attendance": {
								"men": null,
								"women": null,
								"children": null,
								"total": null
							},
							"monetary": {
								"offering": null,
								"tithe": {
									"pastor": null,
									"general": null,
									
								},
								"f_fruit": null,
								"t_giving": null,
								"total": null
							}
						},
						{
							"date": "Tuesday",
							"day": "17",
							"programmes": "",
							"attendance": {
								"men": null,
								"women": null,
								"children": null,
								"total": null
							},
							"monetary": {
								"offering": null,
								"tithe": {
									"pastor": null,
									"general": null,
									
								},
								"f_fruit": null,
								"t_giving": null,
								"total": null
							}
						},
						{
							"date": "Wednesday",
							"day": "18",
							"programmes": "",
							"attendance": {
								"men": null,
								"women": null,
								"children": null,
								"total": null
							},
							"monetary": {
								"offering": null,
								"tithe": {
									"pastor": null,
									"general": null,
									
								},
								"f_fruit": null,
								"t_giving": null,
								"total": null
							}
						},
						{
							"date": "Thursday",
							"day": "19",
							"programmes": "",
							"attendance": {
								"men": null,
								"women": null,
								"children": null,
								"total": null
							},
							"monetary": {
								"offering": null,
								"tithe": {
									"pastor": null,
									"general": null,
									
								},
								"f_fruit": null,
								"t_giving": null,
								"total": null
							}
						},
						{
							"date": "Friday",
							"day": "20",
							"programmes": "",
							"attendance": {
								"men": null,
								"women": null,
								"children": null,
								"total": null
							},
							"monetary": {
								"offering": null,
								"tithe": {
									"pastor": null,
									"general": null,
									
								},
								"f_fruit": null,
								"t_giving": null,
								"total": null
							}
						},
						{
							"date": "Saturday",
							"day": "21",
							"programmes": "",
							"attendance": {
								"men": null,
								"women": null,
								"children": null,
								"total": null
							},
							"monetary": {
								"offering": null,
								"tithe": {
									"pastor": null,
									"general": null,
									
								},
								"f_fruit": null,
								"t_giving": null,
								"total": null
							}
						}
					]
				},
				{
					"week_total": {
						"attendance": {
							"men": null,
							"women": null,
							"children": null,
							"total": null
						},
						"monetary": {
							"offering": null,
							"tithe": {
								"pastor": null,
								"general": null,
								
							},
							"f_fruit": null,
							"t_giving": null,
							"total": null
						}
					},
					"days": [
						{
							"date": "Sunday",
							"day": "22",
							"programmes": "",
							"attendance": {
								"men": null,
								"women": null,
								"children": null,
								"total": null
							},
							"monetary": {
								"offering": null,
								"tithe": {
									"pastor": null,
									"general": null,
									
								},
								"f_fruit": null,
								"t_giving": null,
								"total": null
							}
						},
						{
							"date": "Monday",
							"day": "23",
							"programmes": "",
							"attendance": {
								"men": null,
								"women": null,
								"children": null,
								"total": null
							},
							"monetary": {
								"offering": null,
								"tithe": {
									"pastor": null,
									"general": null,
									
								},
								"f_fruit": null,
								"t_giving": null,
								"total": null
							}
						},
						{
							"date": "Tuesday",
							"day": "24",
							"programmes": "",
							"attendance": {
								"men": null,
								"women": null,
								"children": null,
								"total": null
							},
							"monetary": {
								"offering": null,
								"tithe": {
									"pastor": null,
									"general": null,
									
								},
								"f_fruit": null,
								"t_giving": null,
								"total": null
							}
						},
						{
							"date": "Wednesday",
							"day": "25",
							"programmes": "",
							"attendance": {
								"men": null,
								"women": null,
								"children": null,
								"total": null
							},
							"monetary": {
								"offering": null,
								"tithe": {
									"pastor": null,
									"general": null,
									
								},
								"f_fruit": null,
								"t_giving": null,
								"total": null
							}
						},
						{
							"date": "Thursday",
							"day": "26",
							"programmes": "",
							"attendance": {
								"men": null,
								"women": null,
								"children": null,
								"total": null
							},
							"monetary": {
								"offering": null,
								"tithe": {
									"pastor": null,
									"general": null,
									
								},
								"f_fruit": null,
								"t_giving": null,
								"total": null
							}
						},
						{
							"date": "Friday",
							"day": "27",
							"programmes": "",
							"attendance": {
								"men": null,
								"women": null,
								"children": null,
								"total": null
							},
							"monetary": {
								"offering": null,
								"tithe": {
									"pastor": null,
									"general": null,
									
								},
								"f_fruit": null,
								"t_giving": null,
								"total": null
							}
						},
						{
							"date": "Saturday",
							"day": "28",
							"programmes": "",
							"attendance": {
								"men": null,
								"women": null,
								"children": null,
								"total": null
							},
							"monetary": {
								"offering": null,
								"tithe": {
									"pastor": null,
									"general": null,
									
								},
								"f_fruit": null,
								"t_giving": null,
								"total": null
							}
						}
					]
				}
			]
		}
	};
	
	
	ngOnInit() {
		
		this.prForm.valueChanges
		.subscribe(
			(response) => {
				
				let monthTemp = {
					"attendance": {
						"men": 0,
						"women": 0,
						"children": 0,
						"total": 0
					},
					"monetary": {
						"offering": 0,
						"tithe": {
							"pastor": 0,
							"general": 0,
							
						},
						"f_fruit": 0,
						"t_giving": 0,
						"total": 0
					}
				};
				
				for( let i = 0; i < this.progress_report.report.weekly.length; i++ ) {
					
					let temp = {
						"attendance": {
							"men": 0,
							"women": 0,
							"children": 0,
							"total": 0
						},
						"monetary": {
							"offering": 0,
							"tithe": {
								"pastor": 0,
								"general": 0,
								
							},
							"f_fruit": 0,
							"t_giving": 0,
							"total": 0
						}
					};

					for( let j = 0; j < this.progress_report.report.weekly[i].days.length; j++ ) {
						/** Calculating and saving daily attendance */
						this.progress_report.report.weekly[i].days[j].attendance.total = this.progress_report.report.weekly[i].days[j].attendance.men + this.progress_report.report.weekly[i].days[j].attendance.women + this.progress_report.report.weekly[i].days[j].attendance.children;
						
						/** Calculating and saving daily monetary */
						this.progress_report.report.weekly[i].days[j].monetary.total = this.progress_report.report.weekly[i].days[j].monetary.offering + this.progress_report.report.weekly[i].days[j].monetary.tithe.general + this.progress_report.report.weekly[i].days[j].monetary.tithe.pastor + this.progress_report.report.weekly[i].days[j].monetary.f_fruit + this.progress_report.report.weekly[i].days[j].monetary.t_giving;
						
						/** Calculating weekly attendance */
						temp.attendance.men += this.progress_report.report.weekly[i].days[j].attendance.men;
						temp.attendance.women += this.progress_report.report.weekly[i].days[j].attendance.women;
						temp.attendance.children += this.progress_report.report.weekly[i].days[j].attendance.children;
						temp.attendance.total += this.progress_report.report.weekly[i].days[j].attendance.total;
						
						/** Calculating weekly monetary */
						temp.monetary.offering += this.progress_report.report.weekly[i].days[j].monetary.offering;
						temp.monetary.tithe.pastor += this.progress_report.report.weekly[i].days[j].monetary.tithe.pastor;
						temp.monetary.tithe.general += this.progress_report.report.weekly[i].days[j].monetary.tithe.general;
						temp.monetary.f_fruit += this.progress_report.report.weekly[i].days[j].monetary.f_fruit;
						temp.monetary.t_giving += this.progress_report.report.weekly[i].days[j].monetary.t_giving;
						temp.monetary.total += this.progress_report.report.weekly[i].days[j].monetary.total;
					
					}
					
					/** Saving weekly attendance */
					this.progress_report.report.weekly[i].week_total.attendance.men = temp.attendance.men ;
					this.progress_report.report.weekly[i].week_total.attendance.women = temp.attendance.women;
					this.progress_report.report.weekly[i].week_total.attendance.children = temp.attendance.children;
					this.progress_report.report.weekly[i].week_total.attendance.total = temp.attendance.total;
					
					/** Saving weekly monetary */
					this.progress_report.report.weekly[i].week_total.monetary.offering = temp.monetary.offering;
					this.progress_report.report.weekly[i].week_total.monetary.tithe.pastor = temp.monetary.tithe.pastor;
					this.progress_report.report.weekly[i].week_total.monetary.tithe.general = temp.monetary.tithe.general;
					this.progress_report.report.weekly[i].week_total.monetary.f_fruit = temp.monetary.f_fruit;
					this.progress_report.report.weekly[i].week_total.monetary.t_giving = temp.monetary.t_giving;
					this.progress_report.report.weekly[i].week_total.monetary.total = temp.monetary.total;
					
					/** Calculating monthly attendance */
					monthTemp.attendance.men += this.progress_report.report.weekly[i].week_total.attendance.men;
					monthTemp.attendance.women += this.progress_report.report.weekly[i].week_total.attendance.women;
					monthTemp.attendance.children += this.progress_report.report.weekly[i].week_total.attendance.children;
					monthTemp.attendance.total += this.progress_report.report.weekly[i].week_total.attendance.total;
					
					/** Calculating monthly monetary */
					monthTemp.monetary.offering += this.progress_report.report.weekly[i].week_total.monetary.offering;
					monthTemp.monetary.tithe.pastor += this.progress_report.report.weekly[i].week_total.monetary.tithe.pastor;
					monthTemp.monetary.tithe.general += this.progress_report.report.weekly[i].week_total.monetary.tithe.general;
					monthTemp.monetary.f_fruit += this.progress_report.report.weekly[i].week_total.monetary.f_fruit;
					monthTemp.monetary.t_giving += this.progress_report.report.weekly[i].week_total.monetary.t_giving;
					monthTemp.monetary.total += this.progress_report.report.weekly[i].week_total.monetary.total;

				}
				
				/** Saving weekly attendance */
				this.progress_report.report.monthly_total.attendance.men = monthTemp.attendance.men ;
				this.progress_report.report.monthly_total.attendance.women = monthTemp.attendance.women;
				this.progress_report.report.monthly_total.attendance.children = monthTemp.attendance.children;
				this.progress_report.report.monthly_total.attendance.total = monthTemp.attendance.total;
				
				/** Saving weekly monetary */
				this.progress_report.report.monthly_total.monetary.offering = monthTemp.monetary.offering;
				this.progress_report.report.monthly_total.monetary.tithe.pastor = monthTemp.monetary.tithe.pastor;
				this.progress_report.report.monthly_total.monetary.tithe.general = monthTemp.monetary.tithe.general;
				this.progress_report.report.monthly_total.monetary.f_fruit = monthTemp.monetary.f_fruit;
				this.progress_report.report.monthly_total.monetary.t_giving = monthTemp.monetary.t_giving;
				this.progress_report.report.monthly_total.monetary.total = monthTemp.monetary.total;
				
			}
		);
		
	}
	
	log(event) {
		
		if(event) {
			const date = new Date(event);
			const data = {
				report_month: date.getMonth(),
				report_year: date.getFullYear()
			};
			console.log(data);
		}
	}
	
}

/*
* <input
    type="number"
    [name]="'numTwo'+ i"
    [(ngModel)]="response.datas[i].numTwo"
    min="0.01"
    step="0.01"
>
* **/