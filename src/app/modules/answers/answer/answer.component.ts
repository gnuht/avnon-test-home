import {Component, OnInit} from '@angular/core';
import {BuilderService} from "../../../services/builder.service";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {Answer, AnswerType} from "../../../shared/models";

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss']
})
export class AnswerComponent implements OnInit {

  answerList$!: Observable<Answer[]>;
  AnswerType = AnswerType;

  constructor(private builderService: BuilderService, private router: Router) {
  }

  ngOnInit(): void {
    this.answerList$ = this.builderService.currentBuilderState$;
  }

  getOptions(answers: Answer): string[] {
    return answers.answer as string[];
  }

}
