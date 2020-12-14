export class Sensor {
	// changed this
	constructor (
	public synthetic_id: number,
	public hardware_id: string,
	public install_date: string,
	public location: [number, number],
	public removal_date?: string
	) {}
}
