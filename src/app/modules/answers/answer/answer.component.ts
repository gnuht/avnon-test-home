import { Component, OnInit } from '@angular/core';
import {BuilderService} from "../../../services/builder.service";
import {AnswerType, Question} from "../../../shared";
import {Observable, tap} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss']
})
export class AnswerComponent implements OnInit {

  answerList$!: Observable<Omit<Question, 'isRequired' | 'options'>[]>;
  AnswerType = AnswerType;
  constructor(private builderService: BuilderService, private router: Router) { }

  ngOnInit(): void {
    this.answerList$ = this.builderService.currentBuilderState$.pipe(tap(value => {
      if (!value.length) this.router.navigateByUrl('form/builder');
    }))
  }

  getOptions(answers: Omit<Question, 'isRequired'| 'options'>): string[] {
    return answers.answer as string[];
  }

}
