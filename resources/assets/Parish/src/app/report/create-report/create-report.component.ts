import { ActivatedRoute, Data } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IDatePickerConfig } from 'ng2-date-picker';
import { NgForm } from '@angular/forms';
import { Response } from '@angular/http';
import { Subscription } from 'rxjs/Subscription';

import { ProgressReportModel } from '../report-models/progress-report.model';
import { ReportService } from '../report.service';

@Component({
	selector: 'app-create-report',
	templateUrl: './create-report.component.html',
	styleUrls: [ './create-report.component.css' ]
})
export class CreateReportComponent implements OnInit {
	
	@ViewChild( 'prForm' ) prForm: NgForm;
	generateReportSubscription: Subscription;
	editMode: boolean = false; // Initializing edit mode for this component
	responseMsg: string = '';
	responseStatus: boolean = false;
	responseReceived: boolean = false;
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
	timeInfo: { report_month: number, report_year: number };
	temp_report: ProgressReportModel = {
		'wem_percentage': 0,
		'wem_share': 0,
		'account_name': '',
		'parish_id': 0,
		'parish_pastor': '',
		'area_pastor': '',
		'zonal_pastor': '',
		'province_pastor': '',
		'crucial_date': '',
		'month': '',
		'year': '',
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
	progress_report: ProgressReportModel = this.temp_report;
	
	constructor( private reportService: ReportService,
	             private activatedRoute: ActivatedRoute ) { }
	
	ngOnInit() {
		
		this.prForm.valueChanges
		.subscribe(
			(response) => {
				
				let monthTemp = {
					'attendance': {
						'men': 0,
						'women': 0,
						'children': 0,
						'total': 0
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
				
				for( let i = 0; i < this.progress_report.report.weekly.length; i++ ) {
					
					let weeklyTemp = {
						'attendance': {
							'men': 0,
							'women': 0,
							'children': 0,
							'total': 0
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
					
					for( let j = 0; j < this.progress_report.report.weekly[i].days.length; j++ ) {
						/** Calculating and saving daily attendance */
						this.progress_report.report.weekly[i].days[j].attendance.total = this.progress_report.report.weekly[i].days[j].attendance.men + this.progress_report.report.weekly[i].days[j].attendance.women + this.progress_report.report.weekly[i].days[j].attendance.children;
						
						/** Calculating and saving daily monetary */
						this.progress_report.report.weekly[i].days[j].monetary.total = this.progress_report.report.weekly[i].days[j].monetary.offering + this.progress_report.report.weekly[i].days[j].monetary.tithe.general + this.progress_report.report.weekly[i].days[j].monetary.tithe.pastor + this.progress_report.report.weekly[i].days[j].monetary.f_fruit + this.progress_report.report.weekly[i].days[j].monetary.t_giving;
						
						/** Calculating weekly attendance */
						weeklyTemp.attendance.men += this.progress_report.report.weekly[i].days[j].attendance.men;
						weeklyTemp.attendance.women += this.progress_report.report.weekly[i].days[j].attendance.women;
						weeklyTemp.attendance.children += this.progress_report.report.weekly[i].days[j].attendance.children;
						weeklyTemp.attendance.total += this.progress_report.report.weekly[i].days[j].attendance.total;
						
						/** Calculating weekly monetary */
						weeklyTemp.monetary.offering += this.progress_report.report.weekly[i].days[j].monetary.offering;
						weeklyTemp.monetary.tithe.pastor += this.progress_report.report.weekly[i].days[j].monetary.tithe.pastor;
						weeklyTemp.monetary.tithe.general += this.progress_report.report.weekly[i].days[j].monetary.tithe.general;
						weeklyTemp.monetary.f_fruit += this.progress_report.report.weekly[i].days[j].monetary.f_fruit;
						weeklyTemp.monetary.t_giving += this.progress_report.report.weekly[i].days[j].monetary.t_giving;
						weeklyTemp.monetary.total += this.progress_report.report.weekly[i].days[j].monetary.total;
						
					}
					
					/** Saving weekly attendance */
					this.progress_report.report.weekly[i].weekly_total.attendance.men = weeklyTemp.attendance.men ;
					this.progress_report.report.weekly[i].weekly_total.attendance.women = weeklyTemp.attendance.women;
					this.progress_report.report.weekly[i].weekly_total.attendance.children = weeklyTemp.attendance.children;
					this.progress_report.report.weekly[i].weekly_total.attendance.total = weeklyTemp.attendance.total;
					
					/** Saving weekly monetary */
					this.progress_report.report.weekly[i].weekly_total.monetary.offering = weeklyTemp.monetary.offering;
					this.progress_report.report.weekly[i].weekly_total.monetary.tithe.pastor = weeklyTemp.monetary.tithe.pastor;
					this.progress_report.report.weekly[i].weekly_total.monetary.tithe.general = weeklyTemp.monetary.tithe.general;
					this.progress_report.report.weekly[i].weekly_total.monetary.f_fruit = weeklyTemp.monetary.f_fruit;
					this.progress_report.report.weekly[i].weekly_total.monetary.t_giving = weeklyTemp.monetary.t_giving;
					this.progress_report.report.weekly[i].weekly_total.monetary.total = weeklyTemp.monetary.total;
					
					/** Calculating monthly attendance */
					monthTemp.attendance.men += this.progress_report.report.weekly[i].weekly_total.attendance.men;
					monthTemp.attendance.women += this.progress_report.report.weekly[i].weekly_total.attendance.women;
					monthTemp.attendance.children += this.progress_report.report.weekly[i].weekly_total.attendance.children;
					monthTemp.attendance.total += this.progress_report.report.weekly[i].weekly_total.attendance.total;
					
					/** Calculating monthly monetary */
					monthTemp.monetary.offering += this.progress_report.report.weekly[i].weekly_total.monetary.offering;
					monthTemp.monetary.tithe.pastor += this.progress_report.report.weekly[i].weekly_total.monetary.tithe.pastor;
					monthTemp.monetary.tithe.general += this.progress_report.report.weekly[i].weekly_total.monetary.tithe.general;
					monthTemp.monetary.f_fruit += this.progress_report.report.weekly[i].weekly_total.monetary.f_fruit;
					monthTemp.monetary.t_giving += this.progress_report.report.weekly[i].weekly_total.monetary.t_giving;
					monthTemp.monetary.total += this.progress_report.report.weekly[i].weekly_total.monetary.total;
					
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
				
				/** Calculating wem's share */
				this.progress_report.wem_share =  this.progress_report.report.monthly_total.monetary.total * ( this.progress_report.wem_percentage/100 );
				
			}
		);
		
		this.generateReportSubscription = this.reportService.generateReport
		.subscribe(
			( body:{ report_month: number, report_year: number } ) => {
				console.log(body);
				this.reportService.getReportBP( body )
				.subscribe(
					(response: Response) => {
						const crucial_date = this.progress_report.crucial_date;
						this.progress_report = response.json().progress_report[ (response.json().progress_report).length - 1 ].progress_report;
						this.progress_report.crucial_date = crucial_date;

					}
				);
			}
		);
		
		
		/** Checking route params to get present mode */
		this.activatedRoute.data.subscribe(
			(data: Data) => {
				this.editMode = data['editMode'];
				
				
			}
		);
		
	}
	
	log(event) {
		
		if(event) {
			
			const date = new Date(event);
			if( this.editMode ) {
			
			} else {
				this.timeInfo = {
					report_month: date.getMonth() + 1,
					report_year: date.getFullYear()
				};
			}
			
			this.reportService.generateReport.next( this.timeInfo );
			
		}
		
	}
	
	onSubmit() {
		
		if( this.editMode ) {
		
		} else {
			const obj = {
				report_month: this.timeInfo.report_month,
				report_year: this.timeInfo.report_year,
				progress_report: this.progress_report
			};
			this.reportService.sendReport( obj )
			.subscribe(
				
				( response: Response ) => {
					this.responseStatus = response.json().status;
					this.responseMsg = response.json().message;
					this.responseReceived = true;
				},
				( error: Response ) => {
					this.responseStatus = false;
					this.responseReceived = true;
					this.responseMsg = error.json().error;
					setTimeout( () => {
						this.responseReceived = false;
					}, 5000);
				},
				() => {
					setTimeout( () => {
						this.responseReceived = false;
					}, 5000);
				}
			
			);
		}
		
	}
	
}


