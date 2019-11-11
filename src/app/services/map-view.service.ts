import {Injectable} from '@angular/core';

import Map from 'ol/Map';
import View from 'ol/View';
import Feature from 'ol/Feature';
import {defaults as defaultControls} from 'ol/control';
import {LineString, Point, GeometryLayout} from 'ol/geom';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import OSM from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';
import {toLonLat, fromLonLat} from 'ol/proj';
import {getLength, getDistance} from 'ol/sphere';
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
  // Data for closest point
  infos = {
    screenPos: [0, 0],
    dragging: false,
    latitude: '',
    longitude: '',
    altitude: 0,
    date: Date(),
    status: ''
  };
  infosSubject = new Subject<any>();
  overlayPoint = null;
  // Track data
  minDelta = Infinity;
  maxDelta = -Infinity;
  deltaRange;
  flightDuration;
  totalDistance;
  e2eDistance;
  startAltitude;
  stopAltitude;
  highestPoint;
  pilot;
  timeFlight = 0;
  timeSinking = 0;
  timeLift = 0;
  timeThermal = 0;
  timeSoaring = 0;

  constructor() {
  }

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
      this.updateInfos(closestFeature, closestPoint, pixel);
    }
    this.map.render();
  }

  // Function responsible for IGC file parsing
  parseIGCFile(filename: string, trackDay: string, callback) {
    console.log(filename);
    let trackData: TrackPoint[] = [] as any;
    let p: string[];
    let flag = true;
    // Accessing the file form its url
    this.get(filename, (data) => {
      // Separate rows and iterate through them
      const rows = data.split('\n');
      this.timeSinking = 0;
      this.timeLift = 0;
      this.timeThermal = 0;
      this.timeFlight = 0;
      this.timeSoaring = 0;
      rows.forEach((row) => {
        switch (row[0]) {
          case 'B': // B Record
            let timeInterval = 1;
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
                Status: p[10],
              } as TrackPoint
            ];
            if (flag) {
              flag = false;
            } else {
              timeInterval = Math.abs(trackData[trackData.length - 1].Time.getSeconds() - trackData[trackData.length - 2].Time.getSeconds());
              // console.log('timeInterval: ' + timeInterval);
            }
            // console.log(row);
            if (row.indexOf('flight') !== -1) {
              this.timeFlight = this.timeFlight + timeInterval;
              // console.log('this is time flight');
            }
            if (row.indexOf('soaring') !== -1) {
              this.timeSoaring += timeInterval;
            }
            if (row.indexOf('lift') !== -1) {
              this.timeLift += timeInterval;
            }
            if (row.indexOf('thermal') !== -1) {
              this.timeThermal += timeInterval;
            }
            if (row.indexOf('sinking') !== -1) {
              this.timeSinking += timeInterval;
            }
            break; // TODO Add test to check length of trackData

          case 'H': // H Record parsing
            // tslint:disable-next-line:no-unused-expression
            if (row.substring(2, 5) === 'PLT') {
              row.indexOf(':');
              this.pilot = row.substring(row.indexOf(':') + 1);
            }
            break;
        }
      });
      callback(trackData);
    });
  }

  // Parse a single IGC B record string into a string array
  parseBrecord(s: string) {
    // tslint:disable-next-line:triple-equals
    // console.log(s);
    let sIndex;
    if (s.indexOf('flight') !== -1) {
      sIndex = s.indexOf('flight');
    } else if (s.indexOf('severe') !== -1) {
      sIndex = s.indexOf('severe');
    } else if (s.indexOf('sinking') !== -1) {
      sIndex = s.indexOf('sinking');
    } else if (s.indexOf('lift') !== -1) {
      sIndex = s.indexOf('lift');
    } else if (s.indexOf('thermal') !== -1) {
      sIndex = s.indexOf('thermal');
    }
    return [
      s.substring(1, 3), s.substring(3, 5), s.substring(5, 7), // hours, minutes, seconds
      s.substring(7, 15), s.substring(15, 24),                 // latitude, longitude
      s.substring(24, 25),                                     // valid
      s.substring(25, 30), s.substring(30, 35),                // pressure alt, gps alt
      s.substring(35, 38), s.substring(38, 42),                 // accuracy; engine rpm
      s.substring(sIndex)                               // flight status
    ];
  }

  //

  // Load a track as features into to tracks layer on the map
  loadTrack(trackData) {
    this.vectorSource.clear();
    const features = this.fromTrackDataToFeatures(trackData);
    this.vectorSource.addFeatures(features);
    this.view.fit(this.vectorSource.getExtent());
  }

  // Create feature from track data
  fromTrackDataToFeatures(trackData: TrackPoint[], dataPerFeature = 20) {
    const features = [];
    let geometry, coords, point, alt1, alt2, t1, t2, delta;
    for (let i = 0; i < trackData.length; i += dataPerFeature - 1) {
      geometry = new LineString([], 'XYZM');
      for (let j = i; j < i + dataPerFeature && i < trackData.length - dataPerFeature; j++) {
        point = trackData[j];
        if (j === i) {
          alt1 = point.GPS_alt;
          t1 = point.Time;
        } else if (j === i + dataPerFeature - 1) {
          alt2 = point.GPS_alt;
          t2 = point.Time;
        }
        // Coordinates projection from Decimal Degrees to EPSG:3857
        coords = fromLonLat(this.fromLonLatStr([point.Longitude, point.Latitude]));
        coords = [...coords, point.GPS_alt, point.Status];
        // coords = [...coords, pint.GPS_alt, point.Time.getTime() / 1000, point.Status];
        geometry.appendCoordinate(coords);
        // console.log(coords);
      }
      // delta is the steepness of the upward/downward movement for the current geometry
      // delta > 0 means upward movement, else it's downward
      delta = (alt2 - alt1) / this.getElapsedTime(t1, t2);
      this.updateDeltaValues(delta);
      features.push(new Feature({
        geometry: geometry,
        delta_altitude: delta
      }));
    }
    return features;
  }

  // Returns the Pilot name

  getPilot() {
    return this.pilot;
  }

  getTimeFlight() {
    const deltaT = this.timeFlight;
    const hours = Math.floor(deltaT / 3600);
    const minutes = Math.floor((deltaT % 3600) / 60);
    const seconds = Math.floor(deltaT % 60);
    return `${hours}h${minutes}m${seconds}s`;
  }

  getTimeSoaring() {
    const deltaT = this.timeSoaring;
    const hours = Math.floor(deltaT / 3600);
    const minutes = Math.floor((deltaT % 3600) / 60);
    const seconds = Math.floor(deltaT % 60);
    return `${hours}h${minutes}m${seconds}s`;
  }

  getTimeThermal() {
    const deltaT = this.timeThermal * 0.7;
    const hours = Math.floor(deltaT / 3600);
    const minutes = Math.floor((deltaT % 3600) / 60);
    const seconds = Math.floor(deltaT % 60);
    return `${hours}h${minutes}m${seconds}s`;
  }

  getTimeLift() {
    const deltaT = this.timeLift * 0.3;
    const hours = Math.floor(deltaT / 3600);
    const minutes = Math.floor((deltaT % 3600) / 60);
    const seconds = Math.floor(deltaT % 60);
    return `${hours}h${minutes}m${seconds}s`;
  }

  getTimeSinking() {
    const deltaT = this.timeSinking;
    const hours = Math.floor(deltaT / 3600);
    const minutes = Math.floor((deltaT % 3600) / 60);
    const seconds = Math.floor(deltaT % 60);
    return `${hours}h${minutes}m${seconds}s`;
  }

  // Returns the total length of the track in meters
  getTotalDistance(trackData) {
    // if (!this.totalDistance) {
    this.totalDistance = 0;
    let c1, c2;
    for (let i = 0; i < trackData.length - 1; i++) {
      c1 = this.fromLonLatStr([trackData[i].Longitude, trackData[i].Latitude]);
      c2 = this.fromLonLatStr([trackData[i + 1].Longitude, trackData[i + 1].Latitude]);
      this.totalDistance += getDistance(c1, c2);
    }

    // }
    console.log(this.totalDistance);
    return this.totalDistance;
  }

  // Returns the altitude in meters at the beginning of the track
  getStartAltitude(trackData) {
    // if (!this.startAltitude) {
    this.startAltitude = trackData[0].GPS_alt;
    // }
    return this.startAltitude;
  }

  // Returns the altitude in meters at the end of the track
  getStopAltitude(trackData) {
    // if (!this.stopAltitude) {
    this.stopAltitude = trackData[trackData.length - 1].GPS_alt;
    // }
    return this.stopAltitude;
  }

  // Returns the greatest altitude reached during the flight in meters
  getHighestPoint(trackData) {
    // if (!this.highestPoint) {
    this.highestPoint = 0;
    trackData.forEach(point =>
      this.highestPoint = point.GPS_alt > this.highestPoint ? point.GPS_alt : this.highestPoint
    );
    // }
    return this.highestPoint;
  }

  // Returns the maximum ascending speed reached during the flight
  getMaxAscendSpeed() {
    return this.maxDelta;
  }

  // Returns the maximum descending speed reached during the flight
  getMaxDescentSpeed() {
    return this.minDelta;
  }

  // Returns the time elapsed between t1 and t2 in seconds
  getElapsedTime(t1, t2) {
    return (t2 - t1) / 1000;
  }

  // Returns to total duration of the flight
  getFlightDuration(trackData) {
    // if (!this.flightDuration) {
    const t1 = trackData[0].Time;
    const t2 = trackData[trackData.length - 1].Time;
    const deltaT = this.getElapsedTime(t1, t2);
    const hours = Math.floor(deltaT / 3600);
    const minutes = Math.floor((deltaT % 3600) / 60);
    const seconds = Math.floor(deltaT % 60);
    this.flightDuration = `${hours}h${minutes}m${seconds}s`;
    // }
    return this.flightDuration;
  }

  // Returns the distance in meters between the start and the end points
  getE2EDistance(trackData) {
    // if (!this.e2eDistance) {
    const c1 = this.fromLonLatStr([trackData[0].Longitude, trackData[0].Latitude]);
    const c2 = this.fromLonLatStr([trackData[trackData.length - 1].Longitude, trackData[trackData.length - 1].Latitude]);
    this.e2eDistance = getDistance(c1, c2);
    // }
    return this.e2eDistance;
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

  // Sigmoid function for better color range coding of the upward/downward movement
  sigmoid(x, range) {
    return 1 / (1 + Math.exp(-8 * x / range));
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
  updateInfos(feature: Feature, point: Point, screenPos) {
    this.infos.screenPos = screenPos.map(v => Math.round(v));
    [this.infos.longitude, this.infos.latitude] = toLonLat([point[0], point[1]]);
    this.infos.altitude = point[2];
    this.infos.date = new Date(point[3] * 1000).toString();
    this.infos.status = point[3];
    console.log(point[3])
    if (point[3].indexOf('NaN') !== -1) {
      this.infos.status = point[3].substring(0, point[3].indexOf('NaN'));
    }
    this.emitInfos();
  }

  // Notify a change has been made to 'this.infos'
  emitInfos() {
    this.infosSubject.next(this.infos);
  }
}
