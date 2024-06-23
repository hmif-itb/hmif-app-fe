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
      impressions?: string | null;
      challenges?: string | null;
      advice?: string | null;
      overview?: string | null;
      assignments?: string | null;
      lecturer_review?: string | null;
      lecturer?: string | null;
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
  /**
   * @returns Testimoni Get testimoni by course id
   * @throws ApiError
   */
  public getTestimoniByCourseId({
    courseId,
  }: {
    /**
     * Id of info
     */
    courseId: string,
  }): CancelablePromise<Array<Testimoni>> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/testimoni/course/{courseId}',
      path: {
        'courseId': courseId,
      },
      errors: {
        400: `Bad request`,
      },
    });
  }
}
