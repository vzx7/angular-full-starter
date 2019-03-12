import { HeadModule } from 'modules/shared/modules/head/head.module';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
    MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatTableModule,
    MatTabsModule
} from '@angular/material';

import {
    BodyQuestionsBaseComponent
} from './components/body-questions-base/body-questions-base.component';
import {
    BodyTestQuestionAddComponent
} from './components/body-test-question-add/body-test-question-add.component';
import {
    TableTestQuestionsComponent
} from './components/table-test-questions/table-test-questions.component';
import { QuestionRoutingModule } from './question-routing.module';

@NgModule({
  declarations: [
    BodyTestQuestionAddComponent,
    BodyQuestionsBaseComponent,
    TableTestQuestionsComponent
  ],
  imports: [
    CommonModule,
    HeadModule,
    QuestionRoutingModule,
    MatSelectModule,
    MatCardModule,
    MatTableModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class QuestionModule { }
