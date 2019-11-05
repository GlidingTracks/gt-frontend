import {Component, Input, OnInit} from '@angular/core';
import {TrackMetadata} from '../../track';
import * as firebase from 'firebase';
import {bind} from '@angular/core/src/render3';
import {DataService} from '../services/data.service';

@Component({
  selector: 'app-single-track',
  templateUrl: './single-track.component.html',
  styleUrls: ['./single-track.component.css']
})
export class SingleTrackComponent implements OnInit {

  @Input() track: TrackMetadata;
  url: any;

  constructor(private data: DataService) {
  }

  ngOnInit() {
  }

  showTacksOnMap() {
// Create a reference to the file we want to download
    firebase.storage().ref().child('' + this.track.TrackID).getDownloadURL().then(function (url) {
      // `url` is the download URL for 'images/stars.jpg'
      this.url = url;
      console.log(this.url);
      this.newMessage();
    }.bind(this)).catch(function (error) {
      // Handle any errors
      console.log(error);
    });
  }

  newMessage(): void {
    this.data.changeMessage(this.url);
  }
}
