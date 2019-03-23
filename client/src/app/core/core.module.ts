import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SettingsService } from './services/settings/settings.service';
import { ToastService } from './services/toast/toast.service';
import { MatSnackBarModule } from '@angular/material';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSnackBarModule
  ],
  exports: [
    HttpClientModule
  ],
  providers: [
    SettingsService,
    {
      provide: APP_INITIALIZER,
      useFactory: (config: SettingsService) => () => config.loadSettings(),
      deps: [SettingsService],
      multi: true
    },
    ToastService
  ],
})
export class CoreModule { }
