import { Directive, ElementRef, HostListener, Input } from '@angular/core';

/**
 * Директива редактирования строки таблицы.
 */
@Directive({
  selector: '[appEditableRow]',
  providers: []
})
export class TableRowEditDirective {

  //   @Input("appEditableColumn") data: any;

  //   @Input("appEditableColumnField") field: any;

  //   @Input() public appEditableColumnDisabled: boolean;

  //   constructor(
  //     public dt: Table,
  //     public domHandler: DomHandler,
  //     public el: ElementRef) {}

  //   @HostListener('click', ['$event'])
  //   public onClick(event: MouseEvent) {
  //       if (this.isEnabled()) {
  //           this.dt.editingCellClick = true;

  //           if (this.dt.editingCell) {
  //               if (this.dt.editingCell !== this.el.nativeElement) {
  //                   if (!this.dt.isEditingCellValid()) {
  //                       return;
  //                   }

  //                   this.domHandler.removeClass(this.dt.editingCell, 'ui-editing-cell');
  //                   this.openCell();
  //               }
  //           } else {
  //               this.openCell();
  //           }
  //       }
  //   }

  //   public openCell() {
  //       this.dt.updateEditingCell(this.el.nativeElement);
  //       this.domHandler.addClass(this.el.nativeElement, 'ui-editing-cell');
  //       this.dt.onEditInit.emit({ field: this.field, data: this.data});
  //       this.zone.runOutsideAngular(() => {
  //           setTimeout(() => {
  //               const focusable = this.domHandler.findSingle(this.el.nativeElement, 'input, textarea');
  //               if (focusable) {
  //                   focusable.focus();
  //               }
  //           }, 50);
  //       });
  //   }

  //   public closeEditingCell() {
  //       this.domHandler.removeClass(this.dt.editingCell, 'ui-editing-cell');
  //       this.dt.editingCell = null;
  //       this.dt.unbindDocumentEditListener();
  //   }

  //   @HostListener('keydown', ['$event'])
  //   public onKeyDown(event: KeyboardEvent) {
  //     if (this.isEnabled()) {
  //       const tabKey = 9;
  //       if (event.keyCode === tabKey) {
  //         this.dt.onEditComplete.emit({ field: this.field, data: this.data });

  //         if (event.shiftKey) {
  //           this.moveToPreviousCell(event);
  //         } else {
  //           this.moveToNextCell(event);
  //         }
  //       }
  //     }
  //   }

  //   public findCell(element) {
  //       if (element) {
  //           let cell = element;
  //           while (cell && !this.domHandler.hasClass(cell, 'ui-editing-cell')) {
  //               cell = cell.parentElement;
  //           }

  //           return cell;
  //       }
  //       else {
  //           return null;
  //       }
  //   }

  //   public moveToPreviousCell(event: KeyboardEvent) {
  //       const currentCell = this.findCell(event.target);
  //       const row = currentCell.parentElement;
  //       const targetCell = this.findPreviousEditableColumn(currentCell);

  //       if (targetCell) {
  //           this.domHandler.invokeElementMethod(event.target, 'blur');
  //           this.domHandler.invokeElementMethod(targetCell, 'click');
  //           event.preventDefault();
  //       }
  //   }

  //   public moveToNextCell(event: KeyboardEvent) {
  //       const currentCell = this.findCell(event.target);
  //       const row = currentCell.parentElement;
  //       const targetCell = this.findNextEditableColumn(currentCell);

  //       if (targetCell) {
  //           this.domHandler.invokeElementMethod(event.target, 'blur');
  //           this.domHandler.invokeElementMethod(targetCell, 'click');
  //           event.preventDefault();
  //       }
  //   }

  //   public findPreviousEditableColumn(cell: Element) {
  //       let prevCell = cell.previousElementSibling;

  //       if (!prevCell) {
  //           let previousRow = cell.parentElement.previousElementSibling;
  //           if (previousRow) {
  //               prevCell = previousRow.lastElementChild;
  //           }
  //       }

  //       if (prevCell) {
  //           if (this.domHandler.hasClass(prevCell, 'ui-editable-column')) {
  //             return prevCell;
  //           } else {
  //             return this.findPreviousEditableColumn(prevCell);
  //           }
  //       }
  //       else {
  //           return null;
  //       }
  //   }

  //   public findNextEditableColumn(cell: Element) {
  //       let nextCell = cell.nextElementSibling;

  //       if (!nextCell) {
  //           const nextRow = cell.parentElement.nextElementSibling;
  //           if (nextRow) {
  //               nextCell = nextRow.firstElementChild;
  //           }
  //       }

  //       if (nextCell) {
  //         if (this.domHandler.hasClass(nextCell, 'ui-editable-column')) {
  //           return nextCell;
  //         } else {
  //           return this.findNextEditableColumn(nextCell);
  //         }
  //       }
  //       else {
  //           return null;
  //       }
  //   }

  //   private isEnabled() {
  //       return this.appEditableColumnDisabled !== true;
  //   }

  // private invokeElementMethod(element: any, methodName: string, args?: any[]): void {
  //   (element as any)[methodName].apply(element, args);
  // }

}
