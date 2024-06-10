import { Link } from '@tanstack/react-router';
import HomeIcon from './icons/home';
import QuestionMarkIcon from './icons/question-mark';
import SettingsIcon from './icons/settings';
import Profile from './profile';

function LeftNavbar() {
  return (
    <section className="sticky top-0 hidden min-h-full w-[375px] shrink-0 flex-col gap-24 border-r border-gray-300 lg:flex">
      <Profile />

      {/* Navigation Section */}
      <section className="flex flex-col gap-8 ">
        <Link
          to="/home"
          className={`flex items-center gap-8 border-l-8 border-transparent p-4 data-[status]:border-green-300`}
          activeProps={{
            className: 'bg-yellow-75 font-bold text-green-300',
          }}
        >
          <HomeIcon className="size-[2.625rem]" />
          <span>Home</span>
        </Link>
        <Link
          to="/timeline"
          className={`flex items-center gap-8 border-l-8 border-transparent p-4 data-[status]:border-green-300`}
          activeProps={{
            className: 'bg-yellow-75 font-bold text-green-300',
          }}
        >
          <QuestionMarkIcon className="size-[2.625rem]" />
          <span>Info</span>
        </Link>
        <Link
          to="/settings"
          className={`flex items-center gap-8 border-l-8 border-transparent p-4 data-[status]:border-green-300`}
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

export default LeftNavbar;
