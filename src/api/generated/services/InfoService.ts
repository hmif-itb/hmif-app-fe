/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Course } from '../models/Course';
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
   * @returns any Info created
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
  }): CancelablePromise<{
    id: string;
    creatorId: string;
    title: string;
    content: string;
    createdAt: string;
    infoMedias?: Array<{
      infoId: string;
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
    infoCategories?: Array<{
      infoId: string;
      categoryId: string;
      category: {
        id: string;
        name: string;
        requiredPush: boolean;
      };
    }>;
    infoCourses?: Array<{
      infoId: string;
      courseId: string;
      class: number | null;
      course: Course;
    }>;
    infoAngkatan?: Array<{
      infoId: string;
      angkatanId: string;
      angkatan: {
        id: string;
        year: number;
        name: string;
      };
    }>;
    isRead?: boolean;
  }> {
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
    sort = 'newest',
  }: {
    search?: string,
    category?: string,
    unread?: 'true' | 'false',
    userId?: string,
    offset?: number | null,
    sort?: 'oldest' | 'newest',
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
        'sort': sort,
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
