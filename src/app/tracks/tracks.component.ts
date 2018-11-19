import { Component, OnInit } from '@angular/core';
import {TrackManagerService} from '../services/track-manager.service';
import { TrackPoint } from 'src/track';

@Component({
  selector: 'app-tracks',
  templateUrl: './tracks.component.html',
  styleUrls: ['./tracks.component.css']
})
export class TracksComponent implements OnInit {

  currentPage = 1;
  tracks: TrackPoint[];
  trackPages: TrackPoint[][];
  infoSwitch = false;

  constructor(private trackManager: TrackManagerService) { }

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.currentPage = 1;
    this.trackPages = [];
    if (this.infoSwitch) {
      this.showOwnTracks();
    } else {
      this.showTracks();
    }

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
      .then(data => {
        this.tracks = data as TrackPoint[];
        this.trackPages.push(this.tracks);
      })
      .catch( error => console.warn(error));
  }

  showNewTracks(timeSkip) {
    this.trackManager.getTracks('Public', timeSkip)
      .then(data => {
        this.tracks = data as TrackPoint[];
        this.trackPages.push(this.tracks);
      })
      .catch( error => console.warn(error));
  }

  showPreviousTracks() {
    if (this.currentPage === 1) {
      return;
    }
    this.tracks = this.trackPages[this.currentPage];
    this.currentPage--;
  }

  showNextTracks() {
    if (this.trackPages.length === this.currentPage) { // Need to load new tracks
      const timeSkip = this.tracks[this.tracks.length - 1].Time;
      this.showNewTracks(timeSkip);
    } else { // Next page already stored locally
      this.tracks = this.trackPages[this.currentPage];
    }
    this.currentPage++;
  }

  showOwnTracks() {
    this.trackManager.getTracks('Private')
      .then(data => this.tracks = data  as TrackPoint[])
      .catch( error => console.warn(error));
  }
}
