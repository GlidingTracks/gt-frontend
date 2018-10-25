import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TrackManagerService {
  backendBaseURL = 'https://gt-backend-test.herokuapp.com';

  constructor(private http: HttpClient) { }

  getTracks(idToken: string, privacy = 'Public') {
    const headers = new HttpHeaders()
      .set('token', idToken);
    return this.http.request('GET', this.backendBaseURL + '/getTracks', {headers});
  }
}
