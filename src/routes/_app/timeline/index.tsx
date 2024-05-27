import { createFileRoute } from '@tanstack/react-router';

import { useQuery } from '@tanstack/react-query';
import { api } from '~/api/client';
import Feed from './-components/feed';
import SearchBar from './-components/searchbar';
// import { Post } from './-interface/IPost';

export const Route = createFileRoute('/_app/timeline/')({
  component: Timeline,
});

function Timeline() {
  const { data: infos } = useQuery({
    // TODO: apply filter
    queryKey: ['info'],
    queryFn: () => api.info.getListInfo({}).then((res) => res.infos),
  });
  if (!infos) {
    // TODO: handle loading or empty
    return null;
  }
  return (
    <div className="mx-5 mt-10 max-w-screen-md">
      <h1 className="text-[24px] font-bold antialiased">Timeline</h1>
      <SearchBar />

      <Feed infos={infos} />
    </div>
  );
}
