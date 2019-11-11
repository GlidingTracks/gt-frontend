import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TrackManagerService {

  constructor(private httpClient: HttpClient) { }

  getTracks(token: any, privacy = 'Public') {
    const options = token ? { headers: new HttpHeaders()
        .set('token', token)
        .set('queryType', privacy)
    } : {};
    return this.httpClient.get('http://128.39.142.141:8080/getTracks', options);
  }
}
