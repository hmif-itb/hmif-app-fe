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
   * @returns any Get list of user's property loans
   * @throws ApiError
   */
  public getUserPeminjaman({
    category,
    status,
    search,
    page = 1,
    limit = 10,
  }: {
    /**
     * Filter by category
     */
    category?: 'sekre' | 'properti',
    /**
     * Filter by status
     */
    status?: 'pending' | 'rejected' | 'accepted' | 'pending_return' | 'completed',
    /**
     * Search by property name or title
     */
    search?: string,
    /**
     * Page number
     */
    page?: number,
    /**
     * Number of items per page
     */
    limit?: number,
  }): CancelablePromise<{
    peminjaman: Array<(PeminjamanSchema & {
      alasan: string | null;
      jenisPeminjaman: 'eksklusif' | 'non-eksklusif';
      createdAt: string | null;
      buktiFotoUrl: string | null;
    })>;
    total: number;
    page: number;
    limit: number;
  }> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/peminjaman',
      query: {
        'category': category,
        'status': status,
        'search': search,
        'page': page,
        'limit': limit,
      },
      errors: {
        400: `Bad request`,
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
}
