import { Component, OnInit } from '@angular/core';
import { Sensor } from '../../models/sensor';
import { SensorService } from '../../services/sensor/sensor.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-new-sensor',
  templateUrl: './new-sensor.component.html',
  styleUrls: ['./new-sensor.component.css']
})
export class NewSensorComponent implements OnInit {
  ngOnInit() { }

  constructor(private sensorService: SensorService, private router: Router) { }

  model = new Sensor(0, '', new Date(Date.now()), { latitude: 0, longitude: 0 });

  submitted = false;
  onSubmit() {
    this.submitted = true;
    this.sensorService.createSensor(this.model).subscribe(newSensor => this.router.navigate(['/sensors']))
  };


  // inside the onSubmit function, can call the program that populates backend

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }
}
