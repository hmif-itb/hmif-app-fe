import * as Checkbox from '@radix-ui/react-checkbox';
import { Check } from 'lucide-react';

type TableHeaderProps = {
  onSelectAll: () => void;
  allSelected: boolean;
};

export const TableHeader = ({ onSelectAll, allSelected }: TableHeaderProps) => {
  return (
    <div className="flex items-center gap-4 bg-[#F8F8FA] p-2 font-inter text-sm font-medium lg:p-4">
      <Checkbox.Root
        checked={allSelected}
        onCheckedChange={onSelectAll}
        className="relative left-2 flex size-6 items-center justify-center rounded border border-gray-300 data-[state=checked]:border-[#419E6A] data-[state=checked]:bg-[#419E6A] lg:left-0"
      >
        <Checkbox.Indicator>
          <Check size={20} className="text-black" strokeWidth={8} />
        </Checkbox.Indicator>
      </Checkbox.Root>

      <div className="grid flex-1 grid-cols-11 gap-4 lg:grid-cols-10">
        <div className="col-span-3 mx-auto lg:col-span-2">Profil</div>
        <div className="col-span-3 mx-auto">Nama Prestasi</div>
        <div className="col-span-1 mx-auto">Jenis Perlombaan</div>
        <div className="col-span-3 mx-auto">Nama Organisasi / Perlombaan</div>
        <div className="col-span-1 mx-auto">Periode</div>
      </div>
    </div>
  );
};
