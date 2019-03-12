import { NgModule } from '@angular/core';
import { MatCheckboxModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AuthRoutingModule } from './auth-routing.module';
import {
    BodyAutorizationComponent
} from './components/body-autorization/body-autorization.component';
import {
    BodyPasswordRecoveryComponent
} from './components/body-password-recovery/body-password-recovery.component';
import { AuthHeadComponent } from './components/head/auth-head.component';
import { AuthMainComponent } from './components/main/auth-main.component';
import { LoggedGuard } from './guards/logged/logged.guard';
import { PasswordConfirmGuard } from './guards/password-confirm/password-confirm.guard';
import { RegisterConfirmGuard } from './guards/register-confirm/register-confirm.guard';
import { RegisterSuccessGuard } from './guards/register-success/register-success.guard';
import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [
    AuthHeadComponent,
    BodyAutorizationComponent,
    BodyPasswordRecoveryComponent,
    AuthMainComponent
  ],
  imports: [
    AuthRoutingModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatTabsModule,
    MatTableModule,
    MatSelectModule,
    MatToolbarModule,
    MatIconModule
  ],
  providers: [
    AuthService,
    PasswordConfirmGuard,
    RegisterConfirmGuard,
    RegisterSuccessGuard,
    LoggedGuard
  ],
})
export class AuthModule {}
