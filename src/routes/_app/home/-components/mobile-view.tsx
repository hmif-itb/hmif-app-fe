import { Separator } from '@radix-ui/react-separator';
import Calendar from '~/components/calendar';
import Profile from '~/components/navbar/profile';
import NavigationItem from './navigation-item';
import Timeline from './timeline';
import { useNavigate } from '@tanstack/react-router';

function MobileView() {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate({ to: path });
  };

  return (
    <div className="flex flex-col items-center gap-8 font-inter lg:hidden">
      {/* Profile Section */}
      <Profile />

      {/* Top Navigation Section */}
      <section className="flex w-full max-w-screen-md justify-between gap-4 px-4">
        <NavigationItem
          src="/img/home/folder.svg"
          alt="Ding Dong"
          title="Ding Dong"
          onClick={() => handleNavigation('/home/dingdong/')}
        />

        <NavigationItem
          src="/img/home/calendar.svg"
          alt="Calendar"
          title="Calendar"
          onClick={() => handleNavigation('/home/')}
        />

        <NavigationItem
          src="/img/home/camera.svg"
          alt="Tutor"
          title="Tutor"
          onClick={() => handleNavigation('/home/')}
        />

        <NavigationItem
          src="/img/home/file.svg"
          alt="Bundel Soal"
          title="Bundel Soal"
          onClick={() => handleNavigation('/home/')}
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
