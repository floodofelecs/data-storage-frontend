import { Sensor } from './sensor'

export class Sensordata {
	constructor (
		public entry_id: number,
		public distance: number,
		public timestamp: string,
		public sensor: Sensor
	){} 
}
