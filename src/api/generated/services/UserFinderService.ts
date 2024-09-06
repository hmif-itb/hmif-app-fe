/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { User } from '../models/User';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class UserFinderService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}
  /**
   * @returns User Get user By Nim or Full Name
   * @throws ApiError
   */
  public getUser({
    search,
  }: {
    search: string,
  }): CancelablePromise<Array<User>> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/user/nim',
      query: {
        'search': search,
      },
      errors: {
        400: `Bad request`,
        404: `User not found`,
      },
    });
  }
}
