/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreatePropertiBodySchema } from '../models/CreatePropertiBodySchema';
import type { UpdatePropertiBodySchema } from '../models/UpdatePropertiBodySchema';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class ManajemenPropertiService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}
  /**
   * @returns any Daftar properti
   * @throws ApiError
   */
  public getPropertiList({
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
      url: '/api/properti',
      query: {
        'search': search,
        'category': category,
        'condition': condition,
        'sortBy': sortBy,
      },
      errors: {
        400: `Kesalahan dari Postgres`,
      },
    });
  }
  /**
   * @returns any Properti berhasil dibuat
   * @throws ApiError
   */
  public createProperti({
    requestBody,
  }: {
    requestBody?: CreatePropertiBodySchema,
  }): CancelablePromise<{
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
  }> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/api/properti',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        400: `Bad request`,
        403: `Error`,
      },
    });
  }
  /**
   * @returns any Detail properti
   * @throws ApiError
   */
  public getPropertiById({
    propertiId,
  }: {
    propertiId: string,
  }): CancelablePromise<{
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
  }> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/properti/{propertiId}',
      path: {
        'propertiId': propertiId,
      },
      errors: {
        404: `Properti tidak ditemukan`,
      },
    });
  }
  /**
   * @returns any Properti berhasil diperbarui
   * @throws ApiError
   */
  public updateProperti({
    propertiId,
    requestBody,
  }: {
    propertiId: string,
    requestBody?: UpdatePropertiBodySchema,
  }): CancelablePromise<{
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
  }> {
    return this.httpRequest.request({
      method: 'PUT',
      url: '/api/properti/{propertiId}',
      path: {
        'propertiId': propertiId,
      },
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        400: `Bad request`,
        403: `Error`,
        404: `Error`,
      },
    });
  }
  /**
   * @returns void
   * @throws ApiError
   */
  public deleteProperti({
    propertiId,
  }: {
    propertiId: string,
  }): CancelablePromise<void> {
    return this.httpRequest.request({
      method: 'DELETE',
      url: '/api/properti/{propertiId}',
      path: {
        'propertiId': propertiId,
      },
      errors: {
        403: `Error`,
        404: `Error`,
      },
    });
  }
}
