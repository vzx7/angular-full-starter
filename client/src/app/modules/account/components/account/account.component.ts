import { FormService } from 'modules/shared/services/form/form.service';

import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

import { AccountService } from '../../services/account.service';
import { User } from 'modules/account/models/user.model';
import { IUser } from 'modules/account/interfaces/i.user';

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
  public user: User;

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
   * @param accountService accountService
   * @param fb Form Builder
   * @param formService Form Service
   * @param router Router
   * @param snackBar Snack-bar
   */
  constructor(
    private readonly accountService: AccountService,
    private readonly fb: FormBuilder,
    private readonly formService: FormService,
    private readonly router: Router,
    private readonly snackBar: MatSnackBar
  ) {
    this.user = new User();
  }

  /**
   * Component initialization hook.
   */
  public ngOnInit() {
    this.getUser();
  }

  /**
   * Save
   */
  public onSave() {
    if (this.form.valid) {
      this.isLoading = true;
      this.accountService.createUser(this.user)
        .subscribe((user: IUser) => {
          this.openSnackBar('Congratulations!', `User ${user.firstName} saved successfully!`);
          this.isLoading = false;
        });

    }
  }

  /**
   * Receiving user data.
   */
  public getUser() {
    /*     this.accountService.getUser('1', () => {}).subscribe((user) => {
          this.form.patchValue(user);
          this.user = user;
        }); */
  }

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
