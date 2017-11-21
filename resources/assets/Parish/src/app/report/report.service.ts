import { AuthService } from '../auth/auth.service';
import { Headers, Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { environment } from '../../environments/environment.prod';

@Injectable()
export class ReportService {
	
	/** Initializing custom Observables */
	generateReport = new Subject();
	refreshReportList = new Subject();
	
	
	/** Injecting services to be used in this component */
	constructor( private http: Http,
	             private authService: AuthService ) {
		if( this.authService.isAuthenticated() ) {
			this.refreshHeader();
		}
	}
	
	
	/** Initializing the different headers to be passed with each api call */
	headers = new Headers( {
		'X-Requested-With': 'XMLHttpRequest'
	} );
	
	/** Refreshing the header for authenticated users */
	refreshHeader() {
		this.headers.set('Authorization', 'Bearer ' + this.authService.getToken().token);
	}
	
	
	/** Function to get a new report blueprint */
	getReportBP( body: { report_month: number, report_year: number } ): Observable<any> {
		const obj = {
			user_id: this.authService.getToken().user_id
		};
		return this.http.post( environment.API_URL + 'report/all-report', Object.assign( body, obj ), { headers: this.headers } );
	}
	
	/** Function to send a new report */
	sendReport( body: any ): Observable<any> {
		const obj = {
			user_id: this.authService.getToken().user_id
		};
		return this.http.post( environment.API_URL + 'report/create', Object.assign( body, obj ), { headers: this.headers } );
	}

    /** Function to send a new report */
    viewReport( report_id: number ): Observable<any> {
        const obj = {
            user_id: this.authService.getToken().user_id
        };
        return this.http.get( environment.API_URL + 'report/view-report/' + report_id, { headers: this.headers } );
    }

    /** Function to get list of all reports */
    getReports( body: any ): Observable<any> {
		const user_id = this.authService.getToken().user_id;
		const user_type = this.authService.getToken().user_type;

        return this.http.post( environment.API_URL + 'report/filter-report/' + user_id + '/' + user_type, body, { headers: this.headers } );
    }

    /** Function to get detail of single report */
    fetchReport( body: any ): Observable<any> {
        return this.http.post( environment.API_URL + 'report/fetch-report', body, { headers: this.headers } );
    }

	
	/** Function to get view of specific report */
	reportToEdit( report_id: number ): Observable<any> {
		return this.http.get( environment.API_URL + 'report/view-report/' + report_id, { headers: this.headers } );
	}
	
	/** Function to edit a report */
	updateReport( body: any, id: number ): Observable<any> {
		const obj = {
			user_id: this.authService.getToken().user_id
		};
		return this.http.put( environment.API_URL + 'report/update-report/' + id, Object.assign( body, obj ), { headers: this.headers } );
	}

    /** Delete an existing report */
    deleteReport( report_id: number) : Observable<any> {
        const api_url = environment.API_URL + 'report/delete/' + report_id;
        return this.http.delete( api_url, { headers: this.headers } );
    }
	
	/** Accept or reject an existing report */
	acceptReport( body: any ) : Observable<any> {
		const obj = {
			user_id: this.authService.getToken().user_id
		};
		const api_url = environment.API_URL + 'report/accept-report/'+body.id ;
		return this.http.put( api_url, Object.assign( body, obj ), { headers: this.headers } );
	}

}