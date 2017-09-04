/** module to load component and route for show and edit profile **/

import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { ProfileComponent } from "./profile/profile.component";
import {ProfileRoutingModule} from "./profile-routing.module";
import {FormsModule} from "@angular/forms";


@NgModule({
	declarations: [ ProfileComponent ],
	imports: [
		CommonModule,
		FormsModule,
		ProfileRoutingModule
	],
	providers: []
})

export class ProfileModule { }