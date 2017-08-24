import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CreateAreaComponent } from './create-area/create-area.component';
import { ListAreaComponent } from './list-area/list-area.component';
import { AreaRoutingModule } from './area-routing.module';

@NgModule({
	declarations: [
		CreateAreaComponent,
		ListAreaComponent
	],
	imports: [
		AreaRoutingModule,
		CommonModule
	],
	providers: [],
	exports: [],
})
export class AreaModule { }