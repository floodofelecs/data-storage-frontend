import { Component, OnInit } from '@angular/core';
import { Sensordata } from '../sensordata';
import { SENSORDATALIST } from '../mock-sensordata-list'

@Component({
  selector: 'app-sensordata-list',
  templateUrl: './sensordata-list.component.html',
  styleUrls: ['./sensordata-list.component.css']
})
export class SensordataListComponent implements OnInit {

  sensordataList =  SENSORDATALIST;
  selectedSensordata: Sensordata | undefined;

  constructor() { }

  ngOnInit(): void {
  }

  onSelect(sensordata: Sensordata): void {
  	this.selectedSensordata = sensordata;
  }

}
