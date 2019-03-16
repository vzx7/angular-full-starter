import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';

/**
 * Service for working with forms.
 */
@Injectable()
export class FormService {
  /**
   * Regexp for natural numbers
   */
  public readonly intRegexp: RegExp;

  /**
   * Regexp for small numbers
   */
  public readonly floatRegexp: RegExp;

  /**
   * Regexp for non-space strings
   */
  public readonly nonWhiteSpaceRegexp: RegExp;

  /**
   * Regexp for date
   */
  public readonly dateRegexp: RegExp;

  /**
   * Regexp for password
   */
  public readonly passwordRegexp: RegExp;

  /**
   * Regexp for length
   */
  public readonly maxLength = 250;

  constructor() {
    this.intRegexp = /\d+/;
    this.floatRegexp = /^[0-9]+(\.)?([0-9]+)?$/;
    this.nonWhiteSpaceRegexp = /[^\s]+/;
    this.dateRegexp = /[0-9]{2}.[0-9]{2}.[0-9]{4}/;
    this.passwordRegexp = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[A-Za-z\d].{8,}/;
  }

  /**
   * Validation password
   * @param control Control
   * @return ValidationResult
   */
  public static passwordValidator(control: FormControl): boolean {
    const hasNumber = /\d/.test(control.value);
    const hasUpper = /[A-Z]/.test(control.value);
    const hasLower = /[a-z]/.test(control.value);
    const valid = hasNumber && hasUpper && hasLower;
    if (!valid) {
      control.get('password').setErrors({ Strength: true });
    }

    return null;
  }

  /**
   * Validation form
   * @param form Form
   * @return Valid form.
   */
  public validateForm(form: FormGroup): boolean {
    if (form.invalid) {
      const controls = form.controls;
      // If the form is not valid, then mark all controls as touched.
      Object.keys(controls)
        .forEach((controlName) => controls[controlName].markAsTouched());
      // Interrupt method execution

      return false;
    } else {
      return true;
    }
  }

  /**
   * Validation field.
   * @param form Form.
   * @param field Field.
   * @param formSubmitAttempt Whether the input form is pressed.
   * @return Valid field
   */
  public isFieldInValid(form: FormGroup, field: string, formSubmitAttempt: boolean): boolean {
    return form.get(field).errors && formSubmitAttempt;
  }

  /**
   * Password validation.
   * @param control Contrlol.
   * @return Valid password.
   */
  public matchPassword(control: AbstractControl): any {
    const password = control.get('password').value;
    const confirmPassword = control.get('confirmPassword').value;
    if (password !== confirmPassword) {
      control.get('confirmPassword').setErrors({ MatchPassword: true });
    } else {
      return null;
    }
  }

}
