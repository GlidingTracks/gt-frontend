import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { AuthService } from './auth.service';
import { TrackPoint } from '../../track';

@Injectable({
  providedIn: 'root'
})
export class TrackManagerService {
  backendBaseURL = 'https://gt-backend-test.herokuapp.com';

  constructor(private http: HttpClient,
              private auth: AuthService) { }

  async getTracks(privacy = 'Public', timeSkip = 1) {
    const idToken = await this.auth.getUserToken();
    const headers = new HttpHeaders()
      .set('token', idToken)
      .set('queryType', privacy)
      .set('timeSkip', timeSkip.toString());
    return await this.http.request('GET', this.backendBaseURL + '/getTracks', {headers}).toPromise();
  }

  async getTrack(trackID: string) {
    const idToken = await this.auth.getUserToken();
    const headers = new HttpHeaders()
      .set('token', idToken)
      .set('trackID', trackID);
    return await this.http.request('GET', this.backendBaseURL + '/getTrack', {headers, responseType: 'text'}).toPromise();
  }

  async insertTrackPoint(trackId: string, tpData: TrackPoint[]) {
    const idToken = await this.auth.getUserToken();
    const headers = new HttpHeaders()
      .set('token', idToken)
      .set('trackID', trackId)
      .set('trackPoints', JSON.stringify(tpData));
    return (await this.http.request('PUT', this.backendBaseURL + '/insertTrackPoint', {headers})).toPromise();
  }
}
