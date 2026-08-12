/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { InternshipKesibukan } from './InternshipKesibukan';
import type { InternshipSubmissionChoice } from './InternshipSubmissionChoice';
export type InternshipSubmission = {
  id: string;
  userId: string;
  nim: string;
  fullName: string;
  jurusan: string;
  kelas: string;
  idLine: string;
  pengalamanOrganisasi: string | null;
  kesibukan: Array<InternshipKesibukan>;
  isLocked: boolean;
  submittedAt: string | null;
  createdAt: string;
  updatedAt: string;
  choices?: Array<InternshipSubmissionChoice>;
};
