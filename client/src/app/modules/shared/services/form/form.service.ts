import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';

/**
 * Сервис для работы с формами
 */
@Injectable()
export class FormService {
  /**
   * Regexp для натуральных чисел
   */
  public readonly intRegexp: RegExp;

  /**
   * Regexp для дробных чисел
   */
  public readonly floatRegexp: RegExp;

  /**
   * Regexp для строк вне пробела
   */
  public readonly nonWhiteSpaceRegexp: RegExp;

  /**
   * Regexp для дат
   */
  public readonly dateRegexp: RegExp;

  /**
   * Regexp для пароля
   */
  public readonly passwordRegexp: RegExp;

  /**
   * Regexp для пароля
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
   * Валидация пароля
   * @param control Контрол
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
   * Валидация формы
   * @param form Форма
   * @return Валидна ли форма
   */
  public validateForm(form: FormGroup): boolean {
    if (form.invalid) {
      const controls = form.controls;
      // Если форма не валидна, то помечаем все контролы как touched
      Object.keys(controls)
        .forEach((controlName) => controls[controlName].markAsTouched());
      // Прерывание выполнение метода

      return false;
    } else {
      return true;
    }
  }

  /**
   * Валидация поля
   * @param form Форма
   * @param field Поле
   * @param formSubmitAttempt Нажата ли форма ввода
   * @return Валидно ли поле
   */
  public isFieldInValid(form: FormGroup, field: string, formSubmitAttempt: boolean): boolean {
    return form.get(field).errors && formSubmitAttempt;
  }

  /**
   * Валидация подтверждения пароля
   * @param control Родительский контрол
   * @return валиден ли контрол
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
