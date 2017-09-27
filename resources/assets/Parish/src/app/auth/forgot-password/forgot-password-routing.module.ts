import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ForgotPasswordComponent} from "./forgot-password.component";

const forgotPasswordRoutes: Routes = [
    { path: '', component: ForgotPasswordComponent }
];
@NgModule({
    imports: [ RouterModule.forChild( forgotPasswordRoutes )],
    exports: [ RouterModule ]
})
export class ForgotPasswordRoutingModule { }