import { IPassword } from 'modules/users/interfaces/i.password';
import { IUser } from 'modules/users/interfaces/i.user';
import { FormService } from 'modules/shared/services/form/form.service';

import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

import { UsersService } from '../../services/users.service';

/**
 * The component of the password change form in the personal account.
 */
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})

export class ChangePasswordComponent implements OnInit {

  @ViewChild('ngForm') public ngForm: NgForm;

  /**
   * Form.
   */
  public form: FormGroup;

  /**
   * Displaying the content loading process.
   */
  public isLoading: boolean;

  /**
   * User.
   */
  public user: IUser;

  /**
   * Check for a match between entering the current password and the user password.
   */
  public isTruePassword: boolean;

  /**
   * Check for a match between entering a new password and repeating a new password.
   */
  public isEqualPasswords: boolean;

  /**
   * Constructor
   * @param usersService usersService
   * @param fb Form Builder
   * @param formService Form Service
   * @param router Router
   * @param snackBar Snack-bar
   */
  constructor(
    private readonly usersService: UsersService,
    private readonly fb: FormBuilder,
    public readonly formService: FormService,
    public readonly router: Router,
    private readonly snackBar: MatSnackBar
  ) { }

  /**
   * Component initialization hook.
   */
  public ngOnInit() {
    this.initForm();
    this.getUser();
  }

  /**
   * Password save.
   */
  public onChangePassword() {
     if (this.form.value.password !== this.user.password) {
      this.isTruePassword = false;
     }

     if (this.form.value.newPassword !== this.form.value.repeatNewPassword) {
      this.isEqualPasswords = false;
     } else {
      if (this.formService.validateForm(this.form)) {
        if (this.form.value.newPassword === this.form.value.repeatNewPassword) {
          this.isLoading = true;
          this.usersService.changePassword(this.form.value as IPassword, this.user, () => {}).subscribe(() => {
            this.ngForm.resetForm();
            this.openSnackBar('Password successfully updated!', '');
          });
          this.isLoading = false;
        }
      }
     }
  }

  /**
   * Receiving user data.
   */
  public getUser() {
/*     this.accountService.getUser('1', () => {}).subscribe((user) => {
      this.user = user;
    }); */
  }

  /**
   * Error message when entering incorrect value.
   * @param control Input
   * @return boolean
   */
  public isError(control: string): boolean {
    return (!this.form.controls[control].valid);
  }

  /**
   * Form initialization.
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
   * Action Notification.
   * @param message Message
   * @param action Action
   */
  private openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 1000,
    });
  }
}
