/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateLaporanBodySchema } from '../models/CreateLaporanBodySchema';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class LaporanWargaService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}
  /**
   * @returns any Laporan berhasil dibuat
   * @throws ApiError
   */
  public createLaporanWarga({
    requestBody,
  }: {
    requestBody?: CreateLaporanBodySchema,
  }): CancelablePromise<{
    id: string;
    propertiId: string;
    pelaporId: string;
    deskripsi: string;
    fotoUrl: string | null;
    status: 'pending' | 'accepted' | 'rejected';
    createdAt: string | null;
    properti: {
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
    pelapor: {
      id: string;
      fullName: string;
      nim: string;
    };
  }> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/api/laporan/warga',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        400: `Bad request`,
        403: `Error`,
        404: `Error`,
      },
    });
  }
}
