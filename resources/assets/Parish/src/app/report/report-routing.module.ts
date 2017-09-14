import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateReportComponent } from './create-report/create-report.component';
import { ListReportComponent } from './list-report/list-report.component';

const reportRoutes: Routes = [
	{ path: 'create', component: CreateReportComponent },
	{ path: 'list', component: ListReportComponent }
];

@NgModule({
	imports: [ RouterModule.forChild( reportRoutes ) ],
	exports: [ RouterModule ]
})
export class ReportRoutingModule { }