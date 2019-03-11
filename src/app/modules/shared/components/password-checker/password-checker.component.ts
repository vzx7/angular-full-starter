import { Component, Input } from '@angular/core';

import { PasswordStrength } from '../../models/password-strength';

/**
 * Компонент показа валидации пароля
 */
@Component({
  selector: 'app-password-checker',
  templateUrl: './password-checker.component.html',
  styleUrls: ['./password-checker.component.scss']
})
export class PasswordCheckerComponent {

  public passwordStrength: PasswordStrength;

  constructor() {
  }

  /**
   * Просчет строгости пароля
   * @param value значение пароля
   */
  @Input('password') set password(value: string) {
    const passwordLength = 8;

    this.passwordStrength = <PasswordStrength>{
      length: value.length >= passwordLength,
      digits: (new RegExp('[0-9]')).test(value),
      capital: (new RegExp('[A-Z]')).test(value),
      lowerCase: (new RegExp('[a-z]')).test(value),
    };
  }

  /**
   * Взятие пути до чекбокса
   * @param value Значение строгости
   * @return путь до изображения
   */
  public getCheckboxPath(value: string): string {
    return this.passwordStrength[value] ? 'assets/images/checkbox-on.png' : 'assets/images/checkbox-off.png';
  }

}
