import { AttendanceModel } from './attendance.model';
import { MonetaryModel } from './monetary.model';

export class DayModel {
	
	constructor( public date: string,
				 public day: string,
				 public programmes: string,
				 public attendance: AttendanceModel,
				 public monetary: MonetaryModel) { }
	
}