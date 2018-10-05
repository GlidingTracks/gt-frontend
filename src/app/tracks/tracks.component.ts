import { Component, OnInit } from '@angular/core';
import {TrackManagerService} from '../services/track-manager.service';
import {AuthService} from '../services/auth.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-tracks',
  templateUrl: './tracks.component.html',
  styleUrls: ['./tracks.component.css']
})
export class TracksComponent implements OnInit {

  uid: string;
  tracks: Track[];

  constructor(private tracksManager: TrackManagerService,
              private authService: AuthService) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged(
      (user) => {
        if (user) {
          this.uid = user.uid;
          this.showTracks();
        } else {
          this.uid = '';
        }
      }
    );
  }

  showTracks() {
    if (this.uid) {
      console.log(this.uid);
      this.tracksManager.getTracks(this.uid, 'Public')
        .subscribe((data: Track[]) => {
          console.log(data);
          this.tracks = data;
        });
    }
  }
}
