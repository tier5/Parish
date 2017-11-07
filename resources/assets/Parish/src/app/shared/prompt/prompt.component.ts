import { Component, Input } from '@angular/core';

import { ProvinceZoneAreaParishService } from '../../province-zone-area-parish/province-zone-area-parish.service';
import { PaymentService } from "../../payment-details/payment.service";

@Component({
	selector: 'app-prompt',
	templateUrl: './prompt.component.html',
	styleUrls: [ './prompt.component.css' ]
})
export class PromptComponent {
	
	@Input('calledFrom') calledFrom;
	@Input('itemInfo') itemInfo;
	
	constructor( private pzapService: ProvinceZoneAreaParishService,
	             private payservice: PaymentService) { }

	hidePrompt() {
		this.pzapService.closePromptEvent.next();
		this.payservice.closePromptEvent.next();
	}
	deletePrompt(){
		this.pzapService.deleteEvent.next( this.itemInfo.id );
		this.payservice.deleteEvent.next( this.itemInfo.id );
	}
}