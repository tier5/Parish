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
  
  lineChartLabels:Array<any> = [];
	
  lineChartMonths:Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July','August','September','October','November','December'];

  month : number;
  ChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true,
    mainAspectRatio:true,
	  scales: {
		  yAxes: [
			  { ticks: {min: 0} }]
	  }
	
  };
	
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

  ngOnInit(): void {
    let self=this;
	
	  
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
	
  //Card

  public card1:StatsCard={color:"#1ebfae",icon:"fa-users",label:"Users",data:50};
  public card2:StatsCard={color:"#30a5ff",icon:"fa-cogs",label:"Items",data:80};
  public card3:StatsCard={color:"#ffb53e",icon:"fa-cogs",label:"Orders",data:90};
  public card4:StatsCard={color:"#f9243f",icon:"fa-cog",label:"Delivered",data:2};

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


