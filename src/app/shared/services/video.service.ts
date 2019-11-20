import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import {catchError, defaultIfEmpty, filter, map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {Videobdd} from '../interfaces/videobdd';

@Injectable({
  providedIn: 'root'
})

export class VideoService {
  // private property to store all backend URLs
  private readonly _backendURL: any;
  // private property to store default video
  private readonly _defaultVideo: Videobdd;

  constructor(private _router: Router, private _http: HttpClient) {
    this._defaultVideo = {
      id: 'hk4645gref4564e8',
      link: 'https://www.youtube.com/watch?v=hTWKbfoikeg',
      timestamp: 10,
      seen: false,
      room: 'room1'
    };
    this._backendURL = {};

    // build backend base url
    let baseUrl = `${environment.backend.protocol}://${environment.backend.host}`;
    if (environment.backend.port) {
      baseUrl += `:${environment.backend.port}`;
    }

    // build all backend urls
    Object.keys(environment.backend.endpoints).forEach(k => this._backendURL[ k ] = `${baseUrl}${environment.backend.endpoints[ k ]}`);
  }

  /**
   * Returns the default video value
   */
  get defaultVideo(): Videobdd {
    return this.defaultVideo;
  }

  /**
   * Function to return the list of video
   */
  // TODO
  fetch(): Observable<Videobdd[]> {
    return this._http.get<Videobdd[]>(this._backendURL.allVideos)
      .pipe(
        filter(_ => !!_),
        defaultIfEmpty([])
      );
  }

  /**
   * Function to return one video using it's id
   */
  fetchOne(id: string): Observable<Videobdd> {
    return this._http.get<Videobdd>(this._backendURL.oneRoom.replace(':id', id));
  }

  /**
   * Function to create a new video
   */
  create(video: Videobdd): Observable<any> {
    return this._http.post(this._backendURL.allVideos, video, this._options());
  }

  /**
   * Function to update one video
   */
  update(video: Videobdd): Observable<any> {
    return this._http.put<Videobdd>(this._backendURL.oneVideo.replace(':id', video.id), video, this._options());
  }

  /**
   * Function to return request options
   */
  private _options(headerList: object = {}): any {
    return { headers: new HttpHeaders(Object.assign({ 'Content-Type': 'application/json' }, headerList)), observe: 'response'};
  }
}
