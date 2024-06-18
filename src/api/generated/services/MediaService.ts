/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PresignedURL } from '../models/PresignedURL';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class MediaService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}
  /**
   * Creates presigned URL for file upload to S3
   * @returns PresignedURL Returns created presigned URL
   * @throws ApiError
   */
  public createPresignedUrl({
    requestBody,
  }: {
    requestBody: {
      fileName: string;
      fileType: string;
    },
  }): CancelablePromise<PresignedURL> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/api/media/upload',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        400: `Bad request: validation error`,
      },
    });
  }
}
