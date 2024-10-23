/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Course } from '../models/Course';
import type { UserCourse } from '../models/UserCourse';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class CourseService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}
  /**
   * @returns UserCourse Course added to user courses
   * @throws ApiError
   */
  public createUserCourse({
    requestBody,
  }: {
    requestBody: {
      courseId: string;
      class: number;
    },
  }): CancelablePromise<UserCourse> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/api/course/take',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        400: `Bad request`,
        404: `Course not found`,
      },
    });
  }
  /**
   * @returns UserCourse Get user courses
   * @throws ApiError
   */
  public getUserCourse(): CancelablePromise<Array<UserCourse>> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/course/take',
      errors: {
        400: `Bad request`,
      },
    });
  }
  /**
   * @returns UserCourse Get user current course
   * @throws ApiError
   */
  public getCurrentUserCourse(): CancelablePromise<Array<UserCourse>> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/course/take/current',
      errors: {
        400: `Bad request`,
      },
    });
  }
  /**
   * @returns UserCourse Deleted user batch course
   * @throws ApiError
   */
  public deleteUserCourse({
    requestBody,
  }: {
    requestBody?: {
      courseIds: (Array<string> | string);
    },
  }): CancelablePromise<Array<UserCourse>> {
    return this.httpRequest.request({
      method: 'DELETE',
      url: '/api/course/take/batch',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        400: `Bad request`,
        404: `User course not found`,
      },
    });
  }
  /**
   * @returns UserCourse Courses added to user courses
   * @throws ApiError
   */
  public createOrUpdateBatchUserCourse({
    requestBody,
  }: {
    requestBody: Array<{
      courseId: string;
      class: number;
    }>,
  }): CancelablePromise<Array<UserCourse>> {
    return this.httpRequest.request({
      method: 'PUT',
      url: '/api/course/take/batch',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        400: `Bad request`,
        404: `Error`,
      },
    });
  }
  /**
   * @returns any Get list of courses
   * @throws ApiError
   */
  public getlistCourses({
    curriculumYear,
    major,
    semester,
    type,
    credits,
    search,
  }: {
    curriculumYear?: number | null,
    major?: 'IF' | 'STI' | 'OTHER',
    semester?: number | null,
    type?: 'Mandatory' | 'Elective',
    credits?: number | null,
    search?: string,
  }): CancelablePromise<{
    courses: Array<Course>;
  }> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/course',
      query: {
        'curriculumYear': curriculumYear,
        'major': major,
        'semester': semester,
        'type': type,
        'credits': credits,
        'search': search,
      },
      errors: {
        400: `Bad request`,
      },
    });
  }
  /**
   * @returns Course Created course
   * @throws ApiError
   */
  public createCourse({
    requestBody,
  }: {
    requestBody: {
      curriculumYear: number;
      major: 'IF' | 'STI' | 'OTHER';
      type?: 'Mandatory' | 'Elective';
      semester?: number | null;
      code: string;
      name: string;
      credits?: number | null;
      dingdongUrl?: string | null;
      isActive?: boolean;
    },
  }): CancelablePromise<Course> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/api/course',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        400: `Bad request`,
      },
    });
  }
  /**
   * @returns Course Get list of courses
   * @throws ApiError
   */
  public getCourseById({
    courseId,
  }: {
    courseId: string,
  }): CancelablePromise<Course> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/course/{courseId}',
      path: {
        'courseId': courseId,
      },
      errors: {
        400: `Bad request`,
        404: `Course not found`,
      },
    });
  }
  /**
   * @returns Course Updated course
   * @throws ApiError
   */
  public updateCourse({
    courseId,
    requestBody,
  }: {
    courseId: string,
    requestBody?: {
      curriculumYear?: number;
      major?: 'IF' | 'STI' | 'OTHER';
      type?: 'Mandatory' | 'Elective';
      semester?: number | null;
      code?: string;
      name?: string;
      credits?: number | null;
      dingdongUrl?: string | null;
      isActive?: boolean;
    },
  }): CancelablePromise<Course> {
    return this.httpRequest.request({
      method: 'PUT',
      url: '/api/course/{courseId}',
      path: {
        'courseId': courseId,
      },
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        400: `Bad request`,
        404: `Course not found`,
      },
    });
  }
  /**
   * @returns Course Deleted course
   * @throws ApiError
   */
  public deleteCourse({
    courseId,
  }: {
    courseId: string,
  }): CancelablePromise<Course> {
    return this.httpRequest.request({
      method: 'DELETE',
      url: '/api/course/{courseId}',
      path: {
        'courseId': courseId,
      },
      errors: {
        400: `Bad request`,
        404: `Course not found`,
      },
    });
  }
}
