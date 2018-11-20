import {Component, Input, OnInit} from '@angular/core';
import {TrackMetadata} from '../../track';
import {MapViewComponent} from '../map-view/map-view.component';
import {TrackManagerService} from '../services/track-manager.service';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-single-track',
  templateUrl: './single-track.component.html',
  styleUrls: ['./single-track.component.css']
})
export class SingleTrackComponent implements OnInit {

  @Input() track: TrackMetadata;
  uid = '';
  ownedFilter = false;
  more = false;

  constructor(
    private mapview: MapViewComponent,
    private manager: TrackManagerService,
    private auth: AuthService) {}

  ngOnInit() {
    this.filter();
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

  filter() {
    this.uid = this.auth.getUserID();
    this.ownedFilter = this.uid === this.track.UID;
  }

  showMore() {
    this.more = !this.more;
  }

  changePrivacy() {
      const privacy = '' + !this.track.Privacy;
      this.manager.updatePrivacy(this.track.TrackID, privacy);
  }

  deleteTrack() {
    this.manager.deleteTrack(this.track.TrackID);
  }
}
