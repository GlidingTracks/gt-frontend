import { TestBed } from '@angular/core/testing';

import { AuthGuardService } from './auth-guard.service';
import {Router} from '@angular/router';

const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

describe('AuthGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [ {provide: Router, useValue: routerSpy }]
  }));

  it('should be created', () => {
    const service: AuthGuardService = TestBed.get(AuthGuardService);
    expect(service).toBeTruthy();
  });
});
