import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpModule } from "@angular/http";

import { SubscriptionComponent } from './subscription.component';
import { SubscriptionService } from "./subscription.service";

@NgModule({
  imports: [
    CommonModule,
    HttpModule
  ],
  exports: [ SubscriptionComponent ],
  declarations: [ SubscriptionComponent ],
  providers: [ SubscriptionService ]
})
export class SubscriptionModule { }
