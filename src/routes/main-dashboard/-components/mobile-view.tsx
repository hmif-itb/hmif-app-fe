import Profile from '~/components/profile';
import NavigationItem from './navigation-item';
import Calendar from '~/components/calendar';
import { Separator } from '@radix-ui/react-separator';
import Timeline from './timeline';
import Navbar from '~/components/navbar';
import { User } from '~/api/generated';

function MobileView({ user }: { user: User }) {
  return (
    <div className="font-inter flex flex-col gap-12 items-center lg:hidden">
      {/* Profile Section */}
      <Profile user={user} />

      {/* Top Navigation Section */}
      <section className="px-4 flex gap-4 justify-between max-w-[500px] w-full">
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
      <section className="px-4 flex justify-center size-full">
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
