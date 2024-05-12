import { createFileRoute } from '@tanstack/react-router';
import Header from './-components/header';
import DetailPost from './-components/detail-post';
import PostInteraction from './-components/post-interaction';
import PostComment from './-components/post-comment';

export const Route = createFileRoute('/info-detail/')({
  component: InfoDetail,
});

function InfoDetail() {
  return (
    <div>
      <Header></Header>
      <div className="flex-col space-y-4 p-4">
        <DetailPost></DetailPost>
        <PostInteraction></PostInteraction>
        <PostComment></PostComment>
      </div>
    </div>
  );
}
