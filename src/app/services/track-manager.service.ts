import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TrackManagerService {

  constructor(private httpClient: HttpClient) { }

  getTracks(uid: string, privacy = 'Public') {
    const options = uid ? { params: new HttpParams()
        .set('uid', uid)
        .set('queryType', privacy)
    } : {};
    return this.httpClient.get('http://localhost:8080/getTracks', options);
  }
}
