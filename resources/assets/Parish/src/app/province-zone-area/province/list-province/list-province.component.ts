import { Component, OnDestroy, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { Router } from '@angular/router';

import { ProvinceListModel } from '../../province-list.model';
import { ProvinceService } from '../province.service';
import { Subscription } from 'rxjs/Subscription';


@Component({
	selector: 'app-list-province',
	templateUrl: './list-province.component.html',
	styleUrls: [ './list-province.component.css' ]
})
export class ListProvinceComponent implements OnInit, OnDestroy {
	
	provinceList: ProvinceListModel[];
	responseMsg: string = '';
	responseNoRecord: string = '';
	responseStatus: boolean = false;
	responseReceived: boolean = false;
	showDeletePrompt: boolean = false;
	toDeleteProvince: ProvinceListModel;
	refreshProvinceListSubscription: Subscription;
	closePromptEventSubscription: Subscription;
	deleteProvinceEventSubscription: Subscription;
	
	/** Injecting services to be used in this component */
	constructor( private provinceService: ProvinceService,
	             private router: Router ) { }
	
	ngOnInit() {

		/** Subscribe to event to refresh province list */
		this.refreshProvinceListSubscription = this.provinceService.refreshProvinceList
		.subscribe(
			() => {
				this.provinceService.listProvince().subscribe(
					(response: Response) => {

						if( response.json().status ) {
							this.responseStatus = true;
							this.provinceList = response.json().provinces;
							this.responseNoRecord = response.json().noData;
						} else {
							this.responseStatus = false;
							this.provinceList = [];
							this.responseMsg = response.json().message;
							this.responseNoRecord = response.json().noData;
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
		);

		/** Emitting event which will refresh the province list */
		this.provinceService.refreshProvinceList.next();
		
		/** Subscribe to event to close the delete prompt */
		this.closePromptEventSubscription = this.provinceService.closePromptEvent
		.subscribe(
			() => {
				this.showDeletePrompt = false;
			}
		);

		/** Subscribe to event to delete a province */
		this.deleteProvinceEventSubscription = this.provinceService.deleteProvinceEvent
		.subscribe(
			(id: number) => {
				this.showDeletePrompt = false;
				this.provinceService.deleteProvince( id ).subscribe(
					(response: Response) => {
						this.responseReceived = true;
						if( response.json().status ) {
							this.responseStatus = true;
							this.responseMsg = response.json().message;
							this.provinceService.refreshProvinceList.next();
						} else {
							this.responseStatus = false;
							this.provinceList = [];
							this.responseMsg = response.json().message;

						}
						setTimeout( () => {
							this.responseReceived = false;
						}, 3000 )
					},
					(error: Response) => {
						this.responseStatus = false;
						this.responseReceived = true;
						this.provinceList = [];
						this.responseMsg = error.json().error;
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