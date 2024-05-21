import { IProfile } from './IProfile';

export interface IComment {
  ProfileData: IProfile;
  comment: string;
  datetime: string;
  ReactionData: string[];
  UserReaction?: string | null;
}
