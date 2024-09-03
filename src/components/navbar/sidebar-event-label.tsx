import dayjs from 'dayjs';
import { CalendarEvent } from '~/api/generated';

function SidebarEventLabel({ event }: { event: CalendarEvent }) {
  const colorClassMap: { [key: string]: string } = {
    red: 'text-red-500',
    orange: 'text-orange-500',
    amber: 'text-amber-500',
    green: 'text-green-500',
    blue: 'text-blue-500',
    indigo: 'text-indigo-500',
    purple: 'text-purple-500',
    slate: 'text-slate-500',
  };

  const color = 'red';
  const textColorClass = colorClassMap[color] || 'text-black';

  const containerClassNames = `flex-1 truncate text-sm font-semibold ${textColorClass}`;

  return (
    <a
      href={event.googleCalendarUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex w-full flex-row items-center py-0.5 text-xs"
    >
      <p className={containerClassNames}>● {event.title}</p>
      <p className="text-sm font-semibold">
        {dayjs(event.start).format('HH:mm')}
      </p>
    </a>
  );
}

export default SidebarEventLabel;
