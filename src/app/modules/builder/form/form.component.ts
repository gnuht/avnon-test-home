import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {NzModalService} from "ng-zorro-antd/modal";
import {ModalComponent} from "../modal/modal.component";
import {AbstractControl, FormArray, FormControl, ValidationErrors, Validators} from "@angular/forms";
import {BuilderService} from "../../../services/builder.service";
import {Router} from "@angular/router";
import {AnswerType, Question} from "../../../shared/models";
import {OtherOption} from "../../../shared/constants";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormComponent {

  questionList: Question[] = [];
  answerForm = new FormArray([]);
  AnswerType = AnswerType;

  constructor(
    private nzModalService: NzModalService,
    private cdr: ChangeDetectorRef,
    private builderService: BuilderService,
    private router: Router,
  ) {
  }

  openAddNewQuestionModal(): void {
    this.nzModalService.create({
      nzTitle: 'Add a New Question',
      nzContent: ModalComponent,
      nzClosable: false,
      nzMaskClosable: false,
      nzOnOk: (instanceComponent) => this.onOkModalBtn(instanceComponent)
    })
  }

  onOkModalBtn(instanceComponent: ModalComponent): boolean {
    Object.values(instanceComponent.questionForm.controls).forEach(control => {
      if (control.invalid) {
        if (control.value instanceof Array) {
          (control as FormArray).controls.forEach(subControl => {
            subControl.markAsDirty();
            subControl.updateValueAndValidity({onlySelf: true});
          })
        } else {
          control.markAsDirty();
          control.updateValueAndValidity({onlySelf: true});
        }
      }
    })
    if (instanceComponent.questionForm.invalid) return false;

    const questionForm = instanceComponent.questionForm.value;

    const tempQuestion: Question = {
      isRequired: questionForm.isRequired,
      title: questionForm.question,
      type: questionForm.answerType,
      options: questionForm.checkboxOption.map((item: any) => ({value: item, label: item})),
      answer: questionForm.answerType === AnswerType.Paragraph ? '' : [],
      other: questionForm.otherAnswer ? {...OtherOption} : null
    };
    this.answerForm.push(new FormControl(tempQuestion.answer, tempQuestion.isRequired ?
      (tempQuestion.type === AnswerType.CheckBox ? this.checkboxValidator : Validators.required) : null));
    this.questionList.push(tempQuestion);
    this.cdr.markForCheck();

    return true;
  }

  onChangeCheckbox(value: string[], index: number,): void {
    this.questionList[index].answer = value;
    this.answerForm.at(index).setValue(value);
  }

  reviewAnswers(): void {
    this.answerForm.controls.forEach(control => {
      if (control.invalid) {
        control.markAsDirty();
        control.updateValueAndValidity({onlySelf: true});
      }
    });
    if (this.answerForm.invalid) return;
    const tempBuilderState = this.questionList.map((question, index) => ({
      title: question.title,
      answer: this.answerForm.at(index).value,
      type: question.type
    }));

    this.builderService.changeBuilderState(tempBuilderState);
    this.router.navigateByUrl('form/answers');
  }

  checkboxValidator = (control: AbstractControl): ValidationErrors | null => {
    const tempValue = control.value.filter((element: string) => element);
    if (!tempValue.length) return {required: true};
    return null;
  }

  onChangeOtherAnswer(event: string, index: number, length: number): void {
    const tempOtherValue = event.trim() ? `Other - ${event}` : '';
    let currentCheckBoxValue = this.answerForm.at(index).value;
    currentCheckBoxValue[length - 1] = tempOtherValue;
    this.answerForm.at(index).setValue(currentCheckBoxValue);
  }
}
