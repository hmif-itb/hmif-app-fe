import { useState } from 'react';
import { MapPin, SquarePen, Trash } from 'lucide-react';
import { DeleteModal } from './DeleteModal';
import { EditSekreModal, SekreFormData } from './EditSekreModal';

export interface SekreData {
  name: string;
  condition: 'new' | 'used';
  location: string;
  photo?: string;
}

interface SekreItemProps {
  sekre: SekreData;
  onUpdate: (updatedData: SekreData) => void;
  onDelete: () => void;
  locations: string[];
}

export function SekreItem({
  sekre,
  onUpdate,
  onDelete,
  locations,
}: SekreItemProps) {
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    type: 'edit' | 'delete' | null;
  }>({
    isOpen: false,
    type: null,
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleOpenModal = (type: 'edit' | 'delete') => {
    setModalState({ isOpen: true, type });
  };

  const handleCloseModal = () => {
    setModalState({ isOpen: false, type: null });
  };

  const handleEditConfirm = async (data: SekreFormData) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      console.log('Sekre updated successfully');

      // Update the data in parent component
      onUpdate(data);
    } catch (error) {
      console.error('Error updating sekre:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteConfirm = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      console.log('Sekre deleted successfully');

      // Delete the item in parent component
      onDelete();
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
          <div className="size-9 min-h-9 min-w-9 rounded-lg bg-[#E8C55F]">
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
