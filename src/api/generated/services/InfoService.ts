/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class InfoService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}
  /**
   * @returns any Created user read info
   * @throws ApiError
   */
  public postInfoRead({
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
}
