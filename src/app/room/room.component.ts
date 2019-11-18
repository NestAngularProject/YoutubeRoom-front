import { Component, OnInit } from '@angular/core';
import {NbSidebarService} from '@nebular/theme';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  videos: { nom: string, image: string }[] = [
    { nom: 'premiere video', image: 'image'},
    { nom: 'deuxieme video', image: 'image'},
    { nom: 'troisieme video', image: 'image'},
    { nom: 'une de plus', image: 'image'},
    { nom: 'une de plus', image: 'image'},
    { nom: 'une de plus', image: 'image'},
    { nom: 'une de plus', image: 'image'},
    { nom: 'une de plus', image: 'image'},
    { nom: 'une de plus', image: 'image'},
    { nom: 'une de plus', image: 'image'},
    { nom: 'une de plus', image: 'image'},
    { nom: 'une de plus', image: 'image'},
    { nom: 'une de plus', image: 'image'}
  ];
  constructor(private sidebarService: NbSidebarService) { }

  ngOnInit() {
  }

  toggle() {
    this.sidebarService.toggle(true, 'right');
  }
}
