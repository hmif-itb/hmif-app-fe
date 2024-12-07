/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Voucher } from '../models/Voucher';
import type { CoWorking } from '../models/CoWorking';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class RecommendationService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}
  /**
   * @returns any Created coworking
   * @throws ApiError
   */
  public createCoWorkingSpace({
    requestBody,
  }: {
    requestBody?: {
      title: string;
      imageURL: string;
      location: string;
      address: string;
      mapsURL: string;
      description?: string | null;
    },
  }): CancelablePromise<{
    coWorkingSpaceId: string;
    title: string;
    location: Array<'Ganesha' | 'Jatinangor'>;
    address: string;
    mapsURL: string;
    description: string | null;
    imageURL: Array<{
      coWorkinSpaceId: string;
      mediaId: string;
      order: number;
      media: {
        id: string;
        creatorId: string;
        name: string;
        type: string;
        url: string;
        createdAt: string;
      };
    }>;
  }> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/api/recommendation/co-working-space',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        400: `Bad request`,
      },
    });
  }
  /**
   * @returns any Fetched list of coworkingspace
   * @throws ApiError
   */
  public getCoWorkingSpaceList({
    filter,
    offset,
  }: {
    /**
     * is active or not
     */
    filter?: string,

    offset?: number | null,
  }): CancelablePromise<{
    vouchers: Array<CoWorking>;
  }> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/recommendation/co-working-space',
      query: {
        'filter': filter,
        'offset': offset,
      },
      errors: {
        400: `Bad request: validation error`,
      },
    });
  }
  /**
   * @returns any Updated coworkingspace
   * @throws ApiError
   */
  public updateCoWorkingSpace({
    id,
    requestBody,
  }: {
    id: string,
    requestBody?: {
        title?: string;
        imageURL?: Array<string>;
        location?: string;
        address?: string;
        mapsURL?: string;
        description?: string | null;
    },
  }): CancelablePromise<{
    coWorkingSpaceId: string;
    title: string;
    location: Array<'Ganesha' | 'Jatinangor'>;
    address: string;
    mapsURL: string;
    description: string | null;
    imageURL?: Array<{
      coWorkingSpaceId: string;
      mediaId: string;
      order: number;
      media: {
        id: string;
        creatorId: string;
        name: string;
        type: string;
        url: string;
        createdAt: string;
      };
    }>;
  }> {
    return this.httpRequest.request({
      method: 'PUT',
      url: '/api/recommendation/co-working-space/{id}',
      path: {
        'id': id,
      },
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        400: `Bad request`,
        404: `Competition not found`,
      },
    });
  }
  /**
   * @returns coworkingspace Successfully deleted comment
   * @throws ApiError
   */
  public deleteCoWorkingSpace({
    coWorkingSpaceId,
  }: {
    /**
     * Id of fetched/deleted coworkingspace
     */
    coWorkingSpaceId: string,
  }): CancelablePromise<CoWorking> {
    return this.httpRequest.request({
      method: 'DELETE',
      url: '/api/recommendation/co-working-space/{coWorkingSpaceId}',
      path: {
        'coWorkingSpaceId': coWorkingSpaceId,
      },
      errors: {
        400: `Bad request`,
        404: `Error`,
        500: `Internal server error`,
      },
    });
  }

   /**
   * @returns any Created voucher
   * @throws ApiError
   */
   public createVoucher({
    requestBody,
  }: {
    requestBody?: {
      title: string;
      imageURL: string;
      link: string;
      startPeriod?: string | null;
      endPeriod?: string | null;
      description?: string | null;
    },
  }): CancelablePromise<{
    voucherId: string;
    title: string;
    link: string;
    startPeriod: string | null;
    endPeriod: string | null;
    description: string | null
    imageURL: Array<{
      voucherId: string;
      mediaId: string;
      order: number;
      media: {
        id: string;
        creatorId: string;
        name: string;
        type: string;
        url: string;
        createdAt: string;
      };
    }>;
  }> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/api/recommendation/voucher',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        400: `Bad request`,
      },
    });
  }
  /**
   * @returns any Fetched list of vouchers
   * @throws ApiError
   */
  public getVoucherList({
    filter,
    offset,
  }: {
    /**
     * is active or not
     */
    filter?: string,

    offset?: number | null,
  }): CancelablePromise<{
    vouchers: Array<Voucher>;
  }> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/recommendation/voucher',
      query: {
        'filter': filter,
        'offset': offset,
      },
      errors: {
        400: `Bad request: validation error`,
      },
    });
  }
  /**
   * @returns any Updated voucher
   * @throws ApiError
   */
  public updateVoucher({
    id,
    requestBody,
  }: {
    id: string,
    requestBody?: {
        title?: string;
        imageURL?: Array<string>;
        link?: string;
        periodeAwal?: string | null;
        periodeAkhir?: string | null;
        description?: string | null;
    },
  }): CancelablePromise<{
    voucherId: string;
    title: string;
    link: string;
    periodeAwal: string | null;
    periodeAkhir: string | null;
    description: string | null;
    imageURL?: Array<{
      voucherId: string;
      mediaId: string;
      order: number;
      media: {
        id: string;
        creatorId: string;
        name: string;
        type: string;
        url: string;
        createdAt: string;
      };
    }>;
  }> {
    return this.httpRequest.request({
      method: 'PUT',
      url: '/api/recommendation/voucher/{id}',
      path: {
        'id': id,
      },
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        400: `Bad request`,
        404: `Competition not found`,
      },
    });
  }
  /**
   * @returns voucher Successfully deleted comment
   * @throws ApiError
   */
  public deleteVoucher({
    voucherId,
  }: {
    /**
     * Id of fetched/deleted vouchers
     */
    voucherId: string,
  }): CancelablePromise<Voucher> {
    return this.httpRequest.request({
      method: 'DELETE',
      url: '/api/recommendation/voucher/{voucherId}',
      path: {
        'voucherId': voucherId,
      },
      errors: {
        400: `Bad request`,
        404: `Error`,
        500: `Internal server error`,
      },
    });
  }

}
