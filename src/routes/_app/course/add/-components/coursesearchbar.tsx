import SearchIcon from '~/assets/icons/searchbar/search.svg';

export default function CourseSearchBar() {
  return (
    <form>
      <div className="flex h-12 rounded-l-lg rounded-r-xl bg-neutral-light">
        <input
          type="text"
          placeholder="Search..."
          className="w-full rounded-l-lg px-4 font-semibold"
          name=""
          id=""
        />
        <button className="flex size-12 rounded-lg bg-green-900">
          <img alt="Search Button" src={SearchIcon} className="m-auto size-5" />
        </button>
      </div>
    </form>
  );
}
