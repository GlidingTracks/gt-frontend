import { TestBed } from '@angular/core/testing';

import { TrackManagerService } from './track-manager.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

describe('TrackManagerService', () => {
  let service: TrackManagerService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule ]
    });
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(TrackManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getHeadersWithToken should return type Promise<HttpHeaders> with the "token" header', async () => {
    const result = await service.getHeadersWithToken();
    expect(result).toEqual(jasmine.any(HttpHeaders));
    expect(result.has('token')).toBeTruthy();
  });

  it('getHeadersWithTokenAndTrackID should return type Promise<HttpHeaders> with the "token" & "trackID" headers', async () => {
    const result = await service.getHeadersWithTokenAndTrackID('');
    expect(result).toEqual(jasmine.any(HttpHeaders));
    expect(result.has('token')).toBeTruthy();
    expect(result.has('trackID')).toBeTruthy();
  });

  afterEach( () => {
    httpTestingController.verify();
  });
});
