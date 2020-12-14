import { Injectable } from '@angular/core';
import { SensorData } from '../../models/sensordata';
import {Sensor} from '../../models/sensor';

@Injectable({
  providedIn: 'root'
})
export class SensorDataService {

  constructor() { }

  private sensor: Sensor = { synthetic_id: 2, hardware_id: "S89FGN39", install_date: new Date(Date.parse("Sat Dec 12 16:50:16 EST 2020")), location: { latitude: 14.35, longitude: 170.245 } }

  private SENSORDATALIST: SensorData[] = [
    { sensor: this.sensor, entry_id: 1, distance: 2.3, timestamp: new Date(Date.parse("Sun Dec 13 16:59:16 EST 2020")) },
    { sensor: this.sensor, entry_id: 2, distance: 2.2, timestamp: new Date(Date.parse("Sun Dec 13 17:05:16 EST 2020")) },
    { sensor: this.sensor, entry_id: 3, distance: 2.0, timestamp: new Date(Date.parse("Sun Dec 13 17:10:16 EST 2020")) }
  ];

  /**
   * Gets all sensor data
   */
  getSensorData(): Promise<SensorData[]> {
    return new Promise((resolve, reject) => {
      return resolve(this.SENSORDATALIST);
    });
  }

  /**
   * Gets individual sensor data entry
   * @param entry_id: Entry id of the sensor data to get.
   */
  getSensorDataEntry(entry_id: Number): Promise<SensorData> {
    return new Promise((resolve, reject) => {
      reject("Not yet implemented");
    })
  }

  /**
   * Creates new sensor data
   * @param sensorData Sensor data to create
   */
  createSensorData(sensorData: SensorData): Promise<SensorData> {
    return new Promise((resolve, reject) => {
      this.SENSORDATALIST.push(sensorData);
      return resolve(sensorData);
    });
  }

  /**
   * Deletes sensor data entry
   * @param sensorData Data to delete
   */
  deleteSensorData(sensorData: SensorData): Promise<void> {
    return new Promise((resolve, reject) => reject("Not yet implemented"));
  }

  /**
   * Updates sensor data entry by replacing it.
   * @param newSensorData: new sensor data to replace old one
   */
  updateSensorData(newSensorData: SensorData): Promise<SensorData> {
    return new Promise((resolve, reject) => reject("Not yet implemented"));
  }
}
