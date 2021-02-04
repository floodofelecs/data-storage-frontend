import { Component, OnInit } from '@angular/core';
import { Sensor } from '../../models/sensor';
import { SensorService } from '../../services/sensor/sensor.service'
import { Router } from '@angular/router'
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-sensor',
  templateUrl: './new-sensor.component.html',
  styleUrls: ['./new-sensor.component.css']
})
export class NewSensorComponent implements OnInit {
  ngOnInit() { }
  
  // Settings for date time picker
  options: any = { sideBySide: true};

  newSensorForm = new FormGroup({
    hardware_id: new FormControl('', Validators.required),
    install_date: new FormControl('', Validators.required),
    longitude: new FormControl('', Validators.required),
    latitude: new FormControl('', Validators.required),
    
  })


  constructor(private sensorService: SensorService, private router: Router) { }

  

  
  
  submitted = false;
  onSubmit() {
    this.submitted = true;
    let newSensor = new Sensor(0, this.newSensorForm.get('hardware_id')?.value, 
    this.newSensorForm.get('install_date')?.value, 
    {latitude:this.newSensorForm.get('latitude')?.value, longitude: this.newSensorForm.get('longitude')?.value})
    this.sensorService.createSensor(newSensor).subscribe(newSensor => this.router.navigate(['/sensors']))
  };


  // inside the onSubmit function, can call the program that populates backend

  // TODO: Remove this when we're done
  // get diagnostic() { return JSON.stringify(this.model); }
}
