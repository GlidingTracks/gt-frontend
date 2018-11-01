import { TestBed } from '@angular/core/testing';

import { MapViewService } from './map-view.service';
import { ParserService } from './parser.service';
import { Point } from 'ol/geom';
import { Icon } from 'ol/style';

const dummyPoint = [1234650, 4567809, 1050, 1541035627] as Point;

describe('MapViewService', () => {
  let service, parser;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    parser = new ParserService();
    service = new MapViewService(parser);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('initMap() should initialize this.view and this.map', () => {
    expect(service.view).toBeUndefined();
    expect(service.map).toBeUndefined();
    service.initMap();
    expect(service.view).toBeDefined();
    expect(service.map).toBeDefined();
  });

  it('updateDeltaValues() should update this.minDelta, this.maxDelta and this.deltaRange accordingly', () => {
    expect(service.minDelta).toEqual(Infinity);
    expect(service.maxDelta).toEqual(-Infinity);
    expect(service.deltaRange).toBeUndefined();
    service.updateDeltaValues(0);
    expect(service.minDelta).toEqual(0);
    expect(service.maxDelta).toEqual(-Infinity);
    expect(service.deltaRange).toEqual(-Infinity - 0);
    service.updateDeltaValues(100);
    expect(service.minDelta).toEqual(0);
    expect(service.maxDelta).toEqual(100);
    expect(service.deltaRange).toEqual(100 - 0);
  });

  it('getMaxAscendSpeed() should return this.maxDelta', () => {
    const res = service.getMaxAscendSpeed();
    expect(res).toEqual(service.maxDelta);
  });

  it('getMaxDescentSpeed() should return this.minDelta', () => {
    const res = service.getMaxDescentSpeed();
    expect(res).toEqual(service.minDelta);
  });

  it('updateInfos() should update this.infos', () => {
    service.updateInfos(dummyPoint, [400, 600]);
    expect(service.infos.screenPos).toEqual([400, 600]);
    expect([service.infos.longitude, service.infos.latitude]).toEqual([11.091050, 37.917721]);
    expect(service.infos.altitude).toEqual(1050);
    expect(service.infos.date).toEqual(new Date(1541035627 * 1000).toString());
  });

  it('emitInfos() should update this.infosSubject obervable to this.infos', () => {
    service.updateInfos(dummyPoint, [400, 600]);
    service.infosSubject.subscribe(
      infos => expect(infos).toEqual(service.infos)
    );
  });

  it('getIcon() should return an object of type Icon', () => {
    const res = service.getIcon('asset/reload.png', [255, 0, 0, 1], [.5, .5]);
    expect(res instanceof Icon).toEqual(true);
  });
});
