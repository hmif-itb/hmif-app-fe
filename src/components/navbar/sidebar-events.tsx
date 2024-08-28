import SidebarEventLabel from './sidebar-event-label';
import dayjs from 'dayjs';
import { useCalendarEvents } from '~/hooks/calendar';
import { useMemo } from 'react';

type SidebarProps = {
  selectedDate: number;
  selectedMonth: number;
  selectedYear: number;
};

// Constants
const AKADEMIK_CATEGORY = 'akademik';
const HIMPUAN_CATEGORY = 'himpunan';

export default function SidebarEvents({
  selectedDate,
  selectedMonth,
  selectedYear,
}: SidebarProps) {
  function isSelectedDate(start: string) {
    return (
      dayjs(start).date() === selectedDate &&
      dayjs(start).month() === selectedMonth
    );
  }

  const { data: events } = useCalendarEvents({
    month: selectedMonth + 1,
    year: selectedYear,
  });
  const akademik = useMemo(
    () =>
      events?.filter(
        (e) => e.category === AKADEMIK_CATEGORY && isSelectedDate(e.start),
      ),
    [events, selectedDate],
  );
  const himpunan = useMemo(
    () =>
      events?.filter(
        (e) => e.category === HIMPUAN_CATEGORY && isSelectedDate(e.start),
      ),
    [events, selectedDate],
  );

  return (
    <>
      <section className="flex h-full flex-col gap-2">
        {(akademik?.length || 0) > 0 && (
          <div className="flex h-1/2 flex-col">
            <p className="text-lg font-bold">Akademik</p>
            <div className="flex h-full flex-col gap-1.5 overflow-y-scroll">
              {akademik?.map((event, index) => (
                <SidebarEventLabel key={index} event={event} />
              ))}
            </div>
          </div>
        )}

        {(himpunan?.length || 0) > 0 && (
          <div className="flex h-1/2 flex-col">
            <p className="text-lg font-bold">Himpunan</p>
            <div className="flex flex-col gap-1.5 overflow-y-scroll">
              {himpunan?.map((event, index) => (
                <SidebarEventLabel key={index} event={event} />
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  );
}
