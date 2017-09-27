import { Component } from '@angular/core';
import { ForgotPasswordService } from "./forgot-password.service";
import { NgForm } from "@angular/forms";
import { Response } from "@angular/http";
import { Router } from "@angular/router";

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {

    constructor( private forgotPasswordService: ForgotPasswordService,
                 private router: Router ) { }

    /** Variable declarations */
    clock: number = 10;
    redirect: boolean = false;
    responseReceived = false; // Track is some response has been recieved or not
    fpStatus = false; // Track response of login request
    showLoader = false; // Track if loader should be shown or not
    fpResponseMsg: string; // Store success or error message from backend depending on response

    /** Function call on submit */
    onSubmit(formForgotPassword: NgForm) {
        this.showLoader = true;
        const body = {
            email: formForgotPassword.value.email
        };
        this.forgotPasswordService.resetPassword( body )
            .subscribe(
                (response: Response) => {
                    this.showLoader = false;
                    this.responseReceived = true;
                    if (response.json().status) {
                        this.fpStatus = true;
                        this.fpResponseMsg = response.json().message;
                    } else {
                        this.fpStatus = false;
                        this.fpResponseMsg = response.json().error;
                    }

                },
                (error: Response) => {
                    console.log(error);
                    this.fpStatus = false;
                    this.fpResponseMsg = error.json().error;
                    this.showLoader = false;
                    this.responseReceived = true;
                    setTimeout(() => {
                        this.responseReceived = false;
                    }, 3000)
                },
                () => {

                    formForgotPassword.reset();
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
    onReset(formForgotPassword: NgForm) {
        formForgotPassword.reset();
    }

    /** Function call to navigate to registration page */
    onNavigate() {
        this.router.navigate(['/login']);
    }


}
