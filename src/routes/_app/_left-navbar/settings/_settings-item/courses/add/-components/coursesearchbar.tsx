import SearchIcon from '~/assets/icons/searchbar/search.svg';
import { TextField } from '~/components/ui/textfield';

export default function CourseSearchBar({
  search,
  onSearchChange,
}: {
  search: string;
  onSearchChange: (value: string) => void;
}) {
  return (
    <form>
      <div className="flex h-12 rounded-l-lg rounded-r-none">
        <TextField
          type="text"
          placeholder="Search..."
          className="w-full"
          inputClassName="w-full rounded-l-lg px-4 font-semibold rounded-r-none"
          name="search"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <button className="flex size-12 rounded-lg rounded-l-none bg-green-900">
          <img alt="Search Button" src={SearchIcon} className="m-auto size-5" />
        </button>
      </div>
    </form>
  );
}
