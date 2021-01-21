import { Component, OnInit } from '@angular/core';
import { Sensor } from '../../models/sensor';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {SensorService} from '../../services/sensor/sensor.service'
import { Observable } from 'rxjs';


@Component({
  selector: 'app-sensor-list',
  templateUrl: './sensor-list.component.html',
  styleUrls: ['./sensor-list.component.css']
})
export class SensorListComponent implements OnInit {
  faPlus = faPlus;

  sensorList: Observable<Sensor[]> = this.sensorService.getSensors();
  selectedSensor: Sensor | undefined;

  constructor(private sensorService: SensorService) { }

  ngOnInit(): void { }

  onSelect(sensor: Sensor): void {
  	this.selectedSensor = sensor;
  }

}
