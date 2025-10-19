import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { api, queryClient } from '~/api/client';
import { TableActionsBar } from './-components/TableActionsBar';
import { DashboardTable } from './-components/DashboardTable';
import { Alert } from '../-dashboard-component/ALert';
import { ChevronLeft } from 'lucide-react';
import { ConfirmModal } from '../-dashboard-component/ConfirmModal';
// import { Prestasi } from '~/api/generated';
import { createFileRoute, useNavigate } from '@tanstack/react-router';

export const Route = createFileRoute('/_app/_left-navbar/dashboard/')({
  component: PeopleDashboard,
});

function PeopleDashboard() {
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [filterJenis, setFilterJenis] = useState<string>('all');
  const [periodFilter, setPeriodFilter] = useState<{
    from: string;
    to: string;
  }>({
    from: '',
    to: '',
  });
  // const [search, setSearch] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState<'success' | 'error'>('success');
  const [alertMessage, setAlertMessage] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemsToDelete, setItemsToDelete] = useState<string[]>([]);

  const LIMIT = 10;

  const categoryMap: Record<
    string,
    'competition' | 'organization' | 'committee'
  > = {
    kompetisi: 'competition',
    organisasi: 'organization',
    kepanitiaan: 'committee',
  };

  const { data, isLoading } = useQuery({
    queryKey: [
      'achievements',
      {
        page: currentPage,
        category: filterJenis,
        // search,
        period: periodFilter,
      },
    ],
    queryFn: async () =>
      api.achievements.getListPrestasi({
        category:
          filterJenis !== 'all' && categoryMap[filterJenis]
            ? categoryMap[filterJenis]
            : undefined,
        startDate: periodFilter.from || undefined,
        endDate: periodFilter.to || undefined,
        // search: search || undefined,
        page: currentPage,
        limit: LIMIT,
      }),
    staleTime: 30000,
  });

  const achievements = data?.prestasi || [];
  const total = data?.total || 0;
  const totalPages = Math.ceil(total / LIMIT);

  const allSelected =
    selectedItems.length === achievements.length && achievements.length > 0;

  const handleSelectAll = () => {
    if (allSelected) {
      setSelectedItems([]);
    } else {
      setSelectedItems(achievements.map((item) => item.id));
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
      queryClient.invalidateQueries({ queryKey: ['achievements'] });
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
      const categoryForExport =
        filterJenis !== 'all' && categoryMap[filterJenis]
          ? categoryMap[filterJenis]
          : undefined;

      console.log('Calling exportPrestasi...');

      const result = await api.achievements.exportPrestasi({
        category: categoryForExport,
        startDate: periodFilter.from || undefined,
        endDate: periodFilter.to || undefined,
      });

      console.log('Result received, type:', typeof result);

      let blob: Blob;

      // Result adalah binary string, convert ke Uint8Array lalu ke Blob
      if (typeof result === 'string') {
        // Convert string ke array of char codes
        const binaryString = result as string;
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        blob = new Blob([bytes], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });
      } else if (result instanceof Blob) {
        blob = result;
      } else if (result && typeof result === 'object') {
        // Fallback untuk object dengan numeric keys
        const resultObj = result as Record<string, number>;
        const keys = Object.keys(resultObj);
        const bytes = new Uint8Array(keys.length);
        keys.forEach((key, index) => {
          bytes[index] = resultObj[key];
        });
        blob = new Blob([bytes], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });
      } else {
        throw new Error('Invalid response type from API');
      }

      console.log('Blob created:', blob.size, 'bytes');

      if (blob.size === 0) {
        throw new Error('File kosong, tidak ada data untuk diekspor');
      }

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `prestasi_export_${new Date().toISOString().split('T')[0]}.xlsx`;
      document.body.appendChild(a);
      a.click();

      // Cleanup
      setTimeout(() => {
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }, 100);

      setAlertType('success');
      setAlertMessage('Data berhasil diekspor');
      setShowAlert(true);
    } catch (err) {
      console.error('Export error:', err);

      setAlertType('error');
      setAlertMessage(
        `Gagal mengekspor data: ${err instanceof Error ? err.message : 'Unknown error'}`,
      );
      setShowAlert(true);
    }
  };
  const handleBulkChange = () => {
    // console.log('Bulk change to:', value, 'for items:', selectedItems);
  };

  const handlePeriodChange = (from: string, to: string) => {
    setPeriodFilter({ from, to });
    setCurrentPage(1);
  };

  // const handleSearchChange = (value: string) => {
  //   setSearch(value);
  //   setCurrentPage(1);
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

  // const handleEdit = (id: string) => {
  //   // Navigate ke halaman edit
  //   navigate({
  //     to: '/dashboard/edit/$id',
  //     params: { id },
  //   });
  // };

  return (
    <div className="min-h-screen bg-[#FFFFFF] font-inter">
      <div className="relative overflow-hidden bg-[#2F754A]">
        <div className="absolute inset-0">{/* Background images */}</div>
        <div className="relative z-40 px-4 py-12">
          <div className="max-w-7xl">
            <div className="flex items-center space-x-4">
              <button className="text-white transition-all duration-300 hover:-translate-x-1">
                <ChevronLeft className="hidden lg:block" size={54} onClick={() => navigate({ to: '/home' })}/>
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
            onBulkChange={handleBulkChange}
            filterJenis={filterJenis}
            onFilterChange={setFilterJenis}
            onPeriodChange={handlePeriodChange}
            onDelete={handleDeleteClick}
          />
          <DashboardTable
            data={achievements}
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
