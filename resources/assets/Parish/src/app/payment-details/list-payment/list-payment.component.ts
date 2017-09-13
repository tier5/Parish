/** Component to handle list of payment */

import { Component } from "@angular/core";
import { Router } from "@angular/router";

import { PaymentService } from "../payment.service";
import { Subscription } from "rxjs/Subscription";
import { Response } from '@angular/http';
import { AuthService } from "../../auth/auth.service";
import { FileUploader } from 'ng2-file-upload';


@Component({
	selector: 'app-list-payment',
	templateUrl: './list-payment.component.html',
	styleUrls   : [ './list-payment.component.css' ]
})


export class ListPaymentComponent {
	
	responseStatus                  = false;
	responseReceived                = false;
	responseMsg     : string        = '';
	public isAdmin  : boolean       = false;
	
	paymentDetails                  = [];
	uploader                        = new FileUploader({});
	
	refreshPaymentListSubscription  : Subscription;
	showUploadButton                : number =  0 ;
	progress                        : number =  0 ;
	
	
	/** Injecting services to be used in this component */
	constructor( private payservice: PaymentService,
	             private router: Router,
	             private authService: AuthService ) { }
	
	ngOnInit() {
		
		/** Subscribe to event to refresh province list */
		this.refreshPaymentListSubscription = this.payservice.refreshList
			.subscribe(
				() => {
					this.payservice.listPayment().subscribe(
						(response: Response) => {
							this.responseStatus = response.json().status;
							console.log(response.json());
							if(response.json().status){
								const user_type = this.authService.getToken().user_type;
								
								if(user_type == 1){
									this.isAdmin = true;
								}
								this.paymentDetails = response.json().paymentDetail;
							} else {
								this.paymentDetails = [];
							}
						},
						(error: Response) => {
							this.responseStatus = false;
							this.responseReceived = true;
							this.paymentDetails = [];
							this.responseMsg = error.json().error;
						}
					);
				}
			);
		
		/** Emitting event which will refresh the province list */
		this.payservice.refreshList.next();
	}
	
	/** upload doc Function */
	
	upload(payment){
		console.log(this.uploader.queue[0]._file);
		this.progress = 10;
		const user_id       = this.authService.getToken().user_id;
		const formData      = new FormData();
		formData.append("file_name", this.uploader.queue[0]._file);
		formData.append("upload_month",payment.upload_month);
		formData.append('upload_year',payment.upload_year);
		formData.append("payment_description",payment.payment_description);
		formData.append("user_id", user_id);
		this.payservice.paymentCreate(formData)
			.subscribe(
				(response: Response) => {
					this.responseStatus = response.json().status;
					if(response.json().status){
						this.progress = 100;
						console.log(response.json().message);
					}
				}
			);
	}
	
	/** Show upload button when try to upload any doc */
	
	showUploader(payment){
		this.showUploadButton = payment.id;
	}
	
	/** Download file function */
	
	downloadFile(fileName) {
		
		var a = document.createElement("a");
		document.body.appendChild(a);
		let blob = new Blob([fileName], {type: "image/png"});
		let url = window.URL.createObjectURL(blob);
		a.href = url;
		a.download = fileName;
		a.click();
		window.URL.revokeObjectURL(url);
	}
	
	/** Change status of Payment **/
	
	OnChangeStatus(payment,status){
		let setpaymentArray = [
			{ id: payment.id, payment_status: status}
		];
		
		this.payservice.paymentChangeStatus(setpaymentArray[0])
			.subscribe(
				(response: Response) => {
					this.responseReceived   = true;
					this.responseStatus = response.json().status;
					if ( response.json().status ) {
						this.responseMsg = response.json().message;
					} else {
						this.responseMsg = '';
					}
					this.payservice.refreshList.next();
				}
			);
	}
}