import { createFileRoute } from '@tanstack/react-router';
import { useState, useMemo } from 'react';
import { Button } from '~/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';
import SearchBar from './-components/SearchBar';
import PropertyList from './-components/PropertyList';
import SekreList from './-components/SekreList';
import { SwitchToggle } from './-components/Switch';
import { FilterOptions } from './-components/FilterModal';
import { CreatePropertyModal } from './-components/CreatePropertyModal';
import { CreateSekreModal } from './-components/CreateSekreModal';
import {
  useGetPropertiList,
  useCreateProperti,
  useUpdateProperti,
  useDeleteProperti,
} from '~/hooks/household';
import {
  CreatePropertiBodySchema,
  UpdatePropertiBodySchema,
} from '~/api/generated';

export const Route = createFileRoute(
  '/_app/_left-navbar/home/household/_admin/manajemen-properti/',
)({
  component: HouseholdAdminPage,
});

function HouseholdAdminPage() {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState<'properti' | 'sekre'>(
    'properti',
  );
  const [filter, setFilter] = useState<FilterOptions>({ condition: 'all' });
  const [searchTerm, setSearchTerm] = useState('');
  const [createPropertyModalOpen, setCreatePropertyModalOpen] = useState(false);
  const [createSekreModalOpen, setCreateSekreModalOpen] = useState(false);

  const locations: ['Sekretariat 1', 'Sekretariat 2', 'Jatinangor'] = useMemo(
    () => ['Sekretariat 1', 'Sekretariat 2', 'Jatinangor'],
    [],
  );

  const queryFilters = useMemo(() => {
    const conditionMap: Record<
      string,
      'good' | 'broken' | 'cant_be_used' | 'lost'
    > = {
      good: 'good',
      hilang: 'lost',
      broken: 'broken',
      tidak_dapat_digunakan: 'cant_be_used',
    };
    return {
      search: searchTerm,
      category: activeView,
      condition:
        filter.condition === 'all'
          ? undefined
          : (conditionMap[filter.condition] as
              | 'good'
              | 'broken'
              | 'cant_be_used'
              | 'lost'),
    };
  }, [searchTerm, activeView, filter.condition]);

  const { data: propertiData = [], isLoading } =
    useGetPropertiList(queryFilters);
  const { mutate: createProperti, isPending: isCreating } = useCreateProperti();
  const { mutate: updateProperti } = useUpdateProperti();
  const { mutate: deleteProperti } = useDeleteProperti();

  const handleCreateConfirm = (data: CreatePropertiBodySchema) => {
    createProperti(data, {
      onSuccess: () => {
        setCreatePropertyModalOpen(false);
        setCreateSekreModalOpen(false);
      },
    });
  };

  const handleUpdate = (id: string, updatedData: UpdatePropertiBodySchema) => {
    updateProperti({ propertiId: id, data: updatedData });
  };

  const handleDelete = (id: string) => {
    deleteProperti(id);
  };

  const renderContent = () => {
    if (activeView === 'properti') {
      return (
        <PropertyList
          filter={filter}
          searchTerm={searchTerm}
          data={propertiData}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
          locations={locations}
        />
      );
    }
    return (
      <SekreList
        filter={filter}
        searchTerm={searchTerm}
        data={propertiData}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
        locations={locations}
      />
    );
  };

  return (
    <div className="flex h-full flex-col lg:px-10 lg:pb-[60px]">
      <Button
        variant="link"
        className="my-6 hidden w-full justify-start gap-8 p-0 text-3xl font-medium lg:flex"
        onClick={() => navigate({ to: '/home/household' })}
      >
        <ChevronLeft className="size-8" />
        <span>Back</span>
      </Button>
      <main className="flex size-full flex-col gap-3 overflow-y-scroll bg-[#30764B] p-[34px] lg:items-center lg:gap-6 lg:rounded-xl lg:px-[26px]">
        <h1 className="flex items-center gap-3 text-[32px] font-bold text-white lg:text-center lg:text-5xl">
          <ChevronLeft
            className="size-9 lg:hidden"
            onClick={() => navigate({ to: '/home/household' })}
          />
          Manajemen Properti
        </h1>
        <SearchBar
          onFilterChange={setFilter}
          onSearchChange={setSearchTerm}
          onCreateProperty={() => {
            console.log('Opening property modal');
            setCreatePropertyModalOpen(true);
          }}
          onCreateSekre={() => setCreateSekreModalOpen(true)}
          currentFilter={filter}
          searchTerm={searchTerm}
          activeView={activeView}
        />
        <SwitchToggle
          options={['Properti', 'Sekre']}
          defaultValue="Properti"
          onValueChange={(value) =>
            setActiveView(value.toLowerCase() as 'properti' | 'sekre')
          }
        />
        {isLoading ? <div>Memuat data...</div> : renderContent()}
      </main>

      <CreatePropertyModal
        isOpen={createPropertyModalOpen}
        onClose={() => setCreatePropertyModalOpen(false)}
        onConfirm={handleCreateConfirm}
        locations={locations}
        isSubmitting={isCreating}
      />
      <CreateSekreModal
        isOpen={createSekreModalOpen}
        onClose={() => setCreateSekreModalOpen(false)}
        onConfirm={handleCreateConfirm}
        locations={locations}
        isSubmitting={isCreating}
      />
    </div>
  );
}
