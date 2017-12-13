import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CsvComponent } from "./csv/csv.component";


const csvRoutes: Routes = [
	{ path: '', component: CsvComponent }
];

@NgModule({
	imports: [ RouterModule.forChild(csvRoutes) ],
	exports: [ RouterModule	]
})
export class CsvRoutingModule {}