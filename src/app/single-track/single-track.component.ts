import {Component, Input } from '@angular/core';
import {TrackMetadata} from '../../track';
import {MapViewComponent} from '../map-view/map-view.component';
import {TrackManagerService} from '../services/track-manager.service';

@Component({
  selector: 'app-single-track',
  templateUrl: './single-track.component.html',
  styleUrls: ['./single-track.component.css']
})
export class SingleTrackComponent {

  @Input() track: TrackMetadata;

  constructor(
    private mapview: MapViewComponent,
    private manager: TrackManagerService) {}

  useTrack() {
    this.mapview.loadIGC(this.track);
  }

  // Stolen from https://stackoverflow.com/questions/51682514/how-download-a-file-from-httpclient#
  downloadTrack() {
    const trackID = this.track.TrackID;
    this.manager.getTrack(trackID)
    .then(response => {
        const binaryData = [];
        binaryData.push(response);
        const downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(new Blob(binaryData));
        document.body.appendChild(downloadLink);
        downloadLink.click();
      }
    );
  }
}
