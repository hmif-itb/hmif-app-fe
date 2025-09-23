import React, { useMemo } from 'react';
import dayjs from 'dayjs';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { generateDate } from '~/lib/calendar';
import CalendarDay, { EventType } from './CalendarDay';
import CalendarSidebar from './CalendarSidebar';

interface HouseholdCalendarProps {
  selectedMonth: number;
  selectedYear: number;
  events: EventType[];
  isLoading: boolean;
  onMonthChange: (month: number, year: number) => void;
}

const HouseholdCalendar = ({
  selectedMonth,
  selectedYear,
  events,
  isLoading,
  onMonthChange,
}: HouseholdCalendarProps) => {
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

  // Function to get events for a specific date
  const getEventsForDate = (day: number, isCurrentMonth: boolean) => {
    if (!day || !isCurrentMonth || !events.length) return [];

    return events.filter((event) => {
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
      onMonthChange(11, selectedYear - 1);
    } else {
      onMonthChange(selectedMonth - 1, selectedYear);
    }
  };

  const handleNextMonth = () => {
    if (selectedMonth === 11) {
      onMonthChange(0, selectedYear + 1);
    } else {
      onMonthChange(selectedMonth + 1, selectedYear);
    }
  };

  return (
    <div className="flex size-full bg-white">
      <CalendarSidebar borrowingEvents={events} isLoading={isLoading} />

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
              disabled={isLoading}
              className="rounded-full p-2 hover:bg-gray-100 disabled:opacity-50"
            >
              <ChevronLeft className="size-5 text-gray-500" />
            </button>
            <button
              onClick={handleNextMonth}
              disabled={isLoading}
              className="rounded-full p-2 hover:bg-gray-100 disabled:opacity-50"
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
          {isLoading
            ? // Loading state
              Array.from({ length: 42 }).map((_, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center bg-white p-2"
                />
              ))
            : calendarDays.map((dateObj, index) => {
                const dayjsDate = dateObj.date;
                const day = dayjsDate.date();
                const isCurrentMonth = dateObj.currentMonth;

                // Check if this date is today
                const currentDate = dayjs()
                  .year(selectedYear)
                  .month(selectedMonth)
                  .date(day);
                const isToday =
                  isCurrentMonth && currentDate.isSame(today, 'date');

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
