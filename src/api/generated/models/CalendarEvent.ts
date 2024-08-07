/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type CalendarEvent = {
  id: string;
  calendarGroupId: string;
  courseId: string | null;
  title: string;
  description: string;
  category: string;
  academicYear: number | null;
  academicSemesterCode: 'Ganjil' | 'Genap' | null;
  start: string;
  end: string;
  googleCalendarUrl: string;
  googleCalendarId: string;
};

