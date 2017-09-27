import { Injectable } from '@angular/core';
import { Http,Headers } from "@angular/http";
import { Observable } from "rxjs/Observable";

import { environment } from "../../../environments/environment.prod";

@Injectable()
export class ResetPasswordService {

    /** Service injection */
    constructor( private http: Http ) { }

    /** Function call for resetting password */
    resetPassword( body: { email: string } ): Observable<any> {
        const header = new Headers( { 'X-Requested-With': 'XMLHttpRequest' } );
        return this.http.post( environment.API_URL + 'reset-password', body, { headers: header } );
    }

}
