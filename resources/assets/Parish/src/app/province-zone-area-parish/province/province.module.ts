import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { CreateProvinceComponent } from './create-province/create-province.component';
import { ListProvinceComponent } from './list-province/list-province.component';
import { ProvinceRoutingModule } from './province-routing.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
	declarations: [
		CreateProvinceComponent,
		ListProvinceComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		ProvinceRoutingModule,
		SharedModule
	],
	providers: [],
	exports: [],
})
export class ProvinceModule { }