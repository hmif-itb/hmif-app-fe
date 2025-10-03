import { Check } from 'lucide-react';
import * as Avatar from '@radix-ui/react-avatar';
import * as Checkbox from '@radix-ui/react-checkbox';
import { PeoplePrestasiData } from '../-constant';

type TableRowProps = {
  prestasi: PeoplePrestasiData;
  isSelected: boolean;
  onSelect: () => void;
};

const getJenisBadgeColor = (jenis: string) => {
  const lowerJenis = jenis.toLowerCase();
  if (lowerJenis === 'cp') return 'bg-[#D3E1FE] text-blue-800';
  if (lowerJenis === 'ctf') return 'bg-[#FFF4D6] text-yellow-800';
  if (lowerJenis === 'hackatahon') return 'bg-[#FFE4E1] text-red-800';
  return 'bg-gray-200 text-gray-800';
};

export const TableRow = ({ prestasi, isSelected, onSelect }: TableRowProps) => {
  return (
    <div className="flex items-center gap-4 border-b bg-[#FFFFFF] p-4 font-inter text-sm hover:bg-gray-100">
      <Checkbox.Root
        checked={isSelected}
        onCheckedChange={onSelect}
        className="flex size-6 items-center justify-center rounded border border-gray-300 data-[state=checked]:border-[#419E6A] data-[state=checked]:bg-[#419E6A]"
      >
        <Checkbox.Indicator>
          <Check size={20} className="text-black" strokeWidth={7} />
        </Checkbox.Indicator>
      </Checkbox.Root>

      <div className="grid flex-1 grid-cols-11 gap-4 lg:grid-cols-10 lg:gap-4">
        <div className="col-span-3 flex items-center lg:col-span-2 lg:ml-4 lg:gap-8">
          <Avatar.Root className="flex size-8 items-center justify-center rounded-full bg-[#E8C55F] lg:size-8">
            <Avatar.Fallback className="text-xs font-medium text-white">
              {prestasi.avatar}
            </Avatar.Fallback>
          </Avatar.Root>
          <span className="truncate pl-3 lg:pl-0">{prestasi.nama}</span>
        </div>

        <div className="col-span-3 truncate pt-2" title={prestasi.namaPrestasi}>
          {prestasi.namaPrestasi}
        </div>

        <div className="col-span-1 mx-auto pt-2">
          <span
            className={`inline-block min-w-24 rounded-full px-2 py-1 text-center text-xs ${getJenisBadgeColor(prestasi.jenisPrestasi)}`}
          >
            {prestasi.jenisPrestasi}
          </span>
        </div>

        <div
          className="col-span-3 truncate pl-8 pt-2"
          title={prestasi.namaOrganisasi}
        >
          {prestasi.namaOrganisasi}
        </div>

        <div className="col-span-1 truncate pt-2" title={prestasi.periode}>
          {prestasi.periode}
        </div>
      </div>
    </div>
  );
};
