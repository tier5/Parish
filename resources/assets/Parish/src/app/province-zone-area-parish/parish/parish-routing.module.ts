import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateParishComponent } from './create-parish/create-parish.component';
import { ListParishComponent } from './list-parish/list-parish.component';

const parishPoutes: Routes = [
	{ path: 'create', component: CreateParishComponent, data: { editMode: false } },
	{ path: 'list', component: ListParishComponent },
	{ path: 'edit/:id', component: CreateParishComponent, data: { editMode: true } }
];

@NgModule({
	imports: [ RouterModule.forChild(parishPoutes) ],
	exports: [ RouterModule ]
})
export class ParishRoutingModule { }