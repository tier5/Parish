import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateReportComponent } from './create-report/create-report.component';
import { ListReportComponent } from './list-report/list-report.component';

const reportRoutes: Routes = [
	{ path: 'create', component: CreateReportComponent,  data: { editMode: false, viewMode: false } },
	{ path: 'list', component: ListReportComponent },
    { path: 'edit/:id', component: CreateReportComponent,  data: { editMode: true, viewMode: false } },
	{ path: 'view/:id', component: CreateReportComponent,  data: { editMode: false, viewMode: true  } }
];

@NgModule({
	imports: [ RouterModule.forChild( reportRoutes ) ],
	exports: [ RouterModule ]
})
export class ReportRoutingModule { }