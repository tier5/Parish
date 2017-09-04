import { Component } from '@angular/core';
import { Response } from '@angular/http';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { LoginService } from './login.service';
import {AuthService} from "../auth.service";
import {ProvinceZoneAreaParishService} from "../../province-zone-area-parish/province-zone-area-parish.service";
import {ProfileService} from "../../profile-details/profile.service";

@Component( {
	selector: 'login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
} )
export class LoginComponent {
	
	/** Variable declarations */
	responseReceived = false; // Track is some response has been recieved or not
	loginRequestStatus = false; // Track response of login request
	showLoader = false; // Track if loader should be shown or not
	loginRequestResponseMsg: string; // Store success or error message from backend depending on response
	
	/** Service injection */
	constructor( private pzapService: ProvinceZoneAreaParishService,
				 private loginService: LoginService,
	             private router: Router,
	             private profileService: ProfileService) { }
	
	/** Function call on submit */
	onSubmit( formSignIn: NgForm ) {
		this.showLoader = true;
		const body = {
			username: formSignIn.value.username,
			password: formSignIn.value.password
		};
		this.loginService.login( body )
		.subscribe(
			( response: Response ) => {
				
				this.showLoader = false;
				if(response.json().status){
					localStorage.setItem( 'loggedInUserData', JSON.stringify(response.json()) );
					this.loginRequestStatus = true;
					this.loginRequestResponseMsg = response.json().message;
					this.pzapService.refreshHeader();
					this.profileService.refreshHeader();
				} else {
					this.loginRequestStatus = false;
					this.loginRequestResponseMsg = response.json().error;
				}
				
			},
			( error: Response ) => {
				console.log( error );
				this.loginRequestStatus = false;
				this.loginRequestResponseMsg = error.json().error;
				this.showLoader = false;
				this.responseReceived = true;
				setTimeout( () => {
					this.responseReceived = false;
				}, 5000)
			},
			() => {
				
				formSignIn.reset();
				this.router.navigate( [ '/dashboard' ] );
			}
		);
	}
	
	/** Function call to reset form */
	onReset( formSignIn: NgForm ) {
		formSignIn.reset();
	}
	
	/** Function call to navigate to registration page */
	onNavigate() {
		this.router.navigate(['/register']);
	}
	
}
