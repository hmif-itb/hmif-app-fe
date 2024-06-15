import { Info } from '~/api/generated';
import Feed from './feed';
import SearchBar from './searchbar';
import HeaderTitle from '~/components/header-title';
import FilterCard from './filtercard';

type ComponentProps = {
  infos: Info[];
  search: string;
  setSearch: (value: string) => void;
  read: boolean;
  setRead: (value: boolean) => void;
};

export default function DesktopView({
  infos,
  search,
  setSearch,
  read,
  setRead,
}: ComponentProps) {
  return (
    <div className="hidden flex-col lg:flex">
      <HeaderTitle />
      <div className="flex flex-row justify-evenly">
        <div className="w-[65%]">
          <Feed infos={infos} />
        </div>
        <div className="flex w-[30%] flex-col items-center">
          <SearchBar
            read={read}
            setRead={setRead}
            search={search}
            setSearch={setSearch}
          />
          <FilterCard />
        </div>
      </div>
    </div>
  );
}
