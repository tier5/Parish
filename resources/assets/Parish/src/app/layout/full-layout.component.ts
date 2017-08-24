import { Component } from '@angular/core';
import { Response } from '@angular/http';

import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component( {
	selector: 'app-dashboard',
	templateUrl: './full-layout.component.html',
	styleUrls: [ './full-layout.component.scss' ]
} )
export class FullLayoutComponent {
	
	public toggleBarIcon: boolean = true;
	
	constructor (
		private authService: AuthService,
		private router: Router
	) { }
	
	onLogout() {
		const data = this.authService.getToken();
		this.authService.logout( data.token ).subscribe(
			( response: Response ) => {
				localStorage.removeItem( 'loggedInUserData' );
			},
			( error: Response ) => {
				console.log( error );
				if( error.status === 401) {
					this.authService.removeToken();
					this.router.navigate( ['/login'] );
				}
			},
			() => {
				this.router.navigate( [ '/login' ] );
			}
		);
	}

	toggle(): void {
		let self = this;
		setTimeout( () => {
			self.toggleBarIcon = !self.toggleBarIcon;
		}, 500 );
	}
	
}
