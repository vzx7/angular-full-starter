import { Injectable } from '@angular/core';

/**
 * Сервис для показа нотификаций
 */
@Injectable()
export class ToastService {

  // TODO написать модуль показа сообщений как в Primeng, только без Observable
constructor(
  ) { }
  /**
   * Вывод собщений об ошибках.
   * @param message Сообщение для вывода.
   * @param sticky Закрывать сообщение по требованию.
   */
  public showError(message: string, sticky?: boolean) {
    this.toastHandler('error-toast', message);
  }

  /**
   * Вывод информационных собщений.
   * @param message Сообщение для вывода.
   * @param sticky Закрывать сообщение по требованию.
   */
  public showInfo(message: string, sticky?: boolean) {
    this.toastHandler('info-toast', message);
  }

  /**
   * Вывод успешных собщений.
   * @param message Сообщение для вывода.
   * @param sticky Закрывать сообщение по требованию.
   */
  public showSuccess(message: string, sticky?: boolean): void {
    this.toastHandler('success-toast', message);
  }

  /**
   * Вывод успешных собщений.
   * @param message Сообщение для вывода.
   * @param sticky Закрывать сообщение по требованию.
   */
  public showWarning(message: string, sticky?: boolean): void {
    this.toastHandler('warning-toast', message);
  }

  /**
   * Метод для отображения сообщений.
   * @param  id Id элемента в DOM.
   * @param message Сообщение для вывода.
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
