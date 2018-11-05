import {Component, Input, OnInit} from '@angular/core';
import {TrackMetadata} from '../../track';
import {MapViewComponent} from "../map-view/map-view.component";
import * as firebase from "firebase";

@Component({
  selector: 'app-single-track',
  templateUrl: './single-track.component.html',
  styleUrls: ['./single-track.component.css']
})
export class SingleTrackComponent implements OnInit {

  @Input() track: TrackMetadata;

  uid: string;
  idToken: string;

  constructor(
    private mapview:MapViewComponent) {}

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

  useTrack(){
    const TrackID = this.track.TrackID;
    const dateTime = this.track.Time;
    this.mapview.loadIGC(this.idToken, TrackID, dateTime);
  }

}
