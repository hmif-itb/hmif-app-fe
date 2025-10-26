/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PeminjamanSchema } from './PeminjamanSchema';
export type PeminjamanAktifSchema = (PeminjamanSchema & {
  properti?: {
    id: string;
    name: string;
    description: string | null;
    category: 'sekre' | 'properti';
    condition: 'good' | 'broken' | 'cant_be_used' | 'lost';
    quantity: number;
    location: 'Sekretariat 1' | 'Sekretariat 2' | 'Jatinangor';
    photo: string | null;
    createdAt: string;
    updatedAt: string;
    status: 'in_use' | 'available';
  };
});

