import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { User } from '../interfaces/user';
import { CustomValidators } from '../form/custom-validators';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnChanges {
  // private property to store model value
  private _model: User;
  // private property to store submit$ value
  private readonly _submit$: EventEmitter<User>;
  // private property to store form value
  private readonly _form: FormGroup;
  // private to store the user
  private _user: User
  // private boolean to check error
  private _error: boolean

  /**
   * Component constructor
   */
  constructor(private _router: Router, private _userService: UserService ) {
    this._submit$ = new EventEmitter<User>();
    this._form = this._buildForm();
  }

  /**
   * Sets private property _model
   */
  @Input()
  set model(model: User) {
    this._model = model;
  }

  /**
   * Returns private property _model
   */
  get model(): User {
    return this._model;
  }

  /**
   * Returns private property _form
   */
  get form(): FormGroup {
    return this._form;
  }

  /**
   * Returns private property _submit$
   */
  @Output('submit') get submit$(): EventEmitter<User> {
    return this._submit$;
  }

  /**
   * OnInit implementation
   */
  ngOnInit() { }

  /**
   * Function to handle component update
   */
  ngOnChanges(record) {
    if (record.model && record.model.currentValue) {
      this._model = record.model.currentValue;
      this._form.patchValue(this._model);
    } else {
      this._model = {
        username: '',
        mail: '',
        password: '',
        room: '',
      };
    }
  }

  /**
   * Function to emit event to submit form and user
   */
  submit(user: User) {
    this._userService.fetchLogin(user.username, user.password).subscribe(res => {this._user = res,
      localStorage.setItem('session', this._user.username),
      this._error = false,
    this._router.navigate(['/home']); }, err =>
    this._error = true);
  }

  getError(): boolean {
    return this._error;
  }

  /**
   * Function to build our form
   */
  private _buildForm(): FormGroup {
    return new FormGroup({
      username: new FormControl('', Validators.compose([
        Validators.required, Validators.minLength(2)
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required, Validators.minLength(8)
      ])),
      room: new FormControl(''),
    });
  }
}

