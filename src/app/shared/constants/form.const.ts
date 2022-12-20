import {AnswerOption, AnswerType} from "../models/form.model";

export const AnswerOptions: AnswerOption[] = [
  {
    label: 'Checkbox List',
    id: AnswerType.CheckBox
  },
  {
    label: 'Paragraph answer',
    id: AnswerType.Paragraph
  }
];

export const OtherOption = {value: '', label: 'Other', checked: false};
