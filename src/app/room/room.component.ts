import { Component, OnInit } from '@angular/core';
import {NbSidebarService} from '@nebular/theme';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  videos: { nom: string, image: string, seen: boolean }[] = [
    { nom: 'premiere video', image: 'image', seen: true},
    { nom: 'deuxieme video', image: 'image', seen: false},
    { nom: 'troisieme video', image: 'image', seen: true},
    { nom: 'une de plus', image: 'image', seen: true},
    { nom: 'une de plus', image: 'image', seen: true},
    { nom: 'une de plus', image: 'image', seen: false},
    { nom: 'une de plus', image: 'image', seen: true},
    { nom: 'une de plus', image: 'image', seen: false},
    { nom: 'une de plus', image: 'image', seen: true},
    { nom: 'une de plus', image: 'image', seen: true},
    { nom: 'une de plus', image: 'image', seen: false},
    { nom: 'une de plus', image: 'image', seen: false},
    { nom: 'une de plus', image: 'image', seen: true}
  ];
  constructor(private sidebarService: NbSidebarService) { }

  ngOnInit() {
  }

  toggle() {
    this.sidebarService.toggle(false, 'right');
  }
}
