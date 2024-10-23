/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class UnsubscribeService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}
  /**
   * Get a specific category which user is unsubscribed to
   * @returns any Selected a category which user unsubscribed to
   * @throws ApiError
   */
  public getUserUnsubscribeCategory({
    categoryId,
  }: {
    categoryId: string,
  }): CancelablePromise<{
    userId: string;
    categoryId: string;
    unsubscribed: boolean;
  }> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/unsubscribe/category/{categoryId}',
      path: {
        'categoryId': categoryId,
      },
      errors: {
        400: `Bad request`,
        500: `Internal server error`,
      },
    });
  }
  /**
   * Get list of categories which user unsubscribes to
   * @returns any Selected multiple categories which user unsubscribed to
   * @throws ApiError
   */
  public getListUserUnsubscribeCategory(): CancelablePromise<{
    userId: string;
    categoryId: Array<string>;
  }> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/unsubscribe/categories',
      errors: {
        500: `Internal server error`,
      },
    });
  }
  /**
   * Unsubscribe a user from multiple categories
   * @returns any User unsubscribed to all given categories
   * @throws ApiError
   */
  public postListUserUnsubscribeCategory({
    requestBody,
  }: {
    requestBody: {
      categoryId: Array<string>;
    },
  }): CancelablePromise<{
    userId: string;
    categoryId: Array<string>;
    requiredSubscriptions: Array<string>;
    categoriesNotFound: Array<string>;
    categoriesAlreadyUnsubscribed: Array<string>;
  }> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/api/unsubscribe/categories',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        400: `Bad request`,
        500: `Internal server error`,
      },
    });
  }
  /**
   * Remove user unsubscription from multiple categories
   * @returns any User is subscribed to all given categories
   * @throws ApiError
   */
  public deleteListUserUnsubscribe({
    requestBody,
  }: {
    requestBody: {
      categoryId: Array<string>;
    },
  }): CancelablePromise<{
    userId: string;
    categoryId: Array<string>;
    categoriesNotFound: Array<string>;
    categoriesAlreadySubscribed: Array<string>;
  }> {
    return this.httpRequest.request({
      method: 'DELETE',
      url: '/api/unsubscribe/categories',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        400: `Bad request`,
        500: `Internal server error`,
      },
    });
  }
  /**
   * Unsubscribe a user from a category
   * @returns any Unsubscribed user to the category
   * @throws ApiError
   */
  public postUserUnsubscribeCategory({
    requestBody,
  }: {
    requestBody: {
      categoryId: string;
    },
  }): CancelablePromise<{
    userId: string;
    categoryId: string;
  }> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/api/unsubscribe/category',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        400: `Bad request`,
        500: `Internal server error`,
      },
    });
  }
  /**
   * Remove user unsubscription from a category
   * @returns any Subscribed user to the category
   * @throws ApiError
   */
  public deleteUserUnsubscribeCategory({
    requestBody,
  }: {
    requestBody: {
      categoryId: string;
    },
  }): CancelablePromise<{
    userId: string;
    categoryId: string;
  }> {
    return this.httpRequest.request({
      method: 'DELETE',
      url: '/api/unsubscribe/category',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        400: `Bad request`,
        500: `Internal server error`,
      },
    });
  }
}
