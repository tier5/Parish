import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AuthService } from '../../auth/auth.service';
import { environment } from '../../../environments/environment.prod';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ProvinceService {
	
	/** Initializing custom Observables*/
	closePromptEvent = new Subject();
	deleteProvinceEvent = new Subject();
	refreshProvinceList = new Subject();
	
	/** Injecting services to be used in this component */
	constructor( private http: Http, 
				 private authService: AuthService) { }
	
	/** List all Province */
	listProvince(): Observable<any> {
		const user_id = this.authService.getToken().user_id;
		const header = new Headers( {
			'X-Requested-With': 'XMLHttpRequest',
			'Authorization': 'Bearer ' + this.authService.getToken().token
		} );
		return this.http.get( environment.API_URL + 'provinces/' + user_id, { headers: header } );
	}
	
	/** Fetch specific province data */
	fetchSpecificProvince( province_id: number): Observable<any> {
		const header = new Headers( {
			'X-Requested-With': 'XMLHttpRequest',
			'Authorization': 'Bearer ' + this.authService.getToken().token
		} );
		return this.http.get( environment.API_URL + 'provinces/showDetail/' + province_id, { headers: header } );
	}
	
	/** Create a new province */
	createProvince( body: { name: string, first_name: string, last_name: string } ): Observable<any> {
		const obj= {
			user_id: this.authService.getToken().user_id
		}
		const header = new Headers( {
			'X-Requested-With': 'XMLHttpRequest',
			'Authorization': 'Bearer '+ this.authService.getToken().token
		} );
		return this.http.post( environment.API_URL + 'provinces', Object.assign(body, obj), { headers: header } );
	}
	
	/** Create a new province */
	editProvince( province_id: number, pastor_id: number, body: { name: string, first_name: string, last_name: string } ): Observable<any> {
			const wem_id = this.authService.getToken().user_id;
			
		const header = new Headers( {
			'X-Requested-With': 'XMLHttpRequest',
			'Authorization': 'Bearer '+ this.authService.getToken().token
		} );
		const api_url = environment.API_URL + 'provinces/' + pastor_id + '/' + wem_id + '/' + province_id;
		return this.http.put( api_url, body , { headers: header } );
	}
	
	/** Delete an existing province */
	deleteProvince( province_id: number) : Observable<any> {
		const wem_id = this.authService.getToken().user_id;

		const header = new Headers( {
			'X-Requested-With': 'XMLHttpRequest',
			'Authorization': 'Bearer '+ this.authService.getToken().token
		} );
		const api_url = environment.API_URL + 'provinces/delete/' + wem_id + '/' + province_id;
		return this.http.delete( api_url, { headers: header } );
	}
	
}