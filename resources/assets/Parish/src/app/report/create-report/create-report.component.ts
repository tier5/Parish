import { ActivatedRoute, Data, Params, Router } from '@angular/router';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IDatePickerConfig } from 'ng2-date-picker';
import { NgForm } from '@angular/forms';
import { Response } from '@angular/http';
import { Subscription } from 'rxjs/Subscription';

import { ProgressReportModel } from '../report-models/progress-report.model';
import { ReportService } from '../report.service';
import { AuthService } from "../../auth/auth.service";
import * as moment from "moment";
import { ProvinceZoneAreaParishService } from "../../province-zone-area-parish/province-zone-area-parish.service";

@Component({
	selector: 'app-create-report',
	templateUrl: './create-report.component.html',
	styleUrls: [ './create-report.component.css' ]
})
export class CreateReportComponent implements OnInit, OnDestroy {
	
	@ViewChild( 'prForm' ) prForm  : NgForm;
	generateReportSubscription     : Subscription;
	editMode                       : boolean             = false;
    viewMode                       : boolean             = false;
    createMode                       : boolean             = false;
    displaymode                    : boolean             = true;
	responseMsg                    : string              = '';
	responseStatus                 : boolean             = false;
	responseReceived               : boolean             = false;
	parish_id                      : number;
	child_sunday_service           : number;
	child_sunday                   : number;
	women_sunday_service           : number;
	women_sunday                   : number;
	men_sunday_service             : number;
	men_sunday                     : number;
	midWeek_men                    : number;
	midWeek_women                  : number;
	midWeek_child                  : number;
	parishIdList                   : any;
	reportId                       : number;
	reportIdList                   : any;
	parishShow                     : boolean = false;
	sundaychild:{};
	sundayServicechild:{};
	sundaywomen:{};
	sundayServicewomen:{};
	sundaymen:{};
	sundayServicemen:{};
	midWeekmen:{};
	midWeekwomen:{};
	midWeekchild:{};
	count   : number = 0;
	penalty_percent:number =0;
	
	config                         : IDatePickerConfig   = {
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
	timeInfo                       : { report_month: number, report_year: number };
	temp_report                    : ProgressReportModel = {
		 wem_percentage: 0,
		 wem_share: 0,
		 account_name: '',
		 parish_id: 0,
		 parish_pastor: '',
		 area_pastor: '',
		 zonal_pastor: '',
		 province_pastor: '',
		 crucial_date: '',
		 parish_start_date:'',
		 area_dues :0,
		 month : '',
		 year : '',
		 no_of_birth:0,
		 no_of_death :0,
		 no_of_marrg :0,
		 no_of_new_workers :0,
		 no_of_souls_saved :0,
		 report: {
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
	progress_report                : ProgressReportModel = this.temp_report;
	title                          : string;

	constructor( private authService: AuthService,
				 private reportService: ReportService,
	             private router: Router,
	             private activatedRoute: ActivatedRoute,
                 private pzapService: ProvinceZoneAreaParishService ) { }
	
	ngOnInit() {
		this.displaymode  = true;
	    this.title = "Create Report";
		
		const user_type = this.authService.getToken().user_type;
		
	    if(user_type==3) {
		    
		    this.pzapService.getPenalty( )
			    .subscribe(
				    ( response: Response ) => {
					    
					    if(response.json().status) {
					    	this.penalty_percent = response.json().penalty_percent;
					    	console.log(this.penalty_percent);
					    }
					    
				    },
				    ( error: Response ) => {
					    if ( error.status === 401 ) {
						    this.authService.removeToken();
						    this.router.navigate( [ '/login' ] );
					    }
					
					    this.responseStatus     = false;
					    this.responseReceived   = true;
					    this.responseMsg        = error.json().error;
					    setTimeout( () => {
						    this.responseReceived = false;
					    }, 3000 )
				    }
			    );
	    }
	    
		
		
		
		
		this.prForm.valueChanges
		.subscribe(
			(response) => {
				
				let monthTemp = {
					'attendance': {
						'men': 0,
						'women': 0,
						'children': 0,
						'total': 0,
						'sunday_child':0,
						'sunday_service_child':0,
						'sunday_women':0,
						'sunday_service_women':0,
						'sunday_men':0,
						'sunday_service_men':0,
						'mid_week_men':0,
						'mid_week_women':0,
						'mid_week_child':0,
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
				
				this.sundaychild = [];
				this.sundayServicechild = [];
				this.sundaywomen = [];
				this.sundayServicewomen = [];
				this.sundaymen = [];
				this.sundayServicemen = [];
				this.midWeekmen = [];
				this.midWeekwomen = [];
				this.midWeekchild = [];
				
				for( let i = 0; i < this.progress_report.report.weekly.length; i++ ) {
					
					let weeklyTemp = {
						'attendance': {
							'men': 0,
							'women': 0,
							'children': 0,
							'total': 0,
							'sunday_child':0,
							'sunday_service_child':0,
							'sunday_women':0,
							'sunday_service_women':0,
							'sunday_men':0,
							'sunday_service_men':0,
							'mid_week_men':0,
							'mid_week_women':0,
							'mid_week_child':0,
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
						if(this.progress_report.report.weekly[i].days[j].programmes == 'Sunday School') {
							weeklyTemp.attendance.sunday_child += this.progress_report.report.weekly[i].days[j].attendance.children;
							weeklyTemp.attendance.sunday_women += this.progress_report.report.weekly[i].days[j].attendance.women;
							weeklyTemp.attendance.sunday_men   += this.progress_report.report.weekly[i].days[j].attendance.men;
						}
						
						if(this.progress_report.report.weekly[i].days[j].programmes == 'Sunday Service') {
							weeklyTemp.attendance.sunday_service_child += this.progress_report.report.weekly[i].days[j].attendance.children;
							weeklyTemp.attendance.sunday_service_women += this.progress_report.report.weekly[i].days[j].attendance.women;
							weeklyTemp.attendance.sunday_service_men   += this.progress_report.report.weekly[i].days[j].attendance.men;
						}
						
						if(this.progress_report.report.weekly[i].days[j].programmes != 'Sunday Service' && this.progress_report.report.weekly[i].days[j].programmes != 'Sunday School') {
							weeklyTemp.attendance.mid_week_men += this.progress_report.report.weekly[i].days[j].attendance.men;
							weeklyTemp.attendance.mid_week_women += this.progress_report.report.weekly[i].days[j].attendance.women;
							weeklyTemp.attendance.mid_week_child   += this.progress_report.report.weekly[i].days[j].attendance.children;
						}
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
					
					this.sundaychild[i] = weeklyTemp.attendance.sunday_child;
					this.sundayServicechild[i] = weeklyTemp.attendance.sunday_service_child;
					this.sundaywomen[i] = weeklyTemp.attendance.sunday_women;
					this.sundayServicewomen[i] = weeklyTemp.attendance.sunday_service_women;
					this.sundaymen[i] = weeklyTemp.attendance.sunday_men;
					this.sundayServicemen[i] = weeklyTemp.attendance.sunday_service_men;
					this.midWeekmen[i] = weeklyTemp.attendance.mid_week_men;
					this.midWeekwomen[i] = weeklyTemp.attendance.mid_week_women;
					this.midWeekchild[i] = weeklyTemp.attendance.mid_week_child;
					
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
					monthTemp.attendance.sunday_child += this.sundaychild[i];
					monthTemp.attendance.sunday_service_child += this.sundayServicechild[i];
					monthTemp.attendance.sunday_women += this.sundaywomen[i];
					monthTemp.attendance.sunday_service_women += this.sundayServicewomen[i];
					monthTemp.attendance.sunday_men += this.sundaymen[i];
					monthTemp.attendance.sunday_service_men += this.sundayServicemen[i];
					monthTemp.attendance.mid_week_men += this.midWeekmen[i];
					monthTemp.attendance.mid_week_women += this.midWeekwomen[i];
					monthTemp.attendance.mid_week_child += this.midWeekchild[i];
					
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
				this.child_sunday         = monthTemp.attendance.sunday_child;
				this.child_sunday_service = monthTemp.attendance.sunday_service_child;
				this.women_sunday         = monthTemp.attendance.sunday_women;
				this.women_sunday_service = monthTemp.attendance.sunday_service_women;
				this.men_sunday         = monthTemp.attendance.sunday_men;
				this.men_sunday_service = monthTemp.attendance.sunday_service_men;
				this.midWeek_men = monthTemp.attendance.mid_week_men;
				this.midWeek_women = monthTemp.attendance.mid_week_women;
				this.midWeek_child = monthTemp.attendance.mid_week_child;
				
				/** Saving weekly monetary */
				this.progress_report.report.monthly_total.monetary.offering = monthTemp.monetary.offering;
				this.progress_report.report.monthly_total.monetary.tithe.pastor = monthTemp.monetary.tithe.pastor;
				this.progress_report.report.monthly_total.monetary.tithe.general = monthTemp.monetary.tithe.general;
				this.progress_report.report.monthly_total.monetary.f_fruit = monthTemp.monetary.f_fruit;
				this.progress_report.report.monthly_total.monetary.t_giving = monthTemp.monetary.t_giving;
				
				/**to calculate the penalty amount */
				var penalty = (monthTemp.monetary.total*this.penalty_percent)/100;
				
				var total =  monthTemp.monetary.total + penalty;
				
				this.progress_report.report.monthly_total.monetary.total = total;
				
				
				
				/** Calculating wem's share */
				this.progress_report.wem_share =  this.progress_report.report.monthly_total.monetary.total * ( this.progress_report.wem_percentage/100 );
				
				var date = new Date(this.progress_report.parish_start_date);
				var parish_start_year   = date.getFullYear();
				var parish_start_month  = date.getMonth()+1;
				var c_date = new Date(this.progress_report.crucial_date);
				var crucial_date_year   = c_date.getFullYear();
				var crucial_date_month  = c_date.getMonth()+1;
				
				var parish_age_in_months = ((crucial_date_year - parish_start_year)*12)+(crucial_date_month-parish_start_month);
				var tithe_offering_index = (parish_age_in_months < 25)?.1:(parish_age_in_months < 37)?.15:.20;
				var thanksgiving_index   = .10;
				var monthly_tithe        = this.progress_report.report.monthly_total.monetary.offering;
				var monthly_offering     = this.progress_report.report.monthly_total.monetary.tithe.general;
				var monthly_thanksgiving = this.progress_report.report.monthly_total.monetary.t_giving;
				var monthly_wem_thankgiving = (monthly_thanksgiving*0.3);
				var wem_income  = (monthly_tithe + monthly_offering + monthly_wem_thankgiving);
				var wem_tithe_offering = (monthly_tithe + monthly_offering)*tithe_offering_index;
				var wem_thanks = (monthly_thanksgiving * .3 * thanksgiving_index);
				var wem_total = (wem_tithe_offering + wem_thanks);
				var area_dues = (wem_income - wem_total)*.05;
				
				this.progress_report.area_dues = area_dues;
				this.progress_report.wem_share = wem_total;
			},
            (error:Response) => {
                if ( error.status === 401 ) {
                    this.authService.removeToken();
                    this.router.navigate( [ '/login' ] );
                }
            }
		);
		
		this.generateReportSubscription = this.reportService.generateReport
		.subscribe(
			( body:{ report_month: number, report_year: number, pastor_id: number } ) => {

				if( this.editMode ) {
					this.displaymode  = true;
				    this.title = "Update Report";
				    if(this.count == 0 ) {
					    this.count = 1;
					    /** Checking route params to get id of province to edit */
					    this.activatedRoute.params
						    .subscribe(
							    (params: Params) => {
								    this.reportId = params['id'];
								    this.reportService.reportToEdit(this.reportId)
									    .subscribe(
										    (response: Response) => {
											
											    this.progress_report = response.json().report.progress_report;
											    this.progress_report.account_name = response.json().report.account_name;
											    this.parish_id = response.json().report.parish_id;
											    let tempDate = moment(this.progress_report.crucial_date);
											    this.progress_report.crucial_date = tempDate;
											    this.progress_report.account_name = response.json().report.account_name;
										    },
										    (error: Response) => {
											    if ( error.status === 401 ) {
												    this.authService.removeToken();
												    this.router.navigate( [ '/login' ] );
											    }
										    }
									    );
								
							    },
							    (error: Response) => {
								    if ( error.status === 401 ) {
									    this.authService.removeToken();
									    this.router.navigate( [ '/login' ] );
								    }
							    }
						    );
					
				    }
					
				} else {
                   this.reportService.getReportBP(body)
						.subscribe(
							(response: Response) => {
								const crucial_date = this.progress_report.crucial_date;
								this.progress_report = response.json().progress_report[(response.json().progress_report).length - 1].progress_report;
								this.progress_report.crucial_date = crucial_date;
								this.parish_id = this.progress_report.parish_id;
								
							},
							(error: Response) => {
								if ( error.status === 401 ) {
                                    this.authService.removeToken();
                                    this.router.navigate( [ '/login' ] );
                                }
                            }
						);
				}
			}
		);
		
		
		/** Checking route data to get present mode */
		this.activatedRoute.data
            .subscribe(
                (data: Data) => {

                    this.editMode = data['editMode'];
                    this.viewMode = data['viewMode'];
	                
                    if( this.editMode ) {
                    	this.reportService.generateReport.next({});
                    }

                    if( this.viewMode ) {

                        this.title = "View Report";
                        /** Checking route params to get id of report to edit */
                        this.activatedRoute.params
                            .subscribe(
                                (params: Params) => {
                                    if( this.viewMode ) {

                                        this.reportId = params['id'];
	                                    this.displaymode  = true;
                                        this.reportService.viewReport( this.reportId )
                                            .subscribe(
                                                (response: Response) => {
                                                	this.reportIdList = response.json().allreportId;
                                                    this.parish_id = response.json().report.parish_id;
                                                    this.progress_report = response.json().report.progress_report;
                                                    let tmpDate = moment(this.progress_report.crucial_date);
                                                    const date = new Date( this.progress_report.crucial_date );
                                                    this.progress_report.crucial_date = tmpDate;
                                                    this.progress_report.account_name = response.json().report.account_name;
                                                    this.timeInfo = {
                                                        report_month: date.getMonth() + 1,
                                                        report_year: date.getFullYear()
                                                    };
                                                }
                                            );

                                    }

                                },
                                (error: Response) => {
                                    console.log(error);
                                }
                        );

                    }
                    
                    if(!this.editMode && !this.viewMode){
                    	this.createMode = true;
                    }

                }
		);
		
		
		
		
		/** List all available Parish Id's*/
		
		
		
		if(user_type !=3) {
			this.parishShow = true;
			this.pzapService.filterParish({})
				.subscribe(
					( response: Response ) => {
						if(response.json().status) {
							this.displaymode  = true;
							this.parishIdList = response.json().parishes;
						}
					},
					( error: Response ) => {
						console.log(error.json())
					}
				);
			} else {
			this.parishShow = false;
		}
	}
	
	/** Function to get date while changing dates in date picker */
	log(event) {
		if(event) {
			
			const date = new Date( event );
            this.timeInfo = {
                report_month: date.getMonth() + 1,
                report_year: date.getFullYear()
            };
			if( this.viewMode ) {
				const obj = {
					...this.timeInfo,
					parish_id:  this.parish_id
				};
				this.reportService.fetchReport(obj)
					.subscribe(
						( response: Response ) => {
							if(response.json().status) {
								this.displaymode  = true;
								this.reportIdList = response.json().allreportId;
								let reportIsPresent = false;
                                for( let i=0; i< this.reportIdList.length; i++ ) {
                                    if(this.reportIdList[i].id == this.reportId){
                                        reportIsPresent = true;
									}
								}
								if(!reportIsPresent){
                                    this.reportId = this.reportIdList[0].id;
                                    this.onReportChange(this.reportId);
								}

							} else {
								this.reportIdList = response.json().allreportId;
								this.displaymode  = false;
							}
						},( error: Response ) => {
							this.reportIdList = error.json().allreportId;
							this.displaymode  = false;
						}
					);
			} else {
				this.reportService.generateReport.next( this.timeInfo );
			}
		}

	}

	/** Function call when parish id changed */
    onParishIdChange( parishId: number ) {
        const obj = {
            ...this.timeInfo,
            parish_id: parishId
        };
        this.reportService.fetchReport(obj)
            .subscribe(
	            ( response: Response ) => {
		            if(response.json().status) {
			            this.displaymode  = true;
			            this.reportIdList = response.json().allreportId;

                        let reportIsPresent = false;
                        for( let i=0; i< this.reportIdList.length; i++ ) {
                            if(this.reportIdList[i].id == this.reportId){
                                reportIsPresent = true;
                            }
                        }
                        if(!reportIsPresent){
                            this.reportId = this.reportIdList[0].id;
                            this.onReportChange(this.reportId);
                        }
		            } else {
			            this.reportIdList = response.json().allreportId;
			            this.displaymode  = false;
		            }
	            },( error: Response ) => {
	            	this.reportIdList = error.json().allreportId;
		            this.displaymode  = false;
	            }
            );
    }

	
	/** Function to create report */
	onSubmit(submit_status) {
		if( this.editMode ) {
			const obj = {
				progress_report: this.progress_report,
				status:submit_status
			};
			this.reportService.updateReport( obj, this.reportId )
				.subscribe(
					
					( response: Response ) => {
						this.responseStatus = response.json().status;
						this.responseMsg = response.json().message;
						this.responseReceived = true;
                        this.reportService.generateReport.next({});
					},
					( error: Response ) => {

                        if ( error.status === 401 ) {
                            this.authService.removeToken();
                            this.router.navigate( [ '/login' ] );
                        }

						this.responseStatus = false;
						this.responseReceived = true;
						this.responseMsg = error.json().error;
						setTimeout( () => {
							this.responseReceived = false;
						}, 5000);
					},
					() => {
						this.progress_report = this.temp_report;
						this.progress_report.crucial_date = undefined;
						setTimeout( () => {
							this.responseReceived = false;
						}, 5000);
					}
				
				);
		} else {
			const obj = {
				report_month: this.timeInfo.report_month,
				report_year: this.timeInfo.report_year,
				progress_report: this.progress_report,
				status:submit_status
			};
			
			this.reportService.sendReport( obj )
			.subscribe(

				( response: Response ) => {
					this.responseStatus = response.json().status;
					this.responseMsg = response.json().message;
					this.responseReceived = true;
				},
				( error: Response ) => {
                    if ( error.status === 401 ) {
                        this.authService.removeToken();
                        this.router.navigate( [ '/login' ] );
                    }
					this.responseStatus = false;
					this.responseReceived = true;
					this.responseMsg = error.json().error;
					setTimeout( () => {
						this.responseReceived = false;
					}, 5000);
				},
				() => {
					this.progress_report = this.temp_report;
					this.progress_report.crucial_date = undefined;
					setTimeout( () => {
						this.responseReceived = false;
					}, 5000);
				}

			);
		}
		
	}

    onReportChange( reportId: number ) {
        this.router.navigate( [ 'report/view/', reportId ] );
    }
	
	ngOnDestroy() {
		this.generateReportSubscription.unsubscribe();
	}
	
}


