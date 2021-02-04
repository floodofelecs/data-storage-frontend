import { Component, OnInit } from '@angular/core';
import { Sensor } from '../../models/sensor';
import { SensorService } from '../../services/sensor/sensor.service'
import { Observable } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-sensor-list',
  templateUrl: './sensor-list.component.html',
  styleUrls: ['./sensor-list.component.css']
})
export class SensorListComponent implements OnInit {
  // Settings for date time picker
  options: any = { sideBySide: true };

  // This list holds all sensors we want to show in the table.
  sensorList: Sensor[] = [];
  // This variable tracks the sensor that we have selected to view in the edit dialog.
  selectedSensor: Sensor | undefined = undefined;
  // This variable is set to the index of the selected sensor in the "sensorList" array
  selectedSensorIdx = 0;

  /**
   * This form is the form we use to edit a sensor. It can be populated with any sensor we select
   * Note that the validators.required directive means that the relevant form control value must be filled in,
   * or the form is invalid.
   */
  editSensorForm = new FormGroup({
    hardware_id: new FormControl('', Validators.required),
    install_date: new FormControl('', Validators.required),
    latitude: new FormControl('', Validators.required),
    longitude: new FormControl('', Validators.required),
    removal_date: new FormControl()
  })

  /**
   * This constructor declares the sensorService. Any service you want to use must
   * be declared in the constructor like this (and imported at the top of the file)
   */
  constructor(private sensorService: SensorService) { }

  ngOnInit(): void {
    /**
     * Here we request all sensor entries. When we get them, we sort them 
     * then set the array of sensor to the sorted value.
     */
    this.sensorService.getSensors().subscribe(sensors => {
      // Sort the sensors by id, then assign it to list.
      this.sensorList = sensors.sort((a,b) => {
        return a.synthetic_id - b.synthetic_id;
      })
    });
  }

  /**
   * Populates the edit form with a sensor to edit
   * @param sensor Sensor to populate form with
   * @param idx: Index of sensor selected in list view
   */
  onSelect(sensor: Sensor, idx: number): void {
    /**
     * Note here how we set the sensor form to the values for the selected
     * sensor. These set values will now show up in the edit dialog in the html.
     */
    this.selectedSensor = sensor;
    this.selectedSensorIdx = idx;
    this.editSensorForm.get('hardware_id')?.setValue(sensor.hardware_id);
    this.editSensorForm.get('install_date')?.setValue(sensor.install_date);
    this.editSensorForm.get('removal_date')?.setValue(sensor.removal_date);
    this.editSensorForm.get('latitude')?.setValue(sensor.location.latitude);
    this.editSensorForm.get('longitude')?.setValue(sensor.location.longitude);
  }

  /**
   * Updates the sensor that is currently being edited using the values in
   * editSensorForm
   */
  updateSensor() {
    const newLocation = {
      latitude: this.editSensorForm.get('latitude')?.value, 
      longitude: this.editSensorForm.get('longitude')?.value
    };
    const newSensor = new Sensor(
      <number>this.selectedSensor?.synthetic_id,
      this.editSensorForm.get('hardware_id')?.value,
      this.editSensorForm.get('install_date')?.value,
      newLocation,
      this.editSensorForm.get('removal_date')?.value,);
    /**
     * Here we use the created sensor object to update the sensor, and
     * wait for the output with the "subscribe" call. When the new sensor is
     * returned, we replace the sensor we just edited with the new one returned
     * from the backend.
     */
    this.sensorService.updateSensor(newSensor).subscribe(newSensor => {
      // Manually set the new sensor into list
      this.sensorList[this.selectedSensorIdx] = newSensor;
    })
  }

}
