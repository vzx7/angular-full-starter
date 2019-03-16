import { User } from 'modules/account/models/user';
import { FormService } from 'modules/shared/services/form/form.service';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

import { AccountService } from '../../services/account.service';

/**
 * Компонент личного кабинета.
 */
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})

export class AccountComponent implements OnInit {

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
    private readonly formService: FormService,
    private readonly router: Router,
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
  public onSave() {
    if (this.formService.validateForm(this.form)) {
      this.isLoading = true;
      this.form.value.id = this.user.id;
      const updateUser = Object.assign(this.user, this.form.value);
      this.accountService.updateUser(updateUser as User, () => {}).subscribe(() => {
        this.openSnackBar('Данные успешно сохранены!', '');
      });
      this.isLoading = false;
    }
  }

  /**
   * Получение данных пользователя
   */
  public getUser() {
    this.accountService.getUser('1', () => {}).subscribe((user) => {
      this.form.patchValue(user);
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
      lastName: new FormControl('', [Validators.required,
        Validators.pattern(this.formService.nonWhiteSpaceRegexp),
        Validators.maxLength(this.formService.maxLength)]),
      firstName: new FormControl('', [Validators.required,
        Validators.pattern(this.formService.nonWhiteSpaceRegexp),
        Validators.maxLength(this.formService.maxLength)]),
      patronymic: new FormControl('', [Validators.required,
        Validators.pattern(this.formService.nonWhiteSpaceRegexp),
        Validators.maxLength(this.formService.maxLength)]),
      login: new FormControl([], [Validators.required,
        Validators.maxLength(this.formService.maxLength)]),
      email: new FormControl('', [Validators.required,
        Validators.email,
        Validators.pattern(this.formService.nonWhiteSpaceRegexp),
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
