import { Separator } from '@radix-ui/react-separator';
import dayjs from 'dayjs';
import { useEffect, useMemo, useState } from 'react';
import { CalendarEvent } from '~/api/generated';
import Calendar, { EventsByDate } from '~/components/new-calendar';
import Schedule from '~/components/schedule/schedule';
import useSession from '~/hooks/auth/useSession';
import { useThreeMonthCalendarEvents } from '~/hooks/calendar';
import AddButtons from './AddButtons';

export default function MobileView() {
  const now = dayjs();

  const user = useSession();

  const [selectedDate, setSelectedDate] = useState(now.toDate());
  const [selectedEvents, setSelectedEvents] = useState<CalendarEvent[]>([]);
  const [btnOpen, setBtnOpen] = useState(false);

  const allEvents = useThreeMonthCalendarEvents({
    month: now.month(),
    year: now.year(),
  });

  // const eventsByDate = ;
  const eventsByDate = useMemo(
    () =>
      allEvents?.reduce((acc, event) => {
        const start = dayjs(event.start).format('MMDD');
        if (!acc[start]) {
          acc[start] = [];
        }
        acc[start].push(event);
        return acc;
      }, {} as EventsByDate),
    [allEvents],
  );

  useEffect(() => {
    const selected = dayjs(selectedDate).format('MMDD');
    setSelectedEvents(eventsByDate ? eventsByDate[selected] || [] : []);
  }, [selectedDate, eventsByDate]);

  return (
    <div className="flex h-screen w-full flex-col items-center gap-2 overflow-auto px-4 pt-4 lg:hidden">
      <Calendar
        onChange={(date) => setSelectedDate(date)}
        isMobile={true}
        eventsByDate={eventsByDate}
      />

      <Separator />

      {/* Schedule Section */}
      <section className="flex w-full flex-auto flex-col gap-2 px-2">
        <p className="self-start font-semibold">Schedule</p>

        <div className="flex justify-between px-1 text-[#BCC1CD]">
          <div className="flex gap-[60px]">
            <p>Time</p>
            <p>Agenda</p>
          </div>
        </div>

        {/* Schedule Cards */}
        <div className="flex w-full flex-auto flex-col py-1 pb-28 lg:pb-6">
          {selectedEvents.map((event, idx) => {
            return (
              <Schedule
                key={event.id}
                event={event}
                isLastIndex={idx === selectedEvents.length - 1}
                isSecondLastIndex={idx === selectedEvents.length - 2}
              />
            );
          })}
        </div>
      </section>

      {(user?.roles?.includes('akademik') ||
        user?.roles?.includes('ring1')) && (
        <AddButtons roles={user.roles} isOpen={btnOpen} setOpen={setBtnOpen} />
      )}
    </div>
  );
}
