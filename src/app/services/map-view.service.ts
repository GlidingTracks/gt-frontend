import { Injectable } from '@angular/core';

import Map from 'ol/Map';
import View from 'ol/View';
import {defaults as defaultControls} from 'ol/control';
import IGC from 'ol/format/IGC';
import {LineString, Point} from 'ol/geom';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import OSM from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';
import {toLonLat} from 'ol/proj';
import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapViewService {

  // Define base colors
  COLORS = {
    red: [255, 0, 0, 0.9],
    green: [0, 255, 0, 0.9],
    blue: [0, 0, 255, 0.9]
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
      fill: null,
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
    this.vectorSource.on('addfeature', (event) => {
      const geometry = event.feature.getGeometry();
      this.view.fit(geometry);
    });

    // Map creation
    this.map = new Map({
      layers: [
        new TileLayer({ // Set map background from OSM
          source: new OSM()
        }),
        new VectorLayer({ // Add layer for the tracks
          source: this.vectorSource,
          style: new Style({
            stroke: new Stroke({
              color: this.COLORS.red,
              width: 2
            })
          })
        })
      ],
      target: 'map',
      controls: defaultControls({ // Temporarily using default map controls
        attributionOptions: {
          collapsible: false
        }
      }),
      view: this.view
    });
  }

  loadTrack(igcUrls) {
    // Load features inside the source container
    const igcFormat = new IGC('gps');
    for (let i = 0; i < igcUrls.length; ++i) {
      this.get(igcUrls[i], (data) => {
        const features = igcFormat.readFeatures(data,
          {featureProjection: 'EPSG:3857'});
        this.vectorSource.addFeatures(features);
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
        vectorContext.drawGeometry(this.overlayShapes.line);
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
      this.infos.date = new Date(closestPoint[2] * 1000).toUTCString();
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
