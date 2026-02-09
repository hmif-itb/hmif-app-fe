import React from 'react';
import { RequestItem } from './RequestItem';
import { RequestData } from '../../../-types';
import { FilterOptions } from './FilterModal';

interface RequestListProps {
  filter: FilterOptions;
  searchTerm: string;
  data: RequestData[];
  isLoading?: boolean;
}

function RequestList({
  filter,
  searchTerm,
  data,
  isLoading = false,
}: RequestListProps) {
  if (isLoading) {
    return (
      <div className="mb-5 flex w-full flex-col gap-3 lg:gap-5">
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

  if (data.length === 0) {
    return (
      <div className="mb-5 flex w-full items-center justify-center py-10">
        <p className="text-lg text-white/80">Tidak ada data request</p>
      </div>
    );
  }

  return (
    <div className="mb-5 flex w-full flex-col gap-3 lg:gap-5">
      {data.map((request) => (
        <RequestItem key={request.id} request={request} />
      ))}
    </div>
  );
}

export default RequestList;
