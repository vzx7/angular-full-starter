import { User } from 'modules/account/models/user';
import { FormService } from 'modules/shared/services/form/form.service';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

import { AccountService } from '../../services/account.service';

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
  public form: FormGroup;

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
  ) { }

  /**
   * Component initialization hook.
   */
  public ngOnInit() {
    this.initForm();
    this.getUser();
  }

  /**
   * Save
   */
  public onSave() {
    if (this.formService.validateForm(this.form)) {
      this.isLoading = true;
      this.form.value.id = this.user.id;
      const updateUser = Object.assign(this.user, this.form.value);
      this.accountService.updateUser(updateUser as User, () => {}).subscribe(() => {
        this.openSnackBar('Data saved successfully!', '');
      });
      this.isLoading = false;
    }
  }

  /**
   * Receiving user data.
   */
  public getUser() {
    this.accountService.getUser('1', () => {}).subscribe((user) => {
      this.form.patchValue(user);
      this.user = user;
    });
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
   * Form init
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
