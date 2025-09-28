import dayjs, { type Dayjs } from 'dayjs';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '~/lib/utils';
import type { EventType } from '../../-api';

interface CalendarDayData {
  currentMonth: boolean;
  date: Dayjs;
}

interface CalendarMobileProps {
  monthLabel: string;
  daysOfWeek: string[];
  calendarDays: CalendarDayData[];
  today: Dayjs;
  selectedDate: Dayjs;
  events: EventType[];
  isLoading: boolean;
  onSelectDate: (dateObj: Dayjs, isCurrentMonth: boolean) => void;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}

function CalendarMobile({
  monthLabel,
  daysOfWeek,
  calendarDays,
  today,
  selectedDate,
  events,
  isLoading,
  onSelectDate,
  onPrevMonth,
  onNextMonth,
}: CalendarMobileProps) {
  return (
    <section className="rounded-3xl bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-xl font-bold text-black">{monthLabel}</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="flex size-10 items-center justify-center rounded-xl border border-[#DADADA] text-[#1F4F32] shadow-sm disabled:opacity-40"
            onClick={onPrevMonth}
            disabled={isLoading}
            aria-label="Bulan sebelumnya"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            className="flex size-10 items-center justify-center rounded-xl border border-[#DADADA] text-[#1F4F32] shadow-sm disabled:opacity-40"
            onClick={onNextMonth}
            disabled={isLoading}
            aria-label="Bulan berikutnya"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 text-center text-xs font-semibold uppercase tracking-wide text-[#8F9BB3]">
        {daysOfWeek.map((day) => (
          <span key={day} className="py-1">
            {day}
          </span>
        ))}
      </div>

      <div className="mt-2 grid grid-cols-7 gap-2 text-base text-[#2E2E2E]">
        {calendarDays.map((dateObj, index) => {
          const dateValue = dateObj.date;
          const isCurrentMonth = dateObj.currentMonth;
          const isSelected = dateValue.isSame(selectedDate, 'day');
          const isToday = dateValue.isSame(today, 'day');
          const dots = events.filter((event) =>
            dayjs(event.start_time).isSame(dateValue, 'day'),
          );

          return (
            <button
              key={`${dateValue.toString()}-${index}`}
              type="button"
              onClick={() => onSelectDate(dateValue, isCurrentMonth)}
              className={cn(
                'flex aspect-square w-full flex-col items-center justify-center gap-1 rounded-2xl px-1 text-base font-semibold transition',
                isSelected && 'bg-[#F3E4A5] text-[#143923] shadow-sm',
                !isSelected && isToday && 'text-[#143923]',
                isCurrentMonth
                  ? !isSelected && !isToday && 'text-[#2F4C38]'
                  : 'text-[#BFC7BF] hover:text-[#83958A]',
              )}
            >
              <span>{dateValue.date()}</span>
              <div className="flex gap-1">
                {dots.slice(0, 3).map((_, dotIndex) => (
                  <span
                    key={dotIndex}
                    className={cn(
                      'size-1.5 rounded-full',
                      isSelected ? 'bg-[#143923]' : 'bg-[#88A096]',
                    )}
                  />
                ))}
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}

export default CalendarMobile;
