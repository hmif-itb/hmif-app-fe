import { createFileRoute, Outlet } from '@tanstack/react-router';
import { z } from 'zod';
import CalendarNavbar from '~/components/navbar/CalendarNavbar';

const calendarSearchSchema = z.object({
  selectedDate: z.number().optional(),
  selectedMonth: z.number().optional(),
  selectedYear: z.number().optional(),
});

export const Route = createFileRoute('/_app/calendar')({
  component: CalendarLayout,
  validateSearch: (search) => calendarSearchSchema.parse(search),
});

function CalendarLayout() {
  return (
    <>
      <CalendarNavbar />
      <div className="flex h-full flex-1 flex-col lg:block">
        <Outlet />
      </div>
    </>
  );
}
