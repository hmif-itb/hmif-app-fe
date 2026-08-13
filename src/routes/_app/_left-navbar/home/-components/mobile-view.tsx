import { Separator } from '@radix-ui/react-separator';
import { useNavigate } from '@tanstack/react-router';
import { ComponentProps } from 'react';
import Calendar from '~/components/calendar';
import Profile from '~/components/navbar/profile';
import NavigationItem from './navigation-item';
import Timeline from '~/components/schedule/timeline';
import MessageIcon from '~/assets/icons/curhat/message.svg';
import useSpartaLock from '~/hooks/useSpartaLock';
import LockedFeature from '~/components/locked-feature';

// A single grid icon, dimmed to a dead-moss tone in place (instead of
// being hidden) so SPARTA can stay the only active item in the grid.
function GridIcon({
  locked,
  ...props
}: { locked?: boolean } & ComponentProps<typeof NavigationItem>) {
  if (!locked) return <NavigationItem {...props} />;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none select-none opacity-60 brightness-95 contrast-[0.9] saturate-[0.15]"
    >
      <NavigationItem {...props} />
    </div>
  );
}

function MobileView() {
  const navigate = useNavigate();
  const isSpartaLocked = useSpartaLock();

  // const handleNavigation = (path: string) => {
  //   navigate({ to: path });
  // };

  return (
    <div className="flex flex-col items-center gap-4 font-inter lg:hidden">
      {/* Profile Section */}
      <Profile />

      {/* Top Navigation Section */}
      <section className="mt-4 flex w-full max-w-screen-md flex-wrap justify-center gap-x-6 gap-y-4 px-8">
        <GridIcon
          locked={isSpartaLocked}
          src="/img/home/folder.svg"
          alt="Ding Dong"
          title="Ding Dong"
          onClick={() => navigate({ to: '/home/dingdong' })}
        />

        <GridIcon
          locked={isSpartaLocked}
          src="/img/home/calendar.svg"
          alt="Calendar"
          title="Calendar"
          onClick={() => navigate({ to: '/calendar' })}
        />

        <GridIcon
          locked={isSpartaLocked}
          src="/img/home/nim-finder.svg"
          alt="NIM Finder"
          title="NIM Finder"
          onClick={() => navigate({ to: '/home/nim-finder' })}
        />

        <GridIcon
          locked={isSpartaLocked}
          src="/img/home/file.svg"
          alt="Testi Matkul"
          title="Testi Matkul"
          onClick={() => navigate({ to: '/home/testimoni' })}
        />

        <GridIcon
          locked={isSpartaLocked}
          src="/img/home/badge.svg"
          alt="Info Lomba"
          title="Info Lomba"
          onClick={() => navigate({ to: '/home/competition' })}
        />

        <GridIcon
          locked={isSpartaLocked}
          src={MessageIcon}
          alt="Curhat Yuk"
          title="Curhat Yuk!"
          onClick={() => navigate({ to: '/home/curhat' })}
        />

        <GridIcon
          locked={isSpartaLocked}
          src="/img/home/scholarship.svg"
          alt="Mading Beasiswa"
          title="Beasiswa"
          onClick={() =>
            (window.location.href = 'http://s.hmif.dev/MadingBeasiswa')
          }
        />

        <GridIcon
          locked={isSpartaLocked}
          src="/img/home/cash-flow.svg"
          alt="Bayar Kas"
          title="Bayar Kas!"
          onClick={() =>
            (window.location.href = 'http://s.hmif.dev/BayarKasHMIF')
          }
        />

        <GridIcon
          locked={isSpartaLocked}
          src="/img/home/proposal.svg"
          alt="Pengajuan Surat dan Proposal"
          title="Surat & Proposal"
          onClick={() =>
            (window.location.href =
              'https://s.hmif.dev/LayananAdministrasiHMIF2526')
          }
        />

        <GridIcon
          locked={isSpartaLocked}
          src="/img/home/jobs.svg"
          alt="LowonginAja!"
          title="LowonginAja!"
          onClick={() =>
            (window.location.href = 'https://s.hmif.dev/LowonginAja!')
          }
        />

        {/* Always active — this is the way out of the lock */}
        <NavigationItem
          src="/img/sparta.png"
          alt="SPARTA"
          title="SPARTA"
          onClick={() => navigate({ to: '/home/internship' })}
          highlighted={isSpartaLocked}
        />
      </section>

      <LockedFeature
        locked={isSpartaLocked}
        className="flex w-full flex-col items-center gap-4"
      >
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
      </LockedFeature>
    </div>
  );
}

export default MobileView;
