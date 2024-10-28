/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type ChatroomMessage = {
  id: string;
  chatroomId: string;
  replyId: string | null;
  content: string;
  createdAt: string;
  isSender?: boolean;
  reply?: {
    id: string;
    chatroomId: string;
    userId: string;
    replyId: string | null;
    content: string;
    createdAt: string;
  };
};

