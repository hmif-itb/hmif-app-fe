/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type ReactionAggregate = {
  totalReactions: number;
  reactionsCount: Array<{
    reaction: string;
    count: number;
  }>;
  userReaction?: string;
};

