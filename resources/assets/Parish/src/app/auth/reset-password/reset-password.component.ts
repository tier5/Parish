import { ActivatedRoute, Params, Router } from "@angular/router";
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Component } from '@angular/core';
import { Response } from "@angular/http";

import { ResetPasswordService } from "./reset-password.service";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {

    /** Variable declarations */
    formRP: FormGroup;
    responseReceived = false;
    rpStatus = false;
    rpRequested = false;
    rpMsg: string;
    redirect: boolean = false;
    clock: number = 10;
    paramData = {
        email: '',
        token: ''
    };

    /** Service injection */
    constructor( private activatedRoute: ActivatedRoute,
                 private resetPasswordService: ResetPasswordService,
                 private router: Router,
                 private formBuilder: FormBuilder ) { }

    /** Function to be executed when component initializes */
    ngOnInit() {
        this.formRP = this.formBuilder.group( {
            'password' : new FormControl( null, Validators.required ),
            'confirm_password' : new FormControl( null, Validators.required )
        }, {validator: this.confirmPassword} );
        /** Checking route params to get id of area to edit */
        this.activatedRoute.params.subscribe(
            (params: Params) => {
                this.paramData.email = params['email'];
                this.paramData.token = params['token'];
            },
            (error: Response) => {
                console.log(error);
            },
        );
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
        this.rpRequested = true;
        const body = this.formRP.value;

        this.resetPasswordService.resetPassword( Object.assign( body, this.paramData ) )
            .subscribe(
                ( response: Response ) => {
                    if(response.json().status){
                        this.rpStatus = true;
                        this.rpMsg = response.json().message;
                        this.rpRequested = false;
                    } else {
                        this.rpStatus = false;
                        this.rpMsg = response.json().error;
                        this.rpRequested = false;
                    }
                },
                ( error: Response ) => {
                    this.rpStatus = false;
                    this.rpMsg = error.json().error;
                    this.responseReceived = true;
                    this.rpRequested = false;
                    setTimeout( () => {
                        this.responseReceived = false;
                    }, 3000)
                },
                () => {
                    this.formRP.reset();
                    this.responseReceived = true;
                    this.rpRequested = false;
                    setTimeout( () => {
                        this.responseReceived = false;
                    }, 3000);
                    /** Redirecting to login page */
                    this.redirect = true;
                    setInterval(() => {
                        if(this.clock-- == 1){
                            this.router.navigate(['/login']);
                        }
                    }, 1000);
                }
            );
    }

    /** Function call to reset form */
    onReset() {
        this.formRP.reset();
    }

    /** Function call to navigate to login page */
    onNavigate() {
        this.router.navigate(['/login']);
    }

}