import { TestBed } from '@angular/core/testing';

import { AuthGuardService } from './auth-guard.service';
import {Router} from '@angular/router';
import * as firebase from 'firebase';

const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

describe('AuthGuardService', () => {
  let service;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ {provide: Router, useValue: routerSpy }]
    });
    service = TestBed.get(AuthGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('firebase app should be initialized', () => {
    expect(firebase.app.length).toBeGreaterThan(0);
  });
});
