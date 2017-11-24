import { Headers, Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { AuthService } from '../auth/auth.service';
import { environment } from '../../environments/environment.prod';

@Injectable()
export class DashboardService {

  /** Injecting services to be used in this component */
  constructor( private http: Http,
               private authService: AuthService ) {
    if( this.authService.isAuthenticated() ) {
      this.refreshHeader();
    }
  }

  /** Initializing custom Observables */
  refreshList = new Subject();


  /** Initializing the different headers to be passed with each api call */
  headers = new Headers( {
    'X-Requested-With': 'XMLHttpRequest'
  } );

  /** Refreshing the header for authenticated users */
  refreshHeader() {
    this.headers.set('Authorization', 'Bearer ' + this.authService.getToken().token);
  }

  /** Fetch dashboard data for the graph */
  getChartData(): Observable<any> {
    const user_id = this.authService.getToken().user_id;
    return this.http.get( environment.API_URL + 'parish/dashboard/' + user_id, { headers: this.headers } );
  }

}
