import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
import {catchError, defaultIfEmpty, filter, map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {Room} from '../interfaces/room';

@Injectable({
  providedIn: 'root'
})

export class RoomService {
  // private property to store all backend URLs
  private readonly _backendURL: any;
  // private property to store default user
  private readonly _defaultRoom: Room;

  constructor(private _router: Router, private _http: HttpClient) {
    this._defaultRoom = {
      name: 'room',
    password: 'unmotdepasse',
    currentVideoID: 'dQw4w9WgXcQ',
      timestamp: 10
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
   * Returns the default room value
   */
  get defaultRoom(): Room {
    return this._defaultRoom;
  }

  /**
   * Function to return the list of room
   */
  // TODO
  fetch(): Observable<Room[]> {
    return this._http.get<Room[]>(this._backendURL.allUsers)
      .pipe(
        filter(_ => !!_),
        defaultIfEmpty([])
      );
  }

  /**
   * Function to return one room using it's name
   */
  fetchOne(name: string): Observable<Room> {
    return this._http.get<Room>(this._backendURL.oneRoom.replace(':name', name));
  }

  /**
   * Function to create a new room
   */
  // TODO
  create(room: Room) {
    this._http.post(this._backendURL.allUsers, room, { headers: new HttpHeaders(Object.assign({ 'Content-Type': 'application/json' })),
      observe: 'response'})
      .subscribe(response => {
        if (response.status === 201) {
          this._router.navigate(['/login']);
        }
      });
  }

  /**
   * Function to update one room
   */
  update(room: Room): Observable<any> {
    return this._http.put<Room>(this._backendURL.oneRoom.replace(':id', room.currentVideoID), room, this._options());
  }

  /**
   * Function to return request options
   */
  private _options(headerList: object = {}): any {
    return { headers: new HttpHeaders(Object.assign({ 'Content-Type': 'application/json' }, headerList))};
  }
}
