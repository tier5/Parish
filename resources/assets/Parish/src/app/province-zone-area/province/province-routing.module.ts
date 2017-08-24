import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { CreateProvinceComponent } from './create-province/create-province.component';
import { ListProvinceComponent } from './list-province/list-province.component';

const provinceRoutes: Routes = [
	{ path: 'create', component: CreateProvinceComponent },
	{ path: 'list', component: ListProvinceComponent }
];
@NgModule({
	imports: [ RouterModule.forChild(provinceRoutes) ],
	exports: [ RouterModule ]
})
export class ProvinceRoutingModule { }