import { Component, OnInit } from '@angular/core';
import Feature from 'ol/Feature';
import Map from 'ol/Map';
import View from 'ol/View';
import {defaults as defaultControls} from 'ol/control';
import IGC from 'ol/format/IGC';
import {LineString, Point} from 'ol/geom';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import OSM, {ATTRIBUTION} from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';
import {fromLonLat} from 'ol/proj';
import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css']
})
export class MapViewComponent implements OnInit {

  // Test urls of IGC files
  igcUrls =  [
    'http://openlayers.org/en/latest/examples/data/igc/Clement-Latour.igc',
    'http://openlayers.org/en/latest/examples/data/igc/Damien-de-Baenst.igc',
    'http://openlayers.org/en/latest/examples/data/igc/Tom-Payne.igc',
    'http://openlayers.org/en/latest/examples/data/igc/Sylvain-Dhonneur.igc',
    'http://openlayers.org/en/latest/examples/data/igc/Ulrich-Prinz.igc',
  ];

  constructor() { }

  ngOnInit() {
    // Tests colors
    const colors = {
      'Clement Latour': 'rgba(0, 0, 255, 0.7)',
      'Damien de Baesnt': 'rgba(0, 215, 255, 0.7)',
      'Sylvain Dhonneur': 'rgba(0, 165, 255, 0.7)',
      'Tom Payne': 'rgba(0, 255, 255, 0.7)',
      'Ulrich Prinz': 'rgba(0, 215, 255, 0.7)'
    };

    // Load colors for each pilot, for test purposes
    const styleCache = {};
    const styleFunction = function(feature) {
      const color = colors[feature.get('PLT')];
      let myStyle = styleCache[color];
      if (!myStyle) {
        myStyle = new Style({
          stroke: new Stroke({
            color: color,
            width: 3
          })
        });
        styleCache[color] = style;
      }
      return style;
    };

    // Container for the tracks
    const vectorSource = new VectorSource();

    // Load features inside the source container
    const igcFormat = new IGC();
    for (let i = 0; i < this.igcUrls.length; ++i) {
      this.get(this.igcUrls[i], function(data) {
        const features = igcFormat.readFeatures(data,
          {featureProjection: 'EPSG:3857'});
        vectorSource.addFeatures(features);
      });
    }

    // From sample code, not usefull
    const time = {
      start: Infinity,
      stop: -Infinity,
      duration: 0
    };
    vectorSource.on('addfeature', function(event) {
      const geometry = event.feature.getGeometry();
      time.start = Math.min(time.start, geometry.getFirstCoordinate()[2]);
      time.stop = Math.max(time.stop, geometry.getLastCoordinate()[2]);
      time.duration = time.stop - time.start;
    });

    // Map creation
    const map = new Map({
      layers: [
        new TileLayer({ // Set map background from OSM
          source: new OSM()
        }),
        new VectorLayer({ // Add layer for the tracks
          source: vectorSource,
          style: styleFunction
        })
      ],
      target: 'map',
      controls: defaultControls({ // Temporarily using default map controls
        attributionOptions: {
          collapsible: false
        }
      }),
      view: new View({ // Set the center position of the map view and the zoom level
        center: [703365.7089403362, 5714629.865071137],
        zoom: 9
      })
    });

    // Select the closest data point from the mouse cursor
    let point = null;
    let line = null;
    const displaySnap = function(coordinate) {
      const closestFeature = vectorSource.getClosestFeatureToCoordinate(coordinate);
      const info = document.getElementById('info');
      const pilot = document.getElementById('pilot');
      if (closestFeature === null) {
        point = null;
        line = null;
        info.innerHTML = '&nbsp;';
      } else {
        const geometry = closestFeature.getGeometry();
        const closestPoint = geometry.getClosestPoint(coordinate);
        if (point === null) {
          point = new Point(closestPoint);
        } else {
          point.setCoordinates(closestPoint);
        }
        const date = new Date(closestPoint[2] * 1000);
        pilot.innerHTML = 'Pilot: ' + closestFeature.get('PLT');
        info.innerHTML =
          closestFeature.get('PLT') + ' (' + date.toUTCString() + ')';
        const coordinates = [coordinate, [closestPoint[0], closestPoint[1]]];
        if (line === null) {
          line = new LineString(coordinates);
        } else {
          line.setCoordinates(coordinates);
        }
      }
      map.render();
    };

    // Event triggered each time the mouse moves over the map view
    map.on('pointermove', function(evt) {
      if (evt.dragging) {
        return;
      }
      const coordinate = map.getEventCoordinate(evt.originalEvent);
      displaySnap(coordinate);
    });

    // Event triggered each time the map view is clicked
    map.on('click', function(evt) {
      displaySnap(evt.coordinate);
    });

    // Draw geometry on the closest point
    const stroke = new Stroke({
      color: 'rgba(255,0,0,0.9)',
      width: 1
    });
    const style = new Style({
      stroke: stroke,
      image: new CircleStyle({
        radius: 5,
        fill: null,
        stroke: stroke
      })
    });
    map.on('postcompose', function(evt) {
      const vectorContext = evt.vectorContext;
      vectorContext.setStyle(style);
      if (point !== null) {
        vectorContext.drawGeometry(point);
      }
      if (line !== null) {
        vectorContext.drawGeometry(line);
      }
    });

    // Create a new Layer
    const featureOverlay = new VectorLayer({
      source: new VectorSource(),
      map: map,
      style: new Style({
        image: new CircleStyle({
          radius: 5,
          fill: new Fill({
            color: 'rgba(255,0,0,0.9)'
          })
        })
      })
    });
  }

  // GET html request
  get(url, callback) {
    const client = new XMLHttpRequest();
    client.open('GET', url);
    client.onload = function () {
      callback(client.responseText);
    };
    client.send();
  }
}
