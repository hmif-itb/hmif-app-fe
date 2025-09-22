import { useState, useEffect } from 'react';
import { MapPin, SquarePen, Trash } from 'lucide-react';
import { DeleteModal } from './DeleteModal';
import { EditPropertyModal, PropertyFormData } from './EditPropertyModal';

export interface PropertyData {
  name: string;
  condition: 'new' | 'used';
  amount: number;
  location: string;
}

interface PropertyItemProps {
  property: PropertyData;
}

async function fetchLocations(): Promise<string[]> {
  console.log('Fetching locations from API...');
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(['Sekre 1', 'Sekre 2', 'Sekre 3', 'Gudang', 'Ruang Rapat']);
    }, 500);
  });
}

async function handlePropertyUpdate(
  id: string,
  data: PropertyFormData,
): Promise<void> {
  console.log('Updating property:', id, data);
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Property updated successfully');
      resolve();
    }, 1000);
  });
}

async function handlePropertyDelete(id: string): Promise<void> {
  console.log('Deleting property:', id);
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Property deleted successfully');
      resolve();
    }, 1000);
  });
}

export function PropertyItem({ property }: PropertyItemProps) {
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    type: 'edit' | 'delete' | null;
  }>({
    isOpen: false,
    type: null,
  });

  const [locations, setLocations] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadLocations = async () => {
      const data = await fetchLocations();
      setLocations(data);
    };
    loadLocations();
  }, []);

  const handleOpenModal = (type: 'edit' | 'delete') => {
    setModalState({ isOpen: true, type });
  };

  const handleCloseModal = () => {
    setModalState({ isOpen: false, type: null });
  };

  const handleEditConfirm = async (data: PropertyFormData) => {
    setIsLoading(true);
    try {
      await handlePropertyUpdate('property-id-placeholder', data);
    } catch (error) {
      console.error('Error updating property:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteConfirm = async () => {
    setIsLoading(true);
    try {
      await handlePropertyDelete('property-id-placeholder');
    } catch (error) {
      console.error('Error deleting property:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex w-full items-center justify-between rounded-xl bg-white px-4 py-[15px] lg:px-[22px] lg:py-5">
        {/* Left Section */}
        <div className="flex items-center gap-3">
          <div className="size-9 min-h-9 min-w-9 rounded-lg bg-[#E8C55F]">
            <img src="" alt="" />
          </div>
          {/* Information */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold text-black lg:text-base">
              {property.name}
            </h3>
            <div className="flex items-center gap-4 text-xs text-[#525352] lg:gap-7">
              <span className="rounded-full bg-[#AAB8AD] px-3 py-1 text-[#1D3122]">
                {property.condition === 'new' ? 'Baik' : 'Rusak'}
              </span>
              <span>Jumlah: {property.amount}</span>
              <span className="flex items-center gap-1">
                <MapPin size={12} />
                {' ' + property.location}
              </span>
            </div>
          </div>
        </div>
        {/* Right Section */}
        <div className="flex gap-5">
          <button
            onClick={() => handleOpenModal('edit')}
            disabled={isLoading}
            className="transition-opacity hover:opacity-70 disabled:opacity-50"
          >
            <SquarePen size={20} className="text-black" />
          </button>
          <button
            onClick={() => handleOpenModal('delete')}
            disabled={isLoading}
            className="transition-opacity hover:opacity-70 disabled:opacity-50"
          >
            <Trash size={20} className="text-[#B01212]" />
          </button>
        </div>
      </div>

      {/* Edit Modal */}
      {modalState.type === 'edit' && (
        <EditPropertyModal
          isOpen={modalState.isOpen}
          onClose={handleCloseModal}
          onConfirm={handleEditConfirm}
          data={property}
          locations={locations}
        />
      )}

      {/* Delete Modal */}
      {modalState.type === 'delete' && (
        <DeleteModal
          isOpen={modalState.isOpen}
          onClose={handleCloseModal}
          onConfirm={handleDeleteConfirm}
          itemType="property"
          itemName={property.name}
        />
      )}
    </>
  );
}
