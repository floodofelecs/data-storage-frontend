import { Component, OnInit } from '@angular/core';
import { Sensordata } from '../../models/sensordata';


@Component({
  selector: 'app-new-sensordata',
  templateUrl: './new-sensordata.component.html',
  styleUrls: ['./new-sensordata.component.css']
})

export class NewSensordataComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  sensor_id = 0;
  model = {entry_id: 579273, distance: .22, timestamp: "11:20", sensor: { synthetic_id: 2, hardware_id: "S89FGN39", install_date: "Sat Dec 12 16:50:16 EST 2020", location: [14.35, 170.245] }}

  submitted=false;
  onSubmit() { this.submitted=true; }

   // TODO: Remove this when we're done
   //get diagnostic() { return JSON.stringify(this.model); }
}
