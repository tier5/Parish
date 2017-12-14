/** Service created for show and update profile */

import { Headers, Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AuthService } from '../auth/auth.service';
import { environment } from '../../environments/environment.prod';

@Injectable()
export class CsvService {
	
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
	

	/** Call to upload CSV */
	uploadCsv( body: any ): Observable<any> {
		const headers = this.headers;
		headers.delete('Content-Type');
		var user_id = this.authService.getToken().user_id;
		return this.http.post( environment.API_URL + 'user/upload-csv/' + user_id, body, { headers: this.headers } );
	}
}