import { CirclePlus, Clock, FileText, Search, X } from 'lucide-react';
import HeaderTitle from '~/components/header-title';
import { Button } from '~/components/ui/button';
import CalendarDay from './calendar-day';
import dayjs from 'dayjs';
import { useState, useRef, useEffect } from 'react';
import { Textarea } from '~/components/ui/textarea';
import { cn } from '~/lib/utils';

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
  const [date, setDate] = useState(dayjs().format('YYYY-MM-DD'));
  const [startTime, setStartTime] = useState(
    dayjs().startOf('minute').format('HH:mm'),
  );
  const [endTime, setEndTime] = useState(
    dayjs().add(1, 'hour').startOf('minute').format('HH:mm'),
  );

  const [showFloatingCategoryModal, setShowFloatingCategoryModal] =
    useState(false);
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [category, setCategory] = useState('');

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

  const handleCategoryButtonClick = (selectedCategory: string) => {
    setCategory(selectedCategory);
    setShowFloatingCategoryModal(false);
    setShowAddEventModal(true);
  };

  const categoryModalRef = useRef<HTMLDivElement>(null);
  const addEventModalRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const now = dayjs();
    const roundedMinutes = Math.ceil(now.minute() / 5) * 5;
    const start = now.minute(roundedMinutes).second(0);
    const end = start.add(1, 'hour');
    setStartTime(start.format('HH:mm'));
    setEndTime(end.format('HH:mm'));
  }, []);

  return (
    <div className="hidden size-full max-h-full flex-col lg:flex">
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

      {showFloatingCategoryModal && (
        <div
          ref={categoryModalRef}
          className="absolute right-8 top-36 flex w-48 flex-col items-center justify-center rounded-lg bg-white py-3 shadow-xl"
        >
          <button
            className="block w-full p-2 text-right text-black hover:bg-gray-200"
            onClick={() => handleCategoryButtonClick('Akademik')}
          >
            Akademik
          </button>
          <button
            className="block w-full p-2 text-right text-black hover:bg-gray-200"
            onClick={() => handleCategoryButtonClick('Blank')}
          >
            Blank
          </button>
        </div>
      )}

      {showAddEventModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800/75">
          <div ref={addEventModalRef} className="rounded-xl bg-white shadow-xl">
            <div className="flex w-full justify-end rounded-t-xl bg-gray-300 px-4 py-3">
              <button onClick={() => setShowAddEventModal(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="px-10 py-8">
              <div className="mb-4 ml-11">
                <input
                  type="text"
                  placeholder="Add title"
                  className="w-full border-0 border-b-2 border-gray-300 text-3xl font-medium placeholder:text-3xl focus:border-gray-500 focus:outline-0"
                />
              </div>
              <div className="mb-6 ml-11 flex gap-2">
                <button
                  className={cn(
                    category === 'Akademik' && 'bg-yellow-100 text-green-500',
                    category === 'Blank' && 'border border-gray-800 bg-white',
                    'flex flex-row items-center gap-2 rounded-md px-4 py-2 font-medium',
                  )}
                  onClick={() => setCategory('Akademik')}
                >
                  <img src="/img/icons/akademikEvent.svg" />
                  Akademik
                </button>
                <button
                  className={cn(
                    category === 'Blank' && 'bg-yellow-100 text-green-500',
                    category === 'Akademik' &&
                      'border border-gray-800 bg-white',
                    'flex flex-row items-center gap-2 rounded-md px-4 py-2 font-medium',
                  )}
                  onClick={() => setCategory('Blank')}
                >
                  <img src="/img/icons/blankEvent.svg" />
                  Blank
                </button>
              </div>
              <div className="mb-5">
                <div className="flex items-center gap-2">
                  <img src="/img/icons/clock.svg" className="mr-3" />
                  <input
                    type="date"
                    className="border-0 border-b-2 border-gray-300 focus:border-gray-500 focus:outline-0"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                  <input
                    type="time"
                    className="border-0 border-b-2 border-gray-300 focus:border-gray-500 focus:outline-0"
                    step="300" // step attribute to increment by 5 minutes
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                  />
                  <input
                    type="time"
                    className="border-0 border-b-2 border-gray-300 focus:border-gray-500 focus:outline-0"
                    step="300" // step attribute to increment by 5 minutes
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                  />
                </div>
              </div>
              <div className="mb-5 flex items-start gap-2">
                <img src="/img/icons/eventSubject.svg" className="mr-3" />
                <input
                  type="text"
                  placeholder="Add subject"
                  className="w-full border-0 placeholder:text-base focus:border-b-2 focus:border-gray-500 focus:outline-0"
                />
              </div>
              <div className="mb-5 flex items-start gap-2">
                <img src="/img/icons/description.svg" className="mr-3" />
                <textarea
                  placeholder="Add description"
                  className="w-full border-0 placeholder:text-base focus:border-b-2 focus:border-gray-500 focus:outline-0"
                  rows={1}
                  onInput={(e) => {
                    e.currentTarget.style.height = 'auto';
                    e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
                  }}
                />
              </div>
              <div className="flex justify-end">
                <Button
                  className="bg-green-300 text-white"
                  onClick={() => setShowAddEventModal(false)}
                >
                  Save
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DesktopView;
