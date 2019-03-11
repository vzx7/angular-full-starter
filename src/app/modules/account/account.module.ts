import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { AccountService } from './services/account.service';
import { SharedModule } from 'modules/shared/shared.module';
import { MatSnackBarModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './components/account/account.component';
import { HeadModule } from 'modules/shared/modules/head/head.module';
import { AccountPasswordComponent } from './components/account-password/account-password.component';

@NgModule({
  declarations: [
    AccountComponent,
    AccountPasswordComponent
  ],
  imports: [
    CommonModule,
    HeadModule,
    SharedModule,
    AccountRoutingModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    FormsModule,
    MatSnackBarModule,
    ReactiveFormsModule
  ],
  providers: [
    AccountService
  ]
})
export class AccountModule { }
