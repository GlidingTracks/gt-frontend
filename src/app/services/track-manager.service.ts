import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import {findProblemCode} from "codelyzer/angular/styles/cssLexer";

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
      .set('file', data)
      .set('Content-Type', 'multipart/form-data');
    return this.http.request('POST', this.backendBaseURL + '/insertTrack', {headers}).toPromise();
  }

  insertTracks(idToken: string, privacy: string = 'false', file) {
    const headers = new HttpHeaders()
      .set('token', idToken)
      .set('Content-Type', 'multipart/form-data');
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    const request = new HttpRequest('POST', this.backendBaseURL + '/insertTrack', formData, {headers});
    return this.http.request(request).toPromise();
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
