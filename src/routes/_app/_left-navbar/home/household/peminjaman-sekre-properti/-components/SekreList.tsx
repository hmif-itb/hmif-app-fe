import React from 'react';
import { SekreItem } from './SekreItem';
import { FilterOptions } from './FilterModal';
import { SekreData } from '../api';

interface SekreListProps {
  filter: FilterOptions;
  searchTerm: string;
  data: SekreData[];
  isLoading?: boolean;
}

function SekreList({
  filter,
  searchTerm,
  data,
  isLoading = false,
}: SekreListProps) {
  const filteredSekre = data.filter((sekre) => {
    const matchesCondition =
      filter.condition === 'all' || sekre.condition === filter.condition;
    const matchesSearch = sekre.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCondition && matchesSearch;
  });

  if (isLoading) {
    return (
      <div className="mb-20 grid w-full grid-cols-1 gap-3 lg:mb-5 lg:grid-cols-2 lg:gap-5 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="flex w-full flex-col rounded-xl bg-white px-4 py-[15px] lg:px-[22px] lg:py-5"
          >
            <div className="mb-5 flex items-center gap-3">
              <div className="size-9 animate-pulse rounded-lg bg-gray-200" />
              <div className="flex flex-col gap-3">
                <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
                <div className="flex items-center gap-4">
                  <div className="h-5 w-12 animate-pulse rounded-full bg-gray-200" />
                  <div className="h-3 w-16 animate-pulse rounded bg-gray-200" />
                </div>
              </div>
            </div>
            <div className="mb-3 aspect-[2/1] w-full animate-pulse rounded-lg bg-gray-200" />
            <div className="flex w-full justify-center gap-[60px]">
              <div className="h-8 w-20 animate-pulse rounded-xl bg-gray-200" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (filteredSekre.length === 0) {
    return (
      <div className="mb-20 flex w-full items-center justify-center text-white lg:mb-5">
        <p>Tidak ada sekre yang sesuai dengan filter</p>
      </div>
    );
  }

  return (
    <div className="mb-20 grid w-full grid-cols-1 gap-3 lg:mb-5 lg:grid-cols-2 lg:gap-5 xl:grid-cols-3">
      {filteredSekre.map((sekre) => (
        <SekreItem key={sekre.id} sekre={sekre} />
      ))}
    </div>
  );
}

export default SekreList;
