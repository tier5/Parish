/** Show and update logged in users profile */

import { Component } from "@angular/core";
import { NgForm } from '@angular/forms';
import {Response} from "@angular/http";

import { AuthService } from "../../auth/auth.service";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { WemService } from "../wem.service";


@Component({
    selector: 'app-wem',
    templateUrl: './wem.component.html',
    styleUrls: ['./wem.component.css']
})

export class WemComponent{

    profileData = {

        id          : 0,
        user_id     : 0,
        last_name   : '',
        uniqueKey   : '',
        first_name  : '',
        parish_id   : ''
    };

    responseReceived    : boolean = false;
    responseStatus      : boolean = false;
    activateReset       : boolean = true;
    responseMsg         : string  = '';

    showLoader          : boolean = false;
    isAdmin             : boolean = false;

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

        this.activatedRoute.params.subscribe(
            (params: Params) => {
                // this.wemService.profileToEdit()
                //     .subscribe(
                //         (response: Response) => {
                //             this.profileData = response.json().userDetail;
                //         }
                //     );
            },
            (error: Response) => {
                if( error.status === 401) {
                    this.authService.removeToken();
                    this.router.navigate( ['/login'] );
                }
                this.responseStatus = false;
                this.responseMsg = error.json().error;
            },
            () => { }
        );
    }
}