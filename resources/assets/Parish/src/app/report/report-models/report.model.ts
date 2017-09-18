import { WeeklyModel } from './weekly.model';
import { AttendanceModel } from './attendance.model';
import { MonetaryModel } from './monetary.model';

export class ReportModel {
	
	constructor( public monthly_total: {
		             attendance: AttendanceModel,
		             monetary: MonetaryModel
	             },
	             public weekly: WeeklyModel[] ) { }
	             
}