import { Component, OnInit } from '@angular/core';
import {NbSidebarService} from '@nebular/theme';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
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
  constructor(private sidebarService: NbSidebarService) { }

  ngOnInit() {
  }

  toggle() {
    this.sidebarService.toggle(true, 'right');
  }
}
