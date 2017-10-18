import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { NgModule } from '@angular/core';

import { RegisterComponent } from "./register.component";
import { RegisterRoutingModule } from "./register-routing.module";
import { RegisterService } from "./register.service";
import { SubscriptionModule } from "../../subscription/subscription.module";

@NgModule({
  imports: [
  	CommonModule,
    RegisterRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    SubscriptionModule
  ],
  declarations: [ RegisterComponent],
  providers: [ RegisterService ]
})
export class RegisterModule { }
