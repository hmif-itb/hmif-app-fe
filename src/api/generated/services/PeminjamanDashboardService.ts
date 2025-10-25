/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PeminjamanSchema } from '../models/PeminjamanSchema';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class PeminjamanDashboardService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}
  /**
   * @returns PeminjamanSchema Get list of property loans for the calendar view
   * @throws ApiError
   */
  public getPeminjaman({
    startDate,
    endDate,
  }: {
    startDate?: string | null,
    endDate?: string | null,
  }): CancelablePromise<Array<PeminjamanSchema>> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/dashboard/peminjaman',
      query: {
        'startDate': startDate,
        'endDate': endDate,
      },
      errors: {
        400: `Bad request`,
      },
    });
  }
  /**
   * @returns PeminjamanSchema Get list of loans that are nearing their end date
   * @throws ApiError
   */
  public getPeminjamanNearingEnd({
    days = '7',
  }: {
    days?: string,
  }): CancelablePromise<Array<PeminjamanSchema>> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/dashboard/peminjaman/nearing-end',
      query: {
        'days': days,
      },
      errors: {
        400: `Bad request`,
      },
    });
  }
}
