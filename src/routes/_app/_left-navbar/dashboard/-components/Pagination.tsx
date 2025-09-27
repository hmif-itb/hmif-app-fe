import { ChevronLeft, ChevronRight } from 'lucide-react';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const renderPageNumbers = () => {
    const pages = [];

    for (let i = 1; i <= Math.min(3, totalPages); i++) {
      pages.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`size-8 rounded font-inter ${
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
        <span key="ellipsis" className="px-2 font-inter">
          ...
        </span>,
      );
      pages.push(
        <button
          key={totalPages}
          onClick={() => onPageChange(totalPages)}
          className={`size-8 rounded font-inter ${
            currentPage === totalPages
              ? 'bg-black text-white'
              : 'border hover:bg-gray-50'
          }`}
        >
          {totalPages}
        </button>,
      );
    }
    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-2 border-t p-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="rounded-lg border p-2 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <ChevronLeft size={16} />
      </button>
      <div className="flex gap-1">{renderPageNumbers()}</div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="rounded-lg border p-2 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
};
