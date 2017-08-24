import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { AuthService } from '../../auth/auth.service';
import { environment } from '../../../environments/environment.prod';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ZoneService {
	
	closePromptEvent = new Subject();
	deleteZoneEvent = new Subject();
	refreshZoneList = new Subject();
	
	constructor( private http: Http, private authService: AuthService ) { }
	
	/** Get List of all province on edit zone page */
	listProvince(): Observable<any> {
		const user_id = this.authService.getToken().user_id;
		const header = new Headers( {
			'X-Requested-With': 'XMLHttpRequest',
			'Authorization': 'Bearer ' + this.authService.getToken().token
		} );
		return this.http.get( environment.API_URL + 'provinces/' + user_id, { headers: header } );
	}
	
	/** Get List of all zones on list zone page */
	listZone(): Observable<any> {
		const user_id = this.authService.getToken().user_id;
		const header = new Headers( {
			'X-Requested-With': 'XMLHttpRequest',
			'Authorization': 'Bearer ' + this.authService.getToken().token
		} );
		return this.http.get( environment.API_URL + 'zones/' + user_id, { headers: header } );
	}
	
	/** Fetch specific province data */
	fetchSpecificZone( zone_id: number): Observable<any> {
		const header = new Headers( {
			'X-Requested-With': 'XMLHttpRequest',
			'Authorization': 'Bearer ' + this.authService.getToken().token
		} );
		return this.http.get( environment.API_URL + 'zones/showDetail/zone/' + zone_id, { headers: header } );
	}
	
	/** Function call for registration */
	createZone( body: { name: string, first_name: string, last_name: string } ): Observable<any> {
		const obj= {
			user_id: this.authService.getToken().user_id
		}
		const header = new Headers( {
			'X-Requested-With': 'XMLHttpRequest',
			'Authorization': 'Bearer '+ this.authService.getToken().token
		} );
		return this.http.post( environment.API_URL + 'zones', Object.assign(body, obj), { headers: header } );
	}
	
	/** Create a new province */
	editZone( zone_id: number, pastor_id: number, body: { name: string, first_name: string, last_name: string } ): Observable<any> {
		const wem_id = this.authService.getToken().user_id;
		
		const header = new Headers( {
			'X-Requested-With': 'XMLHttpRequest',
			'Authorization': 'Bearer '+ this.authService.getToken().token
		} );
		const api_url = environment.API_URL + 'zones/' + pastor_id + '/' + wem_id + '/' + zone_id;
		return this.http.put( api_url, body , { headers: header } );
	}
	
	/** Delete an existing province */
	deleteZone( province_id: number) : Observable<any> {
		const wem_id = this.authService.getToken().user_id;
		
		const header = new Headers( {
			'X-Requested-With': 'XMLHttpRequest',
			'Authorization': 'Bearer '+ this.authService.getToken().token
		} );
		const api_url = environment.API_URL + 'zones/delete/' + wem_id + '/' + province_id;
		return this.http.delete( api_url, { headers: header } );
	}
	
	/** Function call for registration */
	filterByProvince( body: { provience_id: number } ): Observable<any> {
		const header = new Headers( {
			'X-Requested-With': 'XMLHttpRequest',
			'Authorization': 'Bearer '+ this.authService.getToken().token
		} );
		return this.http.post( environment.API_URL + 'zones/filterZone', body, { headers: header } );
	}
}