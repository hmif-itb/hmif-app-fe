/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Angkatan } from '../models/Angkatan';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class CategoryService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}
  /**
   * @returns any Get list of categories
   * @throws ApiError
   */
  public getListCategory(): CancelablePromise<{
    categories: Array<{
      id: string;
      name: string;
      requiredPush: boolean;
    }>;
  }> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/category',
      errors: {
        400: `Bad request`,
      },
    });
  }
  /**
   * @returns any Get category by id
   * @throws ApiError
   */
  public getCategoryById({
    categoryId,
  }: {
    categoryId: string,
  }): CancelablePromise<{
    id: string;
    name: string;
    requiredPush: boolean;
  }> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/category/{categoryId}',
      path: {
        'categoryId': categoryId,
      },
      errors: {
        400: `Bad request`,
        404: `Category not found`,
      },
    });
  }
  /**
   * @returns Angkatan Get list of angkatan
   * @throws ApiError
   */
  public getListAngkatan(): CancelablePromise<Array<Angkatan>> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/angkatan',
    });
  }
}
