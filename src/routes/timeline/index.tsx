import { createFileRoute } from '@tanstack/react-router';

import SearchBar from './-components/searchbar';

export const Route = createFileRoute('/timeline/')({
  component: Timeline,
});

function Timeline() {
  return (
    <div className="mt-10 mx-5 lg:mx-[20em]">
      <h1 className="text-[24px] font-bold antialiased">Timeline</h1>
      <SearchBar />
      <Feed />
    </div>
  );
}

function Feed() {
  return <div>Ini Feed</div>;
}
