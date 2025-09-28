import React from 'react';
import { PeminjamanItem } from './PeminjamanItem';
import { FilterOptions } from './FilterModal';
import { PeminjamanData } from '../-api';

interface PeminjamanListProps {
  filter: FilterOptions;
  searchTerm: string;
  data: PeminjamanData[];
  isLoading?: boolean;
}

function PeminjamanList({
  filter,
  searchTerm,
  data,
  isLoading = false,
}: PeminjamanListProps) {
  const filteredPeminjaman = data.filter((peminjaman) => {
    // Filter by type
    const matchesType =
      filter.type === 'all' || peminjaman.type === filter.type;

    // Filter by search term (search in user name and property)
    const matchesSearch =
      peminjaman.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      peminjaman.properti.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesType && matchesSearch;
  });

  if (isLoading) {
    return (
      <div className="mb-20 flex w-full flex-col gap-3 lg:mb-5 lg:gap-5">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="h-fit w-full rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="size-11 animate-pulse rounded-full bg-gray-200" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-32 animate-pulse rounded bg-gray-200" />
                <div className="h-3 w-48 animate-pulse rounded bg-gray-200" />
              </div>
              <div className="h-6 w-16 animate-pulse rounded-full bg-gray-200" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="mb-20 flex w-full flex-col gap-3 lg:mb-5 lg:gap-5">
      {filteredPeminjaman.length > 0 ? (
        filteredPeminjaman.map((peminjaman) => (
          <PeminjamanItem key={peminjaman.id} item={peminjaman} />
        ))
      ) : (
        <div className="flex h-32 items-center justify-center text-gray-500">
          <p>Tidak ada data peminjaman yang sesuai dengan filter</p>
        </div>
      )}
    </div>
  );
}

export default PeminjamanList;
