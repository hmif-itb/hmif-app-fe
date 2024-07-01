/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { User } from '../models/User';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class UserProfileService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}
  /**
   * @returns any Get academic info of user
   * @throws ApiError
   */
  public getUserAcademic(): CancelablePromise<{
    semester?: number;
    semesterYear: number;
    semesterCode: 'Ganjil' | 'Genap';
  }> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/user/academic',
      errors: {
        400: `Bad request`,
      },
    });
  }
  /**
   * @returns User Get profile of user
   * @throws ApiError
   */
  public getUserProfile(): CancelablePromise<User> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/user',
      errors: {
        400: `Bad request`,
      },
    });
  }
}
