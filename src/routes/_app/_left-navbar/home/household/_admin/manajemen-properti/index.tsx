import { createFileRoute, redirect } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import { Button } from '~/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from '@tanstack/react-router';
import SearchBar from './-components/SearchBar';
import PropertyList from './-components/PropertyList';
import SekreList from './-components/SekreList';
import { SwitchToggle } from './-components/Switch';
import { FilterOptions } from './-components/FilterModal';
import {
  CreatePropertyModal,
  PropertyFormData,
} from './-components/CreatePropertyModal';
import {
  CreateSekreModal,
  SekreFormData,
} from './-components/CreateSekreModal';
import { PropertyData } from './-components/PropertyItem';
import { SekreData } from './-components/SekreItem';
import { isInRoles } from '~/lib/roles';
import { loadUserCache } from '~/lib/session';
import {
  propertyDummyData,
  sekreDummyData,
  fetchLocations,
  handlePropertyCreate,
  handleSekreCreate,
} from './-api';

export const Route = createFileRoute(
  '/_app/_left-navbar/home/household/_admin/manajemen-properti/',
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
  const [locations, setLocations] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Data States
  const [propertyData, setPropertyData] =
    useState<PropertyData[]>(propertyDummyData);
  const [sekreData, setSekreData] = useState<SekreData[]>(sekreDummyData);

  // Create Modal States
  const [createPropertyModalOpen, setCreatePropertyModalOpen] = useState(false);
  const [createSekreModalOpen, setCreateSekreModalOpen] = useState(false);

  // Handle Responsive
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Fetch locations
  useEffect(() => {
    const loadLocations = async () => {
      const data = await fetchLocations();
      setLocations(data);
    };
    loadLocations();
  }, []);

  const handleSwitchChange = (value: string) => {
    console.log('Selected:', value);
    setActiveView(value);
  };

  const handleFilterChange = (newFilter: FilterOptions) => {
    setFilter(newFilter);
  };

  const handleSearchChange = (newSearchTerm: string) => {
    setSearchTerm(newSearchTerm);
  };

  const handleCreateProperty = () => {
    setCreatePropertyModalOpen(true);
  };

  const handleCreateSekre = () => {
    setCreateSekreModalOpen(true);
  };

  const handlePropertyCreateConfirm = async (data: PropertyFormData) => {
    setIsLoading(true);
    try {
      await handlePropertyCreate(data);
      // Add new property to state
      setPropertyData((prev) => [...prev, data]);
    } catch (error) {
      console.error('Error creating property:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSekreCreateConfirm = async (data: SekreFormData) => {
    setIsLoading(true);
    try {
      await handleSekreCreate(data);
      // Add new sekre to state
      setSekreData((prev) => [...prev, data]);
    } catch (error) {
      console.error('Error creating sekre:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePropertyUpdate = (index: number, updatedData: PropertyData) => {
    setPropertyData((prev) =>
      prev.map((item, i) => (i === index ? updatedData : item)),
    );
  };

  const handlePropertyDelete = (index: number) => {
    setPropertyData((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSekreUpdate = (index: number, updatedData: SekreData) => {
    setSekreData((prev) =>
      prev.map((item, i) => (i === index ? updatedData : item)),
    );
  };

  const handleSekreDelete = (index: number) => {
    setSekreData((prev) => prev.filter((_, i) => i !== index));
  };

  const renderContent = () => {
    switch (activeView) {
      case 'Properti':
        return (
          <PropertyList
            filter={filter}
            searchTerm={searchTerm}
            data={propertyData}
            onUpdate={handlePropertyUpdate}
            onDelete={handlePropertyDelete}
            locations={locations}
          />
        );
      case 'Sekre':
        return (
          <SekreList
            filter={filter}
            searchTerm={searchTerm}
            data={sekreData}
            onUpdate={handleSekreUpdate}
            onDelete={handleSekreDelete}
            locations={locations}
          />
        );
      default:
        return (
          <PropertyList
            filter={filter}
            searchTerm={searchTerm}
            data={propertyData}
            onUpdate={handlePropertyUpdate}
            onDelete={handlePropertyDelete}
            locations={locations}
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
          Manajemen Properti
        </h1>
        <SearchBar
          onFilterChange={handleFilterChange}
          onSearchChange={handleSearchChange}
          onCreateProperty={handleCreateProperty}
          onCreateSekre={handleCreateSekre}
          currentFilter={filter}
          searchTerm={searchTerm}
          activeView={activeView}
        />
        <SwitchToggle
          options={['Properti', 'Sekre']}
          defaultValue="Properti"
          onValueChange={handleSwitchChange}
        />
        {renderContent()}
      </main>

      {/* Create Property Modal */}
      <CreatePropertyModal
        isOpen={createPropertyModalOpen}
        onClose={() => setCreatePropertyModalOpen(false)}
        onConfirm={handlePropertyCreateConfirm}
        locations={locations}
      />

      {/* Create Sekre Modal */}
      <CreateSekreModal
        isOpen={createSekreModalOpen}
        onClose={() => setCreateSekreModalOpen(false)}
        onConfirm={handleSekreCreateConfirm}
        locations={locations}
      />
    </div>
  );
}
