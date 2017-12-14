/** Show and update logged in users profile */

import { Component } from "@angular/core";
import { NgForm } from '@angular/forms';
import {Response} from "@angular/http";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { CsvService } from "../csv.service";
import { AuthService } from "../../auth/auth.service";
import { environment } from "../../../environments/environment.prod";
import { FileUploader } from 'ng2-file-upload';
@Component({
	selector: 'app-csv',
	templateUrl: './csv.component.html',
	styleUrls: ['./csv.component.css']
})

export class CsvComponent{
	
	
	responseReceived    : boolean = false;
	responseStatus      : boolean = false;
	activateReset       : boolean = true;
	responseMsg         : string  = '';
	length                        = false;
	showLoader          : boolean = false;
	isAdmin             : boolean = false;
	base_url            : string  = environment.base_url;
	files               : FileList;
	progress            : number  = 0;
	uploader                      = new FileUploader({});
	
	
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
	}
	
	/** Function call when form is submitted */
	onSubmit(insertCsvForm: NgForm) {
		
		this.showLoader     = true;
		this.progress       = 30;
		const user_id       = this.authService.getToken().user_id;
		const formData      = new FormData();
		formData.append("name",this.files[0]);
		formData.append("user_id", user_id);
		this.CsvService.uploadCsv(formData)
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
}