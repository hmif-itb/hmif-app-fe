import { X } from 'lucide-react';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilter: (filter: FilterOptions) => void;
  currentFilter: FilterOptions;
}

export interface FilterOptions {
  category: 'all' | 'sekre' | 'properti';
}

export function FilterModal({
  isOpen,
  onClose,
  onApplyFilter,
  currentFilter,
}: FilterModalProps) {
  if (!isOpen) return null;

  const handleApply = (category: 'all' | 'sekre' | 'properti') => {
    onApplyFilter({ category });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative mx-[30px] w-[300px] rounded-[15px] bg-white p-6 shadow-xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1 transition-colors hover:bg-gray-100"
        >
          <X size={20} className="text-[#1D1B20]" />
        </button>

        {/* Title */}
        <h2 className="mb-4 text-center text-lg font-semibold text-black">
          Filter Kategori
        </h2>

        {/* Filter Options */}
        <div className="flex flex-col gap-3">
          <button
            onClick={() => handleApply('all')}
            className={`rounded-lg border px-4 py-3 text-left transition-colors ${
              currentFilter.category === 'all'
                ? 'border-[#305138] bg-[#305138] text-white'
                : 'border-gray-300 text-black hover:bg-gray-50'
            }`}
          >
            Semua Kategori
          </button>

          <button
            onClick={() => handleApply('sekre')}
            className={`rounded-lg border px-4 py-3 text-left transition-colors ${
              currentFilter.category === 'sekre'
                ? 'border-[#305138] bg-[#305138] text-white'
                : 'border-gray-300 text-black hover:bg-gray-50'
            }`}
          >
            Sekre
          </button>

          <button
            onClick={() => handleApply('properti')}
            className={`rounded-lg border px-4 py-3 text-left transition-colors ${
              currentFilter.category === 'properti'
                ? 'border-[#305138] bg-[#305138] text-white'
                : 'border-gray-300 text-black hover:bg-gray-50'
            }`}
          >
            Properti
          </button>
        </div>
      </div>
    </div>
  );
}
