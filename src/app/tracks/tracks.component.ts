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

  constructor(private trackManager: TrackManagerService) { }

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.currentPage = 1;
    this.trackPages = [];
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
}
