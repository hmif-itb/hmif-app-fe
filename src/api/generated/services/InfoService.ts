/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Info } from '../models/Info';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class InfoService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}
  /**
   * @returns any Created user read info
   * @throws ApiError
   */
  public readInfo({
    infoId,
  }: {
    infoId: string,
  }): CancelablePromise<any> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/api/info/{infoId}/read',
      path: {
        'infoId': infoId,
      },
      errors: {
        400: `Bad request`,
      },
    });
  }
  /**
   * Create an info
   * @returns Info Info created
   * @throws ApiError
   */
  public createInfo({
    requestBody,
  }: {
    requestBody: {
      content: string;
      category: string;
      forAngkatan: number;
      mediaUrls?: Array<string>;
      forMatakuliah: string;
      forClass: string;
    },
  }): CancelablePromise<Info> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/api/info',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        400: `Bad request`,
      },
    });
  }
  /**
   * @returns any Get list of infos based on filter
   * @throws ApiError
   */
  public getListInfos({
    search,
    category,
    unread = 'false',
    userId,
    offset,
  }: {
    search?: string,
    category?: string,
    unread?: 'true' | 'false',
    userId?: string,
    offset?: number | null,
  }): CancelablePromise<{
    infos: Array<Info>;
  }> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/info',
      query: {
        'search': search,
        'category': category,
        'unread': unread,
        'userId': userId,
        'offset': offset,
      },
      errors: {
        400: `Bad request`,
      },
    });
  }
}
