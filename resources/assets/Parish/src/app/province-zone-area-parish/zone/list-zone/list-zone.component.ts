/** Component to handle list and filter of Zone */

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { ZoneListModel } from '../zone-list.model';
import { ProvinceListModel } from '../../province/province-list.model';
import { ProvinceZoneAreaParishService } from '../../province-zone-area-parish.service';

@Component({
	selector: 'app-list-zone',
	templateUrl: './list-zone.component.html',
	styleUrls: [ './list-zone.component.css' ]
})
export class ListZoneComponent implements OnInit, OnDestroy {
	
	provinceList                : ProvinceListModel[];
	zoneList                    : ZoneListModel[];
	responseStatus              : boolean = false;
	responseReceived            : boolean = false;
	showDeletePrompt            : boolean = false;
	responseNoRecord            : string = '';
	responseMsg                 : string = '';
	selectedProvince            : number =  0;
	toDeleteZone                : ZoneListModel;
	refreshZoneListSubscription : Subscription;
	closePromptEventSubscription: Subscription;
	deleteZoneEventSubscription : Subscription;
	
	
	
	/** Injecting services to be used in this component */
	constructor( private router: Router,
	             private pzapService: ProvinceZoneAreaParishService ) { }
	
	ngOnInit() {

		/** Subscribe to event to refresh zone list */
		this.refreshZoneListSubscription = this.pzapService.refreshList
		.subscribe(
			( body ) => {
				this.pzapService.filterZone( body ).subscribe(
					(response: Response) => {
							this.responseStatus = response.json().status;
						
						if( response.json().status ) {
							this.zoneList = response.json().zones;
							this.responseNoRecord = response.json().noData;
						} else {
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
		this.pzapService.refreshList.next( {} );
		
		/** Subscribe to event to close the delete prompt */
		this.closePromptEventSubscription = this.pzapService.closePromptEvent
		.subscribe(
			() => {
				this.showDeletePrompt = false;
			}
		);
		
		/** Subscribe to event to delete a zone */
		this.deleteZoneEventSubscription = this.pzapService.deleteEvent
		.subscribe(
			( id: number ) => {
				this.showDeletePrompt = false;
				this.pzapService.deleteZone( id ).subscribe(
					(response: Response) => {
							this.responseReceived   = true;
							this.responseStatus     = response.json().status;
						if( response.json().status ) {
							this.responseMsg = response.json().message;
							this.pzapService.refreshList.next( {} );
						} else {
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
		this.pzapService.listProvince().subscribe(
			(response: Response) => {
					this.responseStatus = response.json().status;
				if( response.json().status ) {
					this.provinceList = response.json().provinces;
				} else {
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
		this.selectedProvince = 0;
		this.pzapService.refreshList.next( {} );
	}

	/** Function call on update button click */
	onEdit(obj: ZoneListModel) {
		
		const zone_id = obj.id;
		this.router.navigate( [ 'zone/edit/', zone_id ] );
	}
	
	/** Function call to show delete prompt */
	showPrompt(obj: ZoneListModel) {
		
		this.showDeletePrompt = true;
		this.toDeleteZone = obj;
	}
	
	/** Function call on selection of province from filters */
	onSelectProvince(id: number) {
		if( id > 0 ) {
			this.pzapService.refreshList.next( { province_id: id } );
		} else {
			this.pzapService.refreshList.next( {} );
		}
	}
	
	/** Un-subscribing from all custom made events when component is destroyed */
	ngOnDestroy() {
		
		this.refreshZoneListSubscription.unsubscribe();
		this.closePromptEventSubscription.unsubscribe();
		this.deleteZoneEventSubscription.unsubscribe();
	}
}