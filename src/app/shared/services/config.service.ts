import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import {Observable} from 'rxjs';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ConfigService {
  constructor(private http: HttpClient) { }
  getData(code: string): Observable < any >  {
    // tslint:disable-next-line:max-line-length TEST
    // https://www.googleapis.com/youtube/v3/videos?id=s3Q80mk7bxE&key=AIzaSyAC49v_u2z6S7R26G53R26PnV7aVHXpcPo&fields=items(snippet(title))&part=snippet,statistics')
    // tslint:disable-next-line:max-line-length
    return this.http.get('https://www.googleapis.com/youtube/v3/videos?id=' + code + '&key=AIzaSyAC49v_u2z6S7R26G53R26PnV7aVHXpcPo&fields=items(snippet(title))&part=snippet,statistics');
  }
}
