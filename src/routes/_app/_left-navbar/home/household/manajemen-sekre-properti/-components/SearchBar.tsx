import { ListFilter, Search } from 'lucide-react';
import React from 'react';
import { Input } from '~/components/ui/input';

function SearchBar() {
  return (
    <div className="flex w-full justify-between gap-2 lg:gap-6 ">
      {/* Search Bar */}
      <div className="relative flex w-full">
        <Input
          type="text"
          placeholder="Cari properti/sekre..."
          className="h-[33px] rounded-full border-none px-8 pr-12 font-semibold text-gray-700 outline-none lg:h-[60px]"
        />
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
          <Search className="hidden lg:block" size={24} />
          <Search className="lg:hidden" size={20} />
        </span>
      </div>
      {/* Filter */}
      <div className="flex size-8 min-h-8 min-w-8 items-center justify-center rounded-xl bg-white text-[#363538]  lg:size-[60px] lg:min-h-[60px] lg:min-w-[60px] lg:rounded-[20px]">
        <ListFilter className="hidden lg:block" size={32} />
        <ListFilter className="lg:hidden" size={24} />
      </div>
    </div>
  );
}

export default SearchBar;
