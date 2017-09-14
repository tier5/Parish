import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CreateReportComponent } from './create-report/create-report.component';
import { ListReportComponent } from './list-report/list-report.component';
import { ReportService } from './report.service';
import { ReportRoutingModule } from './report-routing.module';

@NgModule({
	declarations: [
		CreateReportComponent,
		ListReportComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		ReportRoutingModule
	],
	providers: [ ReportService ]
})
export class ReportModule { }