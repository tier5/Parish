import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { CreateZoneComponent } from './create-zone/create-zone.component';
import { ListZoneComponent } from './list-zone/list-zone.component';
import { ZoneRoutingModule } from './zone-routing.module';
import { SharedModule } from '../../shared/shared.module';

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
	providers: [],
	exports: [],
})
export class ZoneModule { }