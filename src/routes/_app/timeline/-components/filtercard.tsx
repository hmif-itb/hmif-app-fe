import { FilterProps } from '../-types';
import Filter from './filter';

export default function FilterCard(props: FilterProps) {
  return (
    <div className="rounded-lg bg-[#EAEEEB] pb-10 shadow-md">
      <div className="mx-auto my-4 h-2 w-[50px] rounded-full bg-[#3C3C434D]" />
      <div className="flex flex-col items-center gap-5">
        <Filter {...props} />
        {/* <div className="flex w-3/4 flex-col gap-5">
          <button className="rounded-full bg-green-300 px-12 py-3 text-white">
            Apply
          </button>
          <button className="rounded-full border-2 border-green-300 px-12 py-3 text-green-500">
            Cancel
          </button>
        </div> */}
      </div>
    </div>
  );
}
