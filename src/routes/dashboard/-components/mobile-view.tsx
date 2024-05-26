import Profile from '~/components/profile';
import NavigationItem from './navigation-item';
import Calendar from '~/components/calendar';
import { Separator } from '@radix-ui/react-separator';
import Timeline from './timeline';
import Navbar from '~/components/navbar';
import { User } from '~/api/generated';

function MobileView({ user }: { user: User }) {
  return (
    <div className="flex flex-col items-center gap-12 font-inter lg:hidden">
      {/* Profile Section */}
      <Profile user={user} />

      {/* Top Navigation Section */}
      <section className="flex w-full max-w-[500px] justify-between gap-4 px-4">
        <NavigationItem
          src="/dashboard/folder.svg"
          alt="Ding Dong"
          title="Ding Dong"
        />

        <NavigationItem
          src="/dashboard/calendar.svg"
          alt="Calendar"
          title="Calendar"
        />

        <NavigationItem src="/dashboard/camera.svg" alt="Tutor" title="Tutor" />

        <NavigationItem
          src="/dashboard/file.svg"
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

      {/* Bottom Navigation Section */}
      <Navbar />
    </div>
  );
}

export default MobileView;
