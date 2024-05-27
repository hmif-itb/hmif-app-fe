import { createFileRoute, useParams } from '@tanstack/react-router';
import postData from '~/assets/mock/post.json';
import DetailPost from './-components/detail-post';
import Header from './-components/header';
import PostComment from './-components/post-comment';
import PostInteraction from './-components/post-interaction';
import { useState } from 'react';
import { api } from '~/api/client';
import { fetchPostById } from '~/utils/fetch-post-by-id';

export const Route = createFileRoute('/_app/timeline/$infoId/')({
  component: InfoDetail,
  loader: async ({ params: { infoId } }) => {
    console.log('infoId:', infoId);
    try {
      const info = await api.info.getInfoById({ infoId });
      console.log(info);
    } catch (error) {
      console.error('Failed to fetch info:', error);
    }
    return fetchPostById(infoId);
  },
});

function InfoDetail() {
  const { infoId } = Route.useParams();
  const [activeReaction, setActiveReaction] = useState<string | null>(null);

  const toggleReaction = (key: string) => {
    if (activeReaction === key) {
      setActiveReaction(null);
    } else {
      setActiveReaction(key);
    }
  };

  // let info = api.info.readInfo(InfoId);

  return (
    <div>
      <Header />
      <h1>{infoId}</h1>
      <div className="flex-col space-y-4 p-4">
        <DetailPost
          images={postData[0].image}
          tags={postData[0].TagData}
          profile={postData[0].profile}
          title={postData[0].title}
          content={postData[0].content}
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
