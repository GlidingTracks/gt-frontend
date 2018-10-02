import { Component, OnInit } from '@angular/core';
import {MapViewService} from '../services/map-view.service';
import {Subscription} from 'rxjs';
import {toLonLat, fromLonLat} from 'ol/proj';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css']
})
export class MapViewComponent implements OnInit {

  // Test urls of IGC files
  igcUrls =  [
    'http://openlayers.org/en/latest/examples/data/igc/Clement-Latour.igc',
    // 'http://openlayers.org/en/latest/examples/data/igc/Damien-de-Baenst.igc',
    // 'http://openlayers.org/en/latest/examples/data/igc/Tom-Payne.igc',
    // 'http://openlayers.org/en/latest/examples/data/igc/Sylvain-Dhonneur.igc',
    // 'http://openlayers.org/en/latest/examples/data/igc/Ulrich-Prinz.igc',
  ];
  // Display data
  currentPilot: string;
  currentLatitude: string;
  currentLongitude: string;
  currentDate: string;
  infosSubscription: Subscription;

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
  }
}
