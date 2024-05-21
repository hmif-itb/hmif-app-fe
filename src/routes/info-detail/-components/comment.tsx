import { formatDate } from '~/utils/format-date';
import { IComment } from '../-interface/IComment';
import ProfilePost from './profile-post';
import Reaction from './reaction';

const Comment = ({ commentData }: { commentData: IComment }) => {
  return (
    <div className="flex-row space-y-3">
      <ProfilePost
        type={'commenter'}
        profile={commentData.ProfileData}
      ></ProfilePost>
      <p>{commentData.comment}</p>
      <div className="flex items-center space-x-1">
        <Reaction
          reactionData={commentData.ReactionData}
          initialUserReaction={commentData.UserReaction}
        ></Reaction>
        <div className="text-xs font-semibold text-gray-400">
          {formatDate(commentData.datetime)}
        </div>
      </div>
    </div>
  );
};

export default Comment;
