import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AuthService } from '../../auth/auth.service';
import { environment } from '../../../environments/environment.prod';

@Injectable()
export class ProvinceService {
	
	constructor( private http: Http, private authService: AuthService) { }
	
	/** Function call for registration */
	createProvince( body: { name: string, first_name: string, last_name: string } ): Observable<any> {
		const header = new Headers( {
			'X-Requested-With': 'XMLHttpRequest',
			'Authorization': 'Bearer '+ this.authService.getToken()
		} );
		return this.http.post( environment.API_URL + 'proviences', body, { headers: header } );
	}
}