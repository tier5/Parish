/** Service created for show and update wem-list */

import { Headers, Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AuthService } from '../auth/auth.service';
import { environment } from '../../environments/environment.prod';
import { Subject } from "rxjs/Subject";

@Injectable()
export class WemService {

    /** Injecting services to be used in this component */
    constructor( private http: Http,
                 private authService: AuthService ) {
        if( this.authService.isAuthenticated() ) {
            this.refreshHeader();
        }
    }
	
	refreshList = new Subject();
    /** Initializing the different headers to be passed with each api call */

    headers = new Headers( {
        'X-Requested-With': 'XMLHttpRequest'
    } );

    /** Refreshing the header for authenticated users */
    refreshHeader() {
        this.headers.set('Authorization', 'Bearer ' + this.authService.getToken().token);
    }

    /** Get List of all WEM */
    listWEM(): Observable<any> {
        const user_id = this.authService.getToken().user_id;
        return this.http.get( environment.API_URL + 'user/wem-list/' + user_id, { headers: this.headers } );
    }

    /** Change status of WEM */
    changeStatus( body: any ) : Observable<any> {
        const super_admin_id = this.authService.getToken().user_id;
        const api_url = environment.API_URL + 'user/change-status/' + super_admin_id;
        return this.http.post( api_url, body, { headers: this.headers } );
    }
}