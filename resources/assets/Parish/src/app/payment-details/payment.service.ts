/** Service created for upload payment */

import {Headers, Http, RequestOptions} from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AuthService } from '../auth/auth.service';
import { environment } from '../../environments/environment.prod';

@Injectable()
export class PaymentService {
	
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
	
	/** Function to create a new province */
	paymentCreate( body: any): Observable<any> {
		const headers = this.headers;
		headers.delete('Content-Type');
		return this.http.post( environment.API_URL + 'payment/upload-payment', body, { headers: this.headers } );
	}
	
}