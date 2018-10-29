import { Component, OnInit } from '@angular/core';
import {MapViewService} from '../services/map-view.service';
import {Subscription} from 'rxjs';
import * as parseFilename from 'igc-filename-parser';
import {ParserService} from '../services/parser.service';
import {TrackPoint} from '../../track';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css']
})
export class MapViewComponent implements OnInit {

  // Display logic
  infoSwitch = false;

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
  // Turn-points data
  startPoint: TrackPoint;
  turnPoint1: TrackPoint;
  turnPoint2: TrackPoint;
  endPoint: TrackPoint;

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

    // Load the IGC file
    this.loadIGC(this.IGCFilename, this.trackDay);
  }

  // Load the IGC file and display the track on the map
  loadIGC(filename, dateTime) {
    // Parsing
    this.parser.parseIGCFile(filename, dateTime)
      .then(trackData => {
        // Loading track on the map
        this.map.loadTrack(trackData);
        // Display track information
        this.getTrackInfos(trackData);
        // Compute and load turn-points on the map
        const tpData = this.map.loadTurnPoints(trackData, 2);
        this.getTpInfos(tpData);
      })
      .catch(error => console.error(`Failed to parse ${this.IGCFilename} : ${error}`));
  }

  // Update general information about the track
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

  // Update information about turn-points
  getTpInfos(tpData) {
    [this.startPoint, this.turnPoint1, this.turnPoint2, this.endPoint] = tpData;
  }

  // Update position the track tooltip
  getScreenPos(index) {
    if (index === 0) {
      return this.currentScreenPos[0].toString() + 'px';
    } else if (index === 1) {
      return this.currentScreenPos[1].toString() + 'px';
    }
  }

  // Decide whether the track tooltip should be shown or not
  isShown() {
    if (this.isDragging || (this.currentScreenPos[0] === 0 && this.currentScreenPos[1] === 0)) {
      return 'hidden';
    } else {
      return 'visible';
    }
  }

  // Switch between general/turn-points information panel
  switchInfoPanel(value) {
    this.infoSwitch = value;
  }

  // Update the color of the general/turn-points information panels
  getSwitchColor(value) {
    return this.infoSwitch === value ? '#91de5b' : '#7cc254';
  }
}
