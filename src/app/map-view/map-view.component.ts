import { Component, OnInit } from '@angular/core';
import {MapViewService} from '../services/map-view.service';
import {Subscription} from 'rxjs';
import * as parseFilename from 'igc-filename-parser';
import {TrackPoint} from '../../track';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css']
})
export class MapViewComponent implements OnInit {
  // TODO Add tooltips to show altitude/time of the closest point
  // TODO Format TrackPoint color depending of the altitude

  // Test urls of IGC files
  igcUrls =  [
    // 'http://openlayers.org/en/latest/examples/data/igc/Clement-Latour.igc',
    // 'http://openlayers.org/en/latest/examples/data/igc/Damien-de-Baenst.igc',
    // 'http://openlayers.org/en/latest/examples/data/igc/Tom-Payne.igc',
    // 'http://openlayers.org/en/latest/examples/data/igc/Sylvain-Dhonneur.igc',
    // 'http://openlayers.org/en/latest/examples/data/igc/Ulrich-Prinz.igc',
   '2018-08-12-XCT-MNO-02.igc'
  ];
  // Display data
  currentPilot: string;
  currentLatitude: string;
  currentLongitude: string;
  currentDate: string;
  infosSubscription: Subscription;

  // IGC file Parsing
  IGCFilename = '2018-08-12-XCT-MNO-02.igc';
  IGCFilenameData = parseFilename(this.IGCFilename);
  trackData: TrackPoint[] = [];
  trackDay: string;

  constructor(private mvs: MapViewService) { }

  ngOnInit() {
    // Bind variables
    this.infosSubscription = this.mvs.infosSubject.subscribe(
      (infos: any) => {
        this.currentPilot = infos.pilot;
        this.currentLatitude = infos.latitude;
        this.currentLongitude = infos.longitude;
        this.currentDate = infos.date;
      }
    );
    this.mvs.emitInfos();
    // Setup map view
    this.mvs.initMap();
    this.mvs.loadTrack(this.igcUrls);
    this.mvs.setupEvents();

    console.log(this.IGCFilenameData.date);
    this.trackDay = this.IGCFilenameData.date;
    // TODO Format Track infos + Metadata

    this.parseIGCFile(this.IGCFilename);
  }

  // Function responsible for IGC file parsing
  parseIGCFile(filename: string) {
    let hh, mm, ss, latitude, longitude, valid, pressure_alt, GPS_alt, accuracy, engine_RPM: string;

    this.mvs.get(this.IGCFilename, (data) => {
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

            this.trackData = [...this.trackData,
              {
                Time: new Date(`${this.trackDay}T${hh}:${mm}:${ss}`),
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
      console.log(this.trackData);
    });
  }
}
