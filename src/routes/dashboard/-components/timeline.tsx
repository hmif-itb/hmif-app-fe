import { useState } from 'react';
import dates from '../-dummy/dates';
import Dates from './dates';
import infos from '../-dummy/info';
import Schedule from './schedule';

function Timeline() {
  const [currentDate, setCurrentDate] = useState('21');
  const [currentInfo, setCurrentInfo] = useState(infos[3].info);

  function handleDateClick(date: string) {
    setCurrentDate(date);
    setCurrentInfo(infos.find((info) => info.date === date)?.info || []);
  }

  return (
    <>
      {/* Date Section */}
      <section className="grid size-full max-w-[500px] grid-cols-7 justify-between gap-1 px-4 sm:gap-4 lg:max-w-full">
        {dates.map((date) => (
          <Dates
            key={date.date}
            date={date}
            currentDate={currentDate}
            onClick={(date) => handleDateClick(date)}
          />
        ))}
      </section>

      {/* Schedule Section */}
      <section className="flex w-full max-w-[500px] flex-col gap-4 px-6">
        <p className="self-start font-semibold">Schedule Today</p>

        <div className="flex justify-between px-2 text-[#BCC1CD]">
          <div className="flex gap-8">
            <p>Time</p>
            <p>Agenda</p>
          </div>

          <div>
            <img src="/dashboard/filter.svg" alt="Filter" className="size-6" />
          </div>
        </div>

        {/* Schedule Cards */}
        <div className="flex flex-col">
          {currentInfo.map((info, idx) => {
            return (
              <Schedule
                key={info.id}
                info={info}
                isLastIndex={idx === currentInfo.length - 1}
                isSecondLastIndex={idx === currentInfo.length - 2}
              />
            );
          })}
        </div>
      </section>
    </>
  );
}

export default Timeline;
