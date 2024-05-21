import Calendar from '~/components/calendar';
import HeaderTitle from '~/components/header-title';
import NavigationItem from './navigation-item';
import Timeline from './timeline';

function DesktopView() {
  return (
    <div className="hidden size-full lg:block">
      <HeaderTitle />
      <div className="flex h-full justify-between">
        <div className="flex size-full min-h-full flex-col items-center gap-12 border-r border-gray-300 py-8">
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
        <div className="flex h-full min-w-[450px] flex-col py-8">
          <Timeline />
        </div>
      </div>
    </div>
  );
}

export default DesktopView;
