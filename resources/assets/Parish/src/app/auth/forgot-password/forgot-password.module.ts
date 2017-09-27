import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { NgModule } from '@angular/core';

import { ForgotPasswordComponent } from './forgot-password.component';
import { ForgotPasswordService } from "./forgot-password.service";
import { ForgotPasswordRoutingModule } from "./forgot-password-routing.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ForgotPasswordRoutingModule
    ],
    declarations: [ ForgotPasswordComponent ],
    providers: [ ForgotPasswordService ]
})
export class ForgotPasswordModule { }
