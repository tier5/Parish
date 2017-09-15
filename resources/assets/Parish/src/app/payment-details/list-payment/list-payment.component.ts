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
	showUploadButton                : number        =  0 ;
	progress                        : number        =  0 ;
	files                           : FileList;

	
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
							
							if(response.json().status){
								const user_type = this.authService.getToken().user_type;
								if(user_type == 1){
									this.isAdmin = true;
								}
								this.paymentDetails = response.json().paymentDetail;
								this.paymentDetails.forEach(item => {
									let pay_status = (item.payment_status == 3)?'On Hold':(item.payment_status == 0)?'Accepted':'Rejected';
									item.pay_status = pay_status;
									if ( item.payment_status == 3 ){
										
										item.hold   = true;
										item.accept = false;
										item.reject = false;
										item.image  = "<img src='http://localhost:4200/paymentReceipt/"+item.file_name+"'>";
										
									} else if ( item.payment_status == 1 ){
										
										item.hold   = false;
										item.accept = false;
										item.reject = true;
										
									} else{
										
										item.hold   = false;
										item.accept = true;
										item.reject = false;
									}
								});
								
								console.log(this.paymentDetails);
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
		
		this.progress       = 10;
		const user_id       = this.authService.getToken().user_id;
		
		const formData      = new FormData();
		formData.append("name", this.files[0]);
		formData.append("upload_month",payment.upload_month);
		formData.append('upload_year',payment.upload_year);
		formData.append("payment_description",payment.payment_description);
		formData.append("user_id", user_id);
		
		this.payservice.paymentCreate(formData)
			.subscribe(
				(response: Response) => {
					this.responseStatus = response.json().status;
					if(response.json().status){
						this.progress           = 100;
						this.responseMsg        = response.json().message;
						this.responseReceived   = true;
					} else {
						this.responseMsg        = '';
					}
					this.payservice.refreshList.next();
				},(error: Response) => {
					this.progress           = 0;
					this.responseStatus     = false;
					this.responseReceived   = true;
					this.responseMsg        = error.json().error;
				}
			);
		
	}
	
	/** Show upload button when try to upload any doc */
	
	showUploader(payment,event){
		this.showUploadButton   = payment.id;
		this.files              = event.target.files;
		this.progress           = 10;
	}
	
	/** Download file function */
	
	downloadFile(payment) {
		
		/*var a = document.createElement("a");
		document.body.appendChild(a);
		let blob = new Blob([fileName], {type: "image/png"});
		let url = window.URL.createObjectURL(blob);
		a.href = url;
		a.download = fileName;
		a.click();
		window.URL.revokeObjectURL(url);*/
		this.payservice.downloadPaymentFile(payment)
			.subscribe(
				(response: Response) => {
					//this.responseStatus = response.json().status;
					console.log(response);
					var contentType = 'image/!*';
					var blob = new Blob([(<any>response).blob()], { type: contentType });
					var filename = payment.file_name;
					var url= window.URL.createObjectURL(blob);
					window.open(url);
					/*var fileName = payment.file_name;
					var a = document.createElement("a");
					document.body.appendChild(a);
					var file = new Blob([response], {type: 'image/jpg'});
					var fileURL = window.URL.createObjectURL(file);
					a.href = fileURL;
					a.download = fileName;
					a.click();
					
					 var blob = new Blob([response], {type:'image/!*'});
					 var url= window.URL.createObjectURL(blob);
					 window.open(url);*/
					/*var contentType = 'image/!*';
					var blob = new Blob([(<any>response)._body], { type: contentType });
					var url= window.URL.createObjectURL(blob);
					window.open(url);*/
					
				},(error: Response) => {
					this.progress           = 0;
					this.responseStatus     = false;
					this.responseReceived   = true;
					this.responseMsg        = error.json().error;
				}
			);
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
				},(error: Response) => {
					this.responseStatus = false;
					this.responseReceived = true;
					this.responseMsg = error.json().error;
				}
			);
	}
}