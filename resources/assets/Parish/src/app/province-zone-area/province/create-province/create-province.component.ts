import { ActivatedRoute, Data, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Response } from '@angular/http';

import { AuthService } from '../../../auth/auth.service';
import { ProvinceService } from '../province.service';
import { ProvinceListModel } from '../../province-list.model';

@Component({
	selector: 'app-create-province',
	templateUrl: './create-province.component.html',
	styleUrls: [ './create-province.component.css' ]
})
export class CreateProvinceComponent implements OnInit {
	
	editMode: boolean = false;
	provinceData: ProvinceListModel = {
		id: 0,
		user_id: 0,
		parish_id: 0,
		first_name: '',
		last_name: '',
		province_name: '',
		password: ''
	};
	showLoader = false;
	responseStatus = false;
	responseReceived = false;
	responseMsg: string = '';
	
	provinceId: number;
	constructor( private provinceService: ProvinceService,
				 private authService: AuthService,
				 private activatedRoute: ActivatedRoute ) { }
	
	ngOnInit() {
		this.activatedRoute.data.subscribe(
			(data: Data) => {
				this.editMode = data['editMode'];
			}
		);
		if( this.editMode ){
			this.activatedRoute.params.subscribe(
				(params: Params) => {
					this.provinceId = params['id'];
					this.provinceService.fetchSpecificProvince( this.provinceId )
					.subscribe(
						(response: Response) => {
							this.provinceData = response.json().provinces;
						}
					);
				},
				(error: Response) => {
					console.log(error);
				},
				() => { }
			);
		}
	}
	
	onSubmit(createProvinceForm: NgForm) {
		this.showLoader = true;
		if( this.editMode ) {
			
			const province_id: number = this.provinceData.id;
			const pastor_id:number = this.provinceData.user_id;

			this.provinceService.editProvince( province_id, pastor_id, createProvinceForm.value )
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
					//createProvinceForm.reset();
					this.responseReceived = true;
					setTimeout( () => {
						this.responseReceived = false;
					}, 3000 )
				}
			);
		} else {
			this.provinceService.createProvince( createProvinceForm.value )
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
					//console.log( error );
					this.showLoader = false;
					this.responseStatus = false;
					this.responseReceived = true;
					this.responseMsg = error.json().error;
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
	
	onReset(createProvinceForm: NgForm) {
		createProvinceForm.reset();
	}
}