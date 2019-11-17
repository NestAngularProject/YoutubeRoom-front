import { FormControl } from '@angular/forms';

export class CustomValidators {

  /**
   * Function to control email with custom validator
   */
  static emailValidator(control: FormControl) {
    // returns control
    return /^[^\W][a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)*\@[a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)*\.[a-zA-Z]{2,4}$/.test(control.value) ? null : {
      emailValidator: true
    };
  }
}
