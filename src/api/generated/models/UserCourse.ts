/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Course } from './Course';
export type UserCourse = {
  userId: string;
  courseId: string;
  class: number;
  semesterCodeTaken: 'Ganjil' | 'Genap';
  semesterYearTaken: number;
  courses?: Course;
};

