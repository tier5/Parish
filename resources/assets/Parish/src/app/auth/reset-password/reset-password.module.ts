import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ResetPasswordComponent } from './reset-password.component';
import { ResetPasswordService } from "./reset-password.service";
import { ReactiveFormsModule } from "@angular/forms";
import { ResetPasswordRoutingModule } from "./reset-password-routing.module";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ResetPasswordRoutingModule
  ],
  declarations: [ ResetPasswordComponent ],
  providers: [ ResetPasswordService ]
})
export class ResetPasswordModule { }
