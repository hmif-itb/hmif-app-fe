/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type Course = {
  id: string;
  curriculumYear: number;
  major: 'IF' | 'STI' | 'OTHER';
  type: 'Mandatory' | 'Elective';
  semester: number;
  semesterCode: 'Ganjil' | 'Genap';
  code: string;
  name: string;
  credits: number;
};

