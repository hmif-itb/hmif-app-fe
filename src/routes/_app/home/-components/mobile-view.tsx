import { Separator } from '@radix-ui/react-separator';
import Calendar from '~/components/calendar';
import Profile from '~/components/profile';
import NavigationItem from './navigation-item';
import Timeline from './timeline';

function MobileView() {
  return (
    <div className="flex flex-col items-center gap-8 font-inter lg:hidden">
      {/* Profile Section */}
      <Profile />

      {/* Top Navigation Section */}
      <section className="flex w-full max-w-screen-md justify-between gap-4 px-4">
        <NavigationItem
          src="/main-dashboard/folder.svg"
          alt="Ding Dong"
          title="Ding Dong"
        />

        <NavigationItem
          src="/main-dashboard/calendar.svg"
          alt="Calendar"
          title="Calendar"
        />

        <NavigationItem
          src="/main-dashboard/camera.svg"
          alt="Tutor"
          title="Tutor"
        />

        <NavigationItem
          src="/main-dashboard/file.svg"
          alt="Bundel Soal"
          title="Bundel Soal"
        />
      </section>

      {/* Calendar Section */}
      <section className="flex size-full justify-center px-4">
        <Calendar />
      </section>

      <Separator />

      {/* Schedule Section */}
      <Timeline />
    </div>
  );
}

export default MobileView;
