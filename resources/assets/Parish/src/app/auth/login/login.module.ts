import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';

import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
import { LoginService } from './login.service';

@NgModule( {
	imports: [
		CommonModule,
		FormsModule,
		HttpModule,
		LoginRoutingModule
	],
	declarations: [ LoginComponent ],
	providers: [ LoginService ]
} )
export class LoginModule { }
