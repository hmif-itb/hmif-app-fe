/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Reaction } from '../models/Reaction';
import type { ReactionAggregate } from '../models/ReactionAggregate';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class ReactionService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}
  /**
   * @returns ReactionAggregate Get reactions
   * @throws ApiError
   */
  public getReactions({
    infoId,
    commentId,
  }: {
    infoId?: string,
    commentId?: string,
  }): CancelablePromise<ReactionAggregate> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/reaction',
      query: {
        'infoId': infoId,
        'commentId': commentId,
      },
      errors: {
        400: `Bad request`,
        404: `Not found`,
      },
    });
  }
  /**
   * @returns Reaction Updated reaction
   * @throws ApiError
   */
  public createOrUpdateReaction({
    requestBody,
  }: {
    requestBody?: {
      infoId?: string;
      commentId?: string;
      reaction: string;
    },
  }): CancelablePromise<Reaction> {
    return this.httpRequest.request({
      method: 'PUT',
      url: '/api/reaction',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        400: `Bad request`,
      },
    });
  }
  /**
   * @returns Reaction Reaction deleted
   * @throws ApiError
   */
  public deleteReaction({
    reactionId,
  }: {
    reactionId: string,
  }): CancelablePromise<Reaction> {
    return this.httpRequest.request({
      method: 'DELETE',
      url: '/api/reaction/{reactionId}',
      path: {
        'reactionId': reactionId,
      },
      errors: {
        400: `Bad request`,
        404: `Not found`,
      },
    });
  }
}
