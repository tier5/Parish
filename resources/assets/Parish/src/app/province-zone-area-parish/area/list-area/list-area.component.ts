/** Component to list and filter Area */

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Response } from '@angular/http';

import { AreaListModel } from '../area-list.model';
import { ProvinceListModel } from '../../province/province-list.model';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { ZoneListModel } from '../../zone/zone-list.model';
import { ProvinceZoneAreaParishService } from '../../province-zone-area-parish.service';

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
	refreshZoneListSubscription: Subscription;
	closePromptEventSubscription: Subscription;
	deleteAreaEventSubscription: Subscription;
	
	provID: number = 0;
	zoneID: number = 0;
	selectionProvince = 0;
	selectionZone = 0;
	
	/** Injecting services to be used in this component */
	constructor( private router: Router,
	             private pzapService: ProvinceZoneAreaParishService ) { }
	
	ngOnInit() {

		/** Subscribe to event to refresh area list */
		this.refreshAreaListSubscription = this.pzapService.refreshList
		.subscribe(
			( body ) => {
				this.pzapService.filterArea( body ).subscribe(
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
		
		/** Subscription to event to refresh zone list */
		this.refreshZoneListSubscription = this.pzapService.refreshList
		.subscribe(
			( body ) => {
				this.pzapService.filterZone( body ).subscribe(
					(response: Response) => {
						if( response.json().status ) {
							this.responseStatus = true;
							this.zoneList = response.json().zones;
							if (this.selectionProvince == 0 && this.zoneSelected ){
								this.selectionProvince = this.zoneList[0].province_id;
							}
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
		
		/** Emitting event which will refresh the area and zone list */
		this.pzapService.refreshList.next( {} );
		
		/** Subscribe to event to close the delete prompt */
		this.closePromptEventSubscription = this.pzapService.closePromptEvent
		.subscribe(
			() => {
				this.showDeletePrompt = false;
			}
		);

		/** Subscribe to event to delete an area */
		this.deleteAreaEventSubscription = this.pzapService.deleteEvent
		.subscribe(
			(id: number) => {
				this.showDeletePrompt = false;
				this.pzapService.deleteArea( id ).subscribe(
					(response: Response) => {
						this.responseReceived = true;
						if( response.json().status ) {
							this.responseStatus = true;
							this.responseMsg = response.json().message;
							this.pzapService.refreshList.next( {} );
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

		/** Service call to get list of all available province */
		this.pzapService.listProvince()
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

	/** Function to reset all filter value and reset list */
	onResetList(){
		this.selectionProvince = 0;
		this.selectionZone = 0;
		this.pzapService.refreshList.next( {} );
	}
	
	/** Function call on update button click */
	onEdit(obj: AreaListModel) {
		const area_id = obj.id;
		this.router.navigate([ 'area/edit/', area_id ]);
	}
	
	/** Function call to show delete prompt */
	showPrompt(obj: AreaListModel) {
		this.showDeletePrompt = true;
		this.toDeleteArea = obj;
	}
	
	/** Function call on selection of province from filters */
	onSelectProvince(id: number) {
		if ( id > 0 ) {
			this.provinceSelected = true;
			this.zoneSelected = false;
			this.provID = id;
			this.pzapService.filterZone( { province_id: id } )
			.subscribe(
				(response: Response) => {
					if( response.json().status ) {
						this.responseStatus = true;
						if(response.json().zones!=undefined && response.json().zones.length ==1 ){
							this.selectionZone = response.json().zones[0]['id'];
						}else {
							this.selectionZone = null;
						}
					} else {
						this.selectionZone = null;
					}
				},
				(error: Response) => {
					this.responseStatus = false;
					this.responseReceived = true;
					this.selectionZone = null;
					this.zoneList = [];
					this.responseMsg = error.json().error;
				}
			);
			this.pzapService.refreshList.next( { province_id: id } );
		} else {
			this.provinceSelected = false;
			this.zoneSelected = false;
			this.provID = id;
			if (this.zoneID > 0) {
				this.pzapService.refreshList.next( { zone_id: this.zoneID } );
			} else {
				this.pzapService.refreshList.next( {} );
			}
		}
	}
	
	/** Function call on selection of zone from filters */
	onSelectZone(id: number) {
		if ( id > 0 ) {
			this.zoneSelected = true;
			this.pzapService.refreshList.next( { zone_id: id } );
			this.pzapService.filterArea( { zone_id: id } )
			.subscribe(
				(response: Response) => {
					if( response.json().status ) {
						this.responseStatus = true;
						if(response.json().areas!=undefined){
							this.selectionProvince = response.json().areas[0]['province_id'];
						}
					} else {
						this.responseStatus = false;
						this.responseMsg = response.json().message;
					}
				},
				(error: Response) => {
					this.responseStatus = false;
					this.responseReceived = true;
					this.responseMsg = error.json().error;
				}
			);
		} else {
			this.zoneSelected = false;
			this.pzapService.refreshList.next( { province_id: this.provID } );
		}
	}
	
	/** Un-subscribing from all custom made events when component is destroyed */
	ngOnDestroy() {
		this.closePromptEventSubscription.unsubscribe();
		this.deleteAreaEventSubscription.unsubscribe();
		this.refreshAreaListSubscription.unsubscribe();
		this.refreshZoneListSubscription.unsubscribe();
	}
}