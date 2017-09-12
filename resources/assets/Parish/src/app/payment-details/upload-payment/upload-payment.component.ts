/** Component to upload new payment */
import { Component, ViewChild } from "@angular/core";


import { AuthService } from "../../auth/auth.service";
import {NgForm} from "@angular/forms";
import { FileUploader } from 'ng2-file-upload';
import { PaymentService } from "../payment.service"
@Component({
	selector: 'app-upload-payment',
	templateUrl: './upload-payment.component.html',
	styleUrls: [ './upload-payment.component.css' ]
})

export class UploadPaymentComponent {
	
	paymentDate = {};
	
	@ViewChild('fileInput') fileInput;
	
	showLoader              = false;
	responseStatus          = false;
	responseReceived        = false;
	responseMsg : string    = '';
	uploader                = new FileUploader({});
	
	
	/** Injecting services to be used in this component */
	constructor( private payservice: PaymentService,
	             private authService: AuthService) { }
	             
	/** Function call when form is submitted */
	onSubmit(uploadPaymentForm: NgForm) {
		this.showLoader = true;
		var payment_date = new Date(uploadPaymentForm.value.payment_date);
		var month = payment_date.getMonth()+1;
		const user_id = this.authService.getToken().user_id;
		const year_data = payment_date.getFullYear().toString();
		const month_data = month.toString();
		const formData = new FormData();
		
		formData.append("file_name", this.uploader.queue[0]._file);
		formData.append("upload_month",year_data);
		formData.append('upload_year', month_data);
		formData.append("payment_description", uploadPaymentForm.value.payment_description);
		formData.append("user_id", user_id);
		this.payservice.paymentCreate(formData)
			.subscribe(
				(response: Response) => {
					this.showLoader = false;
					console.log(response);
				}
			);
	}
	
	
}