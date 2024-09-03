import dayjs from 'dayjs';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { useCalendarEvents } from '~/hooks/calendar';
import { generateDate, months } from '../lib/calendar';
import { cn } from '../lib/utils';

/**
 * A calendar component that allows users to navigate through months and select dates.
 * @component
 */
export default function Calendar() {
  const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);
  const [selectDate, setSelectDate] = useState(currentDate);
  const year = today.year();
  const month = today.month() + 1;

  const { data: events } = useCalendarEvents({ month, year });

  return (
    <div className="flex w-full flex-col items-center justify-center sm:flex-row">
      <div className="relative flex flex-col gap-4 rounded-xl p-8">
        <img
          src="/img/home/calendar-bg.png"
          className="absolute left-0 top-0 size-full select-none rounded-xl object-cover"
        />
        <div className="relative flex items-center justify-between">
          <div className="flex w-full items-center justify-between gap-10">
            <ChevronLeft
              className="cursor-pointer text-yellow-300 transition-all hover:scale-105"
              onClick={() => {
                setToday(today.month(today.month() - 1));
              }}
            />
            {/* <h1
              className=" cursor-pointer hover:scale-105 transition-all"
              onClick={() => {
                setToday(currentDate);
              }}
            >
              Today
            </h1> */}
            <span className="select-none text-neutral-light">
              {months[today.month()]} {today.year()}
            </span>
            <ChevronRight
              className="cursor-pointer text-yellow-300 transition-all hover:scale-105"
              onClick={() => {
                setToday(today.month(today.month() + 1));
              }}
            />
          </div>
        </div>
        <div className="relative grid grid-cols-7">
          {days.map((day, index) => {
            return (
              <div
                key={index}
                className="grid select-none place-content-center text-center text-sm font-semibold text-neutral-light"
              >
                {day}
              </div>
            );
          })}
        </div>

        <div className="relative grid grid-cols-7">
          {generateDate(today.month(), today.year()).map(
            ({ date, currentMonth, today }, index) => {
              return (
                <div
                  key={index}
                  className="grid place-content-center p-1 text-center text-sm text-neutral-light"
                >
                  <span
                    className={cn(
                      currentMonth ? '' : 'text-gray-400',
                      today ? 'bg-green-100' : '',
                      selectDate.isSame(date, 'date') ? 'bg-[#FBBC05]' : '',
                      'grid size-8 cursor-pointer select-none place-content-center rounded-full font-bold transition-all hover:bg-green-500',
                      events?.find((event) =>
                        dayjs(event.start).isSame(date, 'date'),
                      )
                        ? 'bg-yellow-300/50'
                        : '',
                    )}
                    onClick={() => {
                      setSelectDate(date);
                    }}
                  >
                    {date.date()}
                  </span>
                </div>
              );
            },
          )}
        </div>
      </div>
      {/* <div className="size-96 sm:px-5">
        <h1 className=" font-semibold">
          Schedule for {selectDate.toDate().toDateString()}
        </h1>
        <p className="text-gray-400">No meetings for today.</p>
      </div> */}
    </div>
  );
}
