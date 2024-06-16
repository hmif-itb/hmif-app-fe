/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Testimoni } from '../models/Testimoni';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class TestimoniService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}
  /**
   * @returns Testimoni Testimoni created
   * @throws ApiError
   */
  public createTestimoni({
    requestBody,
  }: {
    requestBody?: {
      courseId: string;
      userName?: string | null;
      overview: string;
      assignments: string;
      lecturer: string;
    },
  }): CancelablePromise<Testimoni> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/api/testimoni',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        400: `Bad request`,
      },
    });
  }
}
