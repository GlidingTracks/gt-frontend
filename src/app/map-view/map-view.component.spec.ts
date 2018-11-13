import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapViewComponent } from './map-view.component';
import {Component, NO_ERRORS_SCHEMA} from '@angular/core';
import {MeterPipe} from '../pipes/meter.pipe';
import { GeoPipe } from '../pipes/geo.pipe';
import { MapViewService } from '../services/map-view.service';
import {HttpClient} from '@angular/common/http';

const httpClientSpy = jasmine.createSpyObj('Router', ['get']);
@Component({ selector: 'app-tracks', template: ''})
class TracksStubComponent {}

describe('MapViewComponent', () => {
  let component: MapViewComponent;
  let fixture: ComponentFixture<MapViewComponent>;
  let map: MapViewService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MapViewComponent,
        TracksStubComponent,
        GeoPipe,
        MeterPipe
      ],
      providers: [
        { provide: HttpClient, useValue: httpClientSpy }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapViewComponent);
    component = fixture.componentInstance;
    map = TestBed.get(MapViewService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('date should be in the right form', () => {
    const ex_dataTime = '120818';
    expect('20' + ex_dataTime.substr(4, 2) + '-' + ex_dataTime.substr(2, 2) + '-' + ex_dataTime.substr(0, 2)).toEqual('2018-08-12');
    });

  it('tooltip information should be up to date with infosSubject obervable', () => {
    component.subscribeTooltipInfo();
    map.infosSubject.subscribe( infos => {
      expect(component.currentScreenPos).toEqual(infos.screenPos);
      expect(component.isDragging).toEqual(infos.isDragging);
      expect(component.currentLatitude).toEqual(infos.latitude);
      expect(component.currentLongitude).toEqual(infos.longitude);
      expect(component.currentAltitude).toEqual(Math.floor(infos.altitude));
      expect(component.currentDate).toEqual(infos.date);
    });
  });

  it('switchInfoPanel() should set this.infoSwitch', () => {
    component.switchInfoPanel(true);
    expect(component.infoSwitch).toEqual(true);
    component.switchInfoPanel(false);
    expect(component.infoSwitch).toEqual(false);
  });

  it('getSwitchColor() should return the right color depending on this.infoSwitch', () => {
    component.switchInfoPanel(true);
    expect(component.getSwitchColor(true)).toEqual('#91de5b');
    expect(component.getSwitchColor(false)).toEqual('#7cc254');
    component.switchInfoPanel(false);
    expect(component.getSwitchColor(false)).toEqual('#91de5b');
    expect(component.getSwitchColor(true)).toEqual('#7cc254');
  });
});
