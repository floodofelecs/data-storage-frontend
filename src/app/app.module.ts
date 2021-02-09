import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SensorListComponent } from './components/sensor-list/sensor-list.component';
import { SensorDataListComponent } from './components/sensordata-list/sensordata-list.component';
import { NewSensorComponent } from './components/new-sensor/new-sensor.component';
import { NewSensorDataComponent } from './components/new-sensordata/new-sensordata.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SensorService } from './services/sensor/sensor.service';
import { SensorDataService } from './services/sensor-data/sensor-data.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import {AuthenticationService} from './services/authentication/authentication.service';
import {CookieService} from 'ngx-cookie-service';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { NgTempusdominusBootstrapModule } from 'ngx-tempusdominus-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { MapviewComponent } from './components/mapview/mapview.component';
import { Configuration } from 'src/config';
import { Secrets } from 'src/secrets';

@NgModule({
  declarations: [
    AppComponent,
    SensorListComponent,
    SensorDataListComponent,
    NewSensorComponent,
    NewSensorDataComponent,
    NavbarComponent,
    LoginComponent,
    MapviewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgTempusdominusBootstrapModule,
    NgxMapboxGLModule.withConfig({
      accessToken: Secrets.mapbox_token
    })
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    SensorService,
    SensorDataService,
    AuthenticationService,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

