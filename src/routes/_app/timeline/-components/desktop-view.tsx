import { Info } from '~/api/generated';
import Feed from './feed';
import SearchBar from './searchbar';
import HeaderTitle from '~/components/header-title';
import Filter from './filter';

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
          <div className="flex flex-col items-center gap-5 rounded-lg bg-green-75 py-7 shadow-md">
            <Filter />
            <div className="flex w-3/4 flex-col gap-5">
              <button className="rounded-full bg-green-500 px-12 py-3 text-white">
                Apply
              </button>
              <button className="rounded-full border-2 border-green-500 px-12 py-3 text-green-500">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
