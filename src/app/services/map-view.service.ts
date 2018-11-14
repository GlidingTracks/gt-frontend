import { Injectable } from '@angular/core';

import Map from 'ol/Map';
import View from 'ol/View';
import Feature from 'ol/Feature';
import {defaults as defaultControls} from 'ol/control';
import {LineString, Point } from 'ol/geom';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import OSM from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';
import {toLonLat, fromLonLat} from 'ol/proj';
import {Circle as CircleStyle, Fill, Stroke, Icon, Style} from 'ol/style';
import {Subject} from 'rxjs';
import {TrackPoint} from '../../track';
import {ParserService} from './parser.service';

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
  // Gradient for upward/downward movement
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
  vectorTp = new VectorSource();
  // Data for closest point
  infos = {
    screenPos: [0, 0],
    dragging: false,
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

  constructor(private parser: ParserService) { }

  initMap() {
    // Init View
    this.view = new View({ // Set the center position of the map view and the zoom level
      center: [0, 0],
      minZoom: 9,
      zoom: 10
    });

    // Map creation
    this.map = new Map({
      layers: [
        new TileLayer({ // Set map background from OSM
          source: new OSM({wrapX: false}),
        }),
        new VectorLayer({ // Add layer for the tracks
          source: this.vectorSource,
          style: this.trackStyleFunction()
        }),
        new VectorLayer({ // Add layer for the turn-points
          source: this.vectorTp,
          style: this.tpStyleFunction()
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
    this.map.render();
  }

  setupEvents() {
    // Event triggered each time the mouse moves over the map view
    this.map.on('pointermove', (evt) => {
      if (evt.dragging) {
        this.infos.dragging = true;
      } else {
        this.infos.dragging = false;
        const coordinate = this.map.getEventCoordinate(evt.originalEvent);
        this.displaySnap(coordinate);
      }
      this.emitInfos();
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

  // Detect the closest point from the given coordinates and setup the overlay for it
  displaySnap(coordinate) {
    // Fetch closest track from mouse coords
    const closestFeature = this.vectorSource.getClosestFeatureToCoordinate(coordinate);
    if (closestFeature === null) {
      this.overlayPoint = null;
    } else {
      // Fetch closest point from mouse coords
      const geometry = closestFeature.getGeometry();
      const closestPoint = geometry.getClosestPoint(coordinate);
      const pixel = this.map.getPixelFromCoordinate(closestPoint);
      if (this.overlayPoint === null) {
        this.overlayPoint = new Point(closestPoint);
      } else {
        this.overlayPoint.setCoordinates(closestPoint);
      }
      // Update data of the closest point
      this.updateInfos(closestPoint, pixel);
    }
    this.map.render();
  }

  // Load a track as features into to tracks layer on the map
  loadTrack(trackData) {
    const features = this.fromTrackDataToFeatures(trackData);
    this.vectorSource.clear();
    this.vectorSource.addFeatures(features);
    this.view.fit(this.vectorSource.getExtent());
  }

  // Load the turn-points as features on the map
  loadTurnPoints(trackData, tpData, trackId) {
    let tp, d, features;
    if (tpData === null) {
      [tp, d] = this.parser.TurnPointsDetection(trackData, 2);
      features = this.fromTrackDataToFeatures(tp as TrackPoint[]);
      this.parser.pushTpData(trackId, tp as TrackPoint[]);
    } else {
      features = this.fromTrackDataToFeatures(tpData as TrackPoint[]);
    }
    this.vectorTp.clear();
    this.vectorTp.addFeatures(features);
    return tpData ? tpData : tp;
  }

  /**
   * Create multiple features out of {@link trackData}.
   * @param trackData - The input track data points
   * @param dataPerFeature - The number of points per feature
   * @return An array with the created features
   */
  fromTrackDataToFeatures(trackData: TrackPoint[], dataPerFeature = 20) {
    const features = [];
    for (let i = 0; i < trackData.length; i += dataPerFeature - 1) {
      features.push(
        this.createSingleFeatureFromTrackData(trackData.slice(i, i + dataPerFeature))
      );
    }
    return features;
  }

  // Create a single feature out of the track data points array.
  createSingleFeatureFromTrackData(trackData) {
    let coords, point, alt1, alt2, t1, t2, delta;
    const geometry = new LineString([], 'XYZM');
    for (let i = 0; i < trackData.length; i++) {
      point = trackData[i];
      if (i === 0) {
        alt1 = point.GPS_alt;
        t1 = point.Time;
      } else if (i === trackData.length - 1) {
        alt2 = point.GPS_alt;
        t2 = point.Time;
      }
      // Coordinates projection from Decimal Degrees to EPSG:3857
      coords = fromLonLat([point.Longitude, point.Latitude]);
      coords = [...coords, point.GPS_alt, point.Time];
      geometry.appendCoordinate(coords);
    }
    // delta is the steepness of the upward/downward movement for the current geometry
    // delta > 0 means upward movement, else it's downward
    delta = (alt2 - alt1) / this.parser.getElapsedTime(t1, t2);
    this.updateDeltaValues(delta);
    return new Feature({
      geometry: geometry,
      delta_altitude: delta
    });
  }

  // Returns the maximum ascending speed reached during the flight
  getMaxAscendSpeed() {
    return this.maxDelta;
  }

  // Returns the maximum descending speed reached during the flight
  getMaxDescentSpeed() {
    return this.minDelta;
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

  // Style function to color code upward/downward movement to each feature of the track
  trackStyleFunction() {
    return (feature) => {
      const delta = feature.get('delta_altitude');
      // const i = Math.round((delta - this.minDelta) / this.deltaRange * (this.GRADIENT.length - 1));
      const i = Math.round(this.sigmoid(delta, this.deltaRange) * (this.GRADIENT.length - 1));
      const color = this.GRADIENT[this.GRADIENT.length - 1 - i];
      return new Style({
        stroke: new Stroke({
          color: color,
          width: 2
        })
      });
    };
  }

  // Style function for the turn-points visualization and start/end icons.
  tpStyleFunction() {
    return (feature) => {
      const coordinates = feature.getGeometry().getCoordinates();
      const styles = [
        new Style({
          stroke: new Stroke({
            color: [0, 0, 0, 0.3],
            width: 2
          })
        })];
      let src, color, anchor;
      for (let i = 0; i < coordinates.length; i++) {
        [src, color, anchor] = i === 0 ?
          ['assets/home-point.png', [0, 136, 30, 1], [.5, 1]] : i === coordinates.length - 1 ?
            ['assets/finish-flag.png', [0, 0, 0, 1], [.15, 1]] : ['assets/reload.png', [0, 60, 136, .3], [.5, .5]];
        styles.push(new Style({
          geometry: new Point(coordinates[i]),
          image: this.getIcon(src, color, anchor)
        }));
      }
      return styles;
    };
  }

  // Load an Icon
  getIcon(imagePath, color, anchor) {
    // <div>Icons made by <a href="http://www.freepik.com" title="Freepik">Freepik</a>
    // from<a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
    // is licensed by <a href="http://creativecommons.org/licenses/by/3.0/"
    //  title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
    return new Icon({
      src: imagePath,
      color: color,
      anchor: anchor
    });
  }

  // Sigmoid function for better color range coding of the upward/downward movement
  sigmoid(x, range) {
    return 1 / ( 1 + Math.exp(-8 * x / range));
  }

  // Update this.infos with the given data
  updateInfos(point: Point, screenPos) {
    this.infos.screenPos = screenPos.map(v => Math.round(v));
    [this.infos.longitude, this.infos.latitude] = toLonLat([point[0], point[1]]).map(v => Math.round(v * 1e6) / 1e6);
    this.infos.altitude = point[2];
    this.infos.date = new Date(point[3] * 1000).toString();
    this.emitInfos();
  }

  // Notify a change has been made to 'this.infos'
  emitInfos() {
      this.infosSubject.next(this.infos);
  }
}
