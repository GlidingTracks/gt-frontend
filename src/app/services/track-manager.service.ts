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

  async getHeadersWithToken() {
    const idToken = await this.auth.getUserToken();
    return new HttpHeaders()
      .set('token', idToken);
  }

  async getHeadersWithTokenAndTrackID(trackID) {
    return (await this.getHeadersWithToken())
      .set('trackID', trackID);
  }

  async getTracks(privacy = 'Public', timeSkip = 1) {
    const headers = (await this.getHeadersWithToken())
      .set('queryType', privacy)
      .set('timeSkip', timeSkip.toString());
    return await this.http.request('GET', this.backendBaseURL + '/getTracks', {headers}).toPromise();
  }

  async getTrack(trackID: string) {
    const headers = await this.getHeadersWithTokenAndTrackID(trackID);
    return await this.http.request('GET', this.backendBaseURL + '/getTrack', {headers, responseType: 'text'}).toPromise();
  }

  async insertTrackPoint(trackID: string, tpData: TrackPoint[]) {
    const headers = (await this.getHeadersWithTokenAndTrackID(trackID))
      .set('trackPoints', JSON.stringify(tpData));
    return (await this.http.request('PUT', this.backendBaseURL + '/insertTrackPoint', {headers})).toPromise();
  }

  async updatePrivacy(trackID: string, privacy: string) {
    const headers = (await this.getHeadersWithTokenAndTrackID(trackID))
      .set('private', privacy);
    return(await this.http.request('PUT', this.backendBaseURL + '/updatePrivacy', {headers})).toPromise();
  }

  async takeOwnership(trackID: string) {
    const headers = await this.getHeadersWithTokenAndTrackID(trackID);
    return(await this.http.request('PUT', this.backendBaseURL + '/takeOwnership', {headers})).toPromise();
  }

  async deleteTrack(trackID: string) {
    const headers = await this.getHeadersWithTokenAndTrackID(trackID);
    return(await this.http.request('DELETE', this.backendBaseURL + '/deleteTrack', {headers})).toPromise();
}
}
