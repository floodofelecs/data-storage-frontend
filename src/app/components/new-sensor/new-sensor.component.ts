import { Component, OnInit } from '@angular/core';
import { Sensor } from '../../models/sensor';

@Component({
  selector: 'app-new-sensor',
  templateUrl: './new-sensor.component.html',
  styleUrls: ['./new-sensor.component.css']
})
export class NewSensorComponent implements OnInit {
  ngOnInit(){}

  model = new Sensor(18, 'ABCDEF', new Date(Date.parse('Jan 12 1998')), {latitude:77, longitude: 77},new Date(Date.parse('Jan-22-1998')));

  submitted = false;
  onSubmit() {
    this.submitted = true;
    this.model = new Sensor(0, "", new Date(0), {latitude: 0, longitude: 0});

  };


    // inside the onSubmit function, can call the program that populates backend

    // TODO: Remove this when we're done
    get diagnostic() { return JSON.stringify(this.model); }
}
