import { createFileRoute } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import { Button } from '~/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';
import SearchBar from './-components/SearchBar';
import PeminjamanList from './-components/PeminjamanList';
import { FilterOptions } from './-components/FilterModal';
import { useGetPeminjamanAktif } from '~/hooks/household';

export const Route = createFileRoute(
  '/_app/_left-navbar/home/household/_warga/pengajuan-pengembalian/',
)({
  component: PengembalianPeminjamanPage,
});

function PengembalianPeminjamanPage() {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [filter, setFilter] = useState<FilterOptions>({ type: 'all' });
  const [searchTerm, setSearchTerm] = useState('');

  const { data: peminjamanData = [], isLoading } = useGetPeminjamanAktif();

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
  };

  const handleSearchChange = (newSearchTerm: string) => {
    setSearchTerm(newSearchTerm);
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
        <PeminjamanList
          filter={filter}
          searchTerm={searchTerm}
          data={peminjamanData}
          isLoading={isLoading}
        />
      </main>
    </div>
  );
}
