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
      calendarGroupId: string;
      courseId?: string | null;
      title: string;
      description?: string;
      category?: string;
      start: string | null;
      end: string | null;
    },
  }): CancelablePromise<CalendarEvent> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/api/calendar/event',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        400: `Bad request`,
      },
    });
  }
  /**
   * @returns CalendarEvent Get list of calendar events
   * @throws ApiError
   */
  public getCalendarEvent({
    search,
    category,
    courseCode,
    year,
    major,
  }: {
    search?: string,
    category?: string,
    courseCode?: string,
    year?: string,
    major?: 'IF' | 'STI' | 'OTHER',
  }): CancelablePromise<Array<CalendarEvent>> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/calendar/event',
      query: {
        'search': search,
        'category': category,
        'courseCode': courseCode,
        'year': year,
        'major': major,
      },
      errors: {
        400: `Bad request`,
      },
    });
  }
  /**
   * @returns CalendarEvent Get calendar event by id
   * @throws ApiError
   */
  public getCalendarEventById({
    eventId,
  }: {
    eventId: string,
  }): CancelablePromise<CalendarEvent> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/calendar/event/{eventId}',
      path: {
        'eventId': eventId,
      },
      errors: {
        400: `Bad request`,
        404: `Event doesn't exist`,
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
      courseId?: string | null;
      title?: string;
      description?: string;
      category?: string;
      academicYear?: number | null;
      academicSemesterCode?: 'Ganjil' | 'Genap' | null;
      start?: string | null;
      end?: string | null;
    },
  }): CancelablePromise<CalendarEvent> {
    return this.httpRequest.request({
      method: 'PUT',
      url: '/api/calendar/event/{eventId}',
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
      url: '/api/calendar/event/{eventId}',
      path: {
        'eventId': eventId,
      },
      errors: {
        400: `Bad request`,
      },
    });
  }
  /**
   * @returns any Get list of calendar groups
   * @throws ApiError
   */
  public getCalendarGroup(): CancelablePromise<Array<{
    id: string;
    name: string;
    category: 'akademik' | 'himpunan';
    googleCalendarUrl: string | null;
  }>> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/calendar/group',
      errors: {
        400: `Bad request`,
      },
    });
  }
  /**
   * @returns CalendarEvent Get personal calendar
   * @throws ApiError
   */
  public getPersonalCalendar({
    month = 8,
    year = 2024,
  }: {
    month?: number,
    year?: number,
  }): CancelablePromise<Array<CalendarEvent>> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/calendar/me',
      query: {
        'month': month,
        'year': year,
      },
      errors: {
        400: `Bad request`,
      },
    });
  }
}
