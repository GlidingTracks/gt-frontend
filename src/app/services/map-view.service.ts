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

  constructor() { }

  initMap() {
    // Init View
    this.view = new View({ // Set the center position of the map view and the zoom level
      center: [0, 0],
      zoom: 9
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

  loadTrack(igcUrls) {
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
      this.infos.date = new Date(closestPoint[3] * 1000).toUTCString();
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
      const features = this.fromTrackDataToFeatures(trackData);
      this.vectorSource.clear();
      this.vectorSource.addFeatures(features);
    });
  }

  // Create feature from track data
  fromTrackDataToFeatures(trackData: TrackPoint[], dataPerFeature = 20) {
    const features = [];
    let geometry, coords, point, alt_debut, alt_fin;
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
      features.push(new Feature({
        geometry: geometry,
        delta_altitude: alt_fin - alt_debut
      }));
    }
    return features;
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
      const color = delta > 0 ? this.COLORS.red : this.COLORS.blue; // TODO map level according to upward/downward movement
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
