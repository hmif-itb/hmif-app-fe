import { useRef } from 'react';
import SearchIcon from '~/assets/icons/searchbar/search.svg';
import { TextField } from '~/components/ui/textfield';
import { DEBOUNCE_TIME } from '~/lib/constants';

export default function CourseSearchBar({
  onSearchChange,
}: {
  onSearchChange: (value: string) => void;
}) {
  const timeout = useRef<NodeJS.Timeout | null>(null);
  return (
    <form>
      <div className="flex h-12 rounded-l-lg rounded-r-none">
        <TextField
          type="text"
          placeholder="Search..."
          className="w-full"
          inputClassName="w-full rounded-l-lg px-4 font-semibold rounded-r-none"
          name="search"
          onChange={(e) => {
            if (timeout.current) {
              clearTimeout(timeout.current);
            }
            timeout.current = setTimeout(() => {
              onSearchChange(e.target.value);
            }, DEBOUNCE_TIME);
          }}
        />
        <button className="flex size-12 rounded-lg rounded-l-none bg-green-900">
          <img alt="Search Button" src={SearchIcon} className="m-auto size-5" />
        </button>
      </div>
    </form>
  );
}
