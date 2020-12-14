import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NewSensorComponent} from '../../src/app/components/new-sensor/new-sensor.component'
import {NewSensordataComponent} from '../../src/app/components/new-sensordata/new-sensordata.component'
import {SensorListComponent} from '../../src/app/components/sensor-list/sensor-list.component'
import {SensordataListComponent} from '../../src/app/components/sensordata-list/sensordata-list.component'

const routes: Routes = [
  {path: 'new-sensor', component: NewSensorComponent},
  {path: 'new-sensordata', component: NewSensordataComponent},
  {path: 'sensors', component: SensorListComponent},
  {path: 'sensordata', component: SensordataListComponent},
  // Redirect empty path to /sensors
  {path: '', component: SensordataListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
