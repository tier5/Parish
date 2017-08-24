import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { CreateProvinceComponent } from './create-province/create-province.component';
import { ListProvinceComponent } from './list-province/list-province.component';
import { ProvinceRoutingModule } from './province-routing.module';
import { ProvinceService } from './province.service';
import { SharedModule } from '../../shared/shared.module';
import { ZoneService } from '../zone/zone.service';
import { AreaService } from '../area/area.service';

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
	providers: [
		AreaService,
		ZoneService,
		ProvinceService
	],
	exports: [],
})
export class ProvinceModule { }