import { useNavigate } from '@tanstack/react-router';
import { Button } from '~/components/ui/button';
import {
  CirclePlus,
  NotebookPen,
  Package,
  RotateCw,
  type LucideIcon,
} from 'lucide-react';

interface MobileActionsProps {
  isAdmin: boolean;
}

interface ActionButton {
  label: string;
  icon: LucideIcon;
  to: string;
}

function MobileActions({ isAdmin }: MobileActionsProps) {
  const navigate = useNavigate();

  const actions: ActionButton[] = isAdmin
    ? [
        {
          label: 'Manajemen Properti',
          icon: Package,
          to: '/home/household/manajemen-properti',
        },
        {
          label: 'Laporan dan Request',
          icon: NotebookPen,
          to: '/home/household/manajemen-request-laporan',
        },
      ]
    : [
        {
          label: 'Pengajuan Pinjaman',
          icon: CirclePlus,
          to: '/home/household/pengajuan-peminjaman',
        },
        {
          label: 'Pengajuan Laporan',
          icon: NotebookPen,
          to: '/home/household/pengajuan-laporan',
        },
        {
          label: 'Pengembalian Pinjaman',
          icon: RotateCw,
          to: '/home/household/pengajuan-pengembalian',
        },
      ];

  return (
    <section className="flex flex-col gap-3 pb-6">
      {actions.map((action) => (
        <Button
          key={action.label}
          onClick={() => navigate({ to: action.to })}
          className="flex w-full items-center justify-center gap-3 rounded-full bg-[#E1C264] py-4 text-base font-semibold text-[#2A2A2A] shadow-sm"
        >
          <action.icon className="size-5" />
          {action.label}
        </Button>
      ))}
    </section>
  );
}

export default MobileActions;
