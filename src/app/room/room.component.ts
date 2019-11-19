import {Component, OnDestroy, OnInit} from '@angular/core';
import {NbSidebarService} from '@nebular/theme';
import {ConfigService} from '../shared/services/config.service';
import { Video } from '../shared/interfaces/video';
import {first, sample, take, takeUntil, timeInterval} from 'rxjs/operators';
import {Subject, timer} from 'rxjs';


@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css'],
  providers: [ConfigService]
})
export class RoomComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: any = new Subject();
  videos: { code: string, seen: boolean }[] = [
    { code: 'nxkwg4gNMak', seen: true},
    { code: 's3Q80mk7bxE', seen: false},
    { code: 'nxkwg4gNMak', seen: true},
    { code: 's3Q80mk7bxE', seen: true},
    { code: 'nxkwg4gNMak', seen: false},
    { code: 's3Q80mk7bxE', seen: false},
    { code: 'nxkwg4gNMak', seen: true},
  ];
  video: any;
  constructor(private sidebarService: NbSidebarService, private configService: ConfigService) {  }

  ngOnInit() {
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
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
