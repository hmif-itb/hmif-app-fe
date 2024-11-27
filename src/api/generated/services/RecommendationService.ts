/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class RecommendationService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}
  /**
   * Create a new voucher recommendation
   * @returns any Voucher recommendation created
   * @throws ApiError
   */
  public postRecommendationVoucher({
    requestBody,
  }: {
    requestBody: {
      title: string;
      imageURL: string;
      link: string | null;
      startPeriod: string | null;
      endPeriod: string | null;
      description: string | null;
    },
  }): CancelablePromise<{
    title: string;
    imageURL: string;
    link: string | null;
    startPeriod: string | null;
    endPeriod: string | null;
    description: string | null;
    id: string;
  }> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/api/recommendation/voucher',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        400: `Bad request: validation error`,
        500: `Something went wrong!`,
      },
    });
  }
  /**
   * Create a new co-working space recommendation
   * @returns any Co-working space recommendation created
   * @throws ApiError
   */
  public postRecommendationCoWorkingSpace({
    requestBody,
  }: {
    requestBody?: {
      title: string;
      imageURL: string;
      location: 'Ganesha' | 'Jatinangor';
      address: string;
      mapsURL: string;
      description: string | null;
    },
  }): CancelablePromise<{
    title: string;
    imageURL: string;
    location: 'Ganesha' | 'Jatinangor';
    address: string;
    mapsURL: string;
    description: string | null;
    id: string;
  }> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/api/recommendation/co-working-space',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        400: `Bad request: validation error`,
        500: `Something went wrong!`,
      },
    });
  }
}
