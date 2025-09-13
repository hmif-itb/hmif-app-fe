import { useState, useEffect } from 'react';
import { MapPin, SquarePen, Trash } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { DeleteModal, EditSekreModal } from './Modal';

export interface SekreData {
  name: string;
  condition: 'new' | 'used';
  location: string;
  photo?: string;
}

interface SekreItemProps {
  sekre: SekreData;
}

async function fetchLocations(): Promise<string[]> {
  // Placeholder for API call
  console.log('Fetching locations from API...');

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(['Sekre 1', 'Sekre 2', 'Sekre 3', 'Gudang', 'Ruang Rapat']);
    }, 500);
  });
}

/* Placeholder handler functions */
async function handleSekreUpdate(id: string, data: SekreData): Promise<void> {
  // Placeholder for API call
  console.log('Updating sekre:', id, data);

  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Sekre updated successfully');
      resolve();
    }, 1000);
  });
}

async function handleSekreDelete(id: string): Promise<void> {
  // Placeholder for API call
  console.log('Deleting sekre:', id);

  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Sekre deleted successfully');
      resolve();
    }, 1000);
  });
}

export function SekreItem({ sekre }: SekreItemProps) {
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

  const handleEditConfirm = async (data: SekreData) => {
    setIsLoading(true);
    try {
      await handleSekreUpdate('sekre-id-placeholder', data);
    } catch (error) {
      console.error('Error updating sekre:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteConfirm = async () => {
    setIsLoading(true);
    try {
      await handleSekreDelete('sekre-id-placeholder');
    } catch (error) {
      console.error('Error deleting sekre:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex w-full flex-col rounded-xl bg-white px-4 py-[15px] lg:px-[22px] lg:py-5">
        {/* Top Section */}
        <div className="mb-5 flex items-center gap-3">
          <div className="size-9 rounded-lg bg-[#E8C55F]">
            <img src="" alt="" />
          </div>
          {/* Information */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold text-black lg:text-base">
              {sekre.name}
            </h3>
            <div className="flex items-center gap-4 text-xs text-[#525352] lg:gap-7">
              <span className="rounded-full bg-[#AAB8AD] px-3 py-1 text-[#1D3122]">
                {sekre.condition === 'new' ? 'Baik' : 'Rusak'}
              </span>
              <span className="flex items-center gap-1">
                <MapPin size={12} />
                {' ' + sekre.location}
              </span>
            </div>
          </div>
        </div>
        {/* Image Section */}
        <div className="mb-3 aspect-[2/1] w-full overflow-hidden rounded-lg bg-[#E8C55F]">
          <img
            src={sekre.photo || '/img/home/calendar-bg.png'}
            alt=""
            className="size-full rounded-lg object-cover"
          />
        </div>
        {/* Bottom Section */}
        <div className="flex w-full justify-center gap-[60px]">
          <button
            onClick={() => handleOpenModal('edit')}
            disabled={isLoading}
            className="flex w-fit items-center gap-2 text-black transition-opacity hover:opacity-70 disabled:opacity-50"
          >
            <SquarePen size={20} className="text-black" />
            <span className="text-sm">Edit</span>
          </button>
          <button
            onClick={() => handleOpenModal('delete')}
            disabled={isLoading}
            className="flex w-fit items-center gap-2 text-black transition-opacity hover:opacity-70 disabled:opacity-50"
          >
            <Trash size={20} className="text-[#B01212]" />
            <span className="text-sm">Hapus</span>
          </button>
        </div>
      </div>

      {/* Edit Modal */}
      {modalState.type === 'edit' && (
        <EditSekreModal
          isOpen={modalState.isOpen}
          onClose={handleCloseModal}
          onConfirm={handleEditConfirm}
          data={sekre}
          locations={locations}
        />
      )}

      {/* Delete Modal */}
      {modalState.type === 'delete' && (
        <DeleteModal
          isOpen={modalState.isOpen}
          onClose={handleCloseModal}
          onConfirm={handleDeleteConfirm}
          itemType="sekre"
          itemName={sekre.name}
        />
      )}
    </>
  );
}
