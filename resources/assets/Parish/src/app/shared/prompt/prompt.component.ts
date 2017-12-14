import { Component, Input } from '@angular/core';

import { ProvinceZoneAreaParishService } from '../../province-zone-area-parish/province-zone-area-parish.service';
import { PaymentService } from "../../payment-details/payment.service";
import { CsvService } from "../../csv-upload/csv.service";

@Component({
	selector: 'app-prompt',
	templateUrl: './prompt.component.html',
	styleUrls: [ './prompt.component.css' ]
})
export class PromptComponent {
	
	@Input('calledFrom') calledFrom;
	@Input('itemInfo') itemInfo;
	@Input('itemText') itemText;
	
	constructor( private pzapService: ProvinceZoneAreaParishService,
	             private payservice: PaymentService,
	             private csvservice: CsvService) { }

	hidePrompt() {
		this.pzapService.closePromptEvent.next();
		this.payservice.closePromptEvent.next();
		this.csvservice.closePromptEvent.next();
	}
	deletePrompt(){
		this.pzapService.deleteEvent.next( this.itemInfo.id );
		this.payservice.deleteEvent.next( this.itemInfo.id );
	}
	
	proceedPrompt(){
		this.csvservice.showPromptEvent.next(this.itemInfo);
	}
}