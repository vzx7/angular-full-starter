import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionRoutingModule } from './question-routing.module';
import { BodyTestQuestionAddComponent } from './components/body-test-question-add/body-test-question-add.component';
import { BodyQuestionsBaseComponent } from './components/body-questions-base/body-questions-base.component';
import {
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatTableModule,
  MatTabsModule
} from '@angular/material';
import { TableTestQuestionsComponent } from './components/table-test-questions/table-test-questions.component';
import { HeadModule } from 'modules/shared/modules/head/head.module';

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
