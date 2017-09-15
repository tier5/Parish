/** Component to handle create and edit Province */

import { ActivatedRoute, Data, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Response } from '@angular/http';

import { AuthService } from '../../../auth/auth.service';
import { ProvinceListModel } from '../province-list.model';
import { ProvinceZoneAreaParishService } from '../../province-zone-area-parish.service';

@Component({
	selector: 'app-create-province',
	templateUrl: './create-province.component.html',
	styleUrls: [ './create-province.component.css' ]
})
export class CreateProvinceComponent implements OnInit {
	
	editMode: boolean = false; // Initializing edit mode for this component
	provinceData: ProvinceListModel = {
		id              : 0,
		user_id         : 0,
		parish_id       : 0,
		first_name      : '',
		last_name       : '',
		password        : '',
		province_name   : ''
	};
	
	provinceId: number;
	showLoader          = false;
	responseStatus      = false;
	responseReceived    = false;
	responseMsg: string = '';
	heading:string      = 'Create New';
	title:string        = 'Province - Create';
	
	/** Injecting services to be used in this component */
	constructor( private pzapService: ProvinceZoneAreaParishService,
				 private authService: AuthService,
				 private activatedRoute: ActivatedRoute ) { }
	
	ngOnInit() {

		/** Checking route params to get present mode */
		this.activatedRoute.data.subscribe(
			(data: Data) => {
				this.editMode = data['editMode'];
			}
		);

		/** Perform operation is present mode is edit mode */
		if( this.editMode ){
			
			this.title = 'Province - Update';
			this.heading = 'Update';
			/** Checking route params to get id of province to edit */
			this.activatedRoute.params.subscribe(
				(params: Params) => {
					this.provinceId = params['id'];
					this.pzapService.provinceToEdit( this.provinceId )
					.subscribe(
						(response: Response) => {
							this.provinceData = response.json().provinces;
						}
					);
				},
				(error: Response) => {
					console.log(error);
				}
			);
		}
	}
	
	/** Function call when form is submitted */
	onSubmit(createProvinceForm: NgForm) {
		this.showLoader = true;
		
		if( this.editMode ) {
			const province_id: number = this.provinceData.id;
			const pastor_id:number = this.provinceData.user_id;

			this.pzapService.editProvince( province_id, pastor_id, createProvinceForm.value )
			.subscribe(
				( response: Response ) => {
					this.showLoader         = false;
					this.responseStatus     = response.json().status;
					
					if ( response.json().status ) {
						this.responseMsg = response.json().message;
					} else {
						this.responseMsg = '';
					}
				},
				( error: Response ) => {
					if ( error.status === 401 ) {
						this.authService.removeToken();
					}
					
					this.showLoader         = false;
					this.responseStatus     = false;
					this.responseReceived   = true;
					this.responseMsg = error.json().error;
					setTimeout( () => {
						this.responseReceived = false;
					}, 3000 )
				},
				() => {
					//createProvinceForm.reset();
					this.responseReceived = true;
					setTimeout( () => {
						this.responseReceived = false;
					}, 3000 )
				}
			);
		} else {
			this.pzapService.createProvince( createProvinceForm.value )
			.subscribe(
				( response: Response ) => {
					this.showLoader     = false;
					this.responseStatus = response.json().status;
					
					if ( response.json().status ) {
						this.responseMsg = response.json().message;
					} else {
						this.responseMsg = '';
					}
				},
				( error: Response ) => {
					if ( error.status === 401 ) {
						this.authService.removeToken();
					}
					
					this.showLoader         = false;
					this.responseStatus     = false;
					this.responseReceived   = true;
					this.responseMsg        = error.json().error;
					
					setTimeout( () => {
						this.responseReceived = false;
					}, 3000 )
				},
				() => {
					createProvinceForm.reset();
					this.responseReceived = true;
					setTimeout( () => {
						this.responseReceived = false;
					}, 3000 )
				}
			);
		}
	}
	
	/** Function call to reset form */
	onReset(createProvinceForm: NgForm) {
		if (this.editMode) {
			this.pzapService.provinceToEdit( this.provinceId )
			.subscribe(
				(response: Response) => {
					this.provinceData   = response.json().provinces;
					createProvinceForm.form.patchValue( {
						first_name      : this.provinceData.first_name,
						last_name       : this.provinceData.last_name,
						province_name   : this.provinceData.province_name
					} );
				}
			);
		} else {
			createProvinceForm.reset();
		}
	}
}