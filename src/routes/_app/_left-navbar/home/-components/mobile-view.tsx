import { Separator } from '@radix-ui/react-separator';
import { useNavigate } from '@tanstack/react-router';
import Calendar from '~/components/calendar';
import Profile from '~/components/navbar/profile';
import NavigationItem from './navigation-item';
import Timeline from '~/components/schedule/timeline';
import MessageIcon from '~/assets/icons/curhat/message.svg';

function MobileView() {
  const navigate = useNavigate();

  // const handleNavigation = (path: string) => {
  //   navigate({ to: path });
  // };

  return (
    <div className="flex flex-col items-center gap-4 font-inter lg:hidden">
      {/* Profile Section */}
      <Profile />

      {/* Top Navigation Section */}
      <section className="mt-4 flex w-full max-w-screen-md flex-wrap justify-center gap-x-6 gap-y-4 px-8">
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
          onClick={() => navigate({ to: '/calendar' })}
        />

        <NavigationItem
          src="/img/home/nim-finder.svg"
          alt="NIM Finder"
          title="NIM Finder"
          onClick={() => navigate({ to: '/home/nim-finder' })}
        />

        <NavigationItem
          src="/img/home/file.svg"
          alt="Testi Matkul"
          title="Testi Matkul"
          onClick={() => navigate({ to: '/home/testimoni' })}
        />

        <NavigationItem
          src="/img/home/badge.svg"
          alt="Info Lomba"
          title="Info Lomba"
          onClick={() => navigate({ to: '/home/competition' })}
        />

        <NavigationItem
          src={MessageIcon}
          alt="Curhat Yuk"
          title="Curhat Yuk!"
          onClick={() => navigate({ to: '/home/curhat' })}
        />
      </section>

      <a href="https://pemilu.hmif.dev" className="m-4">
        <img
          src="/img/pemilu-banner.png"
          alt="Calendar"
          className="rounded-xl"
          width={2902}
          height={1980}
        />
      </a>

      {/* Calendar Section */}
      {/* <section className="flex size-full justify-center px-4">
        <Calendar />
      </section> */}

      <Separator />

      {/* Schedule Section */}
      <Timeline />
    </div>
  );
}

export default MobileView;
