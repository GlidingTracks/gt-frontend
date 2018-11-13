import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { AuthService } from './auth.service';
import { TrackPoint } from '../../track';

@Injectable({
  providedIn: 'root'
})
export class TrackManagerService {
  backendBaseURL = 'https://gt-backend-test.herokuapp.com';
  backendTestURL = 'https://gt-backend-test-pr-17.herokuapp.com/';

  constructor(private http: HttpClient,
              private auth: AuthService) { }

  getTracks(idToken: string, privacy = 'Public') {
    const headers = new HttpHeaders()
      .set('token', idToken);
    return this.http.request('GET', this.backendBaseURL + '/getTracks', {headers});
  }

  getTrack(idToken: string, TrackID: string) {
    const headers = new HttpHeaders()
      .set('token', idToken)
      .set('TrackID', TrackID);
    return this.http.request('GET', this.backendBaseURL + '/getTrack', {headers, responseType: 'text'});
  }

  async insertTrackPoint(trackId: string, tpData: TrackPoint[]) {
    const idToken = await this.auth.getUserToken();
    const headers = new HttpHeaders()
      .set('token', idToken)
      .set('trackID', trackId)
      .set('trackPoints', JSON.stringify(tpData));
    return await this.http.request('PUT', this.backendTestURL + '/insertTrackPoint', {headers});
  }
}
