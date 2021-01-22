import { Component, OnInit } from '@angular/core';
import { Sensor } from '../../models/sensor';
import { SensorService } from '../../services/sensor/sensor.service'
import { Observable } from 'rxjs';


@Component({
  selector: 'app-sensor-list',
  templateUrl: './sensor-list.component.html',
  styleUrls: ['./sensor-list.component.css']
})
export class SensorListComponent implements OnInit {

  sensorList: Observable<Sensor[]> = this.sensorService.getSensors();
  selectedSensor: Sensor | undefined;

  constructor(private sensorService: SensorService) { }

  ngOnInit(): void { }

  onSelect(sensor: Sensor): void {
    this.selectedSensor = sensor;
  }

}
