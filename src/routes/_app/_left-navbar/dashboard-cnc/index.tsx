import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { TableActionsBar } from './-components/TableActionBar';
import { DashboardTable } from './-components/DashboardTable';
import { Alert } from '../-dashboard-component/ALert';
import { mockPeoplePrestasiData } from './-constant';
import { ChevronLeft } from 'lucide-react';
import { ConfirmModal } from '../-dashboard-component/ConfirmModal';

export const Route = createFileRoute('/_app/_left-navbar/dashboard-cnc/')({
  component: PeopleDashboard,
});

function PeopleDashboard() {
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [filterKategori, setFilterKategori] = useState<string>('all');
  const [data] = useState(mockPeoplePrestasiData);
  const [currentPage, setCurrentPage] = useState(1);
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState<'success' | 'error'>('success');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemsToDelete, setItemsToDelete] = useState<number[]>([]);
  const [periodFilter, setPeriodFilter] = useState<{
    from: string;
    to: string;
  }>({
    from: '',
    to: '',
  });

  const filteredData =
    filterKategori === 'all' || !filterKategori
      ? data
      : data.filter(
          (item) => item.jenisPrestasi.toLowerCase() === filterKategori,
        );

  const allSelected =
    selectedItems.length === filteredData.length && filteredData.length > 0;

  const handleSelectAll = () => {
    if (allSelected) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredData.map((item) => item.id));
    }
  };

  const handleSelectItem = (id: number) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const handleExport = () => {
    console.log('Export selected items:', selectedItems);
    setAlertType('success');
    setShowAlert(true);
  };

  const handlePeriodChange = (from: string, to: string) => {
    setPeriodFilter({ from, to });
    console.log('Period filter changed:', { from, to });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteClick = () => {
    if (selectedItems.length === 0) {
      setAlertType('error');
      setShowAlert(true);
      return;
    }
    setItemsToDelete(selectedItems);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    console.log('Deleting items:', itemsToDelete);
    setShowDeleteModal(false);
    setSelectedItems([]);
    setAlertType('success');
    setShowAlert(true);
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] font-inter">
      <div className="relative overflow-hidden bg-[#2F754A]">
        <div className="absolute inset-0">
          <img
            src="/img/admin/yellow-gradient-top-right-desktop.png"
            alt=""
            className="absolute right-0 top-0 z-30 hidden lg:block"
          />
          <img
            src="/img/admin/yellow-gradient-top-right-mobile.png"
            alt=""
            className="absolute right-0 top-0 z-30 lg:hidden"
          />

          <img
            src="/img/admin/green-peer-top-left-desktop.png"
            alt=""
            className="absolute left-0 top-0 z-20 hidden lg:block"
          />
          <img
            src="/img/admin/green-peer-top-left-mobile.png"
            alt=""
            className="absolute left-0 top-0 z-20 lg:hidden"
          />

          <img
            src="/img/admin/green-peer-top-right-desktop.png"
            alt=""
            className="absolute right-0 top-0 z-10 hidden lg:block"
          />
          <img
            src="/img/admin/green-peer-top-right-mobile.png"
            alt=""
            className="absolute right-0 top-0 z-10 mt-12 lg:hidden"
          />
        </div>

        <div className="relative z-40 px-4 py-12">
          <div className="max-w-7xl">
            <div className="flex items-center space-x-4">
              <button className="text-white transition-colors hover:text-gray-200">
                <ChevronLeft className="hidden lg:block" size={54} />
                <ChevronLeft size={24} className="block lg:hidden" />
              </button>
              <h1 className="text-3xl font-bold text-white lg:text-5xl">
                Pendataan <span className="font-light italic">Prestasi</span>
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="min-h-screen w-full bg-[#FFFFFF] pb-24 lg:pb-0">
        <div className="rounded-lg bg-white shadow-sm">
          <TableActionsBar
            selectedCount={selectedItems.length}
            onSelectAll={handleSelectAll}
            allSelected={allSelected}
            onExport={handleExport}
            filterKategori={filterKategori}
            onFilterChange={setFilterKategori}
            onPeriodChange={handlePeriodChange}
            onDelete={handleDeleteClick}
          />

          <DashboardTable
            data={filteredData}
            selectedItems={selectedItems}
            onSelectItem={handleSelectItem}
            onSelectAll={handleSelectAll}
            allSelected={allSelected}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>

      <Alert
        type={alertType}
        isVisible={showAlert}
        onClose={() => setShowAlert(false)}
        title="Export Berhasil"
        message="Entry yang dipilih berhasil dieksport"
        className="!left-1/2 !right-auto top-36"
      />

      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleConfirmDelete}
        confirmText="Hapus"
        cancelText="Cancel"
      />
    </div>
  );
}
