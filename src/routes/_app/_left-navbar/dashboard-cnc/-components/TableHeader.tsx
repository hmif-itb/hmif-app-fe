import * as Checkbox from '@radix-ui/react-checkbox';
import { Check } from 'lucide-react';

type TableHeaderProps = {
  onSelectAll: () => void;
  allSelected: boolean;
};

export const TableHeader = ({ onSelectAll, allSelected }: TableHeaderProps) => {
  return (
    <div className="flex items-center gap-2 bg-[#F8F8FA] p-3 font-inter text-xs font-medium md:gap-4 md:p-4 md:text-sm">
      <Checkbox.Root
        checked={allSelected}
        onCheckedChange={onSelectAll}
        className="flex size-5 shrink-0 items-center justify-center rounded border border-gray-300 data-[state=checked]:border-[#419E6A] data-[state=checked]:bg-[#419E6A] md:size-6"
      >
        <Checkbox.Indicator>
          <Check size={16} className="text-black md:size-5" strokeWidth={8} />
        </Checkbox.Indicator>
      </Checkbox.Root>

      <div className="grid flex-1 grid-cols-11 gap-2 md:grid-cols-10 md:gap-4">
        <div className="col-span-3 flex items-center justify-center md:col-span-2">
          <span className="text-xs md:text-sm text-center">Profil</span>
        </div>
        <div className="col-span-3 flex items-center justify-center md:col-span-3">
          <span className="text-xs md:text-sm text-center">Nama Prestasi</span>
        </div>
        <div className="col-span-2 flex items-center justify-center md:col-span-2">
          <span className="text-xs md:text-sm text-center">Jenis Perlombaan</span>
        </div>
        <div className="col-span-2 flex items-center justify-center md:col-span-2">
          <span className="text-xs md:text-sm text-center">Nama Organisasi / Perlombaan</span>
        </div>
        <div className="col-span-1 flex items-center justify-center">
          <span className="text-xs md:text-sm text-center">Periode</span>
        </div>
      </div>
    </div>
  );
};
