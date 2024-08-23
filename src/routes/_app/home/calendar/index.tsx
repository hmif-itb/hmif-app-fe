import { createFileRoute } from '@tanstack/react-router';
import DesktopView from './-components/dekstop-view';
import { useState } from 'react';
import dayjs from 'dayjs';
import MobileView from './-components/mobile-view';

export const Route = createFileRoute('/_app/home/calendar/')({
  component: CalendarHome,
});

function CalendarHome() {
  const [currentMonth, setCurrentMonth] = useState(dayjs().month());
  const [currentYear, setCurrentYear] = useState(dayjs().year());

  const handleMonthChange = (newMonth: number) => {
    if (newMonth < 0) {
      setCurrentYear(currentYear - 1);
      setCurrentMonth(11);
    } else if (newMonth > 11) {
      setCurrentYear(currentYear + 1);
      setCurrentMonth(0);
    } else {
      setCurrentMonth(newMonth);
    }
  };

  return (
    <>
      <DesktopView
        currentMonth={currentMonth}
        currentYear={currentYear}
        onMonthChange={handleMonthChange}
      />
      <MobileView />
    </>
  );
}
