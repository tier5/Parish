import { Http, Headers } from "@angular/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";

import { environment } from "../../../environments/environment.prod";

@Injectable()
export class ForgotPasswordService {


  /** Service injection */
  constructor( private http: Http ) { }

  /** Function call for logging in*/
  resetPassword( body: { email: string } ): Observable<any> {
      const header = new Headers( { 'X-Requested-With': 'XMLHttpRequest' } );
      return this.http.post( environment.API_URL + 'forgot-password', body, { headers: header } );
  }

}
