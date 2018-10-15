import { TestBed } from '@angular/core/testing';

import { TrackManagerService } from './track-manager.service';
import {HttpClient} from '@angular/common/http';

const httpClientSpy = jasmine.createSpyObj('Router', ['get']);

describe('TrackManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      { provide: HttpClient, useValue: httpClientSpy }
    ]
  }));

  it('should be created', () => {
    const service: TrackManagerService = TestBed.get(TrackManagerService);
    expect(service).toBeTruthy();
  });
});
