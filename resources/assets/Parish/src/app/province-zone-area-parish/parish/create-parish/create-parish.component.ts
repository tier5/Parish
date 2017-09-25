///<reference path="../../../../../node_modules/@angular/core/src/metadata/directives.d.ts"/>
/** Component to create and edit Parish */

import { ActivatedRoute, Data, Params, Router } from '@angular/router';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Response } from '@angular/http';

import { AuthService } from '../../../auth/auth.service';
import { ProvinceZoneAreaParishService } from '../../province-zone-area-parish.service';

@Component({
	selector    : 'app-create-parish',
	templateUrl : './create-parish.component.html',
	styleUrls   : [ './create-parish.component.css' ]
})
export class CreateParishComponent {
	
	zoneId      : number;
	parishId    : number = 0;
	provinceId  : number;
	editMode    : boolean = false;
	
	parishData = {
		id              : 0,
		user_id         : 0,
		parish_id       : 0,
		first_name      : '',
		last_name       : '',
		password        : '',
		zone_id         : 0,
		area_id         : 0,
		province_id     : 0,
		zone_name       : '',
		area_name       : '',
		parish_name     : '',
		province_name   : ''
		
	};
	
	default = {
		province    : 0,
		zone        : 0,
		area        : 0
	};
	
	provinceList    : { id: number, province_name: string }[] = [];
	zoneList        : { id: number, zone_name: string }[] = [];
	areaList        : { id: number, area_name: string }[] = [];
	zoneSelected    : boolean;
	provinceSelected: boolean;
	areaSelected    : boolean;
	responseReceived: boolean   = false;
	responseMsg     : string    = '';
	heading         : string    = 'Create New';
	title           : string    = 'Parish - Create';
	showLoader      : boolean   = false;
	responseStatus  : boolean   = false;
	
	
	/** Injecting services to be used in this component */
	constructor( private pzapService: ProvinceZoneAreaParishService,
	             private authService: AuthService,
	             private activatedRoute: ActivatedRoute,
	             private router: Router ) { }
	
	ngOnInit() {

		/** Service call to get list of all available province */
		this.pzapService.listProvince()
		.subscribe(
			(response: Response) => {
				this.responseStatus = response.json().status;
				
				if( response.json().status ) {
					this.provinceList = response.json().provinces;
				} else {
					this.provinceList = [];
					this.responseMsg = response.json().message;
				}

				/** Checking route params to get present mode */
				this.activatedRoute.data.subscribe(
					(data: Data) => {
						this.editMode = data['editMode'];

						/** Perform operation is present mode is edit mode */
						if( this.editMode ) {
							this.provinceSelected   = true;
							this.zoneSelected       = true;
							this.areaSelected       = true;
							this.heading            = 'Update';
							this.title              = 'Parish - Update';
							
							/** Checking route params to get id of area to edit */
							this.activatedRoute.params.subscribe(
								(params: Params) => {
									this.parishId = params['id'];
									this.pzapService.parishToEdit( this.parishId )
									.subscribe(
										(response: Response) => {
											this.parishData = response.json().parish;
											this.pzapService.filterZone( { province_id: this.parishData.province_id } )
											.subscribe(
												(response: Response) => {
													this.zoneList = response.json().zones;
														this.pzapService.filterArea( { zone_id: this.parishData.zone_id } )
															.subscribe(
																(response: Response) => {
																	this.areaList = response.json().areas;
																}
															);
												},
												(error: Response) => {
													if ( error.status === 401 ) {
														this.authService.removeToken();
														this.router.navigate( [ '/login' ] );
													}
												}
											);
										}
									);
								},
								(error: Response) => {
									if ( error.status === 401 ) {
										this.authService.removeToken();
										this.router.navigate( [ '/login' ] );
									}
								},
								() => { }
							);
						} else {
							this.provinceSelected   = false;
							this.zoneSelected       = false;
							this.areaSelected       = false;
						}
					}
				);
				
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
	
	/** Function call when province selected */
	onSelectProvince(id: number) {
		if ( id > 0 ) {
			this.zoneSelected = false;
			this.areaSelected = false;
			if ( id > 0 ) {
				this.provinceId = id;
				this.provinceSelected = true;
				this.pzapService.filterZone( { province_id: id } )
				.subscribe(
					( response: Response ) => {
							this.responseStatus = response.json().status;
						
						if ( response.json().status ) {
							this.zoneList       = response.json().zones;
							this.areaList       = [];
						} else {
							this.zoneList       = [];
							this.areaList       = [];
							this.responseMsg    = response.json().message;
						}
					},
					( error: Response ) => {
						if ( error.status === 401 ) {
							this.authService.removeToken();
							this.router.navigate( [ '/login' ] );
						}
						this.responseStatus     = false;
						this.responseReceived   = true;
						this.zoneList           = [];
						this.areaList           = [];
						this.responseMsg        = error.json().error;
					}
				);
			} else {
				this.provinceSelected = false;
			}
		}
	}
	
	/** Function call when zone selected */
	onSelectZone(id: number) {
		if ( id > 0 ) {
			this.areaSelected = false;
			if ( id > 0 ) {
				this.zoneId = id;
				this.zoneSelected = true;
				// const body = {
				// 	provience_id: this.provinceId,
				// 	zone_id: id
				// };
				this.pzapService.filterArea( { zone_id: id } )
				.subscribe(
					( response: Response ) => {
						this.responseStatus = response.json().status;
						
						if ( response.json().status ) {
							this.areaList = response.json().areas;
						} else {
							this.areaList       = [];
							this.responseMsg    = response.json().message;
						}
					},
					( error: Response ) => {
						if ( error.status === 401 ) {
							this.authService.removeToken();
							this.router.navigate( [ '/login' ] );
						}
						this.responseStatus     = false;
						this.responseReceived   = true;
						this.zoneList           = [];
						this.responseMsg        = error.json().error;
					}
				);
			} else {
				this.zoneSelected = false;
			}
		}
	}
	
	/** Function call when area selected */
	onSelectArea(id: number) {
		if ( id > 0 ) {
			this.areaSelected = true;
		} else {
			this.areaSelected = false;
		}
	}
	
	/** Function call when form is submitted */
	onSubmit(createParishForm: NgForm) {
		this.showLoader = true;
		if( this.editMode ) {

			const area_id: number = this.parishData.id;
			const pastor_id:number = this.parishData.user_id;

			this.pzapService.editParish( area_id, pastor_id, createParishForm.value )
			.subscribe(
				( response: Response ) => {
					this.showLoader = false;
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
			this.pzapService.createParish( createParishForm.value )
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
						this.router.navigate( [ '/login' ] );
					}
					
					this.showLoader         = false;
					this.responseStatus     = false;
					this.responseReceived   = true;
					this.responseMsg        = error.json().error;
					setTimeout( () => {
						this.responseReceived = false;
					}, 3000 );
				},
				() => {
					this.responseReceived       = true;
					createParishForm.reset();
					this.provinceSelected       = false;
					this.zoneSelected           = false;
					setTimeout( () => {
						this.responseReceived   = false;
					}, 3000 );
				}
			);
		}
	}
	
	
	/** Function call to reset form */
	onReset(createParishForm: NgForm) {

		if ( this.editMode ) {
			this.pzapService.parishToEdit( this.parishId )
			.subscribe(
				(response: Response) => {
					this.provinceSelected   = true;
					this.parishData         = response.json().parish;
					this.onSelectProvince( this.parishData.province_id );
					this.onSelectZone( this.parishData.zone_id );
					this.zoneSelected       = true;
					this.onSelectArea( this.parishData.area_id );
					this.areaSelected       = true;
					createParishForm.form.patchValue({
						first_name  : this.parishData.first_name,
						last_name   : this.parishData.last_name,
						province_id : this.parishData.province_id,
						zone_id     : this.parishData.zone_id,
						area_id     : this.parishData.area_id,
						parish_name : this.parishData.parish_name
					} );
				},
				(error: Response) => {
					if ( error.status === 401 ) {
						this.authService.removeToken();
						this.router.navigate( [ '/login' ] );
					}
				}
			);
		} else {
			createParishForm.reset();
			this.provinceSelected   = false;
			this.zoneSelected       = false;
			this.areaSelected       = false;
			createParishForm.form.patchValue( {
				province_id : 0,
				zone_id     : 0,
				area_is     : 0
			} );
		}
	}
}