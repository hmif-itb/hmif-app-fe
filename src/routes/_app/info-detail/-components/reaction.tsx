import { useState } from 'react';
import { IPost } from '../-interface/IPost';

const Reaction = ({
  reactionData,
  initialUserReaction,
}: {
  reactionData: IPost['ReactionData'];
  initialUserReaction?: IPost['UserReaction'] | null;
}) => {
  const [userReaction, setUserReaction] = useState(initialUserReaction);
  const [addReaction, setAddReaction] = useState(false);

  const handleAddReaction = () => {
    setAddReaction(!addReaction);
  };

  const handleReaction = (reaction: string) => {
    setUserReaction(reaction);
    setAddReaction(!addReaction);
  };

  return (
    <div className="relative ml-0 mr-1 flex items-center space-x-3">
      <button onClick={handleAddReaction} className="relative z-10">
        <img
          src={!userReaction ? '/icons/like-active.svg' : '/icons/like.svg'}
          alt="like"
        />
      </button>
      {addReaction && (
        <div className="top-50 absolute left-0 w-max -translate-y-full flex-row space-x-1">
          <button
            onClick={() => handleReaction('grin')}
            className={userReaction === 'grin' ? 'size-8' : 'size-12'}
          >
            <img src="/icons/emojiGrin.svg" alt="grin" />
          </button>
          <button
            onClick={() => handleReaction('heart-eyes')}
            className={userReaction === 'heart-eyes' ? 'size-8' : 'size-12'}
          >
            <img src="/icons/emojiHeartEyes.svg" alt="heart-eyes" />
          </button>
          <button
            onClick={() => handleReaction('fire')}
            className={userReaction === 'fire' ? 'size-8' : 'size-12'}
          >
            <img src="/icons/emojiFire.svg" alt="fire" />
          </button>
          <button
            onClick={() => handleReaction('cry')}
            className={userReaction === 'cry' ? 'size-8' : 'size-12'}
          >
            <img src="/icons/emojiCry.svg" alt="cry" />
          </button>
          <button
            onClick={() => handleReaction('screaming')}
            className={userReaction === 'screaming' ? 'size-8' : 'size-12'}
          >
            <img src="/icons/emojiScreaming.svg" alt="screaming" />
          </button>
          <button
            onClick={() => handleReaction('party')}
            className={userReaction === 'party' ? 'size-8' : 'size-12'}
          >
            <img src="/icons/emojiParty.svg" alt="party" />
          </button>
        </div>
      )}
      {reactionData.length > 0 && (
        <div className="flex items-center space-x-2">
          {reactionData.slice(0, 6).map((reaction, index) => {
            const emojiSrc =
              reaction === 'cry'
                ? '/icons/emojiCry.svg'
                : reaction === 'fire'
                  ? '/icons/emojiFire.svg'
                  : reaction === 'heart-eyes'
                    ? '/icons/emojiHeartEyes.svg'
                    : reaction === 'grin'
                      ? '/icons/emojiGrin.svg'
                      : reaction === 'screaming'
                        ? '/icons/emojiScreaming.svg'
                        : reaction === 'party'
                          ? '/icons/emojiParty.svg'
                          : '';

            return (
              <img
                key={index}
                src={emojiSrc}
                alt={reaction}
                className="size-5"
                style={{ marginLeft: '-8px', zIndex: (5 - index) * 10 }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Reaction;
