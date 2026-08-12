/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { InternshipAnswer } from './InternshipAnswer';
import type { InternshipDivision } from './InternshipDivision';
export type InternshipSubmissionChoice = {
  id: string;
  submissionId: string;
  divisionId: string;
  priorityOrder: number;
  answers: Array<InternshipAnswer>;
  division?: InternshipDivision;
};
