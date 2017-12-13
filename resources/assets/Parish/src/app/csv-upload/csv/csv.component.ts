/** Show and update logged in users profile */

import { Component } from "@angular/core";
import { NgForm } from '@angular/forms';
import {Response} from "@angular/http";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { CsvService } from "../csv.service";
import { AuthService } from "../../auth/auth.service";
import { environment } from "../../../environments/environment.prod";

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
	
	showLoader          : boolean = false;
	isAdmin             : boolean = false;
	base_url            : string  = environment.base_url;
	
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
}