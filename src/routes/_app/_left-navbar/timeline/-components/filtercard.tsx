import { FilterProps } from '../-types';
import Filter from './filter';

export default function FilterCard(props: FilterProps) {
  return (
    <div className="mb-5 overflow-y-auto rounded-lg bg-[#EAEEEB] pb-6 shadow-md">
      <div className="mx-auto my-4 h-2 w-[50px] rounded-full bg-[#3C3C434D]" />
      <div className="flex flex-col items-center gap-5">
        <Filter {...props} />
      </div>
    </div>
  );
}
