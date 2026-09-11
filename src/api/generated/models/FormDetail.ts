/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FormSection } from './FormSection';
export type FormDetail = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  eligibleAngkatan: Array<number>;
  sections: Array<FormSection> | null;
  opensAt: string;
  isActive: boolean;
  order: number;
  createdAt: string;
};

