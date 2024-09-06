/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Angkatan } from '../models/Angkatan';
import type { Category } from '../models/Category';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class CategoryService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}
  /**
   * @returns any Get list of categories
   * @throws ApiError
   */
  public getListCategory(): CancelablePromise<{
    categories: Array<Category>;
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
   * @returns Angkatan Get list of angkatan
   * @throws ApiError
   */
  public getListAngkatan(): CancelablePromise<Array<Angkatan>> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/angkatan',
    });
  }
  /**
   * @returns any Get list of categories
   * @throws ApiError
   */
  public getInfoListCategory(): CancelablePromise<{
    categories: Array<Category>;
  }> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/category/info',
    });
  }
}
