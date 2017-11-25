import { Component } from '@angular/core';
import { Response } from '@angular/http';

import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { environment } from "../../environments/environment.prod";

@Component( {
	selector: 'app-dashboard',
	templateUrl: './full-layout.component.html',
	styleUrls: [ './full-layout.component.scss' ]
} )
export class FullLayoutComponent {
	
	public toggleBarIcon: boolean = true;
	public showSidebar: boolean = true;
	paymentOption: boolean = false;
	superAdmin: boolean = false;
	paymentStatus: boolean = false;
	userInformation:{};
	base_url                        : string        = environment.base_url;
	
	constructor (
		private authService: AuthService,
		private router: Router
	) { }
	
	ngOnInit() {
		const user_type = this.authService.getToken().user_type;
		this.userInformation = this.authService.getToken();
		var parishStatus  = this.authService.getToken().payment_status;
		if(parishStatus!=1) {
			this.paymentStatus = true;
		}
		if(user_type != 1){
			this.showSidebar = false;
			if(user_type == 3){
				if(parishStatus !=1) {
					this.paymentOption 	= true;
				}
				
				this.superAdmin 	= false;
			} else if(user_type == 0){
				this.superAdmin = true;
			} else {
				this.superAdmin = false;
			}
		}
	}
	
	onLogout() {
		const data = this.authService.getToken();
		this.authService.logout( data.token ).subscribe(
			( response: Response ) => {
				localStorage.removeItem( 'loggedInUserData' );
			},
			( error: Response ) => {
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
