import { ActivatedRoute, Data, Params, Router } from '@angular/router';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Response } from '@angular/http';

import { AreaService } from '../area.service';
import { AuthService } from '../../../auth/auth.service';
import { AreaListModel } from '../../area-list.model';

@Component({
	selector: 'app-create-area',
	templateUrl: './create-area.component.html',
	styleUrls: [ './create-area.component.css' ]
})
export class CreateAreaComponent {
	
	editMode: boolean = false;
	areaData = {
		id: 0,
		user_id: 0,
		parish_id: 0,
		first_name: '',
		last_name: '',
		password: '',
		provience_id: 0,
		provience_name: '',
		zone_name: '',
		zone_id: 0,
		area_name: ''
	};
	areaId:number = 0;
	provinceList: { id: number, province_name: string }[] = [];
	provinceSelected: boolean;
	zoneList: { id: number, zone_name: string }[] = [];
	zoneSelected: boolean;
	responseReceived: boolean = false;
	responseMsg: string = '';
	responseStatus: boolean = false;
	showLoader: boolean = false;
	
	/** Injecting services to be used in this component */
	constructor( private areaService: AreaService,
	             private authService: AuthService,
	             private activatedRoute: ActivatedRoute,
				 private router: Router ) { }
	
	ngOnInit() {

		/** Service call to get list of all available province */
		this.areaService.listProvince()
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

				/** Checking route params to get present mode */
				this.activatedRoute.data.subscribe(
					(data: Data) => {
						this.editMode = data['editMode'];

						/** Perform operation is present mode is edit mode */
						if( this.editMode ) {
							this.provinceSelected = true;
							this.zoneSelected = true;

							/** Checking route params to get id of area to edit */
							this.activatedRoute.params.subscribe(
								(params: Params) => {
									this.areaId = params['id'];
									this.areaService.fetchSpecificArea( this.areaId )
									.subscribe(
										(response: Response) => {
											this.areaData = response.json().areas;
											this.areaService.listZone( this.areaData.provience_id )
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
				this.responseStatus = false;
				this.responseReceived = true;
				this.provinceList = [];
				this.responseMsg = error.json().error;
			}
		);
	}
	
	/** Function call when province selected */
	onSelectProvince(id: number) {
		this.provinceSelected = true;
		this.zoneSelected = false;
		this.areaService.listZone(id)
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
	}

	/** Function call when zone selected */	
	onSelectZone(id: number) {
		this.zoneSelected = true;
	}
	
	/** Function call when form is submitted */
	onSubmit(createAreaForm: NgForm) {
		this.showLoader = true;
		if( this.editMode ) {
			
			const area_id: number = this.areaData.id;
			const pastor_id:number = this.areaData.user_id;
			
			this.areaService.editArea( area_id, pastor_id, createAreaForm.value )
			.subscribe(
				( response: Response ) => {
					this.showLoader = false;
					if ( response.json().status ) {
						this.responseStatus = true;
						this.responseMsg = response.json().message;
					} else {
						this.responseStatus = false;
						console.log( response );
						console.log( response.status );
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
					//createAreaForm.reset();
					this.responseReceived = true;
					setTimeout( () => {
						this.responseReceived = false;
					}, 3000 )
				}
			);
		} else {
			this.areaService.createArea( createAreaForm.value )
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
					alert( 'error' );
					if ( error.status === 401 ) {
						this.authService.removeToken();
						this.router.navigate( [ '/login' ] );
					}
					this.showLoader = false;
					this.responseStatus = false;
					this.responseReceived = true;
					this.responseMsg = error.json().error;
					setTimeout( () => {
						this.responseReceived = false;
					}, 3000 );
				},
				() => {
					this.responseReceived = true;
					createAreaForm.reset();
					this.provinceSelected = false;
					this.zoneSelected = false;
					setTimeout( () => {
						this.responseReceived = false;
					}, 3000 );
				}
			);
		}
	}
	
	/** Function call to reset form */
	onReset(createAreaForm: NgForm) {
		createAreaForm.reset();
		this.provinceSelected = false;
		this.zoneSelected = false;
	}
}