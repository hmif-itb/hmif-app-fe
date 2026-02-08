import { useState } from 'react';
import { MapPin, SquarePen, Trash, ImageIcon } from 'lucide-react';
import { DeleteModal } from './DeleteModal';
import { EditPropertyModal } from './EditPropertyModal';
import { PropertyData } from '../../../-types';
import type { UpdatePropertiBodySchema } from '~/api/generated';

interface PropertyItemProps {
  property: PropertyData;
  onUpdate: (updatedData: UpdatePropertiBodySchema) => void;
  onDelete: () => void;
  locations: string[];
}

export function PropertyItem({
  property,
  onUpdate,
  onDelete,
  locations,
}: PropertyItemProps) {
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
      console.log('Property updated successfully');

      // Update the data in parent component
      onUpdate(data);
    } catch (error) {
      console.error('Error updating property:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteConfirm = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      console.log('Property deleted successfully');

      // Delete the item in parent component
      onDelete();
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
        <div className="flex min-w-0 flex-1 items-center gap-3 lg:gap-4">
          <div className="flex size-12 min-h-12 min-w-12 items-center justify-center overflow-hidden rounded-lg bg-[#E8C55F] lg:size-16 lg:min-h-16 lg:min-w-16">
            <img
              src={property.photo || '/img/home/calendar-bg.png'}
              alt={property.name}
              className="size-full object-cover"
            />
          </div>
          {/* Information */}
          <div className="flex min-w-0 flex-1 flex-col gap-2 lg:gap-3">
            <h3 className="truncate text-sm font-semibold text-black lg:text-base">
              {property.name}
            </h3>
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#525352] lg:gap-4">
              <span className="whitespace-nowrap rounded-full bg-[#AAB8AD] px-2 py-0.5 text-xs text-[#1D3122] lg:px-3 lg:py-1">
                {property.condition === 'good'
                  ? 'Baik'
                  : property.condition === 'broken'
                    ? 'Rusak Ringan'
                    : property.condition === 'cant_be_used'
                      ? 'Rusak Berat'
                      : 'Hilang'}
              </span>
              <span className="whitespace-nowrap">
                Jumlah: {property.quantity}
              </span>
              <span className="flex items-center gap-1 whitespace-nowrap">
                <MapPin size={12} className="shrink-0" />
                <span className="truncate">{property.location}</span>
              </span>
            </div>
          </div>
        </div>
        {/* Right Section */}
        <div className="ml-2 flex gap-3 lg:gap-5">
          <button
            onClick={() => handleOpenModal('edit')}
            disabled={isLoading}
            className="shrink-0 transition-opacity hover:opacity-70 disabled:opacity-50"
          >
            <SquarePen size={18} className="text-black lg:size-5" />
          </button>
          <button
            onClick={() => handleOpenModal('delete')}
            disabled={isLoading}
            className="shrink-0 transition-opacity hover:opacity-70 disabled:opacity-50"
          >
            <Trash size={18} className="text-[#B01212] lg:size-5" />
          </button>
        </div>
      </div>

      {/* Edit Modal */}
      {modalState.type === 'edit' && (
        <EditPropertyModal
          isOpen={modalState.isOpen}
          onClose={handleCloseModal}
          onConfirm={handleEditConfirm}
          data={{
            name: property.name,
            condition: property.condition,
            quantity: property.quantity,
            location: property.location,
            photo: property.photo,
          }}
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
