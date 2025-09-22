import React from 'react';
import { PeminjamanItem, PeminjamanData } from './PeminjamanItem';
import { FilterOptions } from './FilterModal';

interface PeminjamanListProps {
  filter: FilterOptions;
  searchTerm: string;
}

const samplePeminjaman: PeminjamanData[] = [
  {
    userName: 'Adinda Putri',
    userAvatar: undefined,
    startDate: '05/01/2022',
    endDate: '05/01/2022',
    properti: 'Projektor',
    jumlah: 1,
    tanggalMulai: '15/01/2024',
    tanggalSelesai: '16/01/2024',
    status: 'aktif',
  },
  {
    userName: 'Budi Santoso',
    userAvatar: undefined,
    startDate: '03/01/2022',
    endDate: '07/01/2022',
    properti: 'Speaker JBL',
    jumlah: 2,
    tanggalMulai: '10/01/2024',
    tanggalSelesai: '12/01/2024',
    status: 'selesai',
  },
  {
    userName: 'Citra Dewi',
    userAvatar: undefined,
    startDate: '08/01/2022',
    endDate: '10/01/2022',
    properti: 'Kabel HDMI',
    jumlah: 3,
    tanggalMulai: '20/01/2024',
    tanggalSelesai: '22/01/2024',
    status: 'pending',
  },
  {
    userName: 'Doni Pratama',
    userAvatar: undefined,
    startDate: '12/01/2022',
    endDate: '15/01/2022',
    properti: 'Laptop Asus',
    jumlah: 1,
    tanggalMulai: '25/01/2024',
    tanggalSelesai: '27/01/2024',
    status: 'aktif',
  },
];

function PeminjamanList({ filter, searchTerm }: PeminjamanListProps) {
  const filteredPeminjaman = samplePeminjaman.filter((peminjaman) => {
    // Filter by status if specified
    const matchesStatus =
      !filter.status ||
      filter.status === 'all' ||
      peminjaman.status === filter.status;

    // Filter by search term (search in user name and property)
    const matchesSearch =
      peminjaman.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      peminjaman.properti.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  return (
    <div className="mb-20 flex w-full flex-col gap-3 lg:mb-5 lg:gap-5">
      {filteredPeminjaman.length > 0 ? (
        filteredPeminjaman.map((peminjaman, idx) => (
          <PeminjamanItem
            key={`${peminjaman.userName}-${idx}`}
            item={peminjaman}
          />
        ))
      ) : (
        <div className="flex h-32 items-center justify-center text-gray-500">
          <p>Tidak ada data peminjaman yang sesuai dengan filter</p>
        </div>
      )}
    </div>
  );
}

export default PeminjamanList;
