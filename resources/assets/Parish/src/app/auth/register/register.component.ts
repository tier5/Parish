import { Component } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Response } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from "rxjs/Observable";

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
    planList: any;

    stripe: any;
    elements: any;
    style: any;
    card: any;
    planId: number = 1;
    planSelected: boolean = false;

	/** Service injection */
	constructor( private registerService: RegisterService,
		         private router: Router,
		         private formBuilder: FormBuilder ) { }
	
	/** Function to be executed when component initializes */
	ngOnInit() {

        this.stripe = Stripe('pk_test_SIRpnt5y8OAGeLprrzbQKrKd');
        this.elements = this.stripe.elements();

        // Custom styling can be passed to options when creating an Element.
        this.style = {
            base: {
                // Add your base input styles here. For example:
                fontSize: '16px',
                lineHeight: '24px',
            },
        };

        // Create an instance of the card Element
        this.card = this.elements.create('card', {style: this.style});

        // Add an instance of the card Element into the `card-element` <div>
        this.card.mount('#card-element');

        this.card.addEventListener('change', ({error}) => {
            const displayError = document.getElementById('card-errors');
            if (error) {
                displayError.textContent = error.message;
            } else {
                displayError.textContent = '';
            }
        });

        /** Function to get plan list */
        this.registerService.listPlans()
            .subscribe(
                ( response: Response ) => {
                    if(response.json().status) {
                        this.planList = response.json().plans;
                    }
                },
                ( error: Response ) => {
                    console.log(error.json());
                }
            );

        /** Form Initialization */
		this.formRegister = this.formBuilder.group( {
			'first_name' : new FormControl( null, Validators.required ),
			'last_name' : new FormControl( null, Validators.required ),
			'email' : new FormControl( null, [ Validators.required, Validators.email ], this.validateEmail.bind(this) ),
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
	};

	/** Function to validate email*/
	validateEmail( control: FormControl ): Promise<any> | Observable<any> {
        const promise = new Promise<any>( (resolve, reject) => {
            this.registerService.validateEmail({ email: control.value })
                .subscribe(
                    (response: Response) => {
                        if( response.json().status ){
                            resolve(null);
                        } else {
                            resolve( { emailTaken: true } );
                        }
                    }
                );
        } );
	    return promise;
    }

	/** Function call on submit */
	onSubmit() {
        const body = this.formRegister.value;

        this.stripe.createToken(this.card).then((result) => {
            if (result.error) {

                // Inform the user if there was an error
                var errorElement = document.getElementById('card-errors');
                errorElement.textContent = result.error.message;

            } else {

                // Send the token to your server
                this.userRegisterRequested = true;
                this.registerService.register( { ...body, token: result.token, planId: this.planId } )
                .subscribe(
                	( response: Response ) => {
                		if(response.json().status){
                			this.userRegisterStatus = true;
                			this.card.clear();
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
        });

	}

	/** Function to choose subscription*/
	onSelectSubscription(id: number) {
	    this.planId = id;
	    this.planSelected = true;
    }

    /** Function to undo subscription*/
    onUndoSubscription() {
        this.planId = 0;
        this.planSelected = false;
        this.formRegister.reset();
        this.card.clear();
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
