import { createFileRoute } from '@tanstack/react-router';
import { useState, useEffect, useMemo } from 'react';
import { Button } from '~/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';
import SearchBar from './-components/SearchBar';
import RequestList from './-components/RequestList';
import ReportList from './-components/ReportList';
import Pagination from './-components/Pagination';
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
  const [activeView, setActiveView] = useState('Request');
  const [isMobile, setIsMobile] = useState(false);
  const [filter, setFilter] = useState<FilterOptions>({ category: 'all' });
  const [searchTerm, setSearchTerm] = useState('');
  const [requestPage, setRequestPage] = useState(1);
  const [laporanPage, setLaporanPage] = useState(1);
  const [pageSize] = useState(10);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const queryFilters = useMemo(() => {
    const statusValue =
      !filter.status || filter.status === 'all' ? undefined : filter.status;
    return {
      category:
        filter.category === 'all'
          ? undefined
          : (filter.category as 'sekre' | 'properti'),
      status: statusValue,
      search: searchTerm || undefined,
    };
  }, [filter.category, filter.status, searchTerm]);

  const requestQueryParams = useMemo(() => {
    const validRequestStatus =
      queryFilters.status &&
      [
        'pending',
        'rejected',
        'accepted',
        'pending_return',
        'completed',
      ].includes(queryFilters.status)
        ? (queryFilters.status as
            | 'pending'
            | 'rejected'
            | 'accepted'
            | 'pending_return'
            | 'completed')
        : undefined;

    return {
      category: queryFilters.category,
      status: validRequestStatus,
      search: queryFilters.search,
      page: requestPage,
      limit: pageSize,
    };
  }, [queryFilters, requestPage, pageSize]);

  const laporanQueryParams = useMemo(() => {
    const validLaporanStatus =
      queryFilters.status &&
      ['pending', 'accepted', 'rejected'].includes(queryFilters.status)
        ? (queryFilters.status as 'pending' | 'accepted' | 'rejected')
        : undefined;

    return {
      category: queryFilters.category,
      status: validLaporanStatus,
      search: queryFilters.search,
      page: laporanPage,
      limit: pageSize,
    };
  }, [queryFilters, laporanPage, pageSize]);

  const { data: requestResponse, isLoading: isLoadingRequests } =
    useGetRequestList(requestQueryParams);
  const { data: laporanResponse, isLoading: isLoadingReports } =
    useGetLaporanList(laporanQueryParams);

  const { requestData, requestTotalPages } = useMemo(() => {
    const data = requestResponse?.requests || [];
    const total = requestResponse?.total || 0;
    const totalPages = Math.ceil(total / pageSize);
    return {
      requestData: data,
      requestTotalPages: totalPages,
    };
  }, [requestResponse, pageSize]);

  const { reportData, reportTotalPages } = useMemo(() => {
    const data = laporanResponse?.laporan || [];
    const total = laporanResponse?.total || 0;
    const totalPages = Math.ceil(total / pageSize);
    return {
      reportData: data,
      reportTotalPages: totalPages,
    };
  }, [laporanResponse, pageSize]);

  const mappedRequestData = useMemo(() => {
    return (requestData || []).map((item) => ({
      ...item,
      item: item.properti?.name,
      category: item.properti?.category,
      quantity: item.properti?.quantity,
      reason: item.alasan ?? undefined,
      type: item.jenisPeminjaman,
      borrowTime: item.createdAt ?? undefined,
      buktiFotoUrl: item.buktiFotoUrl ?? undefined,
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
      item: item.properti.name,
      photo: item.fotoUrl ?? undefined,
    }));
  }, [reportData]);

  const isLoading = isLoadingRequests || isLoadingReports;

  const handleSwitchChange = (value: string) => {
    setActiveView(value);
  };

  const handleFilterChange = (newFilter: FilterOptions) => {
    setFilter(newFilter);
    setRequestPage(1);
    setLaporanPage(1);
  };

  const handleSearchChange = (newSearchTerm: string) => {
    setSearchTerm(newSearchTerm);
    setRequestPage(1);
    setLaporanPage(1);
  };

  const handleRequestPageChange = (page: number) => {
    setRequestPage(page);
  };

  const handleLaporanPageChange = (page: number) => {
    setLaporanPage(page);
  };

  const renderContent = () => {
    switch (activeView) {
      case 'Request':
        return (
          <>
            <RequestList
              filter={filter}
              searchTerm={searchTerm}
              data={mappedRequestData}
              isLoading={isLoading}
            />
            <Pagination
              currentPage={requestPage}
              totalPages={requestTotalPages}
              onPageChange={handleRequestPageChange}
              isLoading={isLoading}
            />
          </>
        );
      case 'Laporan':
        return (
          <>
            <ReportList
              filter={filter}
              searchTerm={searchTerm}
              data={mappedReportData}
              isLoading={isLoading}
            />
            <Pagination
              currentPage={laporanPage}
              totalPages={reportTotalPages}
              onPageChange={handleLaporanPageChange}
              isLoading={isLoading}
            />
          </>
        );
      default:
        return (
          <>
            <ReportList
              filter={filter}
              searchTerm={searchTerm}
              data={mappedReportData}
              isLoading={isLoading}
            />
            <Pagination
              currentPage={laporanPage}
              totalPages={reportTotalPages}
              onPageChange={handleLaporanPageChange}
              isLoading={isLoading}
            />
          </>
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
          activeView={activeView as 'Request' | 'Laporan'}
        />
        <SwitchToggle
          options={['Request', 'Laporan']}
          defaultValue="Request"
          onValueChange={handleSwitchChange}
        />
        {renderContent()}
      </main>
    </div>
  );
}
