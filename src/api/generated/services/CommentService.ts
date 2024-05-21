/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Comment } from '../models/Comment';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class CommentService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}
  /**
   * @returns any Fetched list of comments
   * @throws ApiError
   */
  public getCommentsList({
    infoId,
    sort = 'newest',
  }: {
    /**
     * Id info of fetched comments
     */
    infoId: string,
    /**
     * Sort info comments
     */
    sort?: 'popular' | 'oldest' | 'newest',
  }): CancelablePromise<{
    comment: Array<Comment>;
  }> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/comments',
      query: {
        'infoId': infoId,
        'sort': sort,
      },
      errors: {
        400: `Bad request: validation error`,
      },
    });
  }
  /**
   * @returns Comment Fetched comment by id
   * @throws ApiError
   */
  public getCommentsById({
    commentId,
  }: {
    /**
     * Id of fetched comment
     */
    commentId: string,
  }): CancelablePromise<Comment> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/comment/{commentId}',
      path: {
        'commentId': commentId,
      },
      errors: {
        400: `Bad request: validation error`,
        404: `Comment not found`,
      },
    });
  }
  /**
   * @returns Comment Successfully deleted comment
   * @throws ApiError
   */
  public deleteComment({
    commentId,
  }: {
    /**
     * Id of fetched comment
     */
    commentId: string,
  }): CancelablePromise<Comment> {
    return this.httpRequest.request({
      method: 'DELETE',
      url: '/api/comment/{commentId}',
      path: {
        'commentId': commentId,
      },
      errors: {
        400: `Bad request`,
        500: `Internal server error`,
      },
    });
  }
  /**
   * @returns Comment Updated comment content
   * @throws ApiError
   */
  public updateCommentContent({
    commentId,
    requestBody,
  }: {
    /**
     * Id of fetched comment
     */
    commentId: string,
    requestBody: {
      content: string;
    },
  }): CancelablePromise<Comment> {
    return this.httpRequest.request({
      method: 'PUT',
      url: '/api/comment/{commentId}',
      path: {
        'commentId': commentId,
      },
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        400: `Bad request`,
        404: `Comment not found`,
      },
    });
  }
  /**
   * post a comment
   * @returns Comment Comment posted succesfuly
   * @throws ApiError
   */
  public postComment({
    requestBody,
  }: {
    requestBody: {
      repliedInfoId: string;
      content: string;
    },
  }): CancelablePromise<Comment> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/api/comment',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        400: `Bad request: validation error`,
        500: `Internal server error`,
      },
    });
  }
}
