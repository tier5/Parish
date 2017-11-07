import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { UploadPaymentComponent } from './upload-payment/upload-payment.component';
import { PaymentRoutingModule } from "./payment-routing.module";
import { FileSelectDirective, FileUploadModule } from "ng2-file-upload";
import { DpDatePickerModule } from 'ng2-date-picker';
import { ListPaymentComponent } from "./list-payment/list-payment.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
	declarations: [
		UploadPaymentComponent,
		ListPaymentComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		PaymentRoutingModule,
		FileUploadModule,
		DpDatePickerModule,
		SharedModule
	],
	providers: [],
	exports: [],
})
export class PaymentModule {

}