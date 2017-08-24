import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';

@Component({
	selector: 'app-edit-province-zone-area',
	templateUrl: './edit-province-zone-area.component.html',
	styleUrls: [ './edit-province-zone-area.component.css' ]
})
export class EditProvinceZoneAreaComponent implements OnInit{
	
	data: string = '';
	
	constructor( private activatedRoute: ActivatedRoute ) { }
	ngOnInit() {
		 // this.data = this.activatedRoute.snapshot.data['editMode'];
		 this.activatedRoute.data.subscribe(
			 (data: Data) => {
			 	this.data = data['editMode'];
			 }
		 );
	}
}