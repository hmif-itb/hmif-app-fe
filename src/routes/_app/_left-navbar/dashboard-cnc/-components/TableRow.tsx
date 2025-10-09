import { Check } from 'lucide-react';
import * as Avatar from '@radix-ui/react-avatar';
import * as Checkbox from '@radix-ui/react-checkbox';
import { Prestasi } from '~/api/generated';
import { useNavigate } from '@tanstack/react-router';

// Define competitionType enum
type CompetitionType = 'CP' | 'CTF' | 'BCC' | 'DS' | 'AI' | 'Hackathon' | null;

// Extend Prestasi type to include competitionType and periode
interface ExtendedPrestasi extends Prestasi {
  competitionType: CompetitionType;
  periode?: string; // Optional to align with second TableRow
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
      className="flex cursor-pointer items-center gap-4 border-b bg-[#FFFFFF] p-4 font-inter text-sm hover:bg-gray-100"
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

        <div className="col-span-1 mx-auto pt-2">
          <span
            className={`inline-block min-w-24 rounded-full px-2 py-1 text-center text-xs ${getJenisBadgeColor(prestasi.competitionType)}`}
          >
            {prestasi.competitionType || 'N/A'}
          </span>
        </div>

        <div
          className="col-span-3 truncate pl-8 pt-2 lg:pl-0"
          title={prestasi.penyelenggara}
        >
          {prestasi.penyelenggara}
        </div>

        <div
          className="col-span-1 truncate pt-2"
          title={prestasi.periode || 'N/A'}
        >
          {prestasi.periode || 'N/A'}
        </div>
      </div>
    </div>
  );
};
