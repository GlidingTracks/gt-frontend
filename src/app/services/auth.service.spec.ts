import { TestBed, fakeAsync, flushMicrotasks } from '@angular/core/testing';
import * as firebase from 'firebase';

import { AuthService } from './auth.service';

const email = 'test@test.com';
const password = 'password123';
const signin = () => firebase.auth().signInWithEmailAndPassword(email, password);
const signup = () => firebase.auth().createUserWithEmailAndPassword(email, password);

describe('AuthService', () => {
  let service: AuthService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.get(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('firebase app should be initialized', () => {
    expect(firebase.app.length).toBeGreaterThan(0);
  });

  it('getUserToken() should return "" if currentUser is null', async () => {
    const res = await service.getUserToken();
    expect(res).toBe('');
  });

  it('getUserID() should return "" if currentUser is null', async () => {
    const res = await service.getUserToken();
    expect(res).toBe('');
  });

  it('signOutUser() should sign out the user', () => {
    firebase.auth().signOut();
    expect(firebase.auth().currentUser).toBeFalsy();
  });
});
