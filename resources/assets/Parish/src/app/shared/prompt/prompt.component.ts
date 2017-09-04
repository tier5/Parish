import { Component, Input } from '@angular/core';

import { ProvinceZoneAreaParishService } from '../../province-zone-area-parish/province-zone-area-parish.service';

@Component({
	selector: 'app-prompt',
	templateUrl: './prompt.component.html',
	styleUrls: [ './prompt.component.css' ]
})
export class PromptComponent {
	
	@Input('calledFrom') calledFrom;
	@Input('itemInfo') itemInfo;
	
	constructor( private pzapService: ProvinceZoneAreaParishService ) { }

	hidePrompt() {
		this.pzapService.closePromptEvent.next();
	}
	deletePrompt(){
		this.pzapService.deleteEvent.next( this.itemInfo.id );
	}
}