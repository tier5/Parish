import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { UploadPaymentComponent } from './upload-payment/upload-payment.component';
import { PaymentRoutingModule } from "./payment-routing.module";
import { FileSelectDirective, FileUploadModule } from "ng2-file-upload";

@NgModule({
	declarations: [
		UploadPaymentComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		PaymentRoutingModule,
		FileUploadModule
		
	],
	providers: [],
	exports: [],
})
export class PaymentModule { }