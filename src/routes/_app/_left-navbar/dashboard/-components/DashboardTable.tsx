import { useState } from 'react';
import { TableHeader } from './TableHeader';
import { TableRow } from './TableRow';
import { Pagination } from './Pagination';
import { DeleteConfirmation } from './DeleteConfirmation';
import { PrestasiData } from '../-constant';
import { useNavigate } from '@tanstack/react-router';
type PrestasiTableProps = {
  data: PrestasiData[];
  selectedItems: number[];
  onSelectItem: (id: number) => void;
  onSelectAll: () => void;
  allSelected: boolean;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  loading?: boolean;
  onDelete?: (id: number) => Promise<{ success: boolean; error?: string }>;
};

export const DashboardTable = ({
  data,
  selectedItems,
  onSelectItem,
  onSelectAll,
  allSelected,
  currentPage = 1,
  totalPages = 5,
  onPageChange = (page) => console.log('Page:', page),
  onDelete,
}: PrestasiTableProps) => {
  const navigate = useNavigate();
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    item: PrestasiData | null;
  }>({
    isOpen: false,
    item: null,
  });

  const handleDelete = (item: PrestasiData) => {
    setDeleteModal({ isOpen: true, item });
  };

  const handleConfirmDelete = async () => {
    if (!deleteModal.item || !onDelete) {
      console.log('Deleting:', deleteModal.item);
      setDeleteModal({ isOpen: false, item: null });
      return;
    }

    try {
      const result = await onDelete(deleteModal.item.id);
      if (result.success) {
        console.log('ok');
      } else {
        console.error('Delete failed:', result.error);
      }
    } catch (error) {
      console.error('Delete error:', error);
    } finally {
      setDeleteModal({ isOpen: false, item: null });
    }
  };

  const handleEdit = () => {
    navigate({ to: '/dashboard/edit' });
  };

  return (
    <div className="overflow-hidden rounded-lg border ">
      <div className="overflow-x-auto">
        <div className="min-w-[1200px] lg:min-w-max ">
          <TableHeader onSelectAll={onSelectAll} allSelected={allSelected} />

          {data.length === 0 ? (
            <div className="p-8 text-center font-inter text-gray-500">
              <h3 className="mb-2 text-lg font-medium">
                Tidak ada data prestasi
              </h3>
            </div>
          ) : (
            data.map((prestasi) => (
              <TableRow
                key={prestasi.id}
                prestasi={prestasi}
                isSelected={selectedItems.includes(prestasi.id)}
                onSelect={() => onSelectItem(prestasi.id)}
                onEdit={() => handleEdit()}
                onDelete={() => handleDelete(prestasi)}
              />
            ))
          )}
        </div>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />

      <DeleteConfirmation
        isOpen={deleteModal.isOpen}
        item={deleteModal.item}
        onClose={() => setDeleteModal({ isOpen: false, item: null })}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};
