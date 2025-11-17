import { useMemo, useState } from 'react';
import { Button } from '~/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~/components/ui/popover';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { cn } from '~/lib/utils';

interface CalendarPickerProps {
  value?: string;
  onChange?: (date: string) => void;
  placeholder?: string;
  className?: string;
  minDate?: string;
  startDate?: string;
  endDate?: string;
  isEndDatePicker?: boolean;
  schedules?: Array<{
    startDate: string;
    endDate: string;
    jenisPeminjaman: 'eksklusif' | 'non-eksklusif';
  }>;
}

export function CalendarPicker({
  value,
  onChange,
  placeholder = 'HH/BB/TTTT',
  className,
  minDate,
  startDate,
  endDate,
  isEndDatePicker = false,
  schedules,
}: CalendarPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);
  const normalizedSchedules = useMemo(() => {
    return schedules?.map((item) => {
      const start = new Date(item.startDate);
      const end = new Date(item.endDate);
      const normalizeDate = (date: Date) =>
        new Date(date.getFullYear(), date.getMonth(), date.getDate());
      return {
        start: normalizeDate(start),
        end: normalizeDate(end),
        jenisPeminjaman: item.jenisPeminjaman,
      };
    });
  }, [schedules]);

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = (firstDay.getDay() + 6) % 7; // Adjust for Monday start

    const days = [];

    // Previous month's trailing days
    const prevMonth = new Date(year, month - 1, 0);
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      days.push({
        day: prevMonth.getDate() - i,
        isCurrentMonth: false,
        date: new Date(year, month - 1, prevMonth.getDate() - i),
      });
    }

    // Current month's days
    for (let day = 1; day <= daysInMonth; day++) {
      days.push({
        day,
        isCurrentMonth: true,
        date: new Date(year, month, day),
      });
    }

    // Next month's leading days
    const remainingDays = 42 - days.length;
    for (let day = 1; day <= remainingDays; day++) {
      days.push({
        day,
        isCurrentMonth: false,
        date: new Date(year, month + 1, day),
      });
    }

    return days;
  };

  const formatDate = (date: Date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const parseDate = (dateString: string): Date | null => {
    if (!dateString) return null;
    const [day, month, year] = dateString.split('/');
    return new Date(
      Number.parseInt(year),
      Number.parseInt(month) - 1,
      Number.parseInt(day),
    );
  };

  const isDateInRange = (
    date: Date,
    start: Date | null,
    end: Date | null,
  ): boolean => {
    if (!start || !end) return false;
    return date >= start && date <= end;
  };

  const isDateDisabled = (date: Date): boolean => {
    if (minDate) {
      const minDateObj = parseDate(minDate);
      if (minDateObj && date < minDateObj) return true;
    }
    return false;
  };

  const getScheduleState = (date: Date) => {
    const normalizedDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
    );

    let isExclusiveMidRange = false;
    let textColor: string | undefined;

    normalizedSchedules?.forEach((item) => {
      const isInRange =
        normalizedDate >= item.start && normalizedDate <= item.end;

      if (!isInRange) return;

      if (item.jenisPeminjaman === 'eksklusif') {
        textColor = '#f87171'; // red-400
        if (normalizedDate > item.start && normalizedDate < item.end) {
          isExclusiveMidRange = true;
        }
      } else if (!textColor) {
        textColor = '#ea580c'; // orange-600
      }
    });

    return { isExclusiveMidRange, textColor };
  };

  const getDateStyle = (dayObj: {
    day: number;
    isCurrentMonth: boolean;
    date: Date;
  }) => {
    const date = dayObj.date;
    const startDateObj = startDate ? parseDate(startDate) : null;
    const endDateObj = endDate ? parseDate(endDate) : null;
    const currentValue = value ? parseDate(value) : null;
    const isSelected =
      currentValue && date.toDateString() === currentValue.toDateString();
    const scheduleState = getScheduleState(date);
    const isDisabled =
      isDateDisabled(date) || scheduleState.isExclusiveMidRange;

    let isInRange = false;
    let isRangeStart = false;
    let isRangeEnd = false;

    if (isEndDatePicker && startDateObj) {
      const previewEnd = hoveredDate || endDateObj || currentValue;
      if (previewEnd) {
        isInRange = isDateInRange(date, startDateObj, previewEnd);
        isRangeStart = date.toDateString() === startDateObj.toDateString();
        isRangeEnd =
          previewEnd && date.toDateString() === previewEnd.toDateString();
      }
    }

    return {
      isSelected,
      scheduleTextColor: scheduleState.textColor,
      isDisabled,
      isInRange,
      isRangeStart,
      isRangeEnd,
    };
  };

  const handleDateSelect = (date: Date) => {
    const scheduleState = getScheduleState(date);
    if (isDateDisabled(date) || scheduleState.isExclusiveMidRange) return;

    const formattedDate = formatDate(date);
    onChange?.(formattedDate);
    setIsOpen(false);
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth((prev) => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const days = getDaysInMonth(currentMonth);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          className={cn(
            'w-full justify-between rounded-xl border border-[#BABABA]/30 bg-white text-left text-[14px] font-normal text-[#666666]',
            !value && 'text-muted-foreground',
            className,
          )}
        >
          {value || placeholder}
          <Calendar size={22} className="ml-auto opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-auto rounded-xl border border-[#DADADA] bg-white p-0"
        align="start"
      >
        <div className="p-3">
          {/* Header */}
          <div className="mb-4 flex items-center justify-between">
            {/* Month and Year */}
            <div className="text-sm font-medium text-black">
              <strong>{months[currentMonth.getMonth()]} </strong>
              <span>{currentMonth.getFullYear()}</span>
            </div>
            {/* Buttons */}
            <div className="flex gap-3">
              <Button
                size="sm"
                onClick={() => navigateMonth('prev')}
                className="size-7 rounded-lg border border-[#CED3DE] bg-transparent p-0"
              >
                <ChevronLeft className="size-4 text-[#222B45]" />
              </Button>
              <Button
                size="sm"
                onClick={() => navigateMonth('next')}
                className="size-7 rounded-lg  border border-[#CED3DE] bg-transparent p-0"
              >
                <ChevronRight className="size-4 text-[#222B45]" />
              </Button>
            </div>
          </div>

          {/* Days of week */}
          <div className="mb-2 grid grid-cols-7 gap-1">
            {daysOfWeek.map((day) => (
              <div
                key={day}
                className="p-2 text-center text-sm font-normal text-[#8F9BB3]"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-1">
            {days.map((dayObj, index) => {
              const {
                isSelected,
                scheduleTextColor,
                isDisabled,
                isInRange,
                isRangeStart,
                isRangeEnd,
              } = getDateStyle(dayObj);

              return (
                <Button
                  key={index}
                  size="sm"
                  onClick={() => handleDateSelect(dayObj.date)}
                  onMouseEnter={() =>
                    isEndDatePicker && setHoveredDate(dayObj.date)
                  }
                  onMouseLeave={() => isEndDatePicker && setHoveredDate(null)}
                  disabled={isDisabled}
                  style={
                    scheduleTextColor ? { color: scheduleTextColor } : undefined
                  }
                  className={cn(
                    'relative h-8 w-8 rounded-xl bg-transparent p-0 font-normal text-[#2E2E2E]',
                    !dayObj.isCurrentMonth && 'text-[#8E8E93] opacity-50',
                    isDisabled && 'cursor-not-allowed opacity-30',
                    dayObj.isCurrentMonth &&
                      !isDisabled &&
                      'hover:bg-[#E8C55F] hover:text-[#222B45]',
                    isSelected && 'bg-[#E8C55F] font-medium text-[#222B45]',
                    isInRange &&
                      !isSelected &&
                      'bg-[#E8C55F] bg-opacity-50 text-[#222B45]',
                    (isRangeStart || isRangeEnd) &&
                      'bg-[#E8C55F] font-medium text-[#222B45]',
                  )}
                >
                  {dayObj.day}
                </Button>
              );
            })}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
