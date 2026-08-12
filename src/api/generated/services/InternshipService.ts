/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { InternshipAnswer } from '../models/InternshipAnswer';
import type { InternshipDepartment } from '../models/InternshipDepartment';
import type { InternshipDivision } from '../models/InternshipDivision';
import type { InternshipKesibukan } from '../models/InternshipKesibukan';
import type { InternshipQuestion } from '../models/InternshipQuestion';
import type { InternshipSubmission } from '../models/InternshipSubmission';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class InternshipService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}
  /**
   * @returns any List of internship departments with divisions
   * @throws ApiError
   */
  public getInternshipDepartments(): CancelablePromise<{
    departments: Array<InternshipDepartment>;
  }> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/internship/departments',
      errors: {
        401: `Error`,
      },
    });
  }
  /**
   * @returns InternshipDepartment Created department
   * @throws ApiError
   */
  public createInternshipDepartment({
    requestBody,
  }: {
    requestBody?: {
      name: string;
      order?: number;
    },
  }): CancelablePromise<InternshipDepartment> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/api/internship/departments',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        400: `Bad request`,
      },
    });
  }
  /**
   * @returns InternshipDepartment Updated department
   * @throws ApiError
   */
  public updateInternshipDepartment({
    id,
    requestBody,
  }: {
    id: string,
    requestBody?: {
      name?: string;
      order?: number;
    },
  }): CancelablePromise<InternshipDepartment> {
    return this.httpRequest.request({
      method: 'PUT',
      url: '/api/internship/departments/{id}',
      path: {
        'id': id,
      },
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        404: `Error`,
      },
    });
  }
  /**
   * @returns InternshipDepartment Deleted department
   * @throws ApiError
   */
  public deleteInternshipDepartment({
    id,
  }: {
    id: string,
  }): CancelablePromise<InternshipDepartment> {
    return this.httpRequest.request({
      method: 'DELETE',
      url: '/api/internship/departments/{id}',
      path: {
        'id': id,
      },
      errors: {
        404: `Error`,
      },
    });
  }
  /**
   * @returns InternshipDivision Created division
   * @throws ApiError
   */
  public createInternshipDivision({
    requestBody,
  }: {
    requestBody?: {
      departmentId: string;
      name: string;
      quotaMin?: number | null;
      quotaIdeal?: number | null;
      quotaMax?: number | null;
      questions?: Array<InternshipQuestion>;
      questionsRaw?: string | null;
      order?: number;
    },
  }): CancelablePromise<InternshipDivision> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/api/internship/divisions',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        400: `Bad request`,
      },
    });
  }
  /**
   * @returns InternshipDivision Updated division
   * @throws ApiError
   */
  public updateInternshipDivision({
    id,
    requestBody,
  }: {
    id: string,
    requestBody?: {
      departmentId?: string;
      name?: string;
      quotaMin?: number | null;
      quotaIdeal?: number | null;
      quotaMax?: number | null;
      questions?: Array<InternshipQuestion>;
      questionsRaw?: string | null;
      order?: number;
    },
  }): CancelablePromise<InternshipDivision> {
    return this.httpRequest.request({
      method: 'PUT',
      url: '/api/internship/divisions/{id}',
      path: {
        'id': id,
      },
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        404: `Error`,
      },
    });
  }
  /**
   * @returns InternshipDivision Deleted division
   * @throws ApiError
   */
  public deleteInternshipDivision({
    id,
  }: {
    id: string,
  }): CancelablePromise<InternshipDivision> {
    return this.httpRequest.request({
      method: 'DELETE',
      url: '/api/internship/divisions/{id}',
      path: {
        'id': id,
      },
      errors: {
        404: `Error`,
      },
    });
  }
  /**
   * @returns any My submission (null if not yet created)
   * @throws ApiError
   */
  public getMyInternshipSubmission(): CancelablePromise<InternshipSubmission | null> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/internship/submission',
      errors: {
        401: `Error`,
      },
    });
  }
  /**
   * @returns InternshipSubmission Saved submission draft
   * @throws ApiError
   */
  public upsertMyInternshipSubmission({
    requestBody,
  }: {
    requestBody?: {
      kelas: string;
      idLine: string;
      pengalamanOrganisasi?: string;
      kesibukan: Array<InternshipKesibukan>;
      choices: Array<{
        divisionId: string;
        priorityOrder: number;
        answers: Array<InternshipAnswer>;
      }>;
    },
  }): CancelablePromise<InternshipSubmission> {
    return this.httpRequest.request({
      method: 'PUT',
      url: '/api/internship/submission',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        400: `Bad request`,
        401: `Error`,
        409: `Submission already locked/finalized`,
      },
    });
  }
  /**
   * @returns InternshipSubmission Final submitted & locked submission
   * @throws ApiError
   */
  public submitMyInternshipSubmission({
    requestBody,
  }: {
    requestBody?: {
      kelas: string;
      idLine: string;
      pengalamanOrganisasi?: string;
      kesibukan: Array<InternshipKesibukan>;
      choices: Array<{
        divisionId: string;
        priorityOrder: number;
        answers: Array<InternshipAnswer>;
      }>;
    },
  }): CancelablePromise<InternshipSubmission> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/api/internship/submission/submit',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        400: `Bad request`,
        401: `Error`,
        409: `Submission already locked/finalized`,
      },
    });
  }
  /**
   * @returns any List of submissions (admin only)
   * @throws ApiError
   */
  public listInternshipSubmissions({
    divisionId,
    locked,
    offset,
  }: {
    /**
     * Filter by division id
     */
    divisionId?: string,
    /**
     * Filter by lock status
     */
    locked?: 'true' | 'false',
    offset?: number,
  }): CancelablePromise<{
    submissions: Array<InternshipSubmission>;
  }> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/internship/submissions',
      query: {
        'divisionId': divisionId,
        'locked': locked,
        'offset': offset,
      },
      errors: {
        400: `Bad request`,
        401: `Error`,
      },
    });
  }
  /**
   * @returns InternshipSubmission Submission detail (admin only)
   * @throws ApiError
   */
  public getInternshipSubmissionById({
    id,
  }: {
    id: string,
  }): CancelablePromise<InternshipSubmission> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/internship/submissions/{id}',
      path: {
        'id': id,
      },
      errors: {
        401: `Error`,
        404: `Error`,
      },
    });
  }
}
