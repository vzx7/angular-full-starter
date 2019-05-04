import { FormService } from 'modules/shared/services/form/form.service';

import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

import { UsersService } from '../../services/users.service';
import { IUser } from 'modules/users/interfaces/i.user';

/**
 * Component of the personal account.
 */
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})

export class AccountComponent implements OnInit {
  /**
   * Form
   */
  @ViewChild('form') public form: NgForm;

  /**
   * Repeat password
   */
  @ViewChild('repeatPasswd') public repeatPasswd: string;

  /**
   * Displaying the content loading process.
   */
  public isLoading: boolean;

  /**
   * User
   */
  public user: IUser;

  /**
   * Is true password
   */
  public isTruePassword: boolean;

  /**
   * Is the password repeated correctly?
   */
  public isRepeatPassword: boolean;

  /**
   * constructor
   * @param usersService accountService
   * @param fb Form Builder
   * @param formService Form Service
   * @param router Router
   * @param snackBar Snack-bar
   */
  constructor(
    private readonly usersService: UsersService,
    private readonly fb: FormBuilder,
    private readonly formService: FormService,
    private readonly router: Router,
    private readonly snackBar: MatSnackBar
  ) {

  }

  /**
   * Component initialization hook.
   */
  public ngOnInit() {  }

  public testPassword(password: string): boolean {
    console.log(this.user.password === password);

    return this.user.password === password;
  }

  /**
   * Action Notification.
   * @param message Message
   * @param action Action
   */
  private openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }
}
