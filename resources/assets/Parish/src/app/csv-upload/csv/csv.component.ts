/** Show and update logged in users profile */

import { Component } from "@angular/core";
import { NgForm } from '@angular/forms';
import {Response} from "@angular/http";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { CsvService } from "../csv.service";
import { AuthService } from "../../auth/auth.service";
import { environment } from "../../../environments/environment.prod";
import { FileUploader } from 'ng2-file-upload';
import { Subscription } from "rxjs/Subscription";

@Component({
	selector: 'app-csv',
	templateUrl: './csv.component.html',
	styleUrls: ['./csv.component.css']
})

export class CsvComponent{
	
	
	responseReceived    : boolean = false;
	responseStatus      : boolean = false;
	activateReset       : boolean = true;
	showProceedPrompt   : boolean = false;
	responseMsg         : string  = '';
	promptMsg           : string  = '';
	length                        = false;
	showLoader          : boolean = false;
	showSpinner         : boolean = false;
	isAdmin             : boolean = false;
	base_url            : string  = environment.base_url;
	files               : FileList;
	progress            : number  = 0;
	uploader                      = new FileUploader({});
	toProceedCharge = [];
	
	closePromptEventSubscription    : Subscription;
	proceedPromptEventSubscription    : Subscription;
	csvData = [];
	/** Injecting services to be used in this component */
	constructor( private CsvService: CsvService,
	             private activatedRoute: ActivatedRoute,
	             private authService: AuthService,
	             private router: Router
	) { }
	
	ngOnInit() {
		/** checking for admin */
		const user_type = this.authService.getToken().user_type;
		this.csvData['file_name'] = 'sample.csv';
		if(user_type ==1){
			this.isAdmin = true;
		}
		
		/** Subscribe to event to close the delete prompt */
		this.closePromptEventSubscription = this.CsvService.closePromptEvent
			.subscribe(
				() => {
					this.showProceedPrompt = false;
				}
			);
		
		/** Subscribe to event to delete an parish */
		
		this.proceedPromptEventSubscription = this.CsvService.showPromptEvent
			.subscribe(
				(itemInfo: any) => {
					this.showProceedPrompt = false;
					const csv_info = {
						parishCount : itemInfo.parishCount,
						data: itemInfo.data
					};
					this.showSpinner = true;
					this.CsvService.proceedCharge( csv_info ).subscribe(
						(response: Response) => {
							
							this.responseReceived   = true;
							this.responseStatus     = response.json().status;
							this.showSpinner = false;
							if( response.json().status ) {
								
								this.responseMsg = response.json().message;
							} else {
								this.responseMsg    = response.json().message;
							}
							setTimeout( () => {
								this.responseReceived = false;
							}, 3000 )
						},
						(error: Response) => {
							this.showSpinner = false;
							if ( error.status === 401 ) {
								this.authService.removeToken();
								this.router.navigate( [ '/login' ] );
							}
							
							this.responseReceived   = true;
							this.responseMsg        = error.json().error_info;
							setTimeout( () => {
								this.responseReceived = false;
							}, 3000 )
						}
					);
				}
			);
	}
	
	/** Function call when form is submitted */
	onSubmit(insertCsvForm: NgForm) {
		
		this.showLoader     = true;
		this.progress       = 30;
		const user_id       = this.authService.getToken().user_id;
		const formData      = new FormData();
		formData.append("file",this.files[0]);
		formData.append("user_id", user_id);
		
		this.CsvService.uploadCsv(formData)
			.subscribe(
				(response: Response) => {
					this.responseStatus     = response.json().status;
					this.showLoader         = false;
					if(response.json().status){
						
						this.progress       = 100;
						this.promptMsg      = response.json().message;
						var csvInfo = [];
						csvInfo['data']        = response.json().allData;
						csvInfo['parishCount'] = response.json().parishCount;
						if(response.json().parishCount > 0) {
							this.responseReceived   = false;
							this.showPrompt(csvInfo);
						} else {
							this.progress   = 0;
							this.length 	= false;
							this.responseReceived   = true;
							this.responseMsg        = response.json().message;
						}
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
						insertCsvForm.reset();
					}, 3000);
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
	onReset(insertCsvForm: NgForm) {
		insertCsvForm.reset();
		this.progress   = 0;
		this.length 	= false;
		this.showLoader = false;
	}
	
	/** Function call to show delete prompt */
	showPrompt(csvInfo) {
		this.toProceedCharge = csvInfo;
		this.showProceedPrompt = true;
		this.progress   = 0;
		this.length 	= false;
	}
	
	/** Function to download CSV */
	
	downloadCsv() {
		
		var uri = 'data:application/csv;charset=utf-8,';
		var link = document.createElement("a");
		link.href = this.base_url+'/sample-csv/sample.csv';
		link.download = "test.csv";
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	}
	
	
	/** Un-subscribing from all custom made events when component is destroyed */
	ngOnDestroy() {
		this.closePromptEventSubscription.unsubscribe();
		this.proceedPromptEventSubscription.unsubscribe();
	}
}