import { ToastService } from 'core/services/toast/toast.service';
import { IUser } from 'modules/users/interfaces/i.user';
import { User } from 'modules/users/models/user.model';

import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { UsersService } from '../../services/users.service';

/**
 * Component for editing user
 */
@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.scss']
})
export class EditAccountComponent implements OnInit {
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
   * @param router Router
   * @param route ActivatedRoute
   */
  constructor(
    private readonly usersService: UsersService,
    private readonly toast: ToastService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {
    this.usersService.getUser(this.route.snapshot.paramMap.get('id'))
      .subscribe((user) => this.user = user);
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
      this.usersService.updateUser(this.user)
        .subscribe((user: IUser) => {
          this.toast.openSnackBar(`${user.firstName} saved successfully!`);
          this.router.navigate(['/users']);
        });

    }
  }
}
