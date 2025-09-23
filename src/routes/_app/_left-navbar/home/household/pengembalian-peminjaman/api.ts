export interface PeminjamanData {
  id: string;
  userName: string;
  userAvatar?: string;
  startDate: string;
  endDate: string;
  properti: string;
  jumlah: number;
  tanggalMulai: string;
  tanggalSelesai: string;
  status: 'aktif' | 'selesai' | 'pending';
  type: 'properti' | 'sekre';
}

// Dummy Pengembalian Data
const peminjamanDummyData: PeminjamanData[] = [
  {
    id: 'pem-001',
    userName: 'Adinda Putri',
    userAvatar: undefined,
    startDate: '05/01/2022',
    endDate: '05/01/2022',
    properti: 'Projektor',
    jumlah: 1,
    tanggalMulai: '15/01/2024',
    tanggalSelesai: '16/01/2024',
    status: 'aktif',
    type: 'properti',
  },
  {
    id: 'pem-002',
    userName: 'Budi Santoso',
    userAvatar: undefined,
    startDate: '03/01/2022',
    endDate: '07/01/2022',
    properti: 'Speaker JBL',
    jumlah: 2,
    tanggalMulai: '10/01/2024',
    tanggalSelesai: '12/01/2024',
    status: 'selesai',
    type: 'properti',
  },
  {
    id: 'pem-003',
    userName: 'Citra Dewi',
    userAvatar: undefined,
    startDate: '08/01/2022',
    endDate: '10/01/2022',
    properti: 'Ruang Rapat',
    jumlah: 1,
    tanggalMulai: '20/01/2024',
    tanggalSelesai: '22/01/2024',
    status: 'pending',
    type: 'sekre',
  },
  {
    id: 'pem-004',
    userName: 'Doni Pratama',
    userAvatar: undefined,
    startDate: '12/01/2022',
    endDate: '15/01/2022',
    properti: 'Laptop Asus',
    jumlah: 1,
    tanggalMulai: '25/01/2024',
    tanggalSelesai: '27/01/2024',
    status: 'aktif',
    type: 'properti',
  },
  {
    id: 'pem-005',
    userName: 'Eka Sari',
    userAvatar: undefined,
    startDate: '18/01/2022',
    endDate: '20/01/2022',
    properti: 'Aula Besar',
    jumlah: 1,
    tanggalMulai: '30/01/2024',
    tanggalSelesai: '01/02/2024',
    status: 'aktif',
    type: 'sekre',
  },
];

// API Functions
export const fetchAllPeminjaman = async (): Promise<PeminjamanData[]> => {
  console.log('Fetching all peminjaman...');
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  return [...peminjamanDummyData];
};

export const fetchPeminjamanById = async (
  id: string,
): Promise<PeminjamanData | null> => {
  console.log(`Fetching peminjaman with ID: ${id}`);
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  const peminjaman = peminjamanDummyData.find((item) => item.id === id);
  return peminjaman || null;
};

// Submit return request
export const submitReturnRequest = async (
  peminjamanId: string,
  returnData: {
    report: string;
    file: File | null;
  },
): Promise<boolean> => {
  console.log('Submitting return request for:', peminjamanId, returnData);
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return true;
};
