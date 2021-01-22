import { Component, OnInit } from '@angular/core';
import { SensorData } from '../../models/sensordata';
import { SensorDataService } from '../../services/sensor-data/sensor-data.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SensorService } from 'src/app/services/sensor/sensor.service';

@Component({
  selector: 'app-sensordata-list',
  templateUrl: './sensordata-list.component.html',
  styleUrls: ['./sensordata-list.component.css']
})
export class SensorDataListComponent implements OnInit {
  // Settings for date time picker
  options: any = { sideBySide: true };

  sensordataList: SensorData[] = [];
  sensorOptions = this.sensorService.getSensors();
  selectedSensorData: SensorData | undefined = undefined;
  selectedSensorIdx = 0;
  editSensorDataForm = new FormGroup({
    // Distance value required and must be a positive number
    distance: new FormControl('', Validators.compose([
      Validators.required,
      Validators.min(0)])),
    timestamp: new FormControl('', Validators.required),
    sensor: new FormControl('', Validators.required)
  })

  constructor(private sensorDataService: SensorDataService,
    private sensorService: SensorService) {
  }

  ngOnInit(): void {
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
    this.sensorDataService.updateSensorData(newData).subscribe(newSensor => {
      // Manually set the new sensor into list
      this.sensordataList[this.selectedSensorIdx] = newSensor;
    })
  }

}
