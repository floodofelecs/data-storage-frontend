import { Sensordata } from './sensordata';
import { Sensor } from './sensor';
const sensor: Sensor = { synthetic_id: 2, hardware_id: "S89FGN39", install_date: new Date(Date.parse("Sat Dec 12 16:50:16 EST 2020")), location: { latitude: 14.35, longitude: 170.245 } }

export const SENSORDATALIST: Sensordata[] = [
	{ sensor: sensor, entry_id: 1, distance: 2.3, timestamp: new Date(Date.parse("Sun Dec 13 16:59:16 EST 2020")) },
	{ sensor: sensor, entry_id: 2, distance: 2.2, timestamp: new Date(Date.parse("Sun Dec 13 17:05:16 EST 2020")) },
	{ sensor: sensor, entry_id: 3, distance: 2.0, timestamp: new Date(Date.parse("Sun Dec 13 17:10:16 EST 2020")) }
];
