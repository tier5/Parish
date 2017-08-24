import { Component, OnDestroy, OnInit } from '@angular/core';
import { AreaListModel } from '../../area-list.model';
import { Router } from '@angular/router';
import { AreaService } from '../area.service';
import { Response } from '@angular/http';
import { Subscription } from 'rxjs/Subscription';
import { ProvinceListModel } from '../../province-list.model';
import { ZoneListModel } from '../../zone-list.model';

@Component({
	selector: 'app-list-area',
	templateUrl: './list-area.component.html',
	styleUrls: [ './list-area.component.css' ]
})
export class ListAreaComponent implements OnInit, OnDestroy{
	
	provinceList: ProvinceListModel[];
	zoneList: ZoneListModel[];
	areaList: AreaListModel[];
	responseMsg: string = '';
	responseNoRecord: string = '';
	responseStatus: boolean = false;
	responseReceived: boolean = false;
	showDeletePrompt: boolean = false;
	toDeleteArea: AreaListModel;
	provinceSelected: boolean = false;
	zoneSelected: boolean = false;
	refreshAreaListSubscription: Subscription;
	closePromptEventSubscription: Subscription;
	deleteAreaEventSubscription: Subscription;
	provID: number;
	
	constructor( private router: Router,
	             private areaService: AreaService ) { }
	
	ngOnInit() {
		this.refreshAreaListSubscription = this.areaService.refreshAreaList
		.subscribe(
			() => {
				this.areaService.listArea().subscribe(
					(response: Response) => {
						if( response.json().status ) {
							this.responseStatus = true;
							this.areaList = response.json().areas;
							this.responseNoRecord = response.json().noData;
						} else {
							this.responseStatus = false;
							this.areaList = [];
							this.responseMsg = response.json().message;
							this.responseNoRecord = response.json().noData;
						}
					},
					(error: Response) => {
						this.responseStatus = false;
						this.responseReceived = true;
						this.areaList = [];
						this.responseMsg = error.json().error;
					}
				);
			}
		);
		this.areaService.refreshAreaList.next();
		
		this.closePromptEventSubscription = this.areaService.closePromptEvent
		.subscribe(
			() => {
				this.showDeletePrompt = false;
			}
		);
		this.deleteAreaEventSubscription = this.areaService.deleteAreaEvent
		.subscribe(
			(id: number) => {
				this.showDeletePrompt = false;
				this.areaService.deleteArea( id ).subscribe(
					(response: Response) => {
						this.responseReceived = true;
						if( response.json().status ) {
							this.responseStatus = true;
							this.responseMsg = response.json().message;
							this.areaService.refreshAreaList.next();
						} else {
							this.responseStatus = false;
							this.areaList = [];
							this.responseMsg = response.json().message;
						}
						setTimeout( () => {
							this.responseReceived = false;
						}, 3000 )
					},
					(error: Response) => {
						this.responseStatus = false;
						this.responseReceived = true;
						this.areaList = [];
						this.responseMsg = error.json().error;
						setTimeout( () => {
							this.responseReceived = false;
						}, 3000 )
					}
				);
			}
		);
		
		this.areaService.listProvince()
		.subscribe(
			(response: Response) => {
				if( response.json().status ) {
					this.responseStatus = true;
					this.provinceList = response.json().provinces;
				} else {
					this.responseStatus = false;
					this.provinceList = [];
					this.responseMsg = response.json().message;
				}
			},
			(error: Response) => {
				this.responseStatus = false;
				this.responseReceived = true;
				this.provinceList = [];
				this.responseMsg = error.json().error;
			}
		);
	}
	
	onEdit(obj: AreaListModel) {
		const area_id = obj.id;
		this.router.navigate([ 'area/edit/', area_id ]);
	}
	
	showPrompt(obj: AreaListModel) {
		this.showDeletePrompt = true;
		this.toDeleteArea = obj;
	}
	
	onSelectProvince(id: number) {
		this.provinceSelected = true;
		this.zoneSelected = false;
		this.provID = id;
		this.areaService.filterArea({ provience_id: id, zone_id: null })
		.subscribe(
			(response: Response) => {
				if( response.json().status ) {
					this.responseStatus = true;
					this.areaList = response.json().areas;
					this.responseNoRecord = response.json().noData;
				} else {
					this.responseStatus = false;
					this.areaList = [];
					this.responseMsg = response.json().message;
					this.responseNoRecord = response.json().noData;
				}
			},
			(error: Response) => {
				this.responseStatus = false;
				this.responseReceived = true;
				this.areaList = [];
				this.responseMsg = error.json().error;
			}
		);

		this.areaService.listZone(id)
		.subscribe(
			(response: Response) => {
				if( response.json().status ) {
					this.responseStatus = true;
					this.zoneList = response.json().zones;
				} else {
					this.responseStatus = false;
					this.zoneList = [];
					this.responseMsg = response.json().message;
				}
			},
			(error: Response) => {
				this.responseStatus = false;
				this.responseReceived = true;
				this.zoneList = [];
				this.responseMsg = error.json().error;
			}
		);
	}
	
	onSelectZone(id: number) {
		this.zoneSelected = true;
		this.areaService.filterArea({ provience_id: this.provID, zone_id: id })
		.subscribe(
			(response: Response) => {
				if( response.json().status ) {
					this.responseStatus = true;
					this.areaList = response.json().areas;
					this.responseNoRecord = response.json().noData;
				} else {
					this.responseStatus = false;
					this.areaList = [];
					this.responseMsg = response.json().message;
					this.responseNoRecord = response.json().noData;
				}
			},
			(error: Response) => {
				this.responseStatus = false;
				this.responseReceived = true;
				this.areaList = [];
				this.responseMsg = error.json().error;
			}
		)
	}
	
	ngOnDestroy() {
		this.refreshAreaListSubscription.unsubscribe();
		this.closePromptEventSubscription.unsubscribe();
		this.deleteAreaEventSubscription.unsubscribe();
	}
	
}