import {Component, OnInit} from '@angular/core';
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

  token: any;
  tracks: TrackMetadata[];

  constructor(private tracksManager: TrackManagerService,
              private authService: AuthService) {
  }

  ngOnInit() {
    firebase.auth().onAuthStateChanged(
      (user) => {
        if (user) {
          user.getIdToken(/* forceRefresh */ true).then(function (idToken) {
            this.token = idToken;
          }.bind(this)).catch(function (error) {
            // Handle error
            console.log(error);
          });
        } else {
          this.token = '';
        }
        console.log(this.token);
        this.showTracks();
      }
    );
  }

  showTracks() {
    if (this.token) {
      console.log(this.token);
      this.tracksManager.getTracks(this.token, 'Public')
        .subscribe((data: TrackMetadata[]) => {
          console.log(data);
          this.tracks = data;
        });
    }
  }
}
