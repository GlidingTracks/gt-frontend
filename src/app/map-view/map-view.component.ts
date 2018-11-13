import { Component, OnInit } from '@angular/core';
import {MapViewService} from '../services/map-view.service';
import {Subscription} from 'rxjs';
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
  trackDay: string;


  constructor(private map: MapViewService,
              private parser: ParserService) { }
  ngOnInit() {
    // TODO Add IGC file loaded by default

    // Bind tooltip variables
    this.subscribeTooltipInfo();

    // Setup map view
    this.map.initMap();
    this.map.setupEvents();

  }

  // Subscribe to the observable from MapViewService
  subscribeTooltipInfo() {
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
  }

  // Load the IGC file and display the track on the map
  loadIGC(idToken, metadata) {
    // Parsing metadata
    const TrackID = metadata.TrackID;
    const metadataTime = metadata.Record.Header.Date;
    const dateTime = '20' + metadataTime.substr(4, 2) + '-' + metadataTime.substr(2, 2) + '-' + metadataTime.substr(0, 2);
    this.pilot = metadata.Record.Header.Pilot;

    // Parsing
    this.parser.parseIGCFile(idToken, TrackID, dateTime)
      .then(trackData => {
        this.trackDay = dateTime;
        // Loading track on the map
        this.map.loadTrack(trackData);
        // Display track information
        this.getTrackInfos(trackData);
        // Compute and load turn-points on the map
        const tpData = this.map.loadTurnPoints(trackData, 2);
        this.getTpInfos(tpData);
      })
      .catch(error => console.error(`Failed to parse ${TrackID} : ${error}`));
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
