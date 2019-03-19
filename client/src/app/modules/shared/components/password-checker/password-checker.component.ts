import { Component, Input } from '@angular/core';

import { IPasswordStrength } from '../../interfaces/i.password-strength';

/**
 * Password validation display component.
 */
@Component({
  selector: 'app-password-checker',
  templateUrl: './password-checker.component.html',
  styleUrls: ['./password-checker.component.scss']
})
export class PasswordCheckerComponent {

  public passwordStrength: IPasswordStrength;

  constructor() {  }

  /**
   * Password strength check
   * @param value password value
   */
  @Input('password') set password(value: string) {
    const passwordLength = 8;

    this.passwordStrength = <IPasswordStrength>{
      length: value.length >= passwordLength,
      digits: (new RegExp('[0-9]')).test(value),
      capital: (new RegExp('[A-Z]')).test(value),
      lowerCase: (new RegExp('[a-z]')).test(value),
    };
  }

  /**
   * Determine the path to the checkbox
   * @param value Value of rigor.
   * @return path to the image.
   */
  public getCheckboxPath(value: string): string {
    return this.passwordStrength[value] ? 'assets/images/checkbox-on.png' : 'assets/images/checkbox-off.png';
  }
}
