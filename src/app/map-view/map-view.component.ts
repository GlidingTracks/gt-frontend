import { Component, OnInit } from '@angular/core';
import {MapViewService} from '../services/map-view.service';
import {Subscription} from 'rxjs';
import * as parseFilename from 'igc-filename-parser';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css']
})
export class MapViewComponent implements OnInit {
  // TODO Add tooltips to show altitude/time of the closest point

  // Test urls of IGC files
  igcUrls =  [
    '2018-08-12-XCT-MNO-02.igc',
    'https://firebasestorage.googleapis.com/v0/b/gt-backend-8b9c2.appspot.com/o/' +
      'HAGOdywD9rQayoOOIHyd?alt=media&token=f0511567-2b36-4689-802d-b80e5b52b2af',
    'http://openlayers.org/en/latest/examples/data/igc/Damien-de-Baenst.igc',
  ];
  // Display data
  currentPilot: string;
  currentLatitude: string;
  currentLongitude: string;
  currentAltitude: number;
  currentDate: string;
  infosSubscription: Subscription;

  // IGC file Parsing
  IGCFilename = this.igcUrls[0]; // TODO Connect urls to firestore
  IGCFilenameData = parseFilename(this.IGCFilename);
  trackDay: string;

  constructor(private mvs: MapViewService) { }

  ngOnInit() {
    // Bind variables
    this.infosSubscription = this.mvs.infosSubject.subscribe(
      (infos: any) => {
          this.currentPilot = infos.pilot;
          this.currentLatitude = infos.latitude;
          this.currentLongitude = infos.longitude;
          this.currentAltitude = Math.floor(infos.altitude);
          this.currentDate = infos.date;
      }
    );
    this.mvs.emitInfos();
    // Setup map view
    this.mvs.initMap();
    this.mvs.setupEvents();

    this.trackDay = this.IGCFilenameData !== null ? this.IGCFilenameData.date : '1970-01-01';
    // TODO Format Track infos + Metadata

    this.mvs.parseIGCFile(this.IGCFilename, this.trackDay, (trackData) => {
      this.mvs.loadTrack(trackData);
      console.log('totalDistance:', this.mvs.getTotalDistance(trackData));
      console.log('startAltitude:', this.mvs.getStartAltitude(trackData));
      console.log('stopAltitude:', this.mvs.getStopAltitude(trackData));
      console.log('highestPoint:', this.mvs.getHighestPoint(trackData));
      console.log('e2eDistance:', this.mvs.getE2EDistance(trackData));
    });
  }
}
