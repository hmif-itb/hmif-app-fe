import { IComment } from '../-interface/IComment';
import Comment from './comment';

const PostComment = ({ comments }: { comments: IComment[] }) => {
  return (
    <div className="space-y-4">
      <p className="text-base font-semibold">Comments</p>
      {/* <Comment></Comment> */}
      {comments.map((comment, index) => (
        <Comment key={index} commentData={comment}></Comment>
      ))}
    </div>
  );
};

export default PostComment;
