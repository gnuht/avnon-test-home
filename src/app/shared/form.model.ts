export enum AnswerType {
  CheckBox =  1,
  Paragraph ,
}

export interface AnswerOption {
  id: AnswerType;
  label: string;
}

export interface Question {
  type: AnswerType;
  title: string;
  isRequired: boolean;
  options?: {label: string; value: string}[]
  answer: string | string[];
}
