import { useNavigate } from '@tanstack/react-router';
import { Info } from '~/api/generated';
import Reaction from './reaction';

const PostInteraction = ({
  reactions,
  commentsCount,
  isActive,
  toggleReaction,
  infoId,
  isDetail,
}: {
  reactions: Info['reactions'];
  commentsCount: number;
  isActive: boolean;
  toggleReaction: () => void;
  infoId: string;
  isDetail?: boolean;
}) => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center space-x-3 border-t border-[#EBEEEB] px-4 py-3">
      <Reaction
        reactions={reactions}
        isActive={isActive}
        toggleReaction={toggleReaction}
        infoId={infoId}
      />
      <div className="flex space-x-1">
        <button
          onClick={() => {
            if (!isDetail) {
              navigate({ to: `/timeline/$infoId`, params: { infoId } });
            }
          }}
        >
          <img src="/img/icons/comment.svg" alt="comment" />
        </button>
        <p className="text-xl text-neutral-dark-hover">{commentsCount}</p>
      </div>
    </div>
  );
};

export default PostInteraction;
