/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { User } from '../models/User';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class HelloService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}
  /**
   * @returns User Retrieve the user
   * @throws ApiError
   */
  public getUser({
    id,
  }: {
    id: string,
  }): CancelablePromise<User> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/users/{id}',
      path: {
        'id': id,
      },
      errors: {
        400: `Bad request: validation error`,
      },
    });
  }
}
