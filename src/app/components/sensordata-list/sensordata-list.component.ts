import { Component, OnInit } from '@angular/core';
import { SensorData } from '../../models/sensordata';
import { SensorDataService } from '../../services/sensor-data/sensor-data.service';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sensordata-list',
  templateUrl: './sensordata-list.component.html',
  styleUrls: ['./sensordata-list.component.css']
})
export class SensorDataListComponent implements OnInit {
  // font awesome icons
  faPlus = faPlus;

  sensordataList: SensorData[] = [];
  selectedSensordata: SensorData | undefined;

  constructor(private sensorDataService: SensorDataService) { }

  ngOnInit(): void {
    this.sensorDataService.getSensorData().then(sensorData => this.sensordataList = sensorData)
      .catch(err => console.error("Error getting sensor data: " + err));
  }

  onSelect(sensordata: SensorData): void {
    this.selectedSensordata = sensordata;
  }

}
