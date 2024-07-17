import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { api } from '~/api/client';
import { preloadImages } from '~/lib/image';
import Comments from './-components/comments';
import DetailPost from './-components/detail-post';
import Header from './-components/header';
import PostInteraction from './-components/post-interaction';
import { emojiImages } from './-constants/emoji';
import CommentForm from './-components/comment-form';

export const Route = createFileRoute('/_app/timeline/$infoId/')({
  component: InfoDetail,
  beforeLoad() {
    preloadImages(Object.values(emojiImages));
  },
});

function InfoDetail() {
  const { infoId } = Route.useParams();
  const { data: info } = useQuery({
    queryKey: ['info', 'detail', infoId],
    queryFn: () => api.info.getInfoById({ infoId }),
  });
  const { data: comments } = useQuery({
    queryKey: ['info', 'comments', infoId],
    queryFn: () =>
      api.comment
        .getCommentsList({ infoId, sort: 'oldest' })
        .then((res) => res.comment),
  });

  const [activeReaction, setActiveReaction] = useState<string | null>(null);

  const toggleReaction = (key: string) => {
    if (activeReaction === key) {
      setActiveReaction(null);
    } else {
      setActiveReaction(key);
    }
  };

  if (!info) {
    // TODO: handle error or loading
    return <div className="flex-1"></div>;
  }

  return (
    <div className="w-full flex-1">
      <Header />
      <div className="max-w-screen-md flex-col space-y-4 p-4">
        <DetailPost info={info} />
        <PostInteraction
          reactions={info.reactions}
          commentsCount={comments?.length ?? 0}
          isActive={activeReaction === 'post'}
          toggleReaction={() => toggleReaction('post')}
        />
        <CommentForm repliedInfoId="0" />
        {/* P.S. idk how i should generate the repliedInfoId, sorry. */}
        {comments && (
          <Comments
            comments={comments}
            activeReaction={activeReaction}
            toggleReaction={toggleReaction}
          />
        )}
      </div>
    </div>
  );
}

export default InfoDetail;
