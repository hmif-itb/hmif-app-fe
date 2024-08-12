import { Link } from '@tanstack/react-router';
import HomeIcon from '~/components/icons/home';
import QuestionMarkIcon from '~/components/icons/question-mark';
import SettingsIcon from '~/components/icons/settings';
import Calendar from '~/components/new-calendar';
import SidebarEventLabel from './sidebar-event';

interface Event {
  title: string;
  time: string;
  color: string;
  date: number;
}

function Sidebar() {
  const dummyEvents: Event[] = [
    {
      title: 'UAS Jaringan Komputer',
      time: '08:00',
      color: 'orange',
      date: 1,
    },
    {
      title: 'Deadline Milestone 1 Grafika Komputer',
      time: '23:59',
      color: 'amber',
      date: 1,
    },
    {
      title: 'Kuis Artificial Intelligence',
      time: '07:00',
      color: 'slate',
      date: 5,
    },
    {
      title: 'Sprint Review',
      time: '20:00',
      color: 'red',
      date: 5,
    },
    {
      title: 'UAS Jaringan Komputer',
      time: '08:00',
      color: 'blue',
      date: 1,
    },
    {
      title: 'Deadline Milestone 1 Grafika Komputer',
      time: '23:59',
      color: 'amber',
      date: 1,
    },
    {
      title: 'Kuis Artificial Intelligence',
      time: '07:00',
      color: 'slate',
      date: 5,
    },
    {
      title: 'Sprint Review',
      time: '20:00',
      color: 'red',
      date: 5,
    },
    {
      title: 'UAS Jaringan Komputer',
      time: '08:00',
      color: 'blue',
      date: 1,
    },
    {
      title: 'Deadline Milestone 1 Grafika Komputer',
      time: '23:59',
      color: 'amber',
      date: 1,
    },
    {
      title: 'Kuis Artificial Intelligence',
      time: '07:00',
      color: 'slate',
      date: 5,
    },
    {
      title: 'Sprint Review',
      time: '20:00',
      color: 'red',
      date: 5,
    },
  ];

  return (
    <section className="sticky top-0 hidden min-h-full w-[275px] shrink-0 flex-col border-r border-gray-300 lg:flex">
      {/* Mini Calendar Section */}
      <section className="my-4 flex h-2/3 flex-col items-center gap-4 pb-3">
        <Calendar isMobile={false} />
        <div className="no-scrollbar flex flex-col gap-2 overflow-y-scroll">
          <p className="text-lg font-bold">Akademik</p>
          <div className="no-scrollbar flex flex-col gap-1.5 overflow-y-scroll">
            {dummyEvents.map((event, index) => (
              <SidebarEventLabel
                key={index}
                title={event.title}
                time={event.time}
                color={event.color}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Navigation Section */}
      <section className="absolute bottom-28 w-full items-center border-t border-t-gray-300 bg-white pt-2">
        <Link
          to="/home"
          className={`flex w-full items-center gap-8 border-l-8 border-transparent py-3 pl-8 pr-4 data-[status]:border-green-300`}
          activeProps={{
            className: 'bg-yellow-75 font-bold text-green-300',
          }}
        >
          <HomeIcon className="size-[2.625rem]" />
          <span>Home</span>
        </Link>
        <Link
          to="/timeline"
          className={`flex w-full items-center gap-8 border-l-8 border-transparent py-3 pl-8 pr-4 data-[status]:border-green-300`}
          activeProps={{
            className: 'bg-yellow-75 font-bold text-green-300',
          }}
        >
          <QuestionMarkIcon className="size-[2.625rem]" />
          <span>Info</span>
        </Link>
        <Link
          to="/settings"
          className={`flex w-full items-center gap-8 border-l-8 border-transparent pb-3 pl-8 pr-4 pt-2 data-[status]:border-green-300`}
          activeProps={{
            className: 'bg-yellow-75 font-bold text-green-300',
          }}
        >
          <SettingsIcon className="size-[2.625rem]" />
          <span>Settings</span>
        </Link>
      </section>
    </section>
  );
}

export default Sidebar;
