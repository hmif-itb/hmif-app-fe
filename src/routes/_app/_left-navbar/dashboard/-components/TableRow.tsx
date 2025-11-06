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
      className="flex cursor-pointer items-center gap-2 border-b bg-[#FFFFFF] p-3 font-inter transition-colors hover:bg-gray-50 md:gap-4 md:p-4"
    >
      <Checkbox.Root
        checked={isSelected}
        onCheckedChange={onSelect}
        className="flex size-5 shrink-0 items-center justify-center rounded border border-gray-300 data-[state=checked]:border-[#419E6A] data-[state=checked]:bg-[#419E6A] md:size-6"
        onClick={(e) => e.stopPropagation()}
      >
        <Checkbox.Indicator>
          <Check size={16} className="text-black md:size-5" strokeWidth={7} />
        </Checkbox.Indicator>
      </Checkbox.Root>

      <div className="grid min-w-0 flex-1 grid-cols-11 gap-2 md:grid-cols-10 md:gap-4">
        {/* Profil - Center aligned to match header */}
        <div className="col-span-3 flex min-w-0 items-center justify-center gap-2 md:col-span-2 md:gap-3">
          <Avatar.Root className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#E8C55F] md:size-8">
            <Avatar.Fallback className="text-[10px] font-medium text-white md:text-xs">
              {getAvatarInitials(prestasi.user?.fullName || 'N/A')}
            </Avatar.Fallback>
          </Avatar.Root>
          <span className="min-w-0 truncate text-left text-xs text-gray-900 md:text-sm">
            {prestasi.user?.fullName || 'N/A'}
          </span>
        </div>

        {/* Nama Prestasi - Center aligned to match header */}
        <div
          className="col-span-3 flex min-w-0 items-center justify-center md:text-sm"
          title={prestasi.deskripsi ?? 'N/A'}
        >
          <span className="min-w-0 truncate text-left text-xs text-gray-900 md:text-sm">
            {prestasi.deskripsi}
          </span>
        </div>

        {/* Jenis Prestasi - Center aligned to match header */}
        <div className="col-span-1 flex items-center justify-center">
          <span className="inline-flex items-center justify-center rounded-full bg-[#D3E1FE] px-2 py-1 text-center text-[10px] font-medium text-blue-800 md:min-w-[80px] md:px-3 md:py-1.5 md:text-xs">
            {prestasi.jenisPrestasi}
          </span>
        </div>

        {/* Nama Organisasi/Perlombaan - Center aligned to match header */}
        <div
          className="col-span-3 flex min-w-0 items-center justify-center md:text-sm"
          title={prestasi.penyelenggara}
        >
          <span className="min-w-0 truncate text-left text-xs text-gray-900 md:text-sm">
            {prestasi.penyelenggara}
          </span>
        </div>

        {/* Aksi - Center aligned to match header */}
        <div className="col-span-1 flex items-center justify-center gap-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
            className="rounded p-1.5 transition-colors hover:bg-gray-200 md:p-2"
            title="Edit"
          >
            <Pencil size={14} className="text-gray-700 md:size-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="rounded p-1.5 text-red-600 transition-colors hover:bg-red-100 md:p-2"
            title="Hapus"
          >
            <Trash size={14} className="md:size-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
