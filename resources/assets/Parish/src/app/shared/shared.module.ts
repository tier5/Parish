import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { EditProvinceZoneAreaComponent } from './edit-province-zone-area/edit-province-zone-area.component';
import { PromptComponent } from './prompt/prompt.component';

@NgModule({
	imports: [ CommonModule ],
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