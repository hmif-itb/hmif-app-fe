/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { User } from '../models/User';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class AuthService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}
  /**
   * @returns void
   * @throws ApiError
   */
  public loginWeb(): CancelablePromise<void> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/login',
      errors: {
        302: `Redirect to Google login`,
      },
    });
  }
  /**
   * Login with access token
   * @returns User Login succesful
   * @throws ApiError
   */
  public loginAccessToken({
    requestBody,
  }: {
    requestBody?: {
      accessToken: string;
    },
  }): CancelablePromise<User> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/api/auth/login/accesstoken',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        400: `Bad request: validation error`,
        401: `Bad request: authorization (not logged in) error`,
      },
    });
  }
  /**
   * @returns User Login succesful
   * @throws ApiError
   */
  public loginCallback({
    code,
  }: {
    code: string,
  }): CancelablePromise<User> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/auth/google/callback',
      query: {
        'code': code,
      },
      errors: {
        400: `Bad request: validation error`,
        401: `Bad request: authorization (not logged in) error`,
        500: `Bad request`,
      },
    });
  }
  /**
   * @returns User Login bypass successful
   * @throws ApiError
   */
  public loginBypass({
    token,
  }: {
    token: string,
  }): CancelablePromise<User> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/auth/login/bypass/{token}',
      path: {
        'token': token,
      },
      errors: {
        400: `Bad request`,
      },
    });
  }
  /**
   * @returns any Logout successful
   * @throws ApiError
   */
  public logout(): CancelablePromise<any> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/api/logout',
      errors: {
        401: `Bad request: authorization (not logged in) error`,
        500: `Bad request`,
      },
    });
  }
  /**
   * @returns User Login succesful
   * @throws ApiError
   */
  public getMe(): CancelablePromise<User> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/me',
      errors: {
        401: `Bad request: authorization (not logged in) error`,
        500: `Bad request`,
      },
    });
  }
}
