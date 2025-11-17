/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreatePrestasiResponse } from '../models/CreatePrestasiResponse';
import type { Prestasi } from '../models/Prestasi';
import type { PrestasiDetail } from '../models/PrestasiDetail';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class AchievementsService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}
  /**
   * @returns any Fetched list of achievements
   * @throws ApiError
   */
  public getListPrestasi({
    category,
    startDate,
    endDate,
    search,
    page = 1,
    limit = 10,
  }: {
    /**
     * Filter by category
     */
    category?: 'competition' | 'organization' | 'committee',
    /**
     * Start date filter (YYYY-MM format)
     */
    startDate?: string,
    /**
     * End date filter (YYYY-MM format)
     */
    endDate?: string,
    /**
     * Search by user full name or judul prestasi (penyelenggara)
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
    prestasi: Array<Prestasi>;
    total: number;
  }> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/achievements',
      query: {
        'category': category,
        'start_date': startDate,
        'end_date': endDate,
        'search': search,
        'page': page,
        'limit': limit,
      },
      errors: {
        400: `Bad request: validation error`,
      },
    });
  }
  /**
   * @returns CreatePrestasiResponse Prestasi created successfully
   * @throws ApiError
   */
  public createPrestasi({
    requestBody,
  }: {
    requestBody?: {
      userId?: string;
      jenisPrestasi: 'organisasi' | 'kepanitiaan' | 'kompetisi';
      penyelenggara: string;
      deskripsi?: string | null;
      bulan: number;
      tahun: number;
      competitionType?: 'CP' | 'CTF' | 'BCC' | 'DS' | 'AI' | 'Hackathon' | null;
      mediaUrls?: Array<string>;
    },
  }): CancelablePromise<CreatePrestasiResponse> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/api/achievements',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        400: `Error`,
        401: `Error`,
        404: `Error`,
        500: `Error`,
      },
    });
  }
  /**
   * @returns PrestasiDetail Fetched achievement by id
   * @throws ApiError
   */
  public getPrestasiById({
    idPrestasi,
  }: {
    /**
     * Id of prestasi
     */
    idPrestasi: string,
  }): CancelablePromise<PrestasiDetail> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/achievements/{idPrestasi}',
      path: {
        'idPrestasi': idPrestasi,
      },
      errors: {
        400: `Bad request: validation error`,
        404: `Achievement not found`,
      },
    });
  }
  /**
   * @returns CreatePrestasiResponse Prestasi updated successfully
   * @throws ApiError
   */
  public updatePrestasi({
    idPrestasi,
    requestBody,
  }: {
    /**
     * Id of prestasi
     */
    idPrestasi: string,
    requestBody?: {
      jenisPrestasi?: 'organisasi' | 'kepanitiaan' | 'kompetisi';
      penyelenggara?: string;
      deskripsi?: string;
      bulan?: number;
      tahun?: number;
      competitionType?: 'CP' | 'CTF' | 'BCC' | 'DS' | 'AI' | 'Hackathon';
      mediaUrls?: Array<string>;
    },
  }): CancelablePromise<CreatePrestasiResponse> {
    return this.httpRequest.request({
      method: 'PUT',
      url: '/api/achievements/{idPrestasi}',
      path: {
        'idPrestasi': idPrestasi,
      },
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        400: `Bad request: validation error`,
        401: `Error`,
        404: `Error`,
        500: `Error`,
      },
    });
  }
  /**
   * @returns any Prestasi deleted successfully
   * @throws ApiError
   */
  public deletePrestasi({
    idPrestasi,
  }: {
    /**
     * Id of prestasi
     */
    idPrestasi: string,
  }): CancelablePromise<{
    message: string;
  }> {
    return this.httpRequest.request({
      method: 'DELETE',
      url: '/api/achievements/{idPrestasi}',
      path: {
        'idPrestasi': idPrestasi,
      },
      errors: {
        400: `Bad request: validation error`,
        401: `Error`,
        404: `Error`,
        500: `Error`,
      },
    });
  }
  /**
   * @returns binary Excel file with prestasi data
   * @throws ApiError
   */
  public exportPrestasi({
    category,
    startDate,
    endDate,
  }: {
    /**
     * Filter by category
     */
    category?: 'competition' | 'organization' | 'committee',
    /**
     * Start date filter (YYYY-MM format)
     */
    startDate?: string,
    /**
     * End date filter (YYYY-MM format)
     */
    endDate?: string,
  }): CancelablePromise<Blob> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/achievements/export/excel',
      query: {
        'category': category,
        'start_date': startDate,
        'end_date': endDate,
      },
      errors: {
        400: `Bad request: validation error`,
        401: `Error`,
        500: `Error`,
      },
    });
  }
}
