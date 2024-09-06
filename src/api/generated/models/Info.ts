/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Angkatan } from './Angkatan';
import type { Category } from './Category';
import type { Course } from './Course';
import type { ReactionAggregate } from './ReactionAggregate';
import type { User } from './User';
import type { UserGroup } from './UserGroup';
export type Info = {
  id: string;
  creatorId: string;
  title: string;
  content: string;
  createdAt: string;
  infoMedias?: Array<{
    infoId: string;
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
  infoCategories?: Array<{
    infoId: string;
    categoryId: string;
    category: Category;
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
    angkatan: Angkatan;
  }>;
  infoGroups?: Array<UserGroup>;
  comments: number;
  reactions: ReactionAggregate;
  creator: User;
  isRead?: boolean;
};

