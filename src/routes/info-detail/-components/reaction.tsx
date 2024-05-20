import { IPost } from '../-interface/IPost';

const Reaction = ({
  reactionData,
}: {
  reactionData: IPost['ReactionData'];
}) => {
  return (
    <div className="flex items-center space-x-3 ml-0 mr-1">
      <button>
        <img src="/icons/like.svg" alt="like" />
      </button>
      {reactionData.length === 0 ? null : (
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
