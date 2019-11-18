import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import {Observable} from 'rxjs';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable()
export class ConfigService {
  // tslint:disable-next-line:max-line-length
  private URL: 'https://www.googleapis.com/youtube/v3/videos?id=nxkwg4gNMak&key=AIzaSyAC49v_u2z6S7R26G53R26PnV7aVHXpcPo&fields=items(snippet(title))&part=snippet,statistics';
  constructor(private http: HttpClient) {}
  getData(): Observable < any >  {
    return this.http.get(this.URL, {responseType: 'json'});
  }
}
