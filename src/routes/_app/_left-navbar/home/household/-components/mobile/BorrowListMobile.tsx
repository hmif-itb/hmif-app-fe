import { Package } from 'lucide-react';
import type { PeminjamanItemData } from '../../-api';

interface BorrowListMobileProps {
  items: PeminjamanItemData[];
  isLoading: boolean;
}

function BorrowListMobile({ items, isLoading }: BorrowListMobileProps) {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center gap-3 text-[#1E422C]">
        <span className="flex size-10 items-center justify-center rounded-full bg-[#F3E4A5]">
          <Package className="size-5" />
        </span>
        <h2 className="text-xl font-semibold">Daftar Peminjaman</h2>
      </div>
      <div className="flex flex-col gap-3">
        {isLoading
          ? Array.from({ length: 3 }).map((_, idx) => (
              <div
                key={`peminjaman-skeleton-${idx}`}
                className="rounded-2xl bg-[#F4F4F4] p-4 shadow-sm"
              >
                <div className="h-4 w-40 animate-pulse rounded bg-[#E2E2E2]" />
                <div className="mt-2 h-3 w-24 animate-pulse rounded bg-[#E8E8E8]" />
                <div className="mt-3 h-3 w-full animate-pulse rounded bg-[#EAEAEA]" />
                <div className="mt-1 h-3 w-3/4 animate-pulse rounded bg-[#EAEAEA]" />
              </div>
            ))
          : items.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl bg-[#F7E9C3] p-4 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <span className="text-base font-semibold text-[#2A2A2A]">
                    {item.name}
                  </span>
                  <span className="rounded-full bg-[#2F5C3B] px-4 py-1 text-xs font-semibold text-white">
                    {item.id}
                  </span>
                </div>
                <p className="mt-1 text-sm font-medium text-[#5F5F5F]">
                  {item.item}
                </p>
                <div className="mt-3 flex flex-col gap-1 text-xs text-[#5F5F5F]">
                  <span>Mulai: {item.startDate}</span>
                  <span>Selesai: {item.endDate}</span>
                </div>
              </div>
            ))}
      </div>
    </section>
  );
}

export default BorrowListMobile;
