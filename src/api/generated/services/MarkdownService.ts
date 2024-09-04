/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Markdown } from '../models/Markdown';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class MarkdownService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}
  /**
   * @returns Markdown Credits markdown
   * @throws ApiError
   */
  public getCredits(): CancelablePromise<Markdown> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/markdown/credits',
      errors: {
        404: `Not found`,
      },
    });
  }
}
