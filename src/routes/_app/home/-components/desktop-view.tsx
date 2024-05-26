import Calendar from '~/components/calendar';
import HeaderTitle from '~/components/header-title';
import NavigationItem from './navigation-item';
import Timeline from './timeline';

function DesktopView() {
  return (
    <div className="hidden size-full max-h-full flex-col overflow-hidden lg:flex">
      <HeaderTitle />
      <div className="flex h-0 flex-1 overflow-hidden">
        <div className="flex min-h-full flex-1 flex-col items-center gap-12 border-r border-gray-300 py-8">
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

          {/* Calendar */}
          <div className="">
            <Calendar />
          </div>
        </div>

        {/* Schedule Section */}
        <div className="flex flex-1 flex-col self-stretch overflow-y-auto py-8">
          <Timeline />
        </div>
      </div>
    </div>
  );
}

export default DesktopView;
