import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Response } from '@angular/http';
import { Component } from '@angular/core';

import { LoginService } from './login.service';

@Component( {
	selector: 'login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
} )
export class LoginComponent {
	
	constructor( private loginService: LoginService, private router: Router ) { }
	
	onSubmit( formSignIn: NgForm ) {
		const body = {
			email: formSignIn.value.email,
			password: formSignIn.value.password
		};
		this.loginService.login( body )
		.subscribe(
			( response: Response ) => {
				localStorage.setItem( 'token', response.json().token );
				alert( response.json().message );
			},
			( error: Response ) => console.log( error ),
			() => {
				// this.loginService.loggedIn.next();
				formSignIn.reset();
				this.router.navigate( [ '/dashboard' ] );
			}
		);
	}
	
	onReset( formSignIn: NgForm ) {
		formSignIn.reset();
	}
	
	onNavigate() {
		this.router.navigate(['/register']);
	}
	
}
