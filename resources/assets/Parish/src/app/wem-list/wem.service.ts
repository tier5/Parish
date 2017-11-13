/** Service created for show and update wem-list */

import { Headers, Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AuthService } from '../auth/auth.service';
import { environment } from '../../environments/environment.prod';

@Injectable()
export class WemService {

    /** Injecting services to be used in this component */
    constructor( private http: Http,
                 private authService: AuthService ) {
        if( this.authService.isAuthenticated() ) {
            this.refreshHeader();
        }
    }


    /** Initializing the different headers to be passed with each api call */

    headers = new Headers( {
        'X-Requested-With': 'XMLHttpRequest'
    } );

    /** Refreshing the header for authenticated users */
    refreshHeader() {
        this.headers.set('Authorization', 'Bearer ' + this.authService.getToken().token);
    }
}