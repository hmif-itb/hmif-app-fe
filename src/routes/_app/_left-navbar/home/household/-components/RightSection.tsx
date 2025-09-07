import { Button } from '~/components/ui/button';
import PeminjamanItem from './peminjaman-item';
import { CirclePlus, NotebookPen, Package, RotateCw } from 'lucide-react';
import useSession from '~/hooks/auth/useSession';

function RightSection() {
  const user = useSession();
  return (
    <div className="flex h-full min-w-[335px] flex-col gap-5">
      {/* Button */}
      {user?.roles.includes('household') ? (
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
        <h3 className="text-xl font-semibold ">Daftar Peminjaman</h3>
        <div className="flex h-full flex-col gap-3 ">
          <PeminjamanItem />
          <PeminjamanItem />
          <PeminjamanItem />
        </div>
      </div>
    </div>
  );
}

export default RightSection;
