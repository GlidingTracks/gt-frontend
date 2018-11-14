import { Component, OnInit } from '@angular/core';
import {TrackManagerService} from '../services/track-manager.service';

@Component({
  selector: 'app-tracks',
  templateUrl: './tracks.component.html',
  styleUrls: ['./tracks.component.css']
})
export class TracksComponent implements OnInit {

  tracks;

  constructor(private trackManager: TrackManagerService) { }

  ngOnInit() {
    this.showTracks();
  }

  showTracks() {
    this.trackManager.getTracks('Public')
      .then(data => this.tracks = data)
      .catch( error => console.warn(error));
  }
}
