import { Injectable } from '@angular/core';
import {TrackPoint} from '../../track';
import {getDistance} from 'ol/sphere';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ParserService {

  flightDuration;
  totalDistance;
  e2eDistance;
  startAltitude;
  stopAltitude;
  highestPoint;

  constructor(private http: HttpClient) {}

  TurnPointsDetection(trackData, nPoints) {
    let resultDist = 0;
    let resultPath = [];
    if (nPoints > 1) {
      let path1, path2, dist1, dist2;
      for (let i = 0; i < trackData.length - 1; i++) {
        path1 = [trackData[0], trackData[i]];
        dist1 = this.getPathDistance(path1);
        [path2, dist2] = this.TurnPointsDetection(trackData.slice(i), nPoints - 1);
        if (dist1 + dist2 > resultDist) {
          resultPath = path1.concat(path2.slice(1));
          resultDist = dist1 + dist2;
        }
      }
    } else {
      let path, dist;
      for (let j = 0; j < trackData.length - 1; j++) {
        path = [trackData[0], trackData[j], trackData[trackData.length - 1]];
        dist = this.getPathDistance(path);
        if (dist > resultDist) {
          resultPath = path;
          resultDist = dist;
        }
      }
    }
    return [resultPath, resultDist];
  }

  // Function responsible for IGC file parsing
  async parseIGCFile(filename: string, trackDay: string) {
    let trackData: TrackPoint[] = [] as any;
    let p: string[];
    // Accessing the file form its url
    const data = await this.get(filename);
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
              Latitude: this.parseCoord(p[3]),
              Longitude: this.parseCoord(p[4]),
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
    return trackData;
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

  // Convert parsed IGC coord '5142113N' or '01751264E' to float values in Decimal Degrees
  parseCoord(value) {
    const i = value.length === 9 ? 3 : 2; // If true longitude, else latitude type
    const c = value.substring(value.length - 1); // cardinal character
    const result = parseInt(value.substr(0, i), 10) + parseInt(value.substr(i, 5), 10) / 60000;
    return c === 'N' || c === 'E' ? result : -result;
  }

  // Returns the total length of the track in meters
  getTotalDistance(trackData) {
    if (!this.totalDistance) {
      this.totalDistance = this.getPathDistance(trackData);
    }
    return this.totalDistance;
  }

  getPathDistance(trackData) {
    let c1, c2, d = 0;
    for (let i = 0; i < trackData.length - 1; i++) {
      c1 = [trackData[i].Longitude, trackData[i].Latitude];
      c2 = [trackData[i + 1].Longitude, trackData[i + 1].Latitude];
      d += getDistance(c1, c2);
    }
    return d;
  }

  // Returns the altitude in meters at the beginning of the track
  getStartAltitude(trackData) {
    if (!this.startAltitude) {
      this.startAltitude = trackData[0].GPS_alt;
    }
    return this.startAltitude;
  }

  // Returns the altitude in meters at the end of the track
  getStopAltitude(trackData) {
    if (!this.stopAltitude) {
      this.stopAltitude = trackData[trackData.length - 1].GPS_alt;
    }
    return this.stopAltitude;
  }

  // Returns the greatest altitude reached during the flight in meters
  getHighestPoint(trackData) {
    if (!this.highestPoint) {
      this.highestPoint = 0;
      trackData.forEach( point =>
        this.highestPoint = point.GPS_alt > this.highestPoint ? point.GPS_alt : this.highestPoint
      );
    }
    return this.highestPoint;
  }

  // Returns the time elapsed between t1 and t2 in seconds
  getElapsedTime(t1, t2) {
    return (t2 - t1) / 1000;
  }

  // Returns to total duration of the flight
  getFlightDuration(trackData) {
    if (!this.flightDuration) {
      const t1 = trackData[0].Time;
      const t2 = trackData[trackData.length - 1].Time;
      const deltaT = this.getElapsedTime(t1, t2);
      const hours = Math.floor(deltaT / 3600);
      const minutes = Math.floor((deltaT % 3600) / 60);
      const seconds = Math.floor(deltaT % 60);
      this.flightDuration = `${hours}h${minutes}m${seconds}s`;
    }
    return this.flightDuration;
  }

  // Returns the distance in meters between the start and the end points
  getE2EDistance(trackData) {
    if (!this.e2eDistance) {
      const c1 = [trackData[0].Longitude, trackData[0].Latitude];
      const c2 = [trackData[trackData.length - 1].Longitude, trackData[trackData.length - 1].Latitude];
      this.e2eDistance = getDistance(c1, c2);
    }
    return this.e2eDistance;
  }

  async get(url) {
    const response = await fetch(url);
    return await response.text();
  }
}
