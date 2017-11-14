/** Show and update logged in users profile */

import { Component } from "@angular/core";
import { NgForm } from '@angular/forms';
import {Response} from "@angular/http";

import { AuthService } from "../../auth/auth.service";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { WemService } from "../wem.service";
import {Subscription} from "rxjs/Subscription";


@Component({
    selector: 'app-wem',
    templateUrl: './wem.component.html',
    styleUrls: ['./wem.component.css']
})

export class WemComponent{

    wemData = [];

    responseReceived    : boolean = false;
    responseStatus      : boolean = false;
    activateReset       : boolean = true;
    responseMsg         : string  = '';

    showLoader          : boolean = false;
    isAdmin             : boolean = false;
	refreshWemListSubscription  : Subscription;

    /** Injecting services to be used in this component */
    constructor( private wemService: WemService,
                 private activatedRoute: ActivatedRoute,
                 private authService: AuthService,
                 private router: Router
    ) { }

    ngOnInit() {
        /** checking for admin */
        const user_type = this.authService.getToken().user_type;
        if(user_type ==1){
            this.isAdmin = true;
        }
        /** Subscribe to event to refresh wem list */

	
	    this.refreshWemListSubscription = this.wemService.refreshList
		    .subscribe(
			    () => {
				    this.wemService.listWEM()
					    .subscribe(
						    (response: Response) => {
							    this.wemData = response.json().wem;
							    this.wemData .forEach(item => {
								    let user_status = (item.status == 0) ? 'On Hold' : 'On Exemption';
								    item.status_user = user_status;
								    item.hold   = (item.status == 0) ? false : true;
							    });
						    },
						    (error: Response) => {
								    if ( error.status === 401 ) {
									    this.authService.removeToken();
									    this.router.navigate( [ '/login' ] );
								    }
								    this.responseStatus     = false;
								    this.responseReceived   = true;
								    this.wemData            = [];
								    this.responseMsg        = error.json().error;
				            }
					    );
			    }
		    );
	    /** Emitting event which will refresh the payment list */
	    this.wemService.refreshList.next();
    }
	
	/** Function to change status of WEM by superadmin */
    changeUserStatus(wem){
        this.wemService.changeStatus(wem)
        .subscribe(
            (response: Response) => {
	            this.responseStatus = response.json().status;
	            this.responseMsg = response.json().message;
	            this.wemService.refreshList.next( {} );
            },
	        (error: Response) => {
		        if ( error.status === 401 ) {
			        this.authService.removeToken();
			        this.router.navigate( [ '/login' ] );
		        }
		        this.responseStatus     = false;
		        this.responseReceived   = true;
		    }
        );
    }
	
	/** Function to add percentage for WEM by superadmin */
	updatePercentage(wem){
		this.wemService.editWemPercentage( wem )
			.subscribe(
				( response: Response ) => {
					this.responseStatus = response.json().status;
					
					if ( response.json().status ) {
						this.responseStatus = true;
						this.responseMsg = response.json().message;
					} else {
						this.responseMsg = '';
					}
				},
				( error: Response ) => {
					if( error.status === 401) {
						this.authService.removeToken();
						this.router.navigate( ['/login'] );
					}
					
					this.responseStatus = false;
					this.responseReceived = true;
					this.responseMsg = error.json().error;
					setTimeout( () => {
						this.responseReceived = false;
					}, 3000 )
				},
				() => {
					this.responseReceived = true;
					setTimeout( () => {
						this.responseReceived = false;
					}, 3000 )
				}
			);
	}
	
	/** Un-subscribing from all custom made events when component is destroyed */
	ngOnDestroy() {
		this.refreshWemListSubscription.unsubscribe();
	}
}