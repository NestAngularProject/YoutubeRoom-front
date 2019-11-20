import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../interfaces/user';
import {Room} from '../interfaces/room';
import {Videobdd} from '../interfaces/videobdd';
import {environment} from '../../../environments/environment';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ConfigService {
  // private property to store all backend URLs
  private readonly _backendURL: any;
  // private property to store default user
  private readonly _defaultRoom: Videobdd[];
  constructor(private _http: HttpClient) {
    this._defaultRoom = [{
      link: 'https://www.youtube.com/watch?v=hTWKbfoikeg',
      timestamp: 70,
      seen: false,
      room: 'Chill'
  }];
    this._backendURL = {};

    // build backend base url
    let baseUrl = `${environment.backend.protocol}://${environment.backend.host}`;
    if (environment.backend.port) {
      baseUrl += `:${environment.backend.port}`;
    }
    // build all backend urls
    Object.keys(environment.backend.endpoints).forEach(k => this._backendURL[ k ] = `${baseUrl}${environment.backend.endpoints[ k ]}`);
  }
  getData(code: string): Observable < any >  {
    // tslint:disable-next-line:max-line-length TEST
    // https://www.googleapis.com/youtube/v3/videos?id=s3Q80mk7bxE&key=AIzaSyAC49v_u2z6S7R26G53R26PnV7aVHXpcPo&fields=items(snippet(title))&part=snippet,statistics')
    // tslint:disable-next-line:max-line-length
    return this._http.get('https://www.googleapis.com/youtube/v3/videos?id=' + code + '&key=AIzaSyAC49v_u2z6S7R26G53R26PnV7aVHXpcPo&fields=items(snippet(title))&part=snippet,statistics');
  }

  getVideos(room: string): Observable<Videobdd[]> {
    return this._http.get<Videobdd[]>(this._backendURL.roomVideos
      .replace(':room', room));
  }

  getVideo(room: string): Observable<Videobdd[]> {
    return this._http.get<Videobdd[]>(this._backendURL.roomVideos
      .replace(':room', room));
  }

  /**
   * Function to create a new video
   */
  create(video: Videobdd): Observable<any> {
    return this._http.post(this._backendURL.allvideos, video, this._options());
  }

  /**
   * Function to return request options
   */
  private _options(headerList: object = {}): any {
    return { headers: new HttpHeaders(Object.assign({ 'Content-Type': 'application/json' }, headerList)), observe: 'response'};
  }
}
