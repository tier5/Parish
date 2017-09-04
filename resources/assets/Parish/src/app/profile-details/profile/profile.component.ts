/** Show and update logged in users profile */

import { Component } from "@angular/core";
import { NgForm } from '@angular/forms';
import {Response} from "@angular/http";

import{ AuthService } from "../../auth/auth.service";
import { ProfileService } from "../profile.service";
import {ActivatedRoute, Params, Router} from "@angular/router";


@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.css']
})
export class ProfileComponent{
	
	profileData = {
		id: 0,
		user_id: 0,
		first_name: '',
		last_name: '',
		uniqueKey: ''
	};
	
	responseReceived: boolean = false;
	responseMsg: string = '';
	responseStatus: boolean = false;
	showLoader: boolean = false;
	isAdmin: boolean = false;
	
	/** Injecting services to be used in this component */
	constructor( private profileService: ProfileService,
	             private authService: AuthService,
	             private router: Router,
	             private activatedRoute: ActivatedRoute
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
				console.log(error);
			},
			() => { }
		);
		
		/*this.profileService.profileToEdit()
			.subscribe(
				(response: Response) => {
					if ( response.json().status ) {
						this.profileData = response.json().userDetail;
					}
				}
			);*/
	}
	
	/** Function call when form is submitted */
	onSubmit(updateProfileForm: NgForm) {
		this.showLoader = true;
		this.profileService.editProfile(updateProfileForm.value )
			.subscribe(
				( response: Response ) => {
					this.showLoader = false;
					if ( response.json().status ) {
						this.responseStatus = true;
						this.responseMsg = response.json().message;
					} else {
						this.responseStatus = false;
						console.log( response );
						console.log( response.status );
					}
				},
				( error: Response ) => {
					if ( error.status === 401 ) {
						this.authService.removeToken();
					}
					console.log( error );
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
					if ( response.json().status ) {
						this.responseStatus = true;
						this.responseMsg = response.json().message;
						this.profileData.uniqueKey = response.json().password;
					} else {
						this.responseStatus = false;
						console.log( response );
						console.log( response.status );
					}
				},
				(error: Response) => {
					console.log(error);
				}
			);
	}
}