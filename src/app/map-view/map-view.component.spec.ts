import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapViewComponent } from './map-view.component';
import {LatitudePipe} from '../pipes/latitude.pipe';
import {LongitudePipe} from '../pipes/longitude.pipe';
import {Component, NO_ERRORS_SCHEMA} from '@angular/core';
import {MeterPipe} from '../pipes/meter.pipe';

@Component({ selector: 'app-tracks', template: ''})
class TracksStubComponent {}

describe('MapViewComponent', () => {
  let component: MapViewComponent;
  let fixture: ComponentFixture<MapViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MapViewComponent,
        TracksStubComponent,
        LatitudePipe,
        LongitudePipe,
        MeterPipe
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
