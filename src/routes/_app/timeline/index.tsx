import { createFileRoute } from '@tanstack/react-router';

import postData from '~/assets/mock/post.json';
import Feed from './-components/feed';
import SearchBar from './-components/searchbar';
// import { Post } from './-interface/IPost';

export const Route = createFileRoute('/_app/timeline/')({
  component: Timeline,
});

function Timeline() {
  return (
    <div className="mx-5 mt-10 max-w-screen-md">
      <h1 className="text-[24px] font-bold antialiased">Timeline</h1>
      <SearchBar />
      <Feed posts={postData} />
    </div>
  );
}
