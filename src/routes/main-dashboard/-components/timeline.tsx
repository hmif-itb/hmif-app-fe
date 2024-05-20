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
      <section className="px-4 grid grid-cols-7 gap-1 sm:gap-4 justify-between max-w-[500px] size-full">
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
      <section className="px-6 flex flex-col gap-4 max-w-[500px] w-full">
        <p className="self-start font-semibold">Schedule Today</p>

        <div className="px-2 flex justify-between text-[#BCC1CD]">
          <div className="flex gap-8">
            <p>Time</p>
            <p>Agenda</p>
          </div>

          <div>
            <img
              src="/main-dashboard/filter.svg"
              alt="Filter"
              className="size-6"
            />
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
