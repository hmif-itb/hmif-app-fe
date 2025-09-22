import { Button } from '~/components/ui/button';
import PeminjamanItem from './PeminjamanItem';
import { CirclePlus, NotebookPen, Package, RotateCw } from 'lucide-react';
import useSession from '~/hooks/auth/useSession';
import { isInRoles } from '~/lib/roles';
import { PeminjamanItemData } from '../index';

interface RightSectionProps {
  peminjamanItems: PeminjamanItemData[];
  isLoading: boolean;
}

function RightSection({ peminjamanItems, isLoading }: RightSectionProps) {
  const user = useSession();

  return (
    <div className="flex h-full min-w-[335px] flex-col gap-5">
      {/* Button */}
      {/* TODO: Tipe Role mungkin berbeda */}
      {isInRoles(user, ['household']) ? (
        <div className="flex flex-col gap-4">
          <Button className="w-full bg-[#E2C66F] text-[#333333]">
            <Package />
            Lihat Properti
          </Button>
          <Button className="w-full bg-[#E2C66F] text-[#333333]">
            <NotebookPen />
            Lihat Laporan dan Request
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <Button className="w-full bg-[#E2C66F] text-[#333333]">
            <CirclePlus />
            Pengajuan Pinjaman
          </Button>
          <Button className="w-full bg-[#E2C66F] text-[#333333]">
            <NotebookPen />
            Pengajuan Laporan
          </Button>
          <Button className="w-full bg-[#E2C66F] text-[#333333]">
            <RotateCw />
            Pengembalian Pinjaman
          </Button>
        </div>
      )}

      {/* Daftar Peminjaman */}
      <div className="flex h-full flex-col gap-3 rounded-xl bg-white px-3 py-[22px] text-[#333333]">
        <h3 className="text-xl font-semibold">Daftar Peminjaman</h3>
        <div className="flex h-full flex-col gap-3">
          {isLoading
            ? // Loading skeleton
              Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-2 rounded-[10px] bg-[#E2C66F4D]/30 px-4 py-[14px]"
                >
                  <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
                  <div className="h-3 w-16 animate-pulse rounded bg-gray-200" />
                  <div className="h-3 w-32 animate-pulse rounded bg-gray-200" />
                </div>
              ))
            : peminjamanItems.map((item) => (
                <PeminjamanItem key={item.id} data={item} />
              ))}
        </div>
      </div>
    </div>
  );
}

export default RightSection;
