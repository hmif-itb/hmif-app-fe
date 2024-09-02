import { Info } from '~/api/generated';
import HeaderTitle from '~/components/header-title';
import Announce from '~/routes/_app/_left-navbar/timeline/-components/Announce';
import { FilterProps } from '../-types';
import Feed from './feed';
import FilterCard from './filtercard';
import SearchBar from './searchbar';

type ComponentProps = {
  infos: Info[];
  search: string;
  setSearch: (value: string) => void;
  onInView: () => void;
  isFetching: boolean;
} & FilterProps;

export default function DesktopView({
  infos,
  onInView,
  isFetching,
  ...props
}: ComponentProps) {
  return (
    <div className="hidden h-screen w-full max-w-full flex-col overflow-hidden lg:flex">
      <HeaderTitle />
      <Announce />

      <div className="flex w-full flex-row justify-evenly overflow-y-auto">
        <div className="w-3/5 grow-0">
          <Feed isFetching={isFetching} onInView={onInView} infos={infos} />
        </div>
        <div className="sticky top-0 flex h-fit max-h-full w-[35%] flex-col items-center overflow-hidden">
          <SearchBar {...props} />
          <FilterCard {...props} />
        </div>
      </div>
    </div>
  );
}
