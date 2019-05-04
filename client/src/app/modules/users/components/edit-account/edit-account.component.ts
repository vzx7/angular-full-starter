import { ToastService } from 'core/services/toast/toast.service';
import { IUser } from 'modules/users/interfaces/i.user';
import { User } from 'modules/users/models/user.model';

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { UsersService } from '../../services/users.service';
import { FileUploadService } from 'core/services/file-upload/file-upload.service';
import { environment } from '../../../../../environments/environment';

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
   * File
   */
  @ViewChild('fileInput') public fileInput: ElementRef;

  /**
   * Displaying the content loading process.
   */
  public isLoading: boolean;

  /**
   * User
   */
  public user: User;

  /**
   * File path
   */
  public fileName: string;

  /**
   * Host
   */
  public host: string;

  /**
   * constructor
   * @param usersService usersService
   * @param fileUploadService FileUploadService
   * @param toast ToastService
   * @param router Router
   * @param route ActivatedRoute
   */
  constructor(
    private readonly usersService: UsersService,
    private readonly fileUploadService: FileUploadService,
    private readonly toast: ToastService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {
    this.host = `${environment.PROTOCOL + environment.HOST}:${environment.PORT}`;
    this.fileName = 'https://material.angular.io/assets/img/examples/shiba1.jpg';
    this.usersService.getUser(this.route.snapshot.paramMap.get('id'))
      .subscribe((user) => {
        this.user = user;
        if (this.user.photo.fileName) {
          this.fileName = `${this.host}/files/images/${this.user.photo.fileName}`;
        }
      });
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

  /**
   * Update userPhoto.
   * @param event File event.
   */
  public onChangePhoto(event: any): void {
    const { files, validity } = event.target;
    if (validity.valid) {
      this.fileUploadService.upload(files[0]).subscribe((imageData) => {
        const fileName = `${imageData.fileId}-${imageData.filename}`;
        this.fileName = `${this.host}/files/images/${fileName}`;
        this.usersService.updateUserPhoto({
          userId: this.user.id,
          fileId: imageData.id,
          fileName
        }).subscribe();
      });
    }
  }
}
