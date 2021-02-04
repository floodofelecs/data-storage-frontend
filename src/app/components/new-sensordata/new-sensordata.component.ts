import { Component, OnInit } from '@angular/core';
import { SensorData } from '../../models/sensordata';
import { SensorDataService } from '../../services/sensor-data/sensor-data.service';
import { SensorService } from '../../services/sensor/sensor.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Sensor } from 'src/app/models/sensor';



@Component({
  selector: 'app-new-sensordata',
  templateUrl: './new-sensordata.component.html',
  styleUrls: ['./new-sensordata.component.css']
})

export class NewSensorDataComponent implements OnInit {

  newSensorDataForm = new FormGroup({
    distance: new FormControl('', Validators.required),
    timestamp: new FormControl('', Validators.required),
    sensor: new FormControl(null, Validators.required),
  })

  constructor(private sensorService: SensorService,
    private sensorDataService: SensorDataService,
    private router: Router) { }

  sensorOptions = this.sensorService.getSensors();
  // Settings for date time picker
  options: any = { sideBySide: true }

  ngOnInit(): void { }

  submitted = false;
  onSubmit() {
    this.submitted = true;
    let newSensorData = new SensorData(0, this.newSensorDataForm.get('distance')?.value,
      this.newSensorDataForm.get('timestamp')?.value, this.newSensorDataForm.get('sensor')?.value);
    this.sensorDataService.createSensorData(newSensorData).subscribe(unused => this.router.navigate(['/sensordata']))
  }

  // TODO: Remove this when we're done
  //get diagnostic() { return JSON.stringify(this.model); }
}
