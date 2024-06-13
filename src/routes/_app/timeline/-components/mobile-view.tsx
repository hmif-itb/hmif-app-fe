import { Info } from '~/api/generated';
import Feed from './feed';
import SearchBar from './searchbar';

export default function MobileView({ infos }: { infos: Info[] }) {
  return (
    <div className="mx-5 mt-10 max-w-screen-md flex-1 lg:hidden">
      <h1 className="text-[24px] font-bold antialiased">Timeline</h1>
      <SearchBar />

      <Feed infos={infos} />
    </div>
  );
}
