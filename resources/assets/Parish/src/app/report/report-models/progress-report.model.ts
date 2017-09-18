import { ReportModel } from './report.model';

export class ProgressReportModel {
	
	constructor( public account_name: string,
	             public parish_id: number,
	             public province_pastor: string,
				 public zonal_pastor: string,
				 public area_pastor: string,
				 public parish_pastor: string,
				 public crucial_date: string,
				 public month: string,
				 public year: string,
				 public report: ReportModel ) { }
	
}