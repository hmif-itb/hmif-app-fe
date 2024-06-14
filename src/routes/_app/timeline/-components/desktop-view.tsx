import { Info } from '~/api/generated';
import Feed from './feed';
import SearchBar from './searchbar';
import HeaderTitle from '~/components/header-title';
import FilterCard from './filtercard';

export default function DesktopView({ infos }: { infos: Info[] }) {
  return (
    <div className="flex flex-col">
      <HeaderTitle />
      <div className="flex flex-row justify-evenly">
        <div className="w-[65%]">
          <Feed infos={infos} />
        </div>
        <div className="flex w-[30%] flex-col items-center">
          <SearchBar />
          <FilterCard />
        </div>
      </div>
    </div>
  );
}
