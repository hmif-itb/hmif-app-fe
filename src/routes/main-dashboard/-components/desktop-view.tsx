import { User } from '~/api/generated';
import LeftNavbar from '~/components/left-navbar';
import Timeline from './timeline';
import Calendar from '~/components/calendar';
import HeaderTitle from '~/components/header-title';
import NavigationItem from './navigation-item';
import { Separator } from '@radix-ui/react-separator';

function DesktopView({ user }: { user: User }) {
  return (
    <div className="hidden lg:flex lg:size-full">
      <LeftNavbar user={user} />

      <div className="size-full">
        <HeaderTitle />
        <div className="flex h-full justify-between">
          <div className="flex flex-col min-h-screen items-center size-full gap-12 py-8 border-r border-gray-300">
            {/* Top Navigation Section */}
            <section className="px-4 flex gap-4 justify-between max-w-[500px] size-full">
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

            {/* Calendar */}
            <div className="h-full grow">
              <Calendar />
            </div>
          </div>

          {/* Schedule Section */}
          <div className="flex flex-col min-w-[450px] min-h-screen h-full py-8">
            <Timeline />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DesktopView;
