import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CreateProvinceComponent } from './create-province/create-province.component';
import { ListProvinceComponent } from './list-province/list-province.component';
import { ProvinceRoutingModule } from './province-routing.module';

@NgModule({
	declarations: [
		CreateProvinceComponent,
		ListProvinceComponent
	],
	imports: [
		CommonModule,
		ProvinceRoutingModule
	],
	providers: [],
	exports: [],
})
export class ProvinceModule { }