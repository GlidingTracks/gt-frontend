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
  currentAltitude: number;
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
        this.currentAltitude = Math.floor(infos.altitude);
        this.currentDate = infos.date;
      }
    );
    this.mvs.emitInfos();
    // Setup map view
    this.mvs.initMap();
    this.mvs.loadTrack(this.igcUrls);
    this.mvs.setupEvents();

    this.trackDay = this.IGCFilenameData.date;
    // TODO Format Track infos + Metadata

    this.mvs.parseIGCFile(this.IGCFilename, this.trackDay, (trackData) => {
      this.trackData = trackData;
      // console.log(this.trackData[0].Latitude, this.trackData[0].Longitude);
    });
  }
}
