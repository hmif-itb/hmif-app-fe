import { CirclePlus, Search } from 'lucide-react';
import HeaderTitle from '~/components/header-title';
import { Button } from '~/components/ui/button';
import CalendarDay from './calendar-day';
import dayjs from 'dayjs';
import { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import DesktopAddEvent from './DesktopAddEvent';
import { useQuery } from '@tanstack/react-query';
import { api } from '~/api/client';

interface Event {
  title: string;
  time: string;
  color: string;
  date: number;
}

interface EventsByDate {
  [key: number]: Event[];
}

type CalendarGroup = {
  id: string;
  name: string;
  category: string;
};

function DesktopView({
  currentMonth,
  currentYear,
}: {
  currentMonth: number;
  currentYear: number;
  onMonthChange: (newMonth: number) => void;
}) {
  const dummyEvents: Event[] = [
    {
      title: 'UAS Jaringan Komputer',
      time: '08:00',
      color: 'green',
      date: 1,
    },
    {
      title: 'Deadline Milestone 1 Grafika Komputer',
      time: '23:59',
      color: 'red',
      date: 1,
    },
    {
      title: 'Kuis Artificial Intelligence',
      time: '07:00',
      color: 'yellow',
      date: 5,
    },
    {
      title: 'Sprint Review',
      time: '20:00',
      color: 'red',
      date: 5,
    },
  ];

  const eventsByDate: EventsByDate = dummyEvents.reduce((acc, event) => {
    if (!acc[event.date]) {
      acc[event.date] = [];
    }
    acc[event.date].push(event);
    return acc;
  }, {} as EventsByDate);

  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const today = dayjs().month(currentMonth).year(currentYear);

  const [showFloatingCategoryModal, setShowFloatingCategoryModal] =
    useState(false);
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [category, setCategory] = useState<CalendarGroup | null>(null);

  const monthName = today.format('MMMM');
  const year = today.year();
  const startDay = today.startOf('month').day();
  const daysInMonth = today.daysInMonth();
  const previousMonthDays = startDay === 0 ? 6 : startDay - 1;

  const totalCells = Math.ceil((previousMonthDays + daysInMonth) / 7) * 7;
  const calendarDays = [];

  // Add the days from the previous month
  const lastMonthDays = today.subtract(1, 'month').daysInMonth();
  for (let i = previousMonthDays; i > 0; i--) {
    calendarDays.push({
      day: lastMonthDays - i + 1,
      isCurrentMonth: false,
    });
  }

  // Add the days from the current month
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push({
      day: i,
      isCurrentMonth: true,
    });
  }

  // Add the days from the next month if necessary to fill the calendar view
  const remainingDays = totalCells - calendarDays.length;
  for (let i = 1; i <= remainingDays; i++) {
    calendarDays.push({
      day: i,
      isCurrentMonth: false,
    });
  }

  const handleCategoryButtonClick = (selectedCategory: CalendarGroup) => {
    setCategory(selectedCategory);
    setShowFloatingCategoryModal(false);
    setShowAddEventModal(true);
  };

  const categoryModalRef = useRef<HTMLDivElement>(null);
  const addEventModalRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement | null>(null);

  const { data: groupOptions } = useQuery({
    queryKey: ['calendarGroup'],
    queryFn: () => api.calendar.getCalendarGroup(),
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        categoryModalRef.current &&
        !categoryModalRef.current.contains(event.target as Node)
      ) {
        setShowFloatingCategoryModal(false);
      }
      if (
        addEventModalRef.current &&
        !addEventModalRef.current.contains(event.target as Node)
      ) {
        setShowAddEventModal(false);
      }
    };

    if (showFloatingCategoryModal || showAddEventModal) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showFloatingCategoryModal, showAddEventModal]);

  return (
    <div className="relative hidden h-screen w-full flex-col lg:flex">
      <AnimatePresence>
        {showAddEventModal && category && (
          <DesktopAddEvent
            onSubmitSuccess={() => setShowAddEventModal(false)}
            onClose={() => setShowAddEventModal(false)}
            calendarGroup={category}
            constraintRef={mainRef}
          />
        )}
      </AnimatePresence>

      <motion.div ref={mainRef} className="flex flex-auto flex-col">
        <HeaderTitle />
        <div className="flex flex-row items-center gap-2 border-b border-gray-300 p-4">
          <div className="font-inter text-3xl font-medium">{monthName}</div>
          <div className="grow font-inter text-3xl font-normal">{year}</div>
          <button className="mr-1 rounded-full bg-gray-100 p-2.5">
            <Search strokeWidth={3} color="#6A778B" size={16} />
          </button>
          <Button
            className="bg-green-300"
            onClick={() => setShowFloatingCategoryModal(true)}
          >
            <div className="flex flex-row items-center gap-2 font-medium">
              Add event
              <CirclePlus strokeWidth={2.25} size={18} />
            </div>
          </Button>
        </div>
        <div className="grid grid-cols-7 py-0.5 text-center font-medium">
          {daysOfWeek.map((day) => (
            <div key={day}>{day}</div>
          ))}
        </div>
        <div className="grid flex-auto grid-cols-7 grid-rows-5 border-l border-t border-gray-300">
          {calendarDays.map(({ day, isCurrentMonth }, index) => (
            <CalendarDay
              key={index}
              day={day}
              isCurrentMonth={isCurrentMonth}
              isWeekend={index % 7 === 5 || index % 7 === 6}
              events={eventsByDate[day] ?? []}
            />
          ))}
        </div>
      </motion.div>

      {showFloatingCategoryModal && (
        <div
          ref={categoryModalRef}
          className="absolute right-8 top-36 flex w-48 flex-col items-center justify-center rounded-lg bg-white py-3 shadow-xl"
        >
          {groupOptions?.map((group) => (
            <Button
              key={group.id}
              variant="link"
              onClick={() => handleCategoryButtonClick(group)}
              className="w-full p-2 text-right text-black hover:bg-gray-200"
            >
              {group.name}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}

export default DesktopView;
