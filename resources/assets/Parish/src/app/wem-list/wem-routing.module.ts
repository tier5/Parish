import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

import {WemComponent} from "./wem/wem.component";

const wemRoutes: Routes = [
    { path: 'list', component: WemComponent }
];

@NgModule({
    imports: [ RouterModule.forChild(wemRoutes) ],
    exports: [ RouterModule	]
})
export class WemRoutingModule {}