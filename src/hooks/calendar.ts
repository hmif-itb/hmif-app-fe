import { useQuery } from '@tanstack/react-query';
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
