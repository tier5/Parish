import { Component, Input,ViewChild} from '@angular/core';
import { NgForm } from "@angular/forms";
import { ProvinceZoneAreaParishService } from '../../province-zone-area-parish/province-zone-area-parish.service';
import { PaymentService } from "../../payment-details/payment.service";
import { CsvService } from "../../csv-upload/csv.service";
import { ReportService} from "../../report/report.service";
import { AuthService } from "../../auth/auth.service";
import { FileUploader } from 'ng2-file-upload';
import { IDatePickerConfig } from "ng2-date-picker";
import { Response } from '@angular/http';



@Component({
	selector: 'app-prompt',
	templateUrl: './prompt.component.html',
	styleUrls: [ './prompt.component.css' ]
})
export class PromptComponent {
	paymentDate = {};


	@ViewChild('fileInput') fileInput;

    showLoader              = false;
    responseStatus          = false;
    responseReceived        = false;
    responseMsg : string    = '';
    progress    : number    = 0;
    files       : FileList;
	length                  = false;
    uploader                = new FileUploader({});

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
	
	@Input('calledFrom') calledFrom;
	@Input('itemInfo') itemInfo;
	@Input('itemText') itemText;
	
	constructor( private pzapService: ProvinceZoneAreaParishService,
	             private payservice: PaymentService,
	             private csvservice: CsvService,
	             private reportservice: ReportService,
				 private authService : AuthService	) { }



	hidePrompt() {
		this.pzapService.closePromptEvent.next();
		this.payservice.closePromptEvent.next();
		this.csvservice.closePromptEvent.next();
		this.reportservice.closePromptEvent.next();

	}
	deletePrompt(){
		this.pzapService.deleteEvent.next( this.itemInfo.id );
		this.payservice.deleteEvent.next( this.itemInfo.id );
	}
	
	proceedPrompt(){
		this.csvservice.showPromptEvent.next(this.itemInfo);
		this.payservice.showPromptEvent.next(this.itemInfo);
		this.reportservice.showPromptEvent.next(this.itemInfo);
	}



	onSubmitPayment(uploadPaymentProof: NgForm) {
        this.progress       = 30;
        var payment_date    = new Date(uploadPaymentProof.value.payment_date);
		var month           = payment_date.getMonth()+1;
		const user_id       = this.authService.getToken().user_id;
		const year_data     = payment_date.getFullYear().toString();
		const month_data    = month.toString();
		const formData      = new FormData();

		formData.append("name",this.files[0]);
		formData.append("upload_month",month_data);
		formData.append('upload_year', year_data);
		formData.append("payment_description", uploadPaymentProof.value.payment_description);
		formData.append("user_id", user_id);

        this.payservice.paymentCreate(formData)
            .subscribe(
                (response: Response) => {
                    console.log(response.json().status);
                    this.responseReceived   = true;
                    this.responseStatus     = response.json().status;
                    this.showLoader         = false;
                    if(response.json().status){
                        this.progress       = 100;
                        this.responseMsg    = response.json().message;
                    }
                },(error: Response) => {
                    console.log(error.json());

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
                        uploadPaymentProof.reset();
                    }, 5000);
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

    resetPaymentForm(uploadPaymentProof: NgForm){
        uploadPaymentProof.reset();
        this.progress   = 0;
    }
}