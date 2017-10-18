import { Component, HostListener, OnInit } from '@angular/core';
import { environment } from "../../environments/environment.prod";

import { SubscriptionService } from "./subscription.service";

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent implements OnInit {

    handler: any;
    amount = 500;

    constructor(private subscriptionService: SubscriptionService ) { }

    ngOnInit() {
        this.handler = StripeCheckout.configure({
            key: environment.stripeKey,
            image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
            locale: 'auto',
            token: token => {
                this.subscriptionService.processPayment(token, this.amount);
            }
        });
    }
    handlePayment() {
        this.handler.open({
            name: 'FireStarter',
            excerpt: 'Deposit Funds to Account',
            amount: this.amount
        });
    }

    @HostListener('window:popstate')
    onPopstate() {
        this.handler.close()
    }


}
