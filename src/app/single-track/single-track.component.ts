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
    this.mapview.loadIGC(this.idToken, this.track);
  }


  // Stolen from https://stackoverflow.com/questions/51682514/how-download-a-file-from-httpclient#
  /**
   * Method is use to download file.
   * @param data - Array Buffer data
   * @param type - type of the document.
   */
  /*downloadFile(data: any, type: string)
  {
    let blob = new Blob([data], { type: type});
    let url = window.URL.createObjectURL(blob);
    let pwa = window.open(url);
    console.log(url);
    if (!pwa || pwa.closed || typeof pwa.closed == 'undefined')
    {
      alert( 'Please disable your Pop-up blocker and try again.');
    }
  }*/

  downloadTrack() {
    const TrackID = this.track.TrackID;
    this.manager.getTrack(this.idToken, TrackID).subscribe(
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
}
