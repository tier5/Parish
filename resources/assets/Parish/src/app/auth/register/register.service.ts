import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../../environments/environment.prod';

@Injectable()
export class RegisterService {
	
	/** Service injection */
	constructor( private http: Http ) { }

    /** Function call for registration */
	register( body: any ): Observable<any> {
		const header = new Headers( { 'X-Requested-With': 'XMLHttpRequest' } );
		return this.http.post( environment.API_URL + 'sign-up', body, { headers: header } );
	}

    /** Function to validate requested email */
    validateEmail(body: { email: string }): Observable<any> {
        const header = new Headers( { 'X-Requested-With': 'XMLHttpRequest' } );
        return this.http.post( environment.API_URL + 'validate-email', body, {headers: header} );
    }

    /** Function to list plans */
    listPlans(): Observable<any> {
        const header = new Headers( { 'X-Requested-With': 'XMLHttpRequest' } );
        return this.http.get( environment.API_URL + 'list-plan', {headers: header} );
    }
	
}
