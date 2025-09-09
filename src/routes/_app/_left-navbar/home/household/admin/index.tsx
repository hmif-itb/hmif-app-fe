import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
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

  return (
    <div className="flex h-full flex-col px-10 pb-[60px]">
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
        className="flex size-full flex-col items-center gap-5 overflow-y-scroll rounded-xl bg-[#30764B] px-[26px] py-[34px]"
        style={{
          backgroundImage: `url('/img/household/mask-left-top.png'), url('/img/household/mask-right-bottom.png')`,
          backgroundPosition: 'left top, right bottom',
          backgroundRepeat: 'no-repeat, no-repeat',
          backgroundSize: 'auto 1000px, auto 730px',
        }}
      >
        <h1 className="text-center text-5xl font-bold text-white">
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
