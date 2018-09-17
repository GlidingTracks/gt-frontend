import { Component } from '@angular/core';
import * as configFile from 'firebase-config.json';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'Gliding Tracks';

  constructor() {
    const config = {
      apiKey: (<any>configFile).apiKey,
      authDomain: (<any>configFile).authDomain,
      databaseURL: (<any>configFile).databaseURL,
      projectId: (<any>configFile).projectId,
      storageBucket: (<any>configFile).storageBucket,
      messagingSenderId: (<any>configFile).messagingSenderId
  };
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }
  }
}
