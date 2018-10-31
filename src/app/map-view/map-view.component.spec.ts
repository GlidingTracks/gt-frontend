import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapViewComponent } from './map-view.component';
import {Component, NO_ERRORS_SCHEMA} from '@angular/core';
import {MeterPipe} from '../pipes/meter.pipe';
import { GeoPipe } from '../pipes/geo.pipe';

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
        GeoPipe,
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
