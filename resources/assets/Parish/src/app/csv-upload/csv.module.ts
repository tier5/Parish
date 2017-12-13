/** module to load component and route for show and edit profile **/

import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { FormsModule } from "@angular/forms";
import { CsvRoutingModule } from "./csv-routing.module";
import { CsvComponent } from "./csv/csv.component";
import { CsvService } from "./csv.service";


@NgModule({
	declarations: [ CsvComponent ],
	imports: [
		CommonModule,
		FormsModule,
		CsvRoutingModule
	],
	providers: [CsvService]
})

export class CsvModule { }