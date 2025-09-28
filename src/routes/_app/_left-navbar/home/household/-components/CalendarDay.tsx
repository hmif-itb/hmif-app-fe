export interface EventType {
  title: string;
  type: 'sekre' | 'properti';
  start_time: Date;
}

function CalendarDay({
  day,
  events,
  isActive = false,
  isCurrentMonth = true,
}: {
  day: number | null;
  events?: EventType[];
  isActive?: boolean;
  isCurrentMonth?: boolean;
}) {
  return (
    <div className="relative flex flex-col justify-between bg-white p-2 transition-colors hover:bg-gray-50">
      {day && (
        <>
          {/* Date */}
          <div
            className={`text-[10px] font-medium ${isCurrentMonth ? (isActive ? 'w-fit rounded-full bg-[#E2C66F] px-[6px] py-[5px] text-white' : 'text-[#333333]') : 'text-[#3333333c]'}`}
          >
            {day.toString().padStart(2, '0')}
          </div>
          {/* Events */}
          <div className="flex flex-col gap-1">
            {events &&
              events.map((event, idx) => (
                <div key={idx} className="space-y-1 text-[10px] font-semibold">
                  {event.type === 'sekre' && (
                    <div className="truncate rounded border-DEFAULT border-[#131C6D] bg-[#BFC6FF] px-1 py-0.5 text-xs text-[#131C6D] ">
                      {event.title}
                    </div>
                  )}
                  {event.type === 'properti' && (
                    <div className="truncate rounded border-DEFAULT border-[#721818] bg-[#FFDDDD] px-1 py-0.5 text-xs text-[#721818]">
                      {event.title}
                    </div>
                  )}
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  );
}

export default CalendarDay;
