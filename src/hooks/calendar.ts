import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import { api } from '~/api/client';

export function useCalendarEvents(
  {
    month,
    year,
  }: {
    month: number;
    year: number;
  },
  options?: {
    enabled?: boolean;
  },
) {
  return useQuery({
    queryKey: ['calendar-events', { month, year }],
    queryFn() {
      return api.calendar.getPersonalCalendar({ month, year });
    },
    ...options,
  });
}

export function useThreeMonthCalendarEvents({
  month,
  year,
}: {
  month: number;
  year: number;
}) {
  const { data: events } = useCalendarEvents({
    month: month + 1,
    year,
  });

  const lastMonth = dayjs(new Date(year, month - 1, 1));
  const nextMonth = dayjs(new Date(year, month + 1, 1));

  const { data: lastEvents } = useCalendarEvents({
    month: lastMonth.month() + 1,
    year: lastMonth.year(),
  });

  const { data: nextEvents } = useCalendarEvents({
    month: nextMonth.month() + 1,
    year: nextMonth.year(),
  });

  const allEvents = useMemo(() => {
    return [...(lastEvents ?? []), ...(events ?? []), ...(nextEvents ?? [])];
  }, [lastEvents, events, nextEvents]);

  return allEvents;
}
