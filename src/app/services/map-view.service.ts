import { Injectable } from '@angular/core';

import Map from 'ol/Map';
import View from 'ol/View';
import Feature from 'ol/Feature';
import {defaults as defaultControls} from 'ol/control';
import IGC from 'ol/format/IGC';
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
  vectorSource: VectorSource;
  // Data for closest point
  infos = {
    pilot: '',
    latitude: '',
    longitude: '',
    altitude: 0,
    date: Date()
  };
  infosSubject = new Subject<any>();
  overlayShapes = {
    line: null,
    point: null
  };
  // Style for overlay
  stroke = new Stroke({
    color: this.COLORS.red,
    width: 1
  });
  style = new Style({
    stroke: this.stroke,
    image: new CircleStyle({
      radius: 5,
      fill: new Fill({color: this.COLORS.red}),
      stroke: this.stroke
    })
  });
  // Track data
  minDelta;
  maxDelta;
  deltaRange;

  constructor() { }

  initMap() {
    // Init View
    this.view = new View({ // Set the center position of the map view and the zoom level
      center: [0, 0],
      minZoom: 9
    });

    // Container for the tracks
    this.vectorSource = new VectorSource();

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

  // @deprecated We no longer use the built in OpenLayers IGC parser
  loadTracks(igcUrls) {
    // Load features inside the source container
    const igcFormat = new IGC({altitudeMode: 'gps'});
    for (let i = 0; i < igcUrls.length; ++i) {
      this.get(igcUrls[i], (data) => {
        const features = igcFormat.readFeatures(data,
          {featureProjection: 'EPSG:3857'});
        this.vectorSource.addFeatures(features);
        this.view.fit(features[0].getGeometry());
      });
    }
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

    // Event triggered each time the map view is clicked
    this.map.on('click', function(evt) {
      // Do stuff
    });
    // Draw geometry on the closest point
    this.map.on('postcompose', (evt) => {
      const vectorContext = evt.vectorContext;
      vectorContext.setStyle(this.style);
      if (this.overlayShapes.point !== null) {
        vectorContext.drawGeometry(this.overlayShapes.point);
      }
      if (this.overlayShapes.line !== null) {
        // vectorContext.drawGeometry(this.overlayShapes.line);
      }
    });
  }

  displaySnap(coordinate) {
    // Fetch closest track from mouse coords
    const closestFeature = this.vectorSource.getClosestFeatureToCoordinate(coordinate);
    if (closestFeature === null) {
      this.overlayShapes.point = null;
      this.overlayShapes.line = null;
    } else {
      // Fetch closest point from mouse coords
      const geometry = closestFeature.getGeometry();
      const closestPoint = geometry.getClosestPoint(coordinate);
      if (this.overlayShapes.point === null) {
        this.overlayShapes.point = new Point(closestPoint);
      } else {
        this.overlayShapes.point.setCoordinates(closestPoint);
      }
      // Update data of the closest point
      this.infos.pilot = closestFeature.get('PLT');
      [this.infos.longitude, this.infos.latitude] = toLonLat([closestPoint[0], closestPoint[1]]);
      this.infos.altitude = closestPoint[2];
      this.infos.date = new Date(closestPoint[3] * 1000).toString();
      this.emitInfos();
      // Update shapes to draw for the closest point
      const coordinates = [coordinate, [closestPoint[0], closestPoint[1]]];
      if (this.overlayShapes.line === null) {
        this.overlayShapes.line = new LineString(coordinates);
      } else {
        this.overlayShapes.line.setCoordinates(coordinates);
      }
    }
    this.map.render();
  }

  // Function responsible for IGC file parsing
  parseIGCFile(filename: string, trackDay: string, callback) {
    let trackData: TrackPoint[] = [] as any;
    let hh, mm, ss, latitude, longitude, valid, pressure_alt, GPS_alt, accuracy, engine_RPM: string;

    this.get(filename, (data) => {
      // Separate rows and iterate through them
      const rows = data.split('\n');
      rows.forEach( (row) => {
        switch (row[0]) {
          case 'B': // B Record parsing
            hh = row.substring(1, 3);
            mm = row.substring(3, 5);
            ss = row.substring(5, 7);
            latitude = row.substring(7, 15);
            longitude = row.substring(15, 24);
            valid = row.substring(24, 25);
            pressure_alt = row.substring(25, 30);
            GPS_alt = row.substring(30, 35);
            accuracy = row.substring(35, 38);
            engine_RPM = row.substring(38, 42);

            trackData = [...trackData,
              {
                Time: new Date(`${trackDay}T${hh}:${mm}:${ss}`),
                Latitude: latitude,
                Longitude: longitude,
                Valid: valid === 'A',
                Pressure_alt: parseInt(pressure_alt, 10),
                GPS_alt: parseInt(GPS_alt, 10),
                Accuracy: parseInt(accuracy, 10),
                Engine_RPM: parseInt(engine_RPM, 10),
              } as TrackPoint
            ];
            break; // TODO Add test to check length of trackData
        }
      });
      callback(trackData);
    });
  }

  // Load a track as features into to tracks layer on the map
  loadTrack(trackData) {
    const features = this.fromTrackDataToFeatures(trackData);
    this.vectorSource.addFeatures(features);
    this.view.fit(this.vectorSource.getExtent());
  }

  // Delete all features from the tracks layer on the map
  clearTracks() {
    this.vectorSource.clear();
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
  updateDeltaValues(delta) {
    if (Math.abs(delta) !== Infinity) {
      if (delta < this.minDelta || this.minDelta == null) {
        this.minDelta = delta;
      } else if (delta > this.maxDelta || this.maxDelta == null) {
        this.maxDelta = delta;
      } else {
        return;
      }
      this.deltaRange = this.maxDelta - this.minDelta;
    }
  }

  // Convert parsed IGC coords ['5142113N','01751264E'] to float values in Decimal Degrees
  fromLonLatStr([lon, lat]: string[]) {
    const x = parseInt(lon.substr(0, 3), 10) + parseInt(lon.substr(3, 5), 10) / 60000;
    const y = parseInt(lat.substr(0, 2), 10) + parseInt(lat.substr(2, 5), 10) / 60000;
    const longitude = lon.substring(lon.length - 1) === 'E' ? x : -x;
    const latitude = lat.substring(lat.length - 1) === 'N' ? y : -y;
    return [longitude, latitude];
  }

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

  emitInfos() {
      this.infosSubject.next(this.infos);
  }
}
