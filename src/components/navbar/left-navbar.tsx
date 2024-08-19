import { Link, useLocation, useRouter } from '@tanstack/react-router';
import dayjs from 'dayjs';
import { useState } from 'react';
import HomeFilledIcon from '../icons/home-filled';
import QuestionMarkIcon from '../icons/question-mark';
import SettingsIcon from '../icons/settings';
import Calendar from '../new-calendar';
import { Button } from '../ui/button';
import Announce from './Announce';
import Profile from './profile';
import SidebarEvents from '~/routes/_app/home/calendar/-components/sidebar-events';

function LeftNavbar() {
  const [currentDate, setCurrentDate] = useState(dayjs().date());
  const [currentMonth, setCurrentMonth] = useState(dayjs().month());
  const [currentYear, setCurrentYear] = useState(dayjs().year());
  // let isCalendarRoute = false;

  const pathname = useLocation({
    select: (location) => location.pathname,
  });
  const router = useRouter();
  const isCalendar = pathname.startsWith('/home/calendar');

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

      <section className="mt-5 flex size-full flex-1 flex-col items-center justify-between p-0">
        {/* Calendar Preview for Desktop View */}
        {isCalendar ? (
          <div className="-mb-20 w-full">
            <Calendar
              isMobile={false}
              currentMonth={currentMonth}
              currentYear={currentYear}
              onMonthChange={handleMonthChange}
            />
            <div className="m-4 flex h-[36%] flex-col gap-2 overflow-y-scroll">
              <SidebarEvents
                currentDate={currentDate}
                currentMonth={currentMonth}
                currentYear={currentYear}
              />
            </div>
          </div>
        ) : null}
        {/* Navigation Section */}
        <section
          className={`mb-4 ${isCalendar ? '' : 'mt-24'} flex w-full flex-col items-center gap-2`}
        >
          <Link
            to="/home"
            className={`flex w-full items-center gap-8 border-l-8 border-transparent px-4 py-2 pl-8 hover:bg-yellow-75 data-[status]:border-green-300`}
            activeProps={{
              className:
                'bg-yellow-75 font-bold text-green-300 [&>svg]:fill-green-300 [&>svg]:stroke-neutral-light',
            }}
          >
            <HomeFilledIcon className="size-[2.625rem] fill-transparent stroke-black transition-colors duration-200" />
            <span>Home</span>
          </Link>
          <Link
            to="/timeline"
            className={`flex w-full items-center gap-8 border-l-8 border-transparent px-4 py-2 pl-8 hover:bg-yellow-75 data-[status]:border-green-300`}
            activeProps={{
              className:
                'bg-yellow-75 font-bold text-green-300 [&>svg]:fill-green-300 [&>svg]:stroke-neutral-light',
            }}
          >
            <QuestionMarkIcon className="size-[2.625rem] fill-transparent stroke-black transition-colors duration-200" />
            <span>Info</span>
          </Link>
          <Link
            to="/settings"
            className={`flex w-full items-center gap-8 border-l-8 border-transparent px-4 py-2 pl-8 hover:bg-yellow-75 data-[status]:border-green-300`}
            activeProps={{
              className:
                'bg-yellow-75 font-bold text-green-300 [&>svg]:fill-green-300 [&>svg]:stroke-neutral-light',
            }}
          >
            <SettingsIcon className="size-[2.625rem] fill-transparent stroke-black transition-colors duration-200" />
            <span>Settings</span>
          </Link>

          {/* Hide Announce if in Calendar View */}
          {isCalendar ? null : <Announce />}
        </section>
      </section>
    </section>
  );
}

export default LeftNavbar;
