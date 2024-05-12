import { createFileRoute } from '@tanstack/react-router';

import SearchBar from './-components/searchbar';
import Feed from './-components/feed';
import postData from '~/assets/mock/post.json';
import { Post } from './-interface/IPost';

export const Route = createFileRoute('/timeline/')({
  component: Timeline,
});

function Timeline() {
  return (
    <div className="mt-10 mx-5 lg:mx-[20em]">
      <h1 className="text-[24px] font-bold antialiased">Timeline</h1>
      <SearchBar />
      <Feed posts={postData} />
    </div>
  );
}
