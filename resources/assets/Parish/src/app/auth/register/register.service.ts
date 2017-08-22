import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../../environments/environment.prod';

@Injectable()
export class RegisterService {
	
	/** Service injection */
	constructor( private http: Http ) { }
	
	/** Function call for registration */
	register( body: { name: string, email: string, password: string, confirm_password: string } ): Observable<any> {
		const header = new Headers( { 'X-Requested-With': 'XMLHttpRequest' } );
		return this.http.post( environment.API_URL + 'sign-up', body, { headers: header } );
	}
	
}
