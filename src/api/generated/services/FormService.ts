/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AdminFormListItem } from '../models/AdminFormListItem';
import type { AdminFormResponseItem } from '../models/AdminFormResponseItem';
import type { FormAnswer } from '../models/FormAnswer';
import type { FormDetail } from '../models/FormDetail';
import type { FormListItem } from '../models/FormListItem';
import type { FormResponse } from '../models/FormResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class FormService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}
  /**
   * @returns any List of forms eligible for the current user
   * @throws ApiError
   */
  public listForms(): CancelablePromise<{
    forms: Array<FormListItem>;
  }> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/form',
      errors: {
        401: `Error`,
      },
    });
  }
  /**
   * @returns any List of all active forms, regardless of eligibility (admin only)
   * @throws ApiError
   */
  public listAllForms(): CancelablePromise<{
    forms: Array<AdminFormListItem>;
  }> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/form/admin/list',
      errors: {
        401: `Error`,
      },
    });
  }
  /**
   * @returns FormDetail Form detail. `sections` is null if the form has not opened yet.
   * @throws ApiError
   */
  public getForm({
    formId,
  }: {
    /**
     * Form id
     */
    formId: string,
  }): CancelablePromise<FormDetail> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/form/{formId}',
      path: {
        'formId': formId,
      },
      errors: {
        401: `Error`,
        404: `Error`,
      },
    });
  }
  /**
   * @returns FormResponse My response to this form (null if not yet submitted)
   * @throws ApiError
   */
  public getMyFormResponse({
    formId,
  }: {
    /**
     * Form id
     */
    formId: string,
  }): CancelablePromise<FormResponse> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/form/{formId}/my-response',
      path: {
        'formId': formId,
      },
      errors: {
        401: `Error`,
        404: `Error`,
      },
    });
  }
  /**
   * @returns FormResponse Submitted response
   * @throws ApiError
   */
  public submitFormResponse({
    formId,
    requestBody,
  }: {
    /**
     * Form id
     */
    formId: string,
    requestBody?: {
      answers: Array<FormAnswer>;
    },
  }): CancelablePromise<FormResponse> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/api/form/{formId}/response',
      path: {
        'formId': formId,
      },
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        400: `Bad request`,
        401: `Error`,
        403: `Error`,
        404: `Error`,
        409: `Already submitted a response for this form`,
      },
    });
  }
  /**
   * @returns any Paginated list of responses (admin only)
   * @throws ApiError
   */
  public listFormResponses({
    formId,
    search,
    page = 1,
    limit = 20,
  }: {
    /**
     * Form id
     */
    formId: string,
    /**
     * Search by NIM or name
     */
    search?: string,
    page?: number,
    limit?: number,
  }): CancelablePromise<{
    responses: Array<AdminFormResponseItem>;
    total: number;
    page: number;
    limit: number;
  }> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/form/{formId}/responses',
      path: {
        'formId': formId,
      },
      query: {
        'search': search,
        'page': page,
        'limit': limit,
      },
      errors: {
        400: `Bad request: validation error`,
        401: `Error`,
      },
    });
  }
  /**
   * @returns any Total number of responses (admin only)
   * @throws ApiError
   */
  public getFormResponsesCount({
    formId,
  }: {
    /**
     * Form id
     */
    formId: string,
  }): CancelablePromise<{
    total: number;
  }> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/form/{formId}/responses/count',
      path: {
        'formId': formId,
      },
      errors: {
        401: `Error`,
      },
    });
  }
  /**
   * @returns any Aggregated analytics per question (admin only)
   * @throws ApiError
   */
  public getFormAnalytics({
    formId,
  }: {
    /**
     * Form id
     */
    formId: string,
  }): CancelablePromise<{
    totalResponses: number;
    questions: Array<{
      questionId: string;
      label: string;
      type: 'radio' | 'checkbox' | 'rating';
      options: Array<{
        value: string;
        count: number;
      }>;
    }>;
  }> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/form/{formId}/analytics',
      path: {
        'formId': formId,
      },
      errors: {
        401: `Error`,
        404: `Error`,
      },
    });
  }
}
