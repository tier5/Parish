import { AuthService } from '../auth/auth.service';
import { Headers, Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../environments/environment.prod';

@Injectable()
export class ReportService {
	
	/** Injecting services to be used in this component */
	constructor( private http: Http,
	             private authService: AuthService ) {
		if( this.authService.isAuthenticated() ) {
			this.refreshHeader();
		}
	}
	
	
	/** Initializing custom Observables */
	
	
	/** Initializing the different headers to be passed with each api call */
	headers = new Headers( {
		'X-Requested-With': 'XMLHttpRequest'
	} );
	
	/** Refreshing the header for authenticated users */
	refreshHeader() {
		this.headers.set('Authorization', 'Bearer ' + this.authService.getToken().token);
	}
	
	
	/** Function to create a new province */
	getReportBP( body: { month: number, year: number } ): Observable<any> {
		const obj = {
			user_id: this.authService.getToken().user_id
		};
		return this.http.post( environment.API_URL + 'province/create', Object.assign( body, obj ), { headers: this.headers } );
	}
}