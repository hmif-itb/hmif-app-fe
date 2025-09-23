import dayjs from 'dayjs';

export interface EventType {
  title: string;
  type: 'sekre' | 'properti';
  start_time: Date;
}

export interface PeminjamanItemData {
  id: string;
  name: string;
  item: string;
  startDate: string;
  endDate: string;
}

interface HouseholdData {
  events: EventType[];
  peminjamanItems: PeminjamanItemData[];
}

// Generate dummy data for specific month/year
const generateDummyData = (month: number, year: number): HouseholdData => {
  const events: EventType[] = [
    {
      title: 'Peminjaman Sakre 1',
      type: 'sekre',
      start_time: new Date(year, month, 5, 8, 0),
    },
    {
      title: 'Peminjaman Proyektor',
      type: 'properti',
      start_time: new Date(year, month, 5, 9, 0),
    },
    {
      title: 'Peminjaman Ruang Rapat',
      type: 'sekre',
      start_time: new Date(year, month, 12, 10, 0),
    },
    {
      title: 'Peminjaman Sound System',
      type: 'properti',
      start_time: new Date(year, month, 12, 14, 0),
    },
    {
      title: 'Peminjaman Sakre 2',
      type: 'sekre',
      start_time: new Date(year, month, 18, 8, 30),
    },
    {
      title: 'Peminjaman Laptop',
      type: 'properti',
      start_time: new Date(year, month, 18, 11, 0),
    },
    {
      title: 'Peminjaman Meja',
      type: 'properti',
      start_time: new Date(year, month, 25, 13, 0),
    },
    {
      title: 'Peminjaman Ruang Aula',
      type: 'sekre',
      start_time: new Date(year, month, 25, 15, 30),
    },
  ];

  const today = dayjs();
  const peminjamanItems: PeminjamanItemData[] = [
    {
      id: 'L001',
      name: 'Adinda Putri',
      item: 'Proyektor',
      startDate: today.subtract(2, 'day').format('DD/MM/YYYY'),
      endDate: today.add(1, 'day').format('DD/MM/YYYY'),
    },
    {
      id: 'L002',
      name: 'Budi Santoso',
      item: 'Speaker JBL',
      startDate: today.subtract(1, 'day').format('DD/MM/YYYY'),
      endDate: today.add(3, 'day').format('DD/MM/YYYY'),
    },
    {
      id: 'L003',
      name: 'Citra Dewi',
      item: 'Laptop Asus',
      startDate: today.format('DD/MM/YYYY'),
      endDate: today.add(4, 'day').format('DD/MM/YYYY'),
    },
  ];

  return { events, peminjamanItems };
};

// API fetch function
export const fetchHouseholdData = async (
  month: number,
  year: number,
): Promise<HouseholdData> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  return generateDummyData(month, year);
};
