import { HeadModule } from 'modules/shared/modules/head/head.module';
import { SharedModule } from 'modules/shared/shared.module';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { AccountRoutingModule } from './account-routing.module';
import { AccountPasswordComponent } from './components/account-password/account-password.component';
import { AccountComponent } from './components/account/account.component';
import { AccountService } from './services/account.service';

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
