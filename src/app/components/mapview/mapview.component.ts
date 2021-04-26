import { Component, OnInit } from '@angular/core';
import { SensorDataService } from 'src/app/services/sensor-data/sensor-data.service';
import { Secrets } from '../../../secrets';
import { DatePipe } from '@angular/common'
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

// Include mapbox
declare let mapboxgl: any;

@Component({
  selector: 'app-mapview',
  templateUrl: './mapview.component.html',
  styleUrls: ['./mapview.component.css']
})
export class MapviewComponent implements OnInit {

  // Subject used to listen for changes to the map object
  mapSubject = new Subject<any>();
  mapMarkers:any[] = []; // array of current map markers

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
    /**
     * Set up event handlers for the map zoom and drag. We want to update
     * the map bounds in real time based on the area the user views
     */
    map.on('drag', (e: any) => {
      this.mapSubject.next(e.target)
    });
    map.on('zoom', (e: any) => this.mapSubject.next(e.target));
    /**
     * Listen for changes to the map. Note we use a debounce time to avoid
     * updating the map's sensor list too often.
     */
    this.mapSubject.pipe(debounceTime(3000))
      .subscribe(map => this.mapBoundsChanged(map));
    // Pipe in the initial map object
    this.mapSubject.next(map);
  }

  /**
   * Evaluates the bounds of the map provided, and updates the map
   * with a new sensor data set
   * @param map
   */
  mapBoundsChanged(map: any) {
    /**
     * Get the bounds and center of the map view, and use that to calculate the 
     * radius of points that should be requested.
     * Note we calculate the radius to the "corner" of the bounds, so that
     * the circle of points we request covers the entire square view window
     */
    // Distance given in meters
    let radius = map.getCenter().distanceTo(map.getBounds().getNorthEast());
    radius = radius / 1609.34; // convert radius from meters to miles
    /**
     * Check to see if the radius has changed by over 0.5 miles, or the user has
     * panned over 0.5 miles. This prevents s
     */
    // Make a request to the backend to get new sensor data points
    this.sensorDataService.getDataWithinRadius(radius, map.getCenter().lat, map.getCenter().lng)
      .subscribe(data => {
        // Clear current map markers
        for (let x of this.mapMarkers) {
          x.remove();
        }
        this.mapMarkers = [];
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
          let marker = new mapboxgl.Marker();
          marker.setLngLat([entry.sensor.location.longitude, entry.sensor.location.latitude])
            .setPopup(popup)
            .addTo(map)
          this.mapMarkers.push(marker);
        }
      })
  }
}
