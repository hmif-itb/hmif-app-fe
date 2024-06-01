import { useState } from 'react';
import { Info } from '~/api/generated';
import { Button } from '~/components/ui/button';
import { cn } from '~/lib/utils';
import { IPost } from '../-interface/IPost';

const Reaction = ({
  reactions: reactions,
  initialUserReaction,
  isActive,
  toggleReaction,
}: {
  reactions: Info['reactions'];
  initialUserReaction?: IPost['UserReaction'] | null;
  isActive: boolean;
  toggleReaction: () => void;
}) => {
  const [userReaction, setUserReaction] = useState(initialUserReaction);

  const handleReaction = (reaction: string) => {
    setUserReaction(userReaction === reaction ? null : reaction);
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
      {reactions && (
        <div className="flex items-center space-x-2">
          {reactions.reactionsCount.map((reaction, index) => {
            let emojiSrc = '';
            switch (reaction.reaction) {
              case 'cry':
                emojiSrc = '/img/icons/emojiCry.svg';
                break;
              case 'fire':
                emojiSrc = '/img/icons/emojiFire.svg';
                break;
              case 'heart-eyes':
                emojiSrc = '/img/icons/emojiHeartEyes.svg';
                break;
              case 'grin':
                emojiSrc = '/img/icons/emojiGrin.svg';
                break;
              case 'screaming':
                emojiSrc = '/img/icons/emojiScreaming.svg';
                break;
              case 'party':
                emojiSrc = '/img/icons/emojiParty.svg';
                break;
              default:
                break;
            }

            return (
              <img
                key={reaction.reaction}
                src={emojiSrc}
                alt={reaction.reaction}
                className="size-6"
                style={{ marginLeft: '-8px', zIndex: (4 - index) * 5 }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Reaction;
