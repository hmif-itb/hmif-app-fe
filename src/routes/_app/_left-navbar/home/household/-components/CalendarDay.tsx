import { useState } from 'react';
import dayjs from 'dayjs';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog';
import { cn } from '~/lib/utils';
import { EventType } from '../-types';

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
  const [open, setOpen] = useState(false);
  const [selectedDayEvents, setSelectedDayEvents] = useState<
    EventType[] | null
  >(null);

  const formatEventTime = (value: Date) =>
    dayjs(value).format('DD/MM/YYYY HH.mm');
  return (
    <>
      <div
        className="relative flex cursor-pointer flex-col justify-between bg-white p-2 transition-colors hover:bg-gray-50"
        onClick={() => {
          setSelectedDayEvents(events || []);
          setOpen(true);
        }}
      >
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
                  <div
                    key={idx}
                    className="space-y-1 text-[10px] font-semibold"
                  >
                    {event.type === 'sekre' && (
                      <div className="truncate rounded border-DEFAULT border-[#131C6D] bg-[#BFC6FF] px-1 py-0.5 text-xs text-[#131C6D]">
                        {event.name}
                      </div>
                    )}
                    {event.type === 'properti' && (
                      <div className="truncate rounded border-DEFAULT border-[#721818] bg-[#FFDDDD] px-1 py-0.5 text-xs text-[#721818]">
                        {event.name}
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </>
        )}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Peminjaman</DialogTitle>
          </DialogHeader>
          {selectedDayEvents && selectedDayEvents.length > 0 ? (
            <div className="flex flex-col gap-4">
              {selectedDayEvents.map((event, idx) => (
                <div key={idx}>
                  <div
                    className={cn(
                      'rounded-2xl p-4 text-white shadow-sm',
                      event.type === 'properti'
                        ? 'bg-[#2F5C3B]'
                        : 'bg-[#2A4F34]',
                    )}
                  >
                    <p className="text-base font-semibold leading-tight">
                      {event.title}
                    </p>
                    <p className="mt-[10px] text-xs text-[#DDE8DF]">
                      {event.user}
                    </p>
                    <div className="mt-2 flex items-center gap-4">
                      <p className="text-xs text-[#DDE8DF]">
                        Mulai: {formatEventTime(event.start_time)}
                      </p>
                      <p className="text-xs text-[#DDE8DF]">
                        Selesai: {formatEventTime(event.end_time)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No events for this day.</p>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
export default CalendarDay;
