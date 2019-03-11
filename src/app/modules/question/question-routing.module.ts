import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BodyQuestionsBaseComponent } from './components/body-questions-base/body-questions-base.component';
import { BodyTestQuestionAddComponent } from './components/body-test-question-add/body-test-question-add.component';

import { LoggedGuard } from '../../core/services/guards/logged/logged.guard';

const routes: Routes = [
  {
    path: '',
    component: BodyQuestionsBaseComponent
  },
  { path: 'add', component: BodyTestQuestionAddComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionRoutingModule { }
