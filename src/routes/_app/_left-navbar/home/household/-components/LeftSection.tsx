import React from 'react';
import HouseholdCalendar from './Calendar';
import useSession from '~/hooks/auth/useSession';
import { EventType } from '../index';

interface LeftSectionProps {
  selectedMonth: number;
  selectedYear: number;
  events: EventType[];
  isLoading: boolean;
  onMonthChange: (month: number, year: number) => void;
}

function LeftSection({
  selectedMonth,
  selectedYear,
  events,
  isLoading,
  onMonthChange,
}: LeftSectionProps) {
  const user = useSession();

  return (
    <div className="flex size-full flex-col gap-6">
      <h1 className="text-5xl font-bold text-white">
        Dashboard Peminjaman{' '}
        {user?.roles.includes('household') ? 'Admin' : 'Warga'}
      </h1>
      <div className="size-full overflow-hidden rounded-xl bg-white">
        <HouseholdCalendar
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
          events={events}
          isLoading={isLoading}
          onMonthChange={onMonthChange}
        />
      </div>
    </div>
  );
}

export default LeftSection;
