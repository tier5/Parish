import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment.prod';

@Injectable()
export class LoginService {
	
	constructor( private http: Http ) { }
	
	login( body: { email: string, password: string } ): Observable<any> {
		const header = new Headers( { 'X-Requested-With': 'XMLHttpRequest' } );
		return this.http.post( environment.API_URL + 'api/sign-in', body, { headers: header } );
	}
	
	
}
