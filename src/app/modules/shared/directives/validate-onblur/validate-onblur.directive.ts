import { Directive, ElementRef, HostListener, Input, OnDestroy } from '@angular/core';
import { NgControl } from '@angular/forms';

/**
 * Директива для валидации контролов после снятия фокуса.
 */
@Directive({
  selector: '[appValidateOnBlur]'
})
export class ValidationOnBlurDirective implements OnDestroy {
  private validators: any;
  private asyncValidators: any;
  private wasChanged: any;

 /**
  * Кастомный элемент ошибки.
  */
  private errorElement: HTMLSpanElement;

  /**
   * Сообщение ошибки.
   */
  private textMessage: string;

  /**
   * Показ ошибки.
   */
  private showMessage: boolean;

  constructor(
    public el: ElementRef,
    public formControl: NgControl
  ) {
  }

  get showError(): boolean {
    return this.showMessage;
  }

  @Input('showError') set showError(showError: boolean) {
    this.showMessage = showError;
    if (this.showMessage) {
      this.show();
    } else {
      this.hide();
    }
  }

  get text(): string {
    return this.textMessage;
  }

  @Input('appValidateOnBlur') set text(text: string) {
    this.textMessage = text;
    if (this.showMessage) {
      if (this.textMessage) {
        if (this.errorElement && this.errorElement.offsetParent) {
          this.errorElement.textContent = text;
        } else {
          this.show();
        }
      } else {
        this.hide();
      }
    }
  }

  /**
   * Фокус на элементе.
   * @param $event Событие
   */
  @HostListener('focus') public onFocus($event) {
    this.wasChanged = false;
    this.validators = this.formControl.control.validator;
    this.asyncValidators = this.formControl.control.asyncValidator;
    this.formControl.control.clearAsyncValidators();
    this.formControl.control.clearValidators();
  }

  /**
   * Нажатие клавиши на элементе.
   * @param $event Событие
   */
  @HostListener('keyup') public onKeyup($event) {
    this.wasChanged = true;
  }

  /**
   * Изменение элемента.
   * @param $event Событие
   */
  @HostListener('change') public onChange($event) {
    this.wasChanged = true;
  }

  /**
   * Измененеи модели элемента.
   * @param $event Событие
   */
  @HostListener('ngModelChange') public onNgModelChange($event) {
    this.wasChanged = true;
  }

  /**
   * Снятие фокуса элемента.
   * @param $event Событие
   */
  @HostListener('blur') public onBlur($event) {
    this.formControl.control.setAsyncValidators(this.asyncValidators);
    this.formControl.control.setValidators(this.validators);
    if (this.wasChanged) {
      this.formControl.control.updateValueAndValidity();
    }
  }

  /**
   * Хук удаления директивы
   */
  public ngOnDestroy() {
    this.hide();
  }

  /**
   * Добавление элемента в DOM
   */
  private show() {
    if (!this.textMessage) {
      return;
    }
    this.errorElement = document.createElement('span');
    this.errorElement.textContent = this.textMessage;
    this.errorElement.className = 'input-error-message';

    this.el.nativeElement.parentNode.insertBefore(this.errorElement, this.el.nativeElement);
  }

  /**
   * Удаление изэлемента из DOM
   */
  private hide() {
    if (this.errorElement) {
      this.el.nativeElement.parentNode.removeChild(this.errorElement);
      this.errorElement = null;
    }
  }

}
