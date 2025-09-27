import { CheckCheck, Download, CalendarSearch } from 'lucide-react';
import { ChevronRight } from 'lucide-react';
import * as Select from '@radix-ui/react-select';
import * as ToggleGroup from '@radix-ui/react-toggle-group';

type TableActionsBarProps = {
  selectedCount: number;
  onSelectAll: () => void;
  allSelected: boolean;
  onExport: () => void;
  onBulkChange: (value: string) => void;
  filterJenis: string;
  onFilterChange: (value: string) => void;
  onPeriodClick: () => void;
};

export const TableActionsBar = ({
  selectedCount,
  onSelectAll,
  allSelected,
  onExport,
  onBulkChange,
  filterJenis,
  onFilterChange,
  onPeriodClick,
}: TableActionsBarProps) => {
  return (
    <div className="flex flex-col justify-between gap-4 border-b bg-white p-4 md:flex-row md:items-center">
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={onSelectAll}
          className="flex items-center gap-2 rounded-lg border px-3 py-2 font-inter text-sm font-medium hover:bg-gray-50"
        >
          <CheckCheck size={16} />
          {allSelected ? 'Batalkan Semua' : 'Pilih Semua'}
        </button>
        <button
          onClick={onExport}
          className="flex items-center gap-2 rounded-lg border px-3 py-2 font-inter text-sm font-medium hover:bg-gray-50"
        >
          <Download size={16} />
          Export
        </button>

        <Select.Root onValueChange={onBulkChange}>
          <Select.Trigger className="flex min-w-[180px] items-center gap-2 rounded-lg border px-3 py-2 font-inter text-sm font-medium hover:bg-gray-50">
            <Select.Value placeholder="Ubah jenis menjadi..." />
            <Select.Icon>
              <ChevronRight size={16} />
            </Select.Icon>
          </Select.Trigger>
          <Select.Portal>
            <Select.Content className="z-50 rounded-lg border bg-white p-1 shadow-lg">
              <Select.Item
                value="kompetisi"
                className="cursor-pointer rounded px-3 py-2 font-inter hover:bg-gray-100"
              >
                <Select.ItemText>Kompetisi</Select.ItemText>
              </Select.Item>
              <Select.Item
                value="organisasi"
                className="cursor-pointer rounded px-3 py-2 font-inter hover:bg-gray-100"
              >
                <Select.ItemText>Organisasi</Select.ItemText>
              </Select.Item>
              <Select.Item
                value="kepanitiaan"
                className="cursor-pointer rounded px-3 py-2 font-inter hover:bg-gray-100"
              >
                <Select.ItemText>Kepanitiaan</Select.ItemText>
              </Select.Item>
            </Select.Content>
          </Select.Portal>
        </Select.Root>

        {selectedCount > 0 && (
          <span className="font-inter text-sm text-gray-600">
            {selectedCount} item terpilih
          </span>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <span className="font-inter text-sm font-medium">filter:</span>
        <ToggleGroup.Root
          type="single"
          value={filterJenis}
          onValueChange={onFilterChange}
          className="flex gap-1"
        >
          <ToggleGroup.Item
            value="kompetisi"
            className="rounded-lg border px-3 py-2 font-inter text-sm hover:bg-gray-50 data-[state=on]:bg-blue-100 data-[state=on]:text-blue-700"
          >
            Kompetisi
          </ToggleGroup.Item>
          <ToggleGroup.Item
            value="organisasi"
            className="rounded-lg border px-3 py-2 font-inter text-sm hover:bg-gray-50 data-[state=on]:bg-blue-100 data-[state=on]:text-blue-700"
          >
            Organisasi
          </ToggleGroup.Item>
          <ToggleGroup.Item
            value="kepanitiaan"
            className="rounded-lg border px-3 py-2 font-inter text-sm hover:bg-gray-50 data-[state=on]:bg-blue-100 data-[state=on]:text-blue-700"
          >
            Kepanitiaan
          </ToggleGroup.Item>
        </ToggleGroup.Root>

        <button
          onClick={onPeriodClick}
          className="flex items-center gap-2 rounded-lg border px-3 py-2 font-inter text-sm font-medium hover:bg-gray-50"
        >
          <CalendarSearch size={16} />
          Pilih Periode
        </button>
      </div>
    </div>
  );
};
