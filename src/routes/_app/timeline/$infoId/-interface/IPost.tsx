import { IComment } from './IComment';
import { IProfile } from './IProfile';

export interface IPost {
  id: number;
  profile: IProfile;
  title: string;
  content: string;
  TagData: string[];
  image: string[];
  ReactionData: string[];
  UserReaction: string;
  comments: IComment[];
}
