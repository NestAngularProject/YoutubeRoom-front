import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
import {catchError, defaultIfEmpty, filter, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  // private property to store all backend URLs
  private readonly _backendURL: any;
  // private property to store default user
  private readonly _defaultUser: User;

  constructor(private _http: HttpClient) {
    this._defaultUser = {
      username: 'username',
      password: 'password',
      mail: 'email@ema.il',
      room: 'room-name'
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
   * Returns the default user value
   */
  get defaultUser(): User {
    return this._defaultUser;
  }

  /**
   * Function to return the list of users
   */
  fetch(): Observable<User[]> {
    return this._http.get<User[]>(this._backendURL.allUsers)
      .pipe(
        filter(_ => !!_),
        defaultIfEmpty([])
      );
  }

  /**
   * Function to return the list of users inside the room in parameter
   */
  fetchFromRoom(room: string): Observable<User[]> {
    return this._http.get<User[]>(this._backendURL.roomUsers.replace(':room', room));
  }

  /**
   * Function to return one user using it's username
   */
  fetchOne(username: string): Observable<User> {
    return this._http.get<User>(this._backendURL.oneUser.replace(':username', username));
  }

  /**
   * Function to return one user using it's username and his password
   */
  fetchLogin(username: string, password: string): Observable<User> {
    return this._http.get<User>(this._backendURL.pwdUser
      .replace(':username', username)
      .replace(':password', password));
  }

  /**
   * Function to create a new user
   */
  create(user: User) {
    this._http.post(this._backendURL.allUsers, user, this._options()).subscribe();
  }

  /**
   * Function to update one user
   */
  update(user: User): Observable<any> {
    return this._http.put<User>(this._backendURL.oneUser.replace(':username', user.username), user, this._options());
  }

  /**
   * Function to delete one user using it's username
   */
  delete(username: string): Observable<string> {
    return this._http.delete(this._backendURL.oneUser.replace(':username', username))
      .pipe(
        map(_ => username)
      );
  }

  /**
   * Function to return request options
   */
  private _options(headerList: object = {}): any {
    return { headers: new HttpHeaders(Object.assign({ 'Content-Type': 'application/json' }, headerList))};
  }
}
