import { Component, OnInit } from '@angular/core';
import { Sensor } from '../../models/sensor';

@Component({
  selector: 'app-new-sensor',
  templateUrl: './new-sensor.component.html',
  styleUrls: ['./new-sensor.component.css']
})
export class NewSensorComponent implements OnInit {
  ngOnInit(){}

  model = new Sensor(18, 'ABCDEF', 'Jan-21-1998', [77,77],'Jan-22-1998');

  submitted = false;
  onSubmit() {
    this.submitted = true;
    this.model = new Sensor(0, "", "", [0,0], "");

  };


    // inside the onSubmit function, can call the program that populates backend

    // TODO: Remove this when we're done
    get diagnostic() { return JSON.stringify(this.model); }
}
