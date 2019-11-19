import { Component, OnInit } from '@angular/core';
import {User} from '../shared/interfaces/user';
import {Router} from '@angular/router';
import {UserService} from '../shared/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  // private property to store people value
  private _users: User[];
  // private property to store view value
  private _view: string;

  /**
   * Component constructor
   */
  constructor(private _router: Router, private _userService: UserService) {
    this._users = [];
    this._view = 'card';
  }

  /**
   * Returns private property _users
   */
  get users(): User[] {
    return this._users;
  }

  /**
   * Returns private property _view
   */
  get view(): string {
    return this._view;
  }

  /**
   * OnInit implementation
   */
  ngOnInit() {
    this._userService
      .fetch().subscribe((people: User[]) => this._users = people);
  }

  /**
   * Function to delete one user
   */
  delete(user: User) {
    this._userService
      .delete(user.username)
      .subscribe(_ => this._users = this._users.filter(__ => __.username !== _));
  }

  /**
   * Function to navigate to current user
   */
  navigate(user: User) {
    this._router.navigate([ '/person', user.username ]);
  }

  /**
   * Add new user
   */
  private _add(user: User) {
    this._userService
      .create(user);
  }
}
