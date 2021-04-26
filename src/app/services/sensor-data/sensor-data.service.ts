import { Injectable } from '@angular/core';
import { SensorData } from '../../models/sensordata';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Configuration } from '../../../config';
import { catchError, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SensorDataService {

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
        `body was: ${JSON.stringify(error.error)}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }

  /**
   * Gets all sensor data
   */
  getSensorData(): Observable<SensorData[]> {
    return this.http.get(`${Configuration.api_url}/sensor-data/`)
      .pipe(catchError(this.handleError)).pipe(map(res => res as SensorData[]));
  }

  /**
   * Gets a range of sensor data by index. Useful to limit size of returned data
   * @param minRange Minimum index from the list of all sensor data to get (inclusive)
   * @param maxRange Maximum index from all the sensor data to get (exclusive)
   */
  getSensorDataRange(minRange: number, maxRange: number): Observable<SensorData[]> {
    return this.http.get(`${Configuration.api_url}/sensor-data/`,
      { params: { minrange: minRange.toString(), maxrange: maxRange.toString() } })
      .pipe(catchError(this.handleError)).pipe(map(res => res as SensorData[]));
  }

  /**
   * Gets individual sensor data entry
   * @param entry_id: Entry id of the sensor data to get.
   */
  getSensorDataEntry(entry_id: Number): Observable<SensorData> {
    return this.http.get(`${Configuration.api_url}/sensor-data/${entry_id}/`)
      .pipe(catchError(this.handleError)).pipe(map(res => res as SensorData));
  }

  /**
   * Creates new sensor data
   * @param sensorData Sensor data to create
   */
  createSensorData(sensorData: SensorData): Observable<SensorData> {
    return this.http.post(`${Configuration.api_url}/sensor-data/`,
      {
        distance: sensorData.distance,
        timestamp: sensorData.timestamp,
        sensor: sensorData.sensor.synthetic_id
      }).pipe(catchError(this.handleError)).pipe(map(res => res as SensorData))
  }

  /**
   * Deletes sensor data entry
   * @param sensorData Data to delete
   */
  deleteSensorData(sensorData: SensorData): Observable<void> {
    return this.http.delete(`${Configuration.api_url}/sensor-data/${sensorData.entry_id}/`)
      .pipe(catchError(this.handleError)).pipe(map(res => { }));
  }

  /**
   * Updates sensor data entry by replacing it.
   * @param newSensorData: new sensor data to replace old one
   */
  updateSensorData(newSensorData: SensorData): Observable<SensorData> {
    return this.http.put(`${Configuration.api_url}/sensor-data/${newSensorData.entry_id}/`,
      {
        distance: newSensorData.distance,
        timestamp: newSensorData.timestamp,
        sensor: newSensorData.sensor.synthetic_id
      }).pipe(catchError(this.handleError)).pipe(map(res => res as SensorData));
  }

  /**
   * Downloads all sensor data from the backend as a CSV file
   * @returns CSV data as a binary blob
   */
  downloadCSV(): Observable<Blob> {
    return this.http
      .get(`${Configuration.api_url}/sensor-data/csv-database-write/`, { responseType: 'blob' })
      .pipe(catchError(this.handleError));
  }

  /**
   * Requests the most recent sensor data entry from each sensor within a given
   * radius of a latitude and longitude
   * @param radius Radius in miles to request data within
   * @param latitude latitude to center radius around
   * @param longitude longitude to center radius around
   */
  getDataWithinRadius(radius: number, latitude: number, longitude: number): Observable<SensorData[]> {
    return this.http.get(`${Configuration.api_url}/sensor-data/location/`, {
      params: { 'radius': radius.toString(), 'latitude': latitude.toString(), 'longitude': longitude.toString(), 'most_recent': 'true' }
    }).pipe(catchError(this.handleError)).pipe(map(res => res as SensorData[]))
  }
}
