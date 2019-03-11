import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

import { AccountService } from '../../services/account.service';
import { FormService } from 'modules/shared/services/form/form.service';
import { User } from 'modules/account/models/user';
import { Password } from 'modules/account/models/password';

/**
 * Компонент формы изменения пароля в личном кабинете.
 */
@Component({
  selector: 'app-account-password',
  templateUrl: './account-password.component.html',
  styleUrls: ['./account-password.component.scss']
})

export class AccountPasswordComponent implements OnInit {

  @ViewChild('ngForm') public ngForm: NgForm;

  /**
   * Форма
   */
  public form: FormGroup;

  /**
   * Показ загрузки
   */
  public isLoading: boolean;

  /**
   * Пользователь
   */
  public user: User;

  /**
   * Проверка на совпадение ввода текущего пароля с паролем пользователя
   */
  public isTruePassword: boolean;

  /**
   * Проверка на совпадение ввода нового пароля и повторения нового пароля
   */
  public isEqualPasswords: boolean;

  /**
   * Конструктор
   * @param accountService Сервис для личного кабинета
   * @param fb Построитель форм
   * @param formService Маршрутизатор
   * @param router Маршрутизатор
   * @param snackBar Snack-bar
   */
  constructor(
    private readonly accountService: AccountService,
    private readonly fb: FormBuilder,
    public readonly formService: FormService,
    public readonly router: Router,
    private readonly snackBar: MatSnackBar
  ) { }

  /**
   * Хук инициализации компонента
   */
  public ngOnInit() {
    this.initForm();
    this.getUser();
  }

  /**
   * Сохранение
   */
  public onChangePassword() {
    // Проверка на совпадение ввода текущего пароля с паролем пользователя
     if (this.form.value.password !== this.user.password) {
      this.isTruePassword = false;
     }
     // Проверка на совпадение нового введенного пароля с повтором нового введенного пароля
     if (this.form.value.newPassword !== this.form.value.repeatNewPassword) {
      this.isEqualPasswords = false;
     } else {
      if (this.formService.validateForm(this.form)) {
        if (this.form.value.newPassword === this.form.value.repeatNewPassword) {
          this.isLoading = true;
          this.accountService.changePassword(this.form.value as Password, this.user, () => {}).subscribe(() => {
            this.ngForm.resetForm();
            this.openSnackBar('Пароль успешно обновлен!', '');
          });
          this.isLoading = false;
        }
      }
     }
  }

  /**
   * Получение данных пользователя
   */
  public getUser() {
    this.accountService.getUser('1', () => {}).subscribe((user) => {
      this.user = user;
    });
  }

  /**
   * Появление сообщения об ошибке при вводе некорректного значения
   * @param control Поле ввода
   * @return boolean
   */
  public isError(control: string): boolean {
    return (!this.form.controls[control].valid);
  }

  /**
   * Инициализация формы
   */
  private initForm(): any {
    this.form = this.fb.group({
      password: new FormControl('', [Validators.required,
        Validators.pattern(this.formService.passwordRegexp),
        Validators.maxLength(this.formService.maxLength)]),
      newPassword: new FormControl('', [Validators.required,
        Validators.pattern(this.formService.passwordRegexp),
        Validators.maxLength(this.formService.maxLength)]),
      repeatNewPassword: new FormControl('', [Validators.required,
        Validators.pattern(this.formService.passwordRegexp),
        Validators.maxLength(this.formService.maxLength)])
    });
  }

  /**
   * Оповещение о выполнении действия
   * @param message Сообщение
   * @param action Действие
   */
  private openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 1000,
    });
  }
}
