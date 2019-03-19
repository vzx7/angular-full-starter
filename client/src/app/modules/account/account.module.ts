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
import { CreateAccountComponent } from './components/create-account/create-account.component';
import { EditAccountComponent } from './components/edit-account/edit-account.component';
import { MatGridListModule } from '@angular/material/grid-list';

@NgModule({
  declarations: [
    AccountComponent,
    AccountPasswordComponent,
    CreateAccountComponent,
    EditAccountComponent
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
    ReactiveFormsModule,
    MatGridListModule
  ],
  providers: [
    AccountService
  ]
})
export class AccountModule { }
