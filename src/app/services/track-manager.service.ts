import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class TrackManagerService {
  backendBaseURL = 'https://gt-backend-test.herokuapp.com';

  constructor(private http: HttpClient) { }

  async insertTracksURL(idToken: string, privacy: string = 'true', fileURL: string, ) {
    // Accessing the file form its url (async/await syntax)
    const data = await this.get(fileURL);

    // Parameters used to call the insertTracks method
    const headers = new HttpHeaders()
      .set('token', idToken)
      .set('private', privacy)
      .set('file', data);
    return this.http.request('POST', this.backendBaseURL + '/insertTrack', {headers}).toPromise();
  }

  insertTracks(idToken: string, privacy: string = 'false', file: string) {
    // Accessing the file form its url (async/await syntax)
    const headers = new HttpHeaders()
      .set('token', idToken)
      .set('private', privacy)
      .set('file', file);
    return this.http.request('POST', this.backendBaseURL + '/insertTrack', {headers}).toPromise();
  }

  getTracks(idToken: string, privacy = 'Public') {
    const headers = new HttpHeaders()
      .set('token', idToken);
    return this.http.request('GET', this.backendBaseURL + '/getTracks', {headers});
  }

  // GET request using async/await syntax and fetch API
  async get(url) {
    const response = await fetch(url);
    return await response.text();
  }
}
