import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";
import { environment } from "../../environments/environment.prod";
import { AuthService } from "../auth/auth.service";

@Injectable()
export class SubscriptionService {

    userId: string;

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


    processPayment(token: any, amount: number) {
        const payment = { token, amount };
        return this.http.post( environment.API_URL + 'report/all-report', payment, { headers: this.headers } );
    }
}
