import React from 'react';
import { PropertyItem } from './PropertyItem';
import { FilterOptions } from './FilterModal';
import { PropertyData } from '../-api';

interface PropertyListProps {
  filter: FilterOptions;
  searchTerm: string;
  data: PropertyData[];
  isLoading?: boolean;
}

function PropertyList({
  filter,
  searchTerm,
  data,
  isLoading = false,
}: PropertyListProps) {
  const filteredProperties = data.filter((property) => {
    const matchesCondition =
      filter.condition === 'all' || property.condition === filter.condition;
    const matchesSearch = property.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCondition && matchesSearch;
  });

  if (isLoading) {
    return (
      <div className="mb-20 flex w-full flex-col gap-3 lg:mb-5 lg:gap-5">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="w-full rounded-xl bg-white px-[22px] py-5"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="size-9 animate-pulse rounded-lg bg-gray-200" />
                <div className="flex flex-col gap-3">
                  <div className="h-4 w-32 animate-pulse rounded bg-gray-200" />
                  <div className="flex items-center gap-7">
                    <div className="h-6 w-16 animate-pulse rounded-full bg-gray-200" />
                    <div className="h-3 w-20 animate-pulse rounded bg-gray-200" />
                    <div className="h-3 w-24 animate-pulse rounded bg-gray-200" />
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="h-6 w-20 animate-pulse rounded-full bg-gray-200" />
                <div className="h-8 w-20 animate-pulse rounded-xl bg-gray-200" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (filteredProperties.length === 0) {
    return (
      <div className="mb-20 flex w-full items-center justify-center text-white lg:mb-5">
        <p>Tidak ada properti yang sesuai dengan filter</p>
      </div>
    );
  }

  return (
    <div className="mb-20 flex w-full flex-col gap-3 lg:mb-5 lg:gap-5">
      {filteredProperties.map((property) => (
        <PropertyItem key={property.id} item={property} />
      ))}
    </div>
  );
}

export default PropertyList;
