import Comment from './comment';

function PostComment() {
  return (
    <div className="space-y-4">
      <p className="text-base font-semibold">Comments</p>
      <Comment></Comment>
      <Comment></Comment>
      <Comment></Comment>
    </div>
  );
}

export default PostComment;
