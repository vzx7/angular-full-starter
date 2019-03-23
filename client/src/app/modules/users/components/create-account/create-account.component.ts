import { ToastService } from 'core/services/toast/toast.service';
import { IUser } from 'modules/users/interfaces/i.user';
import { User } from 'modules/users/models/user.model';

import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { UsersService } from '../../services/users.service';

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
   * @param toast ToastService
   */
  constructor(
    private readonly usersService: UsersService,
    private readonly toast: ToastService
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
          this.toast.openSnackBar(`User ${user.firstName} saved successfully!`);
          this.isLoading = false;
          this.form.resetForm();
        });
    }
  }
}
