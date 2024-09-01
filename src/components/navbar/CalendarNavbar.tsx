import dayjs from 'dayjs';
import { useState } from 'react';
import Calendar from '~/components/new-calendar';
import SidebarEvents from './sidebar-events';
import HomeFilledIcon from '~/components/icons/home-filled';
import QuestionMarkIcon from '~/components/icons/question-mark';
import SettingsIcon from '~/components/icons/settings';
import { getRouteApi, Link } from '@tanstack/react-router';

const routeApi = getRouteApi('/_app/calendar/');

export default function CalendarNavbar() {
  const [currentDate] = useState(dayjs().date());
  const [currentMonth] = useState(dayjs().month());
  const [currentYear] = useState(dayjs().year());

  const { selectedDate, selectedMonth, selectedYear } = routeApi.useSearch();
  const navigate = routeApi.useNavigate();

  const isQueryParamSet =
    selectedDate !== undefined &&
    selectedMonth !== undefined &&
    selectedYear !== undefined;

  const handleMonthChange = (newMonth: number) => {
    if (newMonth < 0) {
      if (isQueryParamSet) {
        navigate({
          search: (prev) => ({
            ...prev,
            selectedYear: selectedYear - 1,
            selectedMonth: 11,
          }),
        });
      } else {
        navigate({
          search: {
            selectedDate: currentDate,
            selectedYear: currentYear - 1,
            selectedMonth: 11,
          },
        });
      }
    } else if (newMonth > 11) {
      if (isQueryParamSet) {
        navigate({
          search: (prev) => ({
            ...prev,
            selectedYear: selectedYear + 1,
            selectedMonth: 0,
          }),
        });
      } else {
        navigate({
          search: {
            selectedDate: currentDate,
            selectedYear: currentYear + 1,
            selectedMonth: 0,
          },
        });
      }
    } else {
      if (isQueryParamSet) {
        navigate({
          search: (prev) => ({
            ...prev,
            selectedMonth: newMonth,
          }),
        });
      } else {
        navigate({
          search: {
            selectedDate: currentDate,
            selectedYear: currentYear,
            selectedMonth: newMonth,
          },
        });
      }
    }
  };

  return (
    <section className="sticky top-0 hidden min-h-full w-[325px] shrink-0 flex-col items-center justify-between border-r border-gray-300 pt-5 lg:flex">
      <div className="-mb-20 w-full">
        <Calendar
          isMobile={false}
          currentMonth={currentMonth}
          currentYear={currentYear}
          onMonthChange={handleMonthChange}
          onChange={(date) =>
            navigate({
              search: {
                selectedDate: date.getDate(),
                selectedMonth: date.getMonth(),
                selectedYear: date.getFullYear(),
              },
            })
          }
          defaultDate={
            isQueryParamSet
              ? new Date(selectedYear, selectedMonth, selectedDate)
              : new Date(currentYear, currentMonth, currentDate)
          }
          dateClassName="size-6 text-xs"
          dayClassName="text-xs"
        />
        <div className="m-4 flex h-2/5 flex-col gap-2">
          <SidebarEvents
            selectedDate={selectedDate || currentDate}
            selectedMonth={selectedMonth || currentMonth}
            selectedYear={selectedYear || currentYear}
          />
        </div>
      </div>

      <section
        className={`mb-4 flex w-full flex-col items-center gap-2 bg-white`}
      >
        <Link
          to="/home"
          className={`flex w-full items-center gap-8 border-l-8 border-green-300 bg-yellow-75 px-4 py-2 pl-8 font-bold text-green-300 hover:bg-yellow-75 [&>svg]:fill-green-300 [&>svg]:stroke-neutral-light`}
        >
          <HomeFilledIcon className="size-[2.625rem] fill-transparent stroke-black transition-colors duration-200" />
          <span>Home</span>
        </Link>
        <Link
          to="/timeline"
          className={`flex w-full items-center gap-8 border-l-8 border-transparent px-4 py-2 pl-8 hover:bg-yellow-75 data-[status]:border-green-300`}
        >
          <QuestionMarkIcon className="size-[2.625rem] fill-transparent stroke-black transition-colors duration-200" />
          <span>Timeline</span>
        </Link>
        <Link
          to="/settings"
          className={`flex w-full items-center gap-8 border-l-8 border-transparent px-4 py-2 pl-8 hover:bg-yellow-75 data-[status]:border-green-300`}
        >
          <SettingsIcon className="size-[2.625rem] fill-transparent stroke-black transition-colors duration-200" />
          <span>Settings</span>
        </Link>
      </section>
    </section>
  );
}
