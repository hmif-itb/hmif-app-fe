import dayjs from 'dayjs';
import EventLabel from './event-label';
import { useState, useEffect } from 'react';
import { cn } from '~/lib/utils';

function CalendarDay({
  day,
  isCurrentMonth,
  isWeekend,
  events,
}: {
  day: number;
  isCurrentMonth: boolean;
  isWeekend: boolean;
  events: { title: string; time: string; color: string }[];
}) {
  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);

  // useEffect(() => {
  //   // setToday(currentDate);
  //   console.log('kena', currentDate);
  // }, [currentDate]);

  const isToday = day === today.date() && isCurrentMonth;

  const formattedDay = day.toString().padStart(2, '0');

  return (
    <div
      className={cn(
        'flex h-48 flex-col justify-between border-b border-r border-gray-300 p-1',
        isWeekend && 'bg-gray-100',
      )}
    >
      <span className="text-xs font-medium text-gray-700">
        {isToday ? (
          <div className="size-fit rounded-full bg-yellow-300 px-2 py-1 text-white">
            {formattedDay}
          </div>
        ) : (
          <div className={cn('p-1.5', !isCurrentMonth && 'text-gray-300')}>
            {formattedDay}
          </div>
        )}
      </span>
      {isCurrentMonth && (
        <div className="flex flex-col gap-1">
          {events.map((event, index) => (
            <EventLabel
              key={index}
              title={event.title}
              time={event.time}
              color={event.color}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default CalendarDay;
