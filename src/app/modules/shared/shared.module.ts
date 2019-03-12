import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { PasswordCheckerComponent } from './components/password-checker/password-checker.component';
import { TableRowEditDirective } from './directives/table-row-edit/table-row-edit.directive';
import { ValidationOnBlurDirective } from './directives/validate-onblur/validate-onblur.directive';
import { DateService } from './services/date/date.service';
import { FormService } from './services/form/form.service';
import { RequestService } from './services/request/request.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    PasswordCheckerComponent,
    TableRowEditDirective,
    ValidationOnBlurDirective
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PasswordCheckerComponent,
    TableRowEditDirective,
    TranslateModule,
    ValidationOnBlurDirective,
  ]
})

export class SharedModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        RequestService,
        FormService,
        DateService
      ]
    };
  }
}
