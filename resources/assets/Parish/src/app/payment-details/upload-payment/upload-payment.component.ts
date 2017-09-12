import { ActivatedRoute } from "@angular/router";
import { Component, ViewChild } from "@angular/core";


import { AuthService } from "../../auth/auth.service";
import {NgForm} from "@angular/forms";
import { FileUploader } from 'ng2-file-upload';

@Component({
	selector: 'app-upload-payment',
	templateUrl: './upload-payment.component.html',
	styleUrls: [ './upload-payment.component.css' ]
})

export class UploadPaymentComponent {
	
	paymentDate = {};
	
	showLoader          = false;
	responseStatus      = false;
	responseReceived    = false;
	responseMsg: string = '';
	uploader = new FileUploader({});
	
	/** Function call when form is submitted */
	onSubmit(uploadPaymentForm: NgForm) {
		this.showLoader = true;
		console.log(uploadPaymentForm.value);
		console.log(this.uploader);
	}
}