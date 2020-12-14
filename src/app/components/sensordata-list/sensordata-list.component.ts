import { Component, OnInit } from '@angular/core';
import { Sensordata } from '../../models/sensordata';
import { SENSORDATALIST } from '../../models/mock-sensordata-list'
import {faPlus} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sensordata-list',
  templateUrl: './sensordata-list.component.html',
  styleUrls: ['./sensordata-list.component.css']
})
export class SensordataListComponent implements OnInit {
  // font awesome icons
  faPlus = faPlus;

  sensordataList = SENSORDATALIST;
  selectedSensordata: Sensordata | undefined;

  constructor() { }

  ngOnInit(): void {
  }

  onSelect(sensordata: Sensordata): void {
    this.selectedSensordata = sensordata;
  }

}
