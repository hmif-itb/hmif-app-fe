import { getRouteApi } from '@tanstack/react-router';
import dayjs from 'dayjs';
import { motion } from 'framer-motion';
import { CirclePlus } from 'lucide-react';
import { useMemo, useRef, useState } from 'react';
import { CalendarEvent } from '~/api/generated';
import { Button } from '~/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~/components/ui/popover';
import useSession from '~/hooks/auth/useSession';
import { useThreeMonthCalendarEvents } from '~/hooks/calendar';
import { generateDate } from '~/lib/calendar';
import { isInRoles } from '~/lib/roles';
import { CalendarCategory } from '../-archive/DesktopAddEvent';
import AddEventDialog from './AddEventDialog';
import CalendarDay from './calendar-day';

interface EventsByDate {
  [key: string]: CalendarEvent[];
}

const routeApi = getRouteApi('/_app/calendar/');

function DesktopView({
  currentMonth,
  currentYear,
}: {
  currentMonth: number;
  currentYear: number;
  onMonthChange: (newMonth: number) => void;
}) {
  const today = dayjs().month(currentMonth).year(currentYear);
  const user = useSession();

  const { selectedDate, selectedMonth, selectedYear } = routeApi.useSearch();

  const selected = dayjs()
    .date(selectedDate || today.date())
    .month(selectedMonth || today.month())
    .year(selectedYear || today.year());

  const allEvents = useThreeMonthCalendarEvents({
    month: selectedMonth || currentMonth,
    year: selectedYear || currentYear,
  });

  // TODO: event with more than one day

  const eventsByDate: EventsByDate = allEvents.reduce((acc, event) => {
    const start = dayjs(event.start).format('MMDD');
    if (!acc[start]) {
      acc[start] = [];
    }
    acc[start].push(event);
    return acc;
  }, {} as EventsByDate);

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [category, setCategory] = useState<'himpunan' | 'akademik' | null>(
    null,
  );

  const monthName = selected.format('MMMM');
  const year = selected.year();

  const calendarDays = useMemo(
    () => generateDate(selectedMonth, selectedYear),
    [selectedMonth, selectedYear],
  );

  const handleCategoryButtonClick = (selectedCategory: CalendarCategory) => {
    setCategory(selectedCategory);
    setShowAddEventModal(true);
  };

  const mainRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="relative hidden h-screen w-full flex-col lg:flex">
      {category && (
        <AddEventDialog
          isOpen={showAddEventModal}
          setOpen={setShowAddEventModal}
          constraintRef={mainRef}
          category={category}
        />
      )}

      <motion.div ref={mainRef} className="flex h-full flex-auto flex-col">
        <div className="flex flex-row items-center gap-2 border-b border-gray-300 p-4">
          <div className="font-inter text-3xl font-medium">{monthName}</div>
          <div className="grow font-inter text-3xl font-normal">{year}</div>
          {isInRoles(user, ['ring1', 'akademik']) && (
            <Popover>
              <PopoverTrigger asChild>
                <Button className="bg-green-300">
                  <div className="flex flex-row items-center gap-2 font-medium">
                    Add event
                    <CirclePlus strokeWidth={2.25} size={18} />
                  </div>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-40 flex-col items-center justify-center rounded-lg bg-white p-1 shadow-xl">
                {isInRoles(user, ['ring1']) && (
                  <Button
                    variant="link"
                    onClick={() => handleCategoryButtonClick('himpunan')}
                    className="w-full p-2 text-right text-black hover:bg-gray-200"
                  >
                    Himpunan
                  </Button>
                )}
                {isInRoles(user, ['akademik']) && (
                  <Button
                    variant="link"
                    onClick={() => handleCategoryButtonClick('akademik')}
                    className="w-full p-2 text-right text-black hover:bg-gray-200"
                  >
                    Akademik
                  </Button>
                )}
              </PopoverContent>
            </Popover>
          )}
        </div>
        <div className="grid grid-cols-7 py-0.5 text-center font-medium">
          {daysOfWeek.map((day) => (
            <div key={day}>{day}</div>
          ))}
        </div>
        <div className="grid min-h-0 flex-auto grid-cols-7 grid-rows-6 border-l border-t border-gray-300">
          {calendarDays?.map(
            ({ date, currentMonth: isCurrentMonth }, index) => (
              <CalendarDay
                key={index}
                day={date.date()}
                isCurrentMonth={isCurrentMonth}
                isWeekend={index % 7 === 5 || index % 7 === 6}
                events={eventsByDate[date.format('MMDD')] ?? []}
                selectedMonth={selectedMonth || currentMonth}
                selectedYear={selectedYear || currentYear}
              />
            ),
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default DesktopView;
