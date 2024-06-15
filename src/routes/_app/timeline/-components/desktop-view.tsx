import { Info } from '~/api/generated';
import Feed from './feed';
import SearchBar from './searchbar';
import HeaderTitle from '~/components/header-title';
import FilterCard from './filtercard';
import { FilterProps } from '../-types';

type ComponentProps = {
  infos: Info[];
  search: string;
  setSearch: (value: string) => void;
} & FilterProps;

export default function DesktopView({ infos, ...props }: ComponentProps) {
  return (
    <div className="hidden flex-col lg:flex">
      <HeaderTitle />
      <div className="flex flex-row justify-evenly">
        <div className="w-[65%]">
          <Feed infos={infos} />
        </div>
        <div className="flex w-[30%] flex-col items-center">
          <SearchBar {...props} />
          <FilterCard {...props} />
        </div>
      </div>
    </div>
  );
}
