import { Injectable } from '@angular/core';
import { Sensor } from '../../models/sensor';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Configuration } from '../../../config'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SensorService {

  constructor(private http: HttpClient) { }

  /**
   * Gets all sensors from the backend
   */
  getSensors(): Observable<Sensor[]> {
    return this.http.get(`${Configuration.api_url}/sensors`).pipe(map(res => res as Sensor[]))
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
      return this.http.post(`${Configuration.backend_url}/sensors`,
        {
          hardware_id: sensor.hardware_id,
          install_date: sensor.install_date.toISOString(),
          location: {
            latitude: sensor.location.latitude,
            longitude: sensor.location.longitude
          }
        }).toPromise();
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
