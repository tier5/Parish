import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Response } from '@angular/http';

import { ProvinceService } from '../province.service';
import { AuthService } from '../../../auth/auth.service';

@Component({
	selector: 'app-create-province',
	templateUrl: './create-province.component.html',
	styleUrls: [ './create-province.component.css' ]
})
export class CreateProvinceComponent {
	
	showLoader = false;
	responseStatus = false;
	responseReceived = false;
	responseMsg: string = '';
	constructor(
		private provinceService: ProvinceService,
		private authService: AuthService
	) { }
	
	onSubmit(createProvinceForm: NgForm) {
		this.showLoader = true;
		this.provinceService.createProvince(createProvinceForm.value)
		.subscribe(
			( response: Response ) => {
				this.showLoader = false;
				if(response.json().status){
					this.responseStatus = true;
					this.responseMsg = response.json().message;
				} else {
					console.log(response);
					console.log(response.status);
				}
			},
			( error: Response ) => {
				if( error.status === 401) {
					this.authService.removeToken();
				}
				console.log(error);
				this.showLoader = false;
				this.responseStatus = true;
				this.responseReceived = true;
				this.responseMsg = error.json().error;
				setTimeout( () => {
					this.responseReceived = false;
				}, 3000)
			},
			() => {
				createProvinceForm.reset();
				this.responseReceived = true;
				setTimeout( () => {
					this.responseReceived = false;
				}, 3000)
			}
		);
	}
	
	onReset(createProvinceForm: NgForm) {
		createProvinceForm.reset();
	}
}