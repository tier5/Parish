import { Component, OnDestroy, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { ZoneListModel } from '../../zone-list.model';
import { ProvinceListModel } from '../../province-list.model';
import { ZoneService } from '../zone.service';

@Component({
	selector: 'app-list-zone',
	templateUrl: './list-zone.component.html',
	styleUrls: [ './list-zone.component.css' ]
})
export class ListZoneComponent implements OnInit, OnDestroy {
	
	provinceList: ProvinceListModel[];
	zoneList: ZoneListModel[];
	responseMsg: string = '';
	responseNoRecord: string = '';
	responseStatus: boolean = false;
	responseReceived: boolean = false;
	showDeletePrompt: boolean = false;
	toDeleteZone: ZoneListModel;
	refreshZoneListSubscription: Subscription;
	closePromptEventSubscription: Subscription;
	deleteZoneEventSubscription: Subscription;
	selectionProvince: null;
	
	/** Injecting services to be used in this component */
	constructor( private router: Router,
	             private zoneService: ZoneService ) { }
	
	ngOnInit() {

		/** Subscribe to event to refresh zone list */
		this.refreshZoneListSubscription = this.zoneService.refreshZoneList
		.subscribe(
			() => {
				this.zoneService.listZone().subscribe(
					(response: Response) => {
						if( response.json().status ) {
							this.responseStatus = true;
							this.zoneList = response.json().zones;
							this.responseNoRecord = response.json().noData;
						} else {
							this.responseStatus = false;
							this.zoneList = [];
							this.responseMsg = response.json().message;
							this.responseNoRecord = response.json().noData;
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
		);

		/** Emitting event which will refresh the zone list */
		this.zoneService.refreshZoneList.next();
		
		/** Subscribe to event to close the delete prompt */
		this.closePromptEventSubscription = this.zoneService.closePromptEvent
		.subscribe(
			() => {
				this.showDeletePrompt = false;
			}
		);
		
		/** Subscribe to event to delete a zone */
		this.deleteZoneEventSubscription = this.zoneService.deleteZoneEvent
		.subscribe(
			(id: number) => {
				this.showDeletePrompt = false;
				this.zoneService.deleteZone( id ).subscribe(
					(response: Response) => {
						this.responseReceived = true;
						if( response.json().status ) {
							this.responseStatus = true;
							this.responseMsg = response.json().message;
							this.zoneService.refreshZoneList.next();
						} else {
							this.responseStatus = false;
							this.zoneList = [];
							this.responseMsg = response.json().message;
						}
						setTimeout( () => {
							this.responseReceived = false;
						}, 3000 )
					},
					(error: Response) => {
						this.responseStatus = false;
						this.responseReceived = true;
						this.zoneList = [];
						this.responseMsg = error.json().error;
						setTimeout( () => {
							this.responseReceived = false;
						}, 3000 )
					}
				);
			}
		);
		
		/** Service call to get list of all available province */
		this.zoneService.listProvince().subscribe(
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
	
	/** Function to reset filter value and reset list */
	onResetList(){
		this.selectionProvince = null;
		this.zoneService.refreshZoneList.next();
	}

	/** Function call on update button click */
	onEdit(obj: ZoneListModel) {
		const zone_id = obj.id;
		this.router.navigate([ 'zone/edit/', zone_id ]);
	}
	
	/** Function call to show delete prompt */
	showPrompt(obj: ZoneListModel) {
		this.showDeletePrompt = true;
		this.toDeleteZone = obj;
	}
	
	/** Function call on selection of province from filters */
	onSelectProvince(id: number) {
		this.zoneService.filterByProvince({ provience_id: id })
		.subscribe(
			(response: Response) => {
				if( response.json().status ) {
					this.responseStatus = true;
					this.zoneList = response.json().zones;
					this.responseNoRecord = response.json().noData;
				} else {
					this.responseStatus = false;
					this.zoneList = [];
					this.responseMsg = response.json().message;
					this.responseNoRecord = response.json().noData;
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
	
	/** Unsubscribing from all custom made events when component is destroyed */
	ngOnDestroy() {
		this.refreshZoneListSubscription.unsubscribe();
		this.closePromptEventSubscription.unsubscribe();
		this.deleteZoneEventSubscription.unsubscribe();
	}
}