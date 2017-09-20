export class MonetaryModel {
	
	constructor( public offering: number,
	             public tithe: {
					 pastor: number,
		             general: number
				 },
	             public f_fruit: number,
	             public t_giving: number,
	             public total: number ) { }
	
}