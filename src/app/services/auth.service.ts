import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  async getUserToken() {
    if (firebase.auth().currentUser !== null) {
      return await firebase.auth().currentUser.getIdToken();
    }
    return '';
  }

  getUserID() {
    if (firebase.auth().currentUser !== null) {
      return firebase.auth().currentUser.uid;
    }
    return '';
  }

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
