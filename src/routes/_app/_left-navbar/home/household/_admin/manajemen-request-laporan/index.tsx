import { createFileRoute } from '@tanstack/react-router';
import { useState, useEffect, useMemo } from 'react';
import { Button } from '~/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';
import SearchBar from './-components/SearchBar';
import RequestList from './-components/RequestList';
import ReportList from './-components/ReportList';
import { SwitchToggle } from './-components/Switch';
import { FilterOptions } from './-components/FilterModal';
import { useGetRequestList, useGetLaporanList } from '~/hooks/household';
export const Route = createFileRoute(
  '/_app/_left-navbar/home/household/_admin/manajemen-request-laporan/',
)({
  component: HouseholdAdminPage,
});

function HouseholdAdminPage() {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState('Laporan');
  const [isMobile, setIsMobile] = useState(false);
  const [filter, setFilter] = useState<FilterOptions>({ category: 'all' });
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const queryFilters = useMemo(() => {
    return {
      category:
        filter.category === 'all'
          ? undefined
          : (filter.category as 'sekre' | 'properti'),
    };
  }, [filter.category]);

  const { data: requestData = [], isLoading: isLoadingRequests } =
    useGetRequestList(queryFilters);
  const { data: reportData = [], isLoading: isLoadingReports } =
    useGetLaporanList(queryFilters);

  const mappedRequestData = useMemo(() => {
    return (requestData || []).map((item) => ({
      ...item,
      item: item.properti?.name,
      category: item.properti?.category,
      quantity: item.properti?.quantity,
      reason: item.alasan ?? undefined,
      type: item.jenisPeminjaman,
      borrowTime: item.createdAt ?? undefined,
    }));
  }, [requestData]);

  const mappedReportData = useMemo(() => {
    return (reportData || []).map((item) => ({
      ...item,
      borrowerName: item.pelapor?.fullName ?? 'Unknown',
      startDate: item.properti?.createdAt ?? '',
      endDate: item.createdAt ?? '',
      category: item.properti?.category ?? 'General',
      reportContent: item.deskripsi,
      photo: item.fotoUrl ?? undefined,
    }));
  }, [reportData]);

  const isLoading = isLoadingRequests || isLoadingReports;

  const handleSwitchChange = (value: string) => {
    setActiveView(value);
  };

  const handleFilterChange = (newFilter: FilterOptions) => {
    setFilter(newFilter);
  };

  const handleSearchChange = (newSearchTerm: string) => {
    setSearchTerm(newSearchTerm);
  };

  const renderContent = () => {
    switch (activeView) {
      case 'Request':
        return (
          <RequestList
            filter={filter}
            searchTerm={searchTerm}
            data={mappedRequestData}
            isLoading={isLoading}
          />
        );
      case 'Laporan':
        return (
          <ReportList
            filter={filter}
            searchTerm={searchTerm}
            data={mappedReportData}
            isLoading={isLoading}
          />
        );
      default:
        return (
          <ReportList
            filter={filter}
            searchTerm={searchTerm}
            data={mappedReportData}
            isLoading={isLoading}
          />
        );
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
      <Button
        variant="link"
        className="my-6 hidden w-full justify-start gap-8 p-0 text-3xl font-medium lg:flex"
        onClick={() => {
          navigate({ to: '/home/household' });
        }}
      >
        <ChevronLeft className="size-8" />
        <span>Back</span>
      </Button>
      <main
        className="flex size-full flex-col gap-3 overflow-y-scroll bg-[#30764B] p-[34px] lg:items-center lg:gap-6 lg:rounded-xl lg:px-[26px]"
        style={isMobile ? mobileStyles : desktopStyles}
      >
        <h1 className="flex items-center gap-3 text-[32px] font-bold text-white lg:text-center lg:text-5xl ">
          <ChevronLeft
            className="size-9 lg:hidden"
            onClick={() => {
              navigate({ to: '/home/household' });
            }}
          />
          Manajemen Request dan Laporan
        </h1>
        <SearchBar
          onFilterChange={handleFilterChange}
          onSearchChange={handleSearchChange}
          currentFilter={filter}
          searchTerm={searchTerm}
        />
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
