import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { api } from '~/api/client';
import { INFO_LIST_QUERY_KEY, INFO_QUERY_KEY } from '~/api/constants';
import { Info } from '~/api/generated';
import { Button } from '~/components/ui/button';
import { cn } from '~/lib/utils';
import { emojiImages } from '../-constants/emoji';

const Reaction = ({
  reactions: reactions,
  isActive,
  toggleReaction,
  infoId: infoId,
  commentId,
}: {
  reactions: Info['reactions'];
  isActive: boolean;
  toggleReaction: () => void;
  infoId: string;
  commentId?: string;
}) => {
  const [userReaction, setUserReaction] = useState(
    reactions?.userReaction ?? null,
  );
  const queryClient = useQueryClient();
  const reactMutation = useMutation({
    mutationFn: (reaction: string) => {
      return api.reaction.createOrUpdateReaction({
        requestBody: {
          reaction,
          commentId: commentId ? commentId : undefined,
          infoId: commentId ? undefined : infoId,
        },
      });
    },
    onSuccess() {
      if (commentId) {
        queryClient.invalidateQueries({
          queryKey: [INFO_QUERY_KEY, 'comments', infoId],
        });
      } else {
        queryClient.invalidateQueries({
          queryKey: [INFO_QUERY_KEY, 'detail', infoId],
        });
        queryClient.invalidateQueries({ queryKey: [INFO_LIST_QUERY_KEY] });
      }
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => {
      if (commentId) {
        return api.reaction.deleteCommentReaction({ commentId });
      } else {
        return api.reaction.deleteInfoReaction({ infoId });
      }
    },
    onSuccess() {
      if (commentId) {
        queryClient.invalidateQueries({
          queryKey: [INFO_QUERY_KEY, 'comments', infoId],
        });
      } else {
        queryClient.invalidateQueries({
          queryKey: [INFO_QUERY_KEY, 'detail', infoId],
        });
        queryClient.invalidateQueries({ queryKey: [INFO_LIST_QUERY_KEY] });
      }
    },
  });

  const handleReaction = (reaction: string) => {
    setUserReaction(userReaction === reaction ? null : reaction);
    if (userReaction === reaction) {
      deleteMutation.mutate();
      return;
    } else {
      reactMutation.mutate(reaction);
    }
    toggleReaction();
  };

  return (
    <div className="relative ml-0 mr-1 flex items-center space-x-3">
      <Button
        variant={'link'}
        onClick={toggleReaction}
        className="relative z-10 p-0"
      >
        <img
          src={
            userReaction ? '/img/icons/like-active.svg' : '/img/icons/like.svg'
          }
          alt="like"
        />
      </Button>
      {isActive && (
        <div className="absolute left-0 w-max -translate-y-full flex-row space-x-1">
          <button
            onClick={() => handleReaction('grin')}
            className={cn(
              userReaction === 'grin' && 'size-10',
              userReaction !== 'grin' && 'size-8',
              'm-0 p-0',
            )}
          >
            <img
              src="/img/icons/emojiGrin.svg"
              alt="grin"
              className="m-0 size-full p-0"
            />
          </button>
          <button
            onClick={() => handleReaction('heart-eyes')}
            className={cn(
              userReaction === 'heart-eyes' && 'size-10',
              userReaction !== 'heart-eyes' && 'size-8',
              'm-0 p-0',
            )}
          >
            <img
              src="/img/icons/emojiHeartEyes.svg"
              alt="heart-eyes"
              className="m-0 size-full p-0"
            />
          </button>
          <button
            onClick={() => handleReaction('fire')}
            className={cn(
              userReaction === 'fire' && 'size-10',
              userReaction !== 'fire' && 'size-8',
              'm-0 p-0',
            )}
          >
            <img
              src="/img/icons/emojiFire.svg"
              alt="fire"
              className="m-0 size-full p-0"
            />
          </button>
          <button
            onClick={() => handleReaction('cry')}
            className={cn(
              userReaction === 'cry' && 'size-10',
              userReaction !== 'cry' && 'size-8',
              'm-0 p-0',
            )}
          >
            <img
              src="/img/icons/emojiCry.svg"
              alt="cry"
              className="m-0 size-full p-0"
            />
          </button>
          <button
            onClick={() => handleReaction('screaming')}
            className={cn(
              userReaction === 'screaming' && 'size-10',
              userReaction !== 'screaming' && 'size-8',
              'm-0 p-0',
            )}
          >
            <img
              src="/img/icons/emojiScreaming.svg"
              alt="screaming"
              className="m-0 size-full p-0"
            />
          </button>
          <button
            onClick={() => handleReaction('party')}
            className={cn(
              userReaction === 'party' && 'size-10',
              userReaction !== 'party' && 'size-8',
              'm-0 p-0',
            )}
          >
            <img
              src="/img/icons/emojiParty.svg"
              alt="party"
              className="m-0 size-full p-0"
            />
          </button>
        </div>
      )}
      {reactions && reactions.totalReactions > 0 && (
        <div className="flex items-center">
          {reactions.reactionsCount?.map((reaction, index) => {
            const emojiSrc =
              emojiImages[reaction.reaction as keyof typeof emojiImages] ?? '';
            return (
              <img
                key={reaction.reaction}
                src={emojiSrc}
                alt={reaction.reaction}
                className="size-6 shrink-0"
                style={{
                  marginLeft: index !== 0 ? '-8px' : undefined,
                  zIndex: reactions.reactionsCount.length - index,
                }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Reaction;
