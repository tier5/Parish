import { Component } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Response } from '@angular/http';
import { Router } from '@angular/router';

import { RegisterService } from './register.service';

@Component( {
	selector: 'register',
	templateUrl: './register.component.html',
	styleUrls: [ './register.component.css' ]
} )
export class RegisterComponent {
	
	/** Variable declarations */
	formRegister: FormGroup;
	responseReceived = false;
	userRegisterStatus = false;
	userRegisterRequested = false;
	userRegisteredMsg: string;
	
	/** Service injection */
	constructor(
		private registerService: RegisterService,
		private router: Router,
		private formBuilder: FormBuilder
	) { }
	
	/** Function to be executed when component initializes */
	ngOnInit() {
		this.formRegister = this.formBuilder.group( {
			'first_name' : new FormControl( null, Validators.required ),
			'last_name' : new FormControl( null, Validators.required ),
			'email' : new FormControl( null, [ Validators.required, Validators.email ] ),
			'password' : new FormControl( null, Validators.required ),
			'confirm_password' : new FormControl( null, Validators.required )
		}, {validator: this.confirmPassword} );
	}
	
	/** Custom confirm password validator */
	confirmPassword = (control: AbstractControl): {[key: string]: boolean} => {
		
		const pass = control.get('password');
		const cnfPass = control.get('confirm_password');
		
		if (!pass || !cnfPass) {
			return null;
		}

		if (pass.value === cnfPass.value){
			return null
		} else{
			control.get('confirm_password').setErrors( { confirmPassword: true } );
			return { confirmPassword: true };
		}
	}
	
	/** Function call on submit */
	onSubmit() {
		this.userRegisterRequested = true;
		const body = this.formRegister.value;
		this.registerService.register( body )
		.subscribe(
			( response: Response ) => {
				if(response.json().status){
					this.userRegisterStatus = true;
					this.userRegisteredMsg = response.json().message;
					this.userRegisterRequested = false;
				} else {
					this.userRegisterStatus = false;
					this.userRegisteredMsg = response.json().error;
					this.userRegisterRequested = false;
				}
			},
			( error: Response ) => {
				this.userRegisterStatus = false;
				this.userRegisteredMsg = error.json().error;
				this.responseReceived = true;
				this.userRegisterRequested = false;
				setTimeout( () => {
					this.responseReceived = false;
				}, 5000)
			},
			() => {
				this.formRegister.reset();
				this.responseReceived = true;
				this.userRegisterRequested = false;
				setTimeout( () => {
					this.responseReceived = false;
				}, 5000)
			}
		);
	}
	
	/** Function call to reset form */
	onReset() {
		this.formRegister.reset();
	}
	
	/** Function call to navigate to login page */
	onNavigate() {
		this.router.navigate(['/login']);
	}
	
}
