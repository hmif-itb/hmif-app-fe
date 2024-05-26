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
      title: string;
      content: string;
      mediaUrls?: Array<string>;
      forCategories: Array<string>;
      forAngkatan?: Array<string>;
      forCourses?: Array<{
        courseId: string;
        class?: number;
      }>;
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
  public getListInfo({
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
  /**
   * @returns any Info deleted
   * @throws ApiError
   */
  public deleteInfo({
    infoId,
  }: {
    /**
     * Id of info
     */
    infoId: string,
  }): CancelablePromise<any> {
    return this.httpRequest.request({
      method: 'DELETE',
      url: '/api/info/{infoId}',
      path: {
        'infoId': infoId,
      },
      errors: {
        400: `Bad request`,
        404: `Id not found`,
      },
    });
  }
  /**
   * @returns Info Get info by id
   * @throws ApiError
   */
  public getInfoById({
    infoId,
  }: {
    /**
     * Id of info
     */
    infoId: string,
  }): CancelablePromise<Info> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/info/{infoId}',
      path: {
        'infoId': infoId,
      },
      errors: {
        400: `Bad request`,
        404: `Id not found`,
      },
    });
  }
}
