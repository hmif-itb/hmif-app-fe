import { useState, useEffect } from 'react';
import { TableHeader } from './TableHeader';
import { TableRow } from './TableRow';
import { Pagination } from '../../-dashboard-component/Pagination';
import { Prestasi } from '~/api/generated';
import { ConfirmModal } from '../../-dashboard-component/ConfirmModal';

type PrestasiTableProps = {
  data: Prestasi[];
  selectedItems: string[];
  onSelectItem: (id: string) => void;
  onSelectAll: () => void;
  allSelected: boolean;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  loading?: boolean;
  onDelete?: (id: string) => Promise<{ success: boolean; error?: string }>;
};

export const DashboardTable = ({
  data,
  selectedItems,
  onSelectItem,
  onSelectAll,
  allSelected,
  currentPage = 1,
  totalPages = 1,
  onPageChange = (page) => console.log('Page:', page),
  loading = false,
  onDelete,
}: PrestasiTableProps) => {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    item: Prestasi | null;
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

  const entriesPerPage = isDesktop ? 10 : 6; // Untuk UI Pagination

  const handleConfirmDelete = async () => {
    if (!deleteModal.item || !onDelete) {
      console.log('No item or onDelete handler');
      setDeleteModal({ isOpen: false, item: null });
      return;
    }

    try {
      const result = await onDelete(deleteModal.item.id);
      if (result.success) {
        console.log('Delete successful');
      } else {
        console.error('Delete failed:', result.error);
      }
    } catch (error) {
      console.error('Delete error:', error);
    } finally {
      setDeleteModal({ isOpen: false, item: null });
    }
  };

  return (
    <div className="overflow-hidden rounded-lg">
      {loading ? (
        <div className="p-8 text-center font-inter text-gray-500">
          <h3 className="mb-2 text-lg font-medium">Memuat data...</h3>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <div className="min-w-[900px]">
              <TableHeader
                onSelectAll={onSelectAll}
                allSelected={allSelected}
              />
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
                  />
                ))
              )}
            </div>
          </div>
          <div className="flex justify-start pl-2">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
              totalEntries={totalPages * entriesPerPage}
              entriesPerPage={entriesPerPage}
            />
          </div>
        </>
      )}
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
