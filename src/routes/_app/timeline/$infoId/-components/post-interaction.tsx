import { IPost } from '../-interface/IPost';
import Reaction from './reaction';

const PostInteraction = ({
  reactionData,
  userReaction,
  commentsCount,
}: {
  reactionData: IPost['ReactionData'];
  userReaction: string | null;
  commentsCount: number;
}) => {
  return (
    <div className="flex items-center space-x-3 border-y border-gray-300 p-2">
      <Reaction
        reactionData={reactionData}
        initialUserReaction={userReaction}
      ></Reaction>
      <div className="flex space-x-1">
        <button>
          <img src="/icons/comment.svg" alt="comment" />
        </button>
        <p className="text-xl text-neutral-dark-hover">{commentsCount}</p>
      </div>
    </div>
  );
};

export default PostInteraction;
