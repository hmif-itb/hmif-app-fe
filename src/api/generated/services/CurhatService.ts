/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Chatroom } from '../models/Chatroom';
import type { ListChatroom } from '../models/ListChatroom';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class CurhatService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}

  /**
   * Create new chatroom
   * @returns Chatroom Chatroom created
   * @throws ApiError
   */
  public createChatroom(): CancelablePromise<Chatroom> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/api/curhat/chatroom',
      errors: {
        400: `Bad request`,
      },
    });
  }

  /**
   * Get user chatrooms
   * @returns ListChatroom Get user chatrooms
   * @throws ApiError
   */
  public getUserChatrooms(): CancelablePromise<ListChatroom> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/curhat/chatrooms',
      errors: {
        400: `Bad request`,
      },
    });
  }

  /**
   * @returns any Chatroom deleted
   * @throws ApiError
   */
  public deleteChatroom({
    chatroomId,
  }: {
    /**
     * Id of chatroom
     */
    chatroomId: string;
  }): CancelablePromise<any> {
    return this.httpRequest.request({
      method: 'DELETE',
      url: '/api/curhat/chatroom/{chatroomId}',
      path: {
        chatroomId: chatroomId,
      },
      errors: {
        400: `Bad request`,
        404: `Id not found`,
      },
    });
  }

  /**
   * Get unread chatroom messages count
   * @returns any Get unread chatroom messages count success
   * @throws ApiError
   */
  public unreadCountChatroomMessages({
    chatroomId,
  }: {
    /**
     * Id of chatroom
     */
    chatroomId: string,
  }): CancelablePromise<Array<{
    chatroomId: string;
    unreadCount: number;
  }>> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/curhat/chatrooms/unread',
      path: {
        'chatroomId': chatroomId,
      },
      errors: {
        401: `Unauthorized`,
        500: `Internal Server Error`,
      },
    });
  }
  /**
   * Pin/unpin chatroom
   * @returns any Pin/unpin success
   * @throws ApiError
   */
  public pinChatroom({
    chatroomId,
    requestBody,
  }: {
    /**
     * Id of chatroom
     */
    chatroomId: string;
    requestBody: {
      isPinned: boolean;
    };
  }): CancelablePromise<any> {
    return this.httpRequest.request({
      method: 'PUT',
      url: '/api/curhat/chatroom/{chatroomId}/pin',
      path: {
        chatroomId: chatroomId,
      },
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        400: `Bad request`,
      },
    });
  }
}
