import { Check } from 'lucide-react';
import * as Avatar from '@radix-ui/react-avatar';
import * as Checkbox from '@radix-ui/react-checkbox';
import { Prestasi } from '~/api/generated';
import { useNavigate } from '@tanstack/react-router';

// Define competitionType enum
type CompetitionType = 'CP' | 'CTF' | 'BCC' | 'DS' | 'AI' | 'Hackathon' | null;

interface ExtendedPrestasi extends Prestasi {
  competitionType: CompetitionType;
  periode?: string; 
}

type TableRowProps = {
  prestasi: ExtendedPrestasi;
  isSelected: boolean;
  onSelect: () => void;
};

const getJenisBadgeColor = (jenis: CompetitionType) => {
  const lowerJenis = jenis?.toLowerCase();
  if (lowerJenis === 'cp') return 'bg-[#D3E1FE] text-blue-800';
  if (lowerJenis === 'ctf') return 'bg-[#FFF4D6] text-yellow-800';
  if (lowerJenis === 'hackathon') return 'bg-[#FFE4E1] text-red-800';
  if (lowerJenis === 'bcc') return 'bg-[#E0F7FA] text-cyan-800';
  if (lowerJenis === 'ds') return 'bg-[#E6E6FA] text-purple-800';
  if (lowerJenis === 'ai') return 'bg-[#F0FFF0] text-green-800';
  return 'bg-gray-200 text-gray-800';
};

export const TableRow = ({ prestasi, isSelected, onSelect }: TableRowProps) => {
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
    const target = e.target as HTMLElement;
    const isCheckbox = target.closest('[role="checkbox"]');
    if (!isCheckbox) {
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
        {/* Profil */}
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

        {/* Nama Prestasi */}
        <div
          className="col-span-3 flex min-w-0 items-center justify-center md:col-span-3"
          title={prestasi.deskripsi ?? 'N/A'}
        >
          <span className="min-w-0 truncate text-left text-xs text-gray-900 md:text-sm">
            {prestasi.deskripsi}
          </span>
        </div>

        {/* Jenis Perlombaan */}
        <div className="col-span-2 flex items-center justify-center md:col-span-2">
          <span
            className={`inline-flex items-center justify-center rounded-full px-2 py-1 text-center text-[10px] font-medium md:min-w-[100px] md:px-3 md:py-1.5 md:text-xs ${getJenisBadgeColor(prestasi.competitionType)}`}
          >
            {prestasi.competitionType || 'N/A'}
          </span>
        </div>

        {/* Nama Organisasi/Perlombaan */}
        <div
          className="col-span-2 flex min-w-0 items-center justify-center md:col-span-2"
          title={prestasi.penyelenggara}
        >
          <span className="min-w-0 truncate text-left text-xs text-gray-900 md:text-sm">
            {prestasi.penyelenggara}
          </span>
        </div>

        {/* Periode */}
        <div
          className="col-span-1 flex items-center justify-center truncate text-xs text-gray-900 md:text-sm"
          title={prestasi.periode || 'N/A'}
        >
          {prestasi.periode || 'N/A'}
        </div>
      </div>
    </div>
  );
};
