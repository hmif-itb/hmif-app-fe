/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { OgObject } from '../models/OgObject';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class OpenGraphService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}
  /**
   * Scrape Open Graph meta tags from a URL
   * @returns OgObject Scrape successful
   * @throws ApiError
   */
  public openGraphScrape({
    url,
  }: {
    url: string,
  }): CancelablePromise<OgObject> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/open-graph',
      query: {
        'url': url,
      },
      errors: {
        400: `Invalid URL`,
      },
    });
  }
}
