import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userHandler(email: string, password: string, signMethod: string) {
    let func;
    if (signMethod === 'signIn') {
      func = () => firebase.auth().signInWithEmailAndPassword(email, password);
    } else if (signMethod === 'signUp') {
      func = () => firebase.auth().createUserWithEmailAndPassword(email, password);
    }
    return func();
  }

  signOutUser() {
    firebase.auth().signOut();
  }
}
