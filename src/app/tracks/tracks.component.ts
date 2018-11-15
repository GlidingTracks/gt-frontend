import { Component, OnInit } from '@angular/core';
import {TrackManagerService} from '../services/track-manager.service';

@Component({
  selector: 'app-tracks',
  templateUrl: './tracks.component.html',
  styleUrls: ['./tracks.component.css']
})
export class TracksComponent implements OnInit {

  tracks;
  infoSwitch = false;

  constructor(private trackManager: TrackManagerService) { }

  ngOnInit() {
    this.showTracks();
  }

  // Switch between public/own tracks
  switchTracksPanel(value) {
    this.infoSwitch = value;
  }

  // Update the color of the public/own tracks panel
  getTracksColor(value) {
    return this.infoSwitch === value ? '#91de5b' : '#7cc254';
  }

  showTracks() {
    this.trackManager.getTracks('Public')
      .then(data => this.tracks = data)
      .catch( error => console.warn(error));
  }

  showOwnTracks() {
    this.trackManager.getTracks('Private')
      .then(data => this.tracks = data)
      .catch( error => console.warn(error));
  }
}
