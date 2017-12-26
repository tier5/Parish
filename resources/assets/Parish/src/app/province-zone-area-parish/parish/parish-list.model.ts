export class ParishListModel {
	
	constructor( public id: number,
				 public user_status: any,
                 public hold:any,
                 public province_id: number,
                 public zone_id: number,
                 public area_id: number,
	             public user_id: number,
	             public parish_id: number,
	             public parish_name: string,
	             public province_name: string,
	             public zone_name: string,
	             public area_name: string,
	             public password: string,
				 public pastor_name_area: string,
				 public pastor_name_zone: string,
				 public pastor_name_province: string,
	             public first_name: string,
	             public last_name: string,
	             public start_date: any,
				 public penalty : number,
				 public penalty_amount  : number,
				 public payment_status  : number) { }
				 
	             
}













