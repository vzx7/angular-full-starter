import { Directive, ElementRef, HostListener, Input, OnDestroy } from '@angular/core';
import { NgControl } from '@angular/forms';

/**
 * Directive for validating controls after removing focus.
 */
@Directive({
  selector: '[appValidateOnBlur]'
})
export class ValidationOnBlurDirective implements OnDestroy {
  private validators: any;
  private asyncValidators: any;
  private wasChanged: any;

 /**
  * Custom error element.
  */
  private errorElement: HTMLSpanElement;

  /**
   * Error message
   */
  private textMessage: string;

  /**
   * Display message.
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
   * Focus on the element.
   * @param $event Event.
   */
  @HostListener('focus') public onFocus($event) {
    this.wasChanged = false;
    this.validators = this.formControl.control.validator;
    this.asyncValidators = this.formControl.control.asyncValidator;
    this.formControl.control.clearAsyncValidators();
    this.formControl.control.clearValidators();
  }

  /**
   * Pressing a key on an item.
   * @param $event Event.
   */
  @HostListener('keyup') public onKeyup($event) {
    this.wasChanged = true;
  }

  /**
   * Item change.
   * @param $event Event.
   */
  @HostListener('change') public onChange($event) {
    this.wasChanged = true;
  }

  /**
   * Item model changes.
   * @param $event Event.
   */
  @HostListener('ngModelChange') public onNgModelChange($event) {
    this.wasChanged = true;
  }

  /**
   * Remove the focus of the item.
   * @param $event Event.
   */
  @HostListener('blur') public onBlur($event) {
    this.formControl.control.setAsyncValidators(this.asyncValidators);
    this.formControl.control.setValidators(this.validators);
    if (this.wasChanged) {
      this.formControl.control.updateValueAndValidity();
    }
  }

  /**
   * Hook removal directive.
   */
  public ngOnDestroy() {
    this.hide();
  }

  /**
   * Add item to DOM.
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
   * Remove an element from the DOM.
   */
  private hide() {
    if (this.errorElement) {
      this.el.nativeElement.parentNode.removeChild(this.errorElement);
      this.errorElement = null;
    }
  }
}
