import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { api, queryClient } from '~/api/client';
import { TableActionsBar } from './-components/TableActionBar';
import { DashboardTable } from './-components/DashboardTable';
import { Alert } from '../-dashboard-component/ALert';
import { ChevronLeft } from 'lucide-react';
import { ConfirmModal } from '../-dashboard-component/ConfirmModal';
// import { Prestasi } from '~/api/generated';

export const Route = createFileRoute('/_app/_left-navbar/dashboard-cnc/')({
  component: PeopleDashboard,
});

function PeopleDashboard() {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [filterKategori, setFilterKategori] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState<'success' | 'error'>('success');
  const [alertMessage, setAlertMessage] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemsToDelete, setItemsToDelete] = useState<string[]>([]);
  const [periodFilter, setPeriodFilter] = useState<{
    from: string;
    to: string;
  }>({
    from: '',
    to: '',
  });

  const LIMIT = 10;

  // Fetch achievements
  const { data, isLoading, error } = useQuery({
    queryKey: [
      'achievements-cnc',
      {
        page: currentPage,
        period: periodFilter,
      },
    ],
    queryFn: async () =>
      api.achievements.getListPrestasi({
        startDate: periodFilter.from || undefined,
        endDate: periodFilter.to || undefined,
        page: currentPage,
        limit: LIMIT,
      }),
    staleTime: 30000,
  });

  const allAchievements = data?.prestasi || [];
  const total = data?.total || 0;
  const totalPages = Math.ceil(total / LIMIT);

  // Filter client-side berdasarkan competitionType
  const competitionTypeMap: Record<string, string> = {
    cp: 'CP',
    ctf: 'CTF',
    bcc: 'BCC',
    ds: 'DS',
    ai: 'AI',
    hackatahon: 'Hackathon',
  };

  const targetType =
    filterKategori === 'all' ? null : competitionTypeMap[filterKategori];
  const filteredData = targetType
    ? allAchievements.filter(
        (item) =>
          item.competitionType?.toLowerCase() === targetType.toLowerCase(),
      )
    : allAchievements;

  const allSelected =
    selectedItems.length === filteredData.length && filteredData.length > 0;

  const handleSelectAll = () => {
    if (allSelected) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredData.map((item) => item.id));
    }
  };

  const handleSelectItem = (id: string) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const deleteMutation = useMutation({
    mutationFn: async (id: string) =>
      api.achievements.deletePrestasi({ idPrestasi: id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['achievements-cnc'] });
      setSelectedItems([]);
      setAlertType('success');
      setAlertMessage('Prestasi berhasil dihapus');
      setShowAlert(true);
    },
    onError: () => {
      setAlertType('error');
      setAlertMessage('Gagal menghapus prestasi');
      setShowAlert(true);
    },
  });

  const handleExport = async () => {
    try {
      const params = new URLSearchParams();
      if (periodFilter.from) params.append('start_date', periodFilter.from);
      if (periodFilter.to) params.append('end_date', periodFilter.to);

      setAlertType('success');
      setAlertMessage('Data berhasil diekspor');
      setShowAlert(true);
    } catch (err) {
      console.error('Export error:', err);
      setAlertType('error');
      setAlertMessage('Gagal mengekspor data');
      setShowAlert(true);
    }
  };

  const handlePeriodChange = (from: string, to: string) => {
    setPeriodFilter({ from, to });
    setCurrentPage(1);
  };

  // const handlePageChange = (page: number) => {
  //   setCurrentPage(page);
  //   window.scrollTo({ top: 0, behavior: 'smooth' });
  // };

  const handleDeleteClick = () => {
    if (selectedItems.length === 0) {
      setAlertType('error');
      setAlertMessage('Pilih item yang akan dihapus');
      setShowAlert(true);
      return;
    }
    setItemsToDelete(selectedItems);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    itemsToDelete.forEach((id) => deleteMutation.mutate(id));
    setShowDeleteModal(false);
    setItemsToDelete([]);
  };

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FFFFFF] font-inter">
        <div className="text-red-600">Error loading data: {error.message}</div>
      </div>
    );
  }

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
            totalPages={totalPages}
            loading={isLoading}
            onDelete={(id: string) =>
              deleteMutation
                .mutateAsync(id)
                .then(() => ({
                  success: true,
                }))
                .catch(() => ({
                  success: false,
                  error: 'Gagal menghapus prestasi',
                }))
            }
          />
        </div>
      </div>

      <Alert
        type={alertType}
        isVisible={showAlert}
        onClose={() => setShowAlert(false)}
        title={alertType === 'success' ? 'Aksi Berhasil' : 'Aksi Gagal'}
        message={alertMessage}
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
