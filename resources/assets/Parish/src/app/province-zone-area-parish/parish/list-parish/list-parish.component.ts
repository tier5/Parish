/** Component to list and filter Parish */

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { ProvinceListModel } from '../../province/province-list.model';
import { ZoneListModel } from '../../zone/zone-list.model';
import { AreaListModel } from '../../area/area-list.model';
import { ParishListModel } from '../parish-list.model';
import { ProvinceZoneAreaParishService } from '../../province-zone-area-parish.service';

@Component({
	selector: 'app-list-parish',
	templateUrl: './list-parish.component.html',
	styleUrls: [ './list-parish.component.css' ]
})
export class ListParishComponent implements OnInit, OnDestroy {
	
	provinceList: ProvinceListModel[];
	zoneList: ZoneListModel[];
	areaList: AreaListModel[];
	parishList: ParishListModel[];
	responseMsg: string = '';
	responseNoRecord: string = '';
	responseStatus: boolean = false;
	responseReceived: boolean = false;
	showDeletePrompt: boolean = false;
	toDeleteParish: ParishListModel;
	provinceSelected: boolean = false;
	zoneSelected: boolean = false;
	areaSelected: boolean = false;
	refreshParishListSubscription: Subscription;
	closePromptEventSubscription: Subscription;
	deleteParishEventSubscription: Subscription;
	provID: number;
	zoneID: number;
	selectionProvince : number = null;
	selectionZone : number = null;
	selectionArea : number = null;
	
	/** Injecting services to be used in this component */
	constructor( private router: Router,
	             private pzapService: ProvinceZoneAreaParishService ) { }
	
	ngOnInit() {
	
	/** Subscribe to event to refresh parish list */
	this.refreshParishListSubscription = this.pzapService.refreshList
		.subscribe(
			( body ) => {
				this.pzapService.filterParish( body ).subscribe(
					( response: Response ) => {
						if( response.json().status ) {
							this.responseStatus = true;
							this.parishList = response.json().parishes;
							this.responseNoRecord = response.json().noData;
						} else {
							this.responseStatus = false;
							this.parishList = [];
							this.selectionProvince = null;
							this.selectionZone = null;
							this.responseMsg = response.json().message;
							this.responseNoRecord = response.json().noData;
						}
					},
					( error: Response ) => {
						this.responseStatus = false;
						this.responseReceived = true;
						this.parishList = [];
						this.responseMsg = error.json().error;
					}
				);
			}
		);
		
	/** Emitting event which will refresh the parish list */

		this.pzapService.refreshList.next( {} );
		
		/** Subscribe to event to close the delete prompt */
		this.closePromptEventSubscription = this.pzapService.closePromptEvent
		.subscribe(
			() => {
				this.showDeletePrompt = false;
			}
		);

		/** Subscribe to event to delete an parish */

		this.deleteParishEventSubscription = this.pzapService.deleteEvent
		.subscribe(
			(id: number) => {
				this.showDeletePrompt = false;
				this.pzapService.deleteParish( id ).subscribe(
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
		
		/** Service call to get list of all available zones */
		this.pzapService.filterZone( {} )
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
		
		/** Service call to get list of all available areas */
		this.pzapService.filterArea( {} )
		.subscribe(
			(response: Response) => {
				if( response.json().status ) {
					this.responseStatus = true;
					this.areaList = response.json().areas;
				} else {
					this.responseStatus = false;
					this.areaList = [];
					this.responseMsg = response.json().message;
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
	
	/** Function to reset all filter value and reset list */
	onResetFilters(){
		this.selectionProvince =null;
		this.selectionZone = null;
		this.selectionArea = null;
		this.pzapService.refreshList.next( {} );
	}
	
	/** Function call on update button click */
	onEdit(obj: ParishListModel) {
		const parish_id = obj.id;
		this.router.navigate([ 'parish/edit/', parish_id ]);
	}
	
	/** Function call to show delete prompt */
	showPrompt(obj: ParishListModel) {
		this.showDeletePrompt = true;
		this.toDeleteParish = obj;
	}
	
	/** Function call on selection of province from filters */
	onSelectProvince(id: number) {
		this.provID = id;
		this.pzapService.refreshList.next( { province_id: id } );
		this.pzapService.filterZone( { province_id: id } )
		.subscribe(
			(response: Response) => {
				if( response.json().status ) {
					this.responseStatus = true;
					this.zoneList = response.json().zones;
					this.selectionArea = null;
					if(this.zoneList!=undefined && this.zoneList.length ==1 ){
						this.selectionZone = this.zoneList[0]['id'];
					}else {
						this.selectionZone = null;
					}
				} else {
					this.responseStatus = false;
					this.zoneList = [];
					this.responseMsg = response.json().message;
					this.selectionZone = null;
					this.selectionArea = null;
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
	
	/** Function call on selection of zone from filters */
	onSelectZone(id: number) {
		this.zoneSelected = true;
		this.zoneID = id;
		this.pzapService.refreshList.next( { zone_id: id } );
		this.pzapService.filterArea( { zone_id: id } )
		.subscribe(
			(response: Response) => {
				if( response.json().status ) {
					this.responseStatus = true;
					this.areaList = response.json().areas;
					this.selectionArea = null;
					if(this.areaList!=undefined && this.areaList.length ==1 ){
						this.selectionArea = this.areaList[0]['id'];
						this.selectionProvince = this.areaList[0]['province_id'];
					}else {
						if(this.areaList!=undefined)
						{
							this.selectionProvince = this.areaList[0]['province_id'];
						}
						this.selectionArea = null;
					}
				} else {
					this.selectionArea = null;
					this.responseStatus = false;
					this.areaList = [];
					this.responseMsg = response.json().message;
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

	/** Function call on selection of area from filters */
	onSelectArea(id: number) {
		if ( id > 0 ) {
			this.areaSelected = true;
			this.pzapService.refreshList.next( { area_id: id } );

				/** get province and area id **/

					this.pzapService.filterParish( { area_id: id } ).subscribe(
					(response: Response) => {
						if( response.json().status ) {
							this.selectionProvince = response.json().parishes[0]['province_id'];
							this.selectionZone = response.json().parishes[0]['zone_id'];
						} else {
							this.selectionProvince = null;
							this.selectionZone = null;
						}
					},
					(error: Response) => {
						this.selectionProvince = null;
						this.selectionZone = null;
					}
				);
		} else {
			this.areaSelected = false;
			this.pzapService.refreshList.next( { zone_id: this.zoneID } );
		}
	}
	
	/** Un-subscribing from all custom made events when component is destroyed */
	ngOnDestroy() {
		this.refreshParishListSubscription.unsubscribe();
		this.closePromptEventSubscription.unsubscribe();
		this.deleteParishEventSubscription.unsubscribe();
	}
}