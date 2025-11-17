/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type CreatePropertiBodySchema = {
  name: string;
  description: string | null;
  category: 'sekre' | 'properti';
  condition: 'good' | 'broken' | 'cant_be_used' | 'lost';
  quantity: number;
  location: 'Sekretariat 1' | 'Sekretariat 2' | 'Jatinangor';
  photo: string | null;
  status: 'in_use' | 'available';
};

