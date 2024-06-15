import { Info } from '~/api/generated';
import Feed from './feed';
import SearchBar from './searchbar';

type ComponentProps = {
  infos: Info[];
  search: string;
  setSearch: (value: string) => void;
  read: boolean;
  setRead: (value: boolean) => void;
};

export default function MobileView({
  infos,
  search,
  setSearch,
  read,
  setRead,
}: ComponentProps) {
  return (
    <div className="mx-5 mt-10 max-w-screen-md flex-1 lg:hidden">
      <h1 className="text-[24px] font-bold antialiased">Timeline</h1>
      <SearchBar
        read={read}
        setRead={setRead}
        search={search}
        setSearch={setSearch}
      />

      <Feed infos={infos} />
    </div>
  );
}
