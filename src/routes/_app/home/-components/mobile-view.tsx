import { Separator } from '@radix-ui/react-separator';
import { useNavigate } from '@tanstack/react-router';
import Calendar from '~/components/calendar';
import Profile from '~/components/navbar/profile';
import NavigationItem from './navigation-item';
import Timeline from './timeline';

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
          onClick={() => navigate({ to: '/home/dingdong' })}
        />

        <NavigationItem
          src="/img/home/calendar.svg"
          alt="Calendar"
          title="Calendar"
          onClick={() => navigate({ to: '/home/calendar' })}
        />

        <NavigationItem
          src="/img/home/nim-finder.svg"
          alt="NIM Finder"
          title="NIM Finder"
          onClick={() => navigate({ to: '/home' })}
        />

        <NavigationItem
          src="/img/home/file.svg"
          alt="Testi Matkul"
          title="Testi Matkul"
          onClick={() => navigate({ to: '/home/testimoni' })}
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
