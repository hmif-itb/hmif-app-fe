import { Link } from '@tanstack/react-router';
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
            className:
              'bg-yellow-75 [&>img]:[filter:invert(26%)_sepia(14%)_saturate(1090%)_hue-rotate(82deg)_brightness(98%)_contrast(92%)] font-bold text-green-300',
          }}
        >
          <img src="/home/house.svg" alt="Home" className={`size-[2.625rem]`} />
          <span>Home</span>
        </Link>
        <Link
          to="/timeline"
          className={`flex items-center gap-8 border-l-8 border-transparent p-4 data-[status]:border-green-300`}
          activeProps={{
            className:
              'bg-yellow-75 [&>img]:[filter:invert(26%)_sepia(14%)_saturate(1090%)_hue-rotate(82deg)_brightness(98%)_contrast(92%)] font-bold text-green-300',
          }}
        >
          <img
            src="/home/question-mark.svg"
            alt="Info"
            className={`size-[2.625rem]`}
          />
          <span>Info</span>
        </Link>
        <Link
          to="/settings"
          className={`flex items-center gap-8 border-l-8 border-transparent p-4 data-[status]:border-green-300`}
          activeProps={{
            className:
              'bg-yellow-75 [&>img]:[filter:invert(26%)_sepia(14%)_saturate(1090%)_hue-rotate(82deg)_brightness(98%)_contrast(92%)] font-bold text-green-300',
          }}
        >
          <img
            src="/home/settings.svg"
            alt="Settings"
            className={`size-[2.625rem]`}
          />
          <span>Settings</span>
        </Link>

        {/* TODO: sebenernya di desainnya gaada tapi kayaknya harusnya ada */}
        <Link
          to="/courses"
          className={`flex items-center gap-8 border-l-8 border-transparent p-4 data-[status]:border-green-300`}
          activeProps={{
            className:
              'bg-yellow-75 [&>img]:[filter:invert(26%)_sepia(14%)_saturate(1090%)_hue-rotate(82deg)_brightness(98%)_contrast(92%)] font-bold text-green-300',
          }}
        >
          <img
            src="/home/settings.svg"
            alt="Courses"
            className={`size-[2.625rem]`}
          />
          <span>Courses</span>
        </Link>
      </section>
    </section>
  );
}

export default LeftNavbar;
