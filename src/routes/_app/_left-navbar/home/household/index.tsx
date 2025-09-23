import { createFileRoute } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import { Button } from '~/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from '@tanstack/react-router';
import LeftSection from './-components/LeftSection';
import RightSection from './-components/RightSection';
import dayjs from 'dayjs';
import { fetchHouseholdData, EventType, PeminjamanItemData } from './-api';

export const Route = createFileRoute('/_app/_left-navbar/home/household/')({
  component: HouseholdPage,
});

interface HouseholdData {
  events: EventType[];
  peminjamanItems: PeminjamanItemData[];
}

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
