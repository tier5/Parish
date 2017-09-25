/** Component to handle list of Provice */

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { Router } from '@angular/router';

import { ProvinceListModel } from '../province-list.model';
import { ProvinceZoneAreaParishService } from '../../province-zone-area-parish.service';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from "../../../auth/auth.service";


@Component({
	selector: 'app-list-province',
	templateUrl: './list-province.component.html',
	styleUrls: [ './list-province.component.css' ]
})
export class ListProvinceComponent implements OnInit, OnDestroy {
	
	provinceList                    : ProvinceListModel[];
	responseMsg                     : string    = '';
	responseStatus                  : boolean   = false;
	responseNoRecord                : string    = '';
	responseReceived                : boolean   = false;
	showDeletePrompt                : boolean   = false;
	toDeleteProvince                : ProvinceListModel;
	closePromptEventSubscription    : Subscription;
	refreshProvinceListSubscription : Subscription;
	deleteProvinceEventSubscription : Subscription;
	
	/** Injecting services to be used in this component */
	constructor( private pzapService: ProvinceZoneAreaParishService,
	             private router: Router,
	             private authService: AuthService) { }
	
	ngOnInit() {

		/** Subscribe to event to refresh province list */
		this.refreshProvinceListSubscription = this.pzapService.refreshList
		.subscribe(
			() => {
				this.pzapService.listProvince().subscribe(
					(response: Response) => {
						this.responseStatus = response.json().status;
						
						if( response.json().status ) {
							this.provinceList       = response.json().provinces;
							this.responseNoRecord   = response.json().noData;
						} else {
							this.provinceList       = [];
							this.responseMsg        = response.json().message;
							this.responseNoRecord   = response.json().noData;
						}
					},
					(error: Response) => {
						if ( error.status === 401 ) {
							this.authService.removeToken();
							this.router.navigate( [ '/login' ] );
						}
						this.responseStatus = false;
						this.responseReceived = true;
						this.provinceList = [];
						this.responseMsg = error.json().error;
					}
				);
			}
		);

		/** Emitting event which will refresh the province list */
		this.pzapService.refreshList.next();
		
		/** Subscribe to event to close the delete prompt */
		this.closePromptEventSubscription = this.pzapService.closePromptEvent
		.subscribe(
			() => {
				this.showDeletePrompt = false;
			}
		);

		/** Subscribe to event to delete a province */
		this.deleteProvinceEventSubscription = this.pzapService.deleteEvent
		.subscribe(
			(id: number) => {
				this.showDeletePrompt = false;
				this.pzapService.deleteProvince( id ).subscribe(
					(response: Response) => {
						this.responseReceived   = true;
						this.responseStatus     = response.json().status;
						if( response.json().status ) {
							this.responseMsg = response.json().message;
							this.pzapService.refreshList.next();
						} else {
							this.provinceList   = [];
							this.responseMsg    = response.json().message;
						}
						setTimeout( () => {
							this.responseReceived = false;
						}, 3000 )
					},
					(error: Response) => {
						if ( error.status === 401 ) {
							this.authService.removeToken();
							this.router.navigate( [ '/login' ] );
						}
						this.responseStatus     = false;
						this.responseReceived   = true;
						this.provinceList       = [];
						this.responseMsg        = error.json().error;
						setTimeout( () => {
							this.responseReceived = false;
						}, 3000 )
					}
				);
			}
		);
	}
	
	/** Function call on update button click */
	onEdit(obj: ProvinceListModel) {
		const province_id = obj.id;
		this.router.navigate([ 'province/edit/', province_id ]);
	}
	
	/** Function call to show delete prompt */
	showPrompt(obj: ProvinceListModel) {
		this.showDeletePrompt = true;
		this.toDeleteProvince = obj;
	}
	
	/** Unsubscribing from all custom made events when component is destroyed */
	ngOnDestroy() {
		this.refreshProvinceListSubscription.unsubscribe();
		this.closePromptEventSubscription.unsubscribe();
		this.deleteProvinceEventSubscription.unsubscribe();
	}
	
}