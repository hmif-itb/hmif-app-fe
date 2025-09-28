import { ListFilter, Search, Plus } from 'lucide-react';
import React, { useState } from 'react';
import { Input } from '~/components/ui/input';
import { FilterModal, FilterOptions } from './FilterModal';

interface SearchBarProps {
  onFilterChange: (filter: FilterOptions) => void;
  onSearchChange: (searchTerm: string) => void;
  onCreateProperty?: () => void;
  onCreateSekre?: () => void;
  currentFilter: FilterOptions;
  searchTerm: string;
  activeView: string;
}

function SearchBar({
  onFilterChange,
  onSearchChange,
  onCreateProperty,
  onCreateSekre,
  currentFilter,
  searchTerm,
  activeView,
}: SearchBarProps) {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const handleFilterClick = () => {
    setIsFilterModalOpen(true);
  };

  const handleFilterApply = (filter: FilterOptions) => {
    onFilterChange(filter);
  };

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  };

  const handleCreateClick = () => {
    if (activeView === 'Properti' && onCreateProperty) {
      onCreateProperty();
    } else if (activeView === 'Sekre' && onCreateSekre) {
      onCreateSekre();
    }
  };

  const hasActiveFilter = currentFilter.condition !== 'all';

  return (
    <>
      <div className="flex w-full justify-between gap-2 lg:gap-6 ">
        {/* Search Bar */}
        <div className="relative flex w-full">
          <Input
            type="text"
            placeholder="Cari properti/sekre..."
            value={searchTerm}
            onChange={handleSearchInput}
            className="h-[33px] rounded-full border-none px-8 pr-12 font-semibold text-gray-700 outline-none lg:h-[60px]"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
            <Search className="hidden lg:block" size={24} />
            <Search className="lg:hidden" size={20} />
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 lg:gap-4">
          {/* Create Button */}
          <button
            onClick={handleCreateClick}
            className="flex size-8 min-h-8 min-w-8 items-center justify-center rounded-xl bg-[#E8C55F] text-[#1D3122] transition-colors hover:bg-[#E8C55F]/80 lg:size-[60px] lg:min-h-[60px] lg:min-w-[60px] lg:rounded-[20px]"
            title={`Tambah ${activeView}`}
          >
            <Plus className="hidden lg:block" size={32} />
            <Plus className="lg:hidden" size={24} />
          </button>

          {/* Filter Button */}
          <button
            onClick={handleFilterClick}
            className={`flex size-8 min-h-8 min-w-8 items-center justify-center rounded-xl text-[#363538] transition-colors lg:size-[60px] lg:min-h-[60px] lg:min-w-[60px] lg:rounded-[20px] ${
              hasActiveFilter
                ? 'bg-[#305138] text-white'
                : 'bg-white hover:bg-gray-50'
            }`}
          >
            <ListFilter className="hidden lg:block" size={32} />
            <ListFilter className="lg:hidden" size={24} />
          </button>
        </div>
      </div>

      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        onApplyFilter={handleFilterApply}
        currentFilter={currentFilter}
      />
    </>
  );
}

export default SearchBar;
