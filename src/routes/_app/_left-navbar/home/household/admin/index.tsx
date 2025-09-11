import { createFileRoute } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import { Button } from '~/components/ui/button';
import { ChevronLeft, List } from 'lucide-react';
import { useRouter } from '@tanstack/react-router';
import SearchBar from './-components/SearchBar';
import RequestList from './-components/RequestList';
import ReportList from './-components/ReportList';
import { SwitchToggle } from './-components/Switch';

export const Route = createFileRoute(
  '/_app/_left-navbar/home/household/admin/',
)({
  component: HouseholdAdminPage,
});

function HouseholdAdminPage() {
  const router = useRouter();
  const [activeView, setActiveView] = useState('Laporan');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const handleSwitchChange = (value: string) => {
    console.log('Selected:', value);
    setActiveView(value);
  };

  const renderContent = () => {
    switch (activeView) {
      case 'Request':
        return <RequestList />;
      case 'Laporan':
        return <ReportList />;
      default:
        return <ReportList />;
    }
  };

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
        className="flex size-full flex-col items-center gap-3 overflow-y-scroll bg-[#30764B] p-[34px] lg:gap-6 lg:rounded-xl lg:px-[26px]"
        style={isMobile ? mobileStyles : desktopStyles}
      >
        <h1 className="flex items-center gap-6 text-[32px] font-bold text-white lg:text-center lg:text-5xl ">
          <ChevronLeft
            className="size-16 lg:hidden"
            onClick={() => {
              router.history.back();
            }}
          />
          Manajemen Request dan Laporan
        </h1>
        <SearchBar />
        <SwitchToggle
          options={['Request', 'Laporan']}
          defaultValue="Laporan"
          onValueChange={handleSwitchChange}
        />
        {renderContent()}
      </main>
    </div>
  );
}
