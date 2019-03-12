import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule, MatToolbarModule } from '@angular/material';
import { RouterModule } from '@angular/router';

import { HeadComponent } from './components/head/head.component';

@NgModule({
  declarations: [
    HeadComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatToolbarModule,
    RouterModule
  ],
  exports: [
    HeadComponent
  ]
})
export class HeadModule { }
