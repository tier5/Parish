import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { CreateProvinceComponent } from './create-province/create-province.component';
import { ListProvinceComponent } from './list-province/list-province.component';
import { EditProvinceZoneAreaComponent } from '../../shared/edit-province-zone-area/edit-province-zone-area.component';

const provinceRoutes: Routes = [
	{ path: 'create', component: CreateProvinceComponent, data: { editMode: false } },
	{ path: 'list', component: ListProvinceComponent },
	{ path: 'edit/:id', component: CreateProvinceComponent, data: { editMode: true } }
];
@NgModule({
	imports: [ RouterModule.forChild(provinceRoutes) ],
	exports: [ RouterModule ]
})
export class ProvinceRoutingModule { }