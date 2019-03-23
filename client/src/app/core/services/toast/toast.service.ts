import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

/**
 * Service for displaying notifications
 */
@Injectable()
export class ToastService {
  /**
   * Default congig
   */
  public config: MatSnackBarConfig;

  /**
   * Default action
   */
  public action: string;

  constructor(
    private readonly snackBar: MatSnackBar
  ) {
    this.config = {
      duration: 3000,
      panelClass: 'success'
    };
    this.action = 'Success';
  }
  /**
   * Action Notification.
   * @param message Message
   * @param action Action
   * @param config MatSnackBarConfig
   */
  public openSnackBar(message: string, action: string = this.action, config: MatSnackBarConfig = this.config) {
    this.snackBar.open(message, action, config);
  }
}
