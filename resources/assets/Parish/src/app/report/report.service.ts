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

}