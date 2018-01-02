/**
 * Created by mohma on 7/26/2017.
 */
import {Component, OnInit} from '@angular/core';
import { Response} from "@angular/http";
import {StatsCard} from "../components/statsCard/statsCard";
import {PieChart} from "../components/pieChart/pieChart";
import { Subscription } from 'rxjs/Subscription';
import { DashboardService } from './dashboard.service';
import { AuthService } from "../auth/auth.service";


@Component({
  templateUrl: './dashboard.component.html',
  selector:'dashboard',
  styleUrls:['./dashboard.scss']
})
export class DashboardComponent implements OnInit{


  /** Injecting services to be used in this component */
  constructor(private dashboardService: DashboardService,
               private authService: AuthService) { }


  public chartHeight=35;

  refreshDashboardSubscription   : Subscription;
  currentMonth : number;
  superAdmin: boolean = false;
  wem: boolean = false;
  showZone: boolean = false;
  showArea: boolean = false;
  isParish: boolean = false;
  loadder:boolean   = false;
  
  lineChartLabels:Array<any> = [];
	
  lineChartMonths:Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July','August','September','October','November','December'];

  month : number;
  ChartOptions:any ;
  public barChartLegend:boolean = true;
	
	
	// lineChart
	lineChartData:Array<any> = [
		{data: [], label: 'Compliance Parishes'},
		{data: [], label: 'Non-Compliance Parishes'}
	];
	lineChartType:string = 'bar';
	
	
	
	// events
	 chartClicked(e:any):void {
		console.log(e);
	}
	
	chartHovered(e:any):void {
		console.log(e);
	}
	
	lineChartColors: any[] = [
		{
			backgroundColor:["#ff0000", "#00ff00"],
	}];

  //Timeline Related
  public completeListener(item){
    console.log(item);
    return true;
  }
  public timelineData:Array<Object> =[
    {
      title:"Step 1",
      icon:'<i class="fa fa-home"></i>',
      content:"Hello World",
      complete:true
    },
    {
      title:"Step 2",
      icon:'<i class="fa fa-pencil"></i>',
      content:"Welcome World",
      complete:false
    }
  ];
	
	
	
	//Card
	
	public card1:StatsCard={color:"#1ebfae",icon:"fa-users",label:"WEM",data:0};
	public card2:StatsCard={color:"#30a5ff",icon:"fa-users",label:"Province Pastor",data:0};
	public card3:StatsCard={color:"#ffb53e",icon:"fa-users",label:"Zone Pastor",data:0};
	public card4:StatsCard={color:"#f9243f",icon:"fa-users",label:"Area Pastor",data:0};
	public card5:StatsCard={color:"#f9243f",icon:"fa-users",label:"Parish",data:0};
	public card6:StatsCard={color:"#f9243f",icon:"fa-money",label:"Total Payment",data:0};
	public card7:StatsCard={color:"#f9243f",icon:"fa-file",label:"Total Report",data:0};
	public card8:StatsCard={color:"#30a5ff",icon:"fa-cogs",label:"On Exemption",data:0};
	public card9:StatsCard={color:"#1ebfae",icon:"fa-cogs",label:"On hold",data:0};

  ngOnInit(): void {
    let self=this;
	this.ChartOptions = {
		scaleShowVerticalLines: false,
		responsive: true,
		mainAspectRatio:true,
		scales: {
			yAxes: [
				{ ticks: {min: 0} }]
		}
		
	};
	
	this.loadder  = false;
	this.isParish = false;
	
	/** Subscribe to event to get chart data */

    this.refreshDashboardSubscription = this.dashboardService.refreshList
        .subscribe(
            () => {
              this.dashboardService.getChartData()
	              .subscribe(
                  (response: Response) => {
                    if(response.json().status) {
	                    this.currentMonth = response.json().month;
	
	                    this.lineChartLabels.push(this.lineChartMonths[this.currentMonth-1]);
	                   
		                    // lineChart
	                    this.lineChartData= [
		                    {data: [response.json().parishesCompliance], label: 'Compliance Parishes'},
		                    {data: [response.json().parishesNonCompliance], label: 'Non-Compliance Parishes'}
	                    ];
	                    
	                    this.ChartOptions.scales= {
			                    yAxes: [
			                    	{ ticks: {min: 0, max: response.json().totalParishes}}]
	                    } ;
	                    
                    }
   
                  },
                  (error: Response) => {
	                  console.log(error.json());
                  }
              );
	
	            this.dashboardService.getUserCount()
		            .subscribe(
			            (response: Response) => {
			            	
				            if(response.json().status) {
					          
				                    if(response.json().user_type == 'Province') {
						                this.loadder  = true;
						                this.showArea = true;
						                this.showZone = true;
						                this.isParish = false;
										this.card3    = {color:"#ffb53e",icon:"fa-users  fa fa-3x fa-fw",label:"Zone Pastor",data:response.json().userCount.zone};
										this.card4    = {color:"#f9243f",icon:"fa-users  fa fa-3x fa-fw",label:"Area Pastor",data:response.json().userCount.area};
										this.card5    = {color:"#f9243f",icon:"fa-users  fa fa-3x fa-fw",label:"Parish",data:response.json().userCount.parish };
							          
						            } else if(response.json().user_type == 'Zone') {
							            this.loadder  = true;
							            this.showArea = true;
							            this.showZone = false;
							            this.isParish = false;
							            this.card4    = {color:"#f9243f",icon:"fa-users  fa fa-3x fa-fw",label:"Area Pastor",data:response.json().userCount.area};
							            this.card5    = {color:"#f9243f",icon:"fa-users  fa fa-3x fa-fw",label:"Parish",data:response.json().userCount.parish};
						            } else if(response.json().user_type == 'area') {
							           this.loadder  = true;
							           this.showArea = false;
							           this.showZone = false;
							           this.isParish = false;
							           this.card5    = {color:"#f9243f",icon:"fa-users  fa fa-3x fa-fw",label:"Parish",data:response.json().userCount.parish};
						            } else if(response.json().user_type == 'Super-admin') {
							           this.loadder  = true;
							           this.superAdmin = true;
							           this.isParish = false;
							           this.card1    = {color:"#1ebfae",icon:"fa-users fa fa-3x fa-fw",label:"Subscriber",data:response.json().userCount.wem};
							           this.card2    = {color:"#30a5ff",icon:"fa-users  fa fa-3x fa-fw",label:"Province Pastor",data:response.json().userCount.province};
							           this.card3    = {color:"#ffb53e",icon:"fa-users  fa fa-3x fa-fw",label:"Zone Pastor",data:response.json().userCount.zone};
							           this.card4    = {color:"#f9243f",icon:"fa-users  fa fa-3x fa-fw",label:"Area Pastor",data:response.json().userCount.area};
							           this.card5    = {color:"#f9243f",icon:"fa-users  fa fa-3x fa-fw",label:"Parish",data:response.json().userCount.parish};
				                       this.card8    = {color:"#30a5ff",icon:"fa-cogs",label:"Subscriber On Exemption",data:response.json().userCount.wem_on_exemption};
				                       this.card9    = {color:"#1ebfae",icon:"fa-cogs",label:"Subscriber On hold",data:response.json().userCount.wem_on_hold};
				                    } else if(response.json().user_type == 'WEM') {
							           this.loadder  = true;
							           this.wem = true;
							           this.isParish = false;
							           this.card2={color:"#30a5ff",icon:"fa-users  fa fa-3x fa-fw",label:"Province Pastor",data:response.json().userCount.province};
							           this.card3={color:"#ffb53e",icon:"fa-users  fa fa-3x fa-fw",label:"Zone Pastor",data:response.json().userCount.zone};
							           this.card4={color:"#f9243f",icon:"fa-users  fa fa-3x fa-fw",label:"Area Pastor",data:response.json().userCount.area};
							           this.card5={color:"#f9243f",icon:"fa-users  fa fa-3x fa-fw",label:"Parish",data:response.json().userCount.parish};
						            } else {
							           this.loadder  = false;
							           this.isParish = true;
							           this.card6={color:"#ffb53e",icon:"fa-money  fa fa-3x fa-fw",label:"Total Payment",data:response.json().userCount.payment};
							           this.card7={color:"#30a5ff",icon:"fa-file  fa fa-3x fa-fw",label:"Total Report",data:response.json().userCount.report};
						            }
					        }
						},
			            (error: Response) => {
				            console.log(error.json());
			            }
		            );
            }
        );
	
	  
    /** Emitting event which will refresh the chart data  */
    this.dashboardService.refreshList.next({});
	
	  setTimeout(function(){
		  self.timelineData.push({
			  title:"Step 3",
			  icon:'<i class="fa fa-remove"></i>',
			  content:"Bye World",
			  complete:false
		  });
	  },5000);
	
  }
  

	
	//ProgressBars
  public pbar1:PieChart={color:"#1ebfae",max:100,label:"Load",current:2};
  public pbar2:PieChart={color:"#30a5ff",max:100,label:"Traffic",current:20};
  public pbar3:PieChart={color:"#ffb53e",max:100,label:"Users",current:50};
  public pbar4:PieChart={color:"#f9243f",max:100,label:"RAM",current:57};


 

  //News Component
  public newsList:Array<Object> =[
    {
      large:"30",
      small:"Jun",
      link:"http://www.aebiss.com",
      title:"AEBISS",
      content:"Fullstack development, IoT, Blockchain related services in the U.A.E"
    },
    {
      large:"1",
      small:"Jul",
      link:"http://www.tayar.ae",
      title:"Tayar",
      content:"One device that let you control any electrical device at home"
    },
    {
      large:"1",
      small:"Jul",
      link:"http://www.wavex.io",
      title:"WaveX",
      content:"Blockchain based electricity trading platform"
    }
  ]
}


