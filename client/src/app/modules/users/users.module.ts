import { HeadModule } from 'modules/shared/modules/head/head.module';
import { SharedModule } from 'modules/shared/shared.module';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    MatBottomSheetModule, MatButtonModule, MatCardModule, MatCheckboxModule, MatFormFieldModule,
    MatGridListModule, MatInputModule, MatListModule, MatSnackBarModule, MatTableModule, MatTabsModule
} from '@angular/material';

import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { AccountComponent } from './components/account/account.component';
import { CreateAccountComponent } from './components/create-account/create-account.component';
import { EditAccountComponent } from './components/edit-account/edit-account.component';
import { UsersComponent } from './components/users/users.component';
import { UsersService } from './services/users.service';
import { UsersRoutingModule } from './users-routing.module';

@NgModule({
  declarations: [
    AccountComponent,
    ChangePasswordComponent,
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
    MatCheckboxModule,
    MatSnackBarModule,
    MatBottomSheetModule,
    FormsModule,
    ReactiveFormsModule,
    MatGridListModule
  ],
  providers: [
    UsersService
  ]
})
export class UsersModule { }
