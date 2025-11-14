import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useMemo, useState } from 'react';
import { Button } from '~/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from '@tanstack/react-router';
import LeftSection from './-components/LeftSection';
import RightSection from './-components/RightSection';
import dayjs from 'dayjs';
import useSession from '~/hooks/auth/useSession';
import { isInRoles } from '~/lib/roles';
import { generateDate } from '~/lib/calendar';
import MobileSection from './-components/MobileSection';
import {
  useGetHouseholdEvents,
  useGetNearingEndItems,
} from '~/hooks/household';

export const Route = createFileRoute('/_app/_left-navbar/home/household/')({
  component: HouseholdPage,
});

function HouseholdPage() {
  const router = useRouter();
  const user = useSession();
  const [selectedMonth, setSelectedMonth] = useState(dayjs().month());
  const [selectedYear, setSelectedYear] = useState(dayjs().year());
  const [selectedDate, setSelectedDate] = useState(() => dayjs());

  const isAdmin = isInRoles(user, ['household']);

  const { data: events = [], isLoading: isLoadingEvents } =
    useGetHouseholdEvents(selectedMonth, selectedYear);
  const { data: peminjamanItems = [], isLoading: isLoadingItems } =
    useGetNearingEndItems();

  const isLoading = isLoadingEvents || isLoadingItems;

  const calendarDays = useMemo(
    () => generateDate(selectedMonth, selectedYear),
    [selectedMonth, selectedYear],
  );

  const eventsForSelectedDate = useMemo(() => {
    return events
      .filter((event) => dayjs(event.start_time).isSame(selectedDate, 'day'))
      .sort(
        (a, b) => dayjs(a.start_time).valueOf() - dayjs(b.start_time).valueOf(),
      );
  }, [events, selectedDate]);

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthLabel = dayjs()
    .year(selectedYear)
    .month(selectedMonth)
    .format('MMMM YYYY');
  const today = dayjs();

  const handleMonthChange = (
    month: number,
    year: number,
    preserveSelectedDate = true,
  ) => {
    setSelectedMonth(month);
    setSelectedYear(year);
    if (preserveSelectedDate) {
      setSelectedDate((prev) => {
        const dayOfMonth = prev.date();
        const targetMonth = dayjs().year(year).month(month).date(1);
        const clampedDay = Math.min(dayOfMonth, targetMonth.daysInMonth());
        return targetMonth.date(clampedDay);
      });
    }
  };

  const handleSelectDate = (dateObj: dayjs.Dayjs, isCurrentMonth: boolean) => {
    if (!isCurrentMonth) {
      handleMonthChange(dateObj.month(), dateObj.year(), false);
    }
    setSelectedDate(dateObj);
  };

  const handlePrevMonth = () => {
    if (selectedMonth === 0) {
      handleMonthChange(11, selectedYear - 1);
    } else {
      handleMonthChange(selectedMonth - 1, selectedYear);
    }
  };

  const handleNextMonth = () => {
    if (selectedMonth === 11) {
      handleMonthChange(0, selectedYear + 1);
    } else {
      handleMonthChange(selectedMonth + 1, selectedYear);
    }
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
        className="
    h-full
    lg:bg-no-repeat
    lg:[background-image:url('/img/household/mask-left-top.png'),url('/img/household/mask-right-bottom.png')]
    lg:[background-position:left_top,right_bottom]
    lg:[background-size:auto_1000px,auto_730px]
  "
      >
        {/* Desktop */}
        <div className="hidden h-full justify-center gap-5 rounded-xl bg-[#30764B] px-[26px] py-[34px] lg:flex  ">
          <LeftSection
            selectedMonth={selectedMonth}
            selectedYear={selectedYear}
            events={events}
            isLoading={isLoading}
            onMonthChange={handleMonthChange}
          />
          <RightSection
            isAdmin={isAdmin}
            peminjamanItems={peminjamanItems}
            isLoading={isLoading}
          />
        </div>
        {/* Mobile */}
        <div className="lg:hidden">
          <MobileSection
            isAdmin={isAdmin}
            monthLabel={monthLabel}
            daysOfWeek={daysOfWeek}
            calendarDays={calendarDays}
            today={today}
            selectedDate={selectedDate}
            events={events}
            eventsForSelectedDate={eventsForSelectedDate}
            peminjamanItems={peminjamanItems}
            isLoading={isLoading}
            onSelectDate={handleSelectDate}
            onPrevMonth={handlePrevMonth}
            onNextMonth={handleNextMonth}
          />
        </div>
      </main>
    </div>
  );
}
