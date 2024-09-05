import { Info } from '~/api/generated';
import { FilterProps } from '../-types';
import Feed from './feed';
import SearchBar from './searchbar';

type ComponentProps = {
  infos: Info[];
  search: string;
  setSearch: (value: string) => void;
  onInView: () => void;
  isFetching: boolean;
} & FilterProps;

export default function MobileView({
  infos,
  onInView,
  isFetching,
  ...props
}: ComponentProps) {
  return (
    <div className="mx-5 mt-10 max-w-screen-md flex-1 pb-24 lg:hidden">
      <h1 className="text-[24px] font-bold antialiased">Timeline</h1>
      <SearchBar {...props} />
      <Feed isFetching={isFetching} onInView={onInView} infos={infos} />
    </div>
  );
}
