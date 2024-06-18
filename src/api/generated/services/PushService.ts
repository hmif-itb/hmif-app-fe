/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PushSubscription } from '../models/PushSubscription';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class PushService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}
  /**
   * @returns any Push subscription logged out
   * @throws ApiError
   */
  public logoutPush({
    requestBody,
  }: {
    requestBody: {
      endpoint: string;
    },
  }): CancelablePromise<any> {
    return this.httpRequest.request({
      method: 'PUT',
      url: '/api/push/logout',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        400: `Bad request: validation error`,
      },
    });
  }
  /**
   * Register a push subscription returned by the browser push API
   * @returns any Push subscription registered
   * @throws ApiError
   */
  public registerPush({
    requestBody,
  }: {
    requestBody: PushSubscription,
  }): CancelablePromise<any> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/api/push/register',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        400: `Bad request: validation error`,
      },
    });
  }
  /**
   * @returns any Push broadcasted
   * @throws ApiError
   */
  public broadcast({
    requestBody,
  }: {
    requestBody: {
      title: string;
      options?: {
        body?: string;
      };
    },
  }): CancelablePromise<any> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/api/push/broadcast',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        400: `Bad request: validation error`,
      },
    });
  }
}
