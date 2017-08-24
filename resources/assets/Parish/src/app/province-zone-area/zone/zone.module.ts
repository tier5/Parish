import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CreateZoneComponent } from './create-zone/create-zone.component';
import { ListZoneComponent } from './list-zone/list-zone.component';
import { ZoneRoutingModule } from './zone-routing.module';

@NgModule({
	declarations: [
		CreateZoneComponent,
		ListZoneComponent
	],
	imports: [
		CommonModule,
		ZoneRoutingModule
	],
	providers: [],
	exports: [],
})
export class ZoneModule { }