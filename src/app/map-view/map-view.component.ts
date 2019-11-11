import {Component, ElementRef, OnInit, Renderer2} from '@angular/core';
import {MapViewService} from '../services/map-view.service';
import {Subscription} from 'rxjs';
import * as parseFilename from 'igc-filename-parser';
import {DataService} from '../services/data.service';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css']
})
export class MapViewComponent implements OnInit {

  // url of IGC files
  igcUrls = 'https://firebasestorage.googleapis.com/v0/b/gt-backend-8b9c2.appspot.com/o/' +
    'HAGOdywD9rQayoOOIHyd?alt=media&token=f0511567-2b36-4689-802d-b80e5b52b2af';

  // Display data
  currentLatitude: string;
  currentLongitude: string;
  currentAltitude: number;
  currentDate: string;
  currentStatus: string;
  currentScreenPos;
  isDragging;
  infosSubscription: Subscription;
  urlSubscription: Subscription;
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

  flightThermal: string;
  flightLift: string;
  flightFlight: string;
  flightSoaring: string;
  flightSinking: string;

  // IGC file Parsing
  IGCFilename = this.igcUrls; // TODO Connect urls to firestore
  IGCFilenameData = parseFilename(this.IGCFilename); // TODO Get pilot name
  trackDay: string;

  constructor(private mvs: MapViewService, private data: DataService, private el: ElementRef, private renderer2: Renderer2) {
  }

  ngOnInit() {
    this.urlSubscription = this.data.currentMessage.subscribe(url => {
      this.IGCFilename = url;
      this.IGCFilenameData = parseFilename(this.IGCFilename);
      console.log(this.IGCFilename);
      this.trackDay = this.IGCFilenameData !== null ? this.IGCFilenameData.date : '1970-01-01';
      // TODO Format Track infos + Metadata from frontend
      this.mvs.parseIGCFile(this.IGCFilename, this.trackDay, (trackData) => {
        this.mvs.loadTrack(trackData);
        this.getTrackInfos(trackData);
      });
    });
    // Bind variables
    this.infosSubscription = this.mvs.infosSubject.subscribe(
      (infos: any) => {
        this.currentScreenPos = infos.screenPos;
        this.isDragging = infos.dragging;
        this.currentLatitude = infos.latitude;
        this.currentLongitude = infos.longitude;
        this.currentAltitude = Math.floor(infos.altitude);
        this.currentDate = infos.date;
        this.currentStatus = infos.status;
      }
    );
    this.mvs.emitInfos();
    // Setup map view
    this.mvs.initMap();
    this.mvs.setupEvents();

    this.trackDay = this.IGCFilenameData !== null ? this.IGCFilenameData.date : '1970-01-01';
    // TODO Format Track infos + Metadata from frontend

    this.mvs.parseIGCFile(this.IGCFilename, this.trackDay, (trackData) => {
      this.mvs.loadTrack(trackData);
      this.getTrackInfos(trackData);
    });
  }

  getTrackInfos(trackData) {
    this.flightDuration = this.mvs.getFlightDuration(trackData);
    this.totalDistance = this.mvs.getTotalDistance(trackData);
    this.startAltitude = this.mvs.getStartAltitude(trackData);
    this.stopAltitude = this.mvs.getStopAltitude(trackData);
    this.highestPoint = this.mvs.getHighestPoint(trackData);
    this.e2eDistance = this.mvs.getE2EDistance(trackData);
    this.maxAscendSpeed = this.mvs.getMaxAscendSpeed();
    this.maxDescentSpeed = this.mvs.getMaxDescentSpeed();
    this.pilot = this.mvs.getPilot();
    this.flightSoaring = this.mvs.getTimeSoaring();
    this.flightFlight = this.mvs.getTimeFlight();
    this.flightThermal = this.mvs.getTimeThermal();
    this.flightSinking = this.mvs.getTimeSinking();
    this.flightLift = this.mvs.getTimeLift();

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
