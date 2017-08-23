import { Headers, Http  } from '@angular/http';
import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment.prod';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LoginService {
	
	/** Service injection */
	constructor( private http: Http ) { }
	
	/** Function call for logging in*/
	login( body: { username: string, password: string } ): Observable<any> {
		const header = new Headers( { 'X-Requested-With': 'XMLHttpRequest' } );
		return this.http.post( environment.API_URL + 'sign-in', body, { headers: header } );
	}
	
}
