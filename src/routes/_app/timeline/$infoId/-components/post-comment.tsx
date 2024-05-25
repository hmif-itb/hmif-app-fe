import { IComment } from '../-interface/IComment';
import Comment from './comment';

const PostComment = ({
  comments,
  activeReaction,
  toggleReaction,
}: {
  comments: IComment[];
  activeReaction: string | null;
  toggleReaction: (key: string) => void;
}) => {
  return (
    <div className="space-y-4">
      <p className="text-base font-semibold">Comments</p>
      {comments.map((comment, index) => (
        <Comment
          key={index}
          commentData={comment}
          isActive={activeReaction === `comment-${index}`}
          toggleReaction={() => toggleReaction(`comment-${index}`)}
        ></Comment>
      ))}
    </div>
  );
};

export default PostComment;
