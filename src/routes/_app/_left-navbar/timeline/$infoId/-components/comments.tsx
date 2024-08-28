import { useParams } from '@tanstack/react-router';
import { CommentWithReactions } from '~/api/generated';
import UserInfo from '~/components/user/user-info';
import { formatDate } from '~/utils/format-date';
import Reaction from './reaction';
import CardPopover from '../../-components/CardPopover';
import useSession from '~/hooks/auth/useSession';
import { useMutation } from '@tanstack/react-query';
import { api, queryClient } from '~/api/client';
import toast from 'react-hot-toast';

const TOAST_ID = 'delete-comment-toast';

const Comments = ({
  comments,
  activeReaction,
  toggleReaction,
}: {
  comments: CommentWithReactions[];
  activeReaction: string | null;
  toggleReaction: (key: string) => void;
}) => {
  const infoId = useParams({
    from: '/_app/_left-navbar/timeline/$infoId/',
  }).infoId;
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
  const user = useSession();

  const deleteComment = useMutation({
    mutationFn: api.comment.deleteComment.bind(api.comment),
    onMutate: () => toast.loading('Deleting comment...', { id: TOAST_ID }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['info', 'comments', infoId] });
      toast.success('Comment deleted', { id: TOAST_ID });
    },
    onError: () => toast.error('Failed to delete comment', { id: TOAST_ID }),
  });

  return (
    <div className="flex-row space-y-3">
      <div className="flex items-start justify-between gap-2">
        <UserInfo
          name={commentData.creator.fullName}
          email={commentData.creator.email}
          imageURL={commentData.creator.picture}
          avatarClassName="size-9"
        />

        {commentData.creatorId === user.id && (
          <CardPopover
            showDelete
            onDelete={
              commentData.creatorId === user.id
                ? () => deleteComment.mutate({ commentId: commentData.id })
                : undefined
            }
          />
        )}
      </div>
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
