import { Component, OnInit } from '@angular/core';
import {TrackManagerService} from '../services/track-manager.service';
import {AuthService} from '../services/auth.service';
import * as firebase from 'firebase';
import {TrackMetadata} from '../../track';

@Component({
  selector: 'app-tracks',
  templateUrl: './tracks.component.html',
  styleUrls: ['./tracks.component.css']
})
export class TracksComponent implements OnInit {

  uid: string;
  idToken: string;
  tracks;

  constructor(private tracksManager: TrackManagerService,
              private authService: AuthService) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged(
      (user) => {
        if (user) {
          this.uid = user.uid;
          user.getIdToken().then( (token) => {
            this.idToken = token;
          });
        } else {
          this.uid = '';
          this.idToken = '';
        }
      }
    );
  }

  showTracks() {
    if (this.uid && this.idToken) {
      this.tracksManager.getTracks(this.idToken, 'Public')
        .subscribe(
          (data) => {
            console.log(data);
            this.tracks = data;
          },
          (error) => {
            console.warn(error);
        });
    }
  }
}
