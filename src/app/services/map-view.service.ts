import { Injectable } from '@angular/core';

import Map from 'ol/Map';
import View from 'ol/View';
import Feature from 'ol/Feature';
import {defaults as defaultControls} from 'ol/control';
import {LineString, Point, GeometryLayout} from 'ol/geom';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import OSM from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';
import {toLonLat, fromLonLat} from 'ol/proj';
import {getLength} from 'ol/sphere';
import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style';
import {Subject} from 'rxjs';
import {TrackPoint} from '../../track';

@Injectable({
  providedIn: 'root'
})
export class MapViewService {

  // Define base colors
  COLORS = {
    red: [255, 0, 0, 1],
    green: [0, 255, 0, 1],
    blue: [0, 0, 255, 1]
  };
  // Gradient for upward/downward movement TODO Tweak color gradient
  GRADIENT = [
    [255, 0, 0, 1],
    [255, 102, 0, 1],
    [255, 204, 0, 1],
    [204, 255, 0, 1],
    [101, 255, 0, 1],
    [0, 255, 0, 1],
    [0, 255, 101, 1],
    [0, 255, 203, 1],
    [0, 203, 255, 1],
    [0, 101, 255, 1],
    [0, 0, 255, 1]
  ];
  // Main attributes
  map: Map;
  view: View;
  vectorSource = new VectorSource();
  // Data for closest point
  infos = {
    pilot: '',
    latitude: '',
    longitude: '',
    altitude: 0,
    date: Date()
  };
  infosSubject = new Subject<any>();
  overlayPoint = null;
  // Track data
  minDelta = Infinity;
  maxDelta = -Infinity;
  deltaRange;

  constructor() { }

  initMap() {
    // Init View
    this.view = new View({ // Set the center position of the map view and the zoom level
      center: [0, 0],
      minZoom: 10
    });

    // Map creation
    this.map = new Map({
      layers: [
        new TileLayer({ // Set map background from OSM
          source: new OSM({wrapX: false}),
        }),
        new VectorLayer({ // Add layer for the tracks
          source: this.vectorSource,
          style: this.getStyleFunction()
        })
      ],
      target: 'map',
      controls: defaultControls({ // Temporarily using default map controls
        attributionOptions: {
          collapsible: false
        },
        zoomOptions: {
          duration: 250
        }
      }),
      view: this.view
    });
  }

  setupEvents() {
    // Event triggered each time the mouse moves over the map view
    this.map.on('pointermove', (evt) => {
      if (evt.dragging) {
        return;
      }
      const coordinate = this.map.getEventCoordinate(evt.originalEvent);
      this.displaySnap(coordinate);
    });

    // Draw geometry on the closest point
    this.map.on('postcompose', (evt) => {
      const vectorContext = evt.vectorContext;
      vectorContext.setStyle(new Style({
        image: new CircleStyle({
          radius: 5,
          fill: new Fill({color: this.COLORS.red})
        })
      }));
      if (this.overlayPoint !== null) {
        vectorContext.drawGeometry(this.overlayPoint);
      }
    });
  }

  displaySnap(coordinate) {
    // Fetch closest track from mouse coords
    const closestFeature = this.vectorSource.getClosestFeatureToCoordinate(coordinate);
    if (closestFeature === null) {
      this.overlayPoint = null;
    } else {
      // Fetch closest point from mouse coords
      const geometry = closestFeature.getGeometry();
      const closestPoint = geometry.getClosestPoint(coordinate);
      if (this.overlayPoint === null) {
        this.overlayPoint = new Point(closestPoint);
      } else {
        this.overlayPoint.setCoordinates(closestPoint);
      }
      // Update data of the closest point
      this.updateInfos(closestFeature, closestPoint);
    }
    this.map.render();
  }

  // Function responsible for IGC file parsing
  parseIGCFile(filename: string, trackDay: string, callback) {
    let trackData: TrackPoint[] = [] as any;
    let p: string[];
    // Accessing the file form its url
    this.get(filename, (data) => {
      // Separate rows and iterate through them
      const rows = data.split('\n');
      rows.forEach( (row) => {
        switch (row[0]) {
          case 'B': // B Record parsing
            p = this.parseBrecord(row);
            // Add the record to the trackData array
            trackData = [...trackData,
              {
                Time: new Date(`${trackDay}T${p[0]}:${p[1]}:${p[2]}`),
                Latitude: p[3],
                Longitude: p[4],
                Valid: p[5] === 'A',
                Pressure_alt: parseInt(p[6], 10),
                GPS_alt: parseInt(p[7], 10),
                Accuracy: parseInt(p[8], 10),
                Engine_RPM: parseInt(p[9], 10),
              } as TrackPoint
            ];
            break; // TODO Add test to check length of trackData
        }
      });
      callback(trackData);
    });
  }

  // Parse a single IGC B record string into a string array
  parseBrecord(s: string) {
    return [
      s.substring(1, 3), s.substring(3, 5), s.substring(5, 7), // hours, minutes, seconds
      s.substring(7, 15), s.substring(15, 24),                 // latitude, longitude
      s.substring(24, 25),                                     // valid
      s.substring(25, 30), s.substring(30, 35),                // pressure alt, gps alt
      s.substring(35, 38), s.substring(38, 42)                 // accuracy; engine rpm
    ];
  }

  // Load a track as features into to tracks layer on the map
  loadTrack(trackData) {
    const features = this.fromTrackDataToFeatures(trackData);
    this.vectorSource.addFeatures(features);
    this.view.fit(this.vectorSource.getExtent());
  }

  // Create feature from track data
  fromTrackDataToFeatures(trackData: TrackPoint[], dataPerFeature = 20) {
    const features = [];
    let geometry, coords, point, alt_debut, alt_fin, delta;
    for (let i = 0; i < trackData.length; i += dataPerFeature - 1) {
      geometry = new LineString([], 'XYZM');
      for (let j = i; j < i + dataPerFeature && i < trackData.length - dataPerFeature; j++) {
        point = trackData[j];
        if (j === i) {
          alt_debut = point.GPS_alt;
        } else if (j === i + dataPerFeature - 1) {
          alt_fin = point.GPS_alt;
        }
        // Coordinates projection from Decimal Degrees to EPSG:3857
        coords = fromLonLat(this.fromLonLatStr([point.Longitude, point.Latitude]));
        coords = [...coords, point.GPS_alt, point.Time.getTime() / 1000];
        geometry.appendCoordinate(coords);
      }
      // delta is the steepness of the upward/downward movement for the current geometry
      // delta > 0 means upward movement, else it's downward
      delta = (alt_fin - alt_debut) / (getLength(geometry));
      this.updateDeltaValues(delta);
      features.push(new Feature({
        geometry: geometry,
        delta_altitude: delta
      }));
    }
    return features;
  }

  /*
   * Updates the min, max and range values of the upward/downward movement variation variable.
   * Used to color map the upward/downward movement along the track on the map.
   */
  updateDeltaValues(delta: number) {
    if (Math.abs(delta) === Infinity) { // Escape infinite values to prevent errors
      return;
    }
    if (delta < this.minDelta) {
      this.minDelta = delta;
    } else if (delta > this.maxDelta) {
      this.maxDelta = delta;
    }
    this.deltaRange = this.maxDelta - this.minDelta;
  }

  // Convert parsed IGC coords ['5142113N','01751264E'] to float values in Decimal Degrees
  fromLonLatStr([lon, lat]: string[]) {
    const x = parseInt(lon.substr(0, 3), 10) + parseInt(lon.substr(3, 5), 10) / 60000;
    const y = parseInt(lat.substr(0, 2), 10) + parseInt(lat.substr(2, 5), 10) / 60000;
    const longitude = lon.substring(lon.length - 1) === 'E' ? x : -x;
    const latitude = lat.substring(lat.length - 1) === 'N' ? y : -y;
    return [longitude, latitude];
  }

  // Style function to color code upward/downward movement to each feature of the track
  getStyleFunction() {
    return (feature, resolution) => {
      const delta = feature.get('delta_altitude');
      const i = Math.round((delta - this.minDelta) / this.deltaRange * (this.GRADIENT.length - 1));
      const color = this.GRADIENT[this.GRADIENT.length - 1 - i];
      return new Style({
        stroke: new Stroke({
          color: color,
          width: 2
        })
      });
    };
  }

  // GET html request
  get(url, callback) {
    const client = new XMLHttpRequest();
    client.open('GET', url);
    client.onload = () => {
      callback(client.responseText);
    };
    client.send();
  }

  // Update this.infos with the given data
  updateInfos(feature: Feature, point: Point) {
    this.infos.pilot = feature.get('PLT');
    [this.infos.longitude, this.infos.latitude] = toLonLat([point[0], point[1]]);
    this.infos.altitude = point[2];
    this.infos.date = new Date(point[3] * 1000).toString();
    this.emitInfos();
  }

  // Notify a change has been made to 'this.infos'
  emitInfos() {
      this.infosSubject.next(this.infos);
  }
}
