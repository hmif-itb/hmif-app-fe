import { useParams } from '@tanstack/react-router';
import { CommentWithReactions } from '~/api/generated';
import { formatDate } from '~/utils/format-date';
import InfoCreator from '../../-components/info-creator';
import Reaction from './reaction';

const Comments = ({
  comments,
  activeReaction,
  toggleReaction,
}: {
  comments: CommentWithReactions[];
  activeReaction: string | null;
  toggleReaction: (key: string) => void;
}) => {
  const infoId = useParams({ from: '/_app/timeline/$infoId/' }).infoId;
  return (
    <div className="space-y-4">
      <p className="text-base font-semibold">Comments</p>
      {comments.map((comment, index) => (
        <CommentComponent
          key={index}
          commentData={comment}
          isActive={activeReaction === `comment-${index}`}
          toggleReaction={() => toggleReaction(`comment-${index}`)}
          infoId={infoId}
        />
      ))}
    </div>
  );
};

const CommentComponent = ({
  commentData,
  isActive,
  toggleReaction,
  infoId,
}: {
  commentData: CommentWithReactions;
  isActive: boolean;
  toggleReaction: () => void;
  infoId: string;
}) => {
  return (
    <div className="flex-row space-y-3">
      <InfoCreator creator={commentData.creator} isComment />
      <p>{commentData.content}</p>
      <div className="flex items-center space-x-1">
        {/* wait for reactions backend */}
        <Reaction
          reactions={commentData.reactions}
          // initialUserReaction={commentData.UserReaction}
          isActive={isActive}
          toggleReaction={toggleReaction}
          infoId={infoId}
          commentId={commentData.id}
        />
        <div className="text-xs font-semibold text-gray-400">
          {formatDate(commentData.createdAt)}
        </div>
      </div>
    </div>
  );
};

export default Comments;
