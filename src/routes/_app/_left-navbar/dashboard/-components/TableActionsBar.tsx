import { CheckCheck, Download, Trash2 } from 'lucide-react';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { DropdownCalendar } from '../../-dashboard-component/MonthlyCalendar';
import {
  KategoriDropdown,
  DropdownOption,
} from '../../-dashboard-component/KategoriDropdown';
import { useState } from 'react';

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
  onDelete,
  filterJenis,
  onFilterChange,
  onPeriodChange,
}: TableActionsBarProps) => {
  const [selectedPeriod, setSelectedPeriod] = useState('');

  const handlePeriodSelect = (month: string, year: number) => {
    const periodText = `${month} ${year}`;
    setSelectedPeriod(periodText);
    
    const monthMap: Record<string, number> = {
      'Januari': 1, 'Februari': 2, 'Maret': 3, 'April': 4, 'Mei': 5, 'Juni': 6,
      'Juli': 7, 'Agustus': 8, 'September': 9, 'Oktober': 10, 'November': 11, 'Desember': 12
    };
    
    const monthNum = monthMap[month];
    const formattedDate = `${year}-${monthNum.toString().padStart(2, '0')}`;
    
    if (onPeriodChange) {
      onPeriodChange(formattedDate, formattedDate);
    }
  };

  return (
    <div className="flex flex-col gap-3 bg-[#FFFFFF] p-3 md:flex-row md:items-center md:justify-between md:py-4 md:pl-4">
      {/* Left Side - Action Buttons */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={onDelete}
          className="flex items-center gap-1 rounded-full border border-black px-2 py-1 font-inter text-[10px] font-medium transition-colors hover:bg-gray-50 sm:gap-1.5 sm:px-2.5 sm:py-1.5 sm:text-xs md:gap-2 md:px-3 md:py-2 md:text-sm"
        >
          <Trash2 size={12} className="sm:size-3 md:size-4" />
          <span className="hidden sm:inline">Hapus</span>
        </button>
        <button
          onClick={onSelectAll}
          className="flex items-center gap-1 rounded-full border border-black px-2 py-1 font-inter text-[10px] font-medium transition-colors hover:bg-gray-50 sm:gap-1.5 sm:px-2.5 sm:py-1.5 sm:text-xs md:gap-2 md:px-3 md:py-2 md:text-sm"
        >
          <CheckCheck size={12} className="sm:size-3 md:size-4" />
          <span className="hidden sm:inline">{allSelected ? 'Batalkan Semua' : 'Pilih Semua'}</span>
          <span className="sm:hidden">{allSelected ? 'Batal' : 'Pilih'}</span>
        </button>
        <button
          onClick={onExport}
          className="flex items-center gap-1 rounded-full border border-black px-2 py-1 font-inter text-[10px] font-medium transition-colors hover:bg-gray-50 sm:gap-1.5 sm:px-2.5 sm:py-1.5 sm:text-xs md:gap-2 md:px-3 md:py-2 md:text-sm"
        >
          <Download size={12} className="sm:size-3 md:size-4" />
          <span className="hidden sm:inline">Export</span>
        </button>
        {/* <div className="w-full sm:w-auto">
          <KategoriDropdown
            value={filterJenis}
            onChange={onFilterChange}
            options={jenisPrestasiOptions}
            placeholder="Pilih Jenis Prestasi"
            placeholderMobile="Pilih Jenis ..."
          />
        </div> */}
        {selectedCount > 0 && (
          <span className="hidden text-[10px] text-gray-600 sm:inline sm:text-xs md:text-sm font-inter">
            {selectedCount} item terpilih
          </span>
        )}
      </div>

      {/* Right Side - Filter Buttons and Calendar (Calendar on most right) */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3 md:gap-4">
        {/* Toggle Group Buttons */}
        <span className="hidden font-inter text-xs font-medium sm:inline md:text-sm lg:block">
            filter:
        </span>
        <ToggleGroup.Root
          type="single"
          value={filterJenis === 'all' ? undefined : filterJenis}
          onValueChange={(value) => onFilterChange(value || 'all')}
          className="flex w-full sm:w-auto"
        >
          <ToggleGroup.Item
            value="kompetisi"
            className="flex-1 rounded-l-lg border border-r-0 px-1.5 py-1 font-inter text-[10px] font-medium transition-colors hover:bg-gray-50 data-[state=on]:bg-blue-100 data-[state=on]:text-blue-700 sm:flex-none sm:px-2 sm:py-1 sm:text-xs md:px-3 md:py-2 md:text-sm"
          >
            <span className="hidden sm:inline">Kompetisi</span>
            <span className="sm:hidden">Kom</span>
          </ToggleGroup.Item>
          <ToggleGroup.Item
            value="organisasi"
            className="flex-1 border px-1.5 py-1 font-inter text-[10px] font-medium transition-colors hover:bg-gray-50 data-[state=on]:bg-blue-100 data-[state=on]:text-blue-700 sm:flex-none sm:px-2 sm:py-1 sm:text-xs md:px-3 md:py-2 md:text-sm"
          >
            <span className="hidden sm:inline">Organisasi</span>
            <span className="sm:hidden">Org</span>
          </ToggleGroup.Item>
          <ToggleGroup.Item
            value="kepanitiaan"
            className="flex-1 rounded-r-lg border border-l-0 px-1.5 py-1 font-inter text-[10px] font-medium transition-colors hover:bg-gray-50 data-[state=on]:bg-blue-100 data-[state=on]:text-blue-700 sm:flex-none sm:px-2 sm:py-1 sm:text-xs md:px-3 md:py-2 md:text-sm"
          >
            <span className="hidden sm:inline">Kepanitiaan</span>
            <span className="sm:hidden">Kep</span>
          </ToggleGroup.Item>
        </ToggleGroup.Root>

        {/* Filter Label and Calendar Container */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Monthly Calendar - Most Right */}
          <div className="flex-1 sm:flex-none sm:w-auto">
            <DropdownCalendar
              placeholder="Pilih Periode"
              onSelect={handlePeriodSelect}
              value={selectedPeriod}
              className="w-full sm:w-[160px] md:w-[180px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
