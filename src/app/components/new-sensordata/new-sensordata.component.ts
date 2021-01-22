import { Component, OnInit } from '@angular/core';
import { SensorData } from '../../models/sensordata';
import { SensorDataService } from '../../services/sensor-data/sensor-data.service';
import { SensorService } from '../../services/sensor/sensor.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-new-sensordata',
  templateUrl: './new-sensordata.component.html',
  styleUrls: ['./new-sensordata.component.css']
})

export class NewSensorDataComponent implements OnInit {

  constructor(private sensorService: SensorService,
    private sensorDataService: SensorDataService,
    private router: Router) { }

  sensorOptions = this.sensorService.getSensors();

  ngOnInit(): void { }
  model: SensorData = {
    entry_id: 0, distance: 0, timestamp: new Date(Date.now()),
    sensor: {
      synthetic_id: 2, hardware_id: "S89FGN39",
      install_date: new Date(Date.parse("Sat Dec 12 16:50:16 EST 2020")), location: { longitude: 14.35, latitude: 170.24 }
    }
  }

  submitted = false;
  onSubmit() {
    this.submitted = true;
    console.log(this.model);
    this.sensorDataService.createSensorData(this.model).subscribe(newSensor => this.router.navigate(['/sensordata']))
  }

  // TODO: Remove this when we're done
  //get diagnostic() { return JSON.stringify(this.model); }
}
