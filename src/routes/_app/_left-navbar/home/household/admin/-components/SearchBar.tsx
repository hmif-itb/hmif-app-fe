import { ListFilter, Search } from 'lucide-react';
import React from 'react';
import { Input } from '~/components/ui/input';

function SearchBar() {
  return (
    <div className="flex w-full justify-between gap-6">
      {/* Search Bar */}
      <div className="relative w-full">
        <Input
          type="text"
          placeholder="Cari request/laporan..."
          className="h-[60px] rounded-full border-none px-8 pr-12 font-semibold text-gray-700 outline-none"
        />
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
          <Search size={24} />
        </span>
      </div>
      {/* Filter */}
      <div className="flex size-[60px] items-center justify-center rounded-[20px] bg-white">
        <ListFilter size={32} />
      </div>
    </div>
  );
}

export default SearchBar;
