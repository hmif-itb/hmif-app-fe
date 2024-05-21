import { Link } from '@tanstack/react-router';
import Profile from './profile';
import { User } from '~/api/generated';
import { useState } from 'react';

function LeftNavbar({ user }: { user: User }) {
  const [isSelected] = useState(true);

  return (
    <section className="sticky top-0 flex min-h-screen w-full min-w-[200px] max-w-[375px] flex-col gap-24 border-r border-gray-300">
      <Profile user={user} />

      {/* Navigation Section */}
      <section className="flex flex-col gap-8 ">
        <Link
          to="/main-dashboard"
          className={`flex items-center gap-8 p-4 ${
            !isSelected ? 'bg-yellow-75' : ''
          }`}
        >
          <img
            src="/main-dashboard/house.svg"
            alt="Home"
            className={`size-[2.625rem] ${
              !isSelected
                ? '[filter:invert(26%)_sepia(14%)_saturate(1090%)_hue-rotate(82deg)_brightness(98%)_contrast(92%)]'
                : ''
            }`}
          />
          <p className={`${!isSelected ? 'font-bold text-green-300' : ''}`}>
            Home
          </p>
        </Link>
        <Link
          to="/main-dashboard"
          className={`flex items-center gap-8 p-4 ${
            isSelected ? 'bg-yellow-75' : ''
          }`}
        >
          <img
            src="/main-dashboard/question-mark.svg"
            alt="Info"
            className={`size-[2.625rem] ${
              isSelected
                ? '[filter:invert(26%)_sepia(14%)_saturate(1090%)_hue-rotate(82deg)_brightness(98%)_contrast(92%)]'
                : ''
            }`}
          />
          <p className={`${isSelected ? 'font-bold text-green-300' : ''}`}>
            Info
          </p>
        </Link>
        <Link
          to="/main-dashboard"
          className={`flex items-center gap-8 p-4 ${
            !isSelected ? 'bg-yellow-75' : ''
          }`}
        >
          <img
            src="/main-dashboard/settings.svg"
            alt="Settings"
            className={`size-[2.625rem] ${
              !isSelected
                ? '[filter:invert(26%)_sepia(14%)_saturate(1090%)_hue-rotate(82deg)_brightness(98%)_contrast(92%)]'
                : ''
            }`}
          />
          <p className={`${!isSelected ? 'font-bold text-green-300' : ''}`}>
            Settings
          </p>
        </Link>
      </section>
    </section>
  );
}

export default LeftNavbar;
