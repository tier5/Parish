import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { EditProvinceZoneAreaComponent } from './edit-province-zone-area/edit-province-zone-area.component';
import { PromptComponent } from './prompt/prompt.component';
import { FormsModule } from "@angular/forms";
import { DpDatePickerModule } from 'ng2-date-picker';


@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		DpDatePickerModule,
	],
	declarations: [
		PromptComponent,
		EditProvinceZoneAreaComponent
	],
	exports: [
		PromptComponent,
		EditProvinceZoneAreaComponent
	]
})
export class SharedModule { }