/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Achievement } from '../models/Achievement';
import type { CreateAchievementRequest } from '../models/Achievement';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class AchievementService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    
    /**
   * Create new achievement
   * @param requestBody 
   * @returns Achievement
   * @throws ApiError
   */
  public createAchievement(requestBody: CreateAchievementRequest): CancelablePromise<Achievement> {
    return this.httpRequest.request({
        method: 'POST',
        url: '/api/achievements',
        body: requestBody,
        mediaType: 'application/json',
    });
  }

    /**
   * Get user achievements
   * @param userId 
   * @returns Achievement[]
   * @throws ApiError
   */
    public getUserAchievements(userId: number): CancelablePromise<Achievement[]> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/achievements',
            query: {
                user_id: userId,
            },
        });
    }
}