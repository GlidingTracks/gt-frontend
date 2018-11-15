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

  async getTracks(privacy = 'Public') {
    const idToken = await this.auth.getUserToken();
    const headers = new HttpHeaders()
      .set('token', idToken)
      .set('queryType', privacy);
    return await this.http.request('GET', this.backendBaseURL + '/getTracks', {headers}).toPromise();
  }

  async getTrack(trackID: string) {
    const idToken = await this.auth.getUserToken();
    const headers = new HttpHeaders()
      .set('token', idToken)
      .set('trackID', trackID);
    return await this.http.request('GET', this.backendBaseURL + '/getTrack', {headers, responseType: 'text'}).toPromise();
  }

  async insertTrackPoint(trackID: string, tpData: TrackPoint[]) {
    const idToken = await this.auth.getUserToken();
    const headers = new HttpHeaders()
      .set('token', idToken)
      .set('trackID', trackID)
      .set('trackPoints', JSON.stringify(tpData));
    return (await this.http.request('PUT', this.backendBaseURL + '/insertTrackPoint', {headers})).toPromise();
  }

  async updatePrivacy(trackID: string, privacy: string) {
    const idToken = await this.auth.getUserToken();
    const headers = new HttpHeaders()
      .set('token', idToken)
      .set('trackID', trackID)
      .set('private', privacy);
    return(await this.http.request('PUT', this.backendBaseURL + '/updatePrivacy', {headers})).toPromise();
  }

  async takeOwnership(trackID: string) {
    const idToken = await this.auth.getUserToken();
    const headers = new HttpHeaders()
      .set('token', idToken)
      .set('trackID', trackID);
    return(await this.http.request('PUT', this.backendBaseURL + '/takeOwnership', {headers})).toPromise();
  }

  async deleteTrack(trackID: string) {
    const idToken = await this.auth.getUserToken();
    const headers = new HttpHeaders()
      .set('token', idToken)
      .set('trackID', trackID);
    return(await this.http.request('DELETE', this.backendBaseURL + '/deleteTrack', {headers})).toPromise();
}
}
