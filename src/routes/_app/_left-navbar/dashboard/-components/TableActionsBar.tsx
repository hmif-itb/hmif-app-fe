import { CheckCheck, Download, Trash2 } from 'lucide-react';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { DatePeriodPicker } from '../../-dashboard-component/DatePeriodPicker';
import {
  KategoriDropdown,
  DropdownOption,
} from '../../-dashboard-component/KategoriDropdown';

type TableActionsBarProps = {
  selectedCount: number;
  onSelectAll: () => void;
  allSelected: boolean;
  onExport: () => void;
  onBulkChange: (value: string) => void;
  onDelete: () => void;
  filterJenis: string;
  onFilterChange: (value: string) => void;
  onPeriodChange?: (from: string, to: string) => void;
  onSearchChange?: (value: string) => void; // Add search handler
  search?: string; // Add search value
};

const jenisPrestasiOptions: DropdownOption[] = [
  { value: 'all', label: 'Semua Jenis' },
  { value: 'kompetisi', label: 'Kompetisi' },
  { value: 'organisasi', label: 'Organisasi' },
  { value: 'kepanitiaan', label: 'Kepanitiaan' },
];

export const TableActionsBar = ({
  selectedCount,
  onSelectAll,
  allSelected,
  onExport,
  onBulkChange,
  onDelete,
  filterJenis,
  onFilterChange,
  onPeriodChange,
  onSearchChange,
  search,
}: TableActionsBarProps) => {
  return (
    <div className="flex flex-col justify-between gap-4 bg-[#FFFFFF] py-4 pl-3 md:flex-row md:items-center lg:pl-4">
      <div className="order-2 flex flex-wrap items-center gap-2 md:order-1">
        <div className="relative w-full md:w-auto">
          <input
            className="w-full rounded-lg border border-gray-300 p-2 pr-10 md:w-64"
            type="text"
            value={search}
            onChange={(e) => onSearchChange?.(e.target.value)}
            placeholder="Cari nama atau prestasi"
          />
          <svg
            className="absolute right-3 top-1/2 size-5 -translate-y-1/2 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <button
          onClick={onDelete}
          className="flex items-center gap-1.5 rounded-full border border-black px-2 py-1.5 font-inter text-xs font-medium hover:bg-gray-50 md:gap-2 md:px-3 md:py-2 md:text-sm"
        >
          <Trash2 size={14} className="md:hidden" />
          <Trash2 size={16} className="hidden md:block" />
          Hapus
        </button>
        <button
          onClick={onSelectAll}
          className="flex items-center gap-1.5 rounded-full border border-black px-2 py-1.5 font-inter text-xs font-medium hover:bg-gray-50 md:gap-2 md:px-3 md:py-2 md:text-sm"
        >
          <CheckCheck size={14} className="md:hidden" />
          <CheckCheck size={16} className="hidden md:block" />
          {allSelected ? 'Batalkan Semua' : 'Pilih Semua'}
        </button>
        <button
          onClick={onExport}
          className="flex items-center gap-1.5 rounded-full border border-black px-2 py-1 font-inter text-xs font-medium hover:bg-gray-50 md:gap-2 md:px-3 md:py-2 md:text-sm"
        >
          <Download size={14} className="md:hidden" />
          <Download size={16} className="hidden md:block" />
          Export
        </button>
        <KategoriDropdown
          value={filterJenis}
          onChange={onFilterChange}
          options={jenisPrestasiOptions}
          placeholder="Pilih Jenis Prestasi"
          placeholderMobile="Pilih Jenis ..."
        />
        {selectedCount > 0 && (
          <span className="font-inter text-sm text-gray-600">
            {selectedCount} item terpilih
          </span>
        )}
      </div>

      <p className="block font-inter text-sm font-medium lg:hidden">filter:</p>
      <div className="relative order-1 mx-auto flex flex-wrap items-center gap-2 md:order-2 md:gap-4 lg:justify-between">
        <span className="hidden font-inter text-sm font-medium lg:block">
          filter:
        </span>
        <DatePeriodPicker
          onPeriodChange={onPeriodChange}
          className="order-1 lg:relative lg:-right-52 lg:order-2"
        />
        <ToggleGroup.Root
          type="single"
          value={filterJenis === 'all' ? undefined : filterJenis}
          onValueChange={(value) => onFilterChange(value || 'all')}
          className="order-2 flex lg:order-1"
        >
          <ToggleGroup.Item
            value="kompetisi"
            className="rounded-l-lg border border-r-0 px-2 py-1 font-inter text-xs font-medium hover:bg-gray-50 data-[state=on]:bg-blue-100 data-[state=on]:text-blue-700 md:px-3 md:py-2 md:text-sm"
          >
            Kompetisi
          </ToggleGroup.Item>
          <ToggleGroup.Item
            value="organisasi"
            className="border px-2 py-1 font-inter text-xs font-medium hover:bg-gray-50 data-[state=on]:bg-blue-100 data-[state=on]:text-blue-700 md:px-3 md:py-2 md:text-sm"
          >
            Organisasi
          </ToggleGroup.Item>
          <ToggleGroup.Item
            value="kepanitiaan"
            className="rounded-r-lg border border-l-0 px-2 py-1 font-inter text-xs font-medium hover:bg-gray-50 data-[state=on]:bg-blue-100 data-[state=on]:text-blue-700 md:px-3 md:py-2 md:text-sm"
          >
            Kepanitiaan
          </ToggleGroup.Item>
        </ToggleGroup.Root>
      </div>
    </div>
  );
};
