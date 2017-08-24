import { Component, Input } from '@angular/core';
import { ProvinceService } from '../../province-zone-area/province/province.service';
import { ZoneService } from '../../province-zone-area/zone/zone.service';
import { AreaService } from '../../province-zone-area/area/area.service';

@Component({
	selector: 'app-prompt',
	templateUrl: './prompt.component.html',
	styleUrls: [ './prompt.component.css' ]
})
export class PromptComponent {
	
	@Input('calledFrom') calledFrom;
	@Input('itemInfo') itemInfo;
	
	constructor( private provinceService: ProvinceService,
	             private zoneService: ZoneService,
				 private areaService: AreaService ) { }

	hidePrompt() {
		if( this.calledFrom=='Province' ){
			this.provinceService.closePromptEvent.next();
		} else if ( this.calledFrom=='Zone' ) {
			this.zoneService.closePromptEvent.next();
		} else if ( this.calledFrom=='Area' ) {
			this.areaService.closePromptEvent.next();
		}
		
	}
	deletePrompt(){
		if( this.calledFrom=='Province' ){
			this.provinceService.deleteProvinceEvent.next( this.itemInfo.id );
		} else if ( this.calledFrom=='Zone' ) {
			this.zoneService.deleteZoneEvent.next( this.itemInfo.id );
		} else if ( this.calledFrom=='Area' ) {
			this.areaService.deleteAreaEvent.next( this.itemInfo.id );
		}
	}
}