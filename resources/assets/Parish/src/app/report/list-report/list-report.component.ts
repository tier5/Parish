import { Component, OnDestroy, OnInit } from '@angular/core';
import { isNullOrUndefined } from "util";
import { Response } from "@angular/http";
import { Router } from "@angular/router";
import { Subscription } from "rxjs/Subscription";

import { AuthService } from "../../auth/auth.service";
import { ProvinceZoneAreaParishService } from "../../province-zone-area-parish/province-zone-area-parish.service";
import { ReportService } from "../report.service";
import {ParishListModel} from "../../province-zone-area-parish/parish/parish-list.model";

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
    selectionYear: number;
    selectionMonth: number;
    months = Array();
    parishIdList: ParishListModel[];
    prompt: boolean = false;
    toDeleteReport: number;
    showParishIdList: boolean = false;
    refreshReportListSubscription: Subscription;
    parishId: number;

    /** Injecting services to be used in this component */
    constructor( private authService: AuthService,
                 private router: Router,
                 private reportService: ReportService,
                 private pzapService: ProvinceZoneAreaParishService ) {}


	ngOnInit() {

        if(this.authService.getToken().user_type === 1){
            this.showParishIdList = true;
        } else {
            this.showParishIdList = false;
        }

        this.pzapService.filterParish({})
            .subscribe(
                ( response: Response ) => {
                    if( response.json().status) {
                        this.parishIdList = response.json().parishes;
                    } else {
                        console.log(response.json());
                    }
                },
                ( error: Response ) => {
                    if ( error.status === 401 ) {
                        this.authService.removeToken();
                        this.router.navigate( [ '/login' ] );
                    }
                }
            );

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

	    /** Subscribing to refreshReportList Event */
        this.refreshReportListSubscription = this.reportService.refreshReportList
            .subscribe(
                ( data: any ) => {
                    let obj = {
                        report_year: isNullOrUndefined(data.report_year) ? '': data.report_year,
                        report_month: isNullOrUndefined(data.report_month) ? '': data.report_month,
                        parish_id:isNullOrUndefined(data.parish_id) ? '': data.parish_id
                    };

                    this.reportService.getReports( obj )
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
        this.reportService.refreshReportList.next({});

        /** Populating the year array */
	    for( let i = 2010; i <= this.currentYear; i++ ) {
	        this.currentYearList.push( i );
        }

	}

	/** Function call when year selected */
	onSelectYear( year: number ) {
        this.selectionYear = year;
        this.reportService.refreshReportList.next( { report_year: this.selectionYear, report_month: this.selectionMonth, parish_id:this.parishId } );
    }

    /** Function call when month selected */
    onSelectMonth( month: number ) {
        this.selectionMonth = month;
        this.reportService.refreshReportList.next( { report_year: this.selectionYear, report_month: this.selectionMonth, parish_id:this.parishId } );
    }

    /** Function call when month selected */
    onSelectParish( parish: number ) {
        this.parishId = parish;
        this.reportService.refreshReportList.next( { report_year: this.selectionYear, report_month: this.selectionMonth, parish_id:this.parishId } );
    }

    /** Function call on edit button click */
    onEdit( report: any ) {
        const report_id = report.id;
        this.router.navigate([ 'report/edit/', report_id ]);
    }

    /** Function call to reset filters */
    onResetFilters() {
        this.reportService.refreshReportList.next({});
        this.selectionMonth = 0;
        this.selectionYear = 0;
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
        console.log(report);
    }

    /** Un-subscribing from all custom made events when component is destroyed */
    ngOnDestroy() {
        this.refreshReportListSubscription.unsubscribe();
    }
}
