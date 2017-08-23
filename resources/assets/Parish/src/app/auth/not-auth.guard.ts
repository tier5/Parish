import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AuthService } from './auth.service';

@Injectable()
export class NotAuthGuard implements CanActivate {
	
	constructor( private authService: AuthService, private router: Router ) { }
	
	canActivate( next: ActivatedRouteSnapshot,
	             state: RouterStateSnapshot ): Observable<boolean> | Promise<boolean> | boolean {
		if ( this.authService.isAuthenticated() ) {
			this.router.navigate( [ '/dashboard' ] );
			return false;
		} else {
			return true;
		}
	}
}