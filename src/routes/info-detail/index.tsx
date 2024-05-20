import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import Header from './-components/header';
import DetailPost from './-components/detail-post';
import PostInteraction from './-components/post-interaction';
import PostComment from './-components/post-comment';
import postData from '~/assets/mock/post.json';

export const Route = createFileRoute('/info-detail/')({
  component: InfoDetail,
});

function InfoDetail() {
  return (
    <div>
      <Header />
      <div className="flex-col space-y-4 p-4">
        <DetailPost
          images={postData.image}
          tags={postData.TagData}
          profile={postData.profile}
          textData={postData.TextData}
        />
        <PostInteraction
          reactionData={postData.ReactionData}
          commentsCount={postData.comments.length}
        />
        <PostComment comments={postData.comments} />
      </div>
    </div>
  );
}

export default InfoDetail;
