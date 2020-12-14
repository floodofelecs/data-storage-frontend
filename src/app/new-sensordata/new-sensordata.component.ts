import { Component, OnInit } from '@angular/core';
import { Sensordata } from '../sensordata';


@Component({
  selector: 'app-new-sensordata',
  templateUrl: './new-sensordata.component.html',
  styleUrls: ['./new-sensordata.component.css']
})

export class NewSensordataComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  submitted=false;
  onSubmit() { this.submitted=true; }

   // TODO: Remove this when we're done
   //get diagnostic() { return JSON.stringify(this.model); }
}
