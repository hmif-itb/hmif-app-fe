import { createFileRoute } from '@tanstack/react-router';
import postData from '~/assets/mock/post.json';
import DetailPost from './-components/detail-post';
import Header from './-components/header';
import PostComment from './-components/post-comment';
import PostInteraction from './-components/post-interaction';
import { useState } from 'react';

export const Route = createFileRoute('/_app/timeline/$infoId/')({
  component: InfoDetail,
});

function InfoDetail() {
  const [activeReaction, setActiveReaction] = useState<string | null>(null);

  const toggleReaction = (key: string) => {
    if (activeReaction === key) {
      setActiveReaction(null);
    } else {
      setActiveReaction(key);
    }
  };

  return (
    <div>
      <Header />
      <div className="flex-col space-y-4 p-4">
        <DetailPost
          images={postData[0].image}
          tags={postData[0].TagData}
          profile={postData[0].profile}
          textData={postData[0].TextData}
        />
        <PostInteraction
          reactionData={postData[0].ReactionData}
          commentsCount={postData[0].comments.length}
          userReaction={postData[0].UserReaction}
          isActive={activeReaction === 'post'}
          toggleReaction={() => toggleReaction('post')}
        />
        <PostComment
          comments={postData[0].comments}
          activeReaction={activeReaction}
          toggleReaction={toggleReaction}
        />
      </div>
    </div>
  );
}

export default InfoDetail;
