import { Separator } from '@radix-ui/react-separator';
import { useNavigate } from '@tanstack/react-router';
import { ShieldCheck } from 'lucide-react';
import Profile from '~/components/navbar/profile';
import NavigationItem from './navigation-item';
import Timeline from '~/components/schedule/timeline';
import MessageIcon from '~/assets/icons/curhat/message.svg';
import FormIcon from '~/assets/icons/home/form.svg';
import useSession from '~/hooks/auth/useSession';
import { isInRoles } from '~/lib/roles';

function MobileView() {
  const navigate = useNavigate();
  const user = useSession();
  const isAdminHub = isInRoles(user, ['admin', 'peoplemanage']);

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

        <NavigationItem
          src="/img/home/scholarship.svg"
          alt="Mading Beasiswa"
          title="Beasiswa"
          onClick={() =>
            (window.location.href = 'http://s.hmif.dev/MadingBeasiswa')
          }
        />

        <NavigationItem
          src="/img/home/cash-flow.svg"
          alt="Bayar Kas"
          title="Bayar Kas!"
          onClick={() =>
            (window.location.href = 'http://s.hmif.dev/BayarKasHMIF')
          }
        />

        <NavigationItem
          src="/img/home/proposal.svg"
          alt="Pengajuan Surat dan Proposal"
          title="Surat & Proposal"
          onClick={() =>
            (window.location.href =
              'https://s.hmif.dev/LayananAdministrasiHMIF2526')
          }
        />

        <NavigationItem
          src="/img/home/jobs.svg"
          alt="LowonginAja!"
          title="LowonginAja!"
          onClick={() =>
            (window.location.href = 'https://s.hmif.dev/LowonginAja!')
          }
        />

        <NavigationItem
          src={FormIcon}
          alt="Form"
          title="Form"
          onClick={() => navigate({ to: '/home/form' })}
        />

        {isAdminHub && (
          <NavigationItem
            icon={
              <ShieldCheck className="size-7 shrink-0 text-[#3C5B40] md:size-8" />
            }
            title="Admin"
            onClick={() => navigate({ to: '/home/admin' })}
          />
        )}
      </section>

      <div className="flex w-full flex-col items-center gap-4">
        <a href="https://pemilu.hmif.dev" className="m-4">
          <img
            src="/img/pemilu-banner.png"
            alt="Calendar"
            className="rounded-xl"
            width={2902}
            height={1980}
          />
        </a>

        <Separator />

        {/* Schedule Section */}
        <Timeline />
      </div>
    </div>
  );
}

export default MobileView;
