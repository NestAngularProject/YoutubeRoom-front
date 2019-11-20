import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from '../interfaces/user';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../services/user.service';
import {CustomValidators} from '../form/custom-validators';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  // private property to store model value
  private _model: User;
  // private property to store cancel$ value
  private readonly _cancel$: EventEmitter<void>;
  // private property to store submit$ value
  private readonly _submit$: EventEmitter<User>;
  // private property to store form value
  private readonly _form: FormGroup;
  // private property to store a user
  private _user: User;

  /**
   * Component constructor
   */
  constructor(private _router: Router, private _userService: UserService ) {
    this._submit$ = new EventEmitter<User>();
    this._cancel$ = new EventEmitter<void>();
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
   * Returns private property _cancel$
   */
  @Output('cancel')
  get cancel$(): EventEmitter<void> {
    return this._cancel$;
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
  ngOnInit() {
    this._userService.fetchOne(localStorage.getItem('session')).subscribe(res => {this._model = res,
    this._form.patchValue(this._model); });
  }

  /**
   * Function to emit event to cancel process
   */
  cancel() {
    this._cancel$.emit();
  }

  /**
   * Function to emit event to submit form and user
   */
  submit(user: User) {
    this._userService.update(user, localStorage.getItem('session')).subscribe(response => {
          if (response.status === 200) {
            localStorage.setItem('session', user.username)
            this._router.navigate(['/home']);
          }
        });
  }

  /**
   * Function to delete a user
   */
  delete() {
    this._userService.delete(localStorage.getItem('session')).subscribe();
    localStorage.clear();
    this._router.navigate(['/home']);
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
      mail: new FormControl('', Validators.compose([
        Validators.required, CustomValidators.emailValidator
      ])),
      room: new FormControl(''),
    });
  }
}
