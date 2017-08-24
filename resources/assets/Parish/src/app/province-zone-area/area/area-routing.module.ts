import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { CreateAreaComponent } from './create-area/create-area.component';
import { ListAreaComponent } from './list-area/list-area.component';

const provinceRoutes: Routes = [
	{ path: 'create', component: CreateAreaComponent },
	{ path: 'list', component: ListAreaComponent }
];
@NgModule({
	imports: [ RouterModule.forChild(provinceRoutes) ],
	exports: [ RouterModule ]
})
export class AreaRoutingModule { }