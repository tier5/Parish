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
		console.log('Bearer '+ this.getToken());
		const header = new Headers({
			'X-Requested-With': 'XMLHttpRequest',
			'Authorization': 'Bearer '+ this.getToken()
		});
		return this.http.post( environment.API_URL + 'sign-out', '', {headers: header} );
	}
	
	getToken() {
		return localStorage.getItem('token');
	}
	
	isAuthenticated() {
		if (this.getToken() !== null) {
			return true;
		} else {
			return false;
		}
	}
	
}