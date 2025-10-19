import { CheckCheck, Download } from 'lucide-react';
import { DropdownCalendar } from '../../home/prestasi/-components/monthly-calendar';
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
  onDelete: () => void;
  filterKategori: string;
  onFilterChange: (value: string) => void;
  onPeriodChange?: (from: string, to: string) => void;
};

const kategoriOptions: DropdownOption[] = [
  { value: 'all', label: 'Semua Kategori' },
  { value: 'hackatahon', label: 'Hackathon' },
  { value: 'ctf', label: 'CTF' },
  { value: 'cp', label: 'CP' },
  { value: 'lainnya', label: 'Lainnya' },
];

export const TableActionsBar = ({
  selectedCount,
  onSelectAll,
  allSelected,
  onExport,
  onDelete,
  filterKategori,
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
    const formattedDate = `${monthNum.toString().padStart(2, '0')}/${year}`;
    
    if (onPeriodChange) {
      onPeriodChange(formattedDate, formattedDate);
    }
  };
  return (
    <div className="flex flex-col gap-4 bg-[#FFFFFF] py-4 pl-3 lg:flex-row lg:items-center lg:justify-between lg:pl-4">
      {/* Mobile: Filter label */}
      <p className="block font-inter text-sm font-medium lg:hidden">filter:</p>

      {/* Mobile: Filter container (Dropdown + Period) */}
      <div className="flex items-center gap-2 lg:hidden">
        <KategoriDropdown
          value={filterKategori}
          onChange={onFilterChange}
          options={kategoriOptions}
          placeholder="Pilih jenis kompetisi"
          placeholderMobile="Pilih jenis ..."
        />
        <DropdownCalendar
          placeholder="Pilih Periode"
          onSelect={handlePeriodSelect}
          value={selectedPeriod}
        />
      </div>

      {/* Mobile: Actions container (Select all + Export) */}
      <div className="flex flex-wrap items-center gap-2 lg:hidden">
        <button
          onClick={onSelectAll}
          className="flex items-center gap-1.5 rounded-full border border-black px-2 py-1.5 font-inter text-xs font-medium hover:bg-gray-50"
        >
          <CheckCheck size={14} />
          {allSelected ? 'Batalkan Semua' : 'Pilih Semua'}
        </button>
        <button
          onClick={onExport}
          className="flex items-center gap-1.5 rounded-full border border-black px-2 py-1 font-inter text-xs font-medium hover:bg-gray-50"
        >
          <Download size={14} />
          Export entri terpilih
        </button>

        {selectedCount > 0 && (
          <span className="font-inter text-sm text-gray-600">
            {selectedCount} item terpilih
          </span>
        )}
      </div>

      {/* Desktop: Left Section - Actions */}
      <div className="hidden items-center gap-2 lg:flex">
        <button
          onClick={onSelectAll}
          className="flex items-center gap-2 rounded-full border border-black px-3 py-2 font-inter text-sm font-medium hover:bg-gray-50"
        >
          <CheckCheck size={16} />
          {allSelected ? 'Batalkan Semua' : 'Pilih Semua'}
        </button>
        <button
          onClick={onExport}
          className="flex items-center gap-2 rounded-full border border-black px-3 py-2 font-inter text-sm font-medium hover:bg-gray-50"
        >
          <Download size={16} />
          Export entri terpilih
        </button>

        {selectedCount > 0 && (
          <span className="font-inter text-sm text-gray-600">
            {selectedCount} item terpilih
          </span>
        )}
      </div>

      {/* Desktop: Right Section - Filters */}
      <div className="hidden items-center gap-3 lg:flex">
        <span className="font-inter text-sm font-medium">filter:</span>

        <KategoriDropdown
          value={filterKategori}
          onChange={onFilterChange}
          options={kategoriOptions}
          placeholder="Pilih jenis kompetisi"
          placeholderMobile="Pilih jenis ..."
        />

        <DropdownCalendar
          placeholder="Pilih Periode"
          onSelect={handlePeriodSelect}
          value={selectedPeriod}
        />
      </div>
    </div>
  );
};
