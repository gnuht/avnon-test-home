import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AnswerComponent} from './answer/answer.component';
import {RouterModule, Routes} from "@angular/router";
import {AnswersGuard} from "../../guards/answers.guard";

const routes: Routes = [{path: '', component: AnswerComponent, canActivate: [AnswersGuard]}]

@NgModule({
  declarations: [
    AnswerComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AnswersModule {
}
