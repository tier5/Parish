/** Component to upload new payment */

import { Component, ViewChild } from "@angular/core";

import { AuthService } from "../../auth/auth.service";
import { NgForm } from "@angular/forms";
import { FileUploader } from 'ng2-file-upload';
import { PaymentService } from "../payment.service";
import { Response } from '@angular/http';
import {IDatePickerConfig} from "ng2-date-picker";
import {ProvinceZoneAreaParishService} from "../../province-zone-area-parish/province-zone-area-parish.service";

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
	progress    : number    = 0;
	uploader                = new FileUploader({});
	files       : FileList;
	length                  = false;

	config                         : IDatePickerConfig   = {
		firstDayOfWeek: 'su',
		monthFormat: 'MMM, YYYY',
		disableKeypress: false,
		allowMultiSelect: false,
		closeOnSelect: undefined,
		closeOnSelectDelay: 100,
		onOpenDelay: 0,
		weekDayFormat: 'ddd',
		appendTo: document.body,
		drops: 'down',
		opens: 'right',
		showNearMonthDays: false,
		showWeekNumbers: false,
		enableMonthSelector: true,
		yearFormat: 'YYYY',
		showGoToCurrent: true,
		dayBtnFormat: 'DD',
		monthBtnFormat: 'MMM',
		hours12Format: 'hh',
		hours24Format: 'HH',
		meridiemFormat: 'A',
		minutesFormat: 'mm',
		minutesInterval: 1,
		secondsFormat: 'ss',
		secondsInterval: 1,
		showSeconds: false,
		showTwentyFourHours: false,
		timeSeparator: ':',
		multipleYearsNavigateBy: 10,
		showMultipleYearsNavigation: false,
		locale: 'en'
	};
	
	/** Injecting services to be used in this component */
	constructor( private payservice: PaymentService,
	             private authService: AuthService) { }
	
	/** Function call when form is submitted */
	onSubmit(uploadPaymentForm: NgForm) {
		
		this.showLoader     = true;
		this.progress       = 30;
		var payment_date    = new Date(uploadPaymentForm.value.payment_date);
		var month           = payment_date.getMonth()+1;
		const user_id       = this.authService.getToken().user_id;
		const year_data     = payment_date.getFullYear().toString();
		const month_data    = month.toString();
		const formData      = new FormData();
		
		formData.append("name",this.files[0]);
		formData.append("upload_month",month_data);
		formData.append('upload_year', year_data);
		formData.append("payment_description", uploadPaymentForm.value.payment_description);
		formData.append("user_id", user_id);
		
		this.payservice.paymentCreate(formData)
			.subscribe(
				(response: Response) => {
					
					this.responseReceived   = true;
					this.responseStatus     = response.json().status;
					this.showLoader         = false;
					if(response.json().status){
						this.progress       = 100;
						this.responseMsg    = response.json().message;
					}
				},(error: Response) => {
					this.showLoader         = false;
					this.responseStatus     = false;
					this.responseReceived   = true;
					this.responseMsg        = error.json().error;
				},
			 	() => {
                        
                        setTimeout( () => {
                            this.progress           = 0;
                            this.responseReceived   = false;
                            this.showLoader    		= false;
                            uploadPaymentForm.reset();
                        }, 60000);
                    }
			);
	}
	
	/** function to set files to be uploaded and increase progressbar */
	checkUploadedFileType(event){
		this.progress   = 10;
		this.files      = event.target.files;
		if(this.files.length > 0 ){
			this.length = true;
		}else{
			this.length = false;
		}
	}


	/** function to reset upload payment form */
	onReset(uploadPaymentForm: NgForm) {
        uploadPaymentForm.reset();
        this.progress   = 0;
        this.length 	= false;
        this.showLoader = false;
	}
	
}