import { Check, Pencil, Trash } from 'lucide-react';
import * as Avatar from '@radix-ui/react-avatar';
import * as Checkbox from '@radix-ui/react-checkbox';
import { PrestasiData } from '../-constant';

type TableRowProps = {
  prestasi: PrestasiData;
  isSelected: boolean;
  onSelect: () => void;
  onEdit: () => void;
  onDelete: () => void;
};

export const TableRow = ({
  prestasi,
  isSelected,
  onSelect,
  onEdit,
  onDelete,
}: TableRowProps) => {
  return (
    <div className="grid grid-cols-12 gap-4 border-b bg-white p-4 font-inter text-sm hover:bg-gray-100">
      <div className="col-span-1  flex items-center">
        <Checkbox.Root
          checked={isSelected}
          onCheckedChange={onSelect}
          className="flex size-4 items-center justify-center rounded border border-gray-300 data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600"
        >
          <Checkbox.Indicator>
            <Check size={12} className="text-white" />
          </Checkbox.Indicator>
        </Checkbox.Root>
      </div>

      <div className="col-span-2 flex items-center gap-2">
        <Avatar.Root className="flex size-8 items-center justify-center rounded-full bg-yellow-400">
          <Avatar.Fallback className="text-sm font-medium text-white">
            {prestasi.avatar}
          </Avatar.Fallback>
        </Avatar.Root>
        <span className="truncate">{prestasi.nama}</span>
      </div>

      <div className="col-span-3 truncate" title={prestasi.namaPrestasi}>
        {prestasi.namaPrestasi}
      </div>

      <div className="col-span-2">
        <span className="inline-block min-w-24 rounded-full bg-[#D3E1FE] px-2 py-1 text-center text-xs text-blue-800">
          {prestasi.jenisPrestasi}
        </span>
      </div>

      <div className="col-span-3 truncate" title={prestasi.namaOrganisasi}>
        {prestasi.namaOrganisasi}
      </div>

      <div className="col-span-1 flex items-center gap-1">
        <button
          onClick={onEdit}
          className="rounded p-1 hover:bg-gray-200"
          title="Edit"
        >
          <Pencil size={16} color="black" />
        </button>
        <button
          onClick={onDelete}
          className="rounded p-1 text-red-600 hover:bg-red-100"
          title="Hapus"
        >
          <Trash size={16} color="black" />
        </button>
      </div>
    </div>
  );
};
