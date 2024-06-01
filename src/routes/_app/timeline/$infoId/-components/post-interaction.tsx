import { Info } from '~/api/generated';
import Reaction from './reaction';

const PostInteraction = ({
  reactions,
  userReaction,
  commentsCount,
  isActive,
  toggleReaction,
}: {
  reactions: Info['reactions'];
  userReaction: string | null;
  commentsCount: number;
  isActive: boolean;
  toggleReaction: () => void;
}) => {
  return (
    <div className="flex items-center space-x-3 border-y border-gray-300 p-2">
      <Reaction
        reactions={reactions}
        initialUserReaction={userReaction}
        isActive={isActive}
        toggleReaction={toggleReaction}
      ></Reaction>
      <div className="flex space-x-1">
        <button>
          <img src="/img/icons/comment.svg" alt="comment" />
        </button>
        <p className="text-xl text-neutral-dark-hover">{commentsCount}</p>
      </div>
    </div>
  );
};

export default PostInteraction;
