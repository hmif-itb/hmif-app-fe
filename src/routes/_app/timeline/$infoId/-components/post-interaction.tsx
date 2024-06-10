import { useParams } from '@tanstack/react-router';
import { Info } from '~/api/generated';
import Reaction from './reaction';

const PostInteraction = ({
  reactions,
  commentsCount,
  isActive,
  toggleReaction,
}: {
  reactions: Info['reactions'];
  commentsCount: number;
  isActive: boolean;
  toggleReaction: () => void;
}) => {
  const infoId = useParams({ from: '/_app/timeline/$infoId/' }).infoId;
  return (
    <div className="flex items-center space-x-3 border-y border-gray-300 p-2">
      <Reaction
        reactions={reactions}
        isActive={isActive}
        toggleReaction={toggleReaction}
        infoId={infoId}
      />
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
