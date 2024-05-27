import { Comment } from '~/api/generated';
import { formatDate } from '~/utils/format-date';
import ProfilePost from './profile-post';

const PostComment = ({
  comments,
  activeReaction,
  toggleReaction,
}: {
  comments: Comment[];
  activeReaction: string | null;
  toggleReaction: (key: string) => void;
}) => {
  return (
    <div className="space-y-4">
      <p className="text-base font-semibold">Comments</p>
      {comments.map((comment, index) => (
        <CommentComponent
          key={index}
          commentData={comment}
          isActive={activeReaction === `comment-${index}`}
          toggleReaction={() => toggleReaction(`comment-${index}`)}
        ></CommentComponent>
      ))}
    </div>
  );
};

const CommentComponent = ({
  commentData,
  isActive,
  toggleReaction,
}: {
  commentData: Comment;
  isActive: boolean;
  toggleReaction: () => void;
}) => {
  return (
    <div className="flex-row space-y-3">
      <ProfilePost
        type={'commenter'}
        profile={commentData.creator}
      ></ProfilePost>
      <p>{commentData.content}</p>
      <div className="flex items-center space-x-1">
        {/* wait for reactions backend */}
        {/* <Reaction
          reactionData={commentData.ReactionData}
          initialUserReaction={commentData.UserReaction}
          isActive={isActive}
          toggleReaction={toggleReaction}
        ></Reaction> */}
        <div className="text-xs font-semibold text-gray-400">
          {formatDate(commentData.createdAt)}
        </div>
      </div>
    </div>
  );
};

export default PostComment;
