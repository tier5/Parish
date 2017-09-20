import { AttendanceModel } from './attendance.model';
import { MonetaryModel } from './monetary.model';
import { DayModel } from './day.model';

export class WeeklyModel {
	
	constructor( public weekly_total: {
					 attendance: AttendanceModel,
					 monetary: MonetaryModel
				 },
	             public days: DayModel[] ) { }
}