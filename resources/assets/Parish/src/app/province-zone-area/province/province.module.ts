import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { CreateProvinceComponent } from './create-province/create-province.component';
import { ListProvinceComponent } from './list-province/list-province.component';
import { ProvinceRoutingModule } from './province-routing.module';
import { ProvinceService } from './province.service';

@NgModule({
	declarations: [
		CreateProvinceComponent,
		ListProvinceComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		ProvinceRoutingModule
	],
	providers: [ ProvinceService ],
	exports: [],
})
export class ProvinceModule { }