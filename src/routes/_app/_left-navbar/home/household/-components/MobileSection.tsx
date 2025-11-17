import { type Dayjs } from 'dayjs';
import MobileHeader from './mobile/MobileHeader';
import CalendarMobile from './mobile/CalendarMobile';
import TimelineMobile from './mobile/TimelineMobile';
import BorrowListMobile from './mobile/BorrowListMobile';
import MobileActions from './mobile/MobileActions';
import { EventType, PeminjamanItemData } from '../-types';

interface CalendarDayData {
  currentMonth: boolean;
  date: Dayjs;
}

interface MobileSectionProps {
  isAdmin: boolean;
  monthLabel: string;
  daysOfWeek: string[];
  calendarDays: CalendarDayData[];
  today: Dayjs;
  selectedDate: Dayjs;
  events: EventType[];
  eventsForSelectedDate: EventType[];
  peminjamanItems: PeminjamanItemData[];
  isLoading: boolean;
  onSelectDate: (dateObj: Dayjs, isCurrentMonth: boolean) => void;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}

function MobileSection({
  isAdmin,
  monthLabel,
  daysOfWeek,
  calendarDays,
  today,
  selectedDate,
  events,
  eventsForSelectedDate,
  peminjamanItems,
  isLoading,
  onSelectDate,
  onPrevMonth,
  onNextMonth,
}: MobileSectionProps) {
  return (
    <div className="flex flex-col gap-6 bg-[#FBFBFB] px-9 pb-24 pt-[60px]">
      <MobileHeader isAdmin={isAdmin} />
      <CalendarMobile
        monthLabel={monthLabel}
        daysOfWeek={daysOfWeek}
        calendarDays={calendarDays}
        today={today}
        selectedDate={selectedDate}
        events={events}
        isLoading={isLoading}
        onSelectDate={onSelectDate}
        onPrevMonth={onPrevMonth}
        onNextMonth={onNextMonth}
      />
      <TimelineMobile events={eventsForSelectedDate} isLoading={isLoading} />
      <BorrowListMobile items={peminjamanItems} isLoading={isLoading} />
      <MobileActions isAdmin={isAdmin} />
    </div>
  );
}

export default MobileSection;
