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
  })

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
    this.sensorDataService.getSensorData().subscribe(data => {
      // Sort the data by id, then assign it to list.
      this.sensordataList = data.sort((a,b) => {
        return a.entry_id - b.entry_id;
      })
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

    // download file
    this.sensorDataService.download().subscribe(
        res => {
            const blob = new Blob([res], { type : 'text/csv' });
            const file = new File([blob], 'csv_database_write' + '.csv', { type: 'text/csv' });
            saveAs(file);
        },
        res => {
            // notify error
        }
    );
  }
}
