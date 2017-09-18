import { Component, OnInit, ViewChild } from '@angular/core';
import { IDatePickerConfig } from 'ng2-date-picker';
import { NgForm } from '@angular/forms';
import { Response } from '@angular/http';

import { ProgressReportModel } from '../report-models/progress-report.model';
import { ReportService } from '../report.service';

@Component({
	selector: 'app-create-report',
	templateUrl: './create-report.component.html',
	styleUrls: [ './create-report.component.css' ]
})
export class CreateReportComponent implements OnInit {
	
	@ViewChild('tdForm') tdForm: NgForm;
	response = {
		datas: [
			{
				numOne: null,
				numTwo: null,
				numFinal: null
			},
			{
				numOne: null,
				numTwo: null,
				numFinal: null
			},
			{
				numOne: null,
				numTwo: null,
				numFinal: null
			}
		],
		result: {
			resNumOne: null,
			resNumTwo: null,
			resNumFinal: null,
		}
	};
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
		"account_name": "",
		"parish_id": null,
		"parish_pastor": "",
		"area_pastor": "",
		"zonal_pastor": "",
		"province_pastor": "",
		"crucial_date": "",
		"month": "",
		"year": "",
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
			"weekly": [{
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
				"days":[
					{
						"date": "",
						"day": "",
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
			}]
		}
	};
	
	
	constructor( private reportService: ReportService ) { }
	
	ngOnInit() {
		
		this.tdForm.valueChanges
		.subscribe(
			(response) => {
				console.log(this.response.datas);
				let resNumOne = 0;
				let resNumTwo = 0;
				let resNumFinal = 0;

				for(let i = 0; i < this.response.datas.length; i++ ) {

					this.response.datas[i].numFinal = this.response.datas[i].numOne + this.response.datas[i].numTwo;

					resNumOne = resNumOne + this.response.datas[i].numOne;
					resNumTwo = resNumTwo + this.response.datas[i].numTwo;
					resNumFinal = resNumFinal + this.response.datas[i].numFinal;

				}

				this.response.result.resNumOne = resNumOne;
				this.response.result.resNumTwo = resNumTwo;
				this.response.result.resNumFinal = resNumFinal;
			}
		);
		
	}
	
	log(event) {
		
		if(event) {
			const date = new Date(event);
			const data = {
				month: date.getMonth(),
				year: date.getFullYear()
			};
			this.reportService.getReportBP( data )
			.subscribe(
				(response: Response) => {
					console.log(response.json());
				}
			);
		}
	}
	
}
