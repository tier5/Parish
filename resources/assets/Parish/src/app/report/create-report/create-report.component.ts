import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
	selector: 'app-create-report',
	templateUrl: './create-report.component.html',
	styleUrls: [ './create-report.component.css' ]
})
export class CreateReportComponent implements OnInit {
	
	@ViewChild('tdForm') tdForm: NgForm;
	response = {
		datas: [
			{
				numOne: null,
				numTwo: null,
				numFinal: null
			},
			{
				numOne: null,
				numTwo: null,
				numFinal: null
			},
			{
				numOne: null,
				numTwo: null,
				numFinal: null
			}
		],
		result: {
			resNumOne: null,
			resNumTwo: null,
			resNumFinal: null,
		}
	};
	
	mprd = {
		"account_name": "",
		"parish_id": "",
		"parish_pastor": "",
		"area_pastor": "",
		"zonal_pastor": "",
		"province_pastor": "",
		"month": "",
		"year": "",
		"report": {
			"monthly_total": {
				"attendance": {
					"men": null,
					"women": null,
					"children": null,
					"total": null
				},
				"monetary": {
					"offering": null,
					"tithe": {
						"pastor": null,
						"general": null,
					},
					"f_fruit": null,
					"t_giving": null,
					"total": null
				}
			},
			"weekly": [{
				"week_total": {
					"attendance": {
						"men": null,
						"women": null,
						"children": null,
						"total": null
					},
					"monetary": {
						"offering": null,
						"tithe": {
							"pastor": null,
							"general": null,
						},
						"f_fruit": null,
						"t_giving": null,
						"total": null
					}
				},
				"days":[
					{
						"date": "",
						"day": "",
						"programmes": null,
						"attendance": {
							"men": null,
							"women": null,
							"children": null,
							"total": null
						},
						"monetary": {
							"offering": null,
							"tithe": {
								"pastor": null,
								"general": null,
							},
							"f_fruit": null,
							"t_giving": null,
							"total": null
						}
					}
				]
			}]
		}
	};
	
	constructor() { }
	
	ngOnInit() {
		
		// this.tdForm.valueChanges
		// .subscribe(
		// 	(response) => {
		// 		console.log(this.response.datas);
		// 		let resNumOne = 0;
		// 		let resNumTwo = 0;
		// 		let resNumFinal = 0;
		//
		// 		for(let i = 0; i < this.response.datas.length; i++ ) {
		//
		// 			this.response.datas[i].numFinal = this.response.datas[i].numOne + this.response.datas[i].numTwo;
		//
		// 			resNumOne = resNumOne + this.response.datas[i].numOne;
		// 			resNumTwo = resNumTwo + this.response.datas[i].numTwo;
		// 			resNumFinal = resNumFinal + this.response.datas[i].numFinal;
		//
		// 		}
		//
		// 		this.response.result.resNumOne = resNumOne;
		// 		this.response.result.resNumTwo = resNumTwo;
		// 		this.response.result.resNumFinal = resNumFinal;
		// 	}
		// );
		
	}
	
}
