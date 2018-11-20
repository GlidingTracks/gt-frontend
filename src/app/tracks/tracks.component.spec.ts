import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TracksComponent } from './tracks.component';
import {Component, NO_ERRORS_SCHEMA} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { TrackMetadata } from 'src/track';

const httpClientSpy = jasmine.createSpyObj('Router', ['get']);

@Component({ selector: 'app-single-track', template: ''})
class SingleTrackStubComponent {}

describe('TracksComponent', () => {
  let component: TracksComponent;
  let fixture: ComponentFixture<TracksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TracksComponent,
        SingleTrackStubComponent
      ],
      providers: [
        { provide: HttpClient, useValue: httpClientSpy }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TracksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('refresh() should reset the values of "currentPage" and "trackPages"', () => {
    component.refresh();
    expect(component.currentPage).toEqual(1);
    expect(component.trackPages).toEqual([]);
  });

  it('switchTracksPanel(value) should set "infoSwitch" to "value"', () => {
    component.infoSwitch = null;
    component.switchTracksPanel(true);
    expect(component.infoSwitch).toEqual(true);
    component.switchTracksPanel(false);
    expect(component.infoSwitch).toEqual(false);
  });

  it('getTracksColor(value) should return the correct color', () => {
    component.switchTracksPanel(true);
    expect(component.getTracksColor(true)).toEqual('#91de5b');
    expect(component.getTracksColor(false)).toEqual('#7cc254');
    component.switchTracksPanel(false);
    expect(component.getTracksColor(false)).toEqual('#91de5b');
    expect(component.getTracksColor(true)).toEqual('#7cc254');
  });

  it('showPreviousTracks() should not change "currentPage" nor "tracks" if "currentPage === 1"', () => {
    component.currentPage = 1;
    const t = component.tracks;
    component.showPreviousTracks();
    expect(component.currentPage).toEqual(1);
    expect(component.tracks).toEqual(t);
  });

  it('showPreviousTracks() should decrement "currentPage" and update "trackPages" if "currentPage > 1"', () => {
    component.currentPage = 2;
    const t = [{}, {}, {}] as TrackMetadata[];
    component.tracks = t;
    component.showPreviousTracks();
    expect(component.currentPage).toEqual(1);
    expect(component.tracks).not.toEqual(t);
  });

  it('showNextTracks() should increment "currentPage"', () => {
    component.currentPage = 1;
    component.showNextTracks();
    expect(component.currentPage).toEqual(2);
  });

  it('getPrivacy() should return the correct string depending on the value of "infoSwitch"', () => {
    component.infoSwitch = true;
    expect(component.getPrivacy()).toEqual('Private');
    component.infoSwitch = false;
    expect(component.getPrivacy()).toEqual('Public');
  });
});
