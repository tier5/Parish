/** Service created for show and update profile */

import { Headers, Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AuthService } from '../auth/auth.service';
import { environment } from '../../environments/environment.prod';

@Injectable()
export class ProfileService {
	
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
	
	
	/** Edit an existing profile */
	editProfile(body: { first_name: string, last_name: string } ): Observable<any> {
		const user_id = this.authService.getToken().user_id;
		const api_url = environment.API_URL + 'user/edit/' + user_id;
		return this.http.put( api_url, body , { headers: this.headers } );
	}
	
	/** Details of logged in profile */
	profileToEdit(): Observable<any> {
		
		const user_id = this.authService.getToken().user_id;
		return this.http.get( environment.API_URL + 'user/show-detail/' + user_id, { headers: this.headers } );
	}
	
	/** Call to reset password for logged in user */
	resetPassword(): Observable<any> {
		const user_id = this.authService.getToken().user_id;
		return this.http.get( environment.API_URL + 'user/password-reset/' + user_id, { headers: this.headers } );
	}

	/** Call to reset password for logged in user */
	resetUsername( body: any ): Observable<any> {
		const user_id   = this.authService.getToken().user_id;
		return this.http.post( environment.API_URL + 'user/username-reset/' + user_id , body, { headers: this.headers } );
	}
}