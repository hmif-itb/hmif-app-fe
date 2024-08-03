import { CirclePlus, Search } from 'lucide-react';
import HeaderTitle from '~/components/header-title';
import { Button } from '~/components/ui/button';
import CalendarDay from './calendar-day';
import dayjs from 'dayjs';
import { useState } from 'react';

interface Event {
  title: string;
  time: string;
  color: string;
  date: number;
}
interface EventsByDate {
  [key: number]: Event[];
}

function DesktopView() {
  const dummyEvents: Event[] = [
    {
      title: 'UAS Jaringan Komputer',
      time: '08:00',
      color: 'purple',
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
  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);

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

  return (
    <div className="hidden size-full max-h-full flex-col lg:flex">
      <HeaderTitle />
      <div className="flex flex-row items-center gap-2 border-b border-gray-300 p-4">
        <div className="font-inter text-3xl font-medium">{monthName}</div>
        <div className="grow font-inter text-3xl font-normal">{year}</div>
        <button className="mr-1 rounded-full bg-gray-100 p-2.5">
          <Search strokeWidth={3} color="#6A778B" size={16} />
        </button>
        <Button className="bg-green-300">
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
      <div className="grid grid-cols-7 border-l border-t border-gray-300">
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
    </div>
  );
}

export default DesktopView;
