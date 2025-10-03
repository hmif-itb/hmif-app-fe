import { useState, useEffect } from 'react';
import { TableHeader } from './TableHeader';
import { TableRow } from './TableRow';
import { Pagination } from '../../-dashboard-component/Pagination';
import { PeoplePrestasiData } from '../-constant';
import { useNavigate } from '@tanstack/react-router';
import { ConfirmModal } from '../../-dashboard-component/ConfirmModal';

type PrestasiTableProps = {
  data: PeoplePrestasiData[];
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
  totalPages = 2,
  onPageChange = (page) => console.log('Page:', page),
  onDelete,
}: PrestasiTableProps) => {
  const navigate = useNavigate();
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    item: PeoplePrestasiData | null;
  }>({
    isOpen: false,
    item: null,
  });

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const entriesPerPage = isDesktop ? 10 : 6;
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;
  const paginatedData = data.slice(startIndex, endIndex);
  const calculatedTotalPages = Math.ceil(data.length / entriesPerPage);

  const handleDelete = (item: PeoplePrestasiData) => {
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
    navigate({
      to: '/dashboard-people',
      params: { id: '123' },
    });
  };

  return (
    <div className="overflow-hidden rounded-lg">
      <div className="overflow-x-auto">
        <div className="min-w-[1200px]">
          <TableHeader onSelectAll={onSelectAll} allSelected={allSelected} />

          {paginatedData.length === 0 ? (
            <div className="p-8 text-center font-inter text-gray-500">
              <h3 className="mb-2 text-lg font-medium">
                Tidak ada data prestasi
              </h3>
            </div>
          ) : (
            paginatedData.map((prestasi) => (
              <TableRow
                key={prestasi.id}
                prestasi={prestasi}
                isSelected={selectedItems.includes(prestasi.id)}
                onSelect={() => onSelectItem(prestasi.id)}
              />
            ))
          )}
        </div>
      </div>

      <div className="flex justify-start pl-2">
        <Pagination
          currentPage={currentPage}
          totalPages={calculatedTotalPages}
          onPageChange={onPageChange}
          totalEntries={data.length}
          entriesPerPage={entriesPerPage}
        />
      </div>

      <ConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, item: null })}
        onConfirm={handleConfirmDelete}
        confirmText="Hapus"
        cancelText="Cancel"
      />
    </div>
  );
};
