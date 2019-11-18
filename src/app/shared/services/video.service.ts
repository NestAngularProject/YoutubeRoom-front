import {Injectable} from "@angular/core";
import {User} from "../interfaces/user";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})

export class UserService {
  // private property to store all backend URLs
  private readonly _backendURL: any;
  // private property to store default video
  private readonly _defaultVideo: Video;

  constructor(private _http: HttpClient) {
    this._defaultVideo = {
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
    Object.keys(environment.backend.endpoints).forEach(k => this._backendURL[k] = `${baseUrl}${environment.backend.endpoints[k]}`);
  }
}
