import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ErrorsHandler } from './errors-handler';
import { NotificationService } from './notification.service';
import { ServerErrorsInterceptor } from './server-errors.interceptor';

/**
 * Error handling module
 */
@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [ ],
  providers: [
    {
      provide: ErrorHandler,
      useClass: ErrorsHandler,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ServerErrorsInterceptor,
      multi: true
    },
    NotificationService
  ]
})
export class ErrorsModule { }
