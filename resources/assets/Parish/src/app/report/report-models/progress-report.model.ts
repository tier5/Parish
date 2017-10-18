import { ReportModel } from './report.model';

export class ProgressReportModel {
	
	constructor( public account_name: string,
	             public wem_percentage: number,
	             public wem_share: number,
	             public area_dues: number,
	             public parish_id: number,
	             public province_pastor: string,
				 public zonal_pastor: string,
				 public area_pastor: string,
				 public parish_pastor: string,
				 public crucial_date: any,
				 public parish_start_date: any,
				 public month: string,
				 public year: string,
				 public no_of_birth: number,
				 public no_of_death: number,
				 public no_of_marrg: number,
				 public no_of_new_workers: number,
				 public no_of_souls_saved: number,
				 public report: ReportModel ) { }
	
}