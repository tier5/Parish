import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { CreateZoneComponent } from './create-zone/create-zone.component';
import { ListZoneComponent } from './list-zone/list-zone.component';

const provinceRoutes: Routes = [
	{ path: 'create', component: CreateZoneComponent },
	{ path: 'list', component: ListZoneComponent }
];
@NgModule({
	imports: [ RouterModule.forChild(provinceRoutes) ],
	exports: [ RouterModule ]
})
export class ZoneRoutingModule { }