import { Component, OnInit } from '@angular/core';
import {MapViewService} from '../services/map-view.service';
import {Subscription} from 'rxjs';
import * as parseFilename from 'igc-filename-parser';
import {ParserService} from '../services/parser.service';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css']
})
export class MapViewComponent implements OnInit {

  // Test urls of IGC files
  igcUrls =  [
    '2018-08-12-XCT-MNO-02.igc',
    'https://firebasestorage.googleapis.com/v0/b/gt-backend-8b9c2.appspot.com/o/' +
      'HAGOdywD9rQayoOOIHyd?alt=media&token=f0511567-2b36-4689-802d-b80e5b52b2af',
    'http://openlayers.org/en/latest/examples/data/igc/Damien-de-Baenst.igc',
  ];
  // Display data
  currentLatitude: string;
  currentLongitude: string;
  currentAltitude: number;
  currentDate: string;
  currentScreenPos;
  isDragging;
  infosSubscription: Subscription;
  // Track data
  pilot: string;
  flightDuration: string;
  totalDistance: number;
  startAltitude: number;
  stopAltitude: number;
  highestPoint: number;
  e2eDistance: number;
  maxAscendSpeed: number;
  maxDescentSpeed: number;

  // IGC file Parsing
  IGCFilename = this.igcUrls[2]; // TODO Connect urls to firestore
  IGCFilenameData = parseFilename(this.IGCFilename); // TODO Get pilot name
  trackDay: string;

  constructor(private map: MapViewService,
              private parser: ParserService) { }

  ngOnInit() {
    // Bind variables
    this.infosSubscription = this.map.infosSubject.subscribe(
      (infos: any) => {
        this.currentScreenPos = infos.screenPos;
        this.isDragging = infos.dragging;
        this.currentLatitude = infos.latitude;
        this.currentLongitude = infos.longitude;
        this.currentAltitude = Math.floor(infos.altitude);
        this.currentDate = infos.date;
      }
    );
    this.map.emitInfos();
    // Setup map view
    this.map.initMap();
    this.map.setupEvents();

    this.trackDay = this.IGCFilenameData !== null ? this.IGCFilenameData.date : '1970-01-01';
    // TODO Format Track infos + Metadata from backend

    this.parser.parseIGCFile(this.IGCFilename, this.trackDay, (trackData) => {
      this.map.loadTrack(trackData);
      this.getTrackInfos(trackData);
    });
  }

  getTrackInfos(trackData) {
    this.flightDuration = this.parser.getFlightDuration(trackData);
    this.totalDistance = this.parser.getTotalDistance(trackData);
    this.startAltitude = this.parser.getStartAltitude(trackData);
    this.stopAltitude = this.parser.getStopAltitude(trackData);
    this.highestPoint = this.parser.getHighestPoint(trackData);
    this.e2eDistance = this.parser.getE2EDistance(trackData);
    this.maxAscendSpeed = this.map.getMaxAscendSpeed();
    this.maxDescentSpeed = this.map.getMaxDescentSpeed();
  }

  getScreenPos(index) {
    if (index === 0) {
      return this.currentScreenPos[0].toString() + 'px';
    } else if (index === 1) {
      return this.currentScreenPos[1].toString() + 'px';
    }
  }

  isShown() {
    if (this.isDragging || (this.currentScreenPos[0] === 0 && this.currentScreenPos[1] === 0)) {
      return 'hidden';
    } else {
      return 'visible';
    }
  }
}
