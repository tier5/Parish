/** module to load component and route for show and edit profile **/

import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { FormsModule } from "@angular/forms";
import { CsvRoutingModule } from "./csv-routing.module";
import { CsvComponent } from "./csv/csv.component";
import { FileUploadModule } from "ng2-file-upload";
import { SharedModule } from "../shared/shared.module";


@NgModule({
	declarations: [ CsvComponent ],
	imports: [
		CommonModule,
		FormsModule,
		CsvRoutingModule,
		FileUploadModule,
		SharedModule
	],
	providers: []
})

export class CsvModule { }