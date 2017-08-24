import { Injectable } from '@angular/core';
// import { Subject } from 'rxjs/Subject';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment.prod';

@Injectable()
export class AuthService {
	
	// loggedIn = new Subject();
	
	constructor( private http: Http) { }
	
	logout(token: string): Observable<any> {
		const header = new Headers({
			'X-Requested-With': 'XMLHttpRequest',
			'Authorization': 'Bearer '+ token
		});
		return this.http.post( environment.API_URL + 'sign-out', '', {headers: header} );
	}
	
	getToken() {
		const data = localStorage.getItem('loggedInUserData');
		return JSON.parse(data);
	}
	
	removeToken() {
		localStorage.removeItem('loggedInUserData');
	}
	
	isAuthenticated() {
		const data = this.getToken();
		if ( data && (data.token !== null) ) {
			return true;
		} else {
			return false;
		}
	}
	
}