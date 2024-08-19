import dayjs, { Dayjs } from 'dayjs';
import { motion } from 'framer-motion';
import { CirclePlus, Search } from 'lucide-react';
import { useRef, useState } from 'react';
import { CalendarEvent } from '~/api/generated';
import { Button } from '~/components/ui/button';
import { Dialog, DialogContent } from '~/components/ui/dialog';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~/components/ui/popover';
import { useCalendarEvents } from '~/hooks/calendar';
import CalendarDay from './calendar-day';
import DesktopAddEvent, { CalendarCategory } from './DesktopAddEvent';

interface EventsByDate {
  [key: string]: CalendarEvent[];
}

function DesktopView({
  currentMonth,
  currentYear,
}: {
  currentMonth: number;
  currentYear: number;
  onMonthChange: (newMonth: number) => void;
}) {
  const today = dayjs().month(currentMonth).year(currentYear);
  const lastMonth = today.subtract(1, 'month');
  const nextMonth = today.add(1, 'month');
  const { data: events } = useCalendarEvents({
    month: currentMonth + 1,
    year: currentYear,
  });

  const { data: lastEvents } = useCalendarEvents({
    month: lastMonth.month() + 1,
    year: lastMonth.year(),
  });

  const { data: nextEvents } = useCalendarEvents({
    month: nextMonth.month() + 1,
    year: nextMonth.year(),
  });

  const allEvents = [
    ...(lastEvents ?? []),
    ...(events ?? []),
    ...(nextEvents ?? []),
  ];

  // TODO: event with more than one day

  const eventsByDate: EventsByDate = allEvents.reduce((acc, event) => {
    const start = dayjs(event.start).format('MMDD');
    if (!acc[start]) {
      acc[start] = [];
    }
    acc[start].push(event);
    return acc;
  }, {} as EventsByDate);

  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [category, setCategory] = useState<'himpunan' | 'akademik' | null>(
    null,
  );

  const monthName = today.format('MMMM');
  const year = today.year();
  const startDay = today.startOf('month').day();
  const daysInMonth = today.daysInMonth();
  const previousMonthDays = startDay === 0 ? 6 : startDay - 1;

  const totalCells = Math.ceil((previousMonthDays + daysInMonth) / 7) * 7;
  const calendarDays: Array<{
    date: Dayjs;
    isCurrentMonth: boolean;
  }> = [];

  // Add the days from the previous month
  const lastMonthDays = today.subtract(1, 'month').daysInMonth();
  for (let i = previousMonthDays; i > 0; i--) {
    calendarDays.push({
      date: lastMonth.date(lastMonthDays - i + 1),
      isCurrentMonth: false,
    });
  }

  // Add the days from the current month
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push({
      date: today.date(i),
      isCurrentMonth: true,
    });
  }

  // Add the days from the next month if necessary to fill the calendar view
  const remainingDays = totalCells - calendarDays.length;
  for (let i = 1; i <= remainingDays; i++) {
    calendarDays.push({
      date: nextMonth.date(i),
      isCurrentMonth: false,
    });
  }

  const handleCategoryButtonClick = (selectedCategory: CalendarCategory) => {
    setCategory(selectedCategory);
    setShowAddEventModal(true);
  };

  const mainRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="relative hidden h-screen w-full flex-col lg:flex">
      <Dialog open={showAddEventModal}>
        <DialogContent
          className="w-[564px] rounded-none border-none bg-transparent p-0"
          hideCloseButton
        >
          {category && (
            <DesktopAddEvent
              onSubmitSuccess={() => setShowAddEventModal(false)}
              onClose={() => setShowAddEventModal(false)}
              constraintRef={mainRef}
              category={category}
            />
          )}
        </DialogContent>
      </Dialog>

      <motion.div ref={mainRef} className="flex flex-auto flex-col">
        <div className="flex flex-row items-center gap-2 border-b border-gray-300 p-4">
          <div className="font-inter text-3xl font-medium">{monthName}</div>
          <div className="grow font-inter text-3xl font-normal">{year}</div>
          <button className="mr-1 rounded-full bg-gray-100 p-2.5">
            <Search strokeWidth={3} color="#6A778B" size={16} />
          </button>

          <Popover>
            <PopoverTrigger asChild>
              <Button className="bg-green-300">
                <div className="flex flex-row items-center gap-2 font-medium">
                  Add event
                  <CirclePlus strokeWidth={2.25} size={18} />
                </div>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="flex-col items-center justify-center rounded-lg bg-white py-3 shadow-xl">
              <Button
                variant="link"
                onClick={() => handleCategoryButtonClick('himpunan')}
                className="w-full p-2 text-right text-black hover:bg-gray-200"
              >
                Himpunan
              </Button>
              <Button
                variant="link"
                onClick={() => handleCategoryButtonClick('akademik')}
                className="w-full p-2 text-right text-black hover:bg-gray-200"
              >
                Akademik
              </Button>
            </PopoverContent>
          </Popover>
        </div>
        <div className="grid grid-cols-7 py-0.5 text-center font-medium">
          {daysOfWeek.map((day) => (
            <div key={day}>{day}</div>
          ))}
        </div>
        <div className="grid flex-auto grid-cols-7 grid-rows-5 border-l border-t border-gray-300">
          {calendarDays.map(({ date, isCurrentMonth }, index) => (
            <CalendarDay
              key={index}
              day={date.date()}
              isCurrentMonth={isCurrentMonth}
              isWeekend={index % 7 === 5 || index % 7 === 6}
              events={eventsByDate[date.format('MMDD')] ?? []}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default DesktopView;
