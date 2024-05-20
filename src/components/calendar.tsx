import dayjs from 'dayjs';
import { useState } from 'react';
import { generateDate, months } from '../lib/calendar';
import { cn } from '../lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Calendar() {
  const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);
  const [selectDate, setSelectDate] = useState(currentDate);
  return (
    <div className="flex justify-center items-center sm:flex-row flex-col size-full">
      <div className="flex flex-col bg-green-300 p-8 rounded-xl gap-4">
        <div className="flex justify-between items-center">
          <div className="flex gap-10 items-center justify-around w-full">
            <ChevronLeft
              className="cursor-pointer hover:scale-105 transition-all text-yellow-300"
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
            <h1 className="select-none text-gray-300">
              {months[today.month()]} {today.year()}
            </h1>
            <ChevronRight
              className="cursor-pointer hover:scale-105 transition-all text-yellow-300"
              onClick={() => {
                setToday(today.month(today.month() + 1));
              }}
            />
          </div>
        </div>
        <div className="grid grid-cols-7">
          {days.map((day, index) => {
            return (
              <h1
                key={index}
                className="text-sm text-center grid place-content-center text-gray-300 select-none font-semibold"
              >
                {day}
              </h1>
            );
          })}
        </div>

        <div className="grid grid-cols-7">
          {generateDate(today.month(), today.year()).map(
            ({ date, currentMonth, today }, index) => {
              return (
                <div
                  key={index}
                  className="p-1 text-center grid place-content-center text-sm text-gray-300"
                >
                  <h1
                    className={cn(
                      currentMonth ? '' : 'text-gray-500',
                      today ? 'bg-green-100' : '',
                      selectDate.toDate().toDateString() ===
                        date.toDate().toDateString()
                        ? 'bg-[#FBBC05]'
                        : '',
                      'size-8 rounded-full grid place-content-center hover:bg-green-500 transition-all cursor-pointer select-none font-bold',
                    )}
                    onClick={() => {
                      setSelectDate(date);
                    }}
                  >
                    {date.date()}
                  </h1>
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
