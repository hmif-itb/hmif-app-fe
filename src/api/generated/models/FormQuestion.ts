/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type FormQuestion = {
  id: string;
  label: string;
  type: 'text' | 'textarea' | 'radio' | 'checkbox';
  options?: Array<string>;
  dependsOn?: {
    questionId: string;
    value: string;
  };
};

