import { createFileRoute } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import { Button } from '~/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from '@tanstack/react-router';
import LeftSection from './-components/LeftSection';
import RightSection from './-components/RightSection';
import dayjs from 'dayjs';

export const Route = createFileRoute('/_app/_left-navbar/home/household/')({
  component: HouseholdPage,
});

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

// Dummy Data
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
const fetchHouseholdData = async (
  month: number,
  year: number,
): Promise<HouseholdData> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  return generateDummyData(month, year);
};

function HouseholdPage() {
  const router = useRouter();
  const [selectedMonth, setSelectedMonth] = useState(dayjs().month());
  const [selectedYear, setSelectedYear] = useState(dayjs().year());
  const [data, setData] = useState<HouseholdData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch data when month/year changes
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const newData = await fetchHouseholdData(selectedMonth, selectedYear);
        setData(newData);
      } catch (error) {
        console.error('Error fetching household data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [selectedMonth, selectedYear]);

  const handleMonthChange = (month: number, year: number) => {
    setSelectedMonth(month);
    setSelectedYear(year);
  };

  return (
    <div className="flex h-full flex-col md:px-10 md:pb-[60px]">
      {/* Back Button */}
      <Button
        variant="link"
        className="my-6 hidden w-full justify-start gap-8 p-0 text-3xl font-medium lg:flex"
        onClick={() => {
          router.history.back();
        }}
      >
        <ChevronLeft className="size-8" />
        <span>Back</span>
      </Button>
      <main
        className="flex h-full justify-center gap-5 rounded-xl bg-[#30764B] px-[26px] py-[34px] "
        style={{
          backgroundImage: `url('/img/household/mask-left-top.png'), url('/img/household/mask-right-bottom.png')`,
          backgroundPosition: 'left top, right bottom',
          backgroundRepeat: 'no-repeat, no-repeat',
          backgroundSize: 'auto 1000px, auto 730px',
        }}
      >
        <LeftSection
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
          events={data?.events || []}
          isLoading={isLoading}
          onMonthChange={handleMonthChange}
        />
        <RightSection
          peminjamanItems={data?.peminjamanItems || []}
          isLoading={isLoading}
        />
      </main>
    </div>
  );
}
