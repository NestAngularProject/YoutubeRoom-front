import { FormControl } from '@angular/forms';

export class CustomValidators {

  /**
   * Function to control email with custom validator
   */
  static emailValidator(control: FormControl) {
    // returns control
    return /^\w+@+^\w\.w$/.test(control.value) ? null : {
      emailValidator: true
    };
  }
}
