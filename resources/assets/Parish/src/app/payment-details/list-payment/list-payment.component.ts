/** Component to handle list of payment */

import { Component, OnDestroy, OnInit } from "@angular/core";
import { FileUploader } from 'ng2-file-upload';
import { Router } from "@angular/router";
import { Response } from '@angular/http';
import { Subscription } from "rxjs/Subscription";

import { PaymentService } from "../payment.service";
import { AuthService } from "../../auth/auth.service";
import { environment } from "../../../environments/environment.prod";
import { ProvinceZoneAreaParishService } from "../../province-zone-area-parish/province-zone-area-parish.service";
import { ParishListModel } from "../../province-zone-area-parish/parish/parish-list.model";
import { ProvinceListModel } from "../../province-zone-area-parish/province/province-list.model";
import { ZoneListModel } from "../../province-zone-area-parish/zone/zone-list.model";
import { AreaListModel } from "../../province-zone-area-parish/area/area-list.model";


@Component({
	selector: 'app-list-payment',
	templateUrl: './list-payment.component.html',
	styleUrls   : [ './list-payment.component.css' ]
})


export class ListPaymentComponent implements OnInit, OnDestroy {
	
	responseStatus                      = false;
	responseReceived                    = false;
	showRejectPrompt                    = false;
	responseMsg         : string        = '';
    public ifNoData     : boolean       = false;
	public showProgressbar     : boolean       = false;

	selectionYear       : number        = 0;
    selectionMonth      : number        = 0;
    selectionProvince   : number        = 0;
    selectionZone       : number        = 0;
    selectionArea       : number        = 0;
    selectionParish     : number        = 0;

    showParishIdList    : boolean       = false;
    provinceList        : ProvinceListModel[];
    zoneList            : ZoneListModel[];
    areaList            : AreaListModel[];
    parishList          : ParishListModel[];
    currentYear         : number        = (new Date()).getFullYear();
    currentMonth        : number        = ((new Date()).getMonth()) + 1;
    currentYearList     : number[]      = [];

    isWEM: boolean = false;
    isProvincePastor: boolean = false;
    isZonePastor: boolean = false;
    isAreaPastor: boolean = false;
    isParishPastor: boolean = false;
	showDeletePrompt    : boolean   = false;
	toDeletePayment     : any;
	toRejectPayment     : any;
	
	paymentDetails                  = [];
	uploader                        = new FileUploader({});
	
	refreshPaymentListSubscription  : Subscription;
    refreshZoneListSubscription  : Subscription;
    refreshAreaListSubscription  : Subscription;
    refreshParishListSubscription  : Subscription;
	
	closePromptEventSubscription     : Subscription;
	deletePaymentEventSubscription   : Subscription;
	rejectPaymentEventSubscription   : Subscription;

	showUploadButton                : number        =  0 ;
	progress                        : number        =  0 ;
	files                           : FileList;
	base_url                        : string        = environment.base_url;
	months 							= Array();


	/** Injecting services to be used in this component */
	constructor( private paymentService: PaymentService,
	             private router: Router,
	             private authService: AuthService,
                 private pzapService: ProvinceZoneAreaParishService ) { }
	
	ngOnInit() {
		
		/** Setting user type */
        if( this.authService.getToken().user_type === 1 ) {
            this.showParishIdList = true;
            this.isWEM = true;
        }else {
            if(this.authService.getToken().pastor_type === 1) {
                this.isProvincePastor = true;
                this.isZonePastor = false;
                this.isAreaPastor = false;
                this.isParishPastor = false;
            } else if(this.authService.getToken().pastor_type === 2) {
                this.isProvincePastor = false;
                this.isZonePastor = true;
                this.isAreaPastor = false;
                this.isParishPastor = false;
            } else if(this.authService.getToken().pastor_type === 3) {
                this.isProvincePastor = false;
                this.isZonePastor = false;
                this.isAreaPastor = true;
                this.isParishPastor = false;
            } else{
                this.isProvincePastor = false;
                this.isZonePastor = false;
                this.isAreaPastor = false;
                this.isParishPastor = true;
            }

            this.showParishIdList = false;
            this.isWEM = false;
        }

        /** Populating the year array */
        for( let i = 2010; i <= this.currentYear; i++ ) {
            this.currentYearList.push( i );
        }

        /** Initializing month array */
        this.months[0] = { name:"January", number: 1 };
        this.months[1] = { name:"February", number: 2 };
        this.months[2] = { name:"March", number: 3 };
        this.months[3] = { name:"April", number: 4 };
        this.months[4] = { name:"May", number: 5 };
        this.months[5] = { name:"June", number: 6 };
        this.months[6] = { name:"July", number: 7 };
        this.months[7] = { name:"August", number: 8 };
        this.months[8] = { name:"September", number: 9 };
        this.months[9] = { name:"October", number: 10 };
        this.months[10] = { name:"November", number: 11 };
        this.months[11] = { name:"December", number: 12 };

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

        /** Subscribe to event to refresh zone list */
        this.refreshZoneListSubscription = this.paymentService.refreshList
            .subscribe(
                () => {

                    if( this.isWEM || this.isProvincePastor ) {

                        this.pzapService.filterZone( this.getCurrentSelectedFilters() )
                            .subscribe(
                                (response: Response) => {
                                    this.responseStatus = response.json().status;
                                    if( response.json().status ) {
                                        this.zoneList = response.json().zones;

                                        if ( this.zoneList && this.zoneList.length == 1 ) {
                                            this.selectionZone = this.zoneList[0].id;
                                        }

                                    } else {
                                        this.zoneList           = [];
                                        this.responseMsg        = response.json().message;
                                        // this.responseNoRecord   = response.json().noData;
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

                    }
                }
            );

        /** Subscribe to event to refresh area list */
        this.refreshAreaListSubscription = this.paymentService.refreshList
            .subscribe(
                () => {
                    if( this.isWEM || this.isProvincePastor || this.isZonePastor ) {

                        this.pzapService.filterArea( this.getCurrentSelectedFilters() )
                            .subscribe(
                                (response: Response) => {
                                    this.responseStatus = response.json().status;

                                    if( response.json().status ) {
                                        this.areaList = response.json().areas;

                                        if ( this.areaList && this.areaList.length == 1 ){
                                            this.selectionArea = this.areaList[0].id;
                                        }
                                        // this.responseNoRecord   = response.json().noData;
                                    } else {
                                        this.areaList = [];
                                        this.responseMsg = response.json().message;
                                        // this.responseNoRecord   = response.json().noData;
                                    }
                                },
                                (error: Response) => {
                                    if( error.status === 401) {
                                        this.authService.removeToken();
                                        this.router.navigate( ['/login'] );
                                    }
                                    this.responseStatus     = false;
                                    this.responseReceived   = true;
                                    this.areaList           = [];
                                    this.responseMsg        = error.json().error;
                                }
                            );

                    }
                }
            );

        /** Subscribe to event to refresh parish list */
        this.refreshParishListSubscription = this.paymentService.refreshList
            .subscribe(
                () => {

                    if( this.isWEM || this.isProvincePastor || this.isZonePastor || this.isAreaPastor ) {

                        this.pzapService.filterParish(this.getCurrentSelectedFilters())
                            .subscribe(
                                (response: Response) => {
                                    this.responseStatus = response.json().status;

                                    if (response.json().status) {
                                        this.parishList = response.json().parishes;

                                        if (this.parishList && this.parishList.length == 1) {
                                            this.selectionParish = this.parishList[0].id;
                                        }

                                    } else {
                                        this.parishList = [];
                                        this.selectionProvince = null;
                                        this.selectionZone = null;
                                        this.responseMsg = response.json().message;
                                        // this.responseNoRecord   = response.json().noData;
                                    }
                                },
                                (error: Response) => {
                                    if (error.status === 401) {
                                        this.authService.removeToken();
                                        this.router.navigate(['/login']);
                                    }
                                    this.responseStatus = false;
                                    this.responseReceived = true;
                                    this.parishList = [];
                                    this.responseMsg = error.json().error;
                                }
                            );

                    }
                }
            );


        /** Subscribe to event to refresh payment list */
		this.refreshPaymentListSubscription = this.paymentService.refreshList
			.subscribe(
				() => {
					this.paymentService.listPayment( this.getCurrentSelectedFilters() )
                        .subscribe(
                            (response: Response) => {
                                this.responseStatus = response.json().status;
                                this.ifNoData       = false;
                                if(response.json().status) {

                                    this.paymentDetails = response.json().paymentDetail;
                                    this.paymentDetails.forEach(item => {
                                        let pay_status = (item.payment_status == 3)?'On Hold':(item.payment_status == 0)?'Accepted':'Rejected';
                                        item.pay_status = pay_status;
                                        if ( item.payment_status == 3 ){

                                            item.hold   = true;
                                            item.accept = false;
                                            item.reject = false

                                        } else if ( item.payment_status == 1 ){

                                            item.hold   = false;
                                            item.accept = false;
                                            item.reject = true;

                                        } else{

                                            item.hold   = false;
                                            item.accept = true;
                                            item.reject = false;
                                        }
                                    });
                                }
                                else {
                                    this.ifNoData           = true;
                                    this.responseMsg        = response.json().message;
                                    this.paymentDetails = response.json().paymentDetail;
                                }
                            },
                            (error: Response) => {
                                if( error.status === 401) {
                                    this.authService.removeToken();
                                    this.router.navigate( ['/login'] );
                                }
                                this.responseStatus = false;
                                this.responseReceived = true;
                                this.paymentDetails = [];
                                this.responseMsg = error.json().error;
                            }
                        );

				}
			);
		
		/** Subscribe to event to close the delete prompt */
		this.closePromptEventSubscription = this.pzapService.closePromptEvent
			.subscribe(
				() => {
					this.showDeletePrompt = false;
					this.showRejectPrompt = false;
				}
			);
		
		/** Subscribe to event to delete an Payment */
		
		this.deletePaymentEventSubscription = this.paymentService.deleteEvent
			.subscribe(
				(id: number) => {
					this.showDeletePrompt = false;
					this.paymentService.deletePayment( id ).subscribe(
						(response: Response) => {
							this.responseReceived   = true;
							this.responseStatus     = response.json().status;
							
							if( response.json().status ) {
								this.responseMsg = response.json().message;
								this.paymentService.refreshList.next( {} );
							} else {
								this.areaList       = [];
								this.responseMsg    = response.json().message;
							}
							setTimeout( () => {
								this.responseReceived = false;
							}, 3000 )
						},
						(error: Response) => {
							if( error.status === 401) {
								this.authService.removeToken();
								this.router.navigate( ['/login'] );
							}
							this.responseStatus = false;
							this.responseReceived = true;
							this.responseMsg = error.json().error;
						}
					);
				}
			);
		
		/** Subscribe to event to Reject a Payment */
		
		this.rejectPaymentEventSubscription = this.paymentService.showPromptEvent
			.subscribe(
				(getItemInfo: any) => {
					this.showRejectPrompt = false;
					getItemInfo[0].comment = getItemInfo.comment;
					this.paymentService.paymentChangeStatus(getItemInfo[0])
						.subscribe(
							(response: Response) => {
								this.responseReceived   = true;
								this.responseStatus = response.json().status;
								if ( response.json().status ) {
									this.responseMsg = response.json().message;
								} else {
									this.responseMsg = '';
								}
								this.paymentService.refreshList.next();
							},
							(error: Response) => {
								if( error.status === 401) {
									this.authService.removeToken();
									this.router.navigate( ['/login'] );
								}
								this.responseStatus = false;
								this.responseReceived = true;
								this.responseMsg = error.json().error;
							}
						);
				}
			);
		
		/** Emitting event which will refresh the payment list */
		this.paymentService.refreshList.next();
	}
	
	/** Upload doc Function */
	upload(payment) {
		
        this.progress           = 10;
		this.showProgressbar    = true;
		const user_id           = this.authService.getToken().user_id;
		
		const formData      = new FormData();
		formData.append("name", this.files[0]);
		formData.append("upload_month",payment.upload_month);
		formData.append('upload_year',payment.upload_year);
		formData.append("payment_description",payment.payment_description);
		formData.append("user_id", user_id);
		
		this.paymentService.paymentCreate(formData)
			.subscribe(
				(response: Response) => {
					this.responseStatus = response.json().status;
					if(response.json().status){
						this.progress           = 100;
						this.responseMsg        = response.json().message;
						this.responseReceived   = true;
					} else {
						this.responseMsg        = '';
					}
					this.paymentService.refreshList.next();
				},
				(error: Response) => {
					if( error.status === 401) {
						this.authService.removeToken();
						this.router.navigate( ['/login'] );
					}
					this.progress           = 0;
					this.responseStatus     = false;
					this.responseReceived   = true;
					this.responseMsg        = error.json().error;
				},
                () => {
                        
                        setTimeout( () => {
                            this.progress           = 0;
                            this.responseReceived   = false;
                            this.showProgressbar    = false;
                        }, 3000);
                    }
			);
		
	}

	/** Download Single Payment Proof*/
    downloadPayment(payment){
        console.log(payment);
    }



	/** Show upload button when try to upload any doc */
	showUploader(payment,event) {
		this.showUploadButton   = payment.id;
		this.files              = event.target.files;
		this.progress           = 10;
        this.showProgressbar   = true;
	}

	/** Change status of Payment **/
	OnChangeStatus(payment,status) {
		let setpaymentArray = [
			{ id: payment.id, payment_status: status}
		];
		
		if(status != 1){
			this.paymentService.paymentChangeStatus(setpaymentArray[0])
			.subscribe(
				(response: Response) => {
					this.responseReceived   = true;
					this.responseStatus = response.json().status;
					if ( response.json().status ) {
						this.responseMsg = response.json().message;
					} else {
						this.responseMsg = '';
					}
					this.paymentService.refreshList.next();
				},
				(error: Response) => {
					if( error.status === 401) {
						this.authService.removeToken();
						this.router.navigate( ['/login'] );
					}
					this.responseStatus = false;
					this.responseReceived = true;
					this.responseMsg = error.json().error;
				}
			);
		} else {
			this.toRejectPayment = setpaymentArray;
			this.showRejectPrompt = true;
		}
	}

    /** Function call when month selected */
    onSelectMonth( month: number ) {
        this.selectionMonth = month;
        this.paymentService.refreshList.next();
    }

    /** Function call when year selected */
    onSelectYear( year: number ) {
        this.selectionYear = year;
        this.paymentService.refreshList.next();
    }

    /** Function call to refresh payment list on select of province */
    onSelectProvince( provinceId: number ) {
        this.selectionProvince = provinceId;
        this.selectionZone = 0;
        this.selectionArea = 0;
        this.selectionParish = 0;

        this.paymentService.refreshList.next();
    }

    /** Function call to refresh payment list on select of province */
    onSelectZone( zoneId: number ) {
        this.selectionZone = zoneId;
        this.selectionArea = 0;
        this.selectionParish = 0;
        if( zoneId > 0 ) {
            const selected = this.zoneList.find((item) => {
                return item.id == this.selectionZone;
            });
            this.selectionProvince = selected.province_id;
        } else {
            this.zoneList = [];
        }
        this.paymentService.refreshList.next();
    }

    /** Function call to refresh payment list on select of province */
    onSelectArea( areaId: number ) {
        this.selectionArea = areaId;
        this.selectionParish = 0;
        if( areaId > 0) {
            const selected = this.areaList.find((item) => {
                return item.id == this.selectionArea;
            });
            this.selectionProvince = selected.province_id;
            this.selectionZone = selected.zone_id;
        } else {
            this.areaList = [];
        }
        this.paymentService.refreshList.next();
    }

    /** Function call when month selected */
    onSelectParish( parishId: number ) {
        this.selectionParish = parishId;
        if( parishId > 0) {
            const selected = this.parishList.find((item) => {
                return item.id == this.selectionParish;
            });
            this.selectionProvince = selected.province_id;
            this.selectionZone = selected.zone_id;
            this.selectionArea = selected.area_id;
        } else {
            this.areaList = [];
        }
        this.paymentService.refreshList.next();
    }

    /** Function call to reset filters */
    onResetFilters() {
        this.selectionMonth = 0;
        this.selectionYear = 0;
        this.selectionProvince = 0;
        this.selectionZone = 0;
        this.selectionArea = 0;
        this.selectionParish = 0;
        this.paymentService.refreshList.next();
    }

    /** Function that returns current selected filters */
    getCurrentSelectedFilters() {
        return {
            request_year: this.selectionYear > 0 ? this.selectionYear : '',
            request_month: this.selectionMonth > 0 ? this.selectionMonth : '',
            province_id: this.selectionProvince > 0 ? this.selectionProvince : '',
            zone_id: this.selectionZone > 0 ? this.selectionZone : '',
            area_id: this.selectionArea > 0 ? this.selectionArea : '',
            parish_id: this.selectionParish > 0 ? this.selectionParish : ''
        }
    }
	
	/** Function call to show delete prompt */
	showPrompt(obj: any) {
		this.showDeletePrompt = true;
		this.toDeletePayment = obj;
	}
    
    /** Function to delete a payment */
    OnClickDelete(payment) {
	    console.log('delete');
    	/*this.paymentService.deletePayment(payment.id)
		    .subscribe(
			    (response: Response) => {
				    this.responseReceived   = true;
				    this.responseStatus = response.json().status;
				    if ( response.json().status ) {
					    this.responseMsg = response.json().message;
				    } else {
					    this.responseMsg = '';
				    }
				    this.paymentService.refreshList.next();
			    },
			    (error: Response) => {
				    if( error.status === 401) {
					    this.authService.removeToken();
					    this.router.navigate( ['/login'] );
				    }
				    this.responseStatus = false;
				    this.responseReceived = true;
				    this.responseMsg = error.json().error;
			    }
		    );*/
    }

    /** Un-subscribing from all custom made events when component is destroyed */
    ngOnDestroy() {
        this.refreshPaymentListSubscription.unsubscribe();
        this.refreshZoneListSubscription.unsubscribe();
        this.refreshAreaListSubscription.unsubscribe();
        this.refreshParishListSubscription.unsubscribe();
        this.deletePaymentEventSubscription.unsubscribe();
        this.rejectPaymentEventSubscription.unsubscribe();
    }

}