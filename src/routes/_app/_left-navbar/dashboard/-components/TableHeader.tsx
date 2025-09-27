import * as Checkbox from '@radix-ui/react-checkbox';
import { Check } from 'lucide-react';

type TableHeaderProps = {
  onSelectAll: () => void;
  allSelected: boolean;
};

export const TableHeader = ({ onSelectAll, allSelected }: TableHeaderProps) => {
  return (
    <div className="grid grid-cols-12 gap-4 border-b bg-[#F8F8FA] p-4 font-inter text-sm font-medium ">
      <div className="col-span-1 flex items-center">
        <Checkbox.Root
          checked={allSelected}
          onCheckedChange={onSelectAll}
          className="flex size-4 items-center justify-center rounded border border-gray-300 data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600"
        >
          <Checkbox.Indicator>
            <Check size={12} className="text-white" />
          </Checkbox.Indicator>
        </Checkbox.Root>
      </div>
      <div className="col-span-2">Profil</div>
      <div className="col-span-3">Nama Prestasi</div>
      <div className="col-span-2">Jenis Prestasi</div>
      <div className="col-span-3">Nama Organisasi / Perlombaan</div>
      <div className="col-span-1">Aksi</div>
    </div>
  );
};
