import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { CreateZoneComponent } from './create-zone/create-zone.component';
import { ListZoneComponent } from './list-zone/list-zone.component';
import { ZoneRoutingModule } from './zone-routing.module';
import { ZoneService } from './zone.service';
import { SharedModule } from '../../shared/shared.module';
import { ProvinceService } from '../province/province.service';
import { AreaService } from '../area/area.service';

@NgModule({
	declarations: [
		CreateZoneComponent,
		ListZoneComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		ZoneRoutingModule,
		SharedModule
	],
	providers: [
		AreaService,
		ProvinceService,
		ZoneService
	],
	exports: [],
})
export class ZoneModule { }