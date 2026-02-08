import { createFileRoute } from '@tanstack/react-router';
import { useState, useEffect, useMemo } from 'react';
import { Button } from '~/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';
import SearchBar from './-components/SearchBar';
import PeminjamanList from './-components/PeminjamanList';
import Pagination from './-components/Pagination';
import { FilterOptions } from './-components/FilterModal';
import { useGetPeminjaman } from '~/hooks/household';

export const Route = createFileRoute(
  '/_app/_left-navbar/home/household/_warga/peminjaman/',
)({
  component: PeminjamanPage,
});

function PeminjamanPage() {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [filter, setFilter] = useState<FilterOptions>({ type: 'all' });
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  const queryParams = useMemo(() => {
    const statusValue =
      !filter.status || filter.status === 'all' ? undefined : filter.status;
    return {
      category: filter.type === 'all' ? undefined : filter.type,
      status: statusValue,
      search: searchTerm || undefined,
      page: currentPage,
      limit: pageSize,
    };
  }, [filter.type, filter.status, searchTerm, currentPage, pageSize]);

  const { data: response, isLoading } = useGetPeminjaman(queryParams);

  const { peminjamanData, totalPages } = useMemo(() => {
    const data = response?.peminjaman || [];
    const total = response?.total || 0;
    const pages = Math.ceil(total / pageSize);
    return { peminjamanData: data, totalPages: pages };
  }, [response, pageSize]);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const handleFilterChange = (newFilter: FilterOptions) => {
    setFilter(newFilter);
    setCurrentPage(1);
  };

  const handleSearchChange = (newSearchTerm: string) => {
    setSearchTerm(newSearchTerm);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
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
        className="flex size-full flex-col gap-3  overflow-y-scroll bg-[#30764B] p-[34px] lg:items-center lg:gap-6 lg:rounded-xl lg:px-[26px]"
        style={isMobile ? mobileStyles : desktopStyles}
      >
        <h1 className="flex items-center gap-3 text-[32px] font-bold text-white lg:text-center lg:text-5xl ">
          <ChevronLeft
            className="size-9 lg:hidden"
            onClick={() => {
              navigate({ to: '/home/household' });
            }}
          />
          Pengembalian Peminjaman
        </h1>
        <SearchBar
          onFilterChange={handleFilterChange}
          onSearchChange={handleSearchChange}
          currentFilter={filter}
          searchTerm={searchTerm}
        />
        <PeminjamanList data={peminjamanData} isLoading={isLoading} />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          isLoading={isLoading}
        />
      </main>
    </div>
  );
}
