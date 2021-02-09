import { Component, OnInit } from '@angular/core';
import { SensorDataService } from 'src/app/services/sensor-data/sensor-data.service';

@Component({
  selector: 'app-mapview',
  templateUrl: './mapview.component.html',
  styleUrls: ['./mapview.component.css']
})
export class MapviewComponent implements OnInit {

  // Sensor Data to be displayed on map
  sensorData = this.sensorDataService.getSensorData();

  constructor(private sensorDataService: SensorDataService) { }

  ngOnInit(): void {
  }

}
