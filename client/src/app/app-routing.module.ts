import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';

import { ErrorsModule } from './core/error/errors.module';

const appRoutes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: 'auth', loadChildren: './modules/auth/auth.module#AuthModule' },
  { path: 'users', loadChildren: './modules/users/users.module#UsersModule' },
  { path: 'questions', loadChildren: './modules/question/question.module#QuestionModule' },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes),
    ErrorsModule,
    BrowserAnimationsModule
  ],
  exports: [
    RouterModule,
    BrowserAnimationsModule
  ]
})

export class AppRoutingModule { }
