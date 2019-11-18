import { Component, OnInit } from '@angular/core';
import {ConfigService} from '../shared/services/config.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {
  allData: any = [];

  constructor(configService: ConfigService) {
    this.allData = configService;
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

  ngOnInit(): void {
  }
}
