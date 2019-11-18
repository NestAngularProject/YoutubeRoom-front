import { Component, OnInit } from '@angular/core';
import {NbSidebarService} from '@nebular/theme';
import {ConfigService} from '../shared/services/config.service';
import { Video } from '../shared/interfaces/video';


@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css'],
  providers: [ConfigService]
})
export class RoomComponent implements OnInit {
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
    this.configService.getData(code).subscribe(
      (data: Video) => this.video = {
        items: data
      });
    return (this.video.items.items[0].snippet.title);
  }
}
