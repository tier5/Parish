/** Component to handle create and update of Zone */

import { ActivatedRoute, Data, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Response } from '@angular/http';

import { AuthService } from '../../../auth/auth.service';
import { ProvinceZoneAreaParishService } from '../../province-zone-area-parish.service';
import { ZoneListModel } from '../zone-list.model';

@Component({
	selector: 'app-create-zone',
	templateUrl: './create-zone.component.html',
	styleUrls: [ './create-zone.component.css' ]
})
export class CreateZoneComponent implements OnInit {

	editMode: boolean = false;
	zoneData: ZoneListModel = {
		id: 0,
		user_id: 0,
		parish_id: 0,
		first_name: '',
		last_name: '',
		password: '',
		province_id: 0,
		province_name: '',
		zone_name: ''
	};
	provinceList: { id: number, province_name: string }[] = [];
	provinceSelected: boolean;
	responseReceived: boolean = false;
	responseMsg: string = '';
	title: string = 'Zone - Create';
	heading: string = 'Create New';
	responseStatus: boolean = false;
	showLoader: boolean = false;
	zoneId: number;
	
	/** Injecting services to be used in this component */
	constructor( private pzapService: ProvinceZoneAreaParishService,
	             private authService: AuthService,
	             private activatedRoute: ActivatedRoute ) { }
	
	ngOnInit() {

		/** Service call to get list of all available province */
		this.pzapService.listProvince().subscribe(
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
		
		/** Checking route params to get present mode */
		this.activatedRoute.data.subscribe(
			(data: Data) => {
				this.editMode = data['editMode'];
				
				/** Perform operation is present mode is edit mode */
				if( this.editMode ){
					this.provinceSelected = true;
					this.title = 'Zone - Update';
					this.heading = 'Update';
					
					/** Checking route params to get id of area to edit */
					this.activatedRoute.params.subscribe(
						(params: Params) => {
							this.zoneId = params['id'];
							this.pzapService.zoneToEdit( this.zoneId )
							.subscribe(
								(response: Response) => {
									this.zoneData = response.json().zones;
								}
							);
						},
						(error: Response) => {
							console.log(error);
						}
					);
				} else {
					this.provinceSelected = false;
				}
			}
		);
	}
	
	/** Function call when province selected */
	onSelectProvince(id: number) {
		if ( id > 0){
			this.provinceSelected = true;
		} else {
			this.provinceSelected = false;
		}
	}
	
	/** Function call when form is submitted */
	onSubmit(createZoneForm: NgForm) {
		this.showLoader = true;
		if( this.editMode ) {
			
			const zone_id: number = this.zoneData.id;
			const pastor_id:number = this.zoneData.user_id;
			
			this.pzapService.editZone( zone_id, pastor_id, createZoneForm.value )
			.subscribe(
				( response: Response ) => {
					this.showLoader = false;
					if ( response.json().status ) {
						this.responseStatus = true;
						this.responseMsg = response.json().message;
					} else {
						this.responseStatus = false;
					}
				},
				( error: Response ) => {
					if ( error.status === 401 ) {
						this.authService.removeToken();
					}
					console.log( error );
					this.showLoader = false;
					this.responseStatus = false;
					this.responseReceived = true;
					this.responseMsg = error.json().error;
					setTimeout( () => {
						this.responseReceived = false;
					}, 3000 )
				},
				() => {
					//createZoneForm.reset();
					this.responseReceived = true;
					setTimeout( () => {
						this.responseReceived = false;
					}, 3000 )
				}
			);
		} else {
			this.pzapService.createZone(createZoneForm.value)
			.subscribe(
				( response: Response ) => {
					this.showLoader = false;
					if(response.json().status){
						this.responseStatus = true;
						this.responseMsg = response.json().message;
					} else {
						this.responseStatus = false;
					}
				},
				( error: Response ) => {
					alert('error');
					if( error.status === 401) {
						this.authService.removeToken();
					}
					this.showLoader = false;
					this.responseStatus = false;
					this.responseReceived = true;
					this.responseMsg = error.json().error;
					setTimeout( () => {
						this.responseReceived = false;
					}, 3000)
				},
				() => {
					this.responseReceived = true;
					createZoneForm.reset();
					this.provinceSelected = false;
					setTimeout( () => {
						this.responseReceived = false;
					}, 3000)
				}
			);
		}
	}
	
	/** Function call to reset form */
	onReset(createZoneForm: NgForm) {
		if( this.editMode ) {
			this.pzapService.zoneToEdit( this.zoneId )
			.subscribe(
				(response: Response) => {
					this.zoneData = response.json().zones;
					this.onSelectProvince( this.zoneData.id );
					createZoneForm.form.patchValue({
						id: this.zoneData.id,
						user_id: this.zoneData.user_id,
						parish_id: this.zoneData.parish_id,
						first_name: this.zoneData.first_name,
						last_name: this.zoneData.last_name,
						password: this.zoneData.password,
						province_id: this.zoneData.province_id,
						province_name: this.zoneData.province_name,
						zone_name: this.zoneData.zone_name
					} );
				}
			);
		} else {
			createZoneForm.reset();
			this.provinceSelected = false;
		}
		
	}
}