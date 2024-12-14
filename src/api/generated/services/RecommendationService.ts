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
  /**
   * Create a new review for a voucher recommendation
   * @returns any Voucher review created
   * @throws ApiError
   */
  public postVoucherReview({
    voucherId,
    requestBody,
  }: {
    voucherId: string,
    requestBody?: {
      /**
       * Rating for the voucher (1-5)
       */
      rating: number;
      /**
       * Detailed review about the voucher
       */
      review: string;
    },
  }): CancelablePromise<{
    userId: string;
    voucherId: string;
    rating: number;
    review: string;
  }> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/api/recommendation/voucher/{voucherId}/review',
      path: {
        'voucherId': voucherId,
      },
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        400: `Bad request: validation error`,
        500: `Something went wrong!`,
      },
    });
  }
  /**
   * @returns any Co-working space review created
   * @throws ApiError
   */
  public createCoWorkingSpaceReview({
    coWorkingSpaceId,
    requestBody,
  }: {
    coWorkingSpaceId: string,
    requestBody?: {
      /**
       * Rating for the voucher (1-5)
       */
      rating: number;
      /**
       * Detailed review about the voucher
       */
      review: string;
    },
  }): CancelablePromise<{
    coWorkingSpaceId: string;
    userId: string;
    rating: number;
    review: string;
  }> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/api/recommendation/co-working-space/{coWorkingSpaceId}/review',
      path: {
        'coWorkingSpaceId': coWorkingSpaceId,
      },
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        400: `Bad request: validation error`,
        500: `Something went wrong!`,
      },
    });
  }
  /**
   * Delete a review for a voucher recommendation
   * @returns any Review deleted successfully
   * @throws ApiError
   */
  public deleteVoucherReview({
    voucherId,
    userId,
  }: {
    voucherId: string,
    userId: string,
  }): CancelablePromise<{
    /**
     * Indicates whether the review was deleted successfully
     */
    success: boolean;
  }> {
    return this.httpRequest.request({
      method: 'DELETE',
      url: '/api/recommendation/voucher/{voucherId}/review/{userId}',
      path: {
        'voucherId': voucherId,
        'userId': userId,
      },
      errors: {
        400: `Bad request: validation error`,
        404: `Error`,
        500: `Something went wrong!`,
      },
    });
  }
  /**
   * Delete a review for a co-working space recommendation
   * @returns any Review deleted successfully
   * @throws ApiError
   */
  public deleteCoWorkingSpaceReview({
    coWorkingSpaceId,
    userId,
  }: {
    coWorkingSpaceId: string,
    userId: string,
  }): CancelablePromise<{
    /**
     * Indicates whether the review was deleted successfully
     */
    success: boolean;
  }> {
    return this.httpRequest.request({
      method: 'DELETE',
      url: '/api/recommendation/co-working-space/{coWorkingSpaceId}/review/{userId}',
      path: {
        'coWorkingSpaceId': coWorkingSpaceId,
        'userId': userId,
      },
      errors: {
        400: `Bad request: validation error`,
        404: `Error`,
        500: `Something went wrong!`,
      },
    });
  }
}
