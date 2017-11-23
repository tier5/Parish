import { Headers, Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { AuthService } from '../auth/auth.service';
import { environment } from '../../environments/environment.prod';

@Injectable()
export class ProvinceZoneAreaParishService {
	
	/** Injecting services to be used in this component */
	constructor( private http: Http,
	             private authService: AuthService ) {
		if( this.authService.isAuthenticated() ) {
			this.refreshHeader();
		}
	}
	
	             
	/** Initializing custom Observables */
	closePromptEvent = new Subject();
	deleteEvent = new Subject();
	refreshList = new Subject();
	
	/** Initializing the different headers to be passed with each api call */
	headers = new Headers( {
		'X-Requested-With': 'XMLHttpRequest'
	} );
	
	/** Refreshing the header for authenticated users */
	refreshHeader() {
		this.headers.set('Authorization', 'Bearer ' + this.authService.getToken().token);
	}

	
	/** Function to create a new province */
	createProvince( body: { name: string, first_name: string, last_name: string } ): Observable<any> {
		const obj = {
			user_id: this.authService.getToken().user_id
		};
		return this.http.post( environment.API_URL + 'province/create', Object.assign( body, obj ), { headers: this.headers } );
	}
	
	
	/** Function to create a new zone */
	createZone( body: { province_id: number, name: string, first_name: string, last_name: string } ): Observable<any> {
		const obj= {
			user_id: this.authService.getToken().user_id
		};
		return this.http.post( environment.API_URL + 'zone/create', Object.assign( body, obj ), { headers: this.headers } );
	}
	
	
	/** Function to create a new area */
	createArea( body: { province_id: number, zone_id: number, name: string, first_name: string, last_name: string } ): Observable<any> {
		const obj = {
			user_id: this.authService.getToken().user_id
		};
		return this.http.post( environment.API_URL + 'area/create', Object.assign(body, obj), { headers: this.headers } );
	}
	
	/** Function to create a new parish */
	createParish( body: { province_id: number, zone_id: number, area_id: number, name: string, first_name: string, last_name: string } ): Observable<any> {
		const obj= {
			user_id: this.authService.getToken().user_id
		};
		return this.http.post( environment.API_URL + 'parish/create', Object.assign(body, obj), { headers: this.headers } );
	}
	
	
	/** Fetch specific province data to edit */
	provinceToEdit( province_id: number ): Observable<any> {
		return this.http.get( environment.API_URL + 'province/show-detail/' + province_id, { headers: this.headers } );
	}
	
	
	/** Fetch specific zone data to edit */
	zoneToEdit( zone_id: number): Observable<any> {
		return this.http.get( environment.API_URL + 'zone/show-detail/' + zone_id, { headers: this.headers } );
	}
	
	
	/** Fetch specific area data to edit */
	areaToEdit( area_id: number): Observable<any> {
		return this.http.get( environment.API_URL + 'area/show-detail/' + area_id, { headers: this.headers } );
	}
	
	/** Fetch specific parish data to edit */
	parishToEdit( parish_id: number): Observable<any> {
		return this.http.get( environment.API_URL + 'parish/show-detail/' + parish_id, { headers: this.headers } );
	}
	
	/** Edit an existing province */
	editProvince( province_id: number, pastor_id: number, body: { name: string, first_name: string, last_name: string } ): Observable<any> {
		const wem_id = this.authService.getToken().user_id;
		const api_url = environment.API_URL + 'province/edit/' + pastor_id + '/' + wem_id + '/' + province_id;
		return this.http.put( api_url, body , { headers: this.headers } );
	}
	
	
	/** Edit an existing zone */
	editZone( zone_id: number, pastor_id: number, body: { name: string, first_name: string, last_name: string } ): Observable<any> {
		const wem_id = this.authService.getToken().user_id;
		const api_url = environment.API_URL + 'zone/edit/' + pastor_id + '/' + wem_id + '/' + zone_id;
		return this.http.put( api_url, body , { headers: this.headers } );
	}
	
	
	/** Edit an existing area */
	editArea( area_id: number, pastor_id: number, body: { name: string, first_name: string, last_name: string } ): Observable<any> {
		const wem_id = this.authService.getToken().user_id;
		const api_url = environment.API_URL + 'area/edit/' + pastor_id + '/' + wem_id + '/' + area_id;
		return this.http.put( api_url, body , { headers: this.headers } );
	}
	/** Edit an existing parish */
	editParish( parish_id: number, pastor_id: number, body: any ): Observable<any> {
		const wem_id = this.authService.getToken().user_id;
		const api_url = environment.API_URL + 'parish/edit/' + pastor_id + '/' + wem_id + '/' + parish_id;
		return this.http.put( api_url, body , { headers: this.headers } );
	}

	/** Get List of all province for drop-down */
	listProvince(): Observable<any> {
		const user_id = this.authService.getToken().user_id;
		return this.http.get( environment.API_URL + 'province/' + user_id, { headers: this.headers } );
	}
	
	
	/** Function call for filtering zone based on different parameters i.e. province_id */
	filterZone( body: any ): Observable<any> {
		const obj = {
			user_id: this.authService.getToken().user_id
		};
		return this.http.post( environment.API_URL + 'zone/filter-zone', Object.assign( body, obj ), { headers: this.headers } );
	}
	
	
	/** Function call for filtering area based on different parameters i.e. province_id, zone_id */
	filterArea( body: any ): Observable<any> {
		const obj = {
			user_id: this.authService.getToken().user_id
		};
		return this.http.post( environment.API_URL + 'area/filter-area', Object.assign( body, obj ), { headers: this.headers } );
	}
	
	
	/** Function call for filtering parish based on different parameters i.e. province_id, zone_id, area_id  */
	filterParish( body: any ): Observable<any> {
		const obj = {
			user_id: this.authService.getToken().user_id
		};
		return this.http.post( environment.API_URL + 'parish/filter-parish', Object.assign( body, obj ), { headers: this.headers } );
	}
	
	
	/** Function to delete an existing province */
	deleteProvince( province_id: number) : Observable<any> {
		const wem_id = this.authService.getToken().user_id;
		const api_url = environment.API_URL + 'province/delete/' + wem_id + '/' + province_id;
		return this.http.delete( api_url, { headers: this.headers } );
	}
	
	
	/** Function to delete an existing zone */
	deleteZone( zone_id: number) : Observable<any> {
		const wem_id = this.authService.getToken().user_id;
		const api_url = environment.API_URL + 'zone/delete/' + wem_id + '/' + zone_id;
		return this.http.delete( api_url, { headers: this.headers } );
	}
	
	
	/** Function to delete an existing area */
	deleteArea( area_id: number) : Observable<any> {
		const wem_id = this.authService.getToken().user_id;
		const api_url = environment.API_URL + 'area/delete/' + wem_id + '/' + area_id;
		return this.http.delete( api_url, { headers: this.headers } );
	}
	
	/** Delete an existing parish */
	deleteParish( parish_id: number) : Observable<any> {
		const wem_id = this.authService.getToken().user_id;
		const api_url = environment.API_URL + 'parish/delete/' + parish_id;
		return this.http.delete( api_url, { headers: this.headers } );
	}

	/**Add due date for the current month */
	addDueDate(body: any ): Observable<any> {
		const obj = {
			user_id: this.authService.getToken().user_id
		};
		const user_id = this.authService.getToken().user_id;
		return this.http.post( environment.API_URL + 'parish/add-duedate/'+ user_id, Object.assign( body, obj ), { headers: this.headers } );
	}

	/**Add due date for the current month */
	updatePenalty(body: any ): Observable<any> {
		const obj = {
			user_id: this.authService.getToken().user_id
		};
		const user_id = this.authService.getToken().user_id;
		return this.http.post( environment.API_URL + 'parish/update-penalty/'+ user_id, Object.assign( body, obj ), { headers: this.headers } );
	}
	
}