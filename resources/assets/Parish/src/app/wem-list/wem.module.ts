/** module to load component and route for show and edit profile **/

import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { FormsModule } from "@angular/forms";
import { WemRoutingModule } from "./wem-routing.module";
import { WemComponent } from "./wem/wem.component";


@NgModule({
    declarations: [ WemComponent ],
    imports: [
        CommonModule,
        FormsModule,
        WemRoutingModule
    ],
    providers: []
})

export class WemModule { }