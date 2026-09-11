/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type FormListItem = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  eligibleAngkatan: Array<number>;
  opensAt: string;
  isActive: boolean;
  order: number;
  createdAt: string;
  status: 'not_opened' | 'open' | 'already_responded';
};

