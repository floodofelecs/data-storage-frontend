export class Sensor {
	// changed this
	constructor (
	public synthetic_id: number,
	public hardware_id: string,
	public install_date: Date,
	public location: {
		latitude: number,
		longitude: number
	},
	public removal_date?: Date
	) {}
}
