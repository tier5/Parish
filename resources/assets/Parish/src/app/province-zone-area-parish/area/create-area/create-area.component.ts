/** Component to create and edit Area */

import { ActivatedRoute, Data, Params, Router } from '@angular/router';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Response } from '@angular/http';

import { AuthService } from '../../../auth/auth.service';
import { AreaListModel } from '../area-list.model';
import { ProvinceZoneAreaParishService } from '../../province-zone-area-parish.service';

@Component({
	selector    : 'app-create-area',
	templateUrl : './create-area.component.html',
	styleUrls   : [ './create-area.component.css' ]
})
export class CreateAreaComponent {
	
	editMode: boolean = false;
	areaData = {
		id              : 0,
		user_id         : 0,
		parish_id       : 0,
		first_name      : '',
		last_name       : '',
		password        : '',
		zone_id         : 0,
		province_id     : 0,
		zone_name       : '',
		area_name       : '',
		province_name   : ''
		
	};
	areaId:number = 0;
	provinceList    : { id: number, province_name: string }[] = [];
	zoneList        : { id: number, zone_name: string }[] = [];
	zoneSelected    : boolean;
	provinceSelected: boolean;
	responseMsg     : string  = '';
	title           : string  = 'Area - Create';
	heading         : string  = 'Create New';
	showLoader      : boolean = false;
	responseStatus  : boolean = false;
	responseReceived: boolean = false;
	
	
	/** Injecting services to be used in this component */
	constructor( private authService: AuthService,
	             private activatedRoute: ActivatedRoute,
	             private pzapService: ProvinceZoneAreaParishService,
				 private router: Router ) { }
	
	ngOnInit() {

		/** Service call to get list of all available province */
		this.pzapService.listProvince()
		.subscribe(
			(response: Response) => {
				this.responseStatus = response.json().status;
				
				if( response.json().status ) {
					this.provinceList   = response.json().provinces;
				} else {
					this.provinceList   = [];
					this.responseMsg    = response.json().message;
				}

				/** Checking route params to get present mode */
				this.activatedRoute.data.subscribe(
					(data: Data) => {
						this.editMode = data['editMode'];

						/** Perform operation is present mode is edit mode */
						if( this.editMode ) {
							this.provinceSelected   = true;
							this.zoneSelected       = true;
							this.heading            = 'Update';
							this.title              = 'Area - Update';
							
							/** Checking route params to get id of area to edit */
							this.activatedRoute.params.subscribe(
								(params: Params) => {
									this.areaId = params['id'];
									this.pzapService.areaToEdit( this.areaId )
									.subscribe(
										(response: Response) => {
											this.areaData = response.json().areas;
											this.pzapService.filterZone( { province_id: this.areaData.province_id } )
											.subscribe(
												(response: Response) => {
													this.zoneList = response.json().zones;
												}
											);
										}
									);
								},
								(error: Response) => {
									console.log(error);
								},
								() => { }
							);
						} else {
							this.provinceSelected = false;
							this.zoneSelected = false;
						}
					}
				);
				
			},
			(error: Response) => {
				this.responseStatus     = false;
				this.responseReceived   = true;
				this.provinceList       = [];
				this.responseMsg        = error.json().error;
			}
		);
	}
	
	/** Function call when province selected */
	onSelectProvince(id: number) {
		if ( id > 0 ) {
			this.provinceSelected   = true;
			this.zoneSelected       = false;
			this.pzapService.filterZone({ province_id: id })
			.subscribe(
				(response: Response) => {
					this.responseStatus = response.json().status;
					
					if( response.json().status ) {
						this.zoneList       = response.json().zones;
					} else {
						this.zoneList       = [];
						this.responseMsg    = response.json().message;
					}
				},
				(error: Response) => {
					this.responseStatus     = false;
					this.responseReceived   = true;
					this.zoneList           = [];
					this.responseMsg        = error.json().error;
				}
			);
		} else {
			this.provinceSelected   = false;
			this.zoneSelected       = false;
		}
		
	}

	/** Function call when zone selected */	
	onSelectZone(id: number) {
		this.zoneSelected = true;
	}
	
	/** Function call when form is submitted */
	onSubmit(createAreaForm: NgForm) {
		this.showLoader = true;
		if( this.editMode ) {
			
			const area_id: number   = this.areaData.id;
			const pastor_id:number  = this.areaData.user_id;
			
			this.pzapService.editArea( area_id, pastor_id, createAreaForm.value )
			.subscribe(
				( response: Response ) => {
					this.showLoader     = false;
					this.responseStatus = response.json().status;
					if ( response.json().status ) {
						this.responseMsg    = response.json().message;
					} else {
						this.responseMsg    = '';
					}
				},
				( error: Response ) => {
					if ( error.status === 401 ) {
						this.authService.removeToken();
					}
					console.log( error );
					this.showLoader         = false;
					this.responseStatus     = false;
					this.responseReceived   = true;
					this.responseMsg        = error.json().error;
					setTimeout( () => {
						this.responseReceived = false;
					}, 3000 )
				},
				() => {
					//createAreaForm.reset();
					this.responseReceived = true;
					setTimeout( () => {
						this.responseReceived = false;
					}, 3000 )
				}
			);
		} else {
			this.pzapService.createArea( createAreaForm.value )
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
						this.router.navigate( [ '/login' ] );
					}
					this.showLoader             = false;
					this.responseStatus         = false;
					this.responseReceived       = true;
					this.responseMsg            = error.json().error;
					setTimeout( () => {
						this.responseReceived   = false;
					}, 3000 );
				},
				() => {
					this.responseReceived   = true;
					createAreaForm.reset();
					this.provinceSelected   = false;
					this.zoneSelected       = false;
					setTimeout( () => {
						this.responseReceived = false;
					}, 3000 );
				}
			);
		}
	}
	
	/** Function call to reset form */
	onReset(createAreaForm: NgForm) {
		if ( this.editMode ) {
			this.pzapService.areaToEdit( this.areaId )
			.subscribe(
				(response: Response) => {
					this.provinceSelected   = true;
					this.areaData           = response.json().areas;
					this.onSelectProvince( this.areaData.province_id );
					this.zoneSelected       = true;
					createAreaForm.form.patchValue({
						first_name  : this.areaData.first_name,
						last_name   : this.areaData.last_name,
						province_id : this.areaData.province_id,
						zone_id     : this.areaData.zone_id,
						area_name   : this.areaData.area_name
					} );
				}
			);
			
		} else {
			createAreaForm.reset();
			this.provinceSelected   = false;
			this.zoneSelected       = false;
			createAreaForm.form.patchValue( {
				province_id : 0,
				zone_id     : 0
			} );
		}
	}
}