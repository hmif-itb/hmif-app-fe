/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { InternshipQuestion } from './InternshipQuestion';
export type InternshipDivision = {
  id: string;
  departmentId: string;
  name: string;
  quotaMin: number | null;
  quotaIdeal: number | null;
  quotaMax: number | null;
  questions: Array<InternshipQuestion>;
  questionsRaw: string | null;
  order: number;
};
