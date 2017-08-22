import { NgModule } from '@angular/core';
import { HttpModule } from "@angular/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { LoginComponent } from "./login.component";
import { LoginRoutingModule } from "./login-routing.module";
import { LoginService } from "./login.service";

@NgModule({
  imports: [
    LoginRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  declarations: [ LoginComponent],
  providers: [ LoginService ]
})
export class LoginModule { }
