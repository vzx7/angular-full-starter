import { FormService } from 'modules/shared/services/form/form.service';

import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

import { UsersService } from '../../services/users.service';
import { User } from 'modules/users/models/user.model';
import { IUser } from 'modules/users/interfaces/i.user';

/**
 * Component of the personal account.
 */
@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})

export class CreateAccountComponent implements OnInit {
  /**
   * Form
   */
  @ViewChild('form') public form: NgForm;

  /**
   * Displaying the content loading process.
   */
  public isLoading: boolean;

  /**
   * User
   */
  public user: User;

  /**
   * constructor
   * @param usersService usersService
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
    this.user = new User();
  }

  /**
   * Component initialization hook.
   */
  public ngOnInit() { }

  /**
   * Save
   */
  public onSave() {
    if (this.form.valid) {
      this.isLoading = true;
      this.usersService.createUser(this.user)
        .subscribe((user: IUser) => {
          this.openSnackBar('Congratulations!', `User ${user.firstName} saved successfully!`);
          this.isLoading = false;
        });

    }
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
