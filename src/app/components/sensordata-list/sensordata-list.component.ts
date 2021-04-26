import { Component, OnInit } from '@angular/core';
import { SensorData } from '../../models/sensordata';
import { SensorDataService } from '../../services/sensor-data/sensor-data.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SensorService } from 'src/app/services/sensor/sensor.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-sensordata-list',
  templateUrl: './sensordata-list.component.html',
  styleUrls: ['./sensordata-list.component.css']
})
export class SensorDataListComponent implements OnInit {
  // Settings for date time picker
  options: any = { sideBySide: true };

  // This list holds all sensor data we want to show in the table.
  sensordataList: SensorData[] = [];
  // SensorOptions is an observable, that will resolve to a list of sensors
  sensorOptions = this.sensorService.getSensors();
  // This variable tracks the sensor that we have selected to view in the edit dialog.
  selectedSensorData: SensorData | undefined = undefined;
  // This variable is set to the index of the selected sensor in the "sensorDataList" array
  selectedSensorIdx = 0;
  /**
   * This form is the form we use to edit a sensor. It can be populated with any sensor we select
   * Note that the validators.required directive means that the relevant form control value must be filled in,
   * or the form is invalid.
   */
  editSensorDataForm = new FormGroup({
    // Distance value required and must be a positive number
    distance: new FormControl('', Validators.compose([
      Validators.required,
      Validators.min(0)])),
    timestamp: new FormControl('', Validators.required),
    sensor: new FormControl('', Validators.required)
  });
  /**
   * These indices track the sensor data window that is currently loaded 
   * We avoid loading all the sensor data immediately to save resources
   */
  sensorDataIdxStep = 50;
  sensorDataIdxMin = 0;
  sensorDataIdxMax = this.sensorDataIdxMin + this.sensorDataIdxStep;
  // This is set to true when a csv download is processing
  downloadActive = false;
  // Set to true when the sensor data list is being refreshed
  refreshActive = false;
  // Infinite scroll configuration parameters
  throttle = 50; // how soon to trigger event after user stops scrolling
  scrollDistance = 2; // trigger event when 80% down page

  /**
   * This constructor declares the sensorDataService and sensorService
   * because we use both in our class. Any service you want to use must
   * be declared in the constructor like this (and imported at the top of the file)
   */
  constructor(private sensorDataService: SensorDataService,
    private sensorService: SensorService) {
  }

  ngOnInit(): void {
    /**
     * Here we request all sensorData entries. When we get them, we sort them 
     * then set the array of sensorData to the sorted value.
     */
    this.sensorDataService
      .getSensorDataRange(this.sensorDataIdxMin, this.sensorDataIdxMax)
      .subscribe(data => {
        // Sort the data by id, then assign it to list.
        this.sensordataList = data;
      });
  }

  /**
   * Populates the edit form with a sensor to edit
   * @param sensordata Sensor Data to populate form with
   * @param idx: Index of sensor data selected in list view
   */
  onSelect(sensordata: SensorData, idx: number): void {
    /**
     * Note here how we set the sensor form to the values for the selected
     * sensor. These set values will now show up in the edit dialog in the html.
     */
    this.selectedSensorData = sensordata;
    this.selectedSensorIdx = idx
    this.editSensorDataForm.get('distance')?.setValue(sensordata.distance);
    this.editSensorDataForm.get('timestamp')?.setValue(sensordata.timestamp);
    this.editSensorDataForm.get('sensor')?.setValue(sensordata.sensor);
  }

  /**
   * Loads additional sensor data when scroll window hits bottom
   */
  onScrollDown() {
    let oldMax = this.sensorDataIdxMax;
    this.sensorDataIdxMax = this.sensorDataIdxMax + this.sensorDataIdxStep;
    // Request a new block of sensor data, and append it to list of data
    this.sensorDataService.getSensorDataRange(oldMax, this.sensorDataIdxMax)
      .subscribe(newData => {
        this.sensordataList = this.sensordataList.concat(newData);
      })
  }

  /**
   * Forces a refresh of the sensor data. 
   */
  refreshData() {
    this.refreshActive = true;
    this.sensorDataService.getSensorDataRange(this.sensorDataIdxMin, this.sensorDataIdxMax)
      .subscribe(res => {
        this.sensordataList = res;
        this.refreshActive = false;
      })
  }

  /**
   * Updates the sensor data that is currently being edited using the values in
   * editSensorDataForm
   */
  updateSensorData() {
    const newData = new SensorData(
      <number>this.selectedSensorData?.entry_id,
      this.editSensorDataForm.get('distance')?.value,
      this.editSensorDataForm.get('timestamp')?.value,
      this.editSensorDataForm.get('sensor')?.value);
    /**
     * Here we use the created sensor object to update the sensor data, and
     * wait for the output with the "subscribe" call. When the new sensor is
     * returned, we replace the sensor we just edited with the new one returned
     * from the backend.
     */
    this.sensorDataService.updateSensorData(newData).subscribe(newSensor => {
      // Manually set the new sensor into list
      this.sensordataList[this.selectedSensorIdx] = newSensor;
    })
  }

  downloadFile() {
    this.downloadActive = true;
    // download file
    this.sensorDataService.downloadCSV().subscribe(
      res => {
        this.downloadActive = false;
        const blob = new Blob([res], { type: 'text/csv' });
        const file = new File([blob], 'csv_database_write' + '.csv', { type: 'text/csv' });
        saveAs(file);
      }
    );
  }
}
