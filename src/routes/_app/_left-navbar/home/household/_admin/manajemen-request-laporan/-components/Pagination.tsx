import React from 'react';
import { Button } from '~/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  isLoading = false,
}: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const showEllipsis = totalPages > 7;

    if (!showEllipsis) {
      // Show all pages if total is 7 or less
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage > 3) {
        pages.push('...');
      }

      // Show pages around current page
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push('...');
      }

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-2 pb-20 lg:pb-5">
      <Button
        variant="outlined"
        size="icon-sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1 || isLoading}
        className="size-8 rounded-lg border-white bg-white/10 text-white hover:bg-white/20 hover:text-white disabled:opacity-50 lg:size-10"
      >
        <ChevronLeft className="size-4 lg:size-5" />
      </Button>

      <div className="flex items-center gap-1 lg:gap-2">
        {getPageNumbers().map((page, index) => {
          if (page === '...') {
            return (
              <span
                key={`ellipsis-${index}`}
                className="px-2 text-sm text-white lg:text-base"
              >
                ...
              </span>
            );
          }

          return (
            <Button
              key={page}
              variant={currentPage === page ? 'solid' : 'outlined'}
              size="icon-sm"
              onClick={() => onPageChange(page as number)}
              disabled={isLoading}
              className={`size-8 rounded-lg text-sm lg:size-10 lg:text-base ${
                currentPage === page
                  ? 'bg-white text-[#30764B] hover:bg-white/90'
                  : 'border-white bg-white/10 text-white hover:bg-white/20 hover:text-white'
              }`}
            >
              {page}
            </Button>
          );
        })}
      </div>

      <Button
        variant="outlined"
        size="icon-sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages || isLoading}
        className="size-8 rounded-lg border-white bg-white/10 text-white hover:bg-white/20 hover:text-white disabled:opacity-50 lg:size-10"
      >
        <ChevronRight className="size-4 lg:size-5" />
      </Button>
    </div>
  );
}

export default Pagination;
