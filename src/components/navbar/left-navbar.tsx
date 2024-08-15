import { Link, useLocation, useMatch } from '@tanstack/react-router';
import HomeIcon from '../icons/home';
import QuestionMarkIcon from '../icons/question-mark';
import SettingsIcon from '../icons/settings';
import Profile from './profile';
import Announce from './Announce';
import Calendar from '../new-calendar';
import { useState } from 'react';
import dayjs from 'dayjs';

function LeftNavbar() {
  const [currentMonth, setCurrentMonth] = useState(dayjs().month());
  const [currentYear, setCurrentYear] = useState(dayjs().year());
  // let isCalendarRoute = false;

  const pathname = useLocation({
    select: (location) => location.pathname,
  });

  // try {
  // isCalendarRoute = useMatch({
  //   from: '/_app/home/calendar/',
  //   // exact: true,
  // });
  // } catch (error) {
  // Handle the error or leave it empty to silently fail
  // console.error('Error matching route:', error);
  // }

  const handleMonthChange = (newMonth: number) => {
    if (newMonth < 0) {
      setCurrentYear(currentYear - 1);
      setCurrentMonth(11);
    } else if (newMonth > 11) {
      setCurrentYear(currentYear + 1);
      setCurrentMonth(0);
    } else {
      setCurrentMonth(newMonth);
    }
  };

  return (
    <section className="sticky top-0 hidden min-h-full w-[325px] shrink-0 flex-col border-r border-gray-300 lg:flex">
      <Profile />

      <section className="mt-4 flex size-full flex-1 flex-col items-center justify-between p-0">
        {/* Calendar Preview for Desktop View */}
        {pathname.includes('calendar') ? (
          <div className="w-full">
            <Calendar
              isMobile={false}
              currentMonth={currentMonth}
              currentYear={currentYear}
              onMonthChange={handleMonthChange}
            />
          </div>
        ) : null}

        {/* Navigation Section */}
        <section className="mb-4 mt-24 flex w-full flex-col items-center gap-2">
          <Link
            to="/home"
            className={`flex w-full items-center gap-8 border-l-8 border-transparent p-4 pl-8 data-[status]:border-green-300`}
            activeProps={{
              className: 'bg-yellow-75 font-bold text-green-300',
            }}
          >
            <HomeIcon className="size-[2.625rem]" />
            <span>Home</span>
          </Link>
          <Link
            to="/timeline"
            className={`flex w-full items-center gap-8 border-l-8 border-transparent p-4 pl-8 data-[status]:border-green-300`}
            activeProps={{
              className: 'bg-yellow-75 font-bold text-green-300',
            }}
          >
            <QuestionMarkIcon className="size-[2.625rem]" />
            <span>Info</span>
          </Link>
          <Link
            to="/settings"
            className={`flex w-full items-center gap-8 border-l-8 border-transparent p-4 pl-8 data-[status]:border-green-300`}
            activeProps={{
              className: 'bg-yellow-75 font-bold text-green-300',
            }}
          >
            <SettingsIcon className="size-[2.625rem]" />
            <span>Settings</span>
          </Link>
          <Announce />
        </section>
      </section>
    </section>
  );
}

export default LeftNavbar;
