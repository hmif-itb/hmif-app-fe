import dayjs from 'dayjs';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { generateDate, months } from '../lib/calendar';
import { cn } from '../lib/utils';
import { Separator } from './ui/separator';

type ComponentProps = {
  isMobile: boolean;
  className?: string;
  dateClassName?: string;
  dayClassName?: string;
  onChange?: (date: Date) => void;
  currentMonth?: number;
  currentYear?: number;
  onMonthChange?: (newMonth: number) => void;
  defaultDate?: Date;
};

/**
 * A calendar component that allows users to navigate through months and select dates.
 * @component
 */
export default function Calendar({
  isMobile,
  className,
  dateClassName,
  dayClassName,
  onChange,
  defaultDate,
  onMonthChange,
}: Readonly<ComponentProps>) {
  const days = isMobile
    ? ['Sun', 'Mon', 'Tue', 'Wed', 'Tu', 'Fri', 'Sat']
    : ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const currentDate = dayjs();
  const [today, setToday] = useState(
    defaultDate ? dayjs(defaultDate) : currentDate,
  );
  const [selectDate, setSelectDate] = useState(
    defaultDate ? dayjs(defaultDate) : currentDate,
  );

  useEffect(() => {
    if (onChange) {
      onChange(selectDate.toDate());
    }
  }, [selectDate]);

  return (
    <div
      className={cn(
        isMobile ? 'max-w-[400px]' : 'max-w-[350px]',
        'flex w-full flex-col items-center justify-center sm:flex-row',
        className,
      )}
    >
      <div className="relative flex size-full flex-col gap-4">
        <div className="relative flex items-center justify-between">
          <div className="flex w-full items-center justify-between gap-10 px-2">
            <h1 className="select-none">
              <span className="font-bold">{months[today.month()]}</span>{' '}
              {today.year()}
            </h1>
            <div className={cn(isMobile ? 'gap-2' : 'gap-4', 'flex')}>
              <div
                className={cn(
                  isMobile
                    ? 'size-[2.125rem] rounded-[0.625rem] border-[#CED3DE]/50'
                    : 'size-[20px] rounded-full border-black',
                  'flex items-center justify-center border',
                )}
              >
                <ChevronLeft
                  className={cn(!isMobile && 'size-[15px]', 'cursor-pointer')}
                  onClick={() => {
                    if (onMonthChange) {
                      onMonthChange(today.month() - 1);
                    }
                    setToday(today.month(today.month() - 1));
                  }}
                />
              </div>

              <div
                className={cn(
                  isMobile
                    ? 'size-[2.125rem] rounded-[0.625rem] border-[#CED3DE]/50'
                    : 'size-[20px] rounded-full border-black',
                  'flex items-center justify-center border',
                )}
              >
                <ChevronRight
                  className={cn(!isMobile && 'size-[15px]', 'cursor-pointer')}
                  onClick={() => {
                    if (onMonthChange) {
                      onMonthChange(today.month() + 1);
                    }
                    setToday(today.month(today.month() + 1));
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <Separator className="bg-[#EAEAEA]" />
        <div className="relative grid grid-cols-7">
          {days.map((day, index) => {
            return (
              <div
                key={index}
                className={cn(
                  'grid select-none place-content-center text-center text-sm text-[#8F9BB3]',
                  dayClassName,
                )}
              >
                {day}
              </div>
            );
          })}
        </div>

        <div className="relative grid grid-cols-7">
          {generateDate(today.month(), today.year()).map(
            ({ date, currentMonth, today }, index) => {
              return (
                <div
                  key={index}
                  className="relative grid place-content-center p-1 text-center text-sm"
                >
                  <h1
                    className={cn(
                      currentMonth ? 'text-[#2E2E2E]' : 'text-[#8E8E93]',
                      today ? 'bg-green-100' : '',
                      selectDate.toDate().toDateString() ===
                        date.toDate().toDateString()
                        ? 'bg-[#E2C66F]'
                        : '',
                      isMobile ? 'rounded-[0.625rem]' : 'rounded-full',
                      !isMobile &&
                        selectDate.toDate().toDateString() ===
                          date.toDate().toDateString()
                        ? 'text-white'
                        : '',
                      'grid size-8 cursor-pointer select-none place-content-center transition-all hover:bg-[#E2C66F]/50',
                      dateClassName,
                    )}
                    onClick={() => {
                      setSelectDate(date);
                    }}
                  >
                    {isMobile
                      ? date.date()
                      : date.date().toString().padStart(2, '0')}
                  </h1>
                  {isMobile &&
                    selectDate.toDate().toDateString() ===
                      date.toDate().toDateString() && (
                      <div className="absolute -bottom-1 flex place-self-center">
                        <svg
                          width="5"
                          height="6"
                          viewBox="0 0 5 6"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle
                            cx="2.84001"
                            cy="2.94035"
                            r="1.48"
                            stroke="#00B383"
                            strokeWidth="1.2"
                          />
                        </svg>

                        <svg
                          width="6"
                          height="6"
                          viewBox="0 0 6 6"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle
                            cx="2.99992"
                            cy="2.94035"
                            r="1.48"
                            stroke="#735BF2"
                            strokeWidth="1.2"
                          />
                        </svg>

                        <svg
                          width="5"
                          height="6"
                          viewBox="0 0 5 6"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle
                            cx="2.16008"
                            cy="2.94035"
                            r="1.48"
                            stroke="#0095FF"
                            strokeWidth="1.2"
                          />
                        </svg>
                      </div>
                    )}
                </div>
              );
            },
          )}
        </div>
        <Separator className="bg-[#EAEAEA]" />
      </div>
    </div>
  );
}
