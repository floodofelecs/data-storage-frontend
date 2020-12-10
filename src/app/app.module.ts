import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SensorListComponent } from './sensor-list/sensor-list.component';
import { SensordataListComponent } from './sensordata-list/sensordata-list.component';
import { NewSensorComponent } from './new-sensor/new-sensor.component';
import { NewSensordataComponent } from './new-sensordata/new-sensordata.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    SensorListComponent,
    SensordataListComponent,
    NewSensorComponent,
    NewSensordataComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
