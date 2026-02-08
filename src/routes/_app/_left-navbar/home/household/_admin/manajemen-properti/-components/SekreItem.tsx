import { useState } from 'react';
import { MapPin, SquarePen, Trash, ImageIcon } from 'lucide-react';
import { DeleteModal } from './DeleteModal';
import { EditSekreModal } from './EditSekreModal';
import { SekreData } from '../../../-types';
import type { UpdatePropertiBodySchema } from '~/api/generated';

interface SekreItemProps {
  sekre: SekreData;
  onUpdate: (updatedData: UpdatePropertiBodySchema) => void;
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

  const handleEditConfirm = async (data: UpdatePropertiBodySchema) => {
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
        <div className="mb-5 flex items-center gap-3 lg:gap-4">
          {/* Information */}
          <div className="flex min-w-0 flex-1 flex-col gap-2 lg:gap-3">
            <h3 className="truncate text-sm font-semibold text-black lg:text-base">
              {sekre.name}
            </h3>
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#525352] lg:gap-4">
              <span className="whitespace-nowrap rounded-full bg-[#AAB8AD] px-2 py-0.5 text-xs text-[#1D3122] lg:px-3 lg:py-1">
                {sekre.condition === 'good'
                  ? 'Baik'
                  : sekre.condition === 'broken'
                    ? 'Rusak Ringan'
                    : sekre.condition === 'cant_be_used'
                      ? 'Rusak Berat'
                      : 'Hilang'}
              </span>
              <span className="flex items-center gap-1 whitespace-nowrap">
                <MapPin size={12} className="shrink-0" />
                <span className="truncate">{sekre.location}</span>
              </span>
            </div>
          </div>
        </div>
        {/* Image Section */}
        <div className="mb-3 flex aspect-[2/1] w-full items-center justify-center overflow-hidden rounded-lg bg-[#E8C55F]">
          <img
            src={sekre.photo || '/img/home/calendar-bg.png'}
            alt={sekre.name}
            className="size-full rounded-lg object-cover"
          />
        </div>
        {/* Bottom Section */}
        <div className="flex w-full justify-center gap-12 lg:gap-[60px]">
          <button
            onClick={() => handleOpenModal('edit')}
            disabled={isLoading}
            className="flex w-fit items-center gap-2 text-black transition-opacity hover:opacity-70 disabled:opacity-50"
          >
            <SquarePen size={18} className="text-black lg:size-5" />
            <span className="text-sm">Edit</span>
          </button>
          <button
            onClick={() => handleOpenModal('delete')}
            disabled={isLoading}
            className="flex w-fit items-center gap-2 text-black transition-opacity hover:opacity-70 disabled:opacity-50"
          >
            <Trash size={18} className="text-[#B01212] lg:size-5" />
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
