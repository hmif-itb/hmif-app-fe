/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CalendarEvent } from '../models/CalendarEvent';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class CalendarService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}
  /**
   * @returns CalendarEvent Event succesfully created
   * @throws ApiError
   */
  public postCalendarEvent({
    requestBody,
  }: {
    requestBody?: {
      title: string;
      description?: string;
      start: string | null;
      end: string | null;
    },
  }): CancelablePromise<CalendarEvent> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/api/calendar',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        400: `Bad request`,
      },
    });
  }
  /**
   * @returns CalendarEvent Get list of categories
   * @throws ApiError
   */
  public getCalendarEvent({
    search,
    startTime,
    endTime,
  }: {
    search?: string,
    startTime?: string | null,
    endTime?: string | null,
  }): CancelablePromise<Array<CalendarEvent>> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/calendar',
      query: {
        'search': search,
        'startTime': startTime,
        'endTime': endTime,
      },
      errors: {
        400: `Bad request`,
      },
    });
  }
  /**
   * @returns CalendarEvent Get event by id
   * @throws ApiError
   */
  public getCalendarEventById({
    eventId,
  }: {
    eventId: string,
  }): CancelablePromise<CalendarEvent> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/calendar/{eventId}',
      path: {
        'eventId': eventId,
      },
      errors: {
        400: `Bad request`,
      },
    });
  }
  /**
   * @returns CalendarEvent Event succesfully updated
   * @throws ApiError
   */
  public updateCalendarEvent({
    eventId,
    requestBody,
  }: {
    eventId: string,
    requestBody?: {
      title?: string;
      description?: string;
      start?: string | null;
      end?: string | null;
    },
  }): CancelablePromise<CalendarEvent> {
    return this.httpRequest.request({
      method: 'PUT',
      url: '/api/calendar/{eventId}',
      path: {
        'eventId': eventId,
      },
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        400: `Bad request`,
      },
    });
  }
  /**
   * @returns void
   * @throws ApiError
   */
  public deleteCalendarEvent({
    eventId,
  }: {
    eventId: string,
  }): CancelablePromise<void> {
    return this.httpRequest.request({
      method: 'DELETE',
      url: '/api/calendar/{eventId}',
      path: {
        'eventId': eventId,
      },
      errors: {
        400: `Bad request`,
      },
    });
  }
}
