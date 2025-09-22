import dayjs from 'dayjs';
import { EventType } from './CalendarDay';

interface CalendarSidebarProps {
  borrowingEvents: EventType[];
  isLoading?: boolean;
}

function CalendarSidebar({
  borrowingEvents,
  isLoading = false,
}: CalendarSidebarProps) {
  return (
    <div className="w-[204px] rounded-r-xl border-r border-gray-200 bg-white p-4">
      <h2 className="mb-4 text-lg font-semibold text-gray-800">Peminjaman</h2>
      <div className="flex w-full flex-col">
        {isLoading
          ? // Loading skeleton
            Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="mb-2 flex w-full items-center gap-0.5"
              >
                <div className="min-h-2 min-w-2 animate-pulse rounded-full bg-gray-200" />
                <div className="flex size-full items-center justify-between">
                  <div className="h-3 w-20 animate-pulse rounded bg-gray-200" />
                  <div className="h-3 w-10 animate-pulse rounded bg-gray-200" />
                </div>
              </div>
            ))
          : borrowingEvents.map((item, index) => (
              <div
                key={index}
                className="mb-1 flex w-full items-center gap-0.5"
              >
                <div
                  className={`min-h-2 min-w-2 rounded-full ${item.type === 'sekre' ? 'bg-[#3849E0] ' : 'bg-[#BE1A1A] '}`}
                />
                <div className="flex size-full items-center justify-between text-[10px] font-semibold">
                  <div
                    className={`text-gray-700 ${item.type === 'sekre' ? 'text-[#3849E0] ' : 'text-[#BE1A1A] '}`}
                  >
                    {item.title}
                  </div>
                  <div className="text-[#333333]">
                    {dayjs(item.start_time).format('HH:mm')}
                  </div>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}

export default CalendarSidebar;
