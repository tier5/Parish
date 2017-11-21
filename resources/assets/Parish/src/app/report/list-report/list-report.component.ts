import { Component, OnDestroy, OnInit } from '@angular/core';
import { isNullOrUndefined } from "util";
import { Response } from "@angular/http";
import { Router } from "@angular/router";
import { Subscription } from "rxjs/Subscription";

import { AuthService } from "../../auth/auth.service";
import { ProvinceZoneAreaParishService } from "../../province-zone-area-parish/province-zone-area-parish.service";
import { ReportService } from "../report.service";
import {ParishListModel} from "../../province-zone-area-parish/parish/parish-list.model";
import {AreaListModel} from "app/province-zone-area-parish/area/area-list.model";
import {ZoneListModel} from "../../province-zone-area-parish/zone/zone-list.model";
import {ProvinceListModel} from "app/province-zone-area-parish/province/province-list.model";
import {isPromise} from "q";

@Component({
	selector: 'app-list-report',
	templateUrl: './list-report.component.html',
	styleUrls: [ './list-report.component.css' ]
})
export class ListReportComponent implements OnInit, OnDestroy {

    /** Initial variable declaration */
	currentYear: number = (new Date()).getFullYear();
    currentMonth: number = ((new Date()).getMonth()) + 1;
    currentYearList: number[] = [];
    reportList: any[];
    months = Array();
    parishIdList: ParishListModel[];
    prompt: boolean = false;
    toDeleteReport: number;
    showParishIdList: boolean = false;

    isWEM: boolean = false;
    isProvincePastor: boolean = false;
    isZonePastor: boolean = false;
    isAreaPastor: boolean = false;
    isParishPastor: boolean = false;

    responseStatus      : boolean       = false;
    responseReceived    : boolean       = false;
    responseMsg         : string        = '';

    areaList            : AreaListModel[];
    zoneList            : ZoneListModel[];
    parishList          : ParishListModel[];
    provinceList        : ProvinceListModel[];

    selectionYear       : number        = 0;
    selectionMonth      : number        = 0;
    selectionProvince   : number        = 0;
    selectionZone       : number        = 0;
    selectionArea       : number        = 0;
    selectionParish     : number        = 0;

    refreshReportListSubscription: Subscription;
    refreshZoneListSubscription  : Subscription;
    refreshAreaListSubscription  : Subscription;
    refreshParishListSubscription  : Subscription;

    /** Injecting services to be used in this component */
    constructor( private authService: AuthService,
                 private router: Router,
                 private reportService: ReportService,
                 private pzapService: ProvinceZoneAreaParishService ) {}


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

        if( this.isWEM ) {

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

        }


        /** Subscribe to event to refresh zone list */
        this.refreshZoneListSubscription = this.reportService.refreshReportList
            .subscribe(
                () => {
                    if ( this.isWEM || this.isProvincePastor ) {

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
        this.refreshAreaListSubscription = this.reportService.refreshReportList
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

                                    } else {
                                        this.areaList = [];
                                        this.responseMsg = response.json().message;
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
        this.refreshParishListSubscription = this.reportService.refreshReportList
            .subscribe(
                () => {

                    if( this.isWEM || this.isProvincePastor || this.isZonePastor || this.isAreaPastor ) {

                        this.pzapService.filterParish( this.getCurrentSelectedFilters() )
                            .subscribe(
                                ( response: Response ) => {
                                    this.responseStatus = response.json().status;

                                    if( response.json().status ) {
                                        this.parishList       = response.json().parishes;

                                        if ( this.parishList && this.parishList.length == 1 ) {
                                            this.selectionParish = this.parishList[0].id;
                                        }

                                    } else {
                                        this.parishList         = [];
                                        this.selectionProvince  = null;
                                        this.selectionZone      = null;
                                        this.responseMsg        = response.json().message;
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

                    }

                }
            );


        /** Subscribe to event to refresh payment list */
        this.refreshReportListSubscription = this.reportService.refreshReportList
            .subscribe(
                () => {

                    this.reportService.getReports( this.getCurrentSelectedFilters() )
                        .subscribe(
                            ( response: Response ) => {
                                if(response.json().status) {
                                    this.reportList = response.json().report;
                                } else {
                                    this.reportList = [];
                                }
                            },
                            ( error: Response ) => {
                                if ( error.status === 401 ) {
                                    this.authService.removeToken();
                                    this.router.navigate( [ '/login' ] );
                                }
                            }
                        );
                }
            );

        /** Emitting event which will refresh the payment list */
        this.reportService.refreshReportList.next({});

	}

    /** Function call when month selected */
    onSelectMonth( month: number ) {
        this.selectionMonth = month;
        this.reportService.refreshReportList.next();
    }

    /** Function call when year selected */
    onSelectYear( year: number ) {
        this.selectionYear = year;
        this.reportService.refreshReportList.next();
    }

    /** Function call to refresh payment list on select of province */
    onSelectProvince( provinceId: number ) {
        this.selectionProvince = provinceId;
        this.selectionZone = 0;
        this.selectionArea = 0;
        this.selectionParish = 0;

        this.reportService.refreshReportList.next();
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
        this.reportService.refreshReportList.next();
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
        this.reportService.refreshReportList.next();
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
        this.reportService.refreshReportList.next();
    }

    /** Function call on edit button click */
    onEdit( report: any ) {
        const report_id = report.id;
        this.router.navigate([ 'report/edit/', report_id ]);
    }

    /** Function call to reset filters */
    onResetFilters() {
        this.selectionMonth = 0;
        this.selectionYear = 0;
        this.selectionProvince = 0;
        this.selectionZone = 0;
        this.selectionArea = 0;
        this.selectionParish = 0;
        this.reportService.refreshReportList.next();
    }

    /** Function call to show delete prompt */
    showPrompt( obj: any ) {
        this.prompt = true;
        this.toDeleteReport = obj.id;
    }

    /** Function call to delete report */
    deletePrompt() {
        this.reportService.deleteReport( this.toDeleteReport)
            .subscribe(
                ( response: Response ) => {
                    if( response.json().status ) {
                        this.reportService.refreshReportList.next({});
                    }
                },
                ( error: Response) => {
                    if ( error.status === 401 ) {
                        this.authService.removeToken();
                        this.router.navigate( [ '/login' ] );
                    }
                },
                () => {
                    this.prompt = false;
                }
            );
    }

    /** Function call to hide delete prompt */
    hidePrompt() {
        this.prompt = false;
        this.toDeleteReport = undefined;
    }

    /** Function call to view Report */
    viewReport(report: any) {
        this.router.navigate( [ 'report/view/', report.id ] );
    }

    /** Function that returns current selected filters */
    getCurrentSelectedFilters() {
        return {
            report_year: this.selectionYear > 0 ? this.selectionYear : '',
            report_month: this.selectionMonth > 0 ? this.selectionMonth : '',
            province_id: this.selectionProvince > 0 ? this.selectionProvince : '',
            zone_id: this.selectionZone > 0 ? this.selectionZone : '',
            area_id: this.selectionArea > 0 ? this.selectionArea : '',
            parish_id: this.selectionParish > 0 ? this.selectionParish : ''
        }
    }
	
    /** Function to accept or reject the report */
	onAccept(report:any){
		this.reportService.acceptReport( report )
			.subscribe(
				( response: Response ) => {
					this.responseStatus = response.json().status;

					if ( response.json().status ) {
						this.responseStatus = true;
						this.reportService.refreshReportList.next({});
						this.responseMsg = response.json().message;
					} else {
						this.responseMsg = '';
					}
				},
				( error: Response ) => {
					if( error.status === 401) {
						this.authService.removeToken();
						this.router.navigate( ['/login'] );
					}

					this.responseStatus = false;
					this.responseReceived = true;
					this.responseMsg = error.json().error;
					setTimeout( () => {
						this.responseReceived = false;
					}, 3000 )
				},
				() => {
					this.responseReceived = true;
					setTimeout( () => {
						this.responseReceived = false;
					}, 3000 )
				}
			);
	}

    /** Un-subscribing from all custom made events when component is destroyed */
    ngOnDestroy() {
        this.refreshReportListSubscription.unsubscribe();
        this.refreshZoneListSubscription.unsubscribe();
        this.refreshAreaListSubscription.unsubscribe();
        this.refreshParishListSubscription.unsubscribe();
    }
}
