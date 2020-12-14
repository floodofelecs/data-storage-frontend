import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SensorListComponent } from './components/sensor-list/sensor-list.component';
import { SensordataListComponent } from './components/sensordata-list/sensordata-list.component';
import { NewSensorComponent } from './components/new-sensor/new-sensor.component';
import { NewSensordataComponent } from './components/new-sensordata/new-sensordata.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    AppComponent,
    SensorListComponent,
    SensordataListComponent,
    NewSensorComponent,
    NewSensordataComponent,
    NavbarComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

