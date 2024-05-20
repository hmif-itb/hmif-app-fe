import React, { useState } from 'react';
import { IPost } from '../-interface/IPost';
import Tag from './tag';

const PostTags = ({ tags }: { tags: IPost['TagData'] }) => {
  const [showAll, setShowAll] = useState(false);

  const handleShowMore = () => {
    setShowAll(true);
  };

  const handleShowLess = () => {
    setShowAll(false);
  };

  return (
    <div className="flex flex-wrap justify-start gap-2.5 items-center">
      {(showAll ? tags : tags.slice(0, 6)).map((tagData, index) => (
        <Tag key={index} tag={tagData} />
      ))}
      {tags.length > 6 && (
        <button
          className="text-base font-semibold text-green-300"
          onClick={showAll ? handleShowLess : handleShowMore}
        >
          <p>{showAll ? 'Show less' : 'Show more'}</p>
        </button>
      )}
    </div>
  );
};

export default PostTags;
