import {Component, Input, OnInit} from '@angular/core';
import {TrackMetadata} from '../../track';
import {MapViewComponent} from '../map-view/map-view.component';
import * as firebase from 'firebase';
import {TrackManagerService} from '../services/track-manager.service';

@Component({
  selector: 'app-single-track',
  templateUrl: './single-track.component.html',
  styleUrls: ['./single-track.component.css']
})
export class SingleTrackComponent implements OnInit {

  @Input() track: TrackMetadata;

  uid: string;
  idToken: string;
  more: boolean = false;

  constructor(
    private mapview: MapViewComponent,
    private manager: TrackManagerService) {}

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

  useTrack() {
    this.mapview.loadIGC(this.track);
  }


  // from https://stackoverflow.com/questions/51682514/how-download-a-file-from-httpclient#
  downloadTrack() {
    const TrackID = this.track.TrackID;
    this.manager.getTrack(TrackID).then(
      (response: any) => {
        const dataType = response.type;
        const binaryData = [];
        binaryData.push(response);
        const downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
        document.body.appendChild(downloadLink);
        downloadLink.click();
      }
    );
  }

  showMore(){
    this.more=!this.more;
  }

  changePrivacy(){
    const privacy = "" + !this.track.Privacy;
    this.manager.updatePrivacy(this.track.TrackID, privacy);
  }

}
