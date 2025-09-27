import { Link } from '@tanstack/react-router';
import HomeFilledIcon from '../icons/home-filled';
import QuestionMarkIcon from '../icons/question-mark';
import SettingsIcon from '../icons/settings';
import Profile from './profile';

  function LeftNavbar() {
    return (
      <section className="sticky top-0 hidden min-h-full w-[325px] shrink-0 flex-col border-r border-gray-300 lg:flex">
      <Profile />

      <section className="mt-5 flex size-full flex-1 flex-col items-center justify-between p-0">
        {/* Navigation Section */}
        <section
          className={`mb-4 mt-24 flex w-full flex-col items-center gap-2 bg-white`}
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
            <span>Timeline</span>
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
        </section>
      </section>
    </section>
  );
}

export default LeftNavbar;
