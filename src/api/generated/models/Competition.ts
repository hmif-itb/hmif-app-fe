/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CompetitionCategories } from './CompetitionCategories';
export type Competition = {
  id: string;
  name: string;
  organizer: string;
  registrationStart: string;
  registrationDeadline: string;
  price: string | null;
  sourceUrl: string;
  registrationUrl: string;
  categories: CompetitionCategories;
  createdAt: string;
  medias?: Array<{
    competitionId: string;
    mediaId: string;
    order: number;
    media: {
      id: string;
      creatorId: string;
      name: string;
      type: string;
      url: string;
      createdAt: string;
    };
  }>;
};

