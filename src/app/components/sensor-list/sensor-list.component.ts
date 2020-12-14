import { Component, OnInit } from '@angular/core';
import { Sensor } from '../../models/sensor';
import { SENSORLIST } from '../../models/mock-sensor-list';
import {faPlus} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-sensor-list',
  templateUrl: './sensor-list.component.html',
  styleUrls: ['./sensor-list.component.css']
})
export class SensorListComponent implements OnInit {
  faPlus = faPlus;

  sensorList = SENSORLIST;
  selectedSensor: Sensor | undefined;

  constructor() { }

  ngOnInit(): void {
  }

  onSelect(sensor: Sensor): void {
  	this.selectedSensor = sensor;
  }

}
