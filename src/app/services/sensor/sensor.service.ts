import { Injectable } from '@angular/core';
import { Sensor } from '../../models/sensor';

@Injectable({
  providedIn: 'root'
})
export class SensorService {

  private MOCK_SENSORS: Sensor[] = [
    { synthetic_id: 1, hardware_id: "DOIOSE", install_date: new Date(Date.parse("Sun Dec 13 16:59:16 EST 2020")), location: { longitude: 124.35, latitude: 70.245 } },
    { synthetic_id: 2, hardware_id: "S89FGN39", install_date: new Date(Date.parse("Sun Dec 13 16:59:16 EST 2020")), location: { longitude: 14.35, latitude: 170.245 } }
  ];

  constructor() { }

  /**
   * Gets all sensors from the backend
   */
  getSensors(): Promise<Sensor[]> {
    return new Promise<Sensor[]>((resolve, reject) => { resolve(this.MOCK_SENSORS) });
  }

  /**
   * Creates a new sensor with a POST request
   * @param sensor: Sensor to create
   */
  createSensor(sensor: Sensor): Promise<Sensor> {
    // Use spread syntax
    return new Promise<Sensor>((resolve, reject) => {
      // Validate parameters before sending to backend.
      if (Math.abs(sensor.location.latitude) > 90 || Math.abs(sensor.location.longitude) > 180) {
        return reject("Latitude or longitude out of range");
      }
      let newSensor = new Sensor(
        this.MOCK_SENSORS.length + 1,
        sensor.hardware_id,
        sensor.install_date,
        { latitude: sensor.location.latitude, longitude: sensor.location.longitude })
      this.MOCK_SENSORS.unshift(newSensor);
      resolve(newSensor);
    });
  }

  /**
   * Gets a single sensor
   * @param synthetic_id Sythentic id of sensor to get
   */
  getSensor(synthetic_id: number): Promise<Sensor> {
    return new Promise((resolve, reject) => {
      reject("Not yet implemented");
    });
  }

  /**
   * Deletes a sensor from the backend
   * @param sensor Sensor to delete
   */
  deleteSensor(sensor: Sensor): Promise<void> {
    return new Promise((resolve, reject) => {
      reject("Not yet implemented");
    });
  }

  /**
   * Replaces a sensor on the backend with a PUT request
   * @param: newSensor: New Sensor to replace old one
   */
  updateSensor(newSensor: Sensor): Promise<Sensor> {
    return new Promise((resolve, reject) => {
      reject("Not yet implemented");
    });
  }
}
