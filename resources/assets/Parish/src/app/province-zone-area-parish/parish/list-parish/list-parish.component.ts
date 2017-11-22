/** Component to list and filter Parish */

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { NgForm } from '@angular/forms';
import { IDatePickerConfig } from "ng2-date-picker";
import * as moment from 'moment';

import { ProvinceListModel } from '../../province/province-list.model';
import { ZoneListModel } from '../../zone/zone-list.model';
import { AreaListModel } from '../../area/area-list.model';
import { ParishListModel } from '../parish-list.model';
import { ProvinceZoneAreaParishService } from '../../province-zone-area-parish.service';
import { AuthService } from "../../../auth/auth.service";

@Component({
	selector: 'app-list-parish',
	templateUrl: './list-parish.component.html',
	styleUrls: [ './list-parish.component.css' ]
})
export class ListParishComponent implements OnInit, OnDestroy {
	
	
	zoneList            : ZoneListModel[];
	areaList            : AreaListModel[];
	parishList          : ParishListModel[];
	provinceList        : ProvinceListModel[];
	toDeleteParish      : ParishListModel;
	
	provID              : number;
	zoneID              : number;
	responseMsg         : string    = '';
	responseNoRecord    : string    = '';
	responseStatus      : boolean   = false;
	responseReceived    : boolean   = false;
	showDeletePrompt    : boolean   = false;
	zoneSelected        : boolean   = false;
	areaSelected        : boolean   = false;
	provinceSelected    : boolean   = false;
	selectionProvince   : number    = 0;
	selectionZone       : number    = 0;
	selectionArea       : number    = 0;

	parishSelected      : boolean   = false;
	selectionParish     : number    = 2;
	
	refreshParishListSubscription   : Subscription;
	closePromptEventSubscription    : Subscription;
	deleteParishEventSubscription   : Subscription;

	selectDate			: boolean 	= false;
	showLoader      	: boolean   = false;

	config                         : IDatePickerConfig   = {
		firstDayOfWeek: 'su',
		format:'YYYY-MM-DD',
		monthFormat: 'MMM, YYYY',
		max:null,
		min:null,
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
		enableMonthSelector: false,
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

	formData = {
		due_date : null
	};


	/** Injecting services to be used in this component */
	constructor( private router: Router,
	             private pzapService: ProvinceZoneAreaParishService,
	             private authService: AuthService) { }
	
	ngOnInit() {
	
	/** Subscribe to event to refresh parish list */
	this.refreshParishListSubscription = this.pzapService.refreshList
		.subscribe(
			( body ) => {
				const user_type = this.authService.getToken().user_type;
				if(user_type != 0) {
					this.pzapService.filterParish( body ).subscribe(
						( response: Response ) => {
							this.responseStatus = response.json().status;
							
							if( response.json().status ) {
								console.log(response.json());
								this.parishList         = response.json().parishes;

								var date = new Date();

								var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
								var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

								var year     = firstDay.getFullYear().toString();
								var month    = (firstDay.getMonth()+1).toString();
								var day      = firstDay.getDate().toString();
								var minDate1     = year+"-"+month+"-"+day;

								var year     = lastDay.getFullYear().toString();
								var month    = (lastDay.getMonth()+1).toString();
								var day      = lastDay.getDate().toString();
								var maxDate1     = year+"-"+month+"-"+day;

								this.config.min = moment(minDate1);
								this.config.max = moment(maxDate1);

								this.formData.due_date  = response.json().due_date;
								this.responseNoRecord   = response.json().noData;
							} else {
								this.parishList         = [];
								this.selectionProvince  = null;
								this.selectionZone      = null;
								this.selectionParish    = null;
								this.responseMsg        = response.json().message;
								this.responseNoRecord   = response.json().noData;
							}
						},
						( error: Response ) => {
							if ( error.status === 401 ) {
								this.authService.removeToken();
								this.router.navigate( [ '/login' ] );
							}
							this.responseStatus     = false;
							this.responseReceived   = true;
							this.parishList         = [];
							this.responseMsg        = error.json().error;
						}
					);
				} else {
					this.parishList         = [];
				}
			}
		);
		
	/** Emitting event which will refresh the parish list */

		this.pzapService.refreshList.next( {} );
		
		/** Subscribe to event to close the delete prompt */
		this.closePromptEventSubscription = this.pzapService.closePromptEvent
		.subscribe(
			() => {
				this.showDeletePrompt = false;
			}
		);

		/** Subscribe to event to delete an parish */

		this.deleteParishEventSubscription = this.pzapService.deleteEvent
		.subscribe(
			(id: number) => {
				this.showDeletePrompt = false;
				this.pzapService.deleteParish( id ).subscribe(
					(response: Response) => {
						this.responseReceived   = true;
						this.responseStatus     = response.json().status;
						
						if( response.json().status ) {
							this.responseMsg = response.json().message;
							this.pzapService.refreshList.next( {} );
						} else {
							this.areaList       = [];
							this.responseMsg    = response.json().message;
						}
						setTimeout( () => {
							this.responseReceived = false;
						}, 3000 )
					},
					(error: Response) => {
						if ( error.status === 401 ) {
							this.authService.removeToken();
							this.router.navigate( [ '/login' ] );
						}
						this.responseStatus     = false;
						this.responseReceived   = true;
						this.areaList           = [];
						this.responseMsg        = error.json().error;
						setTimeout( () => {
							this.responseReceived = false;
						}, 3000 )
					}
				);
			}
		);
		
		/** Service call to get list of all available province */
		this.pzapService.listProvince()
		.subscribe(
			(response: Response) => {
				this.responseStatus = response.json().status;
				
				if( response.json().status ) {
					this.provinceList   = response.json().provinces;
				} else {
					this.provinceList   = [];
					this.responseMsg    = response.json().message;
				}
			},
			(error: Response) => {
				if ( error.status === 401 ) {
					this.authService.removeToken();
					this.router.navigate( [ '/login' ] );
				}
				this.responseStatus     = false;
				this.responseReceived   = true;
				this.provinceList       = [];
				this.responseMsg        = error.json().error;
			}
		);
		
		/** Service call to get list of all available zones */
		this.pzapService.filterZone( {} )
		.subscribe(
			(response: Response) => {
				this.responseStatus = response.json().status;
				
				if( response.json().status ) {
					this.zoneList = response.json().zones;
				} else {
					this.zoneList       = [];
					this.responseMsg    = response.json().message;
				}
			},
			(error: Response) => {
				if ( error.status === 401 ) {
					this.authService.removeToken();
					this.router.navigate( [ '/login' ] );
				}
				this.responseStatus     = false;
				this.responseReceived   = true;
				this.zoneList           = [];
				this.responseMsg        = error.json().error;
			}
		);
		
		/** Service call to get list of all available areas */
		this.pzapService.filterArea( {} )
		.subscribe(
			(response: Response) => {
				this.responseStatus = response.json().status;
				
				if( response.json().status ) {
					this.areaList = response.json().areas;
				} else {
					this.areaList       = [];
					this.responseMsg    = response.json().message;
				}
			},
			(error: Response) => {
				if ( error.status === 401 ) {
					this.authService.removeToken();
					this.router.navigate( [ '/login' ] );
				}
				this.responseStatus     = false;
				this.responseReceived   = true;
				this.areaList           = [];
				this.responseMsg        = error.json().error;
			}
		);
	}
	
	/** Function to reset all filter value and reset list */
	onResetFilters(){
		this.selectionProvince  = null;
		this.selectionZone      = null;
		this.selectionArea      = null;
		this.selectionParish    = 2;
		this.pzapService.refreshList.next( {} );
	}
	
	/** Function call on update button click */
	onEdit(obj: ParishListModel) {
		const parish_id = obj.id;
		this.router.navigate([ 'parish/edit/', parish_id ]);
	}
	
	/** Function call to show delete prompt */
	showPrompt(obj: ParishListModel) {
		this.showDeletePrompt = true;
		this.toDeleteParish = obj;
	}
	
	/** Function call on selection of province from filters */
	onSelectProvince(id: number) {
		console.log('here');
		if ( id > 0 ) {
			this.provID = id;
			this.pzapService.refreshList.next({province_id: id});
			this.pzapService.filterZone({province_id: id})
				.subscribe(
					(response: Response) => {
						this.responseStatus = response.json().status;
						if (response.json().status) {
							if(response.json().zones != undefined) {
								console.log(response.json().zones);
								this.zoneList = response.json().zones;
								this.selectionArea = null;
								if (this.zoneList != undefined && this.zoneList.length == 1) {
									this.selectionZone = this.zoneList[0]['id'];
									this.onSelectZone(this.zoneList[0]['id']);
								} else {
									
									this.selectionZone = 0
									this.pzapService.filterArea( { province_id: id } )
										.subscribe(
											(response: Response) => {
												this.responseStatus         = response.json().status;
												if( response.json().status ) {
													if(response.json().areas!=undefined){
														this.areaList       = response.json().areas;
														this.selectionArea  = 0;
													}
													
												} else {
													this.responseMsg ='';
												}
											},
											(error: Response) => {
												if ( error.status === 401 ) {
													this.authService.removeToken();
													this.router.navigate( [ '/login' ] );
												}
												this.responseStatus     = false;
												this.responseReceived   = true;
												this.zoneList           = [];
												this.areaList           = [];
											}
										);
								}
							} else {
								this.responseStatus = false;
								this.zoneList       = [];
								this.areaList       = [];
								this.responseMsg    = response.json().message;
								this.selectionZone  = 0;
								this.selectionParish  = 2;
								this.selectionArea  = 0;
							}
						} else {
							this.zoneList       = [];
							this.areaList       = [];
							this.responseMsg    = response.json().message;
							this.selectionZone  = 0;
							this.selectionParish  = 2;
							this.selectionArea  = 0;
						}
					},
					(error: Response) => {
						if ( error.status === 401 ) {
							this.authService.removeToken();
							this.router.navigate( [ '/login' ] );
						}
						this.responseStatus     = false;
						this.responseReceived   = true;
						this.zoneList           = [];
						this.responseMsg        = error.json().error;
					}
				);
		} else {
			
			this.responseStatus     = false;
			this.selectionProvince  = null;
			this.selectionZone      = null;
			this.selectionArea      = null;
			this.selectionParish    = 2;
			this.provID = id;
			this.pzapService.refreshList.next( {} );
			
		}
	}
	
	/** Function call on selection of zone from filters */
	onSelectZone(id: number) {
		if ( id > 0 ) {
			this.zoneSelected   = true;
			this.zoneID         = id;
			this.pzapService.refreshList.next({zone_id: id});
			this.pzapService.filterArea({zone_id: id})
				.subscribe(
					(response: Response) => {
						this.responseStatus = response.json().status;
						
						if (response.json().status) {
							this.areaList = response.json().areas;
							this.selectionArea = null;
							if (this.areaList != undefined && this.areaList.length == 1) {
								this.selectionArea = this.areaList[0]['id'];
								this.selectionProvince = this.areaList[0]['province_id'];
							} else {
								if (this.areaList != undefined) {
									this.selectionProvince = this.areaList[0]['province_id'];
								}
								this.selectionArea = null;
							}
						} else {
							this.selectionArea  = null;
							this.areaList       = [];
							this.responseMsg    = response.json().message;
						}
					},
					(error: Response) => {
						if ( error.status === 401 ) {
							this.authService.removeToken();
							this.router.navigate( [ '/login' ] );
						}
						this.responseStatus     = false;
						this.responseReceived   = true;
						this.areaList           = [];
						this.responseMsg        = error.json().error;
					}
				);
		}else{
			this.responseStatus     = false;
			this.selectionProvince  = 0;
			this.selectionZone      = 0;
			this.selectionArea      = 0;
			this.selectionParish    = 2;
			this.provID = id;
			this.pzapService.refreshList.next( {} );
		}
	}

	/** Function call on selection of area from filters */
	onSelectArea(id: number) {
		if ( id > 0 ) {
			this.areaSelected = true;
			this.pzapService.refreshList.next( { area_id: id } );

				/** get province and area id **/

					this.pzapService.filterParish( { area_id: id } ).subscribe(
					(response: Response) => {
						if( response.json().status ) {
							if(response.json().parishes != undefined) {
								this.selectionProvince  = response.json().parishes[0]['province_id'];
								this.selectionZone      = response.json().parishes[0]['zone_id'];
							}
						} else {
							this.selectionProvince  = null;
							this.selectionZone      = null;
						}
					},
					(error: Response) => {
						if ( error.status === 401 ) {
							this.authService.removeToken();
							this.router.navigate( [ '/login' ] );
						}
						this.selectionProvince  = null;
						this.selectionZone      = null;
						this.selectionParish    = 2;
					}
				);
		} else {
			this.areaSelected = false;
			this.pzapService.refreshList.next( { zone_id: this.zoneID } );
		}
	}

	/** Function call on selection of compliant parish  from filters */
	onSelectParish(id: number) {
		if ( id < 2 ) {
			this.parishSelected = true;
			console.log(id);

			this.pzapService.refreshList.next( {compliance: id , province_id: this.selectionProvince, area_id:this.selectionArea, zone_id: this.selectionZone} );
			/** get province and area id **/
		

		} else {
			this.parishSelected = false;
			this.pzapService.refreshList.next( {} );
		}
	}
	
	/** Function call for adding due date  */
	onAddDueDate() {
		if(this.selectDate) {
			this.selectDate   = false;
			this.pzapService.refreshList.next( {} );
		}
		else {
			this.selectDate = true;
		}


	}

	/** On submission of due date for the month */
	onSubmit( addDueDate: NgForm) {
		this.selectDate = true;
		this.showLoader = true;
		var due_date    = new Date(addDueDate.value.due_date);
		const year     = due_date.getFullYear().toString();
		const month    = (due_date.getMonth()+1).toString();
		const day      = due_date.getDate().toString();
		const date     = year+"-"+month+"-"+day;

		addDueDate.value.due_date = date;

		this.pzapService.addDueDate( addDueDate.value )
			.subscribe(
				( response: Response ) => {
					this.showLoader = false;
					this.responseStatus = response.json().status;

					if ( response.json().status ) {
						this.responseMsg = response.json().message;
						this.selectDate  = false;
					} else {
						this.responseMsg = '';
					}
				},
				( error: Response ) => {
					if ( error.status === 401 ) {
						this.authService.removeToken();
						this.router.navigate( [ '/login' ] );
					}

					this.showLoader         = false;
					this.responseStatus     = false;
					this.responseReceived   = true;
					this.responseMsg        = error.json().error;
					setTimeout( () => {
						this.responseReceived = false;
					}, 3000 )
				},
				() => {
					//createAreaForm.reset();
					this.responseReceived = true;
					setTimeout( () => {
						this.responseReceived = false;
					}, 3000 )
				}
			);
	}


	/** Function call to reset form */
	onReset(addDueDate: NgForm) {

		if ( !this.selectDate ) {
			this.pzapService.addDueDate( addDueDate.value )
				.subscribe(
					(response: Response) => {
						this.selectDate   = true;

					},
					(error: Response) => {
						if ( error.status === 401 ) {
							this.authService.removeToken();
							this.router.navigate( [ '/login' ] );
						}
					}
				);
		} else {
			addDueDate.form.patchValue( {
				due_date : this.formData.due_date
			});
			addDueDate.reset();
		}
	}

	/** Un-subscribing from all custom made events when component is destroyed */
	ngOnDestroy() {
		this.refreshParishListSubscription.unsubscribe();
		this.closePromptEventSubscription.unsubscribe();
		this.deleteParishEventSubscription.unsubscribe();
	}
}