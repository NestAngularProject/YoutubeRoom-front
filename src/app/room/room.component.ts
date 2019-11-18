import { Component, OnInit } from '@angular/core';
import {NbSidebarService} from '@nebular/theme';
import {ConfigService} from '../shared/services/config.service';


@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css'],
  providers: [ConfigService]
})
export class RoomComponent implements OnInit {
  allData: any = [];
  videos: { code: string, seen: boolean }[] = [
    { code: 'nxkwg4gNMak', seen: true},
    { code: 's3Q80mk7bxE', seen: false},
    { code: 'nxkwg4gNMak', seen: true},
    { code: 's3Q80mk7bxE', seen: true},
    { code: 'nxkwg4gNMak', seen: false},
    { code: 's3Q80mk7bxE', seen: false},
    { code: 'nxkwg4gNMak', seen: true},
  ];
  constructor(private sidebarService: NbSidebarService, private configService: ConfigService) {
    this.allData = configService;
  }

  ngOnInit() {
  }

  toggle() {
    this.sidebarService.toggle(true, 'right');
  }

  getALLData() {
    this.allData.getData().subscribe(
      data => { this.allData = data.data; },
      err => console.error(err),
      () => console.log('done loading data')
    );
  }

  fetchTitre() {
    this.getALLData();
    console.log(this.allData);
  }
}
