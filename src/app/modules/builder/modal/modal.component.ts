import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {takeUntil} from "rxjs";
import {DestroyService} from "../../../services";
import {AnswerOptions} from "../../../shared/constants";
import {AnswerType} from "../../../shared/models";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService]
})
export class ModalComponent implements OnInit {

  answerOptions = AnswerOptions;
  questionForm!: FormGroup;

  constructor(private cdr: ChangeDetectorRef, private destroy$: DestroyService) {
  }

  ngOnInit(): void {
    this.initQuestionForm();
    this.answerType.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      this.checkboxOption.clear()
      value === AnswerType.CheckBox && this.checkboxOption.push(new FormControl('', Validators.required))
      this.cdr.markForCheck();
    })
  }

  get answerType(): FormControl {
    return this.questionForm.get('answerType') as FormControl;
  }

  get checkboxOption(): FormArray {
    return this.questionForm.get('checkboxOption') as FormArray;
  }

  addOtherAnswer(): void {
    if (this.checkboxOption.length > 4) return;
    this.checkboxOption.push(new FormControl('', Validators.required))
  }

  private initQuestionForm(): void {
    this.questionForm = new FormGroup({
      question: new FormControl('', Validators.required),
      answerType: new FormControl(AnswerType.CheckBox, Validators.required),
      checkboxOption: new FormArray([
        new FormControl('', Validators.required)
      ]),
      otherAnswer: new FormControl(false),
      isRequired: new FormControl(false)
    })
  }

}
