import {Component, OnDestroy, OnInit} from '@angular/core';
import {NbSidebarService} from '@nebular/theme';
import {ConfigService} from '../shared/services/config.service';
import {UserService} from '../shared/services/user.service';
import { Video } from '../shared/interfaces/video';
import {defaultIfEmpty, filter, first, sample, take, takeUntil, timeInterval} from 'rxjs/operators';
import {Subject, timer} from 'rxjs';
import {User} from '../shared/interfaces/user';
import {Videobdd} from '../shared/interfaces/videobdd';
import {RoomService} from '../shared/services/room.service';
import {Room} from '../shared/interfaces/room';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css'],
  providers: [ConfigService]
})
export class RoomComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: any = new Subject();
  currentVideoId;
  videos: Videobdd[];
  video: any;
  timestamp: number;
  private _user;
  constructor(private sidebarService: NbSidebarService, public sanitizer: DomSanitizer,
              private configService: ConfigService, private userService: UserService, private roomService: RoomService) {  }

  ngOnInit() {
    this.fetchCurrentVideoInfo();
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
      });
    return code;
  }

  fetchVideos() {
    this.userService.fetchOne(localStorage.getItem('session')).subscribe(res => {
      this.configService.getVideos(res.room).subscribe(
        (data: Videobdd[]) => this.videos = data);
    });
  }

  fetchCurrentVideoInfo() {
    this.userService.fetchOne(localStorage.getItem('session')).subscribe(res => {
      this.roomService.fetchOne(res.room).subscribe(
        (data: Room) => { this.currentVideoId = data.currentVideoID, this.timestamp = data.timestamp; }) ;
    });
  }

  submit(id: string) {
    this.roomService.update({currentVideoID: id, timestamp: Date.now()}).subscribe();
  }

  currentVideo(): string {
    console.log('https://www.youtube.com/embed/' + this.currentVideoId + '?autoplay=1&start=' + (this.timestamp - Date.now()));
    return 'https://www.youtube.com/embed/' + this.currentVideoId + '?autoplay=1&start=' + (Date.now() - this.timestamp);
  }

  urlToCode(url: string): string {
    return url.match('v=([a-zA-Z0-9\_\-]+)&?')[1];
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
