/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
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
   * @returns any Login succesful
   * @throws ApiError
   */
  public loginCallback({
    code,
  }: {
    code: string,
  }): CancelablePromise<{
    id: string;
    nim: string;
    email: string;
    fullName: string | null;
    major: 'IF' | 'STI';
    region: 'Ganesha' | 'Jatinangor';
    angkatan: number | null;
    gender: 'F' | 'M' | null;
    membershipStatus: string | null;
    picture: string;
  }> {
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
   * @returns any Login succesful
   * @throws ApiError
   */
  public getMe(): CancelablePromise<{
    id: string;
    nim: string;
    email: string;
    fullName: string | null;
    major: 'IF' | 'STI';
    region: 'Ganesha' | 'Jatinangor';
    angkatan: number | null;
    gender: 'F' | 'M' | null;
    membershipStatus: string | null;
    picture: string;
  }> {
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
