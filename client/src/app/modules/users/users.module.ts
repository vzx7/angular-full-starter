import { HeadModule } from 'modules/shared/modules/head/head.module';
import { SharedModule } from 'modules/shared/shared.module';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    MatButtonModule, MatCardModule, MatFormFieldModule, MatGridListModule, MatInputModule,
    MatSnackBarModule, MatTableModule, MatTabsModule
} from '@angular/material';

import { AccountPasswordComponent } from './components/account-password/account-password.component';
import { AccountComponent } from './components/account/account.component';
import { CreateAccountComponent } from './components/create-account/create-account.component';
import { EditAccountComponent } from './components/edit-account/edit-account.component';
import { UsersComponent } from './components/users/users.component';
import { UsersService } from './services/users.service';
import { UsersRoutingModule } from './users-routing.module';

@NgModule({
  declarations: [
    AccountComponent,
    AccountPasswordComponent,
    CreateAccountComponent,
    EditAccountComponent,
    UsersComponent
  ],
  imports: [
    CommonModule,
    HeadModule,
    SharedModule,
    UsersRoutingModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatTableModule,
    MatTabsModule,
    FormsModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatGridListModule
  ],
  providers: [
    UsersService
  ]
})
export class UsersModule { }
