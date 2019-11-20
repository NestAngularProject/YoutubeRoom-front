import { Component, OnInit } from '@angular/core';
import {ConfigService} from '../shared/services/config.service';
import {Room} from '../shared/interfaces/room';
import {UserService} from '../shared/services/user.service';
import {timestamp} from 'rxjs/operators';
import {RoomService} from '../shared/services/room.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {

  allData: any = [];

  constructor(configService: ConfigService, private userService: UserService, private roomService: RoomService) {
    this.allData = configService;
  }
  ngOnInit(): void { }
  getALLData() {
    this.allData.getData().subscribe(
      data => { this.allData = data.data; },
      err => console.error(err),
      () => console.log('done loading data')
    );
  }

  uploadVideo(url: string) {
    this.userService.fetchOne(localStorage.getItem('session')).subscribe(res => {
      this.roomService.fetchOne(res.room).subscribe(
        (data: Room) => {
          this.allData.create({link: url, timestamp: 0, seen: false, room: url});
        });
    });
  }

    fetchTitre() {
    this.getALLData();
    console.log(this.allData);
  }
}
