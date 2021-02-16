import { Component, OnInit } from '@angular/core';
import { SensorDataService } from 'src/app/services/sensor-data/sensor-data.service';
import { Secrets } from '../../../secrets';
import { DatePipe } from '@angular/common'

// Include mapbox
declare let mapboxgl: any;

@Component({
  selector: 'app-mapview',
  templateUrl: './mapview.component.html',
  styleUrls: ['./mapview.component.css']
})
export class MapviewComponent implements OnInit {

  // Sensor Data to be displayed on map
  sensorData = this.sensorDataService.getSensorData();

  constructor(private sensorDataService: SensorDataService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    // Set up mapbox token
    mapboxgl.accessToken = Secrets.mapbox_token;
    let map = new mapboxgl.Map({
      container: 'data-map', // container ID
      style: 'mapbox://styles/mapbox/satellite-streets-v11', // style URL
      center: [-95.400, 29.7184], // starting position [lng, lat] 
      zoom: 13 // starting zoom
    })
    // Get all sensor data, then add it to the map
    this.sensorData.subscribe(data => {
      for (let entry of data) {
        /**
         * Create a popup with the distance data for this point, and add it to
         * a marker on the map
         */
        let popup = new mapboxgl.Popup().setHTML(
          `<h5>${entry.distance} m</h5>
          <p>Logged at ${this.datePipe.transform(entry.timestamp, 'medium')}
          Sensor: ${entry.sensor.synthetic_id}</p>`
        );
        // Make marker at the data location, and add popup. Then add to map.
        let marker = new mapboxgl.Marker()
          .setLngLat([entry.sensor.location.longitude, entry.sensor.location.latitude])
          .setPopup(popup)
          .addTo(map)
      }
    })
  }

}
