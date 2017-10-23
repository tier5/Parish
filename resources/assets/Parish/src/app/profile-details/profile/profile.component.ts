/** Show and update logged in users profile */

import { Component } from "@angular/core";
import { NgForm } from '@angular/forms';
import {Response} from "@angular/http";

import { AuthService } from "../../auth/auth.service";
import { ProfileService } from "../profile.service";
import {ActivatedRoute, Params, Router} from "@angular/router";


@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.css']
})

export class ProfileComponent{
	
	profileData = {
		
		id          : 0,
		user_id     : 0,
		last_name   : '',
		uniqueKey   : '',
		first_name  : '',
		parish_id   : ''
	};
	
	responseReceived    : boolean = false;
	responseStatus      : boolean = false;
	activateReset       : boolean = true;
	responseMsg         : string  = '';
	
	showLoader          : boolean = false;
	isAdmin             : boolean = false;
	
	/** Injecting services to be used in this component */
	constructor( private profileService: ProfileService,
	             private activatedRoute: ActivatedRoute,
	             private authService: AuthService,
	             private router: Router
	) { }
	
	ngOnInit() {
		/** checking for admin */
		const user_type = this.authService.getToken().user_type;
		if(user_type ==1){
			this.isAdmin = true;
		}
		
		this.activatedRoute.params.subscribe(
			(params: Params) => {
				this.profileService.profileToEdit()
					.subscribe(
						(response: Response) => {
							this.profileData = response.json().userDetail;
						}
					);
			},
			(error: Response) => {
				if( error.status === 401) {
					this.authService.removeToken();
					this.router.navigate( ['/login'] );
				}
				this.responseStatus = false;
				this.responseMsg = error.json().error;
			},
			() => { }
		);
	}
	
	/** Function call when form is submitted */
	onSubmit(updateProfileForm: NgForm) {
		this.showLoader = true;
		this.profileService.editProfile(updateProfileForm.value )
			.subscribe(
				( response: Response ) => {
					this.showLoader     = false;
					this.responseStatus = response.json().status;
					
					if ( response.json().status ) {
						this.responseStatus = true;
						this.responseMsg = response.json().message;
					} else {
						this.responseMsg = '';
					}
				},
				( error: Response ) => {
					if( error.status === 401) {
						this.authService.removeToken();
						this.router.navigate( ['/login'] );
					}
					
					this.showLoader = false;
					this.responseStatus = false;
					this.responseReceived = true;
					this.responseMsg = error.json().error;
					setTimeout( () => {
						this.responseReceived = false;
					}, 3000 )
				},
				() => {
					this.responseReceived = true;
					setTimeout( () => {
						this.responseReceived = false;
					}, 3000 )
				}
			);
	}
	
	/** Function call to reset form */
	onReset(updateProfileForm: NgForm) {
		
		this.profileService.profileToEdit()
			.subscribe(
				(response: Response) => {
					updateProfileForm.form.patchValue({
						first_name: this.profileData.first_name,
						last_name: this.profileData.last_name,
					});
				}
			);
	}
	
	/** Function call to reset password */
	onResetPassword(){
		this.profileService.resetPassword()
			.subscribe(
				(response: Response) => {
					this.responseStatus = response.json().status;
					if ( response.json().status ) {
						this.responseMsg = response.json().message;
						this.profileData.uniqueKey = response.json().password;
					} else {
						this.responseMsg = '';
					}
				},
				(error: Response) => {
					if ( error.status === 401 ) {
						this.authService.removeToken();
						this.router.navigate( [ '/login' ] );
					}
					this.responseStatus = false;
					this.responseMsg = error.json().error;
				}
			);
	}

	/** Function call to reset username */
	onResetUsername(updateProfileForm){
		this.activateReset  = false;
		const formData      = new FormData();
		formData.append("username",updateProfileForm.value.parish_id);

		this.profileService.resetUsername(formData)
			.subscribe(
				(response: Response) => {
					this.responseStatus = response.json().status;
					if ( response.json().status ) {
						this.activateReset  	= true;
						this.responseMsg 		= response.json().message;
						this.responseReceived 	= true;
					} else {
						this.responseMsg 	= '';
						this.activateReset 	=  true;
					}
				},
				(error: Response) => {
					if ( error.status === 401 ) {
						this.authService.removeToken();
						this.router.navigate( [ '/login' ] );
					}
					this.activateReset  = true;
					this.responseStatus = false;
					this.responseMsg 	= error.json().error;
				}
			);
	}
}