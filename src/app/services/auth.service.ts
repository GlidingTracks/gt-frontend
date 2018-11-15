import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  async getUserToken() {
    return await firebase.auth().currentUser.getIdToken();
  }

  async getUserID() {
    return await firebase.auth().currentUser.uid;
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
