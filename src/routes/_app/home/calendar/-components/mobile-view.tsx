import Calendar from '~/components/new-calendar';
import Schedule from '../../-components/schedule';
import { useQuery } from '@tanstack/react-query';
import { api } from '~/api/client';
import { Separator } from '@radix-ui/react-separator';
import { CalendarEvent } from '~/api/generated';
import dayjs from 'dayjs';

interface EventsByDate {
  [key: string]: CalendarEvent[];
}

export default function MobileView({
  currentMonth,
  currentYear,
}: {
  currentMonth: number;
  currentYear: number;
}) {
  const { data: allEvents } = useQuery({
    queryKey: ['allCalendarEvents'],
    queryFn: () => {
      return api.calendar.getCalendarEvent({ year: '2024' });
    },
  });

  const eventsByDate = allEvents?.reduce((acc, event) => {
    const start = dayjs(event.start).format('MMDD');
    if (!acc[start]) {
      acc[start] = [];
    }
    acc[start].push(event);
    return acc;
  }, {} as EventsByDate);

  const today = dayjs().format('MMDD');
  const todayEvents = eventsByDate ? eventsByDate[today] || [] : [];

  return (
    <div className="flex max-h-screen w-full flex-col items-center gap-2 overflow-y-hidden px-4 pt-4">
      <Calendar isMobile={true} />

      <Separator />

      {/* Schedule Section */}
      <section className="mt-2 flex h-[45%] w-full flex-col gap-4 px-2">
        <p className="self-start font-semibold">Schedule</p>

        <div className="flex justify-between pr-2 text-[#BCC1CD]">
          <div className="flex gap-14">
            <p>Time</p>
            <p>Agenda</p>
          </div>

          <div>
            <img src="/img/home/filter.svg" alt="Filter" className="size-6" />
          </div>
        </div>

        {/* Schedule Cards */}
        <div className="flex max-h-full flex-col overflow-y-scroll">
          {todayEvents.map((event, idx) => {
            return (
              <Schedule
                key={event.id}
                event={event}
                isLastIndex={idx === todayEvents.length - 1}
                isSecondLastIndex={idx === todayEvents.length - 2}
              />
            );
          })}
        </div>
      </section>
    </div>
  );
}
