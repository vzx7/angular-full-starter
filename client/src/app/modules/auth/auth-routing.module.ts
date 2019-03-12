import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
    BodyAutorizationComponent
} from './components/body-autorization/body-autorization.component';
import {
    BodyPasswordRecoveryComponent
} from './components/body-password-recovery/body-password-recovery.component';
import { AuthMainComponent } from './components/main/auth-main.component';
import { LoggedGuard } from './guards/logged/logged.guard';

const routes: Routes = [
  {
    path: '',
    component: AuthMainComponent,
    children: [
      { path: 'login', component: BodyAutorizationComponent, canActivate: [LoggedGuard] },
      { path: 'recovery', component: BodyPasswordRecoveryComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AuthRoutingModule { }
