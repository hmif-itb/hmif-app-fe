import { createFileRoute } from '@tanstack/react-router';
import { useState, useEffect, useMemo } from 'react';
import { Button } from '~/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';
import SearchBar from './-components/SearchBar';
import PropertyList from './-components/PropertyList';
import SekreList from './-components/SekreList';
import { SwitchToggle } from './-components/Switch';
import { FilterOptions } from './-components/FilterModal';
import { useGetWargaPropertiList } from '~/hooks/household';

export const Route = createFileRoute(
  '/_app/_left-navbar/home/household/_warga/pengajuan-peminjaman/',
)({
  component: HouseholdPeminjamanPage,
});

function HouseholdPeminjamanPage() {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState<'Properti' | 'Sekre'>(
    'Properti',
  );
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

  const queryFilters = useMemo(() => {
    const conditionMap = {
      new: 'good',
      broken: 'broken',
      hilang: 'lost',
      cantBeUsed: 'cant_be_used',
    };
    return {
      search: searchTerm,
      category: activeView.toLowerCase() as 'properti' | 'sekre',
      condition:
        filter.condition === 'all'
          ? undefined
          : (conditionMap[filter.condition as keyof typeof conditionMap] as
              | 'good'
              | 'broken'
              | 'lost'
              | 'cant_be_used'
              | undefined),
      sortBy: 'name_asc' as 'name_asc' | 'name_desc',
    };
  }, [searchTerm, activeView, filter.condition]);

  const { data: propertiList = [], isLoading } =
    useGetWargaPropertiList(queryFilters);

  const handleSwitchChange = (value: string) => {
    setActiveView(value as 'Properti' | 'Sekre');
  };

  const handleFilterChange = (newFilter: FilterOptions) => {
    setFilter(newFilter);
  };

  const handleSearchChange = (newSearchTerm: string) => {
    setSearchTerm(newSearchTerm);
  };

  const renderContent = () => {
    switch (activeView) {
      case 'Properti':
        return (
          <PropertyList
            filter={filter}
            searchTerm={searchTerm}
            data={propertiList}
            isLoading={isLoading}
          />
        );
      case 'Sekre':
        return (
          <SekreList
            filter={filter}
            searchTerm={searchTerm}
            data={propertiList}
            isLoading={isLoading}
          />
        );
      default:
        return (
          <PropertyList
            filter={filter}
            searchTerm={searchTerm}
            data={propertiList}
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
        className="flex size-full flex-col  gap-3 overflow-y-scroll bg-[#30764B] p-[34px] lg:items-center lg:gap-6 lg:rounded-xl lg:px-[26px]"
        style={isMobile ? mobileStyles : desktopStyles}
      >
        <h1 className="flex items-center gap-3 text-[32px] font-bold text-white lg:text-center lg:text-5xl ">
          <ChevronLeft
            className="size-9 lg:hidden"
            onClick={() => {
              navigate({ to: '/home/household' });
            }}
          />
          Peminjaman
        </h1>
        <SearchBar
          onFilterChange={handleFilterChange}
          onSearchChange={handleSearchChange}
          currentFilter={filter}
          searchTerm={searchTerm}
        />
        <SwitchToggle
          options={['Properti', 'Sekre']}
          defaultValue="Properti"
          onValueChange={handleSwitchChange}
        />
        {renderContent()}
      </main>
    </div>
  );
}
