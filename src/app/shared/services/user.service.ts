import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { defaultIfEmpty, filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  // private property to store all backend URLs
  private readonly _backendURL: any;
  // private property to store default person
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
    return this._http.get<User[]>(this._backendURL.allPeople)
      .pipe(
        filter(_ => !!_),
        defaultIfEmpty([])
      );
  }

  /**
   * Function to return one user using it's username
   */
  fetchOne(username: string): Observable<User> {
    return this._http.get<User>(this._backendURL.onePeople.replace(':id', username));
  }

  /**
   * Function to create a new person
   */
  create(person: Person): Observable<any> {
    return this._http.post<Person>(this._backendURL.allPeople, person, this._options());
  }

  /**
   * Function to update one person
   */
  update(person: Person): Observable<any> {
    return this._http.put<Person>(this._backendURL.onePeople.replace(':id', person.id), person, this._options());
  }

  /**
   * Function to delete one person for current id
   */
  delete(id: string): Observable<string> {
    return this._http.delete(this._backendURL.onePeople.replace(':id', id))
      .pipe(
        map(_ => id)
      );
  }

  /**
   * Function to return request options
   */
  private _options(headerList: object = {}): any {
    return { headers: new HttpHeaders(Object.assign({ 'Content-Type': 'application/json' }, headerList)) };
  }
}
