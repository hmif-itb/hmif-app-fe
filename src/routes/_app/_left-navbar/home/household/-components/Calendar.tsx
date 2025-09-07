import React, { useState, useMemo } from 'react';
import dayjs from 'dayjs';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { generateDate } from '~/lib/calendar';
import CalendarDay, { EventType } from './CalendarDay';
import CalendarSidebar from './CalendarSidebar';

const HouseholdCalendar = () => {
  const [selectedMonth, setSelectedMonth] = useState(dayjs().month());
  const [selectedYear, setSelectedYear] = useState(dayjs().year());

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const calendarDays = useMemo(
    () => generateDate(selectedMonth, selectedYear),
    [selectedMonth, selectedYear],
  );

  const currentMonthName = dayjs()
    .month(selectedMonth)
    .year(selectedYear)
    .format('MMMM YYYY');
  const today = dayjs();

  const borrowingEvents: EventType[] = [
    {
      title: 'Peminjaman Sakre 1',
      type: 'sekre',
      start_time: new Date(selectedYear, selectedMonth, 5, 8, 0),
    },
    {
      title: 'Peminjaman Proyektor',
      type: 'properti',
      start_time: new Date(selectedYear, selectedMonth, 5, 9, 0),
    },
    {
      title: 'Peminjaman Ruang Rapat',
      type: 'sekre',
      start_time: new Date(selectedYear, selectedMonth, 12, 10, 0),
    },
    {
      title: 'Peminjaman Sound System',
      type: 'properti',
      start_time: new Date(selectedYear, selectedMonth, 12, 14, 0),
    },
    {
      title: 'Peminjaman Sakre 2',
      type: 'sekre',
      start_time: new Date(selectedYear, selectedMonth, 18, 8, 30),
    },
    {
      title: 'Peminjaman Laptop',
      type: 'properti',
      start_time: new Date(selectedYear, selectedMonth, 18, 11, 0),
    },
    {
      title: 'Peminjaman Meja',
      type: 'properti',
      start_time: new Date(selectedYear, selectedMonth, 25, 13, 0),
    },
    {
      title: 'Peminjaman Ruang Aula',
      type: 'sekre',
      start_time: new Date(selectedYear, selectedMonth, 25, 15, 30),
    },
  ];

  // Function to get events for a specific date
  const getEventsForDate = (day: number, isCurrentMonth: boolean) => {
    if (!day || !isCurrentMonth) return [];

    return borrowingEvents.filter((event) => {
      const eventDate = dayjs(event.start_time);
      return (
        eventDate.date() === day &&
        eventDate.month() === selectedMonth &&
        eventDate.year() === selectedYear
      );
    });
  };

  const handlePrevMonth = () => {
    if (selectedMonth === 0) {
      setSelectedMonth(11);
      setSelectedYear(selectedYear - 1);
    } else {
      setSelectedMonth(selectedMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (selectedMonth === 11) {
      setSelectedMonth(0);
      setSelectedYear(selectedYear + 1);
    } else {
      setSelectedMonth(selectedMonth + 1);
    }
  };

  return (
    <div className="flex size-full bg-white">
      <CalendarSidebar borrowingEvents={borrowingEvents} />

      {/* Main Calendar */}
      <div className="flex flex-1 flex-col">
        {/* Calendar Header */}
        <div className="flex items-center justify-between p-4">
          <h1 className="text-[28px] font-medium text-gray-800">
            {currentMonthName}
          </h1>
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrevMonth}
              className="rounded-full p-2 hover:bg-gray-100"
            >
              <ChevronLeft className="size-5 text-gray-500" />
            </button>
            <button
              onClick={handleNextMonth}
              className="rounded-full p-2 hover:bg-gray-100"
            >
              <ChevronRight className="size-5 text-gray-500" />
            </button>
            <button className="rounded-full p-2 hover:bg-gray-100">
              <Search className="size-5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Days of week header */}
        <div className="grid grid-cols-7 ">
          {daysOfWeek.map((day) => (
            <div
              key={day}
              className="border-y-[1px] border-[#DADCE0] bg-white py-[4.5px] text-center text-[12px] font-medium text-[#242426] "
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid flex-1 grid-cols-7 grid-rows-6 gap-px overflow-hidden rounded-lg bg-[#DADCE099] ">
          {calendarDays.map((dateObj, index) => {
            const dayjsDate = dateObj.date;
            const day = dayjsDate.date();
            const isCurrentMonth = dateObj.currentMonth;

            // Check if this date is today
            const currentDate = dayjs()
              .year(selectedYear)
              .month(selectedMonth)
              .date(day);
            const isToday = isCurrentMonth && currentDate.isSame(today, 'date');

            const dayEvents = getEventsForDate(day, isCurrentMonth);

            return (
              <CalendarDay
                key={index}
                day={day}
                events={dayEvents}
                isCurrentMonth={isCurrentMonth}
                isActive={isToday}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HouseholdCalendar;
