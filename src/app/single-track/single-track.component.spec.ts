import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleTrackComponent } from './single-track.component';
import { MapViewComponent } from '../map-view/map-view.component';
import {HttpClient} from '@angular/common/http';
import {TrackMetadata} from '../../track';

const httpClientSpy = jasmine.createSpyObj('Router', ['get']);
const mapViewSpy = jasmine.createSpyObj('Router', ['loadIGC']);

describe('SingleTrackComponent', () => {
  let component: SingleTrackComponent;
  let fixture: ComponentFixture<SingleTrackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SingleTrackComponent,
      ],
      providers: [
        { provide: HttpClient, useValue: httpClientSpy },
        { provide: MapViewComponent, useValue: mapViewSpy }
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleTrackComponent);
    component = fixture.componentInstance;
    component.track = {
      Privacy: true,
      Record: {
        Manufacturer: null,
        Header: {
          Pilot: 'Toto',
          FlightRecorderType: null,
          GliderType: null,
          GliderID: null,
          FirmwareVersion: null,
          HardwareVersion: null,
          Date: null}
      },
      Time: null,
      TrackID: null,
      TrackPoints: null,
      UID: 'BDrDvjCY45gUS3pKpYrivWCVhor2'
    } as TrackMetadata;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
