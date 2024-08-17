/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Course } from './Course';
import type { ReactionAggregate } from './ReactionAggregate';
import type { User } from './User';
export type Info = {
  id: string;
  creatorId: string;
  title: string;
  content: string;
  createdAt: string;
  infoMedias?: Array<{
    infoId: string;
    mediaId: string;
    media: {
      id: string;
      creatorId: string;
      name: string;
      type: string;
      url: string;
      createdAt: string;
    };
  }>;
  infoCategories?: Array<{
    infoId: string;
    categoryId: string;
    category: {
      id: string;
      name: string;
      requiredPush: boolean;
    };
  }>;
  infoCourses?: Array<{
    infoId: string;
    courseId: string;
    class: number | null;
    course: Course;
  }>;
  infoAngkatan?: Array<{
    infoId: string;
    angkatanId: string;
    angkatan: {
      id: string;
      year: number;
      name: string;
    };
  }>;
  comments: number;
  reactions: ReactionAggregate;
  creator: User;
};

