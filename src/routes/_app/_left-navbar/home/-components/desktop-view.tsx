import { useNavigate } from '@tanstack/react-router';
import Calendar from '~/components/calendar';
import HeaderTitle from '~/components/header-title';
import NavigationItem from './navigation-item';
import Timeline from '~/components/schedule/timeline';
import MessageIcon from '~/assets/icons/curhat/message.svg';

function DesktopView() {
  const navigate = useNavigate();

  return (
    <div className="hidden size-full max-h-full flex-col overflow-hidden lg:flex">
      <HeaderTitle />
      <div className="flex h-0 flex-1 overflow-hidden">
        <div className="flex min-h-full flex-1 flex-col items-center gap-8 border-r border-gray-300 py-8">
          {/* Top Navigation Section */}
          <section className="flex h-[220px] w-full max-w-screen-md flex-wrap justify-center gap-x-12 gap-y-4 overflow-y-scroll px-8">
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
                  'http://bit.ly/PengajuanSuratDanProposalHMIF')
              }
            />
          </section>

          <a href="https://pemilu.hmif.dev" className="mx-8 my-4">
            <img
              src="/img/pemilu-banner.png"
              alt="Calendar"
              className="rounded-xl"
              width={2902}
              height={1980}
            />
          </a>

          {/* Calendar */}
          {/* <div className="">
            <Calendar />
          </div> */}
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
