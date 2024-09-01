import dayjs from 'dayjs';
import { useState } from 'react';
import { CalendarEvent } from '~/api/generated';
import { cn } from '~/lib/utils';
import EventLabel from './event-label';

function CalendarDay({
  day,
  isCurrentMonth,
  isWeekend,
  events,
}: {
  day: number;
  isCurrentMonth: boolean;
  isWeekend: boolean;
  events: CalendarEvent[];
}) {
  const currentDate = dayjs();
  const [today] = useState(currentDate);

  const isToday = day === today.date() && isCurrentMonth;

  const formattedDay = day.toString().padStart(2, '0');

  return (
    <div
      className={cn(
        'flex h-auto min-h-0 flex-col justify-between border-b border-r border-gray-300 p-1',
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
        <div className="flex flex-col gap-1 overflow-auto">
          {events.map((event, index) => (
            <EventLabel
              key={index}
              title={event.title}
              time={dayjs(event.start).format('HH:mm')}
              color={'teal'}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default CalendarDay;
