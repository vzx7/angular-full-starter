import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoggedGuard } from '../../core/services/guards/logged/logged.guard';
import { AccountComponent } from './components/account/account.component';
import { CreateAccountComponent } from './components/create-account/create-account.component';
import { EditAccountComponent } from './components/edit-account/edit-account.component';
import { UsersComponent } from './components/users/users.component';

const routes: Routes = [
  {
    path: '', component: AccountComponent
  },
  {
    path: 'create', component: CreateAccountComponent,
  },
  {
    path: 'edit', component: EditAccountComponent,
  },
  {
    path: 'all', component: UsersComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
