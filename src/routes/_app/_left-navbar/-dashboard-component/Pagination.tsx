import { ChevronLeft, ChevronRight } from 'lucide-react';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
  totalEntries?: number;
  entriesPerPage?: number;
};

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  className = '',
  totalEntries = 190,
  entriesPerPage = 10,
}: PaginationProps) => {
  const startEntry = (currentPage - 1) * entriesPerPage + 1;
  const endEntry = Math.min(currentPage * entriesPerPage, totalEntries);

  const renderPageNumbers = () => {
    const pages = [];

    for (let i = 1; i <= Math.min(3, totalPages); i++) {
      pages.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`size-8 rounded font-inter text-sm ${
            currentPage === i
              ? 'bg-black text-white'
              : 'border hover:bg-gray-50'
          }`}
        >
          {i}
        </button>,
      );
    }

    if (totalPages > 4) {
      pages.push(
        <span
          key="ellipsis"
          className="flex h-8 items-center px-2 font-inter text-sm"
        >
          ...
        </span>,
      );
      pages.push(
        <button
          key={totalPages}
          onClick={() => onPageChange(totalPages)}
          className={`size-8 rounded font-inter text-sm ${
            currentPage === totalPages
              ? 'bg-black text-white'
              : 'border hover:bg-gray-50'
          }`}
        >
          {totalPages}
        </button>,
      );
    }

    if (totalPages === 4) {
      pages.push(
        <button
          key={4}
          onClick={() => onPageChange(4)}
          className={`size-8 rounded font-inter text-sm ${
            currentPage === 4
              ? 'bg-black text-white'
              : 'border hover:bg-gray-50'
          }`}
        >
          {4}
        </button>,
      );
    }

    return pages;
  };

  return (
    <div
      className={`flex items-center gap-4 border-t p-4 ${className}`}
    >
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="rounded-lg border p-2 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ChevronLeft size={16} />
        </button>

        <div className="flex gap-2">{renderPageNumbers()}</div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="rounded-lg border p-2 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ChevronRight size={16} />
        </button>
      </div>
      <div className="font-inter text-sm text-black">
        Entri {startEntry} - {endEntry} dari {totalEntries}
      </div>
    </div>
  );
};