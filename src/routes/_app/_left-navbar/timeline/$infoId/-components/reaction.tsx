import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { api } from '~/api/client';
import { INFO_LIST_QUERY_KEY, INFO_QUERY_KEY } from '~/api/constants';
import { Info } from '~/api/generated';
import { Button } from '~/components/ui/button';
import { cn } from '~/lib/utils';
import { emojiImages } from '../-constants/emoji';
import { AnimationProps, motion } from 'framer-motion';

const BounceAnimation: AnimationProps = {
  initial: { translateY: 20, opacity: 0 },
  animate: { translateY: [20, -10, 0], opacity: [0, 1, 1] },
};

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
    <div className="relative ml-0 mr-1">
      {isActive && (
        <div
          className="fixed left-0 top-0 z-20 h-screen w-full bg-black/10"
          onClick={toggleReaction}
        ></div>
      )}

      <div className="flex items-center space-x-3">
        <Button
          variant={'link'}
          onClick={toggleReaction}
          className="relative z-10 p-0"
        >
          <img
            src={
              userReaction
                ? '/img/icons/like-active.svg'
                : '/img/icons/like.svg'
            }
            alt="like"
          />
        </Button>
        {isActive && (
          <div className="absolute left-0 z-30 w-max -translate-y-full flex-row space-x-1">
            <motion.button
              {...BounceAnimation}
              transition={{ ease: 'linear' }}
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
            </motion.button>
            <motion.button
              {...BounceAnimation}
              transition={{ ease: 'linear', delay: 0.05 }}
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
            </motion.button>
            <motion.button
              {...BounceAnimation}
              transition={{ ease: 'linear', delay: 0.1 }}
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
            </motion.button>
            <motion.button
              {...BounceAnimation}
              transition={{ ease: 'linear', delay: 0.15 }}
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
            </motion.button>
            <motion.button
              {...BounceAnimation}
              transition={{ ease: 'linear', delay: 0.2 }}
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
            </motion.button>
            <motion.button
              {...BounceAnimation}
              transition={{ ease: 'linear', delay: 0.25 }}
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
            </motion.button>
          </div>
        )}
        {reactions && reactions.totalReactions > 0 && (
          <div className="flex items-center">
            {reactions.reactionsCount?.map((reaction, index) => {
              const emojiSrc =
                emojiImages[reaction.reaction as keyof typeof emojiImages] ??
                '';
              return (
                <div className="relative">
                  {reaction.count > 1 && (
                    <div className="absolute -bottom-1 -right-0 z-10 rounded-full bg-slate-200 px-1 text-[10px]">
                      {reaction.count}
                    </div>
                  )}
                  <img
                    key={reaction.reaction}
                    src={emojiSrc}
                    alt={reaction.reaction}
                    className="relative size-6 shrink-0"
                    style={{
                      // marginLeft: index !== 0 ? '-8px' : undefined,
                      zIndex: reactions.reactionsCount.length - index,
                    }}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Reaction;
