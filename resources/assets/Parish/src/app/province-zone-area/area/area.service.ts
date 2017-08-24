import { Headers, Http } from '@angular/http';
import { Injectable } from '@angular/core';

import { AuthService } from '../../auth/auth.service';
import { environment } from '../../../environments/environment.prod';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AreaService {
	
	closePromptEvent = new Subject();
	deleteAreaEvent = new Subject();
	refreshAreaList = new Subject();
	
	constructor( private http: Http, private authService: AuthService ) { }
	
	/** Get List of all province on edit area page for dropdown */
	listProvince(): Observable<any> {
		const user_id = this.authService.getToken().user_id;
		const header = new Headers( {
			'X-Requested-With': 'XMLHttpRequest',
			'Authorization': 'Bearer ' + this.authService.getToken().token
		} );
		return this.http.get( environment.API_URL + 'provinces/' + user_id, { headers: header } );
	}
	
	/** Get List of all zones on edit area page for dropdown */
	listZone(province_id: number): Observable<any> {
		const user_id = this.authService.getToken().user_id;
		const header = new Headers( {
			'X-Requested-With': 'XMLHttpRequest',
			'Authorization': 'Bearer ' + this.authService.getToken().token
		} );
		return this.http.get( environment.API_URL + 'zones/' + user_id  + '/' + province_id , { headers: header } );
	}
	
	/** Get List of all area on list area page */
	listArea(): Observable<any> {
		const user_id = this.authService.getToken().user_id;
		const header = new Headers( {
			'X-Requested-With': 'XMLHttpRequest',
			'Authorization': 'Bearer ' + this.authService.getToken().token
		} );
		return this.http.get( environment.API_URL + 'areas/' + user_id, { headers: header } );
	}
	
	/** Fetch specific province data */
	// fetchSpecificZone( area_id: number): Observable<any> {
	// 	const header = new Headers( {
	// 		'X-Requested-With': 'XMLHttpRequest',
	// 		'Authorization': 'Bearer ' + this.authService.getToken().token
	// 	} );
	// 	return this.http.get( environment.API_URL + 'zones/showDetail/zone/' + area_id, { headers: header } );
	// }
	
	/** Fetch specific area data */
	fetchSpecificArea( area_id: number): Observable<any> {
		const header = new Headers( {
			'X-Requested-With': 'XMLHttpRequest',
			'Authorization': 'Bearer ' + this.authService.getToken().token
		} );
		return this.http.get( environment.API_URL + 'areas/showDetail/area/' + area_id, { headers: header } );
	}
	
	/** Function call for registration */
	createArea( body: { name: string, first_name: string, last_name: string } ): Observable<any> {
		const obj= {
			user_id: this.authService.getToken().user_id
		}
		const header = new Headers( {
			'X-Requested-With': 'XMLHttpRequest',
			'Authorization': 'Bearer '+ this.authService.getToken().token
		} );
		return this.http.post( environment.API_URL + 'areas', Object.assign(body, obj), { headers: header } );
	}
	
	/** Create a new province */
	editArea( area_id: number, pastor_id: number, body: { name: string, first_name: string, last_name: string } ): Observable<any> {
		const wem_id = this.authService.getToken().user_id;
		
		const header = new Headers( {
			'X-Requested-With': 'XMLHttpRequest',
			'Authorization': 'Bearer '+ this.authService.getToken().token
		} );
		const api_url = environment.API_URL + 'areas/' + pastor_id + '/' + wem_id + '/' + area_id;
		return this.http.put( api_url, body , { headers: header } );
	}
	
	/** Delete an existing province */
	deleteArea( area_id: number) : Observable<any> {
		const wem_id = this.authService.getToken().user_id;
		
		const header = new Headers( {
			'X-Requested-With': 'XMLHttpRequest',
			'Authorization': 'Bearer '+ this.authService.getToken().token
		} );
		const api_url = environment.API_URL + 'areas/delete/' + wem_id + '/' + area_id;
		return this.http.delete( api_url, { headers: header } );
	}
	
	/** Function call for registration */
	filterArea( body: { provience_id: number, zone_id: number } ): Observable<any> {
		const header = new Headers( {
			'X-Requested-With': 'XMLHttpRequest',
			'Authorization': 'Bearer '+ this.authService.getToken().token
		} );
		return this.http.post( environment.API_URL + 'areas/filterArea', body, { headers: header } );
	}
}