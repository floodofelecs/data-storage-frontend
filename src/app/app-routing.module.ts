import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NewSensorComponent} from '../../src/app/components/new-sensor/new-sensor.component'
import {NewSensorDataComponent} from '../../src/app/components/new-sensordata/new-sensordata.component'
import {SensorListComponent} from '../../src/app/components/sensor-list/sensor-list.component'
import {SensorDataListComponent} from '../../src/app/components/sensordata-list/sensordata-list.component'

const routes: Routes = [
  {path: 'new-sensor', component: NewSensorComponent},
  {path: 'new-sensordata', component: NewSensorDataComponent},
  {path: 'sensors', component: SensorListComponent},
  {path: 'sensordata', component: SensorDataListComponent},
  // Redirect empty path to /sensors
  {path: '', component: SensorDataListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
