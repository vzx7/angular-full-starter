import { Injectable } from '@angular/core';

/**
 * Service for displaying notifications
 */
@Injectable()
export class ToastService {

constructor( ) { }
  /**
   * Displays errors.
   * @param message Message to display.
   * @param sticky Close message on click.
   */
  public showError(message: string, sticky?: boolean): void {
    this.toastHandler('error-toast', message);
  }

  /**
   * Displays info.
   * @param message Message to display.
   * @param sticky Close message on click.
   */
  public showInfo(message: string, sticky?: boolean): void {
    this.toastHandler('info-toast', message);
  }

  /**
   * Displays success.
   * @param message Message to display.
   * @param sticky Close message on click.
   */
  public showSuccess(message: string, sticky?: boolean): void {
    this.toastHandler('success-toast', message);
  }

  /**
   * Displays alerts.
   * @param message Message to display.
   * @param sticky Close message on click.
   */
  public showWarning(message: string, sticky?: boolean): void {
    this.toastHandler('warning-toast', message);
  }

  /**
   * Method to display messages.
   * @param  id Item ID in DOM.
   * @param message Message to display.
   */
  private toastHandler(id: string, message: string): void {
    const toast = document.getElementById(id);
    toast.className = 'show';
    toast.textContent = message;

    const duration = 5000;
    setTimeout(() => toast.className = toast.className === 'show' ? 'hide' : '', duration);
    toast.onclick = () => toast.className = 'hide';
  }
}
