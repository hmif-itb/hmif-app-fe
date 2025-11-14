/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type PeminjamanSchema = {
  id: string;
  borrowerName: string;
  propertyName: string;
  startDate: string;
  endDate: string;
  status: 'pending' | 'rejected' | 'accepted' | 'pending_return' | 'completed';
  title: string;
  category: 'sekre' | 'properti';
};

