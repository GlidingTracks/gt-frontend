import {Component, Input, OnInit} from '@angular/core';
import {TrackMetadata} from '../../track';

@Component({
  selector: 'app-single-track',
  templateUrl: './single-track.component.html',
  styleUrls: ['./single-track.component.css']
})
export class SingleTrackComponent implements OnInit {

  @Input() track: TrackMetadata;

  constructor() { }

  ngOnInit() {
  }

}
