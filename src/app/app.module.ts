import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app.component';
import { LoggedGuard } from './core/services/guards/logged/logged.guard';
import { SharedModule } from 'modules/shared/shared.module';
import { CoreModule } from 'core/core.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports:  [
    CoreModule,
    BrowserModule,
    AppRoutingModule,
    SharedModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [
    LoggedGuard
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
