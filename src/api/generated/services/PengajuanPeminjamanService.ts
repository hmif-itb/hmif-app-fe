/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreatePengajuanBodySchema } from '../models/CreatePengajuanBodySchema';
import type { PeminjamanSchema } from '../models/PeminjamanSchema';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class PengajuanPeminjamanService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}
  /**
   * @returns any Daftar properti yang tersedia untuk dipinjam
   * @throws ApiError
   */
  public getWargaPropertiList({
    search,
    category,
    condition,
    sortBy = 'name_asc',
  }: {
    search?: string,
    category?: 'sekre' | 'properti',
    condition?: 'good' | 'broken' | 'cant_be_used' | 'lost',
    sortBy?: 'name_asc' | 'name_desc',
  }): CancelablePromise<Array<{
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
  }>> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/warga/properti',
      query: {
        'search': search,
        'category': category,
        'condition': condition,
        'sortBy': sortBy,
      },
    });
  }
  /**
   * @returns PeminjamanSchema Pengajuan peminjaman berhasil dibuat
   * @throws ApiError
   */
  public createPengajuan({
    requestBody,
  }: {
    requestBody?: CreatePengajuanBodySchema,
  }): CancelablePromise<PeminjamanSchema> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/api/peminjaman',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        400: `Bad request`,
        409: `Konflik jadwal (untuk peminjaman eksklusif)`,
      },
    });
  }
}
