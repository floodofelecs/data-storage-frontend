import { Injectable } from '@angular/core';
import { Sensor } from '../../models/sensor';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Configuration } from '../../../config'
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SensorService {

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }

  /**
   * Gets all sensors from the backend
   */
  getSensors(): Observable<Sensor[]> {
    return this.http.get(`${Configuration.api_url}/sensors`).pipe(catchError(this.handleError)).pipe(map(res => res as Sensor[]))
  }

  /**
   * Creates a new sensor with a POST request
   * @param sensor: Sensor to create
   */
  createSensor(sensor: Sensor): Observable<Sensor> {
    // Use spread syntax
    return this.http.post(`${Configuration.backend_url}/sensors`,
      {
        hardware_id: sensor.hardware_id,
        install_date: sensor.install_date.toISOString(),
        location: {
          latitude: sensor.location.latitude,
          longitude: sensor.location.longitude
        }
      }).pipe(catchError(this.handleError)).pipe(map(res => res as Sensor));
  }

  /**
   * Gets a single sensor
   * @param synthetic_id Synthetic id of sensor to get
   */
  getSensor(synthetic_id: number): Observable<Sensor> {
    return this.http.get(`${Configuration.backend_url}/sensors/${synthetic_id}`)
      .pipe(catchError(this.handleError)).pipe(map(res => res as Sensor))
  }

  /**
   * Deletes a sensor from the backend
   * @param sensor Sensor to delete
   */
  deleteSensor(sensor: Sensor): Observable<void> {
    return this.http.delete(`${Configuration.backend_url}/sensors/${sensor.synthetic_id}`)
    .pipe(catchError(this.handleError)).pipe(map(res => {}));
  }

  /**
   * Replaces a sensor on the backend with a PUT request
   * @param: newSensor: New Sensor to replace old one
   */
  updateSensor(newSensor: Sensor): Observable<Sensor> {
    return throwError("Not yet implemented");
  }
}
