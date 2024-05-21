import { User } from '~/api/generated';
import LeftNavbar from '~/components/left-navbar';
import Timeline from './timeline';
import Calendar from '~/components/calendar';
import HeaderTitle from '~/components/header-title';
import NavigationItem from './navigation-item';

function DesktopView({ user }: { user: User }) {
  return (
    <div className="hidden lg:flex lg:size-full">
      <LeftNavbar user={user} />

      <div className="size-full">
        <HeaderTitle />
        <div className="flex h-full justify-between">
          <div className="flex size-full min-h-screen flex-col items-center gap-12 border-r border-gray-300 py-8">
            {/* Top Navigation Section */}
            <section className="flex size-full max-w-[500px] justify-between gap-4 px-4">
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
          <div className="flex h-full min-h-screen min-w-[450px] flex-col py-8">
            <Timeline />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DesktopView;
