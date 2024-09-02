import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';
import { useCalendarEvents } from '~/hooks/calendar';
import Dates from '~/routes/_app/_left-navbar/home/-components/dates';
import Schedule from './schedule';

function Timeline() {
  const now = dayjs();
  const year = now.year();
  const month = now.month() + 1;

  const leftest = now.subtract(3, 'day');
  const rightest = now.add(3, 'day');

  const { data: middleEvents } = useCalendarEvents({ month, year });
  const useLeft = leftest.month() !== now.month();
  const { data: leftEvents } = useCalendarEvents(
    {
      month: leftest.month() + 1,
      year: leftest.year(),
    },
    { enabled: useLeft },
  );

  const useRight = rightest.month() !== now.month();
  const { data: rightEvents } = useCalendarEvents(
    {
      month: rightest.month() + 1,
      year: rightest.year(),
    },
    {
      enabled: useRight,
    },
  );

  const allEvents = [
    ...(useLeft ? leftEvents ?? [] : []),
    ...(middleEvents ?? []),
    ...(useRight ? rightEvents ?? [] : []),
  ];

  const dates: Dayjs[] = [];

  for (let i = 0; i < 7; i++) {
    dates.push(leftest.add(i, 'day'));
  }

  const [currentDate, setCurrentDate] = useState(now);

  const currentEvents = allEvents.filter((event) =>
    currentDate.isSame(dayjs(event.start), 'date'),
  );

  return (
    <>
      {/* Date Section */}
      <section className="grid w-full max-w-screen-md grid-cols-7 justify-between gap-1 px-4 sm:gap-4">
        {dates.map((date) => (
          <Dates
            key={date.toString()}
            date={date}
            currentDate={currentDate}
            onClick={setCurrentDate}
          />
        ))}
      </section>

      {/* Schedule Section */}
      <section className="mt-2 flex w-full max-w-screen-md flex-col gap-4 px-6 pb-28 lg:mt-10 lg:pb-6">
        <p className="self-start font-semibold">Schedule Today</p>

        <div className="flex justify-between px-1 text-[#BCC1CD]">
          <div className="flex gap-[60px]">
            <p>Time</p>
            <p>Agenda</p>
          </div>
        </div>

        {/* Schedule Cards */}
        <div className="flex flex-col">
          {currentEvents.map((event, idx) => {
            return (
              <Schedule
                key={event.id}
                event={event}
                isLastIndex={idx === currentEvents.length - 1}
                isSecondLastIndex={idx === currentEvents.length - 2}
              />
            );
          })}
        </div>
      </section>
    </>
  );
}

export default Timeline;
