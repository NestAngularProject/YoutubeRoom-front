import {Component, OnDestroy, OnInit} from '@angular/core';
import {NbSidebarService} from '@nebular/theme';
import {ConfigService} from '../shared/services/config.service';
import {UserService} from '../shared/services/user.service';
import { Video } from '../shared/interfaces/video';
import {defaultIfEmpty, filter, first, sample, take, takeUntil, timeInterval} from 'rxjs/operators';
import {Subject, timer} from 'rxjs';
import {User} from '../shared/interfaces/user';
import {Videobdd} from "../shared/interfaces/videobdd";


@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css'],
  providers: [ConfigService]
})
export class RoomComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: any = new Subject();
  videos: Videobdd[];
  video: any;
  private _user;
  constructor(private sidebarService: NbSidebarService, private configService: ConfigService, private userService: UserService) {  }

  ngOnInit() {
    this.fetchVideos();
  }

  toggle() {
    this.sidebarService.toggle(true, 'right');
  }

  fetchTitre(code: string): string {
    this.configService.getData(code).pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      (data: Video) => {
        this.video = {
          items: data
        }, console.log(this.video.items.items[0].snippet.title),
          code = this.video.items.items[0].snippet.title;
      }).unsubscribe();
    return code;
  }

  fetchVideos() {
    this.userService.fetchOne(localStorage.getItem('session')).subscribe(res => { this._user = res; });
    this.configService.getVideos(this._user.room).subscribe(
      (data: Videobdd[]) => this.videos = data);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
