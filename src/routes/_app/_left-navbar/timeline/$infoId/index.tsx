import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { api } from '~/api/client';
import { INFO_QUERY_KEY } from '~/api/constants';
import { preloadImages } from '~/lib/image';
import CommentForm from './-components/comment-form';
import Comments from './-components/comments';
import DetailPost from './-components/detail-post';
import Header from './-components/header';
import PostInteraction from './-components/post-interaction';
import { emojiImages } from './-constants/emoji';

export const Route = createFileRoute('/_app/_left-navbar/timeline/$infoId/')({
  component: InfoDetail,
  beforeLoad() {
    preloadImages(Object.values(emojiImages));
  },
});

function InfoDetail() {
  const { infoId } = Route.useParams();
  const { data: info } = useQuery({
    queryKey: [INFO_QUERY_KEY, 'detail', infoId],
    queryFn: () => api.info.getInfoById({ infoId }),
  });
  const { data: comments } = useQuery({
    queryKey: [INFO_QUERY_KEY, 'comments', infoId],
    queryFn: () =>
      api.comment
        .getCommentsList({ infoId, sort: 'oldest' })
        .then((res) => res.comment),
  });

  useQuery({
    queryKey: ['readinfo', infoId],
    queryFn: () =>
      api.info.readInfo({ infoId, requestBody: { unread: false } }),
    enabled: !!info,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    staleTime: Infinity,
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
    <div className="w-full flex-1 pb-24 lg:pb-2">
      <Header />
      <div className="flex-col space-y-4 p-4">
        <DetailPost info={info} />
        <PostInteraction
          reactions={info.reactions}
          commentsCount={info.comments}
          isActive={activeReaction === 'post'}
          toggleReaction={() => toggleReaction('post')}
          infoId={info.id}
          isDetail
        />
        <CommentForm repliedInfoId={info.id} />
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
