/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Competition } from '../models/Competition';
import type { CompetitionCategories } from '../models/CompetitionCategories';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class CompetitionsService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}
  /**
   * @returns CompetitionCategories Fetched competition categories
   * @throws ApiError
   */
  public getCompetitionCategories(): CancelablePromise<CompetitionCategories> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/competitions/categories',
    });
  }
  /**
   * @returns any Created competition
   * @throws ApiError
   */
  public createCompetition({
    requestBody,
  }: {
    requestBody?: {
      name: string;
      organizer: string;
      registrationStart?: string | null;
      registrationDeadline?: string | null;
      price?: string | null;
      sourceUrl: string;
      registrationUrl: string;
      categories?: CompetitionCategories;
      mediaUrls?: Array<string>;
    },
  }): CancelablePromise<{
    id: string;
    name: string;
    organizer: string;
    registrationStart: string;
    registrationDeadline: string;
    price: string | null;
    sourceUrl: string;
    registrationUrl: string;
    categories: Array<'Competitive Programming' | 'Capture The Flag' | 'Data Science / Data Analytics' | 'UI/UX' | 'Game Development' | 'Business IT Case' | 'Innovation' | 'Web Development'>;
    createdAt: string;
    medias?: Array<{
      competitionId: string;
      mediaId: string;
      order: number;
      media: {
        id: string;
        creatorId: string;
        name: string;
        type: string;
        url: string;
        createdAt: string;
      };
    }>;
  }> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/api/competitions',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        400: `Bad request`,
      },
    });
  }
  /**
   * @returns any Fetched list of competitions
   * @throws ApiError
   */
  public getCompetitionList({
    filter,
    sort = 'created',
    category,
    offset,
  }: {
    /**
     * is active or not
     */
    filter?: string,
    /**
     * Sort info competitions
     */
    sort?: 'created' | 'deadline',
    /**
     * category info competitions
     */
    category?: 'Competitive Programming' | 'Capture The Flag' | 'Data Science / Data Analytics' | 'UI/UX' | 'Game Development' | 'Business IT Case' | 'Innovation' | 'Web Development',
    offset?: number | null,
  }): CancelablePromise<{
    competitions: Array<Competition>;
  }> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/competitions',
      query: {
        'filter': filter,
        'sort': sort,
        'category': category,
        'offset': offset,
      },
      errors: {
        400: `Bad request: validation error`,
      },
    });
  }
  /**
   * @returns any Updated competition
   * @throws ApiError
   */
  public updateCompetition({
    id,
    requestBody,
  }: {
    id: string,
    requestBody?: {
      name?: string;
      organizer?: string;
      registrationStart?: string | null;
      registrationDeadline?: string | null;
      price?: string | null;
      sourceUrl?: string;
      registrationUrl?: string;
      categories?: CompetitionCategories;
      mediaUrls?: Array<string>;
    },
  }): CancelablePromise<{
    id: string;
    name: string;
    organizer: string;
    registrationStart: string;
    registrationDeadline: string;
    price: string | null;
    sourceUrl: string;
    registrationUrl: string;
    categories: Array<'Competitive Programming' | 'Capture The Flag' | 'Data Science / Data Analytics' | 'UI/UX' | 'Game Development' | 'Business IT Case' | 'Innovation' | 'Web Development'>;
    createdAt: string;
    medias?: Array<{
      competitionId: string;
      mediaId: string;
      order: number;
      media: {
        id: string;
        creatorId: string;
        name: string;
        type: string;
        url: string;
        createdAt: string;
      };
    }>;
  }> {
    return this.httpRequest.request({
      method: 'PUT',
      url: '/api/competitions/{id}',
      path: {
        'id': id,
      },
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        400: `Bad request`,
        404: `Competition not found`,
      },
    });
  }
  /**
   * @returns Competition Successfully deleted comment
   * @throws ApiError
   */
  public deleteCompetition({
    competitionId,
  }: {
    /**
     * Id of fetched/deleted competitions
     */
    competitionId: string,
  }): CancelablePromise<Competition> {
    return this.httpRequest.request({
      method: 'DELETE',
      url: '/api/competitions/{competitionId}',
      path: {
        'competitionId': competitionId,
      },
      errors: {
        400: `Bad request`,
        500: `Internal server error`,
      },
    });
  }
}
