import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { CreateAreaComponent } from './create-area/create-area.component';
import { ListAreaComponent } from './list-area/list-area.component';
import { AreaRoutingModule } from './area-routing.module';
import { AreaService } from './area.service';
import { ProvinceService } from '../province/province.service';
import { ZoneService } from '../zone/zone.service';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
	declarations: [
		CreateAreaComponent,
		ListAreaComponent
	],
	imports: [
		AreaRoutingModule,
		CommonModule,
		FormsModule,
		SharedModule
	],
	providers: [
		AreaService,
		ProvinceService,
		ZoneService
	],
	exports: [],
})
export class AreaModule { }