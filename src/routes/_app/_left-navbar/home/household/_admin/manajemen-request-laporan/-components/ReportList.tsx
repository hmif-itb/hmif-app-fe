import React from 'react';
import { ReportItem } from './ReportItem';
import { ReportData } from '../-api';
import { FilterOptions } from './FilterModal';

interface ReportListProps {
  filter: FilterOptions;
  searchTerm: string;
  data: ReportData[];
  isLoading?: boolean;
}

function ReportList({
  filter,
  searchTerm,
  data,
  isLoading = false,
}: ReportListProps) {
  const filteredReports = data.filter((report) => {
    // Filter by category
    const matchesCategory =
      filter.category === 'all' || report.category === filter.category;

    // Filter by search term (search in name and report content)
    const matchesSearch =
      report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (report.reportContent &&
        report.reportContent.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesCategory && matchesSearch;
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
            </div>
            <div className="mt-4 space-y-2">
              <div className="h-3 w-full animate-pulse rounded bg-gray-200" />
              <div className="h-3 w-3/4 animate-pulse rounded bg-gray-200" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (filteredReports.length === 0) {
    return <div></div>;
  }

  return (
    <div className="mb-20 flex w-full flex-col gap-3 lg:mb-5 lg:gap-5">
      {filteredReports.map((report) => (
        <ReportItem key={report.id} request={report} />
      ))}
    </div>
  );
}

export default ReportList;
