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
		const token = this.authService.getToken();
		this.authService.logout( token ).subscribe(
			( response: Response ) => {
				console.log( response.json().message );
				localStorage.removeItem( 'token' );
				localStorage.removeItem( 'user_type' )
			},
			( error: Response ) => {
				console.log( error );
				alert(error.json().error);
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
