import { Component, OnInit } from '@angular/core';
import { Sensor } from '../../models/sensor';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {SensorService} from '../../services/sensor/sensor.service'


@Component({
  selector: 'app-sensor-list',
  templateUrl: './sensor-list.component.html',
  styleUrls: ['./sensor-list.component.css']
})
export class SensorListComponent implements OnInit {
  faPlus = faPlus;

  sensorList: Sensor[];
  selectedSensor: Sensor | undefined;

  constructor(private sensorSerivce: SensorService) { 
    this.sensorList = [];
  }

  ngOnInit(): void {
    // Get list of sensors
    this.sensorSerivce.getSensors().then(sensors => this.sensorList = sensors)
    .catch(err => console.error("Could not get sensors from service: " + err));
  }

  onSelect(sensor: Sensor): void {
  	this.selectedSensor = sensor;
  }

}
