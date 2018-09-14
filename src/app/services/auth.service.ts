import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable()
export class AuthService {

  isAuth: boolean;
  isAuthSubject = new Subject<boolean>();

  constructor() { }

  emitIsAuthSubject(){
    this.isAuthSubject.next(this.isAuth);
  }

  signInUser() {
    this.isAuth = true;
    console.log("User signed in!");
    this.emitIsAuthSubject();
  }

  signOutUser() {
    this.isAuth = false;
    console.log("User signed out!");
    this.emitIsAuthSubject();
  }
}
