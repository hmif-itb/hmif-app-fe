import { createFileRoute, redirect } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import { Button } from '~/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from '@tanstack/react-router';
import { FilterOptions } from './-components/FilterModal';
import { isInRoles } from '~/lib/roles';
import { loadUserCache } from '~/lib/session';
import SubmissionForm from './-components/SubmissionForm';

export const Route = createFileRoute(
  '/_app/_left-navbar/home/household/pengajuan-laporan/',
)({
  component: HouseholdAdminPage,
  //   loader: () => {
  //     if (!loadUserCache!()) {
  //       throw redirect({ to: '/home/household' });
  //     }
  //     if (loadUserCache()) {
  //       // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //       // @ts-expect-error
  //       if (!isInRoles(loadUserCache(), ['household'])) {
  //         throw redirect({ to: '/home/household' });
  //       }
  //     }
  //   },
});

function HouseholdAdminPage() {
  const router = useRouter();
  const [activeView, setActiveView] = useState('Properti');
  const [isMobile, setIsMobile] = useState(false);
  const [filter, setFilter] = useState<FilterOptions>({ condition: 'all' });
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const mobileStyles = {
    backgroundImage: `url('/img/household/mask-mobile.svg')`,
    backgroundPosition: 'left top',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% auto',
  };

  const desktopStyles = {
    backgroundImage: `url('/img/household/mask-left-top.png'), url('/img/household/mask-right-bottom.png')`,
    backgroundPosition: 'left top, right bottom',
    backgroundRepeat: 'no-repeat, no-repeat',
    backgroundSize: 'auto 1000px, auto 730px',
  };

  return (
    <div className="flex h-full flex-col lg:px-10 lg:pb-[60px]">
      {/* Back Button */}
      <Button
        variant="link"
        className="my-6 hidden w-full justify-start gap-8 p-0 text-3xl font-medium lg:flex"
        onClick={() => {
          router.history.back();
        }}
      >
        <ChevronLeft className="size-8" />
        <span>Back</span>
      </Button>
      <main
        className="flex size-full flex-col gap-3 overflow-y-scroll bg-[#30764B] p-[34px] lg:gap-6 lg:rounded-xl lg:px-[26px]"
        style={isMobile ? mobileStyles : desktopStyles}
      >
        <h1 className="flex  gap-6  text-[32px] font-bold text-white lg:text-5xl ">
          <ChevronLeft
            className="size-16 lg:hidden"
            onClick={() => {
              router.history.back();
            }}
          />
          Pengajuan Laporan
        </h1>
        <SubmissionForm />
      </main>
    </div>
  );
}
