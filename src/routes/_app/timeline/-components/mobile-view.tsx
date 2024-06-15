import { Info } from '~/api/generated';
import Feed from './feed';
import SearchBar from './searchbar';
import { FilterProps } from '../-types';

type ComponentProps = {
  infos: Info[];
  search: string;
  setSearch: (value: string) => void;
} & FilterProps;

export default function MobileView({ infos, ...props }: ComponentProps) {
  return (
    <div className="mx-5 mt-10 max-w-screen-md flex-1 lg:hidden">
      <h1 className="text-[24px] font-bold antialiased">Timeline</h1>
      <SearchBar {...props} />
      <Feed infos={infos} />
    </div>
  );
}
