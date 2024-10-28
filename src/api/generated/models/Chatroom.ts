/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ChatroomLabelManyToMany } from './ChatroomLabelManyToMany';
import type { ChatroomMessage } from './ChatroomMessage';
export type Chatroom = {
  id: string;
  title: string | null;
  messages?: Array<ChatroomMessage>;
  labels?: Array<ChatroomLabelManyToMany>;
  isPinned?: boolean;
  canDelete?: boolean;
};

