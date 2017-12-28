import { Component } from '@angular/core';
import { Response } from '@angular/http';

import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { environment } from "../../environments/environment.prod";

import { ProvinceZoneAreaParishService } from '../province-zone-area-parish/province-zone-area-parish.service';

@Component( {
	selector: 'app-dashboard',
	templateUrl: './full-layout.component.html',
	styleUrls: [ './full-layout.component.scss' ]
} )
export class FullLayoutComponent {
	
	public toggleBarIcon: boolean = true;
	public showSidebar: boolean = true;
	paymentOption: boolean = false;
	createReport: boolean = false;
	parishStatus: number = 0;
	superAdmin: boolean = false;
	paymentStatus: boolean = false;
	userInformation:{};
	base_url                        : string        = environment.base_url;
	
	constructor (
		private authService: AuthService,
		private router: Router,
		private pzapService: ProvinceZoneAreaParishService,
	) { }
	
	ngOnInit() {
		
		const user_type = this.authService.getToken().user_type;
		this.userInformation = this.authService.getToken();
	
		/* user type: 0 => super admin , user type : 1 => WEM, user type: 2 => pastor(province, zone or area), user type: 3 => Parish */
		
		if(user_type != 1){
			this.showSidebar = false;
			if(user_type == 3){
				this.createReport = true;
				this.pzapService.getParish()
					.subscribe(
						(response: Response) => {
							if (response.json().status) {
								this.parishStatus = response.json().parish.payment_status;
								if (this.parishStatus == 1) {
									this.paymentOption = true;
								} else {
									this.paymentOption = true;
									this.paymentStatus = true;

								}
							}
						},
						(error: Response) => {
							if (error.status === 401) {
								this.authService.removeToken();
								this.router.navigate(['/login']);
							}
							
						}
					);
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
