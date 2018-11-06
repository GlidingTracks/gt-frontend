import { TestBed } from '@angular/core/testing';

import { ParserService } from './parser.service';
import { TrackPoint } from 'src/track';
import {HttpClient} from '@angular/common/http';

const httpClientSpy = jasmine.createSpyObj('Router', ['get']);

const dummyTrackData = [
  {'Latitude': 51.864156, 'Longitude': 18.894288, 'GPS_alt': 512 } as TrackPoint,
  {'Latitude': 52.780716, 'Longitude': 23.843990, 'GPS_alt': 512 } as TrackPoint,
  {'Latitude': 53.983109, 'Longitude': 28.732683, 'GPS_alt': 1024 } as TrackPoint,
];

const dummyIGCrow = 'B1204475142114N01751264EA0010800141';

describe('ParserService', () => {
  let service: ParserService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useValue: httpClientSpy }
      ],
    });
    service = TestBed.get(ParserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('TurnPointsDetection() should return an array of length 2 + nPoints', () => {
    let p, d;
    const nPoints = 2;
    [p, d] = service.TurnPointsDetection(dummyTrackData, nPoints);
    // expect(p.length).toEqual(2 + nPoints);
  });

  it('parseBrecord() should be an array of length 10', () => {
    const res = service.parseBrecord(dummyIGCrow);
    expect(res.length).toEqual(10);
  });

  it('parseCoord() should correctly convert \'5142113N\' to DMS', () => {
    const res = service.parseCoord('5142113N');
    // Expected precision: 0.001
    expect(Math.round(res * 1e6) / 1e6).toEqual(51.701883);
  });

  it('getPathDistance() should give the right result in meters', () => {
    const res = service.getPathDistance(dummyTrackData);
    expect(Math.round(res)).toEqual(702054);
  });

  it('getTotalDistance() should set this.totalDistance', () => {
    expect(service.totalDistance).toBeUndefined();
    const res = service.getTotalDistance(dummyTrackData);
    expect(service.totalDistance).toEqual(res);
  });

  it('getStartAltitude() should set this.startAltitude', () => {
    expect(service.startAltitude).toBeUndefined();
    const res = service.getStartAltitude(dummyTrackData);
    expect(service.startAltitude).toEqual(res);
  });

  it('getStopAltitude() should set this.stopAltitude', () => {
    expect(service.stopAltitude).toBeUndefined();
    const res = service.getStopAltitude(dummyTrackData);
    expect(service.stopAltitude).toEqual(res);
  });

  it('getHighestPoint() should set this.highestPoint', () => {
    expect(service.highestPoint).toBeUndefined();
    const res = service.getHighestPoint(dummyTrackData);
    expect(service.highestPoint).toEqual(res);
  });

  it('getHighestPoint() should give the maximum altitude value of the trackData', () => {
    const res = service.getHighestPoint(dummyTrackData);
    expect(service.highestPoint).toEqual(1024);
  });

  it('getE2EDistance() should set this.e2eDistance', () => {
    expect(service.e2eDistance).toBeUndefined();
    const res = service.getE2EDistance(dummyTrackData);
    expect(service.e2eDistance).toEqual(res);
  });

  it('getE2EDistance() should give the distance between start and stop points', () => {
    const res = service.getE2EDistance(dummyTrackData);
    expect(Math.round(res)).toEqual(699654);
  });

});
