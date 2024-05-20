import React from 'react';
import { IPost } from '../-interface/IPost';
import Reaction from './reaction';

const PostInteraction = ({
  reactionData,
  commentsCount,
}: {
  reactionData: IPost['ReactionData'];
  commentsCount: number;
}) => {
  return (
    <div className="flex items-center space-x-3 p-2 border-y border-gray-300">
      <Reaction reactionData={reactionData}></Reaction>
      <div className="flex space-x-1">
        <button>
          <img src="/icons/comment.svg" alt="comment" />
        </button>
        <p className="text-xl text-neutral-dark-hover">{commentsCount}</p>
      </div>
    </div>
  );
};

export default PostInteraction;
