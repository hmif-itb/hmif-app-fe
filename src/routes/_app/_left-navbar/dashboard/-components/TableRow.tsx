import { Check, Pencil, Trash } from 'lucide-react';
import * as Avatar from '@radix-ui/react-avatar';
import * as Checkbox from '@radix-ui/react-checkbox';
import { Prestasi } from '~/api/generated';
import { useNavigate } from '@tanstack/react-router';

type TableRowProps = {
  prestasi: Prestasi;
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
  const navigate = useNavigate();

  // Derive avatar initials from user.fullName
  const getAvatarInitials = (fullName: string) => {
    const names = fullName.split(' ');
    return names.length > 1
      ? `${names[0][0]}${names[1][0]}`
      : fullName.slice(0, 2).toUpperCase();
  };

  // Navigate to detail page when row is clicked
  const handleRowClick = (e: React.MouseEvent) => {
    // Prevent navigation when clicking on checkbox or action buttons
    const target = e.target as HTMLElement;
    const isCheckbox = target.closest('[role="checkbox"]');
    const isButton = target.closest('button');

    if (!isCheckbox && !isButton) {
      navigate({
        to: '/dashboard/detail/$id',
        params: { id: prestasi.id },
      });
    }
  };

  return (
    <div
      onClick={handleRowClick}
      className="flex cursor-pointer items-center gap-4 border-b bg-[#FFFFFF] p-4 font-inter text-sm transition-colors hover:bg-gray-50"
    >
      <Checkbox.Root
        checked={isSelected}
        onCheckedChange={onSelect}
        className="flex size-6 items-center justify-center rounded border border-gray-300 data-[state=checked]:border-[#419E6A] data-[state=checked]:bg-[#419E6A]"
        onClick={(e) => e.stopPropagation()}
      >
        <Checkbox.Indicator>
          <Check size={20} className="text-black" strokeWidth={7} />
        </Checkbox.Indicator>
      </Checkbox.Root>

      <div className="grid flex-1 grid-cols-11 gap-4 lg:grid-cols-10 lg:gap-4">
        <div className="col-span-3 flex items-center lg:col-span-2 lg:ml-4 lg:gap-8">
          <Avatar.Root className="flex size-8 items-center justify-center rounded-full bg-[#E8C55F] lg:size-8">
            <Avatar.Fallback className="text-xs font-medium text-white">
              {getAvatarInitials(prestasi.user?.fullName || 'N/A')}
            </Avatar.Fallback>
          </Avatar.Root>
          <span className="truncate pl-3 lg:pl-0">
            {prestasi.user?.fullName || 'N/A'}
          </span>
        </div>

        <div
          className="col-span-3 truncate pt-2"
          title={prestasi.deskripsi ?? 'N/A'}
        >
          {prestasi.deskripsi}
        </div>

        <div className="col-span-1 pt-2">
          <span className="mx-auto inline-block min-w-24 rounded-full bg-[#D3E1FE] px-2 py-1 text-center text-xs text-blue-800">
            {prestasi.jenisPrestasi}
          </span>
        </div>

        <div
          className="col-span-3 truncate pl-7 pt-2 lg:pl-0"
          title={prestasi.penyelenggara}
        >
          {prestasi.penyelenggara}
        </div>

        <div className="col-span-1 flex items-center gap-1 pt-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
            className="rounded p-1 hover:bg-gray-200"
            title="Edit"
          >
            <Pencil size={16} color="black" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="rounded p-1 text-red-600 hover:bg-red-100"
            title="Hapus"
          >
            <Trash size={16} color="black" />
          </button>
        </div>
      </div>
    </div>
  );
};
