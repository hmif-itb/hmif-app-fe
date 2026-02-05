import { X } from 'lucide-react';
import { useState } from 'react';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilter: (filter: FilterOptions) => void;
  currentFilter: FilterOptions;
  activeView: 'Request' | 'Laporan';
}

export interface FilterOptions {
  category: 'all' | 'sekre' | 'properti';
  status?:
    | 'all'
    | 'pending'
    | 'rejected'
    | 'accepted'
    | 'pending_return'
    | 'completed';
}

export function FilterModal({
  isOpen,
  onClose,
  onApplyFilter,
  currentFilter,
  activeView,
}: FilterModalProps) {
  const [selectedCategory, setSelectedCategory] = useState<
    'all' | 'sekre' | 'properti'
  >(currentFilter.category);
  const [selectedStatus, setSelectedStatus] = useState<
    'all' | 'pending' | 'rejected' | 'accepted' | 'pending_return' | 'completed'
  >(currentFilter.status || 'all');

  if (!isOpen) return null;

  const handleApply = () => {
    onApplyFilter({
      category: selectedCategory,
      status: selectedStatus === 'all' ? undefined : selectedStatus,
    });
    onClose();
  };

  const requestStatuses = [
    { value: 'all' as const, label: 'Semua Status' },
    { value: 'pending' as const, label: 'Pending' },
    { value: 'accepted' as const, label: 'Accepted' },
    { value: 'rejected' as const, label: 'Rejected' },
    { value: 'pending_return' as const, label: 'Pending Return' },
    { value: 'completed' as const, label: 'Completed' },
  ];

  const laporanStatuses = [
    { value: 'all' as const, label: 'Semua Status' },
    { value: 'pending' as const, label: 'Pending' },
    { value: 'accepted' as const, label: 'Accepted' },
    { value: 'rejected' as const, label: 'Rejected' },
  ];

  const statusOptions =
    activeView === 'Request' ? requestStatuses : laporanStatuses;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative mx-[30px] max-h-[70vh] w-[320px] overflow-y-auto rounded-[15px] bg-white p-6 shadow-xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1 transition-colors hover:bg-gray-100"
        >
          <X size={20} className="text-[#1D1B20]" />
        </button>

        {/* Title */}
        <h2 className="mb-4 text-center text-lg font-semibold text-black">
          Filter
        </h2>

        {/* Status Filter */}
        <div className="mb-4">
          <h3 className="mb-2 text-sm font-medium text-gray-700">Status</h3>
          <div className="flex flex-col gap-2">
            {statusOptions.map((status) => (
              <button
                key={status.value}
                onClick={() => setSelectedStatus(status.value)}
                className={`rounded-lg border px-4 py-2.5 text-left text-sm transition-colors ${
                  selectedStatus === status.value
                    ? 'border-[#305138] bg-[#305138] text-white'
                    : 'border-gray-300 text-black hover:bg-gray-50'
                }`}
              >
                {status.label}
              </button>
            ))}
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-4">
          <h3 className="mb-2 text-sm font-medium text-gray-700">Kategori</h3>
          <div className="flex flex-col gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`rounded-lg border px-4 py-2.5 text-left text-sm transition-colors ${
                selectedCategory === 'all'
                  ? 'border-[#305138] bg-[#305138] text-white'
                  : 'border-gray-300 text-black hover:bg-gray-50'
              }`}
            >
              Semua Kategori
            </button>

            <button
              onClick={() => setSelectedCategory('sekre')}
              className={`rounded-lg border px-4 py-2.5 text-left text-sm transition-colors ${
                selectedCategory === 'sekre'
                  ? 'border-[#305138] bg-[#305138] text-white'
                  : 'border-gray-300 text-black hover:bg-gray-50'
              }`}
            >
              Sekre
            </button>

            <button
              onClick={() => setSelectedCategory('properti')}
              className={`rounded-lg border px-4 py-2.5 text-left text-sm transition-colors ${
                selectedCategory === 'properti'
                  ? 'border-[#305138] bg-[#305138] text-white'
                  : 'border-gray-300 text-black hover:bg-gray-50'
              }`}
            >
              Properti
            </button>
          </div>
        </div>

        {/* Apply Button */}
        <button
          onClick={handleApply}
          className="w-full rounded-lg bg-[#305138] px-4 py-3 text-white transition-colors hover:bg-[#305138]/90"
        >
          Terapkan Filter
        </button>
      </div>
    </div>
  );
}
