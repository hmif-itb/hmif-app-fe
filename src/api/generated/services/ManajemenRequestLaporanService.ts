/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PeminjamanSchema } from '../models/PeminjamanSchema';
import type { UpdateLaporanStatusSchema } from '../models/UpdateLaporanStatusSchema';
import type { UpdatePeminjamanStatusSchema } from '../models/UpdatePeminjamanStatusSchema';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class ManajemenRequestLaporanService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}
  /**
   * @returns any Daftar request peminjaman
   * @throws ApiError
   */
  public getRequestList({
    category,
    status,
    search,
    page = 1,
    limit = 10,
  }: {
    category?: 'sekre' | 'properti',
    /**
     * Filter by status
     */
    status?: 'pending' | 'rejected' | 'accepted' | 'pending_return' | 'completed',
    /**
     * Search by borrower name or title
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
    requests: Array<(PeminjamanSchema & {
      alasan: string | null;
      jenisPeminjaman: 'eksklusif' | 'non-eksklusif';
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
      createdAt: string | null;
      buktiFotoUrl: string | null;
    })>;
    total: number;
    page: number;
    limit: number;
  }> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/request',
      query: {
        'category': category,
        'status': status,
        'search': search,
        'page': page,
        'limit': limit,
      },
    });
  }
  /**
   * @returns any Jadwal peminjaman properti
   * @throws ApiError
   */
  public getPeminjamanSchedule({
    propertiId,
  }: {
    propertiId: string,
  }): CancelablePromise<{
    propertyId: string;
    schedules: Array<{
      startDate: string;
      endDate: string;
      jenisPeminjaman: 'eksklusif' | 'non-eksklusif';
    }>;
  }> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/request/{propertiId}/schedule',
      path: {
        'propertiId': propertiId,
      },
      errors: {
        404: `Error`,
      },
    });
  }
  /**
   * @returns any Status request berhasil diperbarui
   * @throws ApiError
   */
  public updateRequestStatus({
    peminjamanId,
    requestBody,
  }: {
    peminjamanId: string,
    requestBody?: UpdatePeminjamanStatusSchema,
  }): CancelablePromise<(PeminjamanSchema & {
    alasan: string | null;
    jenisPeminjaman: 'eksklusif' | 'non-eksklusif';
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
    createdAt: string | null;
    buktiFotoUrl: string | null;
  })> {
    return this.httpRequest.request({
      method: 'PUT',
      url: '/api/request/{peminjamanId}/status',
      path: {
        'peminjamanId': peminjamanId,
      },
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        403: `Error`,
        404: `Error`,
      },
    });
  }
  /**
   * @returns any Daftar laporan properti
   * @throws ApiError
   */
  public getLaporanList({
    category,
    status,
    search,
    page = 1,
    limit = 10,
  }: {
    category?: 'sekre' | 'properti',
    /**
     * Filter by status
     */
    status?: 'pending' | 'accepted' | 'rejected',
    /**
     * Search by description
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
    laporan: Array<{
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
    }>;
    total: number;
    page: number;
    limit: number;
  }> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/laporan',
      query: {
        'category': category,
        'status': status,
        'search': search,
        'page': page,
        'limit': limit,
      },
    });
  }
  /**
   * @returns any Status laporan berhasil diperbarui
   * @throws ApiError
   */
  public updateLaporanStatus({
    laporanId,
    requestBody,
  }: {
    laporanId: string,
    requestBody?: UpdateLaporanStatusSchema,
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
      method: 'PUT',
      url: '/api/laporan/{laporanId}/status',
      path: {
        'laporanId': laporanId,
      },
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        403: `Error`,
        404: `Error`,
      },
    });
  }
}
